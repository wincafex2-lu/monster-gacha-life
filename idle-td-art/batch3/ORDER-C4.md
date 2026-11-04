# 放置塔防第三批點陣圖：工單 C4　五階角色專屬大招 5 條

狀態：待接手（`ORDER-C3.md`（UI）出現「完成通知」後才接）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

泓 2026-11-04 12:45 TW 決定：五階（傳說）5 支各有專屬大招特效，其他角色大招共用 C2 的元素特效。
角色本身的大招動作（跳起、旋轉、重擊、衝擊波、震動、閃白）由程式做，**這裡只畫特效本體**，不要畫角色。

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-njd0fg`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-njd0fg/idle-td-art/batch3/ORDER-C4.md
2. 從 `origin/claude/project-thread-njd0fg` 開分支 **`dot/idle-td-c4`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-c4`。
3. 用同一個 ChatGPT 對話畫，一張畫好就推，放 `idle-td-art/batch3/images/`，檔名照「待辦」。
4. **不用停下來等驗收**：照待辦順序畫、畫好就推。每推一張就 fetch 一次看意見，有意見先改。
5. 全部交完狀態改「待驗收」；看到「完成通知」就停，第三批結束。

## 鎖死規則（不准改）

- 像素粗細、描邊、上色照 **`ref/STANDARD__t2__stand.png`**，像同一款遊戲。
- 每條 **6 格**，畫在一張 **1536×1024** 圖：**上排 3 格、下排 3 格**，從左到右、先上排再下排，格子之間留空隙，每格特效中心在同一個相對位置。
- 6 格：1 出現、2 變大、3 最大（招牌畫面）、4 打中／爆開、5 散開、6 快消失。
- 招牌畫面要**大、帥、一眼認得是那個角色的招**。用實心色塊（2～4 色階）畫，邊緣清楚；**不要柔光、霧狀漸層、半透明**（程式疊加光）。
- 不要畫角色本人、不要畫怪物、不要文字；圖裡不要用洋紅、粉紫色。背景純洋紅 `#FF00FF`。
- 每次畫都附 2 張：`ref/STANDARD__t2__stand.png`，以及該角色已通過的 5 階站立圖（角色那批的檔案；拿不到就只附標準圖），指令開頭貼：

```
Draw a 6-frame ULTIMATE SKILL EFFECT animation for the SAME game as image 1, in EXACTLY the same pixel-art style: same pixel size, same painterly shading, same thin colored outlines.
One 1536x1024 image: 6 frames in a 3x2 grid (top row frames 1-3, bottom row frames 4-6, left to right), clear empty space between frames, each frame's effect centered at the same relative spot.
Frame 1 appears, 2 grows, 3 is the biggest and most impressive key pose, 4 impact/explosion, 5 breaking apart, 6 almost gone.
Bold, cool, readable shapes in solid cel-shaded color bands with crisp edges. NO soft glow, no gradient fog, no transparency (code adds glow). Do not use magenta or pink-purple inside the effect.
Only the effect: no characters, no monsters, no text. Solid flat magenta #FF00FF background.
```

## 大招設計

| # | 代號 | 角色 | 英文（貼給 GPT） |
|---|---|---|---|
| 1 | ult_dragon | 龍騎小將 | a red-gold fire dragon (chibi but fierce, big head) bursting forward to the right out of a spear thrust, its body made of solid flame bands, crashing into the ground in a fire explosion |
| 2 | ult_starrain | 星弓少女 | a rain of silver-blue star arrows falling diagonally from the top-left, each with a small star head, hitting the ground in star-shaped bursts; frame 3 shows a big crescent moon behind them |
| 3 | ult_ninetail | 狐仙少女 | nine orange-gold fox-fire flames circling in a fan shape like nine tails, then shooting forward to the right and exploding in fox-head-shaped fire bursts |
| 4 | ult_mecha | 機甲少年 | a giant blue-and-gold mechanical rocket fist flying to the right with a blue energy ring behind it, smashing down with a big shockwave ring and flying metal bolts |
| 5 | ult_cauldron | 煉丹童子 | a huge golden alchemy cauldron dropping from the sky, landing with a golden shockwave, then golden pills and green healing plus-signs bursting upward out of it |

## 待辦（照順序畫）

| # | 檔名（`idle-td-art/batch3/images/`） | 內容 |
|---|---|---|
| 1 | `ult_dragon.png` | 龍騎小將大招 6 格 |
| 2 | 其餘 4 條照表格順序，檔名 `<代號>.png` | |

指令（接在鎖死那段後面）：

```
Ultimate: <英文那一格>
```

GPT 畫歪時可以回它：
- 畫了角色：`Only the effect itself, no characters.`
- 霧狀、發光：`No soft glow or fog. Only crisp solid color shapes.`
- 格子不對：`Exactly 6 frames in a 3x2 grid with empty space between them.`

## 驗收重點

- 像同一款遊戲；6 格、3×2、格子分開。
- 第 3 格夠大夠帥，一眼看出是誰的招；5 條彼此主色、造型分得開。
- 實心色塊、邊緣清楚、沒有洋紅色。

## 意見與待辦

（Claude 驗收後寫在這裡）
- 2026-11-04 13:40 TW　**`ult_dragon`、`ult_starrain`、`ult_ninetail` 通過。** 3×2 六格節奏對（出現→變大→招牌→爆開→散開→快消失），第 3 格夠大夠帥：火龍頭、新月星箭、九尾扇形都一眼認得；實心色塊、沒有洋紅、沒有畫角色。繼續 `ult_mecha`、`ult_cauldron`，不用停。
- 2026-11-04 13:47 TW　**追加：C4 兩條大招畫完後，再畫 ORDER-C3.md 的 `card_epic.png`（史詩卡框，待辦 15b），一樣推 `dot/idle-td-c4`**，然後才把狀態改「待驗收」。
- 2026-11-04 13:50 TW　**`ult_mecha`、`ult_cauldron` 通過。五階大招 5 條全部通過。** 火箭拳的藍色能量環和螺絲、丹爐的金丹和綠十字都一眼認得。丹爐第 4 格爐口有一點粉紫雜色，程式會修，不用重畫。
- **還差 1 張就結束：請畫 ORDER-C3.md 待辦 15b 的 `card_epic.png`（史詩卡框），推 `dot/idle-td-c4`。** 畫好後這批就全部完成。
