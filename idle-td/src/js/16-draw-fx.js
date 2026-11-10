/* ---------- 畫小東西：星星、劍光、光暈、投射物、特效 ---------- */
function star(x, y, r) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 ? r * 0.45 : r,
      a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  ctx.closePath();
  ctx.fill();
}
function swoosh(x, y, c, a, r) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = c;
  ctx.lineCap = 'round';
  for (let k = 0; k < 3; k++) {
    ctx.lineWidth = 12 - k * 4;
    ctx.globalAlpha = Math.max(0, a) * (0.9 - k * 0.25);
    ctx.beginPath();
    ctx.arc(0, 0, r - k * 5, -1.9, 0.55);
    ctx.stroke();
  }
  ctx.restore();
}
// 實心月牙（劍氣）：外弧＋往內縮的內弧，刀口一條白邊
function crescent(x, y, r, c, edge) {
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(x, y, r, -1.25, 1.25);
  ctx.quadraticCurveTo(x + r * 0.55, y, x + r * Math.cos(-1.25), y + r * Math.sin(-1.25));
  ctx.fill();
  if (edge) {
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.beginPath();
    ctx.arc(x, y, r, -1.1, 1.1);
    ctx.quadraticCurveTo(x + r * 0.97, y, x + r * Math.cos(-1.1), y + r * Math.sin(-1.1));
    ctx.fill();
  }
}
function glow(x, y, r, c, a = 1) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = a;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, c);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
  ctx.restore();
}
function drawProj(p) {
  const a = p.ang || 0;
  if (p.spr && MAN[p.spr]) {
    glow(p.x, p.y, 22, p.c, 0.45);
    const round = p.spr === 'p_pill' || p.spr === 'p_bullet' || p.spr === 'p_bun' || p.spr === 'p_firebomb';
    drawSprite(p.spr, p.x, p.y, {rot: round ? B.time * 8 : a});
    return;
  }
  ctx.save();
  ctx.translate(p.x, p.y);
  switch (p.kind) {
    case 'arrow':
    case 'bolt':
    case 'harpoon':
      ctx.rotate(a);
      ctx.strokeStyle = p.kind === 'bolt' ? '#8a5a2a' : '#f4f0e0';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-26, 0);
      ctx.lineTo(8, 0);
      ctx.stroke();
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.moveTo(14, 0);
      ctx.lineTo(4, -5);
      ctx.lineTo(4, 5);
      ctx.fill();
      ctx.fillStyle = p.c;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(-28, -3, 6, 6);
      ctx.restore();
      glow(p.x, p.y, 18, p.c, 0.5);
      return;
    case 'slash':
      ctx.rotate(a);
      ctx.strokeStyle = p.c;
      ctx.lineCap = 'round';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(-6, 0, 20, -1.2, 1.2);
      ctx.stroke();
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(-16, 0, 18, -1.1, 1.1);
      ctx.stroke();
      ctx.restore();
      glow(p.x, p.y, 26, p.c, 0.5);
      return;
    case 'spear':
      ctx.rotate(a);
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(-10, -6);
      ctx.lineTo(-24, 0);
      ctx.lineTo(-10, 6);
      ctx.fill();
      ctx.restore();
      glow(p.x, p.y, 24, p.c, 0.6);
      return;
    case 'orb':
    case 'fire':
      ctx.restore();
      glow(p.x, p.y, 30, p.c, 0.9);
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
      for (let i = 1; i < 4; i++) {
        ctx.globalAlpha = 0.4 / i;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x - Math.cos(a) * i * 10, p.y - Math.sin(a) * i * 10, 8 - i, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      return;
    case 'pill':
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(-2, -2, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      glow(p.x, p.y, 16, p.c, 0.4);
      return;
    case 'ice':
      ctx.rotate(a);
      ctx.fillStyle = '#e8fbff';
      ctx.beginPath();
      ctx.moveTo(14, 0);
      ctx.lineTo(0, -6);
      ctx.lineTo(-14, 0);
      ctx.lineTo(0, 6);
      ctx.fill();
      ctx.restore();
      glow(p.x, p.y, 20, p.c, 0.6);
      return;
    case 'tali':
      ctx.rotate(B.time * 10);
      ctx.fillStyle = '#ffe86a';
      ctx.fillRect(-6, -10, 12, 20);
      ctx.fillStyle = '#d0302a';
      ctx.fillRect(-2, -7, 4, 14);
      ctx.restore();
      return;
  }
  ctx.restore();
}
function drawFx(f) {
  const p = Math.min(1, f.t / f.life);
  if (f.k === 'spr') {
    const i = Math.min(f.n - 1, Math.floor(p * f.n));
    glow(f.x, f.y, 40 * f.sc, 'rgba(255,255,255,.9)', 0.35 * (1 - p));
    ctx.save();
    ctx.globalAlpha = i === f.n - 1 ? 0.7 : 1;
    drawSprite(f.pre + '_' + i, f.x, f.y, {sx: f.sc, sy: f.sc});
    ctx.restore();
    return;
  }
  if (f.k === 'ult') {
    if (f.t < f.delay) return;
    const q = Math.min(1, (f.t - f.delay) / (f.life - f.delay));
    const i = Math.min(5, Math.floor(q * 6));
    glow(f.x, f.y, 200 * f.sc, f.c || 'rgba(255,230,160,1)', 0.45 * (1 - q));
    drawSprite(f.pre + '_' + i, f.x, f.y, {sx: f.sc, sy: f.sc});
    return;
  }
  switch (f.k) {
    case 'spark':
      glow(f.x, f.y, 28 * (1 - p) + 8, f.c, 1 - p);
      break;
    case 'muzzle':
      glow(f.x, f.y, 22, f.c, 1 - p);
      break;
    case 'boom': {
      const r = (f.r || 60) * (0.4 + 0.8 * ease(p));
      glow(f.x, f.y, r, f.c, 1 - p);
      ctx.save();
      ctx.strokeStyle = f.c;
      ctx.globalAlpha = 1 - p;
      ctx.lineWidth = 4 * (1 - p) + 1;
      ctx.beginPath();
      ctx.arc(f.x, f.y, r * 0.8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      break;
    }
    case 'coin': {
      f.vy += 600 * (1 / 60);
      const x = f.x + f.vx * f.t,
        y = f.y + f.vy * f.t * 0.6 + 300 * f.t * f.t;
      ctx.globalAlpha = 1 - p;
      ctx.fillStyle = '#ffd23a';
      ctx.beginPath();
      ctx.arc(x, Math.min(G, y), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      break;
    }
    case 'claw':
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.lineCap = 'round';
      ctx.globalAlpha = 1 - p;
      for (let i = 0; i < 3; i++) {
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(f.x - 30 + i * 18, f.y - 40);
        ctx.lineTo(f.x + i * 18, f.y + 30);
        ctx.stroke();
      }
      ctx.restore();
      break;
    case 'dust':
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = `rgba(190,170,140,${0.6 * (1 - p)})`;
        ctx.beginPath();
        ctx.arc(f.x + (i - 4) * 14 * (0.5 + p), f.y - 6 - p * 20 * (i % 3), 6 + p * 10, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case 'xslash': {
      const m = MAN.xu_qiongqi;
      ctx.save();
      ctx.globalAlpha = 1 - p;
      drawSprite('xu_qiongqi', f.x, f.y + m[3] * 0.15, {sx: 0.3 + 0.1 * p, sy: 0.3 + 0.1 * p});
      ctx.restore();
      break;
    }
    case 'xsuck': {
      const q = Math.min(1, p * 1.25),
        e2 = q * q;
      ctx.save();
      ctx.globalAlpha = 1 - Math.max(0, p - 0.8) * 5;
      drawSprite(f.key, f.x0 + (f.x1 - f.x0) * e2, f.y0 + (f.y1 - f.y0) * e2, {
        sx: f.sc * (1 - q * 0.92),
        sy: f.sc * (1 - q * 0.92),
        rot: q * 6
      });
      ctx.restore();
      break;
    }
    case 'bult': {
      const m = MAN[f.key];
      if (m) {
        ctx.save();
        ctx.globalAlpha = p < 0.15 ? p / 0.15 : p > 0.7 ? (1 - p) / 0.3 : 1;
        drawSprite(f.key, VW * 0.52, TOPY + VH * 0.42 + m[3] / 2, {sx: 1.3 * (1 + 0.08 * p), sy: 1.3 * (1 + 0.08 * p)});
        ctx.restore();
      }
      break;
    }
    case 'dog': {
      const bite = f.bite > 0,
        fr = bite ? 'dog_bite_f' + (1 + (Math.floor(f.t * 8) % 2)) : 'dog_run_f' + (1 + (Math.floor(f.t * 14) % 4));
      glow(f.x, f.y - 30, 46, 'rgba(255,230,160,.8)', 0.35);
      ctx.save();
      ctx.globalAlpha = f.t > f.life - 0.2 ? (f.life - f.t) / 0.2 : 1;
      drawSprite(fr, f.x, f.y, {});
      ctx.restore();
      break;
    }
    case 'ride': {
      const k = myKey('nezha');
      ctx.save();
      if (MAN.wheel_firetrail)
        drawSprite('wheel_firetrail', f.x - (f.dir > 0 ? 20 : -20), f.y - 14, {sx: f.dir > 0 ? 1.3 : -1.3, sy: 1.3});
      glow(f.x, f.y - 60, 90, 'rgba(255,90,60,.9)', 0.5);
      drawSprite(k, f.x, f.y, {sx: f.dir > 0 ? 1.1 : -1.1, sy: 1.1});
      ctx.restore();
      break;
    }
    case 'fly': {
      const q = ease(Math.min(1, p * 1.1)),
        x = f.x0 + (f.x1 - f.x0) * q;
      ctx.save();
      ctx.globalAlpha = p > 0.8 ? (1 - p) / 0.2 : 1;
      glow(x, f.y, 140, f.c || 'rgba(160,230,255,.9)', 0.5);
      drawSprite(f.key, x, f.y + Math.sin(p * 9) * 16, {sx: f.sc || 1.6, sy: f.sc || 1.6});
      ctx.restore();
      break;
    }
    case 'crack': {
      ctx.save();
      ctx.globalAlpha = Math.min(1, (f.life - f.t) / 0.5) * 0.85;
      ctx.strokeStyle = '#2a1a10';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(f.x0, G + 6);
      let zi = 0;
      for (let x = f.x0; x < f.x1; x += 40) {
        ctx.lineTo(x + 20, G + (zi++ % 2 ? 16 : -4));
      }
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255,220,140,.8)';
      ctx.lineWidth = 3;
      ctx.stroke();
      glow((f.x0 + f.x1) / 2, G, Math.max(100, (f.x1 - f.x0) / 2), 'rgba(255,200,120,.6)', 0.25);
      ctx.restore();
      break;
    }
    case 'clone': {
      // 毫毛分身：分身猴在怪旁邊冒出來敲一下（半透明、小一號）
      const k2 = MAN[f.key + '_a2'] ? f.key + '_a2' : f.key;
      glow(f.x, f.y - 60, 70, 'rgba(255,210,90,.9)', 0.5 * (1 - p));
      ctx.save();
      ctx.globalAlpha = p < 0.15 ? (p / 0.15) * 0.9 : p > 0.7 ? ((1 - p) / 0.3) * 0.9 : 0.9;
      {
        const fl = f.fl || 1,
          dy = f.top
            ? p < 0.3
              ? -300 * (1 - p / 0.3) * (1 - p / 0.3)
              : -Math.sin(Math.min(1, (p - 0.3) * 3) * Math.PI) * 14
            : -Math.sin(Math.min(1, p * 2) * Math.PI) * 26;
        drawSprite(p < 0.35 ? f.key : k2, f.x, f.y, {
          sx: 0.85 * fl,
          sy: 0.85,
          dy,
          rot: f.top && p < 0.3 ? f.rt * fl * 3 : 0
        });
      }
      ctx.restore();
      break;
    }
    case 'staff': {
      // 齊天大聖：巨大金箍棒從天上砸下來
      const fall = Math.min(1, p / 0.28),
        yb = TOPY - 200 + (f.y - (TOPY - 200)) * fall * fall,
        L = 760;
      ctx.save();
      ctx.globalAlpha = p < 0.75 ? 1 : (1 - p) / 0.25;
      ctx.translate(f.x, yb);
      glow(0, -L / 2, 170, 'rgba(255,210,80,.55)', 0.9);
      if (MAN.fx_staff) {
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = p < 0.75 ? 1 : (1 - p) / 0.25;
        drawSprite('fx_staff', f.x, yb, {sx: 1.4, sy: 1.4});
      }
      ctx.restore(); // 金箍棒：從齊天神猴原圖摳下來的棒頭＋棒身，後段淡出
      if (p >= 0.28) {
        const q = (p - 0.28) / 0.72;
        ctx.save();
        ctx.globalAlpha = (1 - q) * 0.9;
        ctx.strokeStyle = '#ffd84a';
        ctx.lineWidth = 14 * (1 - q) + 3;
        ctx.beginPath();
        ctx.ellipse(f.x, f.y + 20, 600 * q + 60, 110 * q + 14, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,230,140,${0.35 * (1 - q)})`;
        ctx.fillRect(0, TOPY, VW, VH);
        ctx.restore();
      }
      break;
    }
    case 'ring':
      ctx.save();
      ctx.strokeStyle = f.c;
      ctx.globalAlpha = 1 - p;
      ctx.lineWidth = 8 * (1 - p) + 2;
      ctx.beginPath();
      ctx.ellipse(f.x, f.y + 30, f.r * ease(p), f.r * 0.3 * ease(p), 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      break;
    case 'shock':
      ctx.save();
      ctx.fillStyle = f.c;
      ctx.globalAlpha = 0.45 * (1 - p);
      ctx.beginPath();
      ctx.ellipse(f.x, f.y, 30 + p * 120, 6 + p * 24, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.6 * (1 - p);
      ctx.beginPath();
      ctx.ellipse(f.x, f.y, 18 + p * 70, 4 + p * 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      glow(f.x, f.y - 50, 90, f.c, 0.6 * (1 - p));
      break;
    case 'sweep': {
      // 劍氣月牙：實心填色、白色刀口、後面兩道殘影（W037）
      const a = 1 - Math.max(0, (p - 0.7) / 0.3);
      ctx.save();
      ctx.translate(f.x, f.y);
      for (let k = 2; k >= 0; k--) {
        ctx.save();
        ctx.translate(-k * 46, 0);
        ctx.globalAlpha = a * (k ? 0.32 / k : 1);
        crescent(0, 0, 165 - k * 10, f.c, k === 0);
        ctx.restore();
      }
      ctx.restore();
      glow(f.x - 30, f.y, 190, f.c, 0.45 * a);
      break;
    }
    case 'wave': {
      // 震地：前緣一座往前推的土浪＋噴起的石塊和煙塵（W037）
      const a = 1 - Math.max(0, (p - 0.75) / 0.25);
      ctx.save();
      ctx.globalAlpha = a;
      const gx = ctx.createLinearGradient(0, G - 130, 0, G + 8);
      gx.addColorStop(0, f.c);
      gx.addColorStop(0.45, '#a07a4a');
      gx.addColorStop(1, '#5a3a1a');
      ctx.fillStyle = gx;
      ctx.beginPath();
      ctx.moveTo(f.x - 230, G + 8);
      ctx.quadraticCurveTo(f.x - 120, G - 40, f.x - 30, G - 120);
      ctx.quadraticCurveTo(f.x + 10, G - 70, f.x + 30, G + 8);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.55)';
      ctx.beginPath();
      ctx.moveTo(f.x - 120, G - 40);
      ctx.quadraticCurveTo(f.x - 70, G - 85, f.x - 30, G - 120);
      ctx.quadraticCurveTo(f.x - 55, G - 70, f.x - 110, G - 30);
      ctx.fill();
      // 石塊：沿路一路噴起來、掉回去
      for (let i = 0; i < 9; i++) {
        const q = (f.t * 2.2 + i * 0.11) % 1,
          rx = f.x - 40 - i * 34 - q * 40,
          ry = G - 10 - Math.sin(q * Math.PI) * (70 + (i % 3) * 40),
          r = 9 + (i % 3) * 4;
        ctx.fillStyle = i % 2 ? '#6a4a2a' : '#8a6a42';
        ctx.save();
        ctx.translate(rx, ry);
        ctx.rotate(q * 5 + i);
        ctx.beginPath();
        ctx.moveTo(-r, -r * 0.4);
        ctx.lineTo(-r * 0.2, -r);
        ctx.lineTo(r, -r * 0.3);
        ctx.lineTo(r * 0.6, r * 0.8);
        ctx.lineTo(-r * 0.7, r * 0.6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = `rgba(200,180,150,${0.5 * a})`;
        ctx.beginPath();
        ctx.arc(f.x - 70 - i * 45, G - 14 - (i % 2) * 14, 22 + i * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      glow(f.x - 40, G - 40, 140, f.c, 0.55 * a);
      break;
    }
    case 'rainp': {
      if (f.t < f.delay) break;
      const q = Math.min(1, (f.t - f.delay) / (f.life - f.delay));
      const x = f.x + (f.tx - f.x) * q,
        y = f.y + (f.ty - f.y) * q;
      const ang = Math.atan2(f.ty - f.y, f.tx - f.x);
      if (RAINSPR[f.rk] && MAN[RAINSPR[f.rk]]) {
        glow(x, y, 34, f.c, 0.6);
        drawSprite(RAINSPR[f.rk], x, y, {rot: ang, sx: 1.6, sy: 1.6});
      } else if (f.rk === 'arrow' || f.rk === 'harpoon') {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-40, 0);
        ctx.lineTo(10, 0);
        ctx.stroke();
        ctx.fillStyle = f.c;
        ctx.beginPath();
        ctx.moveTo(18, 0);
        ctx.lineTo(4, -7);
        ctx.lineTo(4, 7);
        ctx.fill();
        ctx.restore();
        glow(x, y, 30, f.c, 0.7);
      } else if (f.rk === 'star') {
        ctx.fillStyle = f.c;
        star(x, y, 16);
        glow(x, y, 40, f.c, 0.8);
      } else if (f.rk === 'bomb') {
        ctx.fillStyle = '#2a2a30';
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
        glow(x - 8, y - 8, 14, '#ffb040', 1);
      } else {
        glow(x, y, 44, f.c, 0.95);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();
        for (let i = 1; i < 5; i++) {
          ctx.globalAlpha = 0.5 / i;
          ctx.fillStyle = f.c;
          ctx.beginPath();
          ctx.arc(x - Math.cos(ang) * i * 16, y - Math.sin(ang) * i * 16, 12 - i * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      break;
    }
    case 'laser': {
      const a = p < 0.15 ? p / 0.15 : 1 - Math.max(0, (p - 0.7) / 0.3);
      const w = (18 + Math.sin(f.t * 60) * 4) * a;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const gr = ctx.createLinearGradient(0, f.y - w * 2, 0, f.y + w * 2);
      gr.addColorStop(0, 'rgba(0,0,0,0)');
      gr.addColorStop(0.5, f.c);
      gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gr;
      ctx.fillRect(f.x, f.y - w * 2, VW, w * 4);
      ctx.fillStyle = 'rgba(255,255,255,.9)';
      ctx.fillRect(f.x, f.y - w * 0.3, VW, w * 0.6);
      ctx.restore();
      // 地面打擊線
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.4 * a;
      ctx.fillStyle = f.c;
      ctx.beginPath();
      ctx.moveTo(f.x, f.y);
      ctx.lineTo(VW, G - 80);
      ctx.lineTo(VW, G - 20);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      glow(f.x, f.y, 60, f.c, a);
      break;
    }
    case 'heal': {
      // 補山門：一道光柱＋往上飄的實心綠十字和葉子（W037）
      const a = p < 0.15 ? p / 0.15 : 1 - Math.max(0, (p - 0.6) / 0.4);
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      const gr = ctx.createLinearGradient(f.x - 130, 0, f.x + 130, 0);
      gr.addColorStop(0, 'rgba(140,255,150,0)');
      gr.addColorStop(0.5, `rgba(120,240,120,${0.4 * a})`);
      gr.addColorStop(1, 'rgba(140,255,150,0)');
      ctx.fillStyle = gr;
      ctx.fillRect(f.x - 130, TOPY, 260, f.y - TOPY);
      ctx.restore();
      for (let i = 0; i < 14; i++) {
        const ph = (p * 1.4 + i / 14) % 1,
          x = f.x - 110 + ((i * 37) % 220) + Math.sin(ph * 6 + i) * 10,
          y = f.y - 20 - ph * 300,
          r = i % 3 ? 12 : 17;
        ctx.globalAlpha = a * (1 - ph * 0.7);
        if (i % 4 === 3) {
          ctx.fillStyle = '#7ad86a';
          ctx.beginPath();
          ctx.ellipse(x, y, r * 0.9, r * 0.45, ph * 4 + i, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x - r * 0.42, y - r - 3, r * 0.84, r * 2 + 6);
          ctx.fillRect(x - r - 3, y - r * 0.42, r * 2 + 6, r * 0.84);
          ctx.fillStyle = '#4ee06a';
          ctx.fillRect(x - r * 0.28, y - r, r * 0.56, r * 2);
          ctx.fillRect(x - r, y - r * 0.28, r * 2, r * 0.56);
        }
      }
      ctx.globalAlpha = 1;
      glow(f.x, f.y - 100, 170, '#8cff90', 0.5 * a);
      break;
    }
    case 'frost': {
      // 全場定身：冰晶／符咒／樹葉從天上落下（實心，W037）
      const a = 1 - Math.max(0, (p - 0.6) / 0.4);
      ctx.save();
      for (let i = 0; i < 26; i++) {
        const x = (i * 97 + f.t * 40 + Math.sin(f.t * 2 + i) * 20) % VW,
          y = TOPY + ((i * 53 + f.t * (f.fk === 'talisman' ? 200 : 300)) % VH),
          r = 7 + (i % 4) * 3;
        ctx.globalAlpha = a;
        ctx.save();
        ctx.translate(x, y);
        if (f.fk === 'talisman') {
          ctx.rotate(Math.sin(f.t * 5 + i) * 0.6);
          ctx.fillStyle = '#ffe86a';
          ctx.fillRect(-r * 0.7, -r * 1.4, r * 1.4, r * 2.8);
          ctx.fillStyle = '#d0302a';
          ctx.fillRect(-r * 0.2, -r * 1.1, r * 0.4, r * 2.2);
        } else if (f.fk === 'root') {
          ctx.rotate(f.t * 3 + i);
          ctx.fillStyle = i % 2 ? '#5ac84a' : '#8ae86a';
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 1.2, r * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.rotate(f.t * 2 + i);
          ctx.fillStyle = 'rgba(200,245,255,.95)';
          ctx.beginPath();
          ctx.moveTo(0, -r * 1.6);
          ctx.lineTo(r * 0.6, 0);
          ctx.lineTo(0, r * 1.6);
          ctx.lineTo(-r * 0.6, 0);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.moveTo(0, -r * 1.2);
          ctx.lineTo(r * 0.25, 0);
          ctx.lineTo(0, -r * 0.2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.restore();
      break;
    }
    case 'vine': {
      // 樹根纏住：地上長出三條實心藤蔓捲住怪
      const g = p < 0.25 ? ease(p / 0.25) : 1,
        a = 1 - Math.max(0, (p - 0.75) / 0.25);
      ctx.save();
      ctx.globalAlpha = a;
      for (let i = 0; i < 3; i++) {
        const ox = (i - 1) * 22,
          hgt = (60 + i * 14) * g;
        ctx.fillStyle = i === 1 ? '#3f8a2e' : '#5aa83a';
        ctx.beginPath();
        ctx.moveTo(f.x + ox - 8, G + 4);
        ctx.quadraticCurveTo(f.x + ox - 26 * (i - 1) - 20, G - hgt * 0.5, f.x + ox + 4, G - hgt);
        ctx.quadraticCurveTo(f.x + ox - 26 * (i - 1) - 6, G - hgt * 0.5, f.x + ox + 8, G + 4);
        ctx.fill();
        ctx.fillStyle = '#8ae86a';
        ctx.beginPath();
        ctx.ellipse(f.x + ox + 4, G - hgt, 8 * g, 4 * g, -0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      break;
    }
    case 'drain': {
      // 吸血：一隻小血蝙蝠叼著血珠飛回山門（W037）
      const q = ease(p);
      const x = f.x + (f.tx - f.x) * q,
        y = f.y + (f.ty - f.y) * q - Math.sin(q * Math.PI) * 80,
        fl = Math.sin(f.t * 40) * 0.6;
      glow(x, y, 26, f.c, 0.8 * (1 - p * 0.5));
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = '#5a0a1e';
      for (const sd of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(sd * 14, -14 - fl * 10, sd * 26, -4 - fl * 12);
        ctx.lineTo(sd * 20, 2);
        ctx.lineTo(sd * 14, -2);
        ctx.lineTo(sd * 8, 4);
        ctx.closePath();
        ctx.fill();
      }
      ctx.beginPath();
      ctx.ellipse(0, 0, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff2a4a';
      ctx.beginPath();
      ctx.arc(0, 12, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffd0d8';
      ctx.beginPath();
      ctx.arc(-2, 10, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }
    case 'kstar': {
      // 怪物被打倒：白色爆光＋往外噴的星星（W037）
      const q = ease(p),
        r = f.r;
      ctx.save();
      ctx.globalAlpha = 1 - p;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(f.x, f.y, (14 + 34 * q) * r * (1 - p * 0.5), 0, Math.PI * 2);
      ctx.fill();
      for (let i = 0; i < 6; i++) {
        const an = f.a0 + (i * Math.PI) / 3,
          d = (24 + 70 * q) * r;
        ctx.fillStyle = i % 2 ? '#ffe066' : '#ffffff';
        star(f.x + Math.cos(an) * d, f.y + Math.sin(an) * d * 0.8, (11 - 6 * p) * r);
      }
      ctx.restore();
      break;
    }
  }
}
