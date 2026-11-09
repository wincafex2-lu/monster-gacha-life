/* 面板 */
let panel = null,
  sel = null;
function openPanel(p, t) {
  panel = p;
  $('sheet').classList.add('open');
  render();
}
function closePanel() {
  $('sheet').classList.remove('open');
  panel = null;
  sel = null;
}
$('shX').onclick = closePanel;
$('xBtn').onclick = () => xStart();
$('farmBtn').onclick = () => {
  if (S.farm) {
    S.farm = 0;
    toast('打完這關就往下一關挑戰！');
  } else {
    S.farm = 1;
    S.farmN = 0;
    toast('之後會一直重打這一關');
  }
  persist();
  updFarm();
};
$('dps').onclick = ev => {
  const m = ev.target.closest('[data-dm]');
  if (m) {
    dpsMode = m.dataset.dm;
    pref.set('idle-td-dpsm', dpsMode);
    dpsLast = 0;
    renderDps();
    return;
  }
  dpsOn = !dpsOn;
  pref.set('idle-td-dps', dpsOn ? '1' : '0');
  dpsLast = 0;
  renderDps();
};
{
  const mb = $('musBtn'),
    sb = $('sfxBtn');
  const um = () => {
      mb.style.opacity = SND.musOn ? 1 : 0.45;
      mb.textContent = SND.musOn ? '🎵' : '🎵✕';
    },
    us = () => {
      sb.textContent = SND.sfxOn ? '🔊' : '🔇';
      sb.style.opacity = SND.sfxOn ? 1 : 0.45;
    };
  um();
  us();
  {
    const tb = $('ultTog'),
      ut = f => {
        document.body.classList.toggle('ufold', f);
        tb.textContent = f ? '▲ 頭像' : '▼';
      };
    let uf = pref.get('idle-td-ultfold') === '1';
    ut(uf);
    tb.onclick = () => {
      uf = !uf;
      ut(uf);
      pref.set('idle-td-ultfold', uf ? '1' : '0');
    };
  }
  {
    const zb = $('zmBtn'),
      uz = () => {
        zb.textContent = ZM > 1 ? '🔍⅔' : '🔍';
        zb.style.opacity = ZM > 1 ? 1 : 0.6;
      };
    uz();
    zb.onclick = () => {
      ZM = ZM > 1 ? 1 : 1.5;
      pref.set('idle-td-zoom', ZM);
      resize();
      uz();
      toast(ZM > 1 ? '畫面縮小（鏡頭拉遠，2/3 大小）' : '畫面大小：正常');
    };
  }
  mb.onclick = () => {
    SND.togMus();
    um();
    toast(SND.musOn ? '音樂：開' : '音樂：關');
  };
  sb.onclick = () => {
    SND.togSfx();
    us();
    toast(SND.sfxOn ? '音效：開' : '音效：關');
  };
}
document.addEventListener('click', e => {
  if (e.target.closest && e.target.closest('.btn')) SND.play('click');
});
$('sheet').addEventListener('pointerdown', e => {
  if (e.target.id === 'sheet') closePanel();
});
$('bHero').onclick = () => openPanel('hero');
$('bGacha').onclick = () => openPanel('gacha');
$('bGate').onclick = () => openPanel('gate');
function render() {
  if (panel === 'hero') renderHero();
  else if (panel === 'gacha') renderGacha();
  else if (panel === 'gate') renderGate();
}
// 隊伍總加成：把上陣弟子被動、神獸、陣法、法寶、修煉、仙元全部加總
var tstatOpen = false,
  hSort = pref.get('idle-td-hsort') || 'rar',
  hRole = 'all';
const RK = i =>
  (isMy(i) ? 6 : {L: 5, E: 4, R: 3, N: 2, S: 1}[CH[i].r]) + (S.roster[i] ? (S.roster[i].tier + rsOf(i)) / 20 : 0); // 弟子頁技能一行一個名字，點了才展開說明
