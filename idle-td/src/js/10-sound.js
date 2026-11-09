/* ---------- 音樂・音效（WebAudio 即時合成，不用音檔） ---------- */
const SND = (() => {
  let ultS = 'a';
  try {
    ultS = localStorage.getItem('idle-td-ultsnd') || 'a';
  } catch (e) {}
  let ac = null,
    mg,
    mus,
    sfx,
    on = 1,
    mode = 0,
    nextT = 0,
    step16 = 0,
    timer = null,
    boss = false;
  const last = {};
  let musOn = true,
    sfxOn = true;
  try {
    const v = localStorage.getItem('idle-td-snd2');
    if (v) {
      const o = JSON.parse(v);
      musOn = !!o.m;
      sfxOn = !!o.s;
    } else {
      const old = +(localStorage.getItem('idle-td-snd') || 0);
      musOn = old === 0;
      sfxOn = old < 2;
    }
  } catch (e) {}
  const save = () => {
    try {
      localStorage.setItem('idle-td-snd2', JSON.stringify({m: musOn ? 1 : 0, s: sfxOn ? 1 : 0}));
    } catch (e) {}
  };
  function init() {
    if (ac) return;
    try {
      ac = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return;
    }
    mg = ac.createGain();
    mg.connect(ac.destination);
    mus = ac.createGain();
    sfx = ac.createGain();
    mus.connect(mg);
    sfx.connect(mg);
    apply();
    const nb = ac.createBuffer(1, ac.sampleRate * 0.5, ac.sampleRate),
      d = nb.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    noiseBuf = nb;
    nextT = ac.currentTime + 0.1;
    timer = setInterval(sched, 60);
  }
  let noiseBuf = null;
  function apply() {
    if (!ac) return;
    mus.gain.value = musOn ? 0.32 : 0;
    sfx.gain.value = sfxOn ? 0.55 : 0;
  }
  function resume() {
    init();
    if (ac && ac.state === 'suspended') ac.resume();
  }
  ['pointerdown', 'keydown'].forEach(ev => document.addEventListener(ev, resume, {capture: true}));
  document.addEventListener('visibilitychange', () => {
    if (!ac) return;
    if (document.hidden) ac.suspend();
    else ac.resume();
  });
  function tone(f, t, dur, type, vol, out, opt = {}) {
    const o = ac.createOscillator(),
      g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (opt.to) o.frequency.exponentialRampToValueAtTime(opt.to, t + dur);
    if (opt.det) o.detune.value = opt.det;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + (opt.a || 0.005));
    g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
    o.connect(g);
    g.connect(out);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
  function noise(t, dur, vol, out, fq, q, type) {
    const n = ac.createBufferSource();
    n.buffer = noiseBuf;
    const f = ac.createBiquadFilter();
    f.type = type || 'bandpass';
    f.frequency.value = fq;
    f.Q.value = q || 1;
    const g = ac.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
    n.connect(f);
    f.connect(g);
    g.connect(out);
    n.start(t);
    n.stop(t + dur + 0.05);
  }
  // 五聲音階（D 宮調），像古箏
  const ROOT = 146.83,
    PENT = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
  const fr = n => ROOT * Math.pow(2, n / 12);
  const PH = [
    [0, 2, 4, 7, 4, 2, 4, -1, 7, 9, 7, 4, 2, 4, 0, -1],
    [4, 7, 9, 12, 9, 7, 4, -1, 2, 4, 2, 0, 2, -1, 0, -1],
    [7, 9, 12, 14, 12, 9, 7, 9, 4, 7, 4, 2, 4, -1, -1, -1],
    [9, 7, 4, 2, 4, 7, 9, 12, 9, 7, 4, 2, 0, -1, -1, -1]
  ];
  const BOSSPH = [
    [0, 3, 5, 7, 5, 3, 0, -1, 10, 7, 5, 3, 5, -1, 0, -1],
    [12, 10, 7, 5, 7, 10, 12, -1, 7, 5, 3, 0, 3, -1, 0, -1]
  ];
  const BASS = [0, 0, -5, -3];
  let bar = 0;
  function sched() {
    if (!ac || !musOn || ac.state !== 'running') {
      if (ac) nextT = Math.max(nextT, ac.currentTime + 0.05);
      return;
    }
    const bpm = boss ? 112 : 84,
      sp = 60 / bpm / 4;
    while (nextT < ac.currentTime + 0.25) {
      const t = nextT,
        i = step16 % 16;
      const ph = boss ? BOSSPH[bar % 2] : PH[bar % 4];
      const n = ph[i];
      if (n >= 0) {
        const f = fr(n + 12);
        tone(f, t, 0.9, 'triangle', 0.22, mus, {a: 0.003});
        tone(f * 2, t, 0.35, 'sine', 0.06, mus);
        tone(f, t, 0.7, 'sawtooth', 0.025, mus, {det: 7});
      }
      if (i === 0 || i === 8) {
        const b = fr(BASS[bar % 4] - 12 + (boss ? -2 : 0));
        tone(b, t, 1.4, 'sine', 0.3, mus, {a: 0.02});
      }
      if (i % 4 === 0) {
        tone(boss ? 70 : 90, t, 0.25, 'sine', boss ? 0.38 : 0.22, mus, {to: 40});
      }
      if (boss && i % 2 === 1) noise(t, 0.05, 0.06, mus, 7000, 1, 'highpass');
      if (!boss && i === 12 && bar % 2 === 1) noise(t, 0.18, 0.05, mus, 5000, 2);
      nextT += sp;
      step16++;
      if (step16 % 16 === 0) bar++;
    }
  }
  const LEG = {fox: 1, dragon: 1, archer: 1, mecha: 1, alchemist: 1};
  function sweep(t, dur, f0, f1, vol, type, q) {
    const n = ac.createBufferSource();
    n.buffer = noiseBuf;
    n.loop = true;
    const f = ac.createBiquadFilter();
    f.type = type || 'bandpass';
    f.Q.value = q || 2;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(vol, t + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    n.connect(f);
    f.connect(g);
    g.connect(sfx);
    n.start(t);
    n.stop(t + dur + 0.05);
  }
  function lfoTone(f, t, dur, type, vol, rate, depth, to) {
    const o = ac.createOscillator(),
      l = ac.createOscillator(),
      lg = ac.createGain(),
      g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    l.frequency.value = rate;
    lg.gain.value = depth;
    l.connect(lg);
    lg.connect(o.frequency);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.03);
    g.gain.setValueAtTime(vol, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g);
    g.connect(sfx);
    o.start(t);
    l.start(t);
    o.stop(t + dur + 0.05);
    l.stop(t + dur + 0.05);
  }
  function play(k, role) {
    if (!ac || !sfxOn || ac.state !== 'running') return;
    const now = ac.currentTime;
    const gap = {hit: 0.06, coin: 0.07, gate: 0.18, crit: 0.08}[k] || 0;
    if (gap) {
      if (last[k] && now - last[k] < gap) return;
      last[k] = now;
    }
    const t = now + 0.005;
    if (k === 'ult')
      k = LEG[role]
        ? 'L_' + role
        : 'ult_' +
          ({melee: 'a', tank: 'a', magic: 'b', support: 'c', ranged: 'd'}[CH[role] ? CH[role].role : role] || 'd');
    switch (k) {
      case 'hit':
        noise(t, 0.07, 0.18, sfx, 1800 + Math.random() * 900, 1.2);
        tone(220 + Math.random() * 60, t, 0.08, 'square', 0.04, sfx, {to: 110});
        break;
      case 'crit':
        noise(t, 0.12, 0.3, sfx, 2600, 1);
        tone(660, t, 0.12, 'square', 0.07, sfx, {to: 200});
        break;
      case 'coin':
        tone(1568, t, 0.09, 'square', 0.05, sfx);
        tone(2093, t + 0.05, 0.14, 'square', 0.05, sfx);
        break;
      case 'gate':
        noise(t, 0.22, 0.35, sfx, 300, 1, 'lowpass');
        tone(80, t, 0.25, 'sine', 0.35, sfx, {to: 45});
        break;
      case 'bosshit':
        noise(t, 0.5, 0.6, sfx, 200, 1, 'lowpass');
        tone(55, t, 0.6, 'sine', 0.6, sfx, {to: 30});
        break;
      case 'ult_d': {
        // 爆氣和弦
        const n = ac.createBufferSource();
        n.buffer = noiseBuf;
        const f = ac.createBiquadFilter();
        f.type = 'bandpass';
        f.Q.value = 2;
        f.frequency.setValueAtTime(600, t);
        f.frequency.exponentialRampToValueAtTime(9000, t + 0.32);
        const g = ac.createGain();
        g.gain.setValueAtTime(0.05, t);
        g.gain.linearRampToValueAtTime(0.4, t + 0.3);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        n.connect(f);
        f.connect(g);
        g.connect(sfx);
        n.start(t);
        n.stop(t + 0.45);
        tone(330, t, 0.34, 'sawtooth', 0.08, sfx, {to: 1320, a: 0.02});
        const T = t + 0.32,
          lp = ac.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(5000, T);
        lp.frequency.exponentialRampToValueAtTime(900, T + 1.1);
        lp.connect(sfx);
        [12, 19, 24, 28].forEach(k => {
          tone(fr(k), T, 1.2, 'sawtooth', 0.09, lp, {a: 0.004, det: -8});
          tone(fr(k), T, 1.2, 'sawtooth', 0.09, lp, {a: 0.004, det: 8});
        });
        tone(fr(36), T, 0.9, 'triangle', 0.12, sfx);
        noise(T, 1.3, 0.32, sfx, 6500, 0.6, 'highpass');
        noise(T, 0.25, 0.25, sfx, 2500, 0.8);
        [0, 2, 4, 7, 9, 12, 14, 16].forEach((k, j) =>
          tone(fr(k + 36), T + 0.05 + j * 0.035, 0.35, 'square', 0.035, sfx)
        );
        break;
      }
      case 'L_fox': {
        // 狐火流星：狐鈴 → 三顆火流星呼嘯落下 → 連環爆炸
        [24, 31, 36].forEach((n, j) => tone(fr(n + 12), t + j * 0.06, 0.5, 'sine', 0.12, sfx, {a: 0.002}));
        for (let j = 0; j < 3; j++) {
          const T = t + 0.15 + j * 0.22;
          sweep(T, 0.35, 6000, 500, 0.35, 'bandpass', 3);
          tone(1200, T, 0.35, 'sine', 0.05, sfx, {to: 200});
          noise(T + 0.35, 0.45, 0.55, sfx, 700, 0.6, 'lowpass');
          tone(90, T + 0.35, 0.4, 'sine', 0.4, sfx, {to: 40});
          noise(T + 0.35, 0.3, 0.2, sfx, 3000, 1);
        }
        break;
      }
      case 'L_dragon': {
        // 龍槍震地：龍吼 → 起跳破風 → 超重落地＋碎石
        lfoTone(110, t, 0.7, 'sawtooth', 0.16, 22, 18, 70);
        lfoTone(165, t, 0.6, 'square', 0.06, 30, 12, 90);
        sweep(t, 0.7, 400, 1500, 0.2, 'bandpass', 1.5);
        sweep(t + 0.55, 0.3, 800, 5000, 0.3, 'bandpass', 2);
        const T = t + 0.85;
        noise(T, 0.9, 0.8, sfx, 250, 0.7, 'lowpass');
        tone(70, T, 0.9, 'sine', 0.7, sfx, {to: 28});
        tone(140, T, 0.25, 'square', 0.12, sfx, {to: 50});
        for (let j = 0; j < 8; j++)
          noise(T + 0.1 + Math.random() * 0.5, 0.05, 0.25, sfx, 1500 + Math.random() * 2500, 3);
        break;
      }
      case 'L_archer': {
        // 星箭雨：拉弓 → 放弦 → 一群箭呼嘯 → 星星閃落
        tone(180, t, 0.25, 'triangle', 0.08, sfx, {to: 240, a: 0.2});
        tone(220, t + 0.26, 0.25, 'triangle', 0.3, sfx, {to: 110, a: 0.001});
        noise(t + 0.26, 0.06, 0.3, sfx, 2500, 2);
        for (let j = 0; j < 9; j++) {
          const T = t + 0.35 + j * 0.06;
          tone(3200 - j * 90, T, 0.32, 'sine', 0.05, sfx, {to: 1200});
        }
        for (let j = 0; j < 10; j++) {
          const T = t + 0.75 + j * 0.05;
          noise(T, 0.04, 0.25, sfx, 2500 + Math.random() * 2000, 3);
          tone(fr(PENT[j % PENT.length] + 36), T, 0.25, 'triangle', 0.06, sfx);
        }
        break;
      }
      case 'L_mecha': {
        // 能量砲：充能嗡嗡上升 → 雷射發射（有震盪）→ 電流劈啪
        tone(110, t, 0.7, 'sine', 0.15, sfx, {to: 880, a: 0.6});
        tone(220, t, 0.7, 'square', 0.04, sfx, {to: 1760, a: 0.6});
        const T = t + 0.7;
        lfoTone(330, T, 1, 'sawtooth', 0.2, 40, 40);
        lfoTone(660, T, 1, 'square', 0.07, 55, 60);
        noise(T, 1, 0.25, sfx, 1800, 0.8);
        tone(1800, T, 0.12, 'square', 0.12, sfx, {to: 300});
        for (let j = 0; j < 12; j++) noise(T + Math.random() * 1, 0.02, 0.3, sfx, 6000, 4);
        break;
      }
      case 'L_alchemist': {
        // 九轉回春丹：丹爐咕嘟 → 開爐 → 鐘聲和弦 → 回春閃光
        for (let j = 0; j < 7; j++) {
          const T = t + j * 0.07 + Math.random() * 0.03;
          tone(300 + Math.random() * 250, T, 0.08, 'sine', 0.12, sfx, {to: 700});
        }
        sweep(t + 0.45, 0.25, 500, 3000, 0.25, 'bandpass', 1.5);
        const T = t + 0.6;
        [0, 4, 7, 12].forEach((n, j) =>
          [1, 2.76].forEach((m, z) =>
            tone(fr(n + 24) * m, T + j * 0.05, 1.8 - z * 0.6, 'sine', 0.11 / (z + 1), sfx, {a: 0.002})
          )
        );
        for (let j = 0; j < 14; j++) tone(fr(PENT[j % PENT.length] + 36), T + 0.2 + j * 0.05, 0.35, 'sine', 0.05, sfx);
        noise(T + 0.2, 1.2, 0.1, sfx, 9000, 1, 'highpass');
        break;
      }
      case 'ult_a': {
        // 劍氣：金屬「鏘」＋破風
        const n = ac.createBufferSource();
        n.buffer = noiseBuf;
        const f = ac.createBiquadFilter();
        f.type = 'bandpass';
        f.Q.value = 3;
        f.frequency.setValueAtTime(9000, t);
        f.frequency.exponentialRampToValueAtTime(700, t + 0.35);
        const g = ac.createGain();
        g.gain.setValueAtTime(0.5, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        n.connect(f);
        f.connect(g);
        g.connect(sfx);
        n.start(t);
        n.stop(t + 0.45);
        [2637, 3520, 4186, 5274].forEach((q, j) => tone(q, t + 0.01, 1.1 - j * 0.2, 'sine', 0.09, sfx, {a: 0.001}));
        tone(1318, t, 0.6, 'triangle', 0.12, sfx, {a: 0.001});
        const T = t + 0.18;
        noise(T, 0.12, 0.35, sfx, 4000, 1);
        [2637, 3951].forEach(q => tone(q, T, 0.7, 'sine', 0.07, sfx, {a: 0.001}));
        break;
      }
      case 'ult_b': {
        // 雷霆：劈啪＋轟隆
        noise(t, 0.08, 0.7, sfx, 5000, 0.5, 'highpass');
        for (let j = 0; j < 10; j++)
          noise(t + 0.02 + Math.random() * 0.25, 0.02, 0.4, sfx, 3000 + Math.random() * 4000, 2);
        const n = ac.createBufferSource();
        n.buffer = noiseBuf;
        n.loop = true;
        const f = ac.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.setValueAtTime(1800, t + 0.05);
        f.frequency.exponentialRampToValueAtTime(120, t + 1.4);
        const g = ac.createGain();
        g.gain.setValueAtTime(0.7, t + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
        n.connect(f);
        f.connect(g);
        g.connect(sfx);
        n.start(t + 0.05);
        n.stop(t + 1.6);
        tone(fr(24), t, 0.5, 'square', 0.05, sfx, {to: fr(12)});
        break;
      }
      case 'ult_c': {
        // 仙法：鐘聲和弦＋閃光上升
        [0, 7, 12, 16].forEach((k, j) => {
          const q = fr(k + 24);
          [1, 2.76, 5.4].forEach((m, z) =>
            tone(q * m, t + j * 0.07, 1.6 - z * 0.4, 'sine', 0.1 / (z + 1), sfx, {a: 0.002})
          );
        });
        for (let j = 0; j < 12; j++)
          tone(fr(PENT[j % PENT.length] + 36), t + 0.25 + j * 0.04, 0.3, 'triangle', 0.05, sfx);
        noise(t + 0.25, 1, 0.12, sfx, 9000, 1, 'highpass');
        break;
      }

      case 'win':
        [0, 4, 7, 12, 16].forEach((n, j) => tone(fr(n + 12), t + j * 0.09, 0.5, 'triangle', 0.22, sfx));
        tone(fr(24), t + 0.45, 0.9, 'sine', 0.12, sfx);
        break;
      case 'lose':
        [12, 9, 7, 4, 0].forEach((n, j) => tone(fr(n), t + j * 0.16, 0.6, 'triangle', 0.22, sfx));
        break;
      case 'bossin':
        tone(73, t, 1.2, 'sawtooth', 0.18, sfx, {a: 0.1});
        tone(77.8, t, 1.2, 'sawtooth', 0.14, sfx, {a: 0.1});
        for (let j = 0; j < 4; j++) tone(60, t + j * 0.28, 0.25, 'sine', 0.5, sfx, {to: 35});
        break;
      case 'gacha':
        for (let j = 0; j < 6; j++) tone(fr(PENT[j] + 12), t + j * 0.05, 0.3, 'triangle', 0.12, sfx);
        noise(t, 0.4, 0.12, sfx, 6000, 1, 'highpass');
        break;
      case 'rare':
        [0, 7, 12, 16, 19, 24].forEach((n, j) => tone(fr(n + 12), t + j * 0.07, 0.8, 'triangle', 0.2, sfx));
        noise(t + 0.3, 0.8, 0.15, sfx, 8000, 1, 'highpass');
        break;
      case 'up':
        tone(fr(12), t, 0.12, 'triangle', 0.18, sfx);
        tone(fr(19), t + 0.06, 0.2, 'triangle', 0.18, sfx);
        break;
      case 'click':
        tone(900, t, 0.05, 'square', 0.04, sfx);
        break;
    }
  }
  return {
    play,
    get ultS() {
      return ultS;
    },
    setUlt(v) {
      ultS = v;
      try {
        localStorage.setItem('idle-td-ultsnd', v);
      } catch (e) {}
    },
    setBoss: b => {
      boss = b;
    },
    get musOn() {
      return musOn;
    },
    get sfxOn() {
      return sfxOn;
    },
    togMus() {
      musOn = !musOn;
      save();
      resume();
      apply();
      return musOn;
    },
    togSfx() {
      sfxOn = !sfxOn;
      save();
      resume();
      apply();
      return sfxOn;
    }
  };
})();
const ROLE_OF = id => CH[id].role;
