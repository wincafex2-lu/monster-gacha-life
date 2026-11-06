# 放置塔防：工單 N6　三位新傳說 攻擊格＋投射物＋道具＋大招特效

狀態：待接手（工單 N5 出現「完成通知」後再接）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

楊戩、哪吒、敖丙的站立圖在 N5 已通過（分支 `dot/idle-td-n5` 的 `idle-td-art/batch5/images/<id>__t<N>__stand.png`）。這張畫攻擊格、投射物、哮天犬、道具和大招。
流程、驗收標準照 `README.md`（工單 N1）；分支 **`dot/idle-td-n6`**（從 `origin/claude/project-thread-7a7c7v` 開），狀態改「進行中：<誰> <時間>」馬上推。檔案放 `idle-td-art/batch5/images/`。**每張畫好直接推，不用再問。**
網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-7a7c7v/idle-td-art/batch5/ORDER-N6.md

## 很重要：原創

招式點子可以參考神話故事和電影，但**造型、配色、特效的樣子一律原創，不准照抄任何電影或動畫的畫面**。照下面的描述畫。

## A. 攻擊格（54 張）

- 用**已通過的站立圖逐格改**，頭、臉、身體、腿、腳、衣服、大小、位置完全不動，只動手臂和武器（指令照 `README.md`「攻擊圖指令」）。飄帶、披風、紅綾、尾巴可以擺一點。
- 1 階：附該角色 1 階站立，照下面的動作畫 f1、f2、f3。
- 2～6 階：附圖 A＝該階站立、圖 B＝已通過的 1 階同一格（6 階用 `ORDER-N3.md` 的 6 階攻擊指令）。
- 第 4 格不用畫（程式用站立圖）。武器一直在**前手**。
- 不畫刀光、火焰噴出去、冰霧（程式加）。

| 角色 | f1 | f2 | f3 |
|---|---|---|---|
| 楊戩 yangjian | 雙手把三尖刀舉過頭頂（蓄力） | 往前下方斜劈，刀尖到身體前下方 | 收回來往前平刺，刀伸直向右 |
| 哪吒 nezha | 前手把乾坤圈拉到耳朵後面（準備丟），後手握拳 | 手往前甩出去，手掌張開、**手上沒有圈**（圈由程式飛出去） | 手順勢往下收，後手握拳在腰邊 |
| 敖丙 aobing | 前手把冰杖舉高，後手掌心朝前 | 冰杖往前指向右邊 | 冰杖往旁邊橫掃，後手張開 |

英文動作（貼進 `<動作>`）：
- yangjian：f1 `raising the three-pointed blade high above the head with both hands (wind-up)`；f2 `slashing diagonally down and forward, blade tip in front of the body, low`；f3 `thrusting the blade straight forward to the right, arm extended`
- nezha：f1 `pulling the golden ring back behind the ear, ready to throw; back hand in a fist`；f2 `arm swung forward, hand open and EMPTY (the ring has been thrown, do not draw it)`；f3 `arm following through downward, hand empty; back hand fist at the waist`
- aobing：f1 `raising the staff high, back hand palm forward`；f2 `pointing the staff straight forward to the right`；f3 `sweeping the staff sideways, back hand open`

檔名：`<id>__t<N>__attack_f1.png`～`_f3.png`，N＝1～6。

## B. 投射物（3 張，1254×1254 洋紅底，**指向右邊**，實色、不發光、不畫拖尾）

| 檔名 | 內容 | 英文 |
|---|---|---|
| `p_qiankun.png` | 哪吒的金圈（正面看是圓環），刻蓮紋，掛一小條紅布 | a golden ring seen from the front with lotus carvings and a short red ribbon tied on it, flying to the right |
| `p_icepearl.png` | 敖丙的冰珠：淡藍冰晶球，表面有龍鱗紋，後面拖三片小冰片 | a pale-blue ice pearl with dragon-scale patterns, three small ice shards trailing behind it, flying to the right |
| `p_skyeye.png` | 楊戩天眼神光：金白色的眼睛形狀光束（實色），細長往右 | a long thin golden-white beam shaped like an eye (solid colors, no glow), pointing right |

## C. 道具（8 張，1254×1254 洋紅底，**面向右邊**）

哮天犬（原創造型）：銀灰色細長獵犬、深藍項圈掛銀鈴、尖耳、尾巴長，帥氣不兇。大小：站著時身高約楊戩的一半，腳底 y≈978。

| 檔名 | 內容 |
|---|---|
| `dog_run_f1.png`～`dog_run_f4.png` | 往右跑的 4 格循環（f1 前腳伸、f2 四腳收、f3 後腳蹬、f4 騰空） |
| `dog_bite_f1.png`、`dog_bite_f2.png` | f1 張大嘴往前撲、f2 咬住（嘴合上、頭往下甩） |
| `wheel_firetrail.png` | 風火輪後面拖的一條實色火焰尾巴，橫的，火尾往**左**飄（輪子不用畫） |
| `ice_dragon.png` | 冰龍虛影：一條很大的淡藍冰龍往右飛，身體半透明感（畫成淺色實色），佔滿畫面寬 |

