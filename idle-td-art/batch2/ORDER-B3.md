# 放置塔防第二批點陣圖：工單 B3　攻擊陣 6＋防禦陣 6

狀態：進行中：ChatGPT B3 陣法（10/24）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-giiil5`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-giiil5/idle-td-art/batch2/ORDER-B3.md
2. 從 `origin/claude/project-thread-giiil5` 開分支 **`dot/idle-td-b3`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-b3`。
3. 用同一個 ChatGPT 對話畫，一張畫好就推，放 `idle-td-art/batch2/images/`，檔名照「待辦」。
4. **不用停下來等驗收**：照待辦順序一張接一張畫、畫好就推。Claude 每張都會看，有問題寫在「意見與待辦」，每推一張就 fetch 一次看意見，有意見先改。背景洋紅有色差不用修。
5. 全部交完狀態改「待驗收」；看到「完成通知」就停，這批結束。

## 每個陣畫 2 張

1. **俯視圖示** `<代號>__icon.png`：正上方往下看的圓形法陣，畫滿 1254×1254 的正圓（直徑約 1150px，置中）。抽卡圖示和圖鑑用。
2. **地面陣** `<代號>__ground.png`：**同一個法陣平躺在地上**，從側面低角度看成扁橢圓：寬約 1150px、高約 360px，橢圓中心在 y≈978（就是角色腳底那條線）。戰場上畫在角色腳下。

## 鎖死規則（不准改）

- 像素粗細、畫風照 **`ref/STANDARD__t2__stand.png`**，像同一款遊戲。
- 法陣是**刻在地上／畫在地上的符文圖案**：線條、符文、圖騰清楚，用**實心顏色**畫，**不要發光、不要光暈、不要漸層霧、不要粒子**（發光、轉動、閃爍全部程式做）。
- 攻擊陣用暖色、尖銳的圖騰；防禦陣用冷色、圓滑的圖騰。每個陣主色不同，縮成 64px 也認得出來。
- 背景純洋紅 `#FF00FF`；法陣裡面空的地方也要是洋紅（只畫線條和圖騰，不要畫實心底盤）。
- 不要文字（符文可以，但不要真的中文字或英文字）。
- 每次畫都附 `ref/STANDARD__t2__stand.png` 放第一張，指令開頭貼：

```
Draw a magic circle (a formation array drawn on the ground) for the SAME game as the attached image, in EXACTLY the same pixel-art style: same pixel size, same painterly hue-shifted shading, same thin colored outlines, same soft rich palette.
Only solid-colored lines, runes, rings and emblems. NO glow, no light rays, no gradient fog, no particles, no sparkles (code adds glow and spinning). No real letters or Chinese characters.
The empty areas inside the circle must stay background color. Solid flat magenta #FF00FF background, 1254x1254.
```

## 陣法設計

