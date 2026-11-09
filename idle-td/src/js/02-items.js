// 法寶：3 個共用欄位（山門 Lv1／10／20 開），重複拿到升星（最多 5 星，5 星 = 1 星 ×5）
const FB = {
  qiankun: {
    n: '乾坤圈',
    g: '圈',
    c: '#ffb02e',
    k: 'fbatk',
    v: 0.2,
    t: v => `全隊攻擊 ×${(1 + v).toFixed(2)}（獨立乘，不跟被動擠）`
  },
  huntian: {
    n: '混天綾',
    g: '綾',
    c: '#ff4a6a',
    k: 'mslow',
    v: 0.12,
    t: v => `全部怪物走路變慢 ${Math.round(v * 100)}%`
  },
  zhaoyao: {
    n: '照妖鏡',
    g: '鏡',
    c: '#7ad8ff',
    k: 'boss',
    v: 0.3,
    t: v => `打 Boss 和魔頭傷害 +${Math.round(v * 100)}%`
  },
  dinghai: {n: '定海神針', g: '針', c: '#e0b84a', k: 'hp', v: 0.25, t: v => `山門血量 +${Math.round(v * 100)}%`},
  jubao: {n: '聚寶盆', g: '盆', c: '#ffd84a', k: 'coin', v: 0.3, t: v => `打怪銅錢 +${Math.round(v * 100)}%`},
  zijin: {
    n: '紫金葫蘆',
    g: '葫',
    c: '#b06aff',
    k: 'cap',
    v: 0.03,
    t: v => `弟子普攻 ${(v * 100).toFixed(1)}% 機會把小怪直接收走`
  },
  fenghuo: {n: '風火輪', g: '輪', c: '#ff6a2a', k: 'spd', v: 0.15, t: v => `弟子攻擊速度 +${Math.round(v * 100)}%`},
  bajiao: {
    n: '芭蕉扇',
    g: '扇',
    c: '#6ad86a',
    k: 'wind',
    v: 1,
    t: v => `每 ${Math.max(3, Math.round(9 / v))} 秒搧一陣風，把地上的怪物吹回去`
  },
  kunxian: {
    n: '捆仙繩',
    g: '繩',
    c: '#ffe08a',
    k: 'bind',
    v: 0.08,
    t: v => `弟子普攻 ${Math.round(v * 100)}% 機會把怪物綁住 1 秒`
  },
  taiji: {n: '太極圖', g: '極', c: '#f0f0f0', k: 'dr', v: 0.12, t: v => `山門受到的傷害 -${Math.round(v * 100)}%`},
  fantian: {
    n: '番天印',
    g: '印',
    c: '#d08a4a',
    k: 'seal',
    v: 1,
    t: v => `每 12 秒砸下大印，打全場（全隊平均攻擊 ×${(3 * v).toFixed(1)}）`
  },
  liuli: {
    n: '七寶琉璃燈',
    g: '燈',
    c: '#ffe86a',
    k: 'charge',
    v: 0.2,
    t: v => `全隊大招充能快 ${Math.round(v * 100)}%（冷卻最多降一半）`
  }
};
const FB_SLOT = [
  [1, 1],
  [10, 2],
  [20, 3]
];
// 法寶紅星：滿 5 星後重複掉到升 6～10 星（效果照星數倍增），10 星解鎖特效
const FBCAP = {mslow: 0.5, dr: 0.6, cap: 0.3, bind: 0.6},
  FB_MAX = 10,
  FB10 = {
    qiankun: {n: '乾坤歸一', d: '全隊攻擊再 ×2'},
    huntian: {n: '混天縛海', d: '每 10 秒把全場小怪綁住 2 秒'},
    zhaoyao: {n: '照妖現形', d: 'Boss 和魔頭受到全隊傷害 ×2'},
    dinghai: {n: '定海不倒', d: '每關一次：山門血量掉到 30% 時直接回滿'},
    jubao: {n: '招財進寶', d: '過關銅錢 ×3'},
    zijin: {n: '葫蘆收妖', d: '收走一隻小怪時，旁邊 150 內的小怪一起收走'},
    fenghuo: {n: '風火燎原', d: '弟子普攻讓怪燒傷 2 秒（每 0.5 秒 30%）'},
    bajiao: {n: '芭蕉神風', d: '搧風也打全場（全隊平均攻擊 ×20），Boss 也會被吹退'},
    kunxian: {n: '捆仙鎖妖', d: '被定住、暈眩的怪受到全隊傷害 ×1.5'},
    taiji: {n: '太極回天', d: '山門每秒回血 1%'},
    fantian: {n: '番天連印', d: '大印改成每 6 秒砸一次，砸 Boss ×3'},
    liuli: {n: '琉璃長明', d: '大招冷卻最多降到 1/3（原本一半）'}
  };