英文狗：`an original silver-grey slim hunting hound with pointed ears, a long tail and a dark-blue collar with a small silver bell, cool not scary, side view facing right`

## D. 大招特效（4 張，每張 6 格，3×2 排在 1536×1024 上，跟第三批 C4 一樣）

只畫特效，不畫人物（人物由程式擺）。洋紅底、實色卡通上色、不畫發光暈。格子順序左上→右上→左下→右下。

| 檔名 | 招式 | 6 格內容 |
|---|---|---|
| `ult_yangjian.png` | 天眼劈山 | 1 額頭金色豎眼張開 → 2 一道金白天眼光柱往前射 → 3 巨大的半透明三尖刀從天上出現 → 4 往下劈 → 5 地面裂成一條大裂縫、石塊飛起 → 6 裂縫收合、碎石落下 |
| `ult_nezha.png` | 蓮火衝陣 | 1 腳下兩個火輪轉起來 → 2 拖著火尾往前衝 → 3 紅綾變長捲住一片 → 4 乾坤圈變巨大砸下 → 5 地上噴出一根大火柱 → 6 火柱散成蓮花瓣形的火焰 |
| `ult_aobing.png` | 萬龍冰鱗 | 1 身後冰晶六角環亮起（實色） → 2 冰龍盤起來 → 3 冰龍張口噴出大量冰鱗片 → 4 冰鱗像暴風往前捲 → 5 前方地面結出冰刺 → 6 冰刺碎成冰晶 |
| `ult_icefire.png` | 冰火合璧（哪吒＋敖丙合擊） | 1 左紅火焰、右藍冰各一團 → 2 兩團往中間轉 → 3 繞成一個紅藍太極圓 → 4 太極圓變大往前推 → 5 爆開成紅藍兩色的花瓣與冰片 → 6 餘燼和冰晶落下 |

> **注意（泓 11/06 08:00）：哪吒風火輪踩在腳下。** 哪吒 3～6 階站立正在重改（見 ORDER-N5），哪吒攻擊格等那四張通過再畫，攻擊格腳和輪子也要跟改好的站立一樣。

## 待辦（順序）

1. 楊戩 1 階攻擊 f1～f3 → 2～6 階攻擊
2. 哪吒 1 階攻擊 f1～f3 → 2～6 階攻擊
3. 敖丙 1 階攻擊 f1～f3 → 2～6 階攻擊
4. 投射物 3 張 → 道具 8 張 → 大招 4 張

共 69 張。每位先交 1 階 f1～f3，Claude 寫通過再畫 2～6 階；等的時候可以先畫下一位的 1 階。

## 意見與待辦

