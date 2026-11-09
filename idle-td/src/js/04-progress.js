// 修煉：用銅錢升，沒有上限
const TRAIN = {
  atk: {n: '全隊攻擊', per: 0.05, d: '弟子、陣法、神獸攻擊'},
  hp: {n: '山門血量', per: 0.06, d: '山門最大血量'},
  coin: {n: '銅錢收入', per: 0.04, d: '打怪和過關的銅錢'},
  ult: {n: '大招傷害', per: 0.08, d: '全部大招的傷害'}
};
const trainCost = lv => Math.ceil(40 * Math.pow(1.15, lv));
const TR = k => 1 + TRAIN[k].per * ((S.train && S.train[k]) || 0);
// 飛升：第 300 關以上才能飛升，之後每飛升一次門檻 +100 關（第 2 次要 500、第 3 次 600…），關卡、山門、等級、銅錢、山門石、修煉重來；弟子階級、突破、法寶、靈石、塔陣獸（等級回 1）保留
// 拿到仙元（永久）：每點 全隊攻擊 +5%、銅錢和山門石 +2%
const ascMin = () => 300 + 100 * (S.asc || 0),
  XY_ATK = 0.05,
  XY_RES = 0.02;
const xyGain = b => (b < ascMin() ? 0 : Math.floor(Math.pow(b / 50, 2.5)));
const XYA0 = () => 1 + XY_ATK * (S.xy || 0),
  XYA = () => XYA0() * RLM(),
  XYR = () => 1 + XY_RES * (S.xy || 0);
// 境界：每飛升一次升一境界，全隊攻擊 ×20、弟子等級上限 +50（2026-11-05 泓）
const REALM = ['凡人', '練氣', '築基', '金丹', '元嬰', '化神', '煉虛', '合體', '大乘', '渡劫', '真仙'],
  RLM_MUL = 20,
  RLM_LV = 50;
const RLM = () => Math.pow(RLM_MUL, S.asc || 0),
  realmName = n => (n < REALM.length ? REALM[n] : '真仙 ' + (n - REALM.length + 2) + ' 重');
// 第三批美術：投射物、打擊特效、傳說大招
const PSPR = {
  nezha: 'p_qiankun',
  aobing: 'p_icepearl',
  archer: 'p_arrow',
  fox: 'p_ofuda',
  alchemist: 'p_pill',
  pharaoh: 'p_scarab',
  elf: 'p_seed',
  kitsune: 'p_foxfire',
  pirate: 'p_bullet',
  jiangshi: 'p_talisman',
  witch: 'p_starbolt',
  yukionna: 'p_iceshard',
  grandma: 'p_bun',
  shark: 'p_harpoon',
  crossbow: 'p_bolt',
  frost: 'p_iceshard',
  furnace: 'p_firebomb',
  talisman: 'p_talisman'
};
const HX = {
  yangjian: 'fx_slash',
  nezha: 'fx_blunt',
  aobing: 'fx_ice',
  disciple: 'fx_wind',
  fox: 'fx_fire',
  dragon: 'fx_blunt',
  mecha: 'fx_blunt',
  vampire: 'fx_slash',
  general: 'fx_blunt',
  swordsman: 'fx_slash',
  elf: 'fx_wind',
  kitsune: 'fx_fire',
  panda: 'fx_blunt',
  jiangshi: 'fx_stun',
  witch: 'fx_thunder',
  mummy: 'fx_blunt',
  yukionna: 'fx_ice',
  catsamurai: 'fx_slash',
  frost: 'fx_ice',
  furnace: 'fx_fire',
  bell: 'fx_stun',
  crossbow: 'fx_blunt'
};
const RAINSPR = {
  arrow: 'p_arrow',
  harpoon: 'p_harpoon',
  star: 'p_starbolt',
  bomb: 'p_firebomb',
  bluefire: 'p_foxfire',
  sand: 'p_scarab',
  fire: 'p_ofuda'
};
const ULTFX = {
  yangjian: 'ult_yangjian',
  nezha: 'ult_nezha',
  aobing: 'ult_aobing',
  dragon: 'ult_dragon',
  fox: 'ult_ninetail',
  mecha: 'ult_mecha',
  alchemist: 'ult_cauldron'
};
// 首次過關獎勵
const GIFTS = {6: {type: 'arr', k: 'a_fire'}};
const GP = Object.keys(ARR).map(k => ({type: 'arr', k})); // 陣法召喚池（塔已移除 2026-11-05）
const SLOT_LV = [
  [1, 2],
  [3, 3],
  [10, 4],
  [18, 5],
  [26, 6],
  [35, 7],
  [45, 8]
];
const TUR_SLOT = [
  [1, 1],
  [6, 2],
  [14, 3]
];
const TIER_CAP = [0, 20, 40, 60, 80, 100];
// 升到下一階要幾隻重複（普通最常抽到，所以要最多）
const DUPE = {N: {2: 6, 3: 15}, R: {2: 3, 3: 8}, E: {2: 2, 3: 5}, L: {2: 1, 3: 1, 4: 1, 5: 1}};
const dupeNeed = (id, t) => (DUPE[CH[id].r] || {})[t];
const PPD = {N: 10, R: 20, E: 40, L: 100}; // 進階丹當萬用重複角色：缺幾隻就用幾份丹補
const BRK_MAX = 50,
  BRK_P = {N: 0.03, R: 0.05, E: 0.08, L: 0.15, S: 0.03},
  brkP = id => BRK_P[CH[id].r] || 0.03; // 滿階後每多抽到 1 隻：突破 +1（攻擊 +3%），最多 50
// 傳說碎片：滿階後再抽到重複弟子會給碎片（突破滿了給 2 倍），100 片換一隻自選傳說
const SHV = {N: 1, R: 2, E: 4, L: 10},
  SHARD_COST = 100;