| # | 代號 | 名字 | 類型 | 英文（貼給 GPT） |
|---|---|---|---|---|
| 1 | a_fire | 烈焰陣 | 攻擊 | red and orange: three rings, flame-shaped spikes around the outer ring, a phoenix-feather emblem in the center, small flame runes between the rings |
| 2 | a_thunder | 雷霆陣 | 攻擊 | purple and gold: zigzag lightning-bolt spokes, a thunder-drum emblem in the center, cloud-swirl runes on the outer ring |
| 3 | a_sword | 萬劍陣 | 攻擊 | silver and steel blue: eight small swords pointing outward like a compass, a crossed-swords emblem in the center, sharp triangle runes on the rings |
| 4 | a_frost | 寒冰陣 | 攻擊 | icy cyan and white: a big six-pointed snowflake shape, ice-shard spikes on the outer ring, a crystal emblem in the center |
| 5 | a_poison | 毒霧陣 | 攻擊 | toxic green and dark purple: thorny vine ring, a mischievous skull-mushroom emblem in the center (cute, not scary), bubble-shaped runes |
| 6 | a_wind | 風刃陣 | 攻擊 | jade green and white: curved crescent blade shapes spiraling around like a whirlwind, a fan emblem in the center |
| 7 | d_gold | 金鐘陣 | 防禦 | gold and warm white: a big bell-shaped emblem in the center, a solid double ring with small square studs, rounded petal runes |
| 8 | d_lotus | 回春陣 | 防禦 | pink and leaf green: a blooming lotus flower made of rounded petals in the center, a ring of round leaves, gentle dot runes |
| 9 | d_rock | 岩盾陣 | 防禦 | earth brown and amber: a hexagonal shield emblem in the center, a ring of stacked round stones, mountain-shaped runes |
| 10 | d_mirror | 水鏡陣 | 防禦 | blue and silver: concentric ripple rings like water, a round mirror emblem in the center, wave runes |
| 11 | d_taiji | 太極陣 | 防禦 | black and white with soft gray-blue: a yin-yang (taiji) emblem in the center surrounded by the eight trigram symbols on a ring |
| 12 | d_star | 星辰陣 | 防禦 | deep navy and pale gold: a ring of small round stars connected by thin lines like constellations, a crescent moon emblem in the center |

## 待辦（照順序，每個陣先俯視再地面）

| # | 檔名（`idle-td-art/batch2/images/`） | 內容 | 附圖 |
|---|---|---|---|
| 1 | `a_fire__icon.png` | 烈焰陣俯視（畫完先停，等驗收） | 標準圖 |
| 2 | `a_fire__ground.png` | 烈焰陣地面 | 標準圖＋`a_fire__icon.png` |
| 3 | 其餘 11 個陣照表格順序，各 `__icon.png`、`__ground.png` | | 同上 |

俯視指令（接在鎖死那段後面）：

```
Array: <英文>
Seen from directly above: a perfect circle about 1150 px wide, centered on the canvas.
```

地面指令（附標準圖＋已通過的俯視圖）：

```
Image 2 is the approved top-down view of this magic circle. Draw the SAME circle lying flat on the ground, seen from a low side angle: a flat ellipse about 1150 px wide and 360 px tall, its center at y=978. Same rings, runes, emblem and colors as image 2, just squashed by perspective. No glow, no effects, magenta background.
```

GPT 畫歪時可以回它：
- 發光或霧：`Remove all glow, light, fog and sparkles. Only solid-colored lines and emblems.`
- 底盤塗滿：`Keep the empty spaces inside the circle magenta. Only lines, runes and emblems.`
- 地面版圖案不同：`The ellipse must be exactly the same design as image 2, only squashed.`

## 驗收重點

- 和標準圖要像同一款遊戲（像素粗細、描邊）。
- 沒有發光、霧、粒子；裡面空的地方是洋紅。
- 地面版和俯視版是同一個圖案；橢圓寬高照規定。
- 12 個陣縮小後一眼分得出來。

## 交付紀錄

- 本第二批專用 ChatGPT 工作對話使用 ImageGen 製作；每次第一張參考均為標準圖。
- 以下交付為生成原始 PNG；不縮放、不裁切、不以程式繪製美術。實際尺寸照下表，原圖另行保留。
- 依使用者 2026-11-04 03:30 UTC 指示及固定流程第 4 步，逐張繪製上傳、不中停等驗收；每次推送後 fetch 意見，有修訂先處理。

