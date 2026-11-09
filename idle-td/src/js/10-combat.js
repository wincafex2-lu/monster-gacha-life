/* ---------- 戰鬥：普攻、投射物、傷害、山門受傷 ---------- */
// 普攻倍率：普攻比大招弱太多（後期大招占 85% 以上），普攻另外 ×NA，大招、神獸不變
const NA = 4;
// 星弓少女：大招「鷹眼星瞳」是長時間強化普攻（爆擊率 +50%、爆擊傷害 ×2→×3，持續 15 秒），所以充能比別人慢一半
const chgMul = id => (id === 'mecha' && PS.aw && PS.aw.mecha ? 1.6 : 1),
  FOCUS_T = 15;
function heroFire(h) {
  const d = CH[h.id],
    R = ROLE[d.role];
  let tg = h.anim.target;
  if (!tg || tg.dead) {
    const a = B.enemies.filter(e => !e.dead);
    if (!a.length) return;
    tg = a.reduce((m, e) => (e.x < m.x ? e : m));
  }
  const p = {
    x: h.x + 18,
    y: h.y - 70,
    sx: h.x + 18,
    sy: h.y - 70,
    tx: tg.x,
    ty: tg.y - tg.ay * 0.45,
    target: tg,
    spd: 900,
    life: 3 * ZM,
    dmg: heroAtk(h.id) * NA * (h.id === 'archer' ? 2.5 : 1),
    kind: R.proj,
    c: d.c,
    aoe: R.aoe || 0,
    knock: R.knock || 0,
    from: h,
    spr: PSPR[h.id],
    hx: HX[h.id],
    sp: h.id
  };
  {
    const fo = h.id === 'archer' && B.focusT > 0,
      cc = Math.min(0.95, PS.crit + (fo ? 0.5 : 0));
    if (cc > 0 && Math.random() < cc) {
      p.dmg *= (fo ? 4 : h.id === 'archer' ? 2.5 : 2) * (1 + PS.critd);
      p.crit = 1;
    }
  }
  SWC = p.crit ? 1 : 0;
  if (h.id === 'mecha') {
    h.n4 = (h.n4 || 0) + 1;
    if (h.n4 >= 3) {
      h.n4 = 0;
      DSRC = 'h:mecha';
      const dd = p.dmg * 1.2;
      addFx({k: 'laser', x: h.x + 20, y: h.y - 60, life: 0.35, c: d.c, w: 900 * ZM});
      B.enemies.forEach(e => {
        if (!e.dead && e.x > h.x && e.x < tg.x + 500 * ZM) hit(e, dd, {c: d.c});
      });
    }
  }
  if (CH[h.id].fs) fsFire(h, p, tg);
  if (h.id === 'monkey') {
    const os = B.enemies.filter(e => !e.dead && e !== tg && e.x < VW - 60);
    if (PS.aw && PS.aw.monkey && Math.random() < 0.3)
      for (let i = 0, nm = PS.my && PS.my.monkey ? (cbOn('monkey') ? 12 : 6) : 3; i < nm && os.length; i++) {
        const o = os.splice(Math.floor(Math.random() * os.length), 1)[0];
        {
          const base = heroAtk('monkey') * NA * (PS.my && PS.my.monkey ? 1 : 0.8),
            cr = Math.random() < Math.min(0.95, PS.crit);
          B.proj.push({
            ...p,
            tx: o.x,
            ty: o.y - o.ay * 0.45,
            target: o,
            dmg: base * (cr ? 2 : 1),
            crit: cr ? 1 : 0,
            sp: '',
            sy: p.sy - 15 * i
          });
        }
        {
          const sd = Math.floor(Math.random() * 3),
            cx = sd === 0 ? Math.max(L.front + 40, o.x - 70) : sd === 1 ? Math.min(VW - 40, o.x + 70) : o.x - 10;
          addFx({
            k: 'clone',
            x: cx,
            y: G,
            life: 0.5,
            key: myKey('monkey'),
            fl: sd === 1 ? -1 : 1,
            top: sd === 2 ? 1 : 0,
            rt: (Math.random() - 0.5) * 0.5
          });
          addFx({k: 'dust', x: cx, y: G, life: 0.35});
        }
      }
    if (PS.mx && PS.mx.monkey) {
      h.n10 = (h.n10 || 0) + 1;
      if (h.n10 >= (PS.r10 && PS.r10.monkey ? 3 : 6)) {
        h.n10 = 0;
        DSRC = 'h:monkey';
        const dd = p.dmg * 10;
        B.enemies.forEach(e => {
          if (!e.dead && e.x < VW - 60) {
            hit(e, dd, {c: '#ffc23a', big: 1});
            e.armor = 4;
          }
        });
        addFx({k: 'staff', x: Math.min(VW - 200, Math.max(500, tg.x)), y: G, life: 0.9});
        B.txt.push({x: Math.min(VW - 200, Math.max(500, tg.x)), y: G - 300, v: '齊天大聖！', t: 0, big: 1, crit: 1});
        shake(10);
        B.hitstop = 0.08;
      }
    }
  }
  if (h.id === 'tanuki' && PS.mx && PS.mx.tanuki && Math.random() < 0.3) {
    const os = B.enemies.filter(e => !e.dead && e !== tg && e.x < VW - 60);
    for (let i = 0; i < 2 && os.length; i++) {
      const o = os.splice(Math.floor(Math.random() * os.length), 1)[0];
      B.proj.push({...p, tx: o.x, ty: o.y - o.ay * 0.45, target: o, sp: '', sy: p.sy - 20 - 15 * i});
    }
  }
  if (PS.aw && PS.aw[h.id]) {
    const aw = h.id,
      others = B.enemies.filter(e => !e.dead && e !== tg && e.x < VW - 60);
    if (aw === 'fox') {
      const n = 2,
        m = 0.6;
      for (let i = 0; i < n && others.length; i++) {
        const o = others[Math.floor(Math.random() * others.length)];
        B.proj.push({
          ...p,
          tx: o.x,
          ty: o.y - o.ay * 0.45,
          target: o,
          dmg: p.dmg * m,
          crit: 0,
          sp: aw === 'fox' ? 'fox' : '',
          sx: p.sx,
          sy: p.sy - (aw === 'mecha' ? 30 + 20 * i : 0)
        });
      }
    }
    if (aw === 'dragon') {
      B.enemies.forEach(e => {
        if (!e.dead && e !== tg && e.x > tg.x - 40 && e.x < tg.x + 350) hit(e, p.dmg * 0.4, {c: '#ff8a3d', slow: 0.4});
      });
      addFx({k: 'laser', x: tg.x - 40, y: tg.y - tg.ay * 0.5, life: 0.25, c: '#ff8a3d', w: 390});
    }
  }
  if (h.id === 'alchemist') {
    B.gateHp = Math.min(B.gateMax, B.gateHp + B.gateMax * 0.004);
  }
  if (R.proj === 'pill' || (R.proj === 'orb' && false)) {
    p.arc = 140;
    p.t = 0;
    p.dur = 0.55;
  }
  if (R.proj === 'slash') p.spd = 1100;
  if (R.proj === 'orb') p.spd = 700;
  if (ZM > 1 && !p.arc && R.proj !== 'slash') {
    const dd = Math.abs(p.tx - p.sx);
    p.arc = Math.min(560, 140 + dd * 0.32);
    p.t = 0;
    p.dur = Math.min(1.6, Math.max(0.4, dd / 1500));
    p.life = Math.max(p.life, p.dur + 1);
  } // 縮小模式：遠程普攻拋高從畫面中間飛過去
  B.proj.push(p);
  h.charge = Math.min(100, h.charge + 2.5 * chgMul(h.id));
  if (R.proj === 'arrow' || R.proj === 'spear') addFx({k: 'muzzle', x: p.x + 10, y: p.y, life: 0.12, c: d.c});
}
function turFire(t, alive) {
  const nT = tierOf(S.tur[t.k].lv);
  if (TUR[t.k].kind !== 'ring' && TUR[t.k].kind !== 'fire')
    for (let i = 1; i < Math.min(nT, alive.length); i++) turShot(t, alive[i]);
  turShot(t, alive[0], alive);
}
function turShot(t, tg, alive) {
  const d = TUR[t.k];
  const p = {
    x: t.x + 20,
    y: G - 62,
    sx: t.x + 20,
    sy: G - 62,
    tx: tg.x,
    ty: tg.y - tg.ay * 0.45,
    target: tg,
    spd: 1000,
    life: 3,
    dmg: turAtk(t.k),
    kind: d.kind,
    c: d.c,
    aoe: d.aoe || 0,
    slow: d.slow || 0,
    spr: PSPR[t.k],
    hx: HX[t.k],
    tw: 1,
    src: 't:' + t.k
  };
  DSRC = 't:' + t.k;
  if (d.kind === 'fire') {
    p.arc = 180;
    p.t = 0;
    p.dur = 0.7;
    p.target = null;
  }
  if (d.kind === 'ring' && alive) {
    addFx({k: 'ring', x: t.x, y: G - 40, life: 0.5, c: d.c, r: 220});
    alive
      .filter(e => e.x < t.x + 260)
      .forEach(e => {
        hit(e, p.dmg, {c: d.c});
        e.stun = Math.max(e.stun, 0.6);
        sprFx('fx_stun', e.x, e.y - e.ay - 10, 0.7);
      });
    return;
  }
  B.proj.push(p);
}
// 精英怪有盾：遠程、法術只打得出 40%；遠程打太遠（離弟子 1100 以上）只有 60%
function dmgMul(p, e) {
  if (!p.from) return 1;
  const r = CH[p.from.id].role;
  let m = 1;
  if (e.elite && !(PS.mx || {}).witch && (r === 'ranged' || r === 'magic')) m *= 0.4;
  if ((PS.mx || {}).shark && r === 'ranged' && e.hp < e.max * 0.5) m *= 1.4;
  if (r === 'ranged' && e.x - p.from.x > 1100) m *= 0.6;
  return m;
}
function projHit(p) {
  p.done = 1;
  DSRC = p.src || (p.from && p.from.id ? 'h:' + p.from.id : 'etc');
  SWC = p.crit ? 1 : 0;
  const M = PS.mx || {};
  if (p.from && p.target && !p.target.dead) {
    const T = p.target,
      r = CH[p.from.id].role;
    if (M.vampire) B.gateHp = Math.min(B.gateMax, B.gateHp + B.gateMax * 0.002);
    if (M.swordsman && p.crit)
      hit(T, p.dmg * 1.5 * dmgMul(p, T), {
        c: '#ff5a2a',
        crit: 1,
        big: 1,
        nosw: 1,
        src: p.src || (p.from ? 'h:' + p.from.id : DSRC)
      });
    if (M.disciple && p.from.id === 'disciple')
      B.enemies
        .filter(e => !e.dead && e !== T && e.x > T.x && e.x < T.x + 220)
        .slice(0, 2)
        .forEach(e => hit(e, p.dmg, {c: p.c}));
    if (M.kitsune && r === 'magic') {
      const o = B.enemies.find(e => !e.dead && e !== T && Math.abs(e.x - T.x) < 300 && Math.abs(e.x - T.x) > p.aoe);
      if (o) {
        hit(o, p.dmg * 0.5, {c: '#5ab8ff'});
        sprFx('fx_fire', o.x, o.y - o.ay * 0.5, 0.7);
      }
    }
    if (M.panda && p.from.id === 'panda') {
      p.from.n3 = (p.from.n3 || 0) + 1;
      if (p.from.n3 >= 3) {
        p.from.n3 = 0;
        T.stun = Math.max(T.stun, 1);
        if (!T.boss) T.kb = Math.min(160, T.kb + 60);
        sprFx('fx_blunt', T.x, T.y - T.ay * 0.5, 1.4);
        shake(3);
      }
    }
  }
  if (p.from && p.target && !p.target.dead && !p.target.boss) {
    if (PS.cap && Math.random() < PS.cap) {
      const e = p.target,
        fc = (S.fbOn || []).slice(0, fbSlots()).includes('zijin') && S.fb.zijin ? fbV('zijin') : 0,
        zq = Math.random() * PS.cap >= fc;
      hit(e, e.hp + 1, {c: zq ? '#ff6a2a' : '#c08aff', big: 1, src: zq ? 'b:zhuque' : 'fb:zijin', nodps: 1});
      addFx({k: 'ring', x: e.x, y: e.y - e.ay * 0.5, life: 0.4, c: '#c08aff', r: 60});
      if (fb10('zijin'))
        B.enemies.forEach(o => {
          if (!o.dead && !o.boss && o !== e && Math.abs(o.x - e.x) < 150)
            hit(o, o.hp + 1, {c: '#c08aff', big: 1, src: 'fb:zijin', nodps: 1});
        });
    } else if (PS.bind && Math.random() < PS.bind) {
      p.target.stun = Math.max(p.target.stun, 1);
    }
  }
  if (p.from && p.target && !p.target.dead && PS.burnc && Math.random() < PS.burnc) {
    const t = p.target;
    t.burnS = t.burnS || 'b:bifang';
    t.burn = Math.max(t.burn || 0, 2);
    t.burnD = Math.max(t.burnD || 0, p.dmg * 0.3);
  }
  if (p.from && p.target && !p.target.dead && fb10('fenghuo')) {
    const t = p.target;
    t.burnS = t.burnS || DSRC;
    t.burn = Math.max(t.burn || 0, 2);
    t.burnD = Math.max(t.burnD || 0, p.dmg * 0.3);
  }
  if (p.sp === 'fox')
    B.enemies.forEach(e => {
      if (!e.dead && Math.abs(e.x - p.tx) < (p.aoe || 90)) {
        e.burnS = DSRC;
        e.burn = Math.max(e.burn || 0, 3);
        e.burnD = Math.max(e.burnD || 0, p.dmg * 0.35);
      }
    });
  if (p.sp === 'monkey' && p.target) {
    const T = p.target;
    B.enemies.forEach(e => {
      if (!e.dead && e !== T && e.x > T.x && e.x < T.x + 150) hit(e, p.dmg * 0.6, {c: '#ffc23a'});
    });
  }
  if (p.sp === 'slingkid' && p.from && M.slingkid && p.target) {
    const T = p.target;
    B.enemies
      .filter(e => !e.dead && e !== T && Math.abs(e.x - T.x) < 350)
      .sort((a, b) => Math.abs(a.x - T.x) - Math.abs(b.x - T.x))
      .slice(0, 2)
      .forEach(o => {
        hit(o, p.dmg * 0.5, {c: '#e0b070'});
        addFx({k: 'spark', x: o.x, y: o.y - o.ay * 0.45, life: 0.2, c: '#e0b070'});
      });
  }
  if (
    p.sp === 'archer' &&
    p.from &&
    M.archer &&
    p.target &&
    !p.target.dead &&
    (Math.random() < (PS.r10 && PS.r10.archer ? 0.4 : 0.2) + (PS.my && PS.my.archer && p.crit ? 0.3 : 0) ||
      (p.target.bzm > 0 && RES[2].on()))
  ) {
    const T = p.target;
    B.enemies.forEach(e => {
      if (!e.dead && Math.abs(e.x - T.x) < 260) hit(e, p.dmg * 8, {c: '#bfe6ff', big: 1, crit: 1});
    });
    sprFx('fx_thunder', T.x, T.y - T.ay * 0.5, 2);
    addFx({k: 'ring', x: T.x, y: T.y - T.ay * 0.5, life: 0.4, c: '#bfe6ff', r: 260});
    shake(4);
  }
  if (p.sp === 'archer' && p.target) {
    B.enemies
      .filter(e => !e.dead && e !== p.target && e.x > p.target.x)
      .sort((a, b) => a.x - b.x)
      .slice(0, 2)
      .forEach(e => {
        hit(e, p.dmg * 0.6, {c: p.c});
        if (p.hx) sprFx(p.hx, e.x, e.y - e.ay * 0.45, 0.6);
      });
  }
  if (p.sp === 'dragon' && p.target && !p.target.dead && Math.random() < (PS.r10 && PS.r10.dragon ? 0.5 : 0.25)) {
    p.target.stun = Math.max(p.target.stun, PS.r10 && PS.r10.dragon ? 2 : 1);
    sprFx('fx_stun', p.target.x, p.target.y - p.target.ay - 10, 0.7);
  }
  if (p.hx) sprFx(p.hx, p.tx, p.ty, p.aoe ? 1.3 : p.tw ? 1.25 : 0.8);
  if (p.sp === 'nezha' || p.sp === 'aobing' || p.sp === 'nzb') fsProj(p);
  if (p.aoe) {
    B.enemies.forEach(e => {
      if (!e.dead && Math.abs(e.x - p.tx) < p.aoe && Math.abs(e.y - e.ay * 0.45 - p.ty) < p.aoe * 1.5)
        hit(e, p.dmg * dmgMul(p, e), {c: p.c, kb: p.knock, na: 1});
    });
    addFx({k: 'boom', x: p.tx, y: p.ty, life: 0.35, c: p.c, r: p.aoe});
  } else if (p.target && !p.target.dead) {
    hit(p.target, p.dmg * dmgMul(p, p.target), {
      c: p.crit ? '#ff4a3a' : p.c,
      kb: p.knock,
      slow: p.slow,
      big: p.crit,
      crit: p.crit,
      na: 1
    });
    addFx({k: 'spark', x: p.tx, y: p.ty, life: 0.2, c: p.c});
  } else addFx({k: 'spark', x: p.tx, y: p.ty, life: 0.2, c: p.c});
}
let DSRC = 'etc',
  SWC = 0;
