/* ---------- 換站位：點弟子，再點另一個站位 ---------- */
let pick = -1;
cv.addEventListener('pointerdown', ev => {
  const r = cv.getBoundingClientRect();
  const wx = (ev.clientX - r.left) / SC,
    wy = (ev.clientY - r.top) / SC + TOPY;
  const i = (L.spots || []).findIndex(([x, y]) => Math.abs(wx - x) < 60 && wy > y - 160 && wy < y + 20);
  if (i < 0) {
    if (pick >= 0) {
      pick = -1;
    }
    return;
  }
  if (pick < 0) {
    if (i < B.heroes.length) {
      pick = i;
      toast('再點一個站位，兩個人交換位置');
    }
    return;
  }
  if (i === pick) {
    pick = -1;
    return;
  }
  const t = S.team;
  if (i < t.length) {
    [t[pick], t[i]] = [t[i], t[pick]];
  } else {
    t.push(t.splice(pick, 1)[0]);
  }
  pick = -1;
  refreshField();
  toast('換好位置了');
});
/* ---------- 介面 ---------- */
const $ = id => document.getElementById(id);
let ultBtns = [];
function portrait(mk) {
  const m = MAN[mk],
    im = IMG[mk],
    c = document.createElement('canvas');
  c.width = c.height = 132;
  c.className = 'pt';
  if (im && !im.complete) {
    im.addEventListener(
      'load',
      () => {
        const n = portrait(mk);
        c.getContext('2d').drawImage(n, 0, 0);
      },
      {once: true}
    );
    return c;
  }
  const base = MAN['c_' + mk.split('_')[1] + '_1'] || m;
  const bh = base[1];
  const top = Math.max(0, m[3] - base[3]);
  const sz = bh * 0.38,
    sy = top + bh * 0.19;
  let cx = m[2];
  try {
    const t = document.createElement('canvas');
    t.width = m[0];
    t.height = Math.ceil(bh * 0.4);
    const g = t.getContext('2d');
    g.drawImage(im, 0, -top - bh * 0.15);
    const d = g.getImageData(0, 0, t.width, t.height).data;
    let sx = 0,
      n = 0;
    for (let y = 0; y < t.height; y += 3)
      for (let x = 0; x < t.width; x += 2) {
        if (d[(y * t.width + x) * 4 + 3] > 128) {
          sx += x;
          n++;
        }
      }
    if (n) cx = sx / n;
  } catch (e) {}
  const x0 = Math.max(-sz * 0.1, Math.min(m[0] - sz * 0.9, cx - sz / 2 + sz * 0.16));
  const g = c.getContext('2d');
  g.imageSmoothingQuality = 'high';
  g.drawImage(im, x0, sy, sz, sz, 0, 0, 132, 132);
  return c;
}
function buildUlts() {
  const u = $('ults');
  u.innerHTML = '';
  ultBtns = B.heroes.map((h, i) => {
    const b = document.createElement('button');
    b.className = 'ult';
    const mk = myKey(h.id);
    b.title = CH[h.id].n;
    b.appendChild(portrait(mk));
    b.insertAdjacentHTML('beforeend', '<div class="fill"></div><div class="cdt"></div>');
    b.style.borderColor = '';
    b.addEventListener('pointerdown', ev => {
      ev.preventDefault();
      castUlt(i);
    });
    const w = document.createElement('div');
    w.className = 'ultw';
    const a = document.createElement('button');
    a.className = 'auto';
    const upd = () => {
      const on = !!(S.auto && S.auto[h.id]);
      a.textContent = on ? '自動' : '手動';
      a.classList.toggle('on', on);
    };
    upd();
    a.addEventListener('pointerdown', ev => {
      ev.preventDefault();
      ev.stopPropagation();
      S.auto = S.auto || {};
      S.auto[h.id] = !S.auto[h.id];
      upd();
      persist();
      toast(`${CH[h.id].n} 大招：${S.auto[h.id] ? '自動放' : '點了才放'}`);
    });
    w.appendChild(b);
    w.insertAdjacentHTML('beforeend', '<i class="ring"></i>');
    w.appendChild(a);
    u.appendChild(w);
    return b;
  });
  bBtns = B.beasts.map((bs, i) => {
    const b = document.createElement('button');
    b.className = 'ult beast';
    b.title = BULT[bs.k].n;
    const im = document.createElement('img');
    im.src = SRC['b_' + bs.k];
    im.className = 'pt';
    im.style.objectFit = 'cover';
    im.style.objectPosition = '35% 20%';
    b.appendChild(im);
    b.insertAdjacentHTML('beforeend', '<div class="fill"></div>');
    b.addEventListener('pointerdown', ev => {
      ev.preventDefault();
      castBeast(i);
    });
    const w = document.createElement('div');
    w.className = 'ultw';
    const a = document.createElement('button');
    a.className = 'auto';
    const key = 'b_' + bs.k;
    const upd = () => {
      const on = !!(S.auto && S.auto[key]);
      a.textContent = on ? '自動' : '手動';
      a.classList.toggle('on', on);
    };
    upd();
    a.addEventListener('pointerdown', ev => {
      ev.preventDefault();
      ev.stopPropagation();
      S.auto = S.auto || {};
      S.auto[key] = !S.auto[key];
      upd();
      persist();
      toast(`${BEAST[bs.k].n} 大招：${S.auto[key] ? '自動放' : '點了才放'}`);
    });
    w.appendChild(b);
    w.insertAdjacentHTML('beforeend', '<i class="ring"></i>');
    w.appendChild(a);
    u.appendChild(w);
    return b;
  });
}
let bBtns = [];
let lastLive = 0;
const DPSC = {
  h: '#ffb84a',
  u: '#ff6ad0',
  fb: '#c08aff',
  b: '#7ad8ff',
  a: '#c08aff',
  t: '#8ad86a',
  seal: '#ffb060',
  burn: '#ff6a3a',
  hpboom: '#ff8a3d',
  cb: '#ffcf6a',
  etc: '#aaaaaa'
};
function dpsName(k) {
  const [t, id] = k.split(':');
  if (t === 'h') return CH[id] ? CH[id].n : id;
  if (t === 'fb') return '法寶 ' + (FB[id] ? FB[id].n : id);
  if (t === 'u') return (CH[id] ? CH[id].n : id) + '・大招';
  if (t === 'b') return '神獸 ' + (BEAST[id] ? BEAST[id].n : id);
  if (t === 'x') return '凶獸 ' + (XB[id] ? XB[id].n : id);
  if (t === 'a') return ARR[id] ? ARR[id].n : id;
  if (t === 't') return TUR[id] ? TUR[id].n : id;
  return (
    {seal: '天雷・大印', burn: '燃燒', hpboom: '狐火燎原（怪物血量 %）', etc: '其他', 'cb:mecha': '合擊・天機艦砲'}[
      k
    ] || k
  );
}
let dpsOn = true;
try {
  dpsOn = localStorage.getItem('idle-td-dps') !== '0';
} catch (e) {}
let dpsLast = 0,
  dpsMode = 'sum';
