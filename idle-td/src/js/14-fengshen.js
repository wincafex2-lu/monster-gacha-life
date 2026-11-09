/* ---------- 封神三傳說：楊戩・哪吒・敖丙 ---------- */
const icefire = () => !!(PS.my && PS.my.nezha && PS.my.aobing),
  tgdf = () => !!(PS.my && PS.my.monkey && PS.my.yangjian);
function spawnDog(dmg, delay) {
  addFx({
    k: 'dog',
    x: L.front + 10 - (delay || 0) * 900,
    y: G,
    life: 3,
    bite: 0,
    hs: new Set(),
    src: 'h:yangjian',
    upd: (f, dt) => {
      if (f.bite > 0) {
        f.bite -= dt;
        if (f.bite <= 0) f.t = f.life - 0.2;
        return;
      }
      if (f.x > VW - 80) {
        f.t = Math.max(f.t, f.life - 0.2);
        return;
      }
      f.x += dt * 1500;
      if (f.x < L.front) return;
      B.enemies.forEach(e => {
        if (!e.dead && !f.hs.has(e) && !e.fly && Math.abs(e.x - f.x) < 40) {
          f.hs.add(e);
          DSRC = 'h:yangjian';
          hit(e, dmg, {c: '#ffe6a0', small: !e.boss});
          e.bit = Math.max(e.bit || 0, 4);
          if (e.boss && !f.bitB) {
            f.bitB = 1;
            f.bite = 1.5;
            e.stun = Math.max(e.stun, 1.5);
            B.txt.push({x: e.x, y: e.y - e.ay - 40, v: '哮天犬咬住！', t: 0, big: 1});
          }
        }
      });
    }
  });
}
function skyLaser(h, dmg) {
  const V = B.enemies.filter(e => !e.dead && e.x < VW - 50 && e.x > h.x);
  addFx({k: 'laser', x: h.x + 20, y: h.y - 92, life: 0.3, c: '#ffe68a', w: VW});
  V.forEach(e => hit(e, dmg, {c: '#ffe68a', src: 'h:yangjian'}));
}
function nzRide(dmg, lim, src) {
  const x0 = L.front;
  addFx({
    k: 'ride',
    x: x0,
    y: G,
    dir: 1,
    life: 1.3,
    hs: new Set(),
    hs2: new Set(),
    src,
    upd: (f, dt) => {
      const q = f.t / 1.3;
      if (q < 0.5) {
        f.dir = 1;
        f.x = x0 + (lim - x0) * q * 2;
      } else {
        f.dir = -1;
        f.x = lim - (lim - x0) * (q - 0.5) * 2;
      }
      const hs = q < 0.5 ? f.hs : f.hs2;
      B.enemies.forEach(e => {
        if (!e.dead && !hs.has(e) && Math.abs(e.x - f.x) < 70) {
          hs.add(e);
          hit(e, dmg * 0.5, {c: '#ff6a3a', big: 1, src});
          if (!e.boss && !e.fly) e.kb = Math.max(e.kb, 200);
        }
      });
    }
  });
  for (let x = x0 + 120; x < lim; x += 260)
    (B.zones = B.zones || []).push({src, k: 'fire', x, r: 140, t: 4, dmg: dmg * 0.05, c: '#ff6a3a'});
}
function fsFire(h, p, tg) {
  const id = h.id,
    oth = () => B.enemies.filter(e => !e.dead && e !== tg && e.x < VW - 60);
  if (id === 'yangjian') {
    h.ndog = (h.ndog || 0) + 1;
    if (h.ndog >= (PS.r10 && PS.r10.yangjian ? 3 : 5)) {
      h.ndog = 0;
      spawnDog(p.dmg * 3);
    }
    if (PS.aw && PS.aw.yangjian && Math.random() < 0.25) skyLaser(h, p.dmg * 1.5);
  }
  if (id === 'nezha') {
    p.sp = 'nezha';
    p.bn = B.nzT > 0 ? 4 : 2;
    if (PS.aw && PS.aw.nezha) {
      const os = oth();
      for (let i = 0; i < 2 && os.length; i++) {
        const o = os.splice(Math.floor(Math.random() * os.length), 1)[0];
        B.proj.push({...p, tx: o.x, ty: o.y - o.ay * 0.45, target: o, sy: p.sy - 18 - 12 * i});
      }
    }
    if (PS.mx && PS.mx.nezha && Math.random() < 0.2) {
      B.enemies.forEach(e => {
        if (!e.dead && Math.abs(e.x - tg.x) < 130) e.stun = Math.max(e.stun, 1.5);
      });
      addFx({k: 'ring', x: tg.x, y: tg.y - tg.ay * 0.4, life: 0.5, c: '#ff4a6a', r: 130});
    }
  }
  if (id === 'aobing') {
    p.sp = 'aobing';
    if (PS.aw && PS.aw.aobing) {
      const d = p.dmg;
      B.enemies.forEach(e => {
        if (!e.dead && !e.fly && e.x > tg.x - 220 && e.x < tg.x + 420)
          hit(e, d, {c: '#bfefff', small: 1, src: 'h:aobing'});
      });
      for (let x = tg.x - 200; x < tg.x + 420; x += 110) sprFx('fx_ice', x, G - 30, 0.6);
    }
  }
}
function fsProj(p) {
  const T = p.target;
  if (!T) return;
  if (p.sp === 'nezha') {
    if (B.nzT > 0) {
      T.burnS = 'h:nezha';
      T.burn = Math.max(T.burn || 0, 3);
      T.burnD = Math.max(T.burnD || 0, p.dmg * 0.3);
    }
    let cur = T;
    const hs = new Set([T]);
    for (let i = 0; i < (p.bn || 2); i++) {
      const o = B.enemies
        .filter(e => !e.dead && !hs.has(e) && e.x < VW - 60 && Math.abs(e.x - cur.x) < 420)
        .sort((a, b) => Math.abs(a.x - cur.x) - Math.abs(b.x - cur.x))[0];
      if (!o) break;
      hs.add(o);
      addFx({
        k: 'laser',
        x: Math.min(cur.x, o.x),
        y: o.y - o.ay * 0.45,
        life: 0.12,
        c: '#ffd84a',
        w: Math.abs(o.x - cur.x)
      });
      hit(o, p.dmg, {c: '#ffd84a', src: 'h:nezha'});
      if (B.nzT > 0) {
        o.burnS = 'h:nezha';
        o.burn = Math.max(o.burn || 0, 3);
        o.burnD = Math.max(o.burnD || 0, p.dmg * 0.3);
      }
      cur = o;
    }
  }
  if (p.sp === 'aobing') {
    const r10 = PS.r10 && PS.r10.aobing;
    B.enemies.forEach(e => {
      if (!e.dead && Math.abs(e.x - p.tx) < (p.aoe || 90)) {
        if (r10 && Math.random() < 0.2) {
          e.stun = Math.max(e.stun, 1.5);
          sprFx('fx_ice', e.x, e.y - e.ay * 0.5, 0.7);
        } else {
          e.slow = Math.max(e.slow, 0.3);
          e.slowT = 2;
        }
      }
    });
  }
}
function fsTick(dt) {
  const T = S.team.slice(0, slots());
  if (PS.mx && PS.mx.aobing) {
    B.alT = (B.alT || 0) + dt;
    if (B.alT >= 20) {
      B.alT = 0;
      B.shield = Math.max(B.shield, 3);
      B.txt.push({x: L.gx + 80, y: G - 260, v: '萬龍甲・冰鱗盾！', t: 0, big: 1});
      (B.sched = B.sched || []).push({
        t: 3,
        src: 'h:aobing',
        fn: () => {
          const V = B.enemies.filter(e => !e.dead && e.x < VW - 50);
          for (let i = 0; i < 6 && V.length; i++) {
            const o = V.splice(Math.floor(Math.random() * V.length), 1)[0];
            hit(o, heroAtk('aobing') * NA * 0.6, {c: '#bfefff', big: 1});
            sprFx('fx_ice', o.x, o.y - o.ay * 0.5, 0.9);
          }
        }
      });
    }
  }
  if (PS.r10 && PS.r10.nezha && T.includes('nezha')) {
    B.nzCd = (B.nzCd || 0) + dt;
    if (B.nzCd >= 30) {
      B.nzCd = 0;
      B.nzT = 8;
      const h = B.heroes.find(x => x.id === 'nezha');
      if (h) {
        B.txt.push({x: h.x, y: h.y - 180, v: '摘下乾坤圈！', t: 0, big: 1, crit: 1});
        addFx({k: 'ring', x: h.x, y: h.y - 60, life: 0.6, c: '#ff3a3a', r: 160});
      }
    }
  }
  if (PS.my && PS.my.nezha && !B.lotus && B.gateHp > 0 && B.gateHp < B.gateMax * 0.3) {
    B.lotus = 1;
    B.gateHp = B.gateMax * 0.6;
    B.shield = Math.max(B.shield, 3);
    sprFx('fx_heal', L.gx, G - 110, 2.2);
    B.txt.push({x: L.gx, y: G - 280, v: '蓮花化身！', t: 0, big: 1});
  }
}
function fsUlt(h, dmg, al, lim, A, Z, Q, inV, sm) {
  const id = h.id,
    src = 'u:' + id;
  if (id === 'yangjian') {
    A.forEach(e => {
      e.crk = 4;
      if (sm(e) && !e.fly) e.stun = Math.max(e.stun, 2);
    });
    addFx({k: 'crack', x0: L.front, x1: lim, life: 4});
    for (let i = 0; i < 3; i++) spawnDog(heroAtk('yangjian') * NA * 3, i * 0.25);
    if (tgdf())
      Q(2, () => {
        cbShout('天宮鬥法', 'monkey');
        DSRC = 'h:monkey';
        for (let i = 0; i < 10; i++) {
          const V = inV();
          if (!V.length) break;
          const o = V[Math.floor(Math.random() * V.length)];
          addFx({
            k: 'clone',
            x: Math.max(L.front + 40, o.x - 70),
            y: G,
            life: 0.5,
            key: myKey('monkey'),
            fl: 1,
            top: Math.random() < 0.4 ? 1 : 0,
            rt: 0
          });
          hit(o, heroAtk('monkey') * NA * 2, {c: '#ffc23a', big: 1});
        }
      });
  }
  if (id === 'monkey' && tgdf()) {
    const yh = B.heroes.find(x => x.id === 'yangjian');
    if (yh)
      Q(2, () => {
        cbShout('天宮鬥法', 'yangjian');
        skyLaser(yh, heroAtk('yangjian') * NA * 3);
      });
  }
  if (id === 'general' && cbOn('yangjian'))
    Q(0.4, () => {
      cbShout('天兵天將', 'yangjian');
      DSRC = 'u:yangjian';
      const d2 = heroAtk('yangjian') * 7 * 1.5;
      al().forEach(e => {
        hit(e, d2, {c: '#c8d8ff', big: 1});
        e.crk = 4;
      });
      addFx({k: 'crack', x0: L.front, x1: lim, life: 4});
      B.txt.push({x: L.front + 300, y: G - 260, v: '天兵天將！', t: 0, big: 1});
    });
  if (h.ifc) {
    DSRC = 'u:nezha';
    const icx = (L.front + lim) / 2,
      big = (heroAtk('nezha') + heroAtk('aobing')) * 40 * TR('ult');
    inV().forEach(e => {
      hit(e, big / 2, {c: '#ff6a3a', big: 1, src: 'u:nezha'});
      hit(e, big / 2, {c: '#7ae0ff', big: 1, src: 'u:aobing'});
      e.burnS = 'u:nezha';
      e.burn = Math.max(e.burn || 0, 2);
      e.burnD = Math.max(e.burnD || 0, big * 0.01);
      e.stun = Math.max(e.stun, 2);
    });
    ultFx('ult_icefire', icx, G - 170, 1.4);
    cbShout('冰火合璧', 'nezha');
    cbShout('冰火合璧', 'aobing');
    B.txt.push({x: icx, y: G - 330, v: '冰火合璧！', t: 0, big: 1, crit: 1});
    shake(18);
    return;
  }
  if (id === 'nezha') {
    nzRide(dmg, lim, src);
    Q(1.3, () => {
      const V = al();
      const fx = V.length ? V.reduce((m, e) => (e.x > m.x ? e : m)).x : lim;
      B.enemies.forEach(e => {
        if (!e.dead && Math.abs(e.x - fx) < 220) hit(e, dmg * 1.5, {c: '#ff6a3a', big: 1});
      });
      addFx({k: 'boom', x: fx, y: G - 60, life: 0.5, c: '#ff6a3a', r: 220});
      sprFx('fx_fire', fx, G - 80, 2.4);
      shake(10);
    });
    if (icefire())
      Q(0.6, () => {
        cbShout('冰火兩重天', 'aobing');
        DSRC = 'u:aobing';
        const d2 = heroAtk('aobing') * 7 * 1.5 * 0.6;
        inV().forEach(e => {
          hit(e, d2, {c: '#bfefff', big: 1});
          e.stun = Math.max(e.stun, 1);
        });
        addFx({k: 'fly', key: 'ice_dragon', x0: L.front, x1: VW, y: G - 220, life: 1});
      });
  }
  if (id === 'aobing') {
    A.forEach(e => {
      if (e.boss) e.stun = Math.min(e.stun, 1);
    });
    addFx({k: 'fly', key: 'ice_dragon', x0: L.front - 100, x1: VW + 100, y: G - 230, life: 1.1});
    Q(3, () => {
      al().forEach(e => {
        hit(e, dmg * 0.6, {c: '#bfefff', big: 1});
        sprFx('fx_ice', e.x, e.y - e.ay * 0.5, 0.9);
      });
    });
    if (icefire())
      Q(0.6, () => {
        cbShout('冰火兩重天', 'nezha');
        nzRide(heroAtk('nezha') * 7 * 1.5, lim, 'u:nezha');
      });
  }
}
function ultTick(dt) {
  if (B.zones && B.zones.length) {
    for (const z of B.zones) {
      z.t -= dt;
      z.tk = (z.tk || 0) - dt;
      if (z.tk <= 0) {
        z.tk = 0.5;
        DSRC = z.src;
        const on = B.enemies.filter(e => !e.dead && e.x < VW - 50 && Math.abs(e.x - z.x) < z.r);
        on.forEach(e => {
          if (z.k === 'fire') {
            e.burnS = z.src;
            e.burn = Math.max(e.burn || 0, 2);
            e.burnD = Math.max(e.burnD || 0, z.dmg);
          } else {
            hit(e, z.dmg, {c: z.c, small: 1, nosw: 1});
            e.slow = Math.max(e.slow, z.slow);
            e.slowT = 0.8;
            if (z.k === 'sand') e.sand = 1;
          }
        });
      }
    }
    B.zones = B.zones.filter(z => z.t > 0);
  }
  if (B.sched && B.sched.length) {
    for (const q of B.sched) {
      q.t -= dt;
      if (q.t <= 0 && !q.done) {
        q.done = 1;
        DSRC = q.src;
        q.fn();
      }
    }
    B.sched = B.sched.filter(q => !q.done);
  }
  DSRC = 'etc';
}
function ultExtra(h, dmg, al, lim) {
  const id = h.id,
    src = 'u:' + id,
    A = al(),
    inV = () => B.enemies.filter(e => !e.dead && e.x < VW - 50),
    Z = z => {
      (B.zones = B.zones || []).push({src, ...z});
    },
    Q = (t, fn) => {
      (B.sched = B.sched || []).push({t, fn, src});
    },
    rnd = a => a[Math.floor(Math.random() * a.length)];
  const sm = e => !e.boss;
  fsUlt(h, dmg, al, lim, A, Z, Q, inV, sm);
  if (id === 'disciple')
    A.forEach(e => {
      if (sm(e)) e.kb = Math.max(e.kb, 240);
      e.slow = Math.max(e.slow, 0.5);
      e.slowT = 3;
    });
  else if (id === 'fox') {
    A.forEach(e => {
      e.burnS = src;
      e.burn = Math.max(e.burn || 0, 3);
      e.burnD = Math.max(e.burnD || 0, dmg * 0.05);
    });
    const xs = A.length
      ? [...new Set([A[0], A[Math.floor(A.length / 2)], A[A.length - 1]].map(e => Math.round(e.x / 200) * 200))]
      : [L.front + 300];
    if (cbOn('fox')) cbShout('九尾狐火陣', 'fox');
    xs.forEach(x =>
      Z({k: 'fire', x, r: cbOn('fox') ? 280 : 140, t: cbOn('fox') ? 8 : 4, dmg: dmg * 0.05, c: '#ff8a3d'})
    );
  } else if (id === 'dragon')
    A.forEach(e => {
      if (sm(e) && !e.fly) {
        e.lift = 1.5;
        e.liftD = dmg * 0.5;
      }
    });
  else if (id === 'archer') {
    const V = inV();
    if (V.length) {
      const Ts = V.slice()
        .sort((a, b) => b.hp - a.hp)
        .slice(0, cbOn('archer') ? 3 : 1);
      if (cbOn('archer')) cbShout('星蛙標記', 'archer');
      Ts.forEach(t => {
        t.mark = 8;
        sprFx('fx_thunder', t.x, t.y - t.ay * 0.5, 1.2);
      });
      const T = Ts[0];
      addFx({k: 'laser', x: h.x + 20, y: h.y - 60, life: 0.3, c: '#bfe6ff', w: Math.max(200, T.x - h.x)});
      sprFx('fx_thunder', T.x, T.y - T.ay * 0.5, 1.6);
      B.txt.push({x: T.x, y: T.y - T.ay - 60, v: '星光標記！', t: 0, big: 1, crit: 1});
    }
  } else if (id === 'mecha')
    A.forEach(e => {
      e.melt = 6;
      if (e.boss) e.x = Math.min(VW - 90, e.x + 80);
    });
  else if (id === 'alchemist') {
    if (cbOn('alchemist')) cbShout('丹鼓齊鳴', 'alchemist');
    B.heroes.forEach(o => {
      if (o !== h) o.charge = Math.min(100, o.charge + (cbOn('alchemist') ? 40 : 20));
    });
  } else if (id === 'monkey') {
    if (cbOn('monkey')) cbShout('花果山迷陣', 'monkey');
    A.filter(e => e.fly).forEach(e => hit(e, dmg * 0.4, {c: '#ffc23a', big: 1}));
    for (let i = 0, n = cbOn('monkey') ? 20 : 10; i < n; i++)
      Q(0.3 + i * (cbOn('monkey') ? 0.2 : 0.4), () => {
        const V = inV();
        if (!V.length) return;
        const o = rnd(V),
          cx = Math.max(L.front + 40, o.x - 70);
        addFx({
          k: 'clone',
          x: cx,
          y: G,
          life: 0.5,
          key: myKey('monkey'),
          fl: 1,
          top: Math.random() < 0.4 ? 1 : 0,
          rt: (Math.random() - 0.5) * 0.5
        });
        hit(o, heroAtk('monkey') * NA * 2, {c: '#ffc23a', big: 1});
      });
  } else if (id === 'vampire') {
    A.forEach(e => {
      e.vuln = 5;
      e.vulnS = 'vampire';
    });
    B.vamT = 6;
  } else if (id === 'yukionna') {
    const cx = (L.front + lim) / 2;
    Z({k: 'bliz', x: cx, r: (lim - L.front) / 2, t: 4, dmg: dmg * 0.06, slow: 0.6, c: '#bfefff'});
    B.shatT = 4;
    B.shatD = dmg * 0.5;
  } else if (id === 'catsamurai')
    Q(0.55, () => {
      al().forEach(e => {
        if (e.boss) hit(e, dmg * 2, {c: '#fff', big: 1});
        else if (e.hp < e.max * 0.3) {
          hit(e, e.hp * 1.01, {c: '#ffffff', big: 1});
          sprFx('fx_slash', e.x, e.y - e.ay * 0.5, 1.2);
        }
      });
    });
  else if (id === 'moonrabbit') B.mbT = 6;
  else if (id === 'pharaoh') {
    const c = A.length ? A[Math.floor(A.length / 2)].x : L.front + 400;
    Z({k: 'sand', x: c, r: 240, t: 5, dmg: dmg * 0.08, slow: 0.4, c: '#ffd98a'});
  } else if (id === 'elf')
    A.forEach(e => {
      e.stun = Math.max(e.stun, 3);
      e.bleed = 3;
      e.bleedD = dmg * 0.1;
      e.bleedS = src;
      if (e.fly && !(e.pullT > 0)) {
        e.fly0 = e.fly;
        e.y0 = e.y;
        e.fly = 0;
        e.y = G;
        e.pullT = 3;
      }
    });
  else if (id === 'kitsune') {
    let burnt = A.slice();
    burnt.forEach(e => {
      e.burnS = src;
      e.burn = Math.max(e.burn || 0, 3);
      e.burnD = Math.max(e.burnD || 0, dmg * 0.05);
    });
    for (let k = 0; k < 3; k++) {
      const nx = inV().filter(o => !burnt.includes(o) && burnt.some(b => Math.abs(b.x - o.x) < 250));
      nx.forEach(o => {
        o.burnS = src;
        o.burn = Math.max(o.burn || 0, 3);
        o.burnD = Math.max(o.burnD || 0, dmg * 0.05);
        sprFx('fx_fire', o.x, o.y - o.ay * 0.5, 0.9);
      });
      if (cbOn('fox')) nx.slice(0, 3).forEach(o => Z({k: 'fire', x: o.x, r: 90, t: 4, dmg: dmg * 0.05, c: '#5ab8ff'}));
      burnt = burnt.concat(nx);
    }
  } else if (id === 'shark')
    A.forEach(e => {
      e.bleed = 6;
      e.bleedD = dmg * 0.1;
      e.bleedS = src;
      if (e.boss) {
        e.vuln = 6;
        e.vulnS = 'shark';
      }
    });
  else if (id === 'tanuki') {
    A.forEach(e => {
      if (sm(e)) e.conf = 3;
    });
    if (cbOn('monkey')) cbShout('花果山迷陣', 'tanuki');
    if (cbOn('monkey'))
      for (let i = 0; i < 6; i++)
        Q(0.3 + i * 0.5, () => {
          DSRC = 'h:monkey';
          B.enemies
            .filter(e => !e.dead && e.conf > 0)
            .slice(0, 6)
            .forEach(o => {
              addFx({
                k: 'clone',
                x: Math.max(L.front + 40, o.x + (Math.random() < 0.5 ? -70 : 70)),
                y: G,
                life: 0.5,
                key: myKey('monkey'),
                fl: Math.random() < 0.5 ? 1 : -1,
                top: 0,
                rt: 0
              });
              hit(o, heroAtk('monkey') * NA * 2, {c: '#ffc23a', big: 1});
            });
        });
    for (let i = 1; i <= 2; i++)
      Q(i * 0.8, () => {
        al().forEach(e => hit(e, dmg * 0.3, {c: '#d0a878', big: 1}));
        addFx({k: 'sweep', x: h.x + 40, y: G - 110, life: 0.5, c: '#d0a878'});
      });
  } else if (id === 'general') B.genT = 6;
  else if (id === 'swordsman')
    for (let i = 0; i < 8; i++)
      Q(0.5 + i * 0.09, () => {
        const V = al();
        if (!V.length) return;
        const o = rnd(V);
        SWC = 1;
        hit(o, dmg * 0.5 * 2, {c: '#c8e8ff', big: 1, crit: 1});
        sprFx('fx_slash', o.x, o.y - o.ay * 0.5, 1.3);
      });
  else if (id === 'panda')
    A.forEach(e => {
      if (sm(e) && !e.fly) e.kb = Math.max(e.kb, 320);
      e.stun = Math.max(e.stun, 1.5);
    });
  else if (id === 'jiangshi')
    A.forEach(e => {
      if (sm(e)) e.stun = Math.max(e.stun, 4);
    });
  else if (id === 'witch')
    A.forEach(e => {
      if (sm(e)) {
        e.frog = 3;
        sprFx('fx_stun', e.x, e.y - e.ay * 0.5, 0.9);
      }
    });
  else if (id === 'mummy') {
    const g = A.filter(e => sm(e) && !e.fly);
    if (g.length) {
      const cx = g.map(e => e.x).sort((a, b) => a - b)[Math.floor(g.length / 2)];
      g.forEach(e => {
        e.grpX = cx + (Math.random() - 0.5) * 70;
        e.grpT = 0.5;
        e.stun = Math.max(e.stun, 1.5);
      });
      if (cbOn('dragon'))
        Q(0.55, () => {
          cbShout('龍捲縛天', 'dragon');
          DSRC = 'u:dragon';
          const ld = heroAtk('dragon') * 7 * TR('ult') * 2.25 * 0.5;
          addFx({k: 'ring', x: cx, y: G - 30, life: 0.4, c: '#ff5a40', r: 160});
          g.forEach(e => {
            if (!e.dead) {
              e.lift = 1.5;
              e.liftD = ld;
            }
          });
          shake(6);
        });
    }
  } else if (id === 'grandma') B.gmaT = 8;
  else if (id === 'drummer') {
    if (cbOn('alchemist')) cbShout('丹鼓齊鳴', 'drummer');
    B.heroes.forEach(o => {
      if (o !== h) o.charge = Math.min(100, o.charge + (cbOn('alchemist') ? 60 : 30));
    });
    B.drmT = 6;
  }
  DSRC = src;
}
