// 新舊版對照測試：亂數、時間、計時器都固定住，同一套劇本跑兩個版本，比對每個檢查點
// （存檔 S、戰場 B、畫面像素、面板內容）。重構（不改玩法）之後跑這個，要全部一樣才算過。
//
// 用法（在 idle-td/ 底下）：
//   python3 tools/build.py && node tools/check.js            舊版 = git HEAD 的 index.html，新版 = 目前的 index.html
//   node tools/check.js <git 版本>                           舊版改用那個版本的 index.html
//   node tools/check.js <git 版本> --self                    只跑舊版兩次，確認測試本身每次結果都一樣
// 需要 Playwright（雲端機器已裝好）。
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const { execSync } = require('child_process');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const SELF = args.includes('--self');
const REF = args.find(a => !a.startsWith('--')) || 'HEAD';
const pages = {
  'a.html': execSync(`git show ${REF}:idle-td/index.html`, { cwd: ROOT, maxBuffer: 1 << 28 }),
  'b.html': fs.readFileSync(path.join(ROOT, 'index.html')),
};
if (SELF) pages['b.html'] = pages['a.html'];

const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json', '.html': 'text/html; charset=utf-8' };
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '');
  if (pages[u]) { res.writeHead(200, { 'content-type': MIME['.html'] }); return res.end(pages[u]); }
  const f = path.join(ROOT, u);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});

// 固定亂數（mulberry32）、假時鐘、假計時器、手動推進 requestAnimationFrame
const FAKE_ENV = `(() => {
  let seed = 20261109;
  Math.random = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  let T = 0, nid = 1; const q = new Map(); const BASE = 1793000000000;
  performance.now = () => T;
  const RD = Date;
  window.Date = class extends RD { constructor(...a) { a.length ? super(...a) : super(BASE + T); } static now() { return BASE + T; } };
  window.setTimeout = (f, ms, ...a) => { const i = nid++; q.set(i, { t: T + (+ms || 0), f, a }); return i; };
  window.setInterval = (f, ms, ...a) => { const i = nid++; q.set(i, { t: T + (+ms || 0), f, a, rep: Math.max(1, +ms || 0) }); return i; };
  window.clearTimeout = window.clearInterval = i => q.delete(i);
  let raf = null; window.requestAnimationFrame = cb => { raf = cb; return 1; }; window.cancelAnimationFrame = () => { raf = null; };
  window.__adv = ms => { const end = T + ms;
    for (;;) { let bi = 0, b = null; for (const [i, x] of q) if (x.t <= end && (!b || x.t < b.t || (x.t === b.t && i < bi))) { b = x; bi = i; }
      if (!b) break; T = b.t; if (b.rep) b.t += b.rep; else q.delete(bi); try { b.f(...b.a); } catch (e) { (window.__errs = window.__errs || []).push('timer: ' + e.message); } }
    T = end; };
  window.__tick = (n, ms) => { for (let k = 0; k < n; k++) { window.__adv(ms); const cb = raf; raf = null; if (cb) cb(T); } };
  window.__errs = [];
  addEventListener('error', e => window.__errs.push(String(e.message)));
})();`;

// 在頁面裡把戰場 B 轉成文字（跳過循環參照、函式、DOM、圖片）
const SNAP = `(() => {
  const seen = new WeakSet();
  const rep = (k, v) => { if (typeof v === 'function') return '[fn]';
    if (v && typeof v === 'object') { if (v instanceof Node) return '[node]'; if (v instanceof HTMLImageElement) return '[img]';
      if (seen.has(v)) return '[cyc]'; seen.add(v); }
    if (typeof v === 'number' && !isFinite(v)) return String(v); return v; };
  const txt = id => { const e = document.getElementById(id); return e ? e.innerText : ''; };
  return { S: JSON.stringify(S), B: JSON.stringify(B, rep), hud: ['stageT','gateHpT','coinT','gemT','stoneT','buffs','ults','dps'].map(txt).join('|'),
    errs: window.__errs.splice(0),
    info: '第' + S.stage + '關 最高' + S.best + ' 弟子' + Object.keys(S.roster).length + '隻 上陣' + S.team.length + ' 神獸' + Object.keys(S.beast).length +
      ' 飛升' + (S.asc || 0) + ' 場上怪' + B.enemies.filter(e => !e.dead).length + ' ' + B.state + (B.xf ? ' 凶獸戰' : '') };
})()`;

