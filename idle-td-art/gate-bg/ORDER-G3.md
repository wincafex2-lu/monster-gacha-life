# 放置塔防山門與背景：工單 G3　山門後面的樓閣（弟子站的地方）7 張

狀態：待接手
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 為什麼要畫

戰鬥畫面改成「城樓守城」排法（參考 `ref` 外的遊戲截圖，不附）：畫面左邊是一座很高的**樓閣**，**弟子一層一層站在樓閣的樓台上**往右邊打。G1 畫好的牌坊門會**縮小放在樓閣的右下角前面**當大門（怪物打的是它），所以這次**只畫後面的樓閣，不畫大門**。

樓閣只在「能上場的人物變多」時換一張圖，所以照遊戲設計共 **7 張**，每張比前一張**明顯多出站人的地方**。不用畫破損版（破損看前面的大門）。

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-x7hjrp`，讀這份 `idle-td-art/gate-bg/ORDER-G3.md` 最新版（意見寫在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-x7hjrp/idle-td-art/gate-bg/ORDER-G3.md
2. 從 `origin/claude/project-thread-x7hjrp` 開分支 **`dot/idle-td-g3`**，把「狀態」改成「進行中：<誰> <時間>」馬上推。之後成品和狀態都只推 `dot/idle-td-g3`。
3. 在畫山門的同一個 ChatGPT 對話繼續畫（畫風才會一致）。檔案放 `idle-td-art/gate-bg/images/`，檔名照「待辦」。
4. **先只畫第 1 張推上來，等 Claude 寫通過才畫後面。** 之後每張畫好就推，每 5 分鐘 fetch 一次看意見。
5. 全部交完把狀態改「待驗收」；看到「完成通知」就停。

## 鎖死規則

- 畫風照 `ref/STANDARD__t2__stand.png` 和 G1 的山門（同一個門派：紅柱、灰／綠／金琉璃瓦、白石、金飾）。
- 畫布 **1024×1536 直式**，樓閣底部在 y≈1500，左右各留 20px 洋紅。背景純洋紅 `#FF00FF`，不畫地面、人物、文字、特效、大門。
- **側面**看（像橫向捲軸遊戲裡的城堡），正面朝右，可以帶一點點立體。
- **最下面一層是實心的石基或牆**（大門會另外疊在它右下角前面），不要畫門洞。
- **樓台是重點**：每個站位是一塊**平的、看得很清楚的樓板**（前緣是矮欄杆或城垛，欄杆不高過膝蓋），樓板上方**空著**、夠站一個人（一個站位大約寬 220px、高 300px），不要畫人或擺東西擋住。程式會把弟子放上去。
- 站位數要剛好照表，**站位之間分得出來**（可以用柱子、窗格、旗子隔開）。
- 一張比一張高、華麗；最後一張接近畫布頂。

指令開頭貼（附標準圖＋表格裡的 G1 山門）：

```
Draw the TOWER behind this sect's gate for a side-scrolling 2D castle-defense game, in EXACTLY the same pixel-art style as image 1 (painterly hue-shifted shading, thin colored outlines, soft rich palette, fine small pixels). Use the colors and ornaments of image 2 (the same sect's gate), but do NOT draw a gate or door: the bottom is a solid stone base.
Tall canvas 1024x1536, solid flat magenta #FF00FF background, bottom of the tower at y=1500, at least 20 px magenta margin left and right.
Side view, the front faces RIGHT (enemies come from the right).
Defenders will stand on open balconies. Each standing spot is a FLAT, clearly visible floor (about 220 px wide) with a low railing or battlements at its front edge (below knee height), and EMPTY open space above it about 300 px tall. Leave every spot empty: no people, no objects. Separate the spots with pillars, window frames or banners so each spot is easy to see.
No people, no text, no ground, no grass, no shadow, no glow, no effects.
```

## 樓閣設計（照遊戲設計：山門等級開人物格的時候換圖）

| # | 檔名 | 用在山門等級 | 站位（由下往上） | 附圖 2 | 外型（英文，接在上面那段後） |
|---|---|---|---|---|---|
| 1 | `tower2.png` | 1～2 級 | 1 層 2 位 | `gate1__ok.png` | Exactly 2 standing spots on ONE balcony floor above the stone base. A small humble wooden watchtower with log walls, thatched roof and bamboo railings. About 800 px tall. |
| 2 | `tower3.png` | 3～9 級 | 1 層 3 位 | `gate1__ok.png` | Exactly 3 standing spots on ONE wider balcony floor (the tower is clearly wider than before, a new side wing added). Wooden watchtower, thatched roof, bamboo railings, a paper lantern. About 850 px tall. |
| 3 | `tower4.png` | 10～17 級 | 2 層：2＋2 | `gate2__ok.png` | Exactly 4 standing spots: 2 on the lower balcony, 2 on the upper balcony. A two-storey wooden tower with red pillars, gray tile roofs with upturned eaves, red lanterns. About 1050 px tall. |
| 4 | `tower5.png` | 18～25 級 | 2 層：3＋2 | `gate3__ok.png` | Exactly 5 standing spots: 3 on the lower balcony, 2 on the upper. Stone-and-wood tower, white stone base, red lacquered pillars, green glazed tile roofs with golden tips, blue sect banners. About 1150 px tall. |
| 5 | `tower6.png` | 26～34 級 | 2 層：3＋3 | `gate3__ok.png` | Exactly 6 standing spots: 3 on the lower balcony, 3 on the upper (upper floor now as wide as the lower). Same style as before but grander, more carvings and banners. About 1250 px tall. |
| 6 | `tower7.png` | 35～44 級 | 3 層：3＋2＋2（最上面是屋頂平台） | `gate4__ok.png` | Exactly 7 standing spots: 3 on the lower balcony, 2 on the middle balcony, 2 on a flat rooftop platform with battlements. White jade and red pillars with golden cloud carvings, blue-green glazed roofs with gold trim, bronze bells. About 1350 px tall. |
| 7 | `tower8.png` | 45～50 級 | 3 層：3＋3＋2（最上面是屋頂平台） | `gate5__ok.png` | Exactly 8 standing spots: 3 on the lower balcony, 3 on the middle balcony, 2 on a flat rooftop platform. Legendary heavenly palace tower: shining golden tiled roofs, white jade walls, golden dragons coiling around the pillars, crystal lotus lamps, red-and-gold banners. The most majestic. About 1450 px tall. |

## 驗收重點

- 站位數剛好、樓板平、上方空著；Claude 會把弟子和縮小的大門實際疊上去看。
- 7 張一張比一張高、站位一眼看得出變多。
- 和 G1 大門放在一起像同一個門派。

## 意見與待辦

（Claude 驗收後寫在這裡）

- 2026-11-04 08:38（台灣時間）`tower2.png` **通過**：2 個站位清楚、樓板平、上方空著，和一級大門同風格。放上弟子和大門試過，可以用。請照順序繼續畫後面 6 張。
  - 站位後面現在是空的（透出背景），可以；後面幾級若想加一面後牆或窗格也可以，但**站位前面不要擋**。
  - 小偏差（高度、位置、洋紅不純）不用重畫，Claude 自己對齊。
- 2026-11-04 08:44（台灣時間）`tower3.png` **通過**：3 個站位清楚，和 tower2 一致、明顯變寬。請繼續 `tower4.png`（兩層），從這張開始要明顯長高。
