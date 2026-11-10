/* ---------- 特效 ---------- */
function addFx(f) {
  if (B.fx.length > 140) return;
  if (f.upd) f.src = DSRC;
  B.fx.push(f);
}
function sprFx(pre, x, y, sc) {
  if (!pre || !MAN[pre + '_0']) return;
  let n = 0;
  for (const f of B.fx) if (f.k === 'spr') n++;
  if (n > 26) return;
  addFx({k: 'spr', pre, n: 4, x, y, sc: sc || 1, life: 0.34});
}
function ultFx(pre, x, y, sc, delay) {
  addFx({k: 'ult', pre, x, y, sc: sc || 1, delay: delay || 0, life: 1 + (delay || 0)});
}
const SHAKE_ON = false; // 泓：技能畫面震動先取消（會讓人以為卡畫面）
function shake(a) {
  if (SHAKE_ON) B.shake = Math.max(B.shake, a);
}
// 傷害數字：同一隻怪短時間內被打到 → 合併成一個往上跳的總數（W037）；附近有字就往上錯開
function dmgText(x, y, v, big, crit, e) {
  v = Math.max(1, v);
  if (e) {
    // 同一隻怪，或擠在一起的怪（80px 內）→ 合併成一個數字
    const q = B.txt.find(
      t =>
        !t.shout &&
        !t.coin &&
        !t.crit === !crit &&
        t.t < 0.35 &&
        (t.e === e || (Math.abs(t.x - x) < 80 && Math.abs(t.y - y) < 110))
    );
    if (q) {
      q.n += v;
      q.v = (crit ? '爆擊 ' : '') + fmt(q.n);
      q.t = 0;
      if (q.e === e) q.x = e.x;
      q.y = Math.max(q.y, y - 18 - q.lane * 32);
      q.big = q.big || big;
      return;
    }
  }
  if (B.txt.length > 12) {
    const i = B.txt.findIndex(q => !q.shout);
    if (i >= 0) B.txt.splice(i, 1);
  }
  let lane = 0;
  while (lane < 3 && B.txt.some(q => !q.shout && Math.abs(q.x - x) < 70 && Math.abs(q.y - (y - lane * 32)) < 26))
    lane++;
  B.txt.push({x, y: y - lane * 32, n: v, lane, v: (crit ? '爆擊 ' : '') + fmt(v), t: 0, big, crit, e});
}
function coinText(e) {
  B.txt.push({x: e.x, y: e.y - e.ay - 24, v: '+' + fmt(e.coin), t: 0, coin: 1});
}