const FOX_BOSS = 30; // 狐火燎原炸到王：最多天狐普攻 ×30（王要靠隊伍成長打）// SWC：現在這一下是不是從爆擊的普攻帶出來的
function hit(e, amt, o = {}) {
  if (e.dead || e.x > VW - 50) return; // 怪還沒走進畫面不能打
  // 劍意連斬：大招打中有爆擊率的機會追加一刀（這下 ×3）；弟子普攻爆擊時，這一下帶出來的技能傷害（星隕、穿透、雷射、大棍…）也追加一刀（×1.5）。普攻本體另外算，燒傷每跳、陣法、神獸、法寶不算。DPS 算給出手的人
  if (PS.mx && PS.mx.swordsman && !o.nosw && !o.na) {
    const sr = String(o.src || DSRC);
    let m = 0;
    if (sr.startsWith('u:')) {
      if (Math.random() < Math.min(0.95, PS.crit)) m = 3;
    } else if (SWC && sr.startsWith('h:')) m = 1.5;
    if (m) {
      const a = amt;
      hit(e, a, {...o, nosw: 1});
      if (!e.dead) hit(e, a * m, {c: '#ff5a2a', crit: 1, big: 1, src: sr, nosw: 1});
      return;
    }
  }
  const hp0 = Math.max(0, e.hp);
  const amt0 = amt;
  if (e.boss && PS.boss) amt *= 1 + PS.boss;
  // 全隊增傷極意（DPS 表一律算給打出這一下的人，泓 2026-11-05）
  const M = PS.mx || {},
    bon = [];
  const mul = (id, m) => {
    amt *= m;
    bon.push([id, Math.log(m)]);
  };
  if (M.fox && e.burn > 0) mul('fox', 2);
  if (cbOn('fox') && B.zones && B.zones.some(z => z.k === 'fire' && Math.abs(e.x - z.x) < z.r)) mul('fox', 3);
  if (M.moonrabbit && B.shield > 0) mul('moonrabbit', 1.4);
  if (M.dragon && e.stun > 0) mul('dragon', 2);
  if (e.stun > 0 && fb10('kunxian')) mul('fb:kunxian', 1.5);
  if (e.boss && fb10('zhaoyao')) mul('fb:zhaoyao', 2);
  if (e.armor > 0) mul('monkey', cbOn('monkey') ? 3 : 1.5);
  if (e.lift > 0) mul('dragon', cbOn('dragon') ? 4 : 1.5);
  if (e.mark > 0 || (cbOn('archer') && e.frog > 0)) mul('archer', 2);
  if (e.melt > 0) mul('mecha', cbOn('mecha') ? 2 : 1.3);
  if (e.vuln > 0) mul(e.vulnS || 'vampire', 1.25);
  if (e.frog > 0) mul('witch', 1.5);
  if (B.qlT > 0) mul('b:qilin', 2);
  if (e.bzm > 0) mul('b:baize', 1.5);
  if (e.bzv > 0) mul('b:baize', e.boss ? 3 : 2);
  if (e.fog > 0) mul('b:tengshe', 1.5);
  if (PS.ctrl && (e.stun > 0 || e.slow > 0 || e.conf > 0 || e.frog > 0)) mul('b:tengshe', 1 + PS.ctrl);
  if (PS.elite && e.elite) mul('b:baize', 1 + PS.elite);
  if (PS.flyd && e.fly) mul('b:tengshe', 1 + PS.flyd);
  if (PS.burnv && e.burn > 0) mul('b:bifang', 1 + PS.burnv);
  {
    const xk = xCur();
    if (xk === 'taotie' && B.ttN) mul('x:taotie', 1 + Math.min(1, 0.02 * xAv('taotie') * B.ttN));
    else if (xk === 'qiongqi' && (e.boss || e.fly)) mul('x:qiongqi', 2 + 0.5 * (Math.min(5, xSt('qiongqi')) - 1));
    else if (xk === 'taowu' && B.gateHp < B.gateMax * 0.5) mul('x:taowu', 1 + 0.5 * xAv('taowu'));
  }
  {
    const sr = String(o.src || DSRC),
      sid = sr.slice(2);
    if (e.bit > 0) mul('yangjian', M.yangjian ? 1.875 : 1.25);
    if (e.crk > 0) {
      mul('yangjian', e.boss ? 2 : 1.5);
      if (cbOn('yangjian') && CH[sid] && CH[sid].role === 'melee') mul('yangjian', 2);
    }
    if (PS.my && PS.my.yangjian && e.boss && o.crit) mul('yangjian', 2);
    if (PS.my && PS.my.aobing && e.stun > 0) mul('aobing', 2);
    if (icefire() && e.burn > 0 && e.stun > 0) mul('nezha', 4);
    if (tgdf() && sid === 'monkey' && (e.bit > 0 || e.crk > 0)) mul('yangjian', 3);
    if (tgdf() && sid === 'yangjian' && e.armor > 0) mul('monkey', 3);
  }
  if (M.elf && (e.slow > 0 || e.stun > 0)) mul('elf', 1.3);
  if (M.catsamurai && e.hp < e.max * 0.3) mul('catsamurai', 2);
  if (M.mummy && B.gateHp < B.gateMax * 0.3) mul('mummy', 1.5);
  if (B.ovT > 0 && String(o.src || DSRC).startsWith('u:')) mul('mecha', 2);
  if (PS.my) {
    if (PS.my.alchemist) mul('alchemist', 1.5);
    if (PS.my.mecha && B.mechT > 0) mul('mecha', 1.5);
  }
  if (o.q) {
    const Mt = amt / amt0;
    amt = amt0 * (1 + (Mt - 1) * o.q);
  } // q：只吃增傷的這個比例（狐火燎原 1/4）
  if (M.yukionna && e.slow > 0 && !e.boss && Math.random() < 0.08) {
    e.stun = Math.max(e.stun, 2);
    sprFx('fx_ice', e.x, e.y - e.ay * 0.5, 0.8);
  }
  e.hp -= amt;
  e.flash = 0.08;
  if (B.dmg && !o.nodps) {
    const src = o.src || DSRC,
      dealt = Math.min(hp0, Math.max(0, amt));
    B.dmg[src] = (B.dmg[src] || 0) + dealt;
  }
  if (o.kb && !e.boss) e.kb = Math.min(160, e.kb + o.kb);
  if (o.slow) {
    e.slow = Math.max(e.slow, o.slow);
    e.slowT = 2;
  }
  if (!o.small) SND.play(o.crit ? 'crit' : 'hit');
  if (!o.small || Math.random() < 0.35) dmgText(e.x + (Math.random() * 20 - 10), e.y - e.ay - 6, amt, o.big, o.crit);
  if (e.hp <= 0) {
    if (PS.my && PS.my.aobing && e.stun > 0 && !e.shat2) {
      e.shat2 = 1;
      const sx = e.x,
        sd = heroAtk('aobing') * NA * 3;
      sprFx('fx_ice', sx, e.y - e.ay * 0.5, 1.2);
      B.enemies.forEach(o => {
        if (!o.dead && o !== e && o.hp > 0 && Math.abs(o.x - sx) < 160)
          hit(o, sd, {c: '#bfefff', src: 'h:aobing', small: 1});
      });
    }
    if (PS.my && PS.my.fox && e.burn > 0 && !e.boom) {
      e.boom = 1;
      const bd = e.max * 0.2,
        ex = e.x,
        bcap = heroAtk('fox') * NA * FOX_BOSS;
      addFx({k: 'ring', x: ex, y: e.y - 20, life: 0.35, c: '#ff8a3d', r: 200});
      B.enemies.forEach(o => {
        if (!o.dead && o !== e && o.hp > 0 && Math.abs(o.x - ex) < 220)
          hit(o, o.boss ? Math.min(bd, bcap) : bd, {c: '#ff8a3d', src: 'hpboom', q: 0.25});
      });
    }
    if ((PS.mx || {}).fox && e.burn > 0)
      B.enemies.forEach(o => {
        if (!o.dead && o !== e && Math.abs(o.x - e.x) < 200) {
          o.burnS = e.burnS;
          o.burn = Math.max(o.burn || 0, 3);
          o.burnD = Math.max(o.burnD || 0, e.burnD || 0);
        }
      });
    if ((PS.mx || {}).jiangshi && e.stun > 0)
      B.enemies.forEach(o => {
        if (!o.dead && o !== e && Math.abs(o.x - e.x) < 160) {
          o.stun = Math.max(o.stun, 1);
        }
      });
    if (e.sand > 0) S.coin += e.coin;
    if (e.loot > 0 && Math.random() < 0.3) S.coin += e.coin;
    if (B.shatT > 0 && e.stun > 0 && !e.shat) {
      e.shat = 1;
      const sx = e.x;
      sprFx('fx_ice', sx, e.y - e.ay * 0.5, 1.3);
      B.enemies.forEach(o => {
        if (!o.dead && o !== e && o.hp > 0 && Math.abs(o.x - sx) < 160)
          hit(o, B.shatD, {c: '#bfefff', src: 'u:yukionna'});
      });
    }
    e.dead = 0.001;
    S.coin += e.coin;
    if (e.elite) {
      S.gem += 2;
      B.txt.push({x: e.x, y: e.y - e.ay - 50, v: '+2 靈石', t: 0, coin: 1});
    }
    SND.play('coin');
    if (e.boss) SND.setBoss(false);
    B.killed++;
    coinText(e);
    for (let i = 0; i < 5; i++)
      addFx({
        k: 'coin',
        x: e.x,
        y: e.y - e.ay * 0.5,
        vx: (Math.random() - 0.5) * 160,
        vy: -120 - Math.random() * 120,
        life: 0.6
      });
    if (e.boss) {
      shake(14);
      B.hitstop = 0.18;
      document.getElementById('bossBar').style.display = 'none';
      for (let i = 0; i < 4; i++)
        addFx({
          k: 'boom',
          x: e.x + (Math.random() - 0.5) * e.w * 0.5,
          y: e.y - Math.random() * e.ay,
          life: 0.5 + i * 0.1,
          c: '#ffd86a',
          r: 90
        });
    }
    updHud();
  }
}
function gateDamage(d, e) {
  if (B.state !== 'run') return;
  if (B.shield > 0) return;
  if (B.arrD === 'd_gold') d *= 1 - Math.min(0.75, dv('d_gold', S.arr.d_gold.lv) + (paired('xuanwu') ? 0.1 : 0));
  if (B.beasts.some(b => b.k === 'xuanwu')) d *= 0.85;
  if (PS.dr) d *= 1 - PS.dr;
  if (B.arrD === 'd_mirror' && e && !e.dead)
    hit(e, arrDps('d_mirror') * dv('d_mirror', S.arr.d_mirror.lv), {c: '#dff6ff', small: 1, src: 'a:d_mirror'});
  B.gateHp -= d;
  B.gateHit = 0.2;
  SND.play(e && e.boss ? 'bosshit' : 'gate');
  shake(2.5);
  if (fb10('dinghai') && !B.dhUsed && B.gateHp < B.gateMax * 0.3) {
    B.dhUsed = 1;
    B.gateHp = B.gateMax;
    B.txt.push({x: L.front, y: G - 260, v: '定海不倒！', t: 0, big: 1});
  }
  if (xOnK('taowu') && !B.twUsed && B.gateHp < B.gateMax * 0.1) {
    B.twUsed = 1;
    B.twT = 5;
    B.txt.push({x: L.front, y: G - 260, v: '頑石不倒！', t: 0, big: 1});
  }
  if (B.twT > 0 && B.gateHp < 1) B.gateHp = 1;
  if (B.gateHp <= 0) {
    B.gateHp = 0;
    stageLose();
  }
}
