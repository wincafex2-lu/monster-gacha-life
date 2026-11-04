# 放置塔防第三批點陣圖：工單 C1　投射物 14 種

狀態：待接手
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

這是新遊戲「放置塔防」**第三批美術（投射物、命中特效、UI）**的交接處，負責驗收的是 Claude 討論串「繪製塔防第三批美術」。
角色、怪物、山門背景、塔陣法神獸是別組工單，和這裡無關。
不要改動 `idle-td-art/batch3/` 以外的檔案。

## 這批的順序

| 順序 | 工單 | 內容 | 分支 |
|---|---|---|---|
| 1 | README.md（這份） | 投射物 14 種（單張） | dot/idle-td-c1 |
| 2 | ORDER-C2.md | 命中與元素特效 9 條（每條 4 格） | dot/idle-td-c2 |
| 3 | ORDER-C3.md | UI 21 張（圖示、外框、血條、抽卡祭壇） | dot/idle-td-c3 |
| 4 | ORDER-C4.md | 五階角色專屬大招 5 條（每條 6 格） | dot/idle-td-c4 |

一張工單出現「完成通知」就接下一張，不用等人轉達。

## 固定流程（接手的人照做）

1. 開工前先 `git fetch origin claude/project-thread-njd0fg`，讀這份最新版（驗收意見只寫在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-njd0fg/idle-td-art/batch3/README.md
2. 「狀態」是「待接手」才接：從 `origin/claude/project-thread-njd0fg` 開分支 **`dot/idle-td-c1`**，把「狀態」改成「進行中：<誰> <時間>」，馬上推。之後成品和狀態都只推 `dot/idle-td-c1`，不要推 main 或 claude/ 分支。
3. 開一個**新的** ChatGPT 畫圖對話（和其他批分開），照下面畫。檔案放 `idle-td-art/batch3/images/`，檔名照「待辦」。
4. **先畫第 1 張推上來，接著不用停**：照待辦順序一張接一張畫、畫好就推。Claude 每張都會看，有問題寫在「意見與待辦」，每推一張就 fetch 一次看意見，有意見先改。
5. 大小差一點、置中偏一點、背景洋紅有色差：**都不用修**，去背、縮放、對齊由 Claude 用程式做。
6. 全部交完把狀態改「待驗收」；看到「完成通知」就接 `ORDER-C2.md`。

## 鎖死規則（不准改）

- 像素粗細、描邊、上色方式全部照 **`ref/STANDARD__t2__stand.png`**（我方角色，畫布 1254×1254，本體高約 700px）。投射物是這個女孩世界裡的東西，要像**同一款遊戲**。
- 大小照表格的「長度」（以女孩本體 700px 為 100%），**畫在 1254×1254 畫布正中間**。
- 一律**朝右飛**（尖端、前端朝右），水平擺放。
- 只畫**物體本身**，用實心顏色和像素陰影畫。**不要畫發光、光暈、拖尾、速度線、火花、煙**（這些程式加）。火球、狐火、冰錐這種本身就是能量的，用**實心色塊**畫出火焰／冰的形狀，邊緣清楚，不要霧狀漸層。
- 背景純洋紅 `#FF00FF`，整片均勻；不要影子、地板、文字。
- 每次畫都附 `ref/STANDARD__t2__stand.png` 放第一張，指令開頭貼：

```
Draw a single PROJECTILE object for the SAME game as the attached image, in EXACTLY the same pixel-art style: same pixel size, same painterly hue-shifted shading, same thin colored outlines, same soft rich palette.
The attached girl is the size reference (her body is about 700 px tall). Draw the object at the length I give, in the CENTER of a 1254x1254 canvas, lying horizontally and pointing/flying to the RIGHT.
Only the object itself with solid colors and pixel shading. NO glow, no light aura, no motion trail, no speed lines, no sparks, no smoke (code adds them). Energy objects (fire, ice) are drawn as solid crisp color shapes, no soft gradient fog.
Solid flat magenta #FF00FF background. No shadow, no floor, no text.
```

## 投射物設計

| # | 代號 | 誰用 | 長度 | 英文（貼給 GPT） |
|---|---|---|---|---|
| 1 | p_arrow | 星弓少女 | 55% | a slim wooden arrow with a silver arrowhead and green-and-white feather fletching, a tiny star carved near the head |
| 2 | p_ofuda | 狐仙少女 | 30% | a white paper charm (ofuda) with a red border and red swirl pattern (no real letters), slightly curled like it is flying, a small red tassel at the back |
| 3 | p_talisman | 殭屍道士、符塔 | 30% | a yellow Chinese paper talisman with red brush-stroke rune patterns (no real characters), slightly curled like it is flying |
| 4 | p_pill | 煉丹童子 | 14% | a round shiny golden-orange elixir pill with a small cloud pattern and a bright highlight |
| 5 | p_scarab | 法老王 | 22% | a golden scarab beetle flying forward, small turquoise wings spread, a tiny red gem on its back |
| 6 | p_foxfire | 妖狐 | 28% | a blue fox-fire flame ball: round core with flame tongues streaming backwards, drawn as solid blue/cyan/white color bands, crisp edges |
| 7 | p_bullet | 海盜船長 | 10% | a round dark-gray lead cannonball-style pistol bullet with a small highlight |
| 8 | p_starbolt | 巫婆學徒 | 22% | a chubby five-pointed yellow star with a purple outline and a tiny moon notch |
| 9 | p_iceshard | 雪女、冰塔 | 35% | a sharp pale-cyan ice crystal spike with flat facets in light and dark blue, pointed tip to the right |
| 10 | p_bun | 廚師阿嬤 | 18% | a fluffy white steamed bun (baozi) with pleated top and a small pink dot |
| 11 | p_harpoon | 鯊魚潛水兵 | 65% | a harpoon: a metal shaft with a barbed steel head, a short rope tied at the back end |
| 12 | p_seed | 森林精靈 | 18% | a spinning green leaf blade wrapped around a brown thorny seed |
| 13 | p_bolt | 弩塔 | 70% | a heavy ballista bolt: thick wooden shaft with iron bands, a big iron arrowhead and red cloth fins |
| 14 | p_firebomb | 丹爐塔 | 26% | a round glowing-coal fire bomb: a dark iron ball with cracks showing orange-red magma inside, small solid flame shapes on top |

## 待辦（照順序畫）

| # | 檔名（`idle-td-art/batch3/images/`） | 內容 |
|---|---|---|
| 1 | `p_arrow.png` | 星弓的箭 |
| 2 | 其餘 13 個照表格順序，檔名 `<代號>.png` | |

指令（接在鎖死那段後面）：

```
Projectile: <英文那一格>
Length: about <長度> of the girl's body height (100% = 700 px).
```

GPT 畫歪時可以回它：
- 畫風不同（粗黑框、大像素）：`Match the pixel size and thin colored outlines of image 1 exactly. No thick black outlines.`
- 有發光或拖尾：`Remove all glow, trail, speed lines and sparks. Only the object itself on flat magenta.`
- 方向不對：`Point it to the RIGHT, lying horizontally.`
- 太大或太小：`Make it about <N>% of the girl's height in image 1.`

## 驗收重點

- 和標準圖放一起看，要像同一款遊戲：像素粗細、描邊、上色一致。
- 朝右、水平；沒有光暈、拖尾、火花；邊緣清楚可以去背。
- 14 種縮到 40px 也認得出是什麼、誰的。

## 意見與待辦

（Claude 驗收後寫在這裡）
