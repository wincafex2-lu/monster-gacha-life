# 放置塔防山門與背景：工單 G3　山門重畫成多層樓閣（5 級＋破損版）

狀態：待接手（泓確認後 Claude 會把這行改成「待接手」，在那之前不要接）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 為什麼重畫

戰鬥畫面改成「城樓守城」排法：山門在畫面左邊、很高，**弟子一層一層站在山門的樓台上**往右邊打，塔立在山門前的地上，怪物從右邊走來。舊的 G1 牌坊門上面沒地方站人，所以重畫。

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-x7hjrp`，讀這份 `idle-td-art/gate-bg/ORDER-G3.md` 最新版（意見寫在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-x7hjrp/idle-td-art/gate-bg/ORDER-G3.md
2. 從 `origin/claude/project-thread-x7hjrp` 開分支 **`dot/idle-td-g3`**，把「狀態」改成「進行中：<誰> <時間>」馬上推。之後成品和狀態都只推 `dot/idle-td-g3`。
3. 在畫山門的同一個 ChatGPT 對話繼續畫（畫風才會一致）。檔案放 `idle-td-art/gate-bg/images/`，檔名照「待辦」。
4. **先只畫第 1 張（一級完好）推上來，等 Claude 寫通過才畫後面。** 之後每張畫好就推，每 5 分鐘 fetch 一次看意見。
5. 全部交完把狀態改「待驗收」；看到「完成通知」就停。

## 鎖死規則

- 畫風照 `ref/STANDARD__t2__stand.png` 和 G1 已通過的山門（同一個門派的配色：紅柱、綠／金琉璃瓦、白石、金飾）。可以參考 G1 對應等級的完好圖當第二張附圖，保留它的裝飾和配色。
- 畫布 **1024×1536 直式**，底部在 y≈1500，左右各留 20px 洋紅。背景純洋紅 `#FF00FF`，不畫地面、人物、文字、特效。
- 角度：**側面**看（像橫向捲軸遊戲裡的城堡），正面朝右，可以帶一點點立體。
- **樓台是重點**：每一層樓都有一條**平的、看得很清楚的樓板**（前緣是矮欄杆或城垛），樓板上方要空出**夠站一個人的高度**（約一層樓高的 75%），而且是**空的**，不要畫人、不要畫東西擋住；程式會把弟子放在樓板上。
- 每層樓板寬度要夠並排站 3 個人。最下面一層是城門（大門在右側，怪物會打這裡），城門不站人。
- 匾額空白不寫字。

指令開頭貼（附標準圖＋G1 同級完好圖）：

```
Redesign this sect gate as a tall side-view defense tower for a side-scrolling 2D castle-defense game, in EXACTLY the same pixel-art style as image 1 (painterly hue-shifted shading, thin colored outlines, soft rich palette, fine small pixels). Keep the colors and ornaments of image 2 (same sect).
Tall canvas 1024x1536, solid flat magenta #FF00FF background, bottom of the building at y=1500, at least 20 px magenta margin on the left and right.
Side view, the front faces RIGHT (enemies come from the right).
The ground floor is a big gate door on the right side. ABOVE it are open balcony floors where defenders will stand: each balcony has a FLAT, clearly visible wooden or stone floor with a low railing or battlements at its front edge, and EMPTY open space above the floor, tall enough for a standing person (leave it empty: no people, no objects). Each balcony is wide enough for 3 people side by side.
No people, no text, no ground, no grass, no shadow, no glow, no effects. The name plaque is blank.
```

## 山門設計

| 級 | 檔名開頭 | 樓台層數 | 高度（底到頂） | 外型（英文，接在上面那段後） |
|---|---|---|---|---|
| 1 | `keep1` | 1 層 | 約 700px | Level 1, humble: a small wooden gatehouse with a thatched roof, log walls and bamboo fences, ONE open balcony floor above the gate. |
| 2 | `keep2` | 2 層 | 約 950px | Level 2: a wooden gate tower with red pillars and a gray tile roof with upturned eaves, TWO open balcony floors above the gate, red lanterns. |
| 3 | `keep3` | 2 層＋屋頂平台 | 約 1150px | Level 3: a stone-and-wood tower, white stone base with stone lions, red lacquered pillars, green glazed tile roofs with golden tips, TWO open balcony floors plus a flat rooftop platform with battlements, blue sect banners. |
| 4 | `keep4` | 3 層 | 約 1300px | Level 4: a grand tower of white jade and red pillars with golden cloud carvings, blue-green glazed roofs with gold trim, THREE open balcony floors, bronze bells under the eaves, tall banners. |
| 5 | `keep5` | 3 層＋屋頂平台 | 約 1450px | Level 5, legendary: a heavenly palace tower with shining golden tiled roofs, white jade walls, golden dragons coiling around the front pillars, crystal lotus lamps, THREE open balcony floors plus a flat rooftop platform, rich red-and-gold banners. The most majestic. |

破損版：附這一級已通過的完好圖當第二張，加：

```
Image 2 is this tower's approved undamaged design. Draw the SAME tower, same size, same position, same angle and colors, but BADLY DAMAGED: cracks, broken roof tiles, chipped corners, torn banners and lanterns, a few broken railing pieces. The balcony floors must stay in the same place and stay flat and empty. No fire, no smoke, no effects.
```

## 待辦（照順序畫）

| # | 檔名 | 內容 | 附圖 |
|---|---|---|---|
| 1 | `keep1__ok.png` | 一級完好（畫完先停，等驗收） | 標準圖＋`gate1__ok.png` |
| 2 | `keep1__broken.png` | 一級破損 | 標準圖＋`keep1__ok.png` |
| 3 | `keep2__ok.png`、`keep2__broken.png` | 二級 | 完好：標準圖＋`gate2__ok.png`＋`keep1__ok.png` |
| 4 | `keep3__ok.png`、`keep3__broken.png` | 三級 | 同上（換成 3 級） |
| 5 | `keep4__ok.png`、`keep4__broken.png` | 四級 | 同上 |
| 6 | `keep5__ok.png`、`keep5__broken.png` | 五級 | 同上 |

## 驗收重點

- 樓板平、清楚、上方空著，每層夠站 3 人；Claude 會把弟子實際放上去看。
- 五級一級比一級高、層數照表。
- 破損版樓板位置和完好版一樣。

## 意見與待辦

（Claude 驗收後寫在這裡）
