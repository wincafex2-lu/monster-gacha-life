/* ---------- 主迴圈 ---------- */
let last = performance.now();
function frame(now) {
  const real = Math.min(0.05, (now - last) / 1000);
  last = now;
  let dt = real * B.speed;
  if (B.hitstop > 0) {
    B.hitstop = 0;
  } // 打擊停頓也一起關掉，避免像卡頓
  const n = B.speed;
  for (let i = 0; i < n; i++) step(dt / n);
  draw(real);
  renderDps();
  requestAnimationFrame(frame);
}
function step(dt) {
  stepTimers(dt);
  stepStage(dt);
  // 山門回血（輔助）
  let regen = (PS.regen + (B.arrD === 'd_lotus' ? dv('d_lotus', S.arr.d_lotus.lv) : 0)) * B.gateMax;
  if (B.state === 'run' && B.gateHp > 0) B.gateHp = Math.min(B.gateMax, B.gateHp + regen * dt);
  // 英雄
  const alive = B.enemies.filter(e => !e.dead && e.x < VW - 60);
  alive.sort((a, b) => a.x - b.x);
  stepHeroes(dt, alive);
  stepTurrets(dt, alive);
  stepBeasts(dt, alive);
  stepArrays(dt);
  stepBurn(dt);
  stepEnemies(dt);
  stepProj(dt);
  stepFx(dt);
}
// 計時器倒數、定時觸發的被動和合擊
function stepTimers(dt) {
  B.time += dt;
  if (B.state === 'run') fsTick(dt);
  if (B.focusT > 0) B.focusT -= dt;
  if (B.drumT > 0) B.drumT -= dt;
  if (B.mechT > 0) B.mechT -= dt;
  if (B.ovT > 0) B.ovT -= dt;
  for (const k of UTK) if (B[k] > 0) B[k] -= dt;
  for (const h of B.heroes) if (h.ucd > 0) h.ucd -= dt;
  if (B.state === 'run') ultTick(dt);
  if (PS.my && B.state === 'run') {
    if (PS.my.dragon) {
      B.myDr = (B.myDr || 0) + dt;
      if (B.myDr >= 8) {
        B.myDr = 0;
        B.enemies.forEach(e => {
          if (!e.dead) e.stun = Math.max(e.stun, 1.5);
        });
        addFx({k: 'ring', x: VW * 0.55, y: G - 20, life: 0.6, c: '#ff5a40', r: 700 * ZM});
        shake(5);
      }
    }
  }
  if (cbOn('mecha') && B.state === 'run') {
    B.cbM = (B.cbM || 0) + dt;
    if (B.cbM >= 8) {
      B.cbM = 0;
      cbShout('天機艦砲', 'mecha');
      const ds = DSRC;
      DSRC = 'cb:mecha';
      const a = teamAvgAtk() * NA * 30,
        es = B.enemies.filter(e => !e.dead && e.x < VW - 60);
      es.forEach(e => {
        hit(e, a, {c: '#ffcf6a', big: 1});
        e.melt = 6;
        sprFx('fx_blunt', e.x, e.y - e.ay * 0.5, 1.2);
      });
      DSRC = ds;
      if (es.length) {
        addFx({k: 'ring', x: VW * 0.6, y: G - 40, life: 0.5, c: '#ffcf6a', r: 600 * ZM});
        B.txt.push({x: VW * 0.6, y: G - 300, v: '天機艦砲！', t: 0, big: 1, crit: 1});
        shake(8);
      }
    }
  }
  if (PS.mx && PS.mx.moonrabbit && B.state === 'run') {
    B.moonT = (B.moonT || 0) + dt;
    if (B.moonT >= 25) {
      B.moonT = 0;
      B.shield = Math.max(B.shield, 3);
    }
  }
  DSRC = 'etc';
  SWC = 0;
  if (B.state === 'run' && B.dmg) B.dmgT += dt;
  if (B.buff > 0) B.buff -= dt;
}
// 關卡狀態
function stepStage(dt) {
  if (B.state === 'run') {
    // 場上的怪都打光了，下一隻（群）不用等，0.25 秒後就出來（秒殺時推關比較快）
    if (B.spawnQ.length) {
      B.spawnT += dt;
      const empty = !B.enemies.some(e => !e.dead);
      if (B.spawnT >= (empty ? Math.min(0.25, B.spawnQ[0].delay) : B.spawnQ[0].delay)) {
        B.spawnT = 0;
        spawn(B.spawnQ.shift());
      }
    } else if (!B.enemies.some(e => !e.dead)) {
      B.state = 'win';
      B.stateT = 0;
      stageWin();
    }
  } else {
    B.stateT += dt;
    if (B.stateT > (B.state === 'win' ? 1 : 2.6) && !giftOpen) {
      if (B.state === 'lose') {
      }
      startStage();
    }
  }
}
// 英雄
function stepHeroes(dt, alive) {
  for (const h of B.heroes) {
    if (h.anim) {
      h.anim.t += dt;
      const A = h.anim;
      if (A.type === 'atk') {
        if (!A.fired && A.t >= 0.2) {
          A.fired = 1;
          heroFire(h);
        }
        if (A.t > 0.5) h.anim = null;
      } else if (A.type === 'ult') {
        if (!A.fired && A.t >= 0.78) {
          A.fired = 1;
          doUlt(h);
        }
        if (A.t > 1.2) h.anim = null;
      }
    }
    h.cd -= dt;
    let wIF = 0;
    if (h.charge >= 100 && icefire() && (h.id === 'nezha' || h.id === 'aobing')) {
      const o = B.heroes.find(x => x.id === (h.id === 'nezha' ? 'aobing' : 'nezha'));
      if (o && o.charge < 100 && (h.ifw = (h.ifw || 0) + dt) < 8) wIF = 1;
    } // 冰火合璧：自動放時等搭檔充滿（最多等 8 秒）
    if (
      !wIF &&
      h.charge >= 100 &&
      S.auto &&
      S.auto[h.id] &&
      (!h.anim || h.anim.type !== 'ult') &&
      B.state === 'run' &&
      alive.length
    ) {
      h.ifw = 0;
      castUlt(B.heroes.indexOf(h));
    } // 先檢查自動大招（攻速快的弟子一直在普攻，不然永遠找不到空檔）
    if (h.cd <= 0 && !h.anim && B.state === 'run') {
      const R = ROLE[CH[h.id].role];
      const tg = alive.find(
        e =>
          e.x <=
          L.front +
            (h.id === 'monkey' ? 99999 : h.id === 'dragon' || h.id === 'mecha' || h.id === 'yangjian' ? 950 : R.reach)
      );
      if (tg) {
        h.cd = 1 / heroRate(h.id);
        h.anim = {type: 'atk', t: 0, target: tg};
      }
    }
    if (B.state === 'run')
      h.charge = Math.min(
        100,
        h.charge +
          ((dt * 100) / ucdOf(h.id)) *
            Math.min(
              fb10('liuli') ? 3 : 2,
              (1 + PS.charge + (B.arrD === 'd_star' ? dv('d_star', S.arr.d_star.lv) : 0)) * chgMul(h.id)
            )
      );
  }
}
// 塔（已移除，舊存檔沒有塔時這段不做事）
function stepTurrets(dt, alive) {
  for (const t of B.turrets) {
    t.anim = Math.max(0, t.anim - dt);
    t.cd -= dt;
    if (t.cd <= 0 && alive.length && B.state === 'run') {
      const d = TUR[t.k];
      t.cd = 1 / d.rate;
      t.anim = 0.25;
      turFire(t, alive);
    }
  }
}
// 神獸
function stepBeasts(dt, alive) {
  if (B.shield > 0) B.shield -= dt;
  if (B.state === 'run' && PS.mx) {
    const M = PS.mx;
    // 星弓滿階極意改在 projHit：普攻 20% 觸發星隕一擊
    if (M.alchemist) {
      B.buff = Math.max(B.buff || 0, 0.5);
      B.alT = (B.alT || 0) + dt;
      if (B.alT >= 20) {
        B.alT = 0;
        B.gateHp = Math.min(B.gateMax, B.gateHp + B.gateMax * 0.1);
        sprFx('fx_heal', L.gx, G - 110, 1.6);
      }
    }
  }
  if (B.state === 'run') {
    if (PS.wind) {
      B.windT = (B.windT || 0) + dt;
      if (B.windT >= Math.max(3, 9 / PS.wind)) {
        B.windT = 0;
        {
          const av = B.heroes.reduce((a, h) => a + heroAtk(h.id), 0) / Math.max(1, B.heroes.length),
            f10 = fb10('bajiao');
          DSRC = 'fb:bajiao';
          B.enemies.forEach(e => {
            if (e.dead) return;
            if (f10 && e.x < VW - 60) hit(e, av * 20, {c: '#6ad86a'});
            if (!e.fly && (!e.boss || f10)) e.kb += e.boss ? 30 : 70;
          });
        }
        sprFx('fx_wind', L.front + 260, G - 80, 2.2);
      }
    }
    if (PS.seal) {
      B.sealT = (B.sealT || 0) + dt;
      if (B.sealT >= (fb10('fantian') ? 6 : 12)) {
        B.sealT = 0;
        DSRC = 'seal';
        const avg = B.heroes.reduce((a, h) => a + heroAtk(h.id), 0) / Math.max(1, B.heroes.length);
        const T = alive;
        if (T.length) {
          T.forEach(e => hit(e, avg * 3 * PS.seal * (e.boss && fb10('fantian') ? 3 : 1), {c: '#ffb060', big: 1}));
          sprFx('fx_blunt', T[0].x, G - 90, 2.4);
          shake(8);
        }
      }
    }
  }
  if (fb10('huntian')) {
    B.htT = (B.htT || 0) + dt;
    if (B.htT >= 10) {
      B.htT = 0;
      B.enemies.forEach(e => {
        if (!e.dead && !e.boss && e.x < VW - 60) e.stun = Math.max(e.stun, 2);
      });
      B.txt.push({x: VW * 0.5, y: G - 300, v: '混天縛海！', t: 0, big: 1});
    }
  }
  xUpd(dt);
  for (const b of B.beasts) {
    if (B.state === 'run') {
      b.charge = Math.min(100, b.charge + ((dt * 100) / 24) * (1 + PS.charge));
      if (b.charge >= 100 && S.auto && S.auto['b_' + b.k] && alive.length) castBeast(B.beasts.indexOf(b));
    }
  }
  for (const b of B.beasts) {
    const d = BEAST[b.k];
    b.anim = Math.max(0, b.anim - dt);
    if (b.pounce > 0) b.pounce = Math.max(0, b.pounce - dt);
    b.cd -= dt;
    const reach =
      b.k === 'qinglong' || b.k === 'zhuque' || b.k === 'baize' || b.k === 'tengshe' || b.k === 'bifang'
        ? VW
        : b.k === 'baihu' || b.k === 'qilin'
          ? VW * 0.5
          : 200; // 青龍朱雀全畫面、白虎撲半個畫面、玄武近身擋
    const near = alive.filter(e => (d.fly || !e.fly) && e.x > L.front - 40 && e.x < b.x + reach); // 走到神獸身後、在打山門的怪也打
    if (b.cd <= 0 && near.length && B.state === 'run') {
      b.cd = 1 / (d.rate * (1 + spdBonus()));
      b.anim = 0.45;
      b.hitAt = 0.18;
      b.targets = near;
      if (b.k === 'baihu') {
        const t0 = near.filter(e => !e.fly).sort((p, q) => p.x - q.x)[0] || near[0];
        b.targets = near.filter(e => Math.abs(e.x - t0.x) < 130).slice(0, 3);
        b.pounce = 0.55;
        b.pdx = Math.max(0, t0.x - b.x - 70);
        b.ptx = t0.x;
        b.hitAt = 0.27;
      }
    }
    if (b.hitAt != null) {
      b.hitAt -= dt;
      if (b.hitAt <= 0) {
        b.hitAt = null;
        DSRC = 'b:' + b.k;
        const a = beastAtk(b.k);
        const T = b.targets.filter(e => !e.dead);
        if (b.k === 'baihu') {
          T.forEach(e => hit(e, a, {c: '#ffffff', kb: 14}));
          addFx({k: 'claw', x: b.ptx || b.x + 90, y: G - 60, life: 0.25});
          shake(2);
        } else if (b.k === 'qinglong') {
          T.slice(0, 6).forEach(e => {
            hit(e, a, {c: '#bfa0ff'});
            sprFx('fx_thunder', e.x, e.y - e.ay * 0.5, 1);
          });
        } else if (b.k === 'zhuque') {
          const c = T[0];
          if (c) {
            B.enemies.forEach(e => {
              if (!e.dead && Math.abs(e.x - c.x) < 110) {
                hit(e, a, {c: '#ff8a3d'});
                e.burnS = DSRC;
                e.burn = Math.max(e.burn || 0, 3);
                e.burnD = a * 0.3;
              }
            });
            sprFx('fx_fire', c.x, c.y - c.ay * 0.4, 1.4);
          }
        } else if (b.k === 'xuanwu') {
          T.filter(e => !e.fly).forEach(e => {
            hit(e, a, {c: '#ffe08a'});
            e.stun = Math.max(e.stun, 1.2);
          });
          addFx({k: 'ring', x: b.x + 80, y: G - 40, life: 0.5, c: '#ffe08a', r: 200});
          shake(4);
        } else if (b.k === 'qilin') {
          const c = T.filter(e => !e.fly).sort((p, q) => p.x - q.x)[0] || T[0];
          if (c) {
            B.enemies
              .filter(e => !e.dead && Math.abs(e.x - c.x) < 160)
              .slice(0, 5)
              .forEach(e => {
                hit(e, a, {c: '#ffd84a', kb: 30});
              });
            addFx({k: 'dust', x: c.x, y: G, life: 0.4});
            addFx({k: 'ring', x: c.x, y: G - 30, life: 0.4, c: '#ffd84a', r: 160});
          }
        } else if (b.k === 'baize') {
          const c = T.slice().sort((p, q) => q.hp - p.hp)[0];
          if (c) {
            hit(c, a * 1.5, {c: '#e8f0ff'});
            c.bzm = 4;
            addFx({k: 'ring', x: c.x, y: c.y - c.ay * 0.5, life: 0.5, c: '#e8f0ff', r: 90});
          }
        } else if (b.k === 'tengshe') {
          const c = T[Math.floor(Math.random() * T.length)];
          if (c) {
            B.enemies.forEach(e => {
              if (!e.dead && Math.abs(e.x - c.x) < 110) {
                hit(e, a, {c: '#c8d8e8'});
                if (!e.boss) e.conf = Math.max(e.conf || 0, 1);
              }
            });
            addFx({k: 'boom', x: c.x, y: c.y - c.ay * 0.4, life: 0.45, c: '#dde8f0', r: 110});
          }
        } else if (b.k === 'bifang') {
          const c = T[0];
          if (c) {
            B.enemies.forEach(e => {
              if (!e.dead && Math.abs(e.x - c.x) < 120) {
                hit(e, a, {c: '#3ad0ff'});
                e.burnS = DSRC;
                e.burn = Math.max(e.burn || 0, 3);
                e.burnD = Math.max(e.burnD || 0, a * 0.3);
              }
            });
            sprFx('fx_fire', c.x, c.y - c.ay * 0.4, 1.2);
          }
        }
      }
    }
  }
}
// 陣法
function stepArrays(dt) {
  if (B.arr && B.state === 'run') {
    const a = B.arr,
      d = ARR[a.k];
    a.t += dt;
    a.tick += dt;
    a.big += dt;
    const ae = AE(a.k, S.arr[a.k].lv);
    const on = B.enemies.filter(e => !e.dead && !e.fly && Math.abs(e.x - a.x) < L.arrR * ae.r);
    if (a.k === 'a_frost')
      on.forEach(e => {
        e.slow = Math.max(e.slow, ae.slow);
        e.slowT = 0.6;
      });
    if (a.k === 'a_poison') on.forEach(e => (e.poison = (e.poison || 0) + dt));
    if (a.tick >= 0.5) {
      a.tick = 0;
      const dps = arrDps(a.k);
      DSRC = 'a:' + a.k;
      on.forEach(e => {
        let m = a.k === 'a_sword' ? ae.sword : d.m;
        if (a.k === 'a_poison') m *= 1 + e.poison * ae.pois;
        hit(e, dps * 0.5 * m, {c: `rgb(${d.c})`, small: 1, kb: a.k === 'a_wind' ? ae.kb : 0});
        if (a.k === 'a_fire') {
          e.burnS = DSRC;
          e.burn = Math.max(e.burn || 0, ae.burn);
          e.burnD = Math.max(e.burnD || 0, dps * 0.3);
        }
        if (Math.random() < 0.25) sprFx(d.fx, e.x, e.y - e.ay * 0.4, 0.8);
      });
    }
    if (a.k === 'a_thunder' && a.big >= ae.thun) {
      a.big = 0;
      DSRC = 'a:' + a.k;
      const dps = arrDps(a.k);
      on.forEach(e => {
        hit(e, dps * 2.6, {c: '#d0b0ff'});
        sprFx('fx_thunder', e.x, e.y - e.ay * 0.5, 1.1);
      });
      if (on.length) shake(3);
    }
  }
}
// 燒傷（朱雀）
function stepBurn(dt) {
  if (B.crush)
    for (const e of B.enemies) {
      if (!e.dead && e.crushT !== undefined) {
        e.crushT -= dt;
        if (e.crushT <= 0) {
          const hs = B.heroes;
          const h = hs[Math.floor(Math.random() * hs.length)];
          DSRC = h ? 'h:' + h.id : 'etc';
          e.crushT = undefined;
          hit(e, e.hp * 1.01, {c: '#ffd86a'});
          sprFx('fx_slash', e.x, e.y - e.ay * 0.5, 0.8);
        }
      }
    }
  for (const e of B.enemies) {
    if (!e.dead && e.burn > 0) {
      e.burn -= dt;
      e.bt = (e.bt || 0) + dt;
      if (e.bt >= 0.5) {
        e.bt = 0;
        hit(e, (e.burnD || 1) * (PS.r10 && PS.r10.fox ? 3 : 1) * (1 + PS.burnm), {
          c: '#ff8a3d',
          small: 1,
          src: e.burnS || 'burn',
          nosw: 1
        });
      }
    }
  }
}
// 敵人
function stepEnemies(dt) {
  for (const e of B.enemies) {
    if (e.dead) {
      e.dead += dt;
      continue;
    }
    e.t += dt;
    e.flash = Math.max(0, e.flash - dt);
    if (e.slowT > 0) {
      e.slowT -= dt;
      if (e.slowT <= 0) e.slow = 0;
    }
    if (e.mark > 0) e.mark -= dt;
    if (e.bzm > 0) e.bzm -= dt;
    if (e.bzv > 0) e.bzv -= dt;
    if (e.fog > 0) e.fog -= dt;
    if (e.bit > 0) e.bit -= dt;
    if (e.crk > 0) e.crk -= dt;
    if (e.melt > 0) e.melt -= dt;
    if (e.vuln > 0) e.vuln -= dt;
    if (e.frog > 0) e.frog -= dt;
    if (e.sand > 0) e.sand -= dt;
    if (e.loot > 0) e.loot -= dt;
    if (e.bleed > 0) {
      e.bleed -= dt;
      e.blt = (e.blt || 0) + dt;
      if (e.blt >= 1) {
        e.blt = 0;
        hit(e, e.bleedD || 0, {c: '#e03050', small: 1, src: e.bleedS || 'etc', nosw: 1});
      }
      if (e.dead) continue;
    }
    if (e.pullT > 0) {
      e.pullT -= dt;
      if (e.pullT <= 0) {
        e.fly = e.fly0;
        e.y = e.y0;
      }
    }
    if (e.grpT > 0) {
      e.grpT -= dt;
      e.x += (e.grpX - e.x) * Math.min(1, dt * 10);
    }
    if (e.lift > 0) {
      e.lift -= dt;
      if (e.lift <= 0) {
        DSRC = 'u:dragon';
        hit(e, e.liftD || 0, {c: '#ffb04a', big: 1});
        addFx({k: 'dust', x: e.x, y: G, life: 0.4});
        shake(3);
      }
      continue;
    }
    if (e.conf > 0) {
      e.conf -= dt;
      if (!(e.stun > 0)) {
        e.x = Math.min(VW - 90, e.x + e.spd * dt * 0.9);
        e.state = 'walk';
        continue;
      }
    }
    if (e.kb > 0) {
      const lim = VW - 90 - e.w * 0.3;
      if (e.x >= lim) e.kb = 0;
      else {
        const k = Math.min(e.kb, dt * 260, lim - e.x);
        e.x += k;
        e.kb -= k;
      }
    }
    if (e.armor > 0) e.armor -= dt;
    if (e.stun > 0) {
      e.stun -= dt;
      continue;
    }
    if (e.state === 'walk') {
      const v = e.spd * (1 - e.slow) * (1 - PS.mslow) * (PS.slow && e.x < L.front + 450 ? 1 - PS.slow : 1);
      e.x -= v * dt;
      if (e.x - e.w * 0.3 <= e.stop) {
        e.state = 'atk';
        e.at = 0;
      }
    } else {
      e.at += dt * (1 - e.slow * 0.5);
      const cyc = e.boss ? 2.2 : 1.3;
      const hitT = e.boss ? 0.95 : e.frames.length ? 0.55 : 0.45;
      if (!e.didHit && e.at >= hitT) {
        e.didHit = 1;
        if (!(e.frog > 0)) gateDamage(e.dmg, e);
        if (e.boss) {
          shake(9);
          B.hitstop = 0.06;
          addFx({k: 'dust', x: e.x - e.w * 0.35, y: G, life: 0.5});
        }
      }
      if (e.at >= cyc) {
        e.at = 0;
        e.didHit = 0;
      }
      if (e.x - e.w * 0.3 > e.stop + 4) e.state = 'walk';
    }
  }
  B.enemies = B.enemies.filter(e => !(e.dead > 0.5));
}
// 投射物
function stepProj(dt) {
  for (const p of B.proj) {
    p.life -= dt;
    if (p.target && !p.target.dead) {
      p.tx = p.target.x - (p.target.fly ? 0 : 0);
      p.ty = p.target.y - p.target.ay * 0.45;
    }
    if (p.arc) {
      p.t += dt;
      const k = Math.min(1, p.t / p.dur),
        ox = p.x,
        oy = p.y;
      p.x = p.sx + (p.tx - p.sx) * k;
      p.y = p.sy + (p.ty - p.sy) * k - Math.sin(k * Math.PI) * p.arc;
      if (p.x !== ox || p.y !== oy) p.ang = Math.atan2(p.y - oy, p.x - ox);
      if (k >= 1) projHit(p);
    } else {
      const dx = p.tx - p.x,
        dy = p.ty - p.y,
        d = Math.hypot(dx, dy),
        sp = p.spd * dt;
      p.ang = Math.atan2(dy, dx);
      if (d <= sp + 6) projHit(p);
      else {
        p.x += (dx / d) * sp;
        p.y += (dy / d) * sp;
      }
    }
  }
  B.proj = B.proj.filter(p => !p.done && p.life > 0);
}
// 特效、飄字
function stepFx(dt) {
  for (const f of B.fx) {
    f.t = (f.t || 0) + dt;
    if (f.upd) {
      DSRC = f.src || 'etc';
      SWC = 0;
      f.upd(f, dt);
    }
  }
  DSRC = 'etc';
  SWC = 0;
  B.fx = B.fx.filter(f => f.t < f.life);
  for (const t of B.txt) {
    t.t += dt;
    t.y -= dt * (t.shout ? 14 : 40);
  }
  B.txt = B.txt.filter(t => t.t < (t.life || 0.8));
  B.shake = Math.max(0, B.shake - dt * 30);
}
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
function stageWin() {
  if (B.trial) {
    trialEnd(true);
    return;
  }
  if (B.xf) {
    xEnd(true);
    return;
  }
  const s = S.stage,
    first = s > S.best,
    boss = s % 10 === 0;
  const coin = Math.round(5 * Math.pow(1.088, s - 1) * (boss ? 4 : 1) * TR('coin') * XYR() * (fb10('jubao') ? 3 : 1));
  const tens = Math.floor(s / 10);
  const gem = first ? (boss ? 60 + tens * 2 : 10 + Math.floor(tens / 2)) : boss ? 20 + tens : 5 + Math.floor(tens / 2);
  const stone = Math.round((first ? (boss ? 20 + 5 * tens : 4 + 2 * tens) : boss ? 8 + 2 * tens : 2 + tens) * XYR());
  const pill = boss ? (first ? 3 : 1) : 0;
  const demon = s % 100 === 0;
  let fbMsg = '';
  if (demon) {
    const gm2 = first ? 300 : 60,
      st2 = stone * 2,
      pl2 = first ? 10 : 3;
    S.gem += gm2;
    S.stone += st2;
    S.pill += pl2;
  }
  S.coin += coin;
  S.gem += gem;
  S.stone += stone;
  S.pill += pill;
  // 離線收益用：記下這關「刷關」能拿多少（首通加成不算），和過關時間
  {
    const rg = boss ? 20 + tens : 5 + Math.floor(tens / 2),
      rst = Math.round((boss ? 8 + 2 * tens : 2 + tens) * XYR());
    const now = Date.now();
    S.wlog = (S.wlog || []).filter(w => now - w[0] < 3600e3).slice(-59);
    S.wlog.push([now, coin, rg, rst]);
  }
  if (boss && PS.mx && PS.mx.pirate) S.gem += Math.round(gem * 0.5);
  if (boss) {
    const n = demon ? (first ? 2 : 1) : (first && Math.random() < 0.35) || (!first && Math.random() < 0.08) ? 1 : 0;
    for (let i = 0; i < n; i++) {
      const r = giveFb();
      fbMsg += `${FB[r.k].n} ${r.txt}　`;
    }
  }
  if (fbMsg) setTimeout(() => toast('法寶：' + fbMsg), 1600);
  if (first) S.best = s;
  if (S.farm) {
    S.farmN = (S.farmN || 0) + 1;
  } else S.stage = s + 1;
  toast(
    `${S.farm ? `刷關 ${S.farmN} 次｜` : ''}過關！ +${fmt(coin)} 銅錢　+${gem} 靈石　+${stone} 山門石${pill ? `　+${pill} 進階丹` : ''}`
  );
  banner('過關！');
  SND.play('win');
  SND.setBoss(false);
  if (first && GIFTS[s]) giveGift(GIFTS[s]);
  if (unl('xiong') && s >= 300 && !B.xenc && Math.random() < 0.02) xOffer();
  persist();
  updHud();
}
function stageLose() {
  if (B.trial) {
    trialEnd(false);
    return;
  }
  if (B.xf) {
    xEnd(false);
    return;
  }
  B.state = 'lose';
  B.stateT = 0;
  const s = S.stage;
  const back = Math.max(1, s - 1);
  S.stage = back;
  S.farm = 1;
  S.farmN = 0;
  banner('山門被打破了…', true);
  SND.play('lose');
  SND.setBoss(false);
  toast(`退回第 ${back} 關原地刷資源。變強後按左上「挑戰」再往前！`);
  B.enemies.forEach(e => {
    if (!e.dead) {
      e.dead = 0.001;
    }
  });
  document.getElementById('bossBar').style.display = 'none';
  persist();
  updHud();
}

