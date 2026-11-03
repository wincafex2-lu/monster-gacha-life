# 放置塔防第二批點陣圖：工單 B3　攻擊陣 6＋防禦陣 6

狀態：待接手（`ORDER-B2.md`（塔）出現「完成通知」後才接）
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

## 意見與待辦

（Claude 驗收後寫在這裡）