const fb10 = k => (S.fbOn || []).slice(0, fbSlots()).includes(k) && S.fb[k] && S.fb[k].star >= FB_MAX;
const fbSlots = () => {
  let n = 0;
  for (const [l, c] of FB_SLOT) if (S.gateLv >= l) n = c;
  return n;
};
const fbV = k => FB[k].v * ((S.fb[k] && S.fb[k].star) || 1); // 越難拿越強：5 星 = 1 星的 5 倍
function giveFb(src) {
  const ks = Object.keys(FB),
    k = ks[Math.floor(Math.random() * ks.length)];
  let txt;
  if (!S.fb[k]) {
    S.fb[k] = {star: 1};
    if (S.fbOn.length < fbSlots()) S.fbOn.push(k);
    txt = '新的法寶！';
  } else if (S.fb[k].star < FB_MAX) {
    S.fb[k].star++;
    txt =
      S.fb[k].star > 5
        ? `紅星 ${S.fb[k].star} 星！${S.fb[k].star >= FB_MAX ? `解鎖「${FB10[k].n}」` : ''}`
        : `升到 ${S.fb[k].star} 星！`;
  } else {
    const c = Math.round(coinKill(Math.max(1, S.best), 1) * 40);
    S.coin += c;
    txt = `已經滿星，換成 ${fmt(c)} 銅錢`;
  }
  return {k, txt};
}
// 魔頭（每 100 關）：正式圖還沒畫，先用 Boss 圖放大＋染色
const DEMON = [
  {k: 'bullking', a: 'hunshi', n: '混世魔王', c: '#ff2030'},
  {k: 'bonegeneral', a: 'jiuyou', n: '九幽冥帝', c: '#8a3aff'},
  {k: 'treeelder', a: 'moshu', n: '萬年魔樹', c: '#1a8a3a'}
];
function tinted(key, c) {
  const tk = key + '@' + c;
  if (IMG[tk] || !IMG[key]) return tk;
  const im = IMG[key],
    m = MAN[key];
  const cv = document.createElement('canvas');
  cv.width = m[0];
  cv.height = m[1];
  const g = cv.getContext('2d');
  g.drawImage(im, 0, 0, m[0], m[1]);
  g.globalCompositeOperation = 'source-atop';
  g.fillStyle = c;
  g.globalAlpha = 0.42;
  g.fillRect(0, 0, m[0], m[1]);
  g.globalAlpha = 0.22;
  g.fillStyle = '#000';
  g.fillRect(0, 0, m[0], m[1]);
  IMG[tk] = cv;
  MAN[tk] = m;
  return tk;
}
const BOSS = [
  {k: 'slimeking', n: '史萊姆國王'},
  {k: 'bullking', n: '牛魔大王'},
  {k: 'bonegeneral', n: '白骨將軍'},
  {k: 'treeelder', n: '千年樹妖'}
];
const TUR = {
  crossbow: {n: '連弩塔', atk: 5, rate: 1.25, kind: 'bolt', c: '#fff0b0', d: '單體快射'},
  frost: {n: '冰霜塔', atk: 3.2, rate: 0.8, kind: 'ice', c: '#bdf4ff', slow: 0.45, d: '打中會變慢'},
  furnace: {n: '丹爐塔', atk: 6, rate: 0.55, kind: 'fire', c: '#ff8a3d', aoe: 80, d: '範圍爆炸'},
  bell: {n: '鎮魂鐘', atk: 3, rate: 0.45, kind: 'ring', c: '#ffe08a', d: '震暈前排'},
  talisman: {n: '符咒塔', atk: 4, rate: 1, kind: 'tali', c: '#ffe86a', d: '追蹤符紙'}
};
// 陣法：a_ 攻擊陣（鋪在山門前到神獸）、d_ 防禦陣（鋪在樓閣下）
const ARR = {
  a_fire: {n: '火焰陣', c: [255, 120, 40], t: 'a', m: 1, fx: 'fx_fire', d: '站在陣上的怪物持續燒傷'},
  a_thunder: {n: '雷霆陣', c: [190, 140, 255], t: 'a', m: 0, fx: 'fx_thunder', d: '每 1.5 秒落雷，打陣上全部怪物'},
  a_sword: {n: '萬劍陣', c: [210, 235, 255], t: 'a', m: 1.4, fx: 'fx_slash', d: '飛劍連斬，持續傷害最高'},
  a_frost: {n: '冰封陣', c: [140, 225, 255], t: 'a', m: 0.7, fx: 'fx_ice', d: '怪物變慢 35%，也會受傷'},
  a_poison: {n: '毒霧陣', c: [120, 220, 80], t: 'a', m: 0.6, fx: 'fx_poison', d: '中毒越久越痛'},
  a_wind: {n: '旋風陣', c: [120, 240, 200], t: 'a', m: 0.6, fx: 'fx_wind', d: '把怪物往後吹'},
  d_gold: {
    n: '金剛陣',
    c: [255, 210, 90],
    t: 'd',
    d: l => `山門受到的傷害 -${Math.round(dv('d_gold', l) * 100)}%${dv2Txt('d_gold', l)}`
  },
  d_lotus: {
    n: '蓮花陣',
    c: [255, 170, 210],
    t: 'd',
    d: l => `山門每秒回血 ${(dv('d_lotus', l) * 100).toFixed(1)}%${dv2Txt('d_lotus', l)}`
  },
  d_rock: {n: '磐石陣', c: [190, 170, 140], t: 'd', d: l => `山門血量 +${Math.round(dv('d_rock', l) * 100)}%`},
  d_mirror: {
    n: '鏡光陣',
    c: [200, 240, 255],
    t: 'd',
    d: l => `打山門的怪物被反彈 ${Math.round(dv('d_mirror', l) * 100)}% 傷害（以陣法等級算）`
  },
  d_taiji: {
    n: '太極陣',
    c: [240, 240, 240],
    t: 'd',
    d: l => `弟子攻擊速度 +${Math.round(dv('d_taiji', l) * 100)}%${dv2Txt('d_taiji', l)}`
  },
  d_star: {
    n: '七星陣',
    c: [255, 240, 150],
    t: 'd',
    d: l => `大招充能快 ${Math.round(dv('d_star', l) * 100)}%（冷卻最多降一半）${dv2Txt('d_star', l)}`
  }
};
// 攻擊陣升級：傷害之外，效果和範圍也會變強
function AE(k, l) {
  const n = l - 1;
  return {
    slow: Math.min(0.65, 0.35 + 0.008 * n),
    pois: Math.min(0.9, 0.35 + 0.01 * n),
    kb: Math.min(45, 12 + 0.6 * n),
    thun: Math.max(0.6, 1.5 - 0.02 * n),
    burn: Math.min(5, 2 + 0.05 * n),
    sword: Math.min(2.5, 1.4 * (1 + 0.01 * n)),
    r: 1 + Math.min(0.3, 0.006 * n)
  };
}
function aDesc(k, l) {
  const a = AE(k, l);
  return (
    {
      a_fire: `怪物踩到會燒傷 ${a.burn.toFixed(1)} 秒`,
      a_thunder: `每 ${a.thun.toFixed(2)} 秒落雷，打陣上全部怪物`,
      a_sword: `飛劍連斬，傷害倍率 ×${a.sword.toFixed(2)}`,
      a_frost: `怪物變慢 ${Math.round(a.slow * 100)}%，也會受傷`,
      a_poison: `中毒越久越痛（每秒加深 ${Math.round(a.pois * 100)}%）`,
      a_wind: `把怪物往後吹（力道 ${Math.round(a.kb)}）`
    }[k] + `｜範圍 ×${a.r.toFixed(2)}`
  );
}
const DV = {
  d_gold: [0.2, 0.01, 0.6],
  d_lotus: [0.006, 0.0004, 0.03],
  d_rock: [0.25, 0.03, 99],
  d_mirror: [3, 0.4, 99],
  d_taiji: [0.15, 0.01, 0.6],
  d_star: [0.2, 0.01, 0.6]
};
// 防禦陣主效果到上限後，多出來的等級改加第二個效果（不設上限）
const DV2 = {
  d_gold: {k: 'hp', v: 0.02, t: '山門血量'},
  d_lotus: {k: 'hp', v: 0.02, t: '山門血量'},
  d_taiji: {k: 'atk', v: 0.01, t: '全隊攻擊'},
  d_star: {k: 'atk', v: 0.01, t: '全隊攻擊'}
};
const dvCapLv = k => {
  const [a, b, m] = DV[k];
  return 1 + Math.ceil((m - a) / b - 1e-9);
};
const dv2 = (k, l) => (DV2[k] ? Math.max(0, l - dvCapLv(k)) * DV2[k].v : 0);
const dv2Txt = (k, l) =>
  DV2[k] && l >= dvCapLv(k)
    ? `（主效果已滿，之後每級 ${DV2[k].t} +${Math.round(DV2[k].v * 100)}%：目前 +${Math.round(dv2(k, l) * 100)}%）`
    : DV2[k]
      ? `（Lv${dvCapLv(k)} 滿，之後每級改加 ${DV2[k].t}）`
      : '';
