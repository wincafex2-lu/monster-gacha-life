/* ---------- 數值 ---------- */
const hpBase = s =>
  s > 500
    ? hpBase(500) * Math.pow(1.11, s - 500)
    : 14 * Math.pow(1.13, s - 1) * (s > 100 ? Math.pow(1.008, s - 100) : 1); // 500 關後怪血每關 ×1.11（泓 2026-11-06：×1.08 跟攻擊成長一樣快，後期沒有牆）
const dmgBase = s => 2.6 * Math.pow(1.065, s - 1);
const coinKill = (s, m) => Math.max(1, Math.round(1.6 * Math.pow(1.088, s - 1) * m));
const lvCost = lv => Math.ceil(6 * Math.pow(1.12, lv - 1));
const gateCost = lv => Math.ceil(20 * Math.pow(1.08, lv - 1));
const gateMax = lv =>
  Math.round(
    150 *
      Math.pow(1.2, lv - 1) *
      TR('hp') *
      (1 + (S.arrD === 'd_rock' && S.arr.d_rock ? dv('d_rock', S.arr.d_rock.lv) : 0))
  );
const turCost = lv => Math.ceil(14 * Math.pow(1.13, lv - 1));
const lvCap = id => S.gateLv * 5 + 10 + RLM_LV * (S.asc || 0); // 等級上限只看山門；階級改成直接加攻擊（每階 ×1.5）
const slots = () => {
  let n = 2;
  for (const [l, c] of SLOT_LV) if (S.gateLv >= l) n = c;
  return n;
};
const turSlots = () => 0; // 塔已移除
const tierOf = lv => (lv >= 20 ? 3 : lv >= 10 ? 2 : 1);
const spdBonus = () =>
  PS.spd +
  (B.drumT > 0 ? 0.3 : 0) +
  (B.gmaT > 0 ? 0.4 : 0) +
  (B.drmT > 0 ? 0.5 : 0) +
  (B.arrD === 'd_taiji' && S.arr.d_taiji ? dv('d_taiji', S.arr.d_taiji.lv) : 0);
const heroRate = id =>
  ROLE[CH[id].role].rate *
  (1 + spdBonus()) *
  (id === 'vampire' && B.vamT > 0 ? 2 : 1) *
  (id === 'archer' && PS.aw && PS.aw.archer ? 2 : 1) *
  (id === 'nezha' && B.nzT > 0 ? 2 : 1);
// 升階攻擊加成：每階 ×2，升到滿階再 ×1.5（傳說 5 階 = 24 倍、三階角色滿階 = 6 倍）
const tierMul = (id, t) => Math.pow(2, t - 1) * (t >= CH[id].t ? 1.5 : 1);
function heroAtk(id) {
  const d = CH[id],
    r = S.roster[id];
  const side =
    d.role === 'melee' || d.role === 'tank' ? PS.front : d.role === 'ranged' || d.role === 'magic' ? PS.back : 0;
  return (
    ROLE[d.role].atk *
    RAR[d.r].mul *
    Math.pow(1.09, r.lv - 1) *
    tierMul(id, r.tier) *
    (B.buff > 0 ? (cbOn('alchemist') && (B.drmT > 0 || B.drumT > 0) ? 4 : PS.r10 && PS.r10.alchemist ? 2 : 1.3) : 1) *
    (cbPart(id) ? CB_P : 1) *
    Math.pow(1.5, rsOf(id)) *
    (isMy(id) ? 4 : 1) *
    (id === 'dragon' || id === 'mecha' ? 1.5 : id === 'yangjian' ? 2.6 : 1) *
    (1 + PS.atk + side) *
    (1 + (PS.fbatk || 0)) *
    (fb10('qiankun') ? 2 : 1) *
    (1 + brkP(id) * (r.brk || 0)) *
    (B.genT > 0 && (d.role === 'melee' || d.role === 'tank') ? 1.5 : 1) *
    (B.mbT > 0 ? 1.3 : 1) *
    (id === 'nezha' && B.nzT > 0 ? 3 : 1) *
    TR('atk') *
    XYA()
  );
}
function turAtk(k) {
  const l = S.tur[k].lv;
  return (
    2.5 *
    TUR[k].atk *
    Math.pow(1.1, l - 1) *
    Math.pow(1.3, tierOf(l) - 1) *
    (1 + 0.05 * (S.tur[k].brk || 0)) *
    TR('atk') *
    XYA()
  );
}
function arrDps(k) {
  return (
    3 * Math.pow(1.1, S.arr[k].lv - 1) * (1 + 0.05 * (S.arr[k].brk || 0)) * TR('atk') * XYA() * (arrPaired(k) ? 1.5 : 1)
  );
}
// 神獸攻擊跟著隊伍走：上陣弟子的平均攻擊 × 神獸倍率 × 等級加成（每級 +2%），不會因為弟子等級高就被拋在後面
function teamAvgAtk() {
  const ids = S.team.slice(0, slots()).filter(i => S.roster[i]);
  if (!ids.length) return 1;
  return ids.reduce((a, i) => a + heroAtk(i), 0) / ids.length;
}
function beastAtk(k) {
  return (
    ((teamAvgAtk() * BEAST[k].atk) / 10) *
    (1 + 0.5 * (bSt(k) - 1)) *
    (1 + 0.05 * (S.beast[k].brk || 0)) *
    (paired(k) ? 1.5 : 1) *
    (1 + (PS.bdmg || 0)) *
    (wufang() ? 3 : 1)
  );
}
function towerKey() {
  const n = slots();
  return 'tower' + Math.min(8, n);
}
function gateKey(broken) {
  const g = Math.min(5, 1 + Math.floor((S.gateLv - 1) / 10));
  return `gate${g}_${broken ? 'broken' : 'ok'}`;
}
// 大數字：K M B T，之後 aa ab ac…（每 1000 倍換一個），保留 3 位有效數字
const FMTU = ['', 'K', 'M', 'B', 'T'];
for (let i = 0; i < 26 * 26; i++)
  FMTU.push(String.fromCharCode(97 + Math.floor(i / 26)) + String.fromCharCode(97 + (i % 26)));
const fmt = n => {
  if (!isFinite(n)) return '∞';
  if (n < 1e4) return String(Math.floor(Math.max(0, n)));
  let e = Math.min(FMTU.length - 1, Math.floor(Math.log10(n) / 3)),
    v = n / Math.pow(10, e * 3);
  if (v >= 999.5 && e < FMTU.length - 1) {
    e++;
    v /= 1000;
  }
  return (v < 10 ? v.toFixed(2) : v < 100 ? v.toFixed(1) : v.toFixed(0)) + FMTU[e];
};
