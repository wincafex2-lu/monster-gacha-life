# 放置塔防：工單 N8　上古凶獸 4 隻＋葫蘆圖示 2 張

狀態：待驗收
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

**排在 N7（山海經神獸）之後**：N7 出現「完成通知」再接。做法、大小、指令**全部照 `ORDER-N7.md`**，只是角色不同：
分支 **`dot/idle-td-n8`**（從 `origin/claude/project-thread-7a7c7v` 開），狀態改「進行中：<誰> <時間>」馬上推。檔案放 `idle-td-art/batch5/images/`。**每張畫好直接推，不用再問。**
網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-7a7c7v/idle-td-art/batch5/ORDER-N8.md

- 風格：四神獸 v2「帥萌大頭」，但要帶「**凶**」的味道（壞笑、尖牙、霸氣），不要恐怖血腥。原創造型。
- 大小：四神獸 1.2 倍；地上的腳底 y≈1150，窮奇（飛）置中。面向右，洋紅底。

## 凶獸

| id | 名字 | 外型（英文貼給 GPT） | 攻擊 f1 / f2 / f3 | 大招圖 |
|---|---|---|---|---|
| taotie | 饕餮（地上） | taotie: a greedy beast with a HUGE wide mouth full of teeth taking up most of its big head, bronze-and-dark-red ancient pattern markings on its body, small curled horns, stubby legs, round belly | f1 opens mouth wide / f2 lunges biting forward / f3 chomps shut, cheeks puffed | 吞天大口：a giant open mouth vortex shape (solid) |
| qiongqi | 窮奇（飛） | qiongqi: a fierce winged tiger, dark grey-purple fur with black stripes, big feathered bat-like wings, sharp grin with fangs, spiky mane | f1 wings raised, claws up / f2 swoops forward slashing / f3 wings beat down, tail lashing | 凶風：sharp dark wind slashes |
| taowu | 檮杌（地上） | taowu: a stubborn huge beast with a boar-like tusked face, long shaggy grey-brown hair covering the body, thick legs, heavy stubborn frown | f1 lowers head, digs in / f2 charges forward with tusks / f3 slams forward, hair flying | 蠻撞：a big ground crack with rocks bursting up |
| hundun | 混沌（地上） | hundun: a round fluffy blob monster with NO face at all (no eyes, no mouth), shaped like a bouncy ball, four short legs, two pairs of small wings on its back, soft gradient of dark purple to deep blue (solid colors) | f1 squashes down / f2 bounces up and forward / f3 lands flat, wings spread | 混沌漩渦：a swirling dark purple vortex (solid shapes) |

## 葫蘆圖示 2 張

畫法照法寶圖示 `ref/ICON__fb_fantian.png`：畫布 1254×1254，洋紅底，物件約占 80% 滿版，置中，略斜 3/4。
- `gourd__closed.png`：a magic gourd with a closed stopper, gold-and-red with cloud patterns, tied with a red cord
- `gourd__open.png`：the SAME gourd with the stopper off, a single thin wisp of solid grey-white smoke coming out of the mouth

## 待辦（檔名）

每隻：`<id>__stand.png` → Claude 寫通過 → `<id>__attack_f1.png`～`_f3.png`（`_f4` Claude 用站立圖補）→ `<id>__ult.png`。順序 taotie → qiongqi → taowu → hundun，最後 `gourd__closed.png`、`gourd__open.png`。共 22 張。

## 意見與待辦

（Claude 驗收後寫在這裡）
- 14:32 台灣時間 饕餮站立 **通過**（巨大嘴巴佔大半個頭、紅銅古紋、小捲角、短腿圓肚；高 936、腳底 1114）→ 可以畫攻擊 f1～f3。
  窮奇站立 **退回**：看起來就是白虎換紫色加翅膀（同一張臉、額頭也有「王」字），玩家會以為是白虎換色。請重畫成一眼分得出來的凶獸（大小、飛的位置不用改）：
  `Redraw this winged beast so it looks clearly DIFFERENT from a white tiger: NO "王" mark on the forehead, a wild spiky dark mane that sticks out like flames, a meaner wolfish face with narrow glowing-yellow eyes, a wide sharp grin showing fangs, small horns, ragged bat-like feathered wings, dark grey-purple fur with jagged black stripes. Keep the same chibi pixel style, same size and position. Solid magenta #FF00FF background.`
- 14:44 台灣時間 窮奇重畫版 **通過**（沒有王字、狼臉黃眼、尖牙獰笑、火焰狀刺毛、小角、破翼，一眼分得出不是白虎）。檮杌站立 **通過**（豬臉獠牙、長灰褐毛、粗腿、倔強皺眉；腳底 1091）。混沌站立 **通過**（毛球無臉、四短腿、兩對小翅、深紫到深藍；腳底 1093）。饕餮攻擊 f1 **通過**（嘴張更大、頭身同站立）。四隻都可以畫攻擊，目前 5/22。
- 14:56 台灣時間 饕餮攻擊 f2（往前撲咬）、f3（嘴合上鼓腮）、`taotie__ult`（紅銅古紋框的吞天漩渦大口）**通過** → 饕餮全收。窮奇攻擊 f1（翅膀舉高、爪子抬起）、f2（往前俯衝揮爪）**通過**（頭臉同站立）。目前 10/22。
- 15:09 台灣時間 窮奇攻擊 f3（翅膀往下拍、甩尾）、`qiongqi__ult`（紫黑凶風斬）**通過** → 窮奇全收。檮杌攻擊 f1（低頭蹬地）、f2（獠牙往前衝）**通過**（頭臉同站立）。目前 14/22。
- 15:21 台灣時間 檮杌攻擊 f3（往前撞、毛飛）、`taowu__ult`（地裂岩石爆起）**通過** → 檮杌全收。混沌攻擊 f1（壓扁）、f2（彈起往前）、f3（落地攤平、翅膀張開）**通過**（無臉、毛色同站立）。目前 19/22，剩 `hundun__ult`、`gourd__closed`、`gourd__open`。