| 檔案 | 實際畫布 | 格數 | 交付說明 |
|---|---|---|---|
| `images/a_fire__icon.png` | 1254×1254 | 1 | 烈焰陣俯視：三圈紅橙線、八枚外側火焰尖角、圈間火紋與中央鳳凰羽，空隙洋紅，無光效。 |
| `images/a_fire__ground.png` | 1254×1254 | 1 | 烈焰陣地面：三圈、八個外角與鳳凰羽一致；ImageGen 修訂後圖案約 1170×341 px、中心 y≈922（目標約 978，待驗收對齊）。原圖未程式縮放或移位。 |
| `images/a_thunder__icon.png` | 1254×1254 | 1 | 雷霆陣俯視：紫金雙環、八道鋸齒雷紋、八枚雲紋與中央雷鼓圖騰；空隙洋紅，無發光。 |
| `images/a_thunder__ground.png` | 1254×1254 | 1 | 雷霆陣地面：同一紫金雙環、八雷紋與八雲紋，中央雷鼓及雙鼓棒一起平躺透視，內部洋紅。 |
| `images/a_sword__icon.png` | 1254×1254 | 1 | 萬劍陣俯視：八柄朝外銀藍小劍、雙圈三角符、中央交叉雙劍，空白洋紅，無光效。 |
| `images/a_sword__ground.png` | 1254×1254 | 1 | 萬劍陣地面：八柄外劍、雙環三角符與中央雙劍對應俯視圖，全部同平面透視。 |
| `images/a_frost__icon.png` | 1254×1254 | 1 | 寒冰陣俯視：六支分叉雪花臂、六枚主冰晶尖、中央菱晶與冰藍雙環，鏤空洋紅，無冰霧或光暈。 |
| `images/a_frost__ground.png` | 1254×1254 | 1 | 寒冰陣地面：六支雪花臂、六枚主冰晶與間隙小冰晶均對應俯視圖，冰藍雙環及中央菱晶平躺透視。 |
| `images/a_poison__icon.png` | 1254×1254 | 1 | 毒霧陣俯視：紫綠荊棘環、八組泡泡符文、中央可愛蘑菇骷髏；空隙洋紅，未加毒霧或光效。 |
| `images/a_poison__ground.png` | 1254×1254 | 1 | 毒霧陣地面：八組泡泡符文、紫綠荊棘及蘑菇骷髏同平面透視；原圖橢圓高約 460 px，較 360 px 目標高，未程式縮放。 |

交付檔 SHA-256：

- `a_fire__icon.png`：`2370f07eaabb82911b6d7086102dfc26cf08c806d8d14f79b44f3a2d88203fc2`
- `a_fire__ground.png`：`d2d1180948bc10526401183c0b7c8dde16e6101dfe390ce1005554fe19287bd1`
- `a_thunder__icon.png`：`4959c0394979e3f9ebdc71f7474ee826853cd319fea65ad2b0ed92fea99b31b6`
- `a_thunder__ground.png`：`768f2371b1535ab242492b828f676fb587a756b5544e135c7e12ec13f2436bdb`
- `a_sword__icon.png`：`c14160b25f34c99a962b703f737ca545e8aa0d3c6427409e26c626f3cd4ed652`
- `a_sword__ground.png`：`7abe4a3d50ae7bfbe00d9e467197963d021c0ab6ad4e3327a64b76411b11a214`
- `a_frost__icon.png`：`e5661af78f5c6c5d5d024f3a36aa57ea81235515a5d929d896acd40775ae93a2`
- `a_frost__ground.png`：`65a18b814df4ad838021131b782aeec6908971a5b57b0370762a9f9b52c0af9c`
- `a_poison__icon.png`：`03e8eb4554014da856940af24346a26d26cea40f8e03e45fc7a28f915eb0efcc`
- `a_poison__ground.png`：`d3002b8920d3bf1ab9499bdd3227cd8caf7b6b9f0b215cbf15d0553112511e47`

## 意見與待辦

（Claude 驗收後寫在這裡）
- 2026-11-04 12:05 TW　**`a_fire__icon.png`、`a_fire__ground.png` 通過**：兩張是同一個法陣（火羽中心、雙環、火焰符、外圈火焰尖），沒有光暈，圈內空白是乾淨的洋紅。地面陣橢圓中心在 y≈922（要求 978，高 339，要求 360）；程式會照每張的外框對齊，所以不用重畫，後面 11 組盡量放在 y≈978、高約 360。繼續畫下一組，不用停。
