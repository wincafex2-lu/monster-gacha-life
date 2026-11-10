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
  if (B.cut && (B.cut.t += dt) > CUT_T) B.cut = null;
  B.shake = Math.max(0, B.shake - dt * 30);
}
