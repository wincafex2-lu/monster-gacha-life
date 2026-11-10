/* 召喚 */
let lastPulls = [];
/* 系列池：抽到傳說時 70% 是這個系列的（傳說機率、保底不變） */
const SERIES = {
  all: {n: '一般池', d: '全部傳說機會一樣'},
  front: {n: '前排系列', d: '近戰・坦克傳說', f: i => ['melee', 'tank'].includes(CH[i].role)},
  back: {n: '後排系列', d: '遠程・法術・輔助傳說', f: i => !['melee', 'tank'].includes(CH[i].role)},
  fengshen: {n: '封神系列', d: '楊戩・哪吒・敖丙', f: i => !!CH[i].fs, lock: 'fengshen'}
};
const SER_UP = 0.7,
  serIds = k => (SERIES[k] && SERIES[k].f ? lPool().filter(SERIES[k].f) : lPool());
function rollOne() {
  S.pull++;
  S.pityR++;
  S.pityE = (S.pityE || 0) + 1;
  S.pityL++;
  let r;
  const x = Math.random();
  if (S.pityL >= 60 || x < 0.02) r = 'L';
  else if (S.pityE >= 30 || x < 0.08) r = 'E';
  else if (S.pityR >= 10 || x < 0.32) r = 'R';
  else r = 'N';
  if (r === 'L') {
    S.pityL = 0;
    S.pityE = 0;
    S.pityR = 0;
  } else if (r === 'E') {
    S.pityE = 0;
    S.pityR = 0;
  } else if (r === 'R') S.pityR = 0;
  if (S.firstGacha && lastPulls.length === 0 && r === 'N' && S.pull === 1) {
    r = 'R';
    S.pityR = 0;
  }
  let pool = r === 'L' ? lPool() : POOL[r];
  if (r === 'L' && S.gser && S.gser !== 'all' && Math.random() < SER_UP) pool = serIds(S.gser);
  const id = pool[Math.floor(Math.random() * pool.length)];
  return grantHero(id);
}
function grantHero(id) {
  let isNew = false,
    sh = 0;
  if (!S.roster[id]) {
    S.roster[id] = {lv: 1, tier: 1, dup: 0};
    isNew = true;
    if (S.team.length < slots()) {
      S.team.push(id);
    }
  } else {
    const rr = S.roster[id];
    if (rr.tier >= CH[id].t) {
      const v = SHV[CH[id].r] || 1;
      if ((rr.brk || 0) < BRK_MAX) {
        rr.brk = (rr.brk || 0) + 1;
        sh = v;
      } else sh = v * 2;
      S.shard = (S.shard || 0) + sh;
    } else rr.dup++;
  }
  return {id, isNew, sh};
}
function gpOne() {
  S.gpull++;
  const g = GP[Math.floor(Math.random() * GP.length)];
  let isNew = false,
    res = '';
  const box = g.type === 'tur' ? S.tur : S.arr;
  if (!box[g.k]) {
    box[g.k] = {lv: 1};
    isNew = true;
    if (g.type === 'tur') {
      if (S.turTeam.length < turSlots()) S.turTeam.push(g.k);
    } else if (ARR[g.k].t === 'a') {
      if (!S.arrA) S.arrA = g.k;
    } else if (!S.arrD && S.gateLv >= 5) S.arrD = g.k;
  } else {
    const o = box[g.k];
    if (g.type === 'arr' && ARR[g.k].t === 'd') {
      o.lv += 3;
      res = 'Lv+3';
    } else if ((o.brk || 0) < BRK_MAX) {
      o.brk = (o.brk || 0) + 1;
      res = '突破+1';
    } else {
      const c = Math.round(turCost(o.lv) * 3);
      S.coin += c;
      res = '銅錢';
    }
  }
  return {...g, isNew, res};
}
// 神獸召喚：每抽隨機一隻神獸的碎片 1～10 片（少的常出），1% 整隻（已有就換 50 片），每 10 抽保底一次 8 片以上
function bpOne() {
  S.bpull = (S.bpull || 0) + 1;
  S.bpity = (S.bpity || 0) + 1;
  const ks = (BSER[S.bser] || BSER.sishen).ks.filter(x => BEAST[x]),
    k = ks[Math.floor(Math.random() * ks.length)];
  if (Math.random() < 0.01) {
    if (!S.beast[k]) {
      S.beast[k] = {st: 1};
      if (S.beastTeam.length < beastSlots()) S.beastTeam.push(k);
      return {bk: k, whole: 1, isNew: 1};
    }
    S.bfr[k] = (S.bfr[k] || 0) + 50;
    return {bk: k, whole: 1, n: 50};
  }
  let n;
  if (S.bpity >= 10) {
    n = 8 + Math.floor(Math.random() * 3);
  } else {
    const w = [0, 30, 20, 14, 10, 8, 6, 5, 3, 2, 2],
      t = Math.random() * 100;
    let c = 0;
    n = 1;
    for (let i = 1; i <= 10; i++) {
      c += w[i];
      if (t < c) {
        n = i;
        break;
      }
    }
  }
  if (n >= 8) S.bpity = 0;
  S.bfr[k] = (S.bfr[k] || 0) + n;
  return {bk: k, n};
}
let gTab = 'hero';
function pull(n) {
  const cost = n * 10;
  if (S.gem < cost) {
    toast('靈石不夠，過關可以拿靈石');
    return;
  }
  S.gem -= cost;
  lastPulls = [];
  for (let i = 0; i < n; i++) lastPulls.push(gTab === 'gp' ? gpOne() : gTab === 'beast' ? bpOne() : rollOne());
  SND.play(lastPulls.some(p => p.id && 'EL'.includes(CH[p.id].r)) ? 'rare' : 'gacha');
  if (gTab === 'hero') S.firstGacha = false;
  refreshField();
  renderGacha();
  updLive();
}
function gpInfo(p) {
  if (p.type === 'tur') return {img: SRC['t_' + p.k + '_1'], n: TUR[p.k].n, r: 'R'};
  return {img: SRC['i_' + p.k], n: ARR[p.k].n, r: ARR[p.k].t === 'a' ? 'E' : 'L'};
}
// 還沒抽的時候：下面空白處放這個池的傳說／神獸＋保底進度（W037）
function gachaIdle() {
  const bar = (n, cur, max, c) =>
    `<div class="gpity"><span>${n}</span><i><b style="width:${Math.min(100, (cur / max) * 100)}%;background:${c}"></b></i><em>${max - cur} 次內必出</em></div>`;
  let cards = '',
    t = '';
  if (gTab === 'hero') {
    const ids = serIds(S.gser || 'all');
    t = (S.gser && S.gser !== 'all' ? SERIES[S.gser].n : '一般池') + '的傳說弟子';
    cards = ids
      .map(
        id =>
          `<div class="card L ${S.roster[id] ? '' : 'lock'}"><img src="${charImg(id)}" alt=""><span class="cn">${CH[id].n}</span></div>`
      )
      .join('');
    return `<div class="gidle"><div class="gt">${t}<small>（灰色＝還沒有）</small></div><div class="pulls">${cards}</div>${bar('稀有以上', S.pityR || 0, 10, '#3b7fe0')}${bar('史詩以上', S.pityE || 0, 30, '#8a4ad8')}${bar('傳說', S.pityL || 0, 60, '#e0a020')}</div>`;
  }
  if (gTab === 'beast') {
    const ks = BSER[S.bser || 'sishen'].ks;
    cards = ks
      .map(
        k =>
          `<div class="card E ${S.beast[k] ? '' : 'lock'}"><img src="${SRC['b_' + k]}" alt="" style="height:58%;bottom:24%"><span class="cn">${BEAST[k].n}</span></div>`
      )
      .join('');
    return `<div class="gidle"><div class="gt">這個系列的神獸<small>（灰色＝還沒合成）</small></div><div class="pulls">${cards}</div></div>`;
  }
  cards = GP.map(p => {
    const g = gpInfo(p);
    return `<div class="card ${g.r} ${S.arr[p.k] ? '' : 'lock'}"><img src="${g.img}" alt="" style="height:52%;bottom:26%"><span class="cn">${g.n}</span></div>`;
  }).join('');
  return `<div class="gidle"><div class="gt">可以抽到的陣法<small>（灰色＝還沒有）</small></div><div class="pulls">${cards}</div></div>`;
}
function renderGacha() {
  $('shTitle').textContent = '召喚';
  $('shTabs').innerHTML =
    `<button class="btn ${gTab === 'hero' ? 'on' : ''}" data-gt="hero">弟子</button><button class="btn ${gTab === 'gp' ? 'on' : ''}" data-gt="gp">陣法</button>${S.best >= 10 || Object.keys(S.beast).length ? `<button class="btn ${gTab === 'beast' ? 'on' : ''}" data-gt="beast">神獸</button>` : ''}`;
  $('shTabs')
    .querySelectorAll('[data-gt]')
    .forEach(
      b =>
        (b.onclick = () => {
          if (gTab !== b.dataset.gt) {
            gTab = b.dataset.gt;
            lastPulls = [];
          }
          renderGacha();
        })
    );
  let h = `<div class="gacha altar"><div class="row" style="justify-content:center"><button class="btn gold" id="g1">召喚 1 次 <span class="cost"><span class="ico gem"></span>10</span></button><button class="btn gold" id="g10">召喚 10 次 <span class="cost"><span class="ico gem"></span>100</span></button></div>`;
  if (gTab === 'hero') {
    const g = S.gser || 'all';
    h +=
      `<div class="row" style="justify-content:center;gap:6px;margin:6px 0;flex-wrap:wrap">${Object.entries(SERIES)
        .filter(([k, v]) => !v.lock || unl(v.lock))
        .map(
          ([k, v]) =>
            `<button class="btn ${g === k ? 'blue' : ''}" data-ser="${k}" style="padding:3px 12px">${v.n}<span style="font-size:11px;opacity:.75;display:block">${v.d}</span></button>`
        )
        .join('')}</div>` +
      (g !== 'all'
        ? `<div class="rates" style="margin-bottom:6px"><b>${SERIES[g].n}</b>：抽到傳說時，有 ${SER_UP * 100}% 一定是 ${serIds(
            g
          )
            .map(i => CH[i].n)
            .join('、')} 其中一位（傳說機率和保底跟一般池一樣）</div>`
        : '');
  }
  if (gTab === 'hero')
    h += `<div class="rates">普通 68%　稀有 24%　史詩 6%　傳說 2%｜再 ${10 - S.pityR} 次必出稀有以上、${30 - (S.pityE || 0)} 次必出史詩以上、${60 - S.pityL} 次必出傳說<br>抽到已經有的弟子 → 累積起來升階：普通 6／15 隻、稀有 3／8 隻、史詩 2／5 隻、傳說每階 1 隻<br>滿階之後再抽到 → 突破，每次攻擊 普通 +3%／稀有 +5%／史詩 +8%／傳說 +15%（最多 50 次），另外給傳說碎片</div>`;
  else if (gTab === 'beast') {
    const bs = S.bser || 'sishen';
    h += `<div class="row" style="justify-content:center;gap:6px;margin:6px 0">${Object.entries(BSER)
      .filter(([k]) => k !== 'shanhai' || unl('shanhai'))
      .map(
        ([k, v]) =>
          `<button class="btn ${bs === k ? 'blue' : ''}" data-bser="${k}" ${v.ks.length ? '' : 'disabled'} style="padding:3px 12px">${v.n}系列${v.ks.length ? '' : '<span style="font-size:11px;display:block">即將開放</span>'}</button>`
      )
      .join('')}</div>`;
    h += `<div class="rates">每抽隨機一隻神獸的碎片 1～10 片（1 片 30%、2 片 20%……10 片 2%），1% 直接抽到整隻（已經有就換 50 片）｜再 ${10 - (S.bpity || 0)} 次保底 8 片以上<br>100 片合成神獸；之後用碎片升星（最多 30 星）：1～5 星光環變強、2～5 星開附加效果，6～15 星附加效果升級，16 星起大招升級<br>${BSER[bs].ks.map(k => `${BEAST[k].n} ${S.beast[k] ? bSt(k) + '星' : '未合成'}・碎片 ${S.bfr[k] || 0}`).join('　')}</div>`;
  } else {
    const own = Object.keys(S.arr).length;
    h += `<div class="rates">可以抽到 6 種攻擊陣、6 種防禦陣（已有 ${own}/${GP.length}），每種機會一樣<br>抽到重複的攻擊陣 → 突破，攻擊 +5%（最多 50 次）；重複的防禦陣 → 直接 +3 級<br>防禦陣鋪在樓閣下，山門 Lv5 開放</div>`;
  }
  if (gTab === 'hero') {
    const sh = S.shard || 0;
    h += `<div class="rates" style="margin-top:6px"><b>傳說碎片 ${sh}/${SHARD_COST}</b>（滿階後抽到重複：普通 1、稀有 2、史詩 4、傳說 10 片；突破滿了給 2 倍。可以換傳說，也可以給滿階傳說升紅星）<br>${lPool()
      .map(
        k =>
          `<button class="btn ${sh >= SHARD_COST ? 'gold' : ''}" data-shard="${k}" ${sh >= SHARD_COST ? '' : 'disabled'} style="margin:3px">換 ${CH[k].n}</button>`
      )
      .join('')}</div>`;
  }
  h += '<div class="pulls">';
  lastPulls.forEach((p, i) => {
    if (p.id) {
      const d = CH[p.id];
      h += `<div class="card ${d.r}" style="--d:${i * 0.08}s"><img src="${charImg(p.id, 1)}" alt="">${p.isNew ? '<span class="new">新！</span>' : p.sh ? `<span class="new" style="background:#8a4ad8">+${p.sh} 碎片</span>` : ''}<span class="cn">${d.n}</span></div>`;
    } else if (p.bk) {
      const d = BEAST[p.bk];
      h += `<div class="card ${p.whole ? 'L' : 'E'}" style="--d:${i * 0.08}s"><img src="${SRC['b_' + p.bk]}" alt="" style="height:58%;bottom:24%">${p.isNew ? '<span class="new">整隻！</span>' : `<span class="new" style="background:${p.whole ? '#e0a020' : '#8a4ad8'}">+${p.n} 片</span>`}<span class="cn">${d.n}</span></div>`;
    } else {
      const g = gpInfo(p);
      h += `<div class="card ${g.r}" style="--d:${i * 0.08}s"><img src="${g.img}" alt="" style="height:52%;bottom:26%">${p.isNew ? '<span class="new">新！</span>' : `<span class="new" style="background:#3b7fe0">${p.res}</span>`}<span class="cn">${g.n}</span></div>`;
    }
  });
  h += '</div>';
  if (!lastPulls.length) h += gachaIdle();
  h += '</div>';
  $('shBody').innerHTML = h;
  $('g1').onclick = () => pull(1);
  $('shBody')
    .querySelectorAll('[data-bser]')
    .forEach(
      b =>
        (b.onclick = () => {
          S.bser = b.dataset.bser;
          lastPulls = [];
          persist();
          renderGacha();
        })
    );
  $('shBody')
    .querySelectorAll('[data-ser]')
    .forEach(
      b =>
        (b.onclick = () => {
          S.gser = b.dataset.ser;
          persist();
          renderGacha();
        })
    );
  $('g10').onclick = () => pull(10);
  $('shBody')
    .querySelectorAll('[data-shard]')
    .forEach(
      b =>
        (b.onclick = () => {
          if ((S.shard || 0) < SHARD_COST) return;
          S.shard -= SHARD_COST;
          const r = grantHero(b.dataset.shard);
          lastPulls = [r];
          SND.play('rare');
          toast(r.isNew ? `${CH[r.id].n} 加入山門！` : `${CH[r.id].n} +1（可以升階）`);
          refreshField();
          persist();
          renderGacha();
        })
    );
}