/* ---------- 繪圖 ---------- */
let SKY = '#7fd0f2';
const SKYS = {};
const BGS = ['bg_meadow', 'bg_bamboo', 'bg_nightwood'];
const curBg = () => BGS[Math.floor((Math.max(1, S.stage) - 1) / 50) % 3];
function heroScale() {
  if (L._hsSp === L.spots) return L._hs;
  let d = 999;
  const sp = L.spots || [];
  for (const a of sp)
    for (const b of sp) if (a !== b && Math.abs(a[1] - b[1]) < 20) d = Math.min(d, Math.abs(a[0] - b[0]));
  L._hsSp = sp;
  L._hs = Math.max(0.75, Math.min(1, d / 160));
  return L._hs;
}
function drawSprite(k, x, y, o = {}) {
  const m = MAN[k],
    im = IMG[k];
  if (!m || !im) return;
  const w = m[0] / 2,
    h = m[1] / 2,
    ax = m[2] / 2,
    ay = m[3] / 2;
  ctx.save();
  ctx.translate(x + (o.dx || 0), y + (o.dy || 0));
  if (o.rot) ctx.rotate(o.rot);
  ctx.scale(o.sx || 1, o.sy || 1);
  if (o.alpha != null) ctx.globalAlpha = o.alpha;
  if (o.spin) {
    ctx.translate(0, -h * 0.45);
    ctx.rotate(o.spin);
    ctx.translate(0, h * 0.45);
  }
  ctx.drawImage(im, -ax, -ay, w, h);
  if (o.flash) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = o.flash;
    ctx.drawImage(im, -ax, -ay, w, h);
  }
  if (o.white) {
    const wc = whiteOf(k, im, w, h);
    if (wc) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = o.white * (o.alpha != null ? o.alpha : 1);
      ctx.drawImage(wc, -ax, -ay, w, h);
    }
  }
  if (o.tint) {
    ctx.globalCompositeOperation = 'source-atop';
  }
  ctx.restore();
}
// 白色剪影（被打中閃白用）：每張圖做一次、用顯示大小存，最多存 80 張（W037）
const WHT = new Map();
function whiteOf(k, im, w, h) {
  let c = WHT.get(k);
  if (c) return c;
  if (!im.complete || !im.naturalWidth) return null;
  if (WHT.size >= 80) WHT.delete(WHT.keys().next().value);
  c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  const x = c.getContext('2d');
  x.drawImage(im, 0, 0, c.width, c.height);
  x.globalCompositeOperation = 'source-in';
  x.fillStyle = '#fff';
  x.fillRect(0, 0, c.width, c.height);
  WHT.set(k, c);
  return c;
}
// 只給畫面用的亂數（不動遊戲的 Math.random，存檔和戰鬥結果不受影響）
let VRS = 12345;
const vr = () => ((VRS = (VRS * 16807) % 2147483647) - 1) / 2147483646;
function shadow(x, y, w, a = 0.22) {
  ctx.fillStyle = `rgba(40,30,10,${a})`;
  ctx.beginPath();
  ctx.ellipse(x, y, w, w * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
}
const ease = x => 1 - Math.pow(1 - x, 3);
function draw(real) {
  if ((B.bfT = (B.bfT || 0) + 1) % 10 === 0) renderBuffs();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = SKYS[curBg()] || SKY;
  ctx.fillRect(0, 0, cv.width, cv.height);
  const k = SC * DPR;
  let sx = 0,
    sy = 0;
  if (B.shake > 0) {
    sx = (Math.random() - 0.5) * B.shake;
    sy = (Math.random() - 0.5) * B.shake;
  }
  ctx.setTransform(k, 0, 0, k, sx * k, (-TOPY + sy) * k);
  drawBg();
  drawAmbient();
  drawArrays();
  drawZones();
  drawDefArray();
  drawSealArray();
  // 樓閣
  ctx.drawImage(IMG[L.tk], L.tx, G - L.th, L.tw, L.th);
  drawSwapHint();
  drawHeroes();
  drawGate(real);
  // 塔
  for (const t of B.turrets) {
    const tier = tierOf(S.tur[t.k].lv);
    const p = t.anim > 0 ? t.anim / 0.25 : 0;
    shadow(t.x, G + 2, 34);
    drawSprite(`t_${t.k}_${tier}`, t.x, G, {sx: 1 + 0.05 * p, sy: 1 - 0.06 * p, dx: -4 * p});
  }
  drawBeasts();
  drawTreasures();
  drawEnemies();
  // 投射物
  for (const p of B.proj) drawProj(p);
  // 特效
  for (const f of B.fx) drawFx(f);
  drawTexts();
  drawUltFlash();
}
// 背景（縮小模式：背景放大 ×2、地平線對齊，只有人物怪物變小）
function drawBg() {
  const bg = bossSky() ? tintBg(curBg(), bossSky()) : IMG[curBg()] || IMG.bg_meadow,
    bw = 1536 * ZM,
    bh = 1024 * ZM,
    by = G - G * ZM;
  for (let x = 0, i = 0; x < VW + 10; x += bw, i++) {
    if (i % 2) {
      ctx.save();
      ctx.translate(x + bw, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(bg, 0, by, bw, bh);
      ctx.restore();
    } else ctx.drawImage(bg, x, by, bw, bh);
  }
}
// 陣法
function drawArrays() {
  if (B.arr) {
    const a = B.arr,
      c = ARR[a.k].c;
    const pul = 0.75 + 0.25 * Math.sin(B.time * 4);
    ctx.save();
    ctx.globalAlpha = 0.85;
    {
      const f = (L.arrR * 2) / (MAN['g_' + a.k][0] / 2);
      drawSprite('g_' + a.k, a.x, G + 4, {sx: f, sy: f * 0.36});
    }
    ctx.restore();
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const gr = ctx.createRadialGradient(a.x, G + 4, 20, a.x, G + 4, L.arrR * 1.1);
    gr.addColorStop(0, `rgba(${c},${0.45 * pul})`);
    gr.addColorStop(1, `rgba(${c},0)`);
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.ellipse(a.x, G + 4, L.arrR * 1.15, L.arrR * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 8; i++) {
      const ph = (B.time * 0.8 + i / 4) % 1;
      ctx.fillStyle = `rgba(${c},${(1 - ph) * 0.7})`;
      ctx.beginPath();
      ctx.arc(
        a.x - L.arrR * 0.85 + i * L.arrR * 0.24 + Math.sin(i * 7) * 10,
        G - ph * 110,
        4 + 3 * (1 - ph),
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.restore();
  }
}
// 大招地面效果：狐火地面／沙暴／暴風雪
function drawZones() {
  if (B.zones && B.zones.length)
    for (const z of B.zones) {
      const a = Math.min(1, z.t / 0.5);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const gr = ctx.createRadialGradient(z.x, G, 10, z.x, G, z.r);
      gr.addColorStop(
        0,
        z.k === 'fire'
          ? `rgba(255,120,40,${0.55 * a})`
          : z.k === 'sand'
            ? `rgba(255,210,120,${0.45 * a})`
            : `rgba(190,235,255,${0.45 * a})`
      );
      gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.ellipse(z.x, G, z.r, z.r * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
      const n = z.k === 'fire' ? 10 : 16;
      for (let i = 0; i < n; i++) {
        const ph = (B.time * (z.k === 'fire' ? 1.2 : 2) + i / n) % 1,
          px = z.x + Math.sin(i * 12.9) * z.r * 0.9 + (z.k === 'fire' ? 0 : (ph - 0.5) * 120);
        const py = z.k === 'fire' ? G - ph * 90 : G - 30 - Math.abs(Math.sin(i * 3.1)) * 160 * ph;
        ctx.globalAlpha = (1 - ph) * a * 0.9;
        ctx.fillStyle = z.k === 'fire' ? '#ff9a3a' : z.k === 'sand' ? '#ffe0a0' : '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, z.k === 'fire' ? 6 * (1 - ph) + 2 : 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
}
// 防禦陣（樓閣下）
function drawDefArray() {
  if (B.arrD) {
    const c = ARR[B.arrD].c;
    ctx.save();
    ctx.globalAlpha = 0.8;
    {
      const f = (L.dR * 2) / (MAN['g_' + B.arrD][0] / 2);
      drawSprite('g_' + B.arrD, L.dX, G + 4, {sx: f, sy: f * 0.7});
    }
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.3 + 0.1 * Math.sin(B.time * 3);
    const gr = ctx.createRadialGradient(L.dX, G, 10, L.dX, G, L.dR);
    gr.addColorStop(0, `rgba(${c},.8)`);
    gr.addColorStop(1, `rgba(${c},0)`);
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.ellipse(L.dX, G + 4, L.dR, L.dR * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
// 定身符陣地面
function drawSealArray() {
  if (PS.slow > 0) {
    ctx.save();
    ctx.globalAlpha = 0.32 + 0.08 * Math.sin(B.time * 3);
    ctx.fillStyle = '#ffe86a';
    ctx.beginPath();
    ctx.ellipse(L.front + 225, G + 6, 225, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.9;
    for (let i = 0; i < 6; i++) {
      const x = L.front + 30 + i * 75,
        y = G - 8 - Math.abs(Math.sin(B.time * 2 + i)) * 10;
      ctx.fillStyle = '#ffe86a';
      ctx.fillRect(x - 6, y - 14, 12, 20);
      ctx.fillStyle = '#d0302a';
      ctx.fillRect(x - 2, y - 11, 4, 14);
    }
    ctx.restore();
  }
}
// 換站位提示
function drawSwapHint() {
  if (pick >= 0) {
    L.spots.forEach(([x, y], i) => {
      const me = i === pick;
      ctx.save();
      ctx.globalAlpha = me ? 0.35 : 0.18 + 0.1 * Math.sin(B.time * 6);
      ctx.fillStyle = me ? '#ffd86a' : '#ffffff';
      ctx.fillRect(x - 42, y - 150, 84, 150);
      ctx.globalAlpha = me ? 1 : 0.8;
      ctx.strokeStyle = me ? '#ffb020' : '#ffffff';
      ctx.lineWidth = 7;
      ctx.setLineDash([14, 8]);
      ctx.strokeRect(x - 42, y - 150, 84, 150);
      ctx.setLineDash([]);
      if (!me) {
        ctx.fillStyle = '#fff';
        ctx.font = '900 30px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⇄', x, y - 160);
      }
      ctx.restore();
    });
  }
}
// 英雄
function drawHeroes() {
  for (const h of B.heroes) {
    const o = {};
    const A = h.anim;
    if (h.id === 'archer' && B.focusT > 0)
      glow(h.x, h.y - 60, 80, 'rgba(170,255,210,.7)', 0.55 + 0.25 * Math.sin(B.time * 8));
    if (A && A.type === 'atk') {
      const t = A.t;
      if (t < 0.2) {
        const p = ease(t / 0.2);
        o.rot = -0.06 * p;
        o.sy = 1 + 0.04 * p;
        o.sx = 1 - 0.02 * p;
        o.dx = -3 * p;
      } else if (t < 0.28) {
        o.rot = 0.09;
        o.sy = 0.94;
        o.sx = 1.05;
        o.dx = 6;
      } else {
        const q = 1 - ease((t - 0.28) / 0.22);
        o.rot = 0.09 * q;
        o.sy = 1 - 0.06 * q;
        o.sx = 1 + 0.05 * q;
        o.dx = 6 * q;
      }
    }
    if (A && A.type === 'ult') {
      const t = A.t;
      if (t < 0.3) {
        const p = ease(t / 0.3);
        o.sy = 1 - 0.08 * p;
        o.sx = 1 + 0.06 * p;
      } else if (t < 0.7) {
        const p = (t - 0.3) / 0.4,
          q = Math.sin(p * Math.PI);
        o.dy = -90 * q;
        o.spin = p * Math.PI * 2;
        o.sy = 1 + 0.06 * q;
      } else if (t < 0.78) {
        o.sy = 0.88;
        o.sx = 1.12;
      } else {
        const q = 1 - ease(Math.min(1, (t - 0.78) / 0.42));
        o.sy = 1 - 0.12 * q;
        o.sx = 1 + 0.12 * q;
      }
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const gr = ctx.createRadialGradient(h.x, h.y - 60, 5, h.x, h.y - 60, 110);
      gr.addColorStop(0, CH[h.id].c);
      gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = gr;
      ctx.fillRect(h.x - 120, h.y - 180, 240, 240);
      ctx.restore();
    }
    if (!A) {
      o.sy = 1 + Math.sin(B.time * 2.2 + h.x) * 0.012;
    }
    if (h.charge >= 100) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.25 + 0.15 * Math.sin(B.time * 6);
      const gr = ctx.createRadialGradient(h.x, h.y - 60, 5, h.x, h.y - 60, 80);
      gr.addColorStop(0, CH[h.id].c);
      gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gr;
      ctx.fillRect(h.x - 90, h.y - 150, 180, 180);
      ctx.restore();
    }
    if (PASSIVE[h.id]) {
      const c = CH[h.id].c;
      ctx.save();
      ctx.globalAlpha = 0.55 + 0.25 * Math.sin(B.time * 3 + h.x);
      ctx.strokeStyle = c;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(h.x, h.y - 2, 38, 8, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      const ph = (B.time * 0.7 + h.x * 0.01) % 1;
      ctx.save();
      ctx.globalAlpha = (1 - ph) * 0.8;
      ctx.fillStyle = c;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(h.x - 24 + i * 24, h.y - 10 - ph * 70 - i * 8, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    let hk = myKey(h.id);
    if (isMy(h.id) && !SRC[`c_${h.id}_6`])
      glow(h.x, h.y - 60, 95, 'rgba(255,210,90,.75)', 0.5 + 0.2 * Math.sin(B.time * 4 + h.x));
    if (A) {
      const t = A.t;
      const f =
        A.type === 'atk'
          ? t < 0.2
            ? 1
            : t < 0.3
              ? 2
              : t < 0.42
                ? 3
                : 0
          : t < 0.3
            ? 1
            : t < 0.7
              ? 2
              : t < 0.95
                ? 3
                : 0;
      if (f && MAN[hk + '_a' + f]) hk += '_a' + f;
    }
    {
      const k = heroScale();
      if (k < 1) {
        o.sx = (o.sx || 1) * k;
        o.sy = (o.sy || 1) * k;
      }
    } // 所有弟子同一個比例（臉一樣大），依樓閣最擠那層的站位間距決定
    drawSprite(hk, h.x, h.y, o);
    if (A && A.type === 'atk' && CH[h.id].role === 'melee' && A.t > 0.18 && A.t < 0.36) {
      swoosh(h.x + 40, h.y - 70, CH[h.id].c, 1 - (A.t - 0.18) / 0.18, 70);
    }
  }
}
// 山門
function drawGate(real) {
  const broken = B.gateHp < B.gateMax * 0.35;
  const gk = gateKey(broken);
  const gdx = B.gateHit > 0 ? (Math.random() - 0.5) * 6 : 0;
  if (B.gateHit > 0) B.gateHit -= real;
  drawSprite(gk, L.gx + gdx, G, {flash: B.gateHit > 0 ? 0.35 : 0});
}
// 神獸
function drawBeasts() {
  if (B.shield > 0) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, B.shield) * (0.35 + 0.1 * Math.sin(B.time * 8));
    ctx.fillStyle = '#8fe0ff';
    ctx.strokeStyle = '#e6fbff';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(L.gx, G - 120, 170, 190, 0, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha *= 1.8;
    ctx.stroke();
    ctx.restore();
  }
  for (const b of B.beasts) {
    const fly = BEAST[b.k].fly;
    const p = b.anim > 0 ? b.anim / 0.45 : 0;
    let o = {sy: 1 + Math.sin(B.time * 3 + b.x) * 0.015, dy: fly ? Math.sin(B.time * 2.5 + b.x) * 8 : 0};
    if (p > 0) {
      const q = p > 0.6 ? (1 - p) / 0.4 : p / 0.6;
      o = {dx: (fly ? 14 : 30) * q, rot: 0.12 * q, sy: 1 - 0.06 * q, sx: 1 + 0.05 * q, dy: o.dy};
    }
    if (b.pounce > 0) {
      const t = 1 - b.pounce / 0.55,
        sn = Math.sin(Math.PI * t);
      o = {
        dx: (b.pdx || 0) * sn,
        dy: -70 * Math.sin(Math.PI * Math.min(1, t * 2)) * (t < 0.5 ? 1 : 0) - 10 * sn,
        rot: t < 0.5 ? -0.15 : 0.1,
        sx: 1.04,
        sy: 0.97
      };
    }
    shadow(b.x + (o.dx || 0), G + 2, fly ? 36 : 50, fly ? 0.12 : 0.22);
    drawSprite('b_' + b.k, b.x, b.y || G, o);
  }
}
// 裝備中的法寶：在山門和神獸上方飄著轉圈（10 星的有紅光）
function drawTreasures() {
  {
    const fo = (S.fbOn || []).slice(0, fbSlots()).filter(k => S.fb[k]);
    if (fo.length) {
      const xs = B.beasts.map(b => b.x),
        x0 = L.gx - 120,
        x1 = Math.max(L.gx + 260, ...xs) + 40;
      fo.forEach((k, i) => {
        const t = B.time,
          fx = x0 + ((x1 - x0) * (i + 0.5)) / fo.length + Math.sin(t * 0.9 + i * 2.1) * 26,
          fy = G - (ZM > 1 ? 420 : 330) + Math.sin(t * 1.7 + i * 1.3) * 16,
          st = S.fb[k].star,
          red = st > 5;
        ctx.save();
        const gr = ctx.createRadialGradient(fx, fy, 4, fx, fy, 62);
        gr.addColorStop(0, red ? 'rgba(255,90,60,.55)' : 'rgba(255,240,170,.55)');
        gr.addColorStop(1, 'rgba(255,220,120,0)');
        ctx.globalAlpha = 0.75 + 0.25 * Math.sin(t * 3 + i);
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(fx, fy, 62, 0, 7);
        ctx.fill();
        ctx.restore();
        drawSprite('i_fb_' + k, fx, fy, {rot: Math.sin(t * 1.3 + i) * 0.18, sx: 1.15, sy: 1.15});
      });
    }
  }
  xDraw();
}
// 敵人
function drawEnemies() {
  const es = B.enemies.slice().sort((a, b) => a.fly - b.fly || a.y - b.y);
  for (const e of es) {
    let key = e.key,
      o = {};
    if (e.dead) {
      const p = Math.min(1, e.dead / 0.45);
      if (e.boss) {
        o.sx = 1 + p * 0.3;
        o.sy = 1 - p * 0.6;
        o.alpha = 1 - p;
      } else {
        // 小怪被打飛：往後上方飛、轉圈、變小、最後淡掉（W037）
        o.dx = 150 * p;
        o.dy = -Math.sin(p * Math.PI * 0.85) * 110 - (e.fly ? 60 * p : 0);
        o.spin = p * 6;
        o.sx = o.sy = 1 - p * 0.35;
        o.alpha = p < 0.6 ? 1 : 1 - (p - 0.6) / 0.4;
        o.white = p < 0.2 ? 1 - p / 0.2 : 0;
      }
    } else if (e.lift > 0) {
      o.dy = -110 * Math.sin((Math.min(1, (1.5 - e.lift) / 0.3) * Math.PI) / 2);
      o.rot = Math.sin(e.t * 12) * 0.15;
    } else if (e.state === 'walk' || e.stun > 0) {
      const st = e.stun > 0 ? 0 : 1;
      const ph = e.t * (e.spd / 18);
      if (e.hop) {
        const q = Math.abs(Math.sin(ph * 0.5));
        o.dy = -12 * q * st;
        o.sy = 1 + 0.06 * q * st - 0.06 * (1 - q) * st;
        o.sx = 1 - 0.04 * q * st;
      } else if (e.fly) {
        o.dy = Math.sin(e.t * 5) * 8;
        key = Math.floor(e.t * 8) % 2 ? 'm_bat_1' : 'm_bat_0';
      } else {
        o.dy = -Math.abs(Math.sin(ph * 0.5)) * 5 * st;
        o.rot = Math.sin(ph * 0.5) * 0.04 * st;
      }
    } else {
      // 攻擊
      const a = e.at;
      if (e.boss) {
        if (a < 0.9) {
          key = e.frames[0];
          o.dx = 8 * ease(a / 0.9);
        } else if (a < 1.6) {
          key = e.frames[1];
          o.dx = -10;
        } else {
          o.dx = -10 * (1 - ease((a - 1.6) / 0.6));
        }
      } else if (e.fly) {
        key = a < 0.5 ? 'm_bat_0' : 'm_bat_1';
        o.dy = a < 0.5 ? -10 : 10 * Math.sin(Math.min(1, (a - 0.5) / 0.3) * Math.PI);
        o.dx = a > 0.5 && a < 0.8 ? -16 : 0;
      } else if (e.frames.length) {
        const fr = e.frames;
        if (a < 0.3) {
          key = fr[0];
          o.dx = 3;
        } else if (a < 0.45) {
          key = fr[1] || fr[0];
          o.dx = -4;
        } else if (a < 0.75) {
          key = fr[2] || fr[fr.length - 1];
          o.dx = -10;
          o.sx = 1.04;
          o.sy = 0.96;
        } else {
          o.dx = -10 * (1 - ease((a - 0.75) / 0.55));
        }
      } else {
        if (a < 0.35) {
          const p = ease(a / 0.35);
          o.dx = 6 * p;
          o.sy = 1 - 0.06 * p;
          o.sx = 1 + 0.04 * p;
        } else if (a < 0.5) {
          o.dx = -16;
          o.sy = 1.05;
          o.sx = 0.97;
        } else {
          o.dx = -16 * (1 - ease((a - 0.5) / 0.8));
        }
      }
    }
    if (e.flash > 0) o.flash = 0.6;
    if (!e.dead && e.hkT != null) {
      // 被打中閃白、往後退一小步
      const k = 1 - (B.time - e.hkT) / 0.14;
      if (k > 0) {
        o.white = 0.6 * k;
        o.dx = (o.dx || 0) + (e.boss ? 3 : 7) * k;
        o.sx = (o.sx || 1) * (1 - 0.05 * k);
        o.sy = (o.sy || 1) * (1 + 0.04 * k);
      }
    }
    if (!e.fly) shadow(e.x, G + 2, e.w * 0.33, e.dead ? 0.1 : 0.22);
    else shadow(e.x, G + 2, e.w * 0.22, 0.12);
    if (e.stun > 0 && !e.dead) {
      o.dx = (o.dx || 0) + (Math.random() - 0.5) * 2;
    }
    if (e.flip) o.sx = -(o.sx || 1);
    if (e.sc) {
      o.sx = (o.sx || 1) * e.sc;
      o.sy = (o.sy || 1) * e.sc;
      o.dx = (o.dx || 0) * e.sc;
      if (!e.dead) {
        ctx.save();
        const r = e.h * 0.55,
          gx = e.x,
          gy = e.y - e.ay * 0.5;
        const gr = ctx.createRadialGradient(gx, gy, r * 0.2, gx, gy, r);
        gr.addColorStop(0, e.c + '88');
        gr.addColorStop(1, e.c + '00');
        ctx.globalAlpha = 0.55 + 0.25 * Math.sin(B.time * 4);
        ctx.fillStyle = gr;
        ctx.fillRect(gx - r, gy - r, r * 2, r * 2);
        ctx.restore();
      }
    }
    drawSprite(key, e.x, e.y, o);
    if (e.goldm && !e.dead) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.35 + 0.2 * Math.sin(B.time * 6 + e.x);
      ctx.fillStyle = '#ffd84a';
      ctx.beginPath();
      ctx.ellipse(e.x, e.y - e.ay * 0.5, e.w * 0.4, e.ay * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    if (e.elite && !e.dead) {
      ctx.save();
      ctx.translate(e.x, e.y - e.ay - 16);
      ctx.fillStyle = '#ffd84a';
      ctx.strokeStyle = '#6b3d06';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -13);
      ctx.lineTo(11, -8);
      ctx.lineTo(9, 6);
      ctx.lineTo(0, 13);
      ctx.lineTo(-9, 6);
      ctx.lineTo(-11, -8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    if (!e.dead && e.stun > 0) {
      ctx.save();
      ctx.globalAlpha = 0.8;
      for (let i = 0; i < 3; i++) {
        const a = B.time * 5 + i * 2.1;
        ctx.fillStyle = '#fff6a0';
        star(e.x + Math.cos(a) * 22, e.y - e.ay - 8 + Math.sin(a) * 6, 5);
      }
      ctx.restore();
    }
    if (!e.dead) {
      const bd = [];
      if (e.burn > 0) bd.push(['燒', '#ff6a2a']);
      if (e.stun > 0) bd.push(['暈', '#e0b000']);
      if (e.slow > 0) bd.push(['慢', '#3a9ae0']);
      if (e.armor > 0) bd.push(['破', '#c07a10']);
      if (e.mark > 0) bd.push(['標', '#3a8ae0']);
      if (e.melt > 0) bd.push(['熔', '#ff6a3a']);
      if (e.frog > 0) bd.push(['蛙', '#3aa040']);
      if (e.bleed > 0) bd.push(['血', '#c02040']);
      if (e.conf > 0) bd.push(['迷', '#a070c0']);
      if (e.vuln > 0) bd.push(['弱', '#8a2050']);
      if (bd.length) {
        ctx.save();
        ctx.font = 'bold 19px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const by = e.y - e.ay - (e.boss ? 36 : 30);
        bd.forEach(([t, c], i) => {
          const bx = e.x + (i - (bd.length - 1) / 2) * 36;
          ctx.fillStyle = c;
          ctx.beginPath();
          ctx.arc(bx, by, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = '#fff';
          ctx.fillText(t, bx, by + 1);
        });
        ctx.restore();
      }
    }
    if (!e.dead && e.slow > 0) {
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#bdf4ff';
      ctx.beginPath();
      ctx.ellipse(e.x, G, e.w * 0.35, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    if (!e.dead && !e.boss && e.hp < e.max) {
      const w = Math.max(30, e.w * 0.5);
      ctx.fillStyle = 'rgba(0,0,0,.5)';
      ctx.fillRect(e.x - w / 2, e.y - e.ay - 10, w, 5);
      ctx.fillStyle = '#ff5a3a';
      ctx.fillRect(e.x - w / 2, e.y - e.ay - 10, w * Math.max(0, e.hp / e.max), 5);
    }
  }
}
// 傷害數字、銅錢字
function drawTexts() {
  ctx.textAlign = 'center';
  ctx.lineJoin = 'round';
  for (const t of B.txt) {
    const L0 = t.life || 0.8,
      a = 1 - Math.max(0, (t.t - (L0 - 0.3)) / 0.3);
    ctx.globalAlpha = a;
    if (t.shout) {
      const sz = Math.round(42 * (t.t < 0.15 ? 1 + (0.15 - t.t) * 3 : 1));
      ctx.font = `900 ${sz}px "Noto Sans TC",sans-serif`;
      ctx.lineWidth = 7;
      ctx.strokeStyle = '#2a1206';
      ctx.strokeText(t.v, t.x, t.y);
      ctx.fillStyle = t.c || '#fff2a0';
      ctx.fillText(t.v, t.x, t.y);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255,255,255,.9)';
      ctx.strokeText(t.v, t.x, t.y);
      continue;
    }
    const pop = t.coin ? 1 : t.t < 0.12 ? 1 + (0.12 - t.t) * (t.crit ? 4 : 2.5) : 1,
      sz = Math.round((t.crit ? 52 : t.coin ? 26 : t.big ? 40 : 30) * pop);
    if (t.crit) {
      // 爆擊：數字後面一顆轉動的金色星芒
      ctx.save();
      ctx.translate(t.x, t.y - sz * 0.35);
      ctx.rotate(t.t * 3);
      ctx.fillStyle = 'rgba(255,214,60,.85)';
      star(0, 0, sz * 0.95);
      ctx.fillStyle = 'rgba(255,255,235,.9)';
      star(0, 0, sz * 0.5);
      ctx.restore();
    }
    ctx.font = `900 ${sz}px "Noto Sans TC",sans-serif`;
    ctx.lineWidth = 5;
    ctx.strokeStyle = t.coin ? '#5a3a06' : '#3a1408';
    ctx.strokeText(t.v, t.x, t.y);
    ctx.fillStyle = t.crit ? '#ff5a2a' : t.coin ? '#ffe066' : t.big ? '#fff2a0' : '#ffffff';
    ctx.fillText(t.v, t.x, t.y);
  }
  ctx.globalAlpha = 1;
}
// 場景環境動態（W037）：草地飄花瓣、竹林落葉、夜林螢火蟲；Boss／魔頭／凶獸關天色變暗紅
let GLOWDOT = null;
function glowDot() {
  if (GLOWDOT) return GLOWDOT;
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const x = c.getContext('2d'),
    g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, 'rgba(255,255,220,1)');
  g.addColorStop(0.25, 'rgba(230,255,140,.9)');
  g.addColorStop(1, 'rgba(180,255,80,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 32, 32);
  return (GLOWDOT = c);
}
// Boss 關 1、魔頭／凶獸關 2、其他 0
const bossSky = () => (B.trial ? 0 : B.xf || S.stage % 100 === 0 ? 2 : S.stage % 10 === 0 ? 1 : 0);
// 染紅的背景：每張背景只做一次（不要每格畫全螢幕混色，手機會變慢）
const TBG = new Map();
function tintBg(k, lv) {
  const key = k + lv;
  let c = TBG.get(key);
  if (c) return c;
  const im = IMG[k] || IMG.bg_meadow;
  if (!im || !im.complete || !im.naturalWidth) return im;
  if (TBG.size >= 2) TBG.delete(TBG.keys().next().value);
  c = document.createElement('canvas');
  c.width = im.naturalWidth;
  c.height = im.naturalHeight;
  const x = c.getContext('2d'),
    a = lv === 2 ? 0.85 : 0.6,
    g = x.createLinearGradient(0, 0, 0, c.height * 0.85);
  x.drawImage(im, 0, 0);
  g.addColorStop(0, `rgba(190,40,50,${a})`);
  g.addColorStop(0.75, `rgba(230,110,90,${a * 0.6})`);
  g.addColorStop(1, 'rgba(255,200,180,0)');
  x.globalCompositeOperation = 'multiply';
  x.fillStyle = g;
  x.fillRect(0, 0, c.width, c.height);
  TBG.set(key, c);
  return c;
}
function drawAmbient() {
  const bg = curBg(),
    T = B.time,
    boss = bossSky(),
    mo = boss === 2;
  ctx.save();
  const H = G - TOPY;
  if (boss) {
    // 往上飄的火星
    ctx.fillStyle = mo ? '#ff6a3a' : '#ff9a5a';
    for (let i = 0; i < 22; i++) {
      const q = (T * (0.06 + (i % 5) * 0.012) + i * 0.137) % 1,
        x = (i * 211 + Math.sin(T + i) * 30) % VW,
        y = G - q * H;
      ctx.globalAlpha = 0.8 * Math.sin(q * Math.PI);
      ctx.fillRect(x, y, 6 + (i % 3) * 2, 6 + (i % 3) * 2);
    }
  } else if (bg === 'bg_nightwood') {
    const d = glowDot();
    for (let i = 0; i < 18; i++) {
      const x = (i * 263 + T * (8 + (i % 4) * 5) + Math.sin(T * 0.7 + i) * 60) % VW,
        y = G - 60 - ((i * 97) % (H * 0.55)) + Math.sin(T * 1.3 + i * 2) * 30,
        r = 10 + (i % 3) * 4;
      ctx.globalAlpha = 0.35 + 0.55 * Math.max(0, Math.sin(T * 2 + i * 1.7));
      ctx.drawImage(d, x - r, y - r, r * 2, r * 2);
    }
  } else {
    const bam = bg === 'bg_bamboo';
    for (let i = 0; i < 22; i++) {
      const q = (T * (0.05 + (i % 4) * 0.01) + i * 0.173) % 1,
        x = VW - ((i * 197 + q * VW * 1.2 + Math.sin(T * 1.2 + i) * 40) % (VW + 80)),
        y = TOPY + q * H,
        r = bam ? 13 : 10;
      ctx.globalAlpha = 0.85 * Math.min(1, (1 - q) * 6);
      ctx.fillStyle = bam ? (i % 2 ? '#8ac85a' : '#b0d870') : i % 2 ? '#ffc4d8' : '#ffe0ea';
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(T * 2 + i);
      ctx.scale(1, 0.45 + 0.35 * Math.sin(T * 4 + i));
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * (bam ? 0.32 : 0.7), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  ctx.restore();
}
// 傳說／神話大招登場橫幅：頭像＋招式名從左邊滑進來，背景稍暗（W037）
const CUT_T = 1.1;
function drawCutin() {
  const c = B.cut;
  if (!c) return;
  const t = c.t,
    inn = ease(Math.min(1, t / 0.18)),
    out = t > CUT_T - 0.22 ? ease((t - (CUT_T - 0.22)) / 0.22) : 0,
    env = Math.min(inn, 1 - out);
  ctx.save();
  ctx.fillStyle = `rgba(0,0,0,${0.28 * env})`;
  ctx.fillRect(0, TOPY, VW, VH);
  const bh = 200,
    cy = TOPY + VH * 0.3,
    off = -VW * (1 - inn) + VW * out;
  ctx.translate(off, 0);
  ctx.beginPath();
  ctx.moveTo(0, cy - bh / 2);
  ctx.lineTo(VW * 0.7, cy - bh / 2);
  ctx.lineTo(VW * 0.7 - 60, cy + bh / 2);
  ctx.lineTo(0, cy + bh / 2);
  ctx.closePath();
  const g = ctx.createLinearGradient(0, 0, VW * 0.7, 0);
  g.addColorStop(0, 'rgba(20,10,30,.92)');
  g.addColorStop(0.7, 'rgba(40,20,50,.85)');
  g.addColorStop(1, 'rgba(40,20,50,0)');
  ctx.fillStyle = g;
  ctx.fill();
  ctx.save();
  ctx.clip();
  // 速度線
  ctx.fillStyle = c.c;
  for (let i = 0; i < 7; i++) {
    const y = cy - bh / 2 + 10 + ((i * 41) % (bh - 20)),
      x = ((i * 173 + t * 1800) % (VW * 0.7)) - 100;
    ctx.globalAlpha = 0.35;
    ctx.fillRect(x, y, 120 + (i % 3) * 60, 4);
  }
  ctx.globalAlpha = 1;
  const k = S.roster[c.id] ? myKey(c.id) : null,
    m = k && MAN[k];
  if (m) drawSprite(k, 170 + 30 * (1 - inn), cy - 70 + (m[1] / 2) * 1.7 * 0.8, {sx: 1.7, sy: 1.7});
  ctx.restore();
  ctx.fillStyle = c.c;
  ctx.fillRect(0, cy - bh / 2 - 6, VW * 0.7, 6);
  ctx.fillRect(0, cy + bh / 2, VW * 0.7 - 60, 6);
  ctx.textAlign = 'left';
  ctx.lineJoin = 'round';
  ctx.font = '900 38px "Noto Sans TC",sans-serif';
  ctx.lineWidth = 7;
  ctx.strokeStyle = '#1a0a10';
  const nm = CH[c.id].n;
  ctx.strokeText(nm, 340, cy - 34);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(nm, 340, cy - 34);
  ctx.font = '900 84px "Noto Sans TC",sans-serif';
  ctx.lineWidth = 12;
  ctx.strokeText(c.n, 340, cy + 60);
  ctx.fillStyle = c.c;
  ctx.fillText(c.n, 340, cy + 60);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255,255,255,.9)';
  ctx.strokeText(c.n, 340, cy + 60);
  ctx.restore();
}
// 大招全螢幕色
function drawUltFlash() {
  drawCutin();
  for (const f of B.fx) {
    if (f.k === 'frost') {
      ctx.fillStyle = `rgba(190,240,255,${0.35 * (1 - f.t / f.life)})`;
      ctx.fillRect(0, TOPY, VW, VH);
    }
    if (f.k === 'moon') {
      ctx.fillStyle = `rgba(120,0,30,${0.3 * Math.sin((f.t / f.life) * Math.PI)})`;
      ctx.fillRect(0, TOPY, VW, VH);
    }
  }
  updLive();
}