try {
  dpsMode = localStorage.getItem('idle-td-dpsm') || 'sum';
} catch (e) {}
const DPSM = [
  ['sum', '合計'],
  ['n', '普攻'],
  ['u', '大招'],
  ['o', '其他'],
  ['all', '分開']
];
function renderDps() {
  const el = $('dps');
  if (!el || !B.dmg) return;
  const now = performance.now();
  if (now - dpsLast < 500) return;
  dpsLast = now;
  el.classList.toggle('min', !dpsOn);
  const t = Math.max(1, B.dmgT || 0);
  let src = Object.entries(B.dmg);
  if (dpsMode === 'sum') {
    const m = {};
    src.forEach(([k, v]) => {
      const kk = k.startsWith('u:') ? 'h:' + k.slice(2) : k;
      m[kk] = (m[kk] || 0) + v;
    });
    src = Object.entries(m);
  } else if (dpsMode === 'n') src = src.filter(([k]) => k.startsWith('h:'));
  else if (dpsMode === 'o') src = src.filter(([k]) => !k.startsWith('h:') && !k.startsWith('u:'));
  else if (dpsMode === 'u') src = src.filter(([k]) => k.startsWith('u:'));
  const rows = src.filter(r => r[1] > 0).sort((a, b) => b[1] - a[1]),
    tot = rows.reduce((a, r) => a + r[1], 0),
    top = rows.length ? rows[0][1] : 1,
    n = innerHeight < 520 ? 6 : 10;
  let h = `<h4><span data-dt="1">${dpsOn ? '▾' : '▸'} DPS</span><span>　${fmt(tot / t)}</span></h4>`;
  if (dpsOn)
    h += `<div class="dm">${DPSM.map(([k, n]) => `<b data-dm="${k}" class="${dpsMode === k ? 'on' : ''}">${n}</b>`).join('')}</div>`;
  for (const [k, v] of rows.slice(0, n)) {
    const c = DPSC[k.split(':')[0]] || DPSC.etc;
    h += `<div class="r"><i style="width:${((v / top) * 100).toFixed(1)}%;background:${c}"></i><span>${dpsName(k)}</span><b>${fmt(v / t)}　${Math.round((v / tot) * 100)}%</b></div>`;
  }
  if (!rows.length) h += '<div class="e" style="opacity:.7">還沒打到怪</div>';
  el.innerHTML = h;
}
function updLive() {
  const done = B.killed,
    tot = B.total || 1;
  $('waveBar').style.width = Math.min(100, (done / tot) * 100) + '%';
  $('gateBar').style.width = (B.gateHp / B.gateMax) * 100 + '%';
  $('gateHpT').textContent = `${fmt(B.gateHp)}/${fmt(B.gateMax)}`;
  $('gateBox').classList.toggle('low', B.gateHp < B.gateMax * 0.35);
  if (B.boss && !B.boss.dead) $('bossHp').style.width = Math.max(0, (B.boss.hp / B.boss.max) * 100) + '%';
  B.heroes.forEach((h, i) => {
    const b = ultBtns[i];
    if (!b) return;
    b.querySelector('.fill').style.height = 100 - h.charge + '%';
    {
      const c = b.querySelector('.cdt'),
        t = h.ucd > 0 ? String(Math.ceil(h.ucd)) : h.id === 'archer' && B.focusT > 1 ? '瞳' : '';
      if (c && c.textContent !== t) c.textContent = t;
    }
    b.classList.toggle('ready', h.charge >= 100 && !(h.ucd > 0) && !(h.id === 'archer' && B.focusT > 1));
  });
  B.beasts.forEach((h, i) => {
    const b = bBtns[i];
    if (!b) return;
    b.querySelector('.fill').style.height = 100 - h.charge + '%';
    b.classList.toggle('ready', h.charge >= 100);
  });
  const now = performance.now();
  if (now - lastLive > 400) {
    lastLive = now;
    $('coinT').textContent = fmt(S.coin);
    $('gemT').textContent = fmt(S.gem);
    $('stoneT').textContent = fmt(S.stone);
    $('bHero').classList.toggle('on', canUpgradeAny());
    $('bGacha').classList.toggle('on', S.gem >= 10);
    $('bGate').classList.toggle('on', S.stone >= gateCost(S.gateLv));
  }
}
// 全隊 BUFF 列：有時間的顯示剩幾秒，常駐的不顯示秒數
let buffLast = '';
function renderBuffs() {
  const L2 = [],
    sec = t => `｜${Math.ceil(t)} 秒`;
  const M = PS.mx || {};
  if (B.buff > 0) {
    const v = cbOn('alchemist') && (B.drmT > 0 || B.drumT > 0) ? 300 : PS.r10 && PS.r10.alchemist ? 100 : 30;
    L2.push([M.alchemist ? '仙丹爐火' : '攻擊加成', `攻擊 +${v}%` + (M.alchemist ? '' : sec(B.buff)), '#ffd84a']);
  }
  if (B.focusT > 0) L2.push(['鷹眼星瞳', '星弓爆擊 +50%、爆傷 ×4' + sec(B.focusT), '#9dffb0']);
  if (B.ovT > 0) L2.push(['超載核心', '大招傷害 ×2' + sec(B.ovT), '#59c8ff']);
  if (B.mechT > 0) L2.push(['天機全開', '全隊傷害 ×1.5' + sec(B.mechT), '#59c8ff']);
  if (B.drumT > 0) L2.push(['激昂鼓點', '攻速 +30%' + sec(B.drumT), '#ff7a5a']);
  if (B.genT > 0) L2.push(['將軍號令', '近戰・坦克攻擊 ×1.5' + sec(B.genT), '#ffb04a']);
  if (B.mbT > 0) L2.push(['月光加持', '全隊攻擊 +30%' + sec(B.mbT), '#e6dcff']);
  if (B.gmaT > 0) L2.push(['滿漢全席', '攻速 +40%' + sec(B.gmaT), '#ffb07a']);
  if (B.drmT > 0) L2.push(['戰鼓震天', '攻速 +50%' + sec(B.drmT), '#ff7a5a']);
  if (B.vamT > 0) L2.push(['血月', '吸血鬼攻速 ×2' + sec(B.vamT), '#d03050']);
  if (B.crush && B.state === 'run') L2.push(['碾壓', '太強了，怪一出來就秒殺', '#ff9a1e']);
  if (B.shield > 0) L2.push(['護盾', '山門不受傷' + sec(B.shield), '#8fe0ff']);
  if (M.mummy && B.gateHp < B.gateMax * 0.3) L2.push(['千年怨念', '攻擊 +50%', '#f0e2b0']);
  const h = L2.map(([n, d, c]) => {
    const m = d.match(/｜(\d+) 秒/),
      ch = BUFCH[n] || n[0];
    return `<button class="bi" style="--bc:${c}" data-n="${n}" data-d="${d.replace(/｜(\d+) 秒/, '（剩 $1 秒）')}">${ch}${m ? `<i>${m[1]}</i>` : ''}</button>`;
  }).join('');
  if (h !== buffLast) {
    buffLast = h;
    $('buffs').innerHTML = h;
  }
}
// BUFF 圖示：先用一個字，點一下看說明
const BUFCH = {
  '仙丹爐火': '丹',
  '攻擊加成': '攻',
  '鷹眼星瞳': '瞳',
  '超載核心': '載',
  '天機全開': '機',
  '激昂鼓點': '鼓',
  '將軍號令': '令',
  '月光加持': '月',
  '滿漢全席': '宴',
  '戰鼓震天': '戰',
  '血月': '血',
  '碾壓': '碾',
  '護盾': '盾',
  '千年怨念': '怨'
};
let bufTipT = 0;
setTimeout(() => {
  const bb = $('buffs');
  if (bb)
    bb.addEventListener('pointerdown', ev => {
      const t = ev.target.closest('.bi');
      if (!t) return;
      ev.preventDefault();
      ev.stopPropagation();
      const tp = $('bufTip');
      tp.style.setProperty('--bc', t.style.getPropertyValue('--bc'));
      tp.innerHTML = `<b>${t.dataset.n}</b>　${t.dataset.d}`;
      tp.style.display = 'block';
      clearTimeout(bufTipT);
      bufTipT = setTimeout(() => (tp.style.display = 'none'), 2500);
    });
}, 0);
function updFarm() {
  const b = $('farmBtn');
  if (!b) return;
  b.className = 'farm ' + (S.farm ? 'on' : '');
  b.textContent = S.farm ? '原地刷關｜挑戰 ▶' : '一路往前 ⟳';
}
function updHud() {
  updFarm();
  $('stageT').textContent = `第 ${S.stage} 關`;
  $('gateName').textContent = `山門 Lv${S.gateLv}`;
  lastLive = 0;
}
function canUpgradeAny() {
  return S.team.some(id => S.roster[id] && S.roster[id].lv < lvCap(id) && S.coin >= lvCost(S.roster[id].lv));
}
function turUpgradable() {
  return Object.keys(S.tur).some(k => S.coin >= turCost(S.tur[k].lv) * 3);
}
function banner(t, boss) {
  const b = $('banner');
  b.textContent = t;
  b.classList.toggle('boss', !!boss);
  b.classList.remove('show');
  void b.offsetWidth;
  b.classList.add('show');
}
let toastT;
function toast(t) {
  const e = $('toast');
  e.textContent = t;
  e.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => e.classList.remove('show'), 2600);
}
$('spdBtn').onclick = () => {
  B.speed = B.speed >= 3 ? 1 : B.speed + 1;
  $('spdBtn').textContent = B.speed + '×';
};
