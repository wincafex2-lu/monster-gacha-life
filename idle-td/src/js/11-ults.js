/* ---------- 神獸大招 ---------- */
function castBeast(i) {
  const b = B.beasts[i];
  if (!b || b.charge < 100 || B.state !== 'run') return;
  DSRC = 'b:' + b.k;
  b.charge = 0;
  const u = BULT[b.k];
  SND.play('ult', u.r);
  {
    const m = MAN['b_' + b.k];
    shout(b.x, (b.y || G) - (m ? (BEAST[b.k].fly ? m[1] / 4 : m[3] / 2) : 150) - 28, u.n, '#9fe3ff');
  }
  const ul = bUlv(b.k),
    a = beastAtk(b.k) * (1 + 0.5 * (ul - 1)),
    al = () => B.enemies.filter(e => !e.dead && e.x < VW - 60);
  b.anim = 0.45;
  shake(10);
  B.hitstop = 0.08;
  if (b.k === 'baihu') {
    al().forEach(e => {
      if (!e.fly) {
        hit(e, a * 6, {c: '#ffffff', kb: 120, big: 1});
        e.stun = Math.max(e.stun, 1.5);
      } else hit(e, a * 3, {c: '#ffffff', big: 1});
    });
    addFx({k: 'ring', x: b.x + 60, y: G - 40, life: 0.7, c: '#ffffff', r: 900 * ZM});
    ultFx('ult_mecha', b.x + 300, G - 150, 1);
  } else if (b.k === 'qinglong') {
    for (let j = 0; j < 10; j++)
      setTimeout(() => {
        DSRC = 'b:qinglong';
        const T = al();
        if (!T.length) return;
        const e = T[Math.floor(Math.random() * T.length)];
        B.enemies.forEach(o => {
          if (!o.dead && Math.abs(o.x - e.x) < 90) hit(o, a * 3, {c: '#bfa0ff', big: 1});
        });
        sprFx('fx_thunder', e.x, e.y - e.ay * 0.5, 1.8);
        shake(4);
      }, j * 200);
  } else if (b.k === 'zhuque') {
    const sh = RES[3].on();
    if (sh) {
      addFx({k: 'bult', key: 'bu_bifang', life: 1.2, ox: b.x + 80, oy: (b.y || G) - 120, fly: 1});
      B.txt.push({x: VW * 0.5, y: G - 300, v: '雙火鳥！', t: 0, big: 1});
    }
    al().forEach(e => {
      if (sh) {
        e.burnD = Math.max(e.burnD || 0, a * 1.2);
      }
      hit(e, a * 4, {c: '#ff8a3d', big: 1});
      e.burnS = DSRC;
      e.burn = Math.max(e.burn || 0, 5);
      e.burnD = Math.max(e.burnD || 0, a * 0.6);
      sprFx('fx_fire', e.x, e.y - e.ay * 0.5, 1.4);
    });
  } else if (b.k === 'xuanwu') {
    B.shield = 4 + 0.5 * (ul - 1);
    B.gateHp = Math.min(B.gateMax, B.gateHp + B.gateMax * (0.1 + 0.05 * (ul - 1)));
    sprFx('fx_heal', L.gx, G - 110, 2);
    if (RES[1].on()) {
      al().forEach(e => {
        if (!e.boss) e.conf = Math.max(e.conf || 0, B.shield);
      });
      B.txt.push({x: L.gx + 200, y: G - 260, v: '龜蛇合體！', t: 0, big: 1});
    }
  } else if (b.k === 'qilin') {
    B.qlT = 8;
    B.gateHp = Math.min(B.gateMax, B.gateHp + B.gateMax * 0.3);
    al().forEach(e => hit(e, a * 3, {c: '#ffd84a', big: 1}));
    sprFx('fx_heal', L.gx, G - 110, 2.2);
  } else if (b.k === 'baize') {
    B.enemies.forEach(e => {
      if (!e.dead && e.x < VW - 50) {
        e.bzv = 6;
        hit(e, a * 2, {c: '#e8f0ff', big: 1});
      }
    });
  } else if (b.k === 'tengshe') {
    al().forEach(e => {
      e.fog = 6;
      hit(e, a * 2, {c: '#dde8f0', big: 1});
      if (!e.boss) e.conf = Math.max(e.conf || 0, 6);
    });
    addFx({k: 'frost', life: 1.4, c: '#dde8f0', fk: 'ice'});
  } else if (b.k === 'bifang') {
    al().forEach(e => {
      hit(e, a * 4, {c: '#3ad0ff', big: 1});
      e.burnS = DSRC;
      e.burn = Math.max(e.burn || 0, 5);
      e.burnD = Math.max(e.burnD || 0, a * 0.6);
      sprFx('fx_fire', e.x, e.y - e.ay * 0.5, 1.4);
    });
  }
  if (BEAST[b.k].sh && MAN['bu_' + b.k])
    addFx({k: 'bult', key: 'bu_' + b.k, life: 1.2, ox: b.x + 110, oy: (b.y || G) - 90, fly: b.k === 'bifang'});
}
/* ---------- 大招 ---------- */
// 大招冷卻：每招依強度不同（秒）；充能加成、普攻充能、別人送的充能最多只能把冷卻降到一半
const UCD = {
  yangjian: 20,
  nezha: 18,
  aobing: 22,
  fox: 20,
  dragon: 18,
  archer: 24,
  mecha: 22,
  alchemist: 20,
  monkey: 18,
  vampire: 16,
  yukionna: 18,
  catsamurai: 16,
  moonrabbit: 22,
  pharaoh: 16,
  elf: 16,
  kitsune: 14,
  shark: 14,
  tanuki: 14,
  disciple: 10,
  general: 18,
  swordsman: 12,
  panda: 12,
  pirate: 12,
  jiangshi: 14,
  witch: 14,
  mummy: 14,
  grandma: 18,
  slingkid: 10,
  drummer: 20
};
const ucdOf = id => UCD[id] || 16;
// 泓 2026-11-06：大招名字喊在放招的人頭上（不然不知道誰放什麼招）
function shout(x, y, n, c) {
  let lv = 0;
  while (
    lv < 5 &&
    B.txt.some(q => q.shout && q.lv === lv && Math.abs(q.x - x) < (q.v.length + n.length + 1) * 17 && q.t < 1.3)
  )
    lv++;
  B.txt.push({x, y: y - lv * 40, lv, v: n + '！', t: 0, shout: 1, life: 1.6, c});
}
function cbShout(n, id) {
  const h = B.heroes.find(x => x.id === id);
  if (h) shout(h.x, h.y - 205, '合擊・' + n, '#ffd84a');
}
function castUlt(i) {
  const h = B.heroes[i];
  if (
    !h ||
    h.charge < 100 ||
    h.anim?.type === 'ult' ||
    B.state !== 'run' ||
    h.ucd > 0 ||
    (h.id === 'archer' && B.focusT > 1)
  )
    return;
  h.charge = 0;
  h.ucd = ucdOf(h.id) / 2;
  h.ifc = 0;
  if (icefire() && (h.id === 'nezha' || h.id === 'aobing')) {
    const o = B.heroes.find(x => x.id === (h.id === 'nezha' ? 'aobing' : 'nezha'));
    if (o && o.charge >= 100) {
      o.charge = 0;
      o.ucd = ucdOf(o.id) / 2;
      h.ifc = 1;
    }
  }
  h.anim = {type: 'ult', t: 0};
  SND.play('ult', h.id);
  if (PS.mx && PS.mx.drummer) B.drumT = 6;
  if (PS.my && PS.my.mecha && h.id === 'mecha') B.mechT = 6;
  if (PS.mx && PS.mx.mecha && h.id === 'mecha') B.ovT = 6;
  if (PS.mx && PS.mx.mecha && h.id === 'mecha')
    B.heroes.forEach(o => {
      if (o !== h) o.charge = Math.min(100, o.charge + 50);
    });
  if (PS.r10 && PS.r10.mecha && h.id === 'mecha') h.charge = 50;
  if (PS.mx && PS.mx.grandma) B.gateHp = Math.min(B.gateMax, B.gateHp + B.gateMax * 0.05);
  const d = CH[h.id];
  shout(h.x, h.y - 165, d.un, d.c);
}
// 大招射程（從山門前算起）：雷射打整排，其他只打射程內
const ULT_R = {sweep: 900, slam: 750, rain: 1100, freeze: 1000, heal: 600, drain: 900, laser: 99999, focus: 0};
function doUlt(h) {
  DSRC = 'u:' + h.id;
  if (h.id === 'dragon' && PS.mx && PS.mx.dragon)
    B.enemies.forEach(e => {
      if (!e.dead) e.stun = Math.max(e.stun, 3);
    });
  const d = CH[h.id],
    dmg =
      heroAtk(h.id) *
      7 *
      (1 + PS.ultm) *
      TR('ult') *
      (d.r === 'L' ? 1.5 : 1) *
      (h.id === 'mecha' && PS.aw && PS.aw.mecha ? 1.5 : 1) *
      (isMy(h.id) ? 1.5 : 1);
  shake(10);
  B.hitstop = 0.08;
  const UR = h.id === 'yangjian' ? 950 : ULT_R[CH[h.id].ult] || 900,
    lim = Math.min(VW - 60, L.front + UR),
    alive = () => B.enemies.filter(e => !e.dead && e.x < lim);
  if (ULTFX[h.id]) {
    const a = alive().sort((x, y) => x.x - y.x);
    const pre = ULTFX[h.id];
    if (h.id === 'alchemist') ultFx(pre, L.front + 120, G - 150, 1);
    else if (h.id === 'archer') {
      const xs = a.length ? [a[0].x, a[Math.floor(a.length / 2)].x, a[a.length - 1].x] : [L.front + 300];
      [...new Set(xs.map(x => Math.round(x / 150)))].forEach((q, i) => ultFx(pre, q * 150, G - 150, 0.9, i * 0.12));
    } else {
      const c = a.length ? a[Math.min(a.length - 1, 1)] : null;
      ultFx(pre, c ? c.x : L.front + 320, G - 150, 1.15);
    }
  }
  if (h.id === 'moonrabbit') B.shield = Math.max(B.shield, 4);
  if (d.ult === 'freeze') alive().forEach(e => sprFx(d.fk === 'ice' ? 'fx_ice' : 'fx_stun', e.x, e.y - e.ay * 0.5, 1));
  if (d.ult === 'heal') sprFx('fx_heal', L.gx, G - 110, 2);
  addFx({k: 'shock', x: h.x, y: h.y, life: 0.5, c: d.c});
  if (d.ult === 'sweep') {
    addFx({
      k: 'sweep',
      x: h.x + 40,
      y: G - 110,
      life: Math.max(0.4, (lim - h.x - 40) / 1500),
      c: d.c,
      hitSet: new Set(),
      dmg,
      upd: (f, dt) => {
        f.x = Math.min(lim, f.x + dt * 1500);
        alive().forEach(e => {
          if (!f.hitSet.has(e) && e.x < f.x) {
            f.hitSet.add(e);
            hit(e, dmg, {c: d.c, kb: 30, big: 1});
          }
        });
      }
    });
  } else if (d.ult === 'rain') {
    const n = 18;
    for (let i = 0; i < n; i++) {
      const a = alive();
      const tx = a.length
        ? a[i % a.length].x + (Math.random() - 0.5) * 40
        : L.front + 150 + Math.random() * Math.max(100, lim - L.front - 200);
      const delay = i * 0.05;
      addFx({
        k: 'rainp',
        x: tx + 180,
        y: TOPY - 40,
        tx,
        ty: G - 30,
        life: 0.45 + delay,
        delay,
        c: d.c,
        rk: d.rk,
        dmg: dmg / 4,
        rr: h.id === 'pirate' ? 140 : 70,
        bn: h.id === 'slingkid' ? 2 : 0,
        upd: f => {
          if (!f.hitDone && f.t >= f.life - 0.02) {
            f.hitDone = 1;
            B.enemies.forEach(e => {
              if (!e.dead && Math.abs(e.x - f.tx) < f.rr) {
                hit(e, f.dmg, {c: f.c, kb: 6, big: 1});
                if (h.id === 'pirate') e.loot = 1.5;
              }
            });
            addFx({k: 'boom', x: f.tx, y: f.ty, life: 0.35, c: f.c, r: f.rr});
            let bx = f.tx;
            for (let j = 0; j < f.bn; j++) {
              const os = B.enemies.filter(
                e => !e.dead && e.x < VW - 50 && Math.abs(e.x - bx) < 300 && Math.abs(e.x - bx) > 30
              );
              if (!os.length) break;
              const o = os[Math.floor(Math.random() * os.length)];
              hit(o, f.dmg * 0.7, {c: f.c, big: 1});
              addFx({k: 'boom', x: o.x, y: G - 30, life: 0.3, c: f.c, r: 50});
              bx = o.x;
            }
          }
        }
      });
    }
  } else if (d.ult === 'slam') {
    addFx({
      k: 'wave',
      x: L.front,
      y: G,
      life: Math.max(0.4, (lim - L.front) / 1300),
      c: d.c,
      hitSet: new Set(),
      upd: (f, dt) => {
        f.x = Math.min(lim, f.x + dt * 1300);
        alive().forEach(e => {
          if (!f.hitSet.has(e) && e.x < f.x && !e.fly) {
            f.hitSet.add(e);
            hit(e, dmg, {c: d.c, kb: 70, big: 1});
            e.stun = Math.max(e.stun, 0.8);
          }
        });
      }
    });
    alive()
      .filter(e => e.fly)
      .forEach(e => hit(e, dmg * 0.6, {c: d.c, big: 1}));
    shake(16);
  } else if (d.ult === 'laser') {
    addFx({
      k: 'laser',
      x: h.x + 20,
      y: h.y - 70,
      life: 0.8,
      c: d.c,
      tick: 0,
      upd: (f, dt) => {
        f.tick -= dt;
        if (f.tick <= 0) {
          f.tick = 0.16;
          alive().forEach(e => hit(e, dmg / 5, {c: f.c, big: 1}));
        }
      }
    });
  } else if (d.ult === 'heal') {
    B.gateHp = Math.min(B.gateMax, B.gateHp + B.gateMax * 0.35);
    B.buff = 8;
    addFx({k: 'heal', x: L.gx, y: G, life: 1.4});
    alive().forEach(e => hit(e, dmg * 0.4, {c: d.c}));
    toast(
      PS.mx && PS.mx.alchemist
        ? '山門回復 35%！（仙丹爐火常駐中，攻擊加成本來就一直有）'
        : '山門回復！全員攻擊 +30%（8 秒）'
    );
  } else if (d.ult === 'focus') {
    B.focusT = FOCUS_T;
    addFx({k: 'ring', x: h.x, y: h.y - 60, life: 0.6, c: d.c, r: 120});
    toast(`鷹眼星瞳！星弓少女 ${FOCUS_T} 秒內爆擊率 +50%、爆擊傷害 ×4`);
  } else if (d.ult === 'freeze') {
    alive().forEach(e => {
      hit(e, dmg * 0.6, {c: d.c, big: 1});
      e.stun = Math.max(e.stun, 3.2);
    });
    addFx({k: 'frost', life: 1.2, c: d.c, fk: d.fk});
  } else if (d.ult === 'drain') {
    alive().forEach(e => {
      hit(e, dmg * 0.8, {c: d.c, big: 1});
      addFx({k: 'drain', x: e.x, y: e.y - e.ay * 0.5, tx: L.gx, ty: G - 120, life: 0.6, c: d.c});
    });
    B.gateHp = Math.min(B.gateMax, B.gateHp + B.gateMax * 0.15);
    addFx({k: 'moon', life: 1.2});
  }
  DSRC = 'u:' + h.id;
  ultExtra(h, dmg, alive, lim);
}
// 大招特色效果（每招除了傷害再多一個只有他有的效果）
const UTK = ['qlT', 'nzT', 'genT', 'mbT', 'gmaT', 'drmT', 'vamT', 'shatT'];
const ULTX = {
  yangjian: '裂縫 4 秒：裂縫上的小怪掉下去暈 2 秒，裂縫裡的怪受傷 ×1.5（Boss ×2）；同時放出 3 隻哮天犬',
  nezha: '踩風火輪從山門衝到最右邊再衝回來，一路撞飛小怪、留下火焰路 4 秒；最後火尖槍插地，火柱爆開（×1.5）',
  aobing: '全場凍住 3 秒（Boss 1 秒），凍住結束時碎冰再打一次（60%）；冰龍掃過全場',
  disciple: '把範圍內的怪掃回去（大擊退），並變慢 50%（3 秒）',
  fox: '流星落地留下狐火地面 4 秒，走過的怪一直燒；打中的全部上燒傷',
  dragon: '把範圍內的小怪挑飛到空中 1.5 秒（不能走、受傷 ×1.5），落地再震一次',
  archer: '射一支星光標記箭打血最多的怪（通常是 Boss），8 秒內受全隊傷害 ×2',
  mecha: '打中的怪裝甲熔化 6 秒（受傷 +30%），Boss 也會被往後推',
  alchemist: '全隊其他人大招充能 +20',
  monkey: '金箍棒連空中的怪一起掃，然後叫分身跟著打 4 秒',
  vampire: '被吸的怪 5 秒內受傷 +25%；吸血鬼自己攻速 ×2（6 秒）',
  yukionna: '暴風雪持續 4 秒（怪變慢 60%）；冰凍中死掉的怪會碎裂濺傷旁邊的怪',
  catsamurai: '居合斬後，血量低於 30% 的小怪直接斬殺，Boss 受 ×3',
  moonrabbit: '全隊月光加持：攻擊 +30%（6 秒）',
  pharaoh: '沙暴持續 5 秒打範圍內的怪、變慢 40%；被沙暴困住時死掉的怪銅錢 ×2',
  elf: '樹根定身 3 秒並每秒毒傷；飛的怪會被拉到地上',
  kitsune: '藍火燒傷會跳到附近的怪（連鎖 3 次）',
  shark: '叉中的怪流血 6 秒（每秒 10%）；Boss 受傷 +25%',
  tanuki: '放煙霧：範圍內的小怪迷路往回走 3 秒；手裡劍旋風再轉 2 圈',
  general: '將軍號令：全隊近戰・坦克攻擊 ×1.5（6 秒）',
  swordsman: '劍氣之後瞬移連斬範圍內 8 下，每下必爆擊',
  panda: '前排的小怪推回去很遠並暈 1.5 秒',
  pirate: '砲彈爆炸範圍變 2 倍；被打死的怪 30% 多掉一份銅錢',
  jiangshi: '小怪定身 4 秒',
  witch: '打中的小怪變成青蛙 3 秒（不能打山門、受傷 ×1.5）',
  mummy: '繃帶把範圍內的小怪拉到一起並暈 1.5 秒，方便一次打完',
  grandma: '全隊攻速 +40%（8 秒）',
  slingkid: '每顆石頭再彈跳 2 次打別隻',
  drummer: '全隊其他人大招充能 +30、全隊攻速 +50%（6 秒）'
};
