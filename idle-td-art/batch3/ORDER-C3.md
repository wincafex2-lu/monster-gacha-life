# 放置塔防第三批點陣圖：工單 C3　UI 21 張

狀態：待接手（`ORDER-C2.md`（特效）出現「完成通知」後才接）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-njd0fg`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-njd0fg/idle-td-art/batch3/ORDER-C3.md
2. 從 `origin/claude/project-thread-njd0fg` 開分支 **`dot/idle-td-c3`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-c3`。
3. 用同一個 ChatGPT 對話畫，一張畫好就推，放 `idle-td-art/batch3/images/`，檔名照「待辦」。
4. **不用停下來等驗收**：照待辦順序一張接一張畫、畫好就推。每推一張就 fetch 一次看意見，有意見先改。大小、置中、背景色差不用修。
5. 全部交完狀態改「待驗收」；看到「完成通知」就接 `ORDER-C4.md`。

## 鎖死規則（不准改）

- 像素粗細、描邊、上色照 **`ref/STANDARD__t2__stand.png`**，像同一款遊戲。整體風格：**修仙小門派**，木頭、玉、金邊、雲紋、卷軸，給 9～11 歲，華麗但清楚。
- **圖上絕對不要有字**（中文、英文、數字都不要），字由程式打。
- 外框類（按鈕、面板、卡框、血條、大招框）**中間空的地方是洋紅**，只畫外框。外框四邊粗細一樣，方便程式拉長。
- 不要光暈、不要霧狀漸層、不要半透明（程式加）。
- 背景純洋紅 `#FF00FF`；圖裡不要用洋紅、粉紫色。
- 每次畫都附 `ref/STANDARD__t2__stand.png`，指令開頭貼：

```
Draw a GAME UI element for the SAME game as the attached image, in EXACTLY the same pixel-art style: same pixel size, same painterly hue-shifted shading, same thin colored outlines, same soft rich palette.
Theme: a cute xianxia cultivation sect for kids aged 9-11: wood, jade, gold trim, cloud patterns, scrolls. Rich but very clear and readable.
ABSOLUTELY NO text, letters or numbers anywhere. No glow, no gradient fog, no transparency. Do not use magenta or pink-purple in the element.
Frames and bars: the empty inside stays magenta, only the border is drawn, border equally thick on all sides.
Solid flat magenta #FF00FF background.
```

## 待辦（照順序畫）

| # | 檔名（`idle-td-art/batch3/images/`） | 畫布 | 內容（英文貼給 GPT） |
|---|---|---|---|
| 1 | `res_coin.png` | 1254×1254 | 銅錢：`resource icon: a stack of three round bronze coins with square holes, filling about 80% of the canvas` |
| 2 | `res_spirit.png` | 1254×1254 | 靈石：`resource icon: a cluster of three glowing-blue faceted spirit crystals (solid colors), filling about 80% of the canvas` |
| 3 | `res_pill.png` | 1254×1254 | 進階丹：`resource icon: a red-gold upgrade elixir pill on a tiny jade dish, filling about 80% of the canvas` |
| 4 | `res_gatestone.png` | 1254×1254 | 山門石：`resource icon: a chunky gray-blue carved stone brick with a small gold cloud emblem, filling about 80% of the canvas` |
| 5 | `res_beastsoul.png` | 1254×1254 | 獸魂：`resource icon: a pale-teal flame-shaped beast spirit wisp with two small cute eyes and tiny ears, filling about 80% of the canvas` |
| 6 | `res_soulcrystal.png` | 1254×1254 | 魂晶：`resource icon: a violet-and-gold hexagonal soul crystal set in a gold frame, filling about 80% of the canvas` |
| 7 | `el_fire.png` | 1254×1254 | `element icon FIRE: a round badge with a red flame emblem, gold rim, filling about 80% of the canvas` |
| 8 | `el_ice.png` | 1254×1254 | `element icon ICE: a round badge with a cyan snowflake emblem, silver rim` |
| 9 | `el_thunder.png` | 1254×1254 | `element icon THUNDER: a round badge with a yellow lightning bolt on purple, gold rim` |
| 10 | `el_poison.png` | 1254×1254 | `element icon POISON: a round badge with a green drop and bubbles on dark purple, silver rim` |
| 11 | `el_wind.png` | 1254×1254 | `element icon WIND: a round badge with a jade swirl emblem on white, jade rim` |
| 12 | `ui_ult_frame.png` | 1254×1254 | 大招按鈕框：`a round ultimate-skill button frame: thick gold-and-jade ring with cloud ornaments and a small flame crest on top, the inside circle (about 70% of the width) left empty magenta` |
| 13 | `card_common.png` | 1024×1536 | 普通卡框：`a vertical character card frame, simple wood border with small bronze corners, the inner area empty magenta` |
| 14 | `card_rare.png` | 1024×1536 | 稀有卡框：`a vertical character card frame, polished blue jade border with silver corners and cloud patterns, the inner area empty magenta` |
| 15 | `card_legend.png` | 1024×1536 | 傳說卡框：`a vertical character card frame, ornate gold border with red gems, dragon-and-phoenix corner ornaments, a crown crest on top, the inner area empty magenta` |
| 16 | `card_back.png` | 1024×1536 | 卡背：`the back of a gacha card: dark teal with a gold taiji-and-cloud pattern in the center and a gold border, fully filled (not empty)` |
| 17 | `ui_panel.png` | 1254×1254 | 面板框：`a square UI panel frame like an unrolled scroll / carved wood board border with gold corner brackets, the inside empty magenta, border equally thick on all four sides` |
| 18 | `ui_button.png` | 1536×1024 | 按鈕：`a wide rounded rectangular button, jade green with gold trim and a slight 3D bevel, fully filled (no text)` |
| 19 | `bar_gate.png` | 1536×1024 | 山門血條框：`a long horizontal health bar frame for the sect gate: wooden beam with a small gate-roof ornament on the left end, the inner bar area empty magenta, centered on the canvas, about 1400 px wide and 160 px tall` |
| 20 | `bar_boss.png` | 1536×1024 | Boss 血條框：`a long horizontal boss health bar frame: dark iron with red trim and a small horned skull ornament on the left end (cute, not scary), the inner bar area empty magenta, centered, about 1400 px wide and 160 px tall` |
| 21 | `gacha_altar.png` | 1536×1024 | 抽卡祭壇：`a full scene: a xianxia gacha altar on a mountain top — a round stone altar with a big bronze incense cauldron in the middle, jade pillars, clouds and a sunset sky. Empty space in front of the cauldron for cards to appear. Fully filled scene, no magenta background` |

指令（接在鎖死那段後面）：

```
Element: <內容那一格的英文>
Canvas: <畫布>
```

GPT 畫歪時可以回它：
- 有字：`Remove ALL text, letters and numbers.`
- 外框中間被塗滿：`Keep the inside empty magenta. Only the border.`
- 畫風不同：`Match the pixel size and thin colored outlines of image 1 exactly.`

## 驗收重點

- 像同一款遊戲；沒有任何字。
- 外框中間是乾淨的洋紅、四邊粗細一樣。
- 6 個資源圖示、5 個元素圖示縮到 48px 一眼分得出來。
- 普通、稀有、傳說三張卡框一看就知道誰比較高級。

## 意見與待辦

（Claude 驗收後寫在這裡）
- 2026-11-04 13:22 TW　**`res_coin`、`res_spirit`、`res_pill`、`res_gatestone` 通過。** 沒有字，縮到 48px 一眼分得出（銅錢、藍晶、紅丹、石磚）。靈石多了卷軸底座，好看，保留。繼續照順序畫，不用停。
