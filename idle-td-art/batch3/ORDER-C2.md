# 放置塔防第三批點陣圖：工單 C2　命中與元素特效 9 條

狀態：待接手（`README.md`（C1 投射物）出現「完成通知」後才接）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-njd0fg`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-njd0fg/idle-td-art/batch3/ORDER-C2.md
2. 從 `origin/claude/project-thread-njd0fg` 開分支 **`dot/idle-td-c2`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-c2`。
3. 用同一個 ChatGPT 對話畫，一張畫好就推，放 `idle-td-art/batch3/images/`，檔名照「待辦」。
4. **不用停下來等驗收**：照待辦順序一張接一張畫、畫好就推。每推一張就 fetch 一次看意見，有意見先改。大小、置中、背景色差不用修。
5. 全部交完狀態改「待驗收」；看到「完成通知」就接 `ORDER-C3.md`。

## 用途

每條是一個特效的 4 格動畫：怪物被打中時用小的；陣法觸發、大招時程式把同一條放大、加閃光和震動。所以**畫得清楚、形狀大膽**，不用畫得很細碎。

## 鎖死規則（不准改）

- 像素粗細、描邊、上色照 **`ref/STANDARD__t2__stand.png`**，像同一款遊戲。
- 排法照 **`ref/LAYOUT__attack-strip.png`**：4 格並排在一張圖，格子之間留空隙，每格的特效中心在同一個位置（只拿它當間距參考，不要畫那個角色）。
- 4 格是**出現 → 最大 → 散開 → 快消失**。第 4 格只剩一點點碎片。
- 用**實心色塊**畫（2～4 個色階的卡通分色），邊緣清楚。**不要柔光、不要霧狀漸層、不要半透明**（亮光和發光由程式疊加）。
- 每格特效大小約女孩本體高的 60%（約 420px）。
- 背景純洋紅 `#FF00FF`；特效裡**不要用洋紅、粉紫色**（會被去背去掉）。不要文字、不要畫角色或怪物。
- 每次畫都附 2 張：`ref/STANDARD__t2__stand.png`、`ref/LAYOUT__attack-strip.png`，指令開頭貼：

```
Draw a 4-frame HIT EFFECT animation for the SAME game as image 1, in EXACTLY the same pixel-art style: same pixel size, same painterly shading, same thin colored outlines.
Frames side by side in ONE image with clear empty space between frames, same frame spacing and frame size as image 2 (image 2 is ONLY a layout reference; do not draw that character).
Frame 1 appears, frame 2 is the biggest, frame 3 breaks apart, frame 4 is almost gone (only a few small bits). Each frame centered at the same spot, about 420 px across at its biggest.
Bold readable shapes in solid cel-shaded color bands with crisp edges. NO soft glow, no gradient fog, no transparency (code adds glow). Do not use magenta or pink-purple inside the effect.
Solid flat magenta #FF00FF background. No characters, no monsters, no text.
```

## 特效設計

| # | 代號 | 名字 | 英文（貼給 GPT） |
|---|---|---|---|
| 1 | fx_slash | 斬擊 | a sharp white-and-pale-blue crescent sword slash arc sweeping diagonally, with a few small triangular shards |
| 2 | fx_blunt | 重擊 | a chunky yellow-white star-shaped impact burst with short thick spikes and round dust puffs (warm beige) |
| 3 | fx_fire | 火 | an orange-red fire explosion: flame tongues bursting outward, yellow core, dark red edges, small embers in frame 3-4 |
| 4 | fx_ice | 冰 | cyan ice crystals bursting out of a center point like a frozen flower, then shattering into shards |
| 5 | fx_thunder | 雷 | a purple-and-yellow lightning strike coming from above with zigzag branches, a jagged spark burst where it lands |
| 6 | fx_poison | 毒 | a toxic green bubbling cloud with round bubbles and a few dark purple drips (cute, not gross) |
| 7 | fx_wind | 風 | jade-green and white spiraling wind blades forming a small whirlwind, curved leaf shapes flying |
| 8 | fx_heal | 治療 | soft green and gold rising plus-shaped sparkles and leaf petals floating upward from the bottom |
| 9 | fx_stun | 定身 | a yellow paper talisman pattern ring with golden chains wrapping in a circle, small spinning stars on top |

## 待辦（照順序畫）

| # | 檔名（`idle-td-art/batch3/images/`） | 內容 |
|---|---|---|
| 1 | `fx_slash.png` | 斬擊 4 格 |
| 2 | 其餘 8 條照表格順序，檔名 `<代號>.png` | |

指令（接在鎖死那段後面）：

```
Effect: <英文那一格>
```

GPT 畫歪時可以回它：
- 霧狀、發光：`No soft glow or fog. Only crisp solid color shapes in 2-4 cel-shaded bands.`
- 格子數不對：`Exactly 4 frames side by side, with empty space between them.`
- 畫了角色：`Only the effect itself, no characters or monsters.`

## 驗收重點

- 像同一款遊戲；4 格、格子分開、中心對齊。
- 出現→最大→散開→快消失，第 4 格很小。
- 實心色塊、邊緣清楚、沒有洋紅色；9 條縮小後一眼分得出元素。

## 意見與待辦

（Claude 驗收後寫在這裡）
- 2026-11-04 13:10 TW　**`fx_slash`、`fx_blunt` 通過。** 4 格出現→最大→散開→快消失都對，實心色塊、邊緣清楚，沒有洋紅色，格子沒有互相伸進去。繼續照順序畫，不用停。