function trialStart(f) {
  if (!trCan(f) || B.trial || B.xf) return;
  B.trial = {f};
  closePanel();
  startStage();
}
function trialEnd(win) {
  const f = B.trial.f;
  B.state = win ? 'win' : 'lose';
  B.stateT = 0;
  B.enemies.forEach(e => {
    if (!e.dead) e.dead = 0.001;
  });
  document.getElementById('bossBar').style.display = 'none';
  SND.setBoss(false);
  if (win) {
    let msg = `試煉塔第 ${f} 層通過！`;
    const first = !trDone(f);
    if (first) {
      S.trDone = S.trDone || {};
      S.trDone[f] = 1;
      const gm = f === 9 ? 3000 : f === 10 ? 0 : 200 * f;
      S.gem += gm;
      const fr = f <= 8 ? 50 : 100;
      TRIAL[f - 1].forEach(k => (S.bfr[k] = (S.bfr[k] || 0) + fr));
      msg += `${gm ? `　+${gm} 靈石` : ''}　${TRIAL[f - 1].map(k => BEAST[k].n).join('、')}碎片各 +${fr}`;
      if (f === 10) {
        S.slot5 = 1;
        msg += '　🎉 第 5 格神獸欄開放！';
      }
    } else msg += '（獎勵只有第一次）';
    banner('試煉通過！');
    SND.play('win');
    toast(msg);
  } else {
    banner('試煉失敗…', true);
    SND.play('lose');
    toast('試煉失敗，弟子和神獸變強後再來！打輸不會掉關');
  }
  B.trial = null;
  persist();
  updHud();
}