function dv(k, l) {
  const [a, b, m] = DV[k];
  return Math.min(m, a + b * (l - 1));
}
const BEAST = {
  baihu: {n: '白虎', atk: 14, rate: 0.8, d: '撲咬前方一群怪物'},
  qinglong: {n: '青龍', atk: 9, rate: 0.6, fly: 1, fx: 'fx_thunder', d: '在空中放雷，打一整排，也打得到飛的'},
  zhuque: {n: '朱雀', atk: 8, rate: 0.7, fly: 1, fx: 'fx_fire', d: '丟火焰，炸一群還會燒傷'},
  xuanwu: {n: '玄武', atk: 7, rate: 0.45, fx: 'fx_stun', d: '震地讓前方怪物暈住，山門受傷 -15%'},
  qilin: {n: '麒麟', atk: 24, rate: 0.7, sh: 1, d: '踏雲衝撞最前面的一群怪'},
  baize: {n: '白澤', atk: 20, rate: 0.8, sh: 1, d: '看穿一隻怪，標記 4 秒（受全隊傷害 ×1.5）'},
  tengshe: {n: '騰蛇', atk: 18, rate: 0.6, fly: 1, sh: 1, d: '吐雲霧團，打中的怪迷路 1 秒（往回走）'},
  bifang: {n: '畢方', atk: 18, rate: 0.7, fly: 1, sh: 1, d: '吐一道火焰，打中的怪燒傷 3 秒'}
};