const SK = (lb, nm, ds, on, lock, col) =>
  `<b>${lb}</b><span style="${on ? (col ? `color:${col};font-weight:800` : '') : 'opacity:.55'}"><span class="tipk" data-tipk="1">${nm}${on ? '' : `（${lock}）`} <i>ⓘ</i></span><span class="tipb" style="display:none"><br>${ds}</span></span>`;
function teamStats() {
  const P = v => Math.round(v * 100) + '%',
    X = v => '×' + (v < 100 ? v.toFixed(2) : fmt(v)),
    R = [];
  const add = (n, v, t) => {
    if (v) R.push([n, t]);
  };
  add('全隊攻擊', PS.atk, '+' + P(PS.atk));
  add('乾坤圈（獨立乘）', PS.fbatk, '×' + (1 + PS.fbatk).toFixed(2));
  add('近戰・坦克攻擊', PS.front, '+' + P(PS.front));
  add('遠程・法術攻擊', PS.back, '+' + P(PS.back));
  add('爆擊率', PS.crit, P(PS.crit) + '（上限 60%）');
  add('攻擊速度', spdBonus(), '+' + P(spdBonus()));
  add('大招充能', PS.charge, '+' + P(PS.charge) + '（大招冷卻最多降一半）');
  add('打 Boss 傷害', PS.boss, '+' + P(PS.boss));
  add('山門血量', PS.hp, '+' + P(PS.hp));
  add('山門受傷', PS.dr, '-' + P(PS.dr) + '（上限 60%）');
  add('山門每秒回血', PS.regen, (PS.regen * 100).toFixed(2) + '%');
  add('全場怪物變慢', PS.mslow, P(PS.mslow) + '（上限 50%）');
  add('山門前怪物變慢', PS.slow, P(PS.slow));
  add('銅錢', PS.coin, '+' + P(PS.coin));
  add('直接收服小怪', PS.cap, P(PS.cap));
  add('普攻定身', PS.bind, P(PS.bind));
  const M = [
    ['修煉 全隊攻擊', TR('atk')],
    ['修煉 大招傷害', TR('ult')],
    ['修煉 銅錢', TR('coin')],
    ['仙元 全隊攻擊', XYA0()],
    ['境界 ' + realmName(S.asc || 0), RLM()],
    ['仙元 銅錢・山門石', XYR()]
  ].filter(a => a[1] > 1);
  const fx = [
    ...Object.keys(PS.aw || {}).map(id => AWAKE[id] && `${chName(id)}・${AWAKE[id].n}`),
    ...Object.keys(PS.mx || {}).map(id => MAXFX[id] && `${chName(id)}・${MAXFX[id].n}`),
    ...Object.keys(PS.r10 || {}).map(id => R10FX[id] && `${chName(id)}・${R10FX[id].n}`),
    ...Object.keys(PS.my || {}).map(id => MYFX[id] && `${chName(id)}・${MYFX[id].n}`),
    ...Object.keys(PS.cb || {}).map(id => `合擊・${CB[id].n}`)
  ].filter(Boolean);
  return `<details class="tstat" ${tstatOpen ? 'open' : ''} ontoggle="tstatOpen=this.open" style="margin:12px 0 4px;background:#fff7e6;border:2px solid #e0c890;border-radius:12px;padding:6px 12px"><summary style="cursor:pointer;font-weight:800;color:#7a4a20">隊伍總加成（點開看）</summary>
  <div class="stat" style="margin-top:6px">${R.map(([n, t]) => `<b>${n}</b><span>${t}</span>`).join('') || '<b>被動</b><span>目前沒有</span>'}${M.map(([n, v]) => `<b>${n}</b><span>${X(v)}</span>`).join('')}${fx.length ? `<b>生效中的特效</b><span>${fx.join('、')}</span>` : ''}</div>
  <div style="font-size:12px;opacity:.65;margin-top:4px">來源：上陣弟子的被動、神獸、防禦陣、法寶、修煉、仙元。戰鬥中的暫時 BUFF 看左上角。</div></details>`;
}
const PAIR2 = [
  {
    a: 'nezha',
    b: 'aobing',
    n: '冰火兩重天',
    d: '同時燒傷又凍住的怪受全隊傷害 ×4；一人放大招，另一人自動跟一招；兩人大招都充滿時放大招，變成合體大招「冰火合璧」（自動模式會等搭檔充滿，最多 8 秒）',
    on: () => icefire()
  },
  {
    a: 'monkey',
    b: 'yangjian',
    n: '天宮鬥法',
    d: '哮天犬咬過、或在裂縫裡的怪，猴王打中 ×3；被猴王破甲的怪，楊戩打中 ×3；猴王放大招 2 秒後楊戩射天眼神光，楊戩放大招 2 秒後猴王變出 10 隻分身',
    on: () => tgdf()
  }
];
function pairLine(id) {
  return PAIR2.filter(q => q.a === id || q.b === id)
    .map(q =>
      SK(
        '合擊',
        q.n,
        `${MYN[q.a]}＋${MYN[q.b]}（兩位都要神話進化）一起上陣：${q.d}`,
        q.on(),
        `需要${MYN[q.a]}＋${MYN[q.b]}都是神話、同隊`,
        '#0a7a8a'
      )
    )
    .join('');
}
function cbLine(id) {
  return cbLine0(id) + pairLine(id);
}
function cbLine0(id) {
  const mk = (my, on) => {
    const c = CB[my],
      ps = c.p.map(x => CH[x].n).join(' 或 ');
    return SK(
      '合擊',
      c.n,
      `${MYN[my]}＋${ps} 一起上陣：${c.d}；搭檔自己攻擊 ×${CB_P}`,
      on,
      `需要${MYN[my]}＋${ps}同隊`,
      '#0a7a8a'
    );
  };
  if (CB[id]) return mk(id, cbOn(id));
  const my = Object.keys(CB).find(k => CB[k].p.includes(id));
  return my ? mk(my, cbPart(id)) : '';
}
function tierStars(t, max, rs) {
  return (
    '★'.repeat(t) +
    '<span style="opacity:.3">' +
    '★'.repeat(max - t) +
    '</span>' +
    (rs ? '<span style="color:#e0241a">' + '★'.repeat(rs) + '</span>' : '')
  );
}
// 大招說明（點大招名字才展開，不佔版面）
function ultDesc(id) {
  const d = CH[id],
    x = heroAtk(id) * 7 * TR('ult') * (d.r === 'L' ? 1.5 : 1),
    f = fmt;
  const leg = d.r === 'L' ? '（含傳說 ×1.5）' : '';
  return (
    {
      sweep: `一道劍氣從弟子往前掃過全場，每隻怪受到 ${f(x)} 傷害${leg}，並往後推`,
      rain: `從天上落下 18 道攻擊，每道打中附近一小群（範圍 70），每道 ${f(x / 4)}${leg}`,
      slam: `震波從山門往前推，地上每隻怪 ${f(x)}${leg}、暈 0.8 秒、往後推；飛行怪受 ${f(x * 0.6)}`,
      laser: `光束持續 0.8 秒，每 0.16 秒打全場一次，每次 ${f(x / 5)}${leg}（共約 5 次）`,
      heal: `山門回血 35%，全隊攻擊 +30%（8 秒），並對全場每隻怪造成 ${f(x * 0.4)}${leg}`,
      freeze: `全場每隻怪受到 ${f(x * 0.6)}${leg}，並被定住 3.2 秒`,
      focus: `${FOCUS_T} 秒內星弓少女爆擊率 +50%、爆擊傷害從 2.5 倍變 4 倍（只強化自己的普攻；星弓平常爆擊就是 2.5 倍）。充能速度是別人的一半`,
      drain: `吸取全場每隻怪 ${f(x * 0.8)} 生命${leg}，山門回血 15%`
    }[d.ult] || ''
  );
}
function renderHero() {
  $('shTitle').textContent = '弟子';
  $('shTabs').innerHTML = '';
  const ids = Object.keys(CH);
  let own = ids.filter(i => S.roster[i]);
  const not = ids
    .filter(i => !S.roster[i] && fsOk(i) && (hRole === 'all' || CH[i].role === hRole))
    .sort((a, b) => RK(b) - RK(a));
  // 排序：上陣的永遠在最前面（照站位順序），其他照選的方式排；職業篩選
  {
    const tw = i => S.team.indexOf(i),
      key = {rar: i => RK(i) * 1e6 + heroAtk(i) / 1e300, atk: i => heroAtk(i), lv: i => S.roster[i].lv * 1e3 + RK(i)}[
        hSort
      ];
    own = own
      .filter(i => hRole === 'all' || CH[i].role === hRole)
      .sort((a, b) => {
        const ta = tw(a),
          tb = tw(b);
        if (ta >= 0 || tb >= 0) return (ta < 0 ? 99 : ta) - (tb < 0 ? 99 : tb);
        return key(b) - key(a) || RK(b) - RK(a);
      });
  }
  if (!sel || !S.roster[sel]) sel = S.team[0];
  const id = sel,
    d = CH[id],
    r = S.roster[id];
  const cap = lvCap(id);
  const cost = lvCost(r.lv);
  const inTeam = S.team.includes(id);
  const need = dupeNeed(id, r.tier + 1);
  const pNeed = id === 'disciple' ? r.tier * 5 : Math.max(0, (need || 0) - r.dup) * (PPD[d.r] || 10),
    canTier = r.tier < d.t && (id === 'disciple' ? S.pill >= pNeed : r.dup >= need || S.pill >= pNeed);
  const brkP2 = PPD[d.r] || 10,
    canBrk = r.tier >= d.t && (r.brk || 0) < BRK_MAX && S.pill >= brkP2;
  const tierTxt =
    r.tier >= d.t
      ? id === 'disciple'
        ? '已滿階'
        : `突破 ${r.brk || 0}/${BRK_MAX}（每隻 +${Math.round(brkP(id) * 100)}%）`
      : id === 'disciple'
        ? `升階需要 進階丹 ${r.tier * 5}（有 ${S.pill}）`
        : `升階需要 重複角色 ${need}（有 ${r.dup}）${r.dup < need ? `，或用進階丹 ${pNeed} 顆補（有 ${S.pill}）` : ''}`;
  const tierUp =
    r.tier < d.t
      ? `｜升階後攻擊 ×${+(tierMul(id, r.tier + 1) / tierMul(id, r.tier)).toFixed(1)}${r.tier + 1 >= d.t ? '（含滿階 ×1.5）' : ''}`
      : '';
  let h = `<div class="detail"><div class="pic" style="border-color:var(--${d.r.toLowerCase()})"><img src="${charImg(id)}" alt=""></div><div class="info">
 <div><span class="tag ${isMy(id) ? 'M' : d.r}">${isMy(id) ? '神話' : RAR[d.r].n}</span><span class="tag" style="background:#7a5a3a">${ROLE[d.role].n}</span></div>
 <h3>${chName(id)}${isMy(id) && MYN[id] ? `<span style="font-size:14px;opacity:.6">（${d.n}）</span>` : ''} <span style="font-size:18px;color:#ff9a1e">${tierStars(r.tier, d.t, r.rs)}</span></h3>
 <div class="stat"><b>等級</b><span>Lv ${r.lv} / ${cap}</span><b>攻擊</b><span>每下 ${fmt(heroAtk(id) * NA * (id === 'archer' ? 2.5 : 1))}・每秒 ${fmt(heroAtk(id) * NA * (id === 'archer' ? 2.5 : 1) * heroRate(id))}${PS.crit > 0 ? `・爆擊 ${Math.round(PS.crit * 100)}%` : ''}</span><b>類型</b><span>${ROLE[d.role].n}・射程${ROLE[d.role].rd}</span>${SK('大招', d.un, ultDesc(id) + `；冷卻 ${ucdOf(id)} 秒（充能加成最多降一半，最快 ${ucdOf(id) / 2} 秒）` + (ULTX[id] ? '；<b style="color:#c2410c">' + ULTX[id] + '</b>' : '') + ({laser: '；射程：整排', focus: ''}[d.ult] ?? `；射程：山門前 ${ULT_R[d.ult]}`), 1)}${PASSIVE[id] ? SK('被動', PASSIVE[id].n, PASSIVE[id].d(r.tier), 1) : ''}${PASSIVE[id] && PASSIVE[id].sp ? SK('特殊', '普攻特性', PASSIVE[id].sp + (d.r === 'L' ? '；傳說大招傷害 ×1.5' : ''), 1) : ''}${AWAKE[id] ? SK('覺醒', AWAKE[id].n, AWAKE[id].d, isAw(id), '3 階解鎖', '#c2410c') : ''}${MAXFX[id] ? SK('極意', `<span class="fxs" style="background:${MAXFX[id].s === '自身' ? '#7a5cc8' : MAXFX[id].s === '全隊' ? '#2a8a3a' : '#c27a10'}">${MAXFX[id].s}</span>${MAXFX[id].n}`, MAXFX[id].d, isMax(id), `${d.t} 階解鎖`, '#c2410c') : ''}${R10FX[id] ? SK('10 星', R10FX[id].n, R10FX[id].d, isR10(id), '紅星 5 顆解鎖', '#e0241a') : ''}${MYFX[id] ? SK('神話', MYFX[id].n, MYFX[id].d, isMy(id), '神話進化解鎖', '#c2185b') : ''}${cbLine(id)}</div>
 <div class="tiers">${Array.from({length: d.t}, (_, i) => `<span class="${i + 1 > r.tier ? 'no' : ''} ${i + 1 === r.tier ? 'cur' : ''}"><img src="${charImg(id, i + 1)}" alt=""></span>`).join('')}</div>
 <div class="row"><button class="btn green" id="dUp" ${r.lv >= cap || S.coin < cost ? 'disabled' : ''}>升級 <span class="cost"><span class="ico coin"></span>${fmt(cost)}</span></button>
 <button class="btn green" id="dUp10" ${r.lv >= cap || S.coin < cost ? 'disabled' : ''}>連升</button>
 ${r.tier >= d.t ? `<button class="btn gold" id="dBrk" ${canBrk ? '' : 'disabled'}>${(r.brk || 0) < BRK_MAX ? `突破 <span class="cost"><span class="ico pill"></span>${brkP2}</span>` : '突破已滿'}</button>` : `<button class="btn gold" id="dTier" ${canTier ? '' : 'disabled'}>升階${id !== 'disciple' && r.dup < need ? ` <span class="cost"><span class="ico pill"></span>${pNeed}</span>` : ''}</button>`}
 ${d.r === 'L' && r.tier >= d.t ? `<button class="btn gold" id="dRs" style="background:linear-gradient(#ff5a4a,#c0201a);color:#fff" ${rsOf(id) < RS_MAX && (S.shard || 0) >= rsCost(rsOf(id)) ? '' : 'disabled'}>${rsOf(id) < RS_MAX ? `升紅星 <span class="cost">碎片 ${rsCost(rsOf(id))}</span>` : '紅星已滿'}</button>` : ''}${d.r === 'L' && isR10(id) && !isMy(id) ? `<button class="btn" id="dMy" style="background:linear-gradient(90deg,#ff3a6a,#ffb02a,#7a5cff);color:#fff" ${(S.shard || 0) >= MY_COST ? '' : 'disabled'}>神話進化 <span class="cost">碎片 ${MY_COST}</span></button>` : ''}
 <button class="btn blue" id="dTeam">${inTeam ? '下陣' : '上陣'}</button></div>
 <div style="font-size:13px;color:#7a5a3a">${tierTxt}${tierUp}${d.r === 'L' && r.tier >= d.t ? `<br>紅星 ${rsOf(id)}/${RS_MAX}（每顆 ×1.5，碎片 ${S.shard || 0}）${isMy(id) ? '' : isR10(id) ? '・可以神話進化（攻擊 ×4、大招 ×1.5）' : ''}` : ''}・上陣 ${S.team.length}/${slots()}</div></div></div>
 ${teamStats()}`;
  let hl = `
 <h3 style="margin:0 0 8px;font-family:var(--title)">全部弟子（${ids.filter(i => S.roster[i]).length}/${ids.filter(fsOk).length}）</h3>
 <div class="row" style="gap:4px;margin-bottom:6px;flex-wrap:wrap">排序：${[
   ['rar', '稀有度'],
   ['atk', '攻擊'],
   ['lv', '等級']
 ]
   .map(
     ([k, n]) =>
       `<button class="btn ${hSort === k ? 'gold' : ''}" data-hs="${k}" style="padding:2px 10px;font-size:13px">${n}</button>`
   )
   .join('')}
 <span style="margin-left:10px">職業：</span>${[['all', '全部'], ...Object.keys(ROLE).map(k => [k, ROLE[k].n])].map(([k, n]) => `<button class="btn ${hRole === k ? 'blue' : ''}" data-hr="${k}" style="padding:2px 10px;font-size:13px">${n}</button>`).join('')}</div>
 <div style="font-size:12px;opacity:.65;margin-bottom:4px">上陣中的弟子固定排在最前面</div><div class="grid">`;
  for (const i of own) {
    const rr = S.roster[i],
      dd = CH[i];
    const up = rr.tier < dd.t && (i === 'disciple' ? S.pill >= rr.tier * 5 : rr.dup >= dupeNeed(i, rr.tier + 1));
    hl += `<button class="card ${dd.r} ${S.team.includes(i) ? 'inteam' : ''}" data-id="${i}" style="${i === sel ? 'outline:3px solid #ff9a1e' : ''}"><img src="${charImg(i)}" alt=""><span class="lv">Lv${rr.lv}</span><span class="tier">${'★'.repeat(rr.tier)}${rr.rs ? `<i style="color:#ff3a2a;font-style:normal">${'★'.repeat(rr.rs)}</i>` : ''}${rr.brk ? `+${rr.brk}` : ''}</span>${up ? '<span class="up">可升階</span>' : ''}<span class="cn">${chName(i)}</span></button>`;
  }
  for (const i of not) {
    const dd = CH[i];
    hl += `<div class="card ${dd.r} locked"><img src="${charImg(i, 1)}" alt=""><span class="cn">？？？</span></div>`;
  }
  hl += '</div>';
  const ol = document.querySelector('#shBody .hleft'),
    st = ol ? ol.scrollTop : 0,
    orr = document.querySelector('#shBody .hright'),
    st2 = orr && orr.dataset.id === sel ? orr.scrollTop : 0;
  $('shBody').innerHTML =
    `<div class="hlay"><div class="hleft">${hl}</div><div class="hright" data-id="${sel}">${h}</div></div>`;
  {
    const nl = document.querySelector('#shBody .hleft');
    if (nl) nl.scrollTop = st;
    const nr = document.querySelector('#shBody .hright');
    if (nr) nr.scrollTop = st2;
  }
  $('shBody')
    .querySelectorAll('.card[data-id]')
    .forEach(
      c =>
        (c.onclick = () => {
          sel = c.dataset.id;
          renderHero();
        })
    );
  $('shBody')
    .querySelectorAll('[data-hs]')
    .forEach(
      b =>
        (b.onclick = () => {
          hSort = b.dataset.hs;
          pref.set('idle-td-hsort', hSort);
          renderHero();
        })
    );
  $('shBody')
    .querySelectorAll('[data-hr]')
    .forEach(
      b =>
        (b.onclick = () => {
          hRole = b.dataset.hr;
          renderHero();
        })
    );
  $('dUp').onclick = () => {
    levelUp(id, 1);
  };
  $('dUp10').onclick = () => {
    levelUp(id, 99);
  };
  document.querySelectorAll('[data-tipk]').forEach(
    t =>
      (t.onclick = () => {
        const b = t.nextElementSibling;
        const o = b.style.display === 'none';
        b.style.display = o ? 'inline' : 'none';
        t.querySelector('i').textContent = o ? '▴' : 'ⓘ';
      })
  );
  if ($('dMy'))
    $('dMy').onclick = () => {
      if (isMy(id) || !isR10(id) || (S.shard || 0) < MY_COST) return;
      S.shard -= MY_COST;
      r.my = 1;
      SND.play('rare');
      toast(`${d.n} 進化成神話「${chName(id)}」！攻擊 ×4、大招 ×1.5`);
      refreshField();
      renderHero();
    };
  if ($('dRs'))
    $('dRs').onclick = () => {
      const n = rsOf(id);
      if (n >= RS_MAX || (S.shard || 0) < rsCost(n)) return;
      S.shard -= rsCost(n);
      r.rs = n + 1;
      SND.play('rare');
      toast(`${d.n} 紅星 ${r.rs} 顆！攻擊 ×1.5${r.rs >= RS_MAX ? '，解鎖 10 星極意！' : ''}`);
      refreshField();
      renderHero();
    };
  if ($('dBrk'))
    $('dBrk').onclick = () => {
      if (!canBrk) return;
      S.pill -= brkP2;
      r.brk = (r.brk || 0) + 1;
      toast(`${d.n} 突破 +${r.brk}（用了 ${brkP2} 顆進階丹）`);
      refreshField();
      renderHero();
    };
  if ($('dTier'))
    $('dTier').onclick = () => {
      if (!canTier) return;
      if (id === 'disciple') S.pill -= pNeed;
      else if (r.dup >= need) r.dup -= need;
      else {
        S.pill -= pNeed;
        r.dup = 0;
      }
      r.tier++;
      toast(`${d.n} 升到 ${r.tier} 階！`);
      refreshField();
      renderHero();
    };
  $('dTeam').onclick = () => {
    if (inTeam) {
      if (S.team.length <= 1) {
        toast('至少要有一位弟子守山門');
        return;
      }
      S.team = S.team.filter(x => x !== id);
    } else {
      if (S.team.length >= slots()) {
        toast(`樓閣只站得下 ${slots()} 位，升級山門可以多站`);
        return;
      }
      S.team.push(id);
    }
    refreshField();
    renderHero();
  };
}
function levelUp(id, n) {
  const r = S.roster[id];
  let c = 0;
  while (n-- > 0 && r.lv < lvCap(id) && S.coin >= lvCost(r.lv)) {
    S.coin -= lvCost(r.lv);
    r.lv++;
    c++;
  }
  if (c) {
    SND.play('up');
    toast(`${CH[id].n} Lv${r.lv}`);
    persist();
  }
  renderHero();
  updLive();
}
function refreshField() {
  const old = B.heroes.map(h => [h.id, h.charge]),
    ob = (B.beasts || []).map(b => [b.k, b.charge]);
  buildField();
  B.heroes.forEach(h => {
    const o = old.find(x => x[0] === h.id);
    if (o) h.charge = o[1];
  });
  B.beasts.forEach(b => {
    const o = ob.find(x => x[0] === b.k);
    if (o) b.charge = o[1];
  });
  persist();
}