async function boot(page, file, save, prefs) {
  await page.goto(`http://127.0.0.1:${server.address().port}/blank`).catch(() => {});
  await page.evaluate(([s, p]) => { localStorage.clear(); localStorage.setItem('idle-td-snd2', '{"m":0,"s":0}'); if (s) localStorage.setItem('idle-td-save-v1', s);
    for (const k in p || {}) localStorage.setItem(k, p[k]); }, [save, prefs]);
  await page.goto(`http://127.0.0.1:${server.address().port}/${file}`);
  await page.waitForFunction(() => document.getElementById('loading').style.display === 'none', null, { timeout: 120000 });
  // 所有圖先載完，畫面才不會因為載入快慢不同而不一樣
  await page.evaluate(() => Promise.all(Object.keys(SRC).map(k => { const i = IMG[k]; return i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }); })));
  await page.evaluate(() => { if (giftOpen) { document.getElementById('gift').classList.remove('open'); giftOpen = false; } });
}

// 劇本：每一步回傳一個檢查點
async function run(file) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 1 });
  await ctx.addInitScript(FAKE_ENV);
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  const page = await ctx.newPage();
  page.on('pageerror', e => out.push({ label: 'pageerror', err: e.message }));
  const out = [];
  const cp = async label => {
    const s = await page.evaluate(SNAP);
    const png = await page.evaluate(() => document.getElementById('cv').toDataURL());
    s.canvas = crypto.createHash('sha1').update(png).digest('hex');
    out.push({ label, ...s });
  };
  const tick = (sec, label) => page.evaluate(n => window.__tick(n, 50), Math.round(sec * 20)).then(() => cp(label));
  const fast = (sec, label) => page.evaluate(n => { window.__fast(n); window.__tick(1, 50); }, sec).then(() => cp(label));
  // 每個面板每一頁，把能按的按鈕從上到下各按一次（不按清除存檔、飛升）
  const pressAll = async label => {
    for (const b of ['bHero', 'bGacha', 'bGate']) {
      await page.evaluate(b => document.getElementById(b).click(), b);
      const n = await page.$$eval('#shTabs button', x => x.length);
      for (let t = 0; t < Math.max(1, n); t++) {
        const k = await page.evaluate(t => {
          const tabs = document.querySelectorAll('#shTabs button'); if (tabs[t]) tabs[t].click();
          let k = 0;
          for (let i = 0; i < 120; i++) {
            const bs = [...document.querySelectorAll('#shBody button')].filter(x => !x.disabled && !['gReset', 'gAsc'].includes(x.id));
            if (i >= bs.length) break; bs[i].click(); k++;
            const tabs2 = document.querySelectorAll('#shTabs button'); if (tabs2[t] && !tabs2[t].classList.contains('on')) tabs2[t].click();
          }
          return k;
        }, t);
        await page.evaluate(() => window.__tick(1, 50));
        const h = await page.evaluate(() => document.getElementById('shTitle').innerText + '\n' + document.getElementById('shBody').innerHTML);
        out.push({ label: `${label}:${b}:${t}（按了${k}下）`, panel: crypto.createHash('sha1').update(h).digest('hex') });
      }
      await page.evaluate(() => document.getElementById('shX').click());
    }
    await cp(label + ':按完');
  };
  const panels = async label => {
    for (const b of ['bHero', 'bGacha', 'bGate']) {
      await page.evaluate(b => document.getElementById(b).click(), b);
      const n = await page.$$eval('#shTabs button', x => x.length);
      for (let i = 0; i < Math.max(1, n); i++) {
        if (n) await page.evaluate(i => document.querySelectorAll('#shTabs button')[i].click(), i);
        const h = await page.evaluate(() => document.getElementById('shTitle').innerText + '\n' + document.getElementById('shBody').innerHTML);
        out.push({ label: `${label}:${b}:${i}`, panel: crypto.createHash('sha1').update(h).digest('hex'), panelText: h.slice(0, 400) });
      }
      await page.evaluate(() => document.getElementById('shX').click());
    }
    await page.evaluate(() => window.__tick(1, 50));
  };

  // 1. 新手：沒有存檔，從頭玩
  await boot(page, file, null);
  await cp('新手:開場');
  for (let i = 1; i <= 6; i++) await tick(10, `新手:${i * 10}秒`);
  await panels('新手面板');
  await fast(900, '新手:快轉900秒');
  await tick(20, '新手:快轉後20秒');
  for (let i = 0; i < 3; i++) await page.evaluate(() => { S.gem += 100; window.__api.setG('hero'); window.__api.pull(10); });
  await tick(3, '新手:抽卡30次');
  await panels('新手抽卡後面板');

  // 2. 後期：全解鎖、大量抽卡升級，存檔後重新載入
  await page.evaluate(() => {
    S.gem = 1e9; S.coin = 1e40; S.stone = 1e12; S.pill = 1e6; S.unl = { fengshen: 1, shanhai: 1, xiong: 1, jump: 1 };
    for (let i = 0; i < 600; i++) rollOne();
    for (let i = 0; i < 200; i++) gpOne();
    for (let i = 0; i < 300; i++) bpOne();
    for (let i = 0; i < 12; i++) giveFb();
    for (const id in S.roster) window.__api.levelUp(id, 300);
    S.best = S.stage = 420; S.gateLv = 25; persist();
  });
  await cp('後期:設定完');
  await pressAll('後期按鈕');
  const save = await page.evaluate(() => localStorage.getItem('idle-td-save-v1'));
  await boot(page, file, save);
  await cp('後期:重新載入');
  await tick(10, '後期:10秒');
  await page.evaluate(() => { for (let i = 0; i < B.heroes.length; i++) castUlt(i); for (let i = 0; i < 5; i++) try { castBeast(i); } catch (e) {} });
  await tick(10, '後期:全放大招後10秒');
  await page.evaluate(() => { try { xOffer('taotie'); document.getElementById('xBtn').click(); } catch (e) { window.__errs.push('xOffer ' + e.message); } });
  await tick(15, '後期:凶獸');
  await panels('後期面板');
  await fast(600, '後期:快轉600秒');
  await page.evaluate(() => { try { ascend(); } catch (e) { window.__errs.push('ascend ' + e.message); } });
  await tick(10, '後期:飛升後');
  await panels('飛升後面板');
  await page.evaluate(() => { for (const z of [1.5, 1]) { ZM = z; resize(); } });
  await tick(5, '後期:縮放');

  // 3. 本機設定都改過（鏡頭拉遠、傷害表關掉、排序、頭像收起、大招音效）再載入
  await boot(page, file, save, { 'idle-td-zoom': '2', 'idle-td-dps': '0', 'idle-td-dpsm': 'hero', 'idle-td-hsort': 'lv', 'idle-td-ultfold': '1', 'idle-td-ultsnd': 'b' });
  await tick(8, '設定:載入');
  await panels('設定面板');
  await page.evaluate(() => ['ultTog', 'zmBtn', 'musBtn', 'sfxBtn', 'spdBtn'].forEach(id => document.getElementById(id).click()));
  await tick(5, '設定:按上方按鈕');
  out.push({ label: '設定:存下來的設定', S: await page.evaluate(() => JSON.stringify(Object.keys(localStorage).sort().filter(k => k !== 'idle-td-save-v1').map(k => [k, localStorage.getItem(k)]))) });

  await browser.close();
  return out;
}

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  console.log(`舊版：${REF}:idle-td/index.html${SELF ? '（--self：兩邊都跑舊版）' : '　新版：idle-td/index.html'}`);
  const [A, B] = await Promise.all([run('a.html'), run('b.html')]);
  server.close();
  let bad = 0;
  const n = Math.max(A.length, B.length);
  for (let i = 0; i < n; i++) {
    const a = A[i] || {}, b = B[i] || {};
    const diff = ['label', 'S', 'B', 'hud', 'canvas', 'panel', 'err'].filter(k => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
    const errs = [...(a.errs || []), ...(b.errs || [])];
    if (errs.length) console.log(`  ⚠ ${a.label || b.label} 錯誤：${[...new Set(errs)].join(' / ')}`);
    if (diff.length) {
      bad++;
      console.log(`✗ ${a.label || b.label}：不一樣的地方 ${diff.join(', ')}`);
      for (const k of diff.filter(k => k === 'S' || k === 'B' || k === 'hud')) {
        const x = a[k] || '', y = b[k] || ''; let j = 0; while (j < x.length && x[j] === y[j]) j++;
        console.log(`    ${k} 第 ${j} 字起：舊「${x.slice(Math.max(0, j - 80), j + 80)}」\n${' '.repeat(10)}新「${y.slice(Math.max(0, j - 80), j + 80)}」`);
      }
    } else console.log(`✓ ${a.label}${a.info ? '　' + a.info : ''}`);
  }
  console.log(bad ? `\n${bad}/${n} 個檢查點不一樣` : `\n全部 ${n} 個檢查點一樣`);
  process.exit(bad ? 1 : 0);
})();
