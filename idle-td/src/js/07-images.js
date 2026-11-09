/* ---------- 圖片 ---------- */
// 省記憶體：角色圖（c_）和大招圖（ult_）一共 400 多張，解開後要 150MB 以上，只先載上陣弟子的；其他用到時才載（IMG 取不到就自動開始載）
const IMG0 = {},
  IMG = new Proxy(IMG0, {
    get(t, k) {
      if (k in t || typeof k !== 'string' || !SRC[k]) return t[k];
      const i = new Image();
      i.decoding = 'async';
      i.src = SRC[k];
      t[k] = i;
      return i;
    }
  });
const lazyKey = k => k.startsWith('c_') || k.startsWith('ult_');
function teamKeys() {
  const o = [];
  for (const id of S.team || []) {
    if (!S.roster[id]) continue;
    const b = myKey(id);
    o.push(b, b + '_a1', b + '_a2', b + '_a3');
    const u = ULTFX[id];
    if (u) for (const k in SRC) if (k.startsWith(u + '_')) o.push(k);
  }
  return o.filter(k => SRC[k]);
}
function loadAll() {
  const tk = new Set(teamKeys());
  const keys = Object.keys(SRC).filter(k => !lazyKey(k) || tk.has(k));
  let done = 0;
  const bar = document.getElementById('ldbar');
  return Promise.all(
    keys.map(
      k =>
        new Promise(res => {
          const i = new Image();
          i.onload = i.onerror = () => {
            done++;
            bar.style.width = (done / keys.length) * 100 + '%';
            res();
          };
          i.src = SRC[k];
          IMG0[k] = i;
        })
    )
  );
}
const charImg = (id, t) => SRC[t ? `c_${id}_${t}` : S.roster[id] ? myKey(id) : `c_${id}_1`];

/* ---------- 畫布 ---------- */
const cv = document.getElementById('cv'),
  ctx = cv.getContext('2d');
const G = 860,
  MINW = 1750,
  MINH = 820;
let ZM = +pref.get('idle-td-zoom') || 1; // 縮小試玩：整個戰場鏡頭拉遠 ×1.5
if (ZM > 1) ZM = 1.5;
let DPR = 1,
  SC = 1,
  VW = 1536,
  VH = 694,
  TOPY = 330,
  CW = 0,
  CH_ = 0;
function resize() {
  DPR = Math.min(2, window.devicePixelRatio || 1);
  CW = innerWidth;
  CH_ = innerHeight;
  cv.width = Math.round(CW * DPR);
  cv.height = Math.round(CH_ * DPR);
  SC = Math.min(CW / (MINW * ZM), CH_ / (MINH * ZM));
  VW = CW / SC;
  VH = CH_ / SC;
  TOPY = 1024 - VH;
  layout();
}
addEventListener('resize', resize);