（Claude 驗收後寫在這裡）
- 08:07 台灣時間 楊戩 1 階攻擊 f1 **通過**（頭、身體、腳跟站立一樣大，腳底 967；雙手把三尖刀舉過頭、刀從前手出）。繼續 f2、f3。
- 08:16 台灣時間 楊戩 1 階攻擊 f2 **通過**（頭頂 270、腳底 976 跟站立一樣；雙手握刀往前下方，刀尖在身前低處）。繼續 f3。
- 08:23 台灣時間 楊戩 1 階攻擊 f3 **通過**（頭頂 270、腳底 967；雙手握刀往前平刺）。楊戩 1 階攻擊全收，下一步 2～6 階攻擊（圖 A＝該階站立、圖 B＝1 階同一格；6 階用 ORDER-N3 的 6 階指令）。可以同時先畫敖丙 1 階攻擊。
- 08:41 台灣時間 楊戩 2 階攻擊 f1、f2 **通過**（頭頂、腳底跟 1 階同格一樣；深藍銀邊袍、鐵三尖刀）。繼續 f3。哪吒站立已改好，哪吒攻擊格可以開始畫（腳和冒火輪子跟新站立圖一樣）。
- 08:52 台灣時間 楊戩 2 階 f3、3 階 f1～f3 **通過**（頭頂、腳底跟站立一樣，3 階 f2 最低點 1009 是刀穗不是腳；披風、銀冠、藍穗保留，動作跟 1 階一致）。下一步 4～6 階攻擊。
- 09:02 台灣時間 楊戩 4 階 f1～f3、5 階 f1 **通過**（頭頂、腳底跟站立一樣，4 階 f2 最低點 997 是刀穗；金邊銀甲、雙層披風、金色天眼、白羽冠保留，動作跟 1 階一致）。繼續 5 階 f2、f3 和 6 階。
- 09:13 台灣時間 楊戩 5 階 f2、f3，6 階 f1、f2 **通過**（頭頂、腳底跟站立一樣，最低點 1010／1025 是刀尖和刀穗；白羽冠、金盾翼、銀眼紋圓環、巨大雲紋刀保留，動作跟 1 階一致）。繼續 6 階 f3。
- 09:25 台灣時間 楊戩 6 階 f3 **通過** → **楊戩 18 格全收**。哪吒 1 階 f1～f3 **通過**（頭 95～97% 同像素、腳底 978；圈拉到耳後→空手往前甩→手往下收）→ 下一步哪吒 2～6 階（3～6 階用新的踩輪站立，輪子和火跟站立一樣）。敖丙 1 階 f1 **通過**（頭 96% 同像素、腳底 986；杖舉高、後手掌心朝前）→ 繼續 f2、f3。
- 09:37 台灣時間 敖丙 1 階 f2、f3 **通過**（頭 96～98% 同像素、腳底 986；杖往前指→橫掃）→ 敖丙 1 階全收，下一步 2～6 階。哪吒 2 階 f1～f3、3 階 f1 **通過**（頭 95～97% 同像素、腳底同站立；3 階踩輪和火都保留）。繼續哪吒 3 階 f2 起。
- 09:50 台灣時間 哪吒 3 階 f2、f3，4 階 f1～f3 **通過**（頭 94～97% 同像素、腳底同踩輪站立；冒火風火輪保留，動作跟 1 階一致）。繼續哪吒 5、6 階。
- 10:01 台灣時間 哪吒 5 階 f1～f3、6 階 f1 **通過**（頭 90～93% 同像素、頭頂和腳底同站立；蓮花冠、紅綾大圓、冒火輪、6 階金蓮花保留）。繼續 6 階 f2、f3。
- 10:12 台灣時間 哪吒 6 階 f2、f3 **通過** → **哪吒 18 格全收**。敖丙 2 階 f1～f3 **通過**（頭 92～95% 同像素、腳底 986；冰晶杖、冰藍袍保留，動作跟 1 階一致）。繼續敖丙 3～6 階。
- 10:24 台灣時間 敖丙 3 階 f1～f3、4 階 f1、f2 **通過**（頭 89～95% 同像素、腳底同站立；銀鱗肩甲、淡青披風、4 階小冰龍和冰晶長杖保留）。繼續 4 階 f3、5、6 階。
- 10:37 台灣時間 敖丙 4 階 f3、5 階 f1～f3、6 階 f1、f2 **通過**（頭頂、腳底同站立，臉一樣大；銀龍冠、冰龍、龍頭冰晶杖、6 階六角冰環和雙龍保留，動作跟 1 階一致）。繼續 6 階 f3，之後投射物、道具、大招。
- 10:48 台灣時間 敖丙 6 階 f3 **通過** → **攻擊格 54 張全收**。投射物 `p_qiankun`（金蓮紋圈＋紅布）、`p_icepearl`（龍鱗冰珠＋三片冰片）、`p_skyeye`（金白眼形光束）**通過**（實色、指向右）。下一步道具 8 張（哮天犬跑 4、咬 2、火尾、冰龍），再大招 4 張。
- 11:01 台灣時間 哮天犬 6 張（dog_run_f1～f4、dog_bite_f1～f2）**退回重畫**：畫成寫實細長的灰狗，跟遊戲的 Q 版角色放一起畫風不搭；每格腳底高低不一（851～963，要 978）；跑步 f2 像趴著。
  重畫方式：先畫 `dog_run_f1.png` 當定稿，附 `ref/BEAST__baihu__stand.png`（神獸 Q 版畫風）和 `yangjian__t1__stand.png`（大小參考）：
  `Draw an original CHIBI hound in the SAME cute pixel-art style as image 1 (big head about 40% of the body height, short legs, round chunky shapes, same outline and shading). Silver-grey fur, pointed ears, long fluffy tail, a dark-blue collar with a small silver bell, cool and loyal, not scary. Side view facing RIGHT, running pose: front legs stretched forward, back legs pushing. Size: about half as tall as the character in image 2 (about 330-360 px tall). Paws on the ground line at y=978. Solid magenta #FF00FF background, no effects, no text.`
  f1 通過後，其他 5 格**用 f1 直接改**（頭、身體、毛色、項圈完全一樣，只動腳、尾巴、嘴）：f2 四腳收在肚子下、f3 後腳蹬地前腳離地、f4 四腳離地騰空（最低點離地不超過 30px）；bite_f1 張大嘴往前撲、bite_f2 咬合頭往下甩。除了 f4，腳底都在 y=978。
- 11:12 台灣時間 哮天犬 Q 版 `dog_run_f1` **通過定稿**（大頭、蓬鬆銀灰毛、深藍項圈銀鈴，跟神獸同畫風；腳底 1006，**其他 5 格腳底都對齊 1006**，用這張直接改，頭身毛色項圈不變）。`wheel_firetrail`（火尾往左、實色）、`ice_dragon`（淡藍冰龍往右）**通過**。`ult_yangjian` 6 格 **通過**（豎眼→天眼光→天降三尖刀→下劈帶金色弧→地裂石飛→碎石落下）。目前 61/69，剩狗 5 格、大招 3 張。
