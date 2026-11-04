# 放置塔防第四批點陣圖：工單 D2　法寶圖示 12 張

狀態：待接手
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-gq54hn`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-gq54hn/idle-td-art/batch4/ORDER-D2.md
2. 從 `origin/claude/project-thread-gq54hn` 開分支 **`dot/idle-td-d2`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-d2`。
3. 用同一個 ChatGPT 對話畫，一張畫好就推，放 `idle-td-art/batch4/images/`，檔名照「待辦」。
4. **不用停下來等驗收**：照待辦順序一張接一張畫、畫好就推。每推一張就 fetch 一次看意見，有意見先改。大小差一點、置中偏一點、背景色差不用修。
5. 全部交完狀態改「待驗收」；看到「完成通知」就停。

## 鎖死規則（不准改）

- 像素粗細、描邊、上色照 **`ref/STANDARD__t2__stand.png`**，圖示的大小和畫法照 **`ref/ICON__res_soulcrystal.png`**（第三批已通過的資源圖示），要像同一款遊戲。
- 法寶是修仙門派的寶物，在遊戲裡裝在 3 個法寶欄。每張是**一個物品**，斜擺 3/4 角度，**填滿畫布約 80%**，畫布 1254×1254 正中間。
- **圖上絕對不要有字**（中文、英文、數字、符文假字都不要）。印章底面、鏡面、卷軸上都不要字，用雲紋、花紋代替。
- 不要光暈、不要霧狀漸層、不要半透明、不要火花特效（程式加）。本身會發光的部分（燈火、鏡面）用**實心色塊**畫，邊緣清楚。
- 背景純洋紅 `#FF00FF`，整片均勻；**物品上不要用洋紅、粉紫色**（會被去背）。紫色要偏藍紫。
- 不要底座、地板、影子、外框（圖示框由程式加）。
- 每次畫都附 `ref/STANDARD__t2__stand.png` 第 1 張、`ref/ICON__res_soulcrystal.png` 第 2 張，指令開頭貼：

```
Draw a single MAGIC TREASURE item icon for the SAME game as the attached images, in EXACTLY the same pixel-art style: same pixel size, same painterly hue-shifted shading, same thin colored outlines, same soft rich palette. Image 2 shows the icon size and finish to match.
Theme: legendary treasures of Chinese mythology, for a cute xianxia sect game for kids aged 9-11. Rich, shiny and very clear, readable at 48 px.
One object only, shown at a slight 3/4 angle, filling about 80% of a 1254x1254 canvas, centered.
ABSOLUTELY NO text, letters, numbers or fake runes anywhere (use cloud and swirl patterns instead). No glow, no light rays, no sparkles, no gradient fog, no transparency. Glowing parts are drawn as solid crisp color shapes.
Do not use magenta or pink-purple on the item. No base, no floor, no shadow, no frame.
Solid flat magenta #FF00FF background.
```

接著貼：

```
Treasure: <英文那一格>
```

## 法寶設計

| # | 檔名（`idle-td-art/batch4/images/`） | 法寶 | 英文（貼給 GPT） |
|---|---|---|---|
| 1 | `fb_qiankun.png` | 乾坤圈 | a thick shiny golden ring (a chakram-like bracelet) with a raised cloud pattern band and a small red jewel, seen at a tilted angle |
| 2 | `fb_huntian.png` | 混天綾 | a long crimson-red magic silk sash swirling in a big S-curve loop, gold-trimmed edges, flowing like it is alive (deep red, not pink) |
| 3 | `fb_zhaoyao.png` | 照妖鏡 | a round bronze hand mirror with an ornate cloud-and-dragon rim and a short handle, the mirror face a clear pale-cyan solid color with a white highlight streak |
| 4 | `fb_dinghai.png` | 定海神針 | a golden staff (the sea-calming pillar) with red bands on both ends and gold caps, lying diagonally from bottom-left to top-right, a few small wave patterns engraved |
| 5 | `fb_jubao.png` | 聚寶盆 | a round golden treasure basin overflowing with gold ingots, bronze coins with square holes and a few jade beads |
| 6 | `fb_zijin.png` | 紫金葫蘆 | a magic calabash gourd in deep blue-violet and gold, gold bands around the waist, a red cord with a tassel tied at the neck, a gold stopper |
| 7 | `fb_fenghuo.png` | 風火輪 | a pair of golden fire wheels, one in front of the other, each a spoked gold ring with solid orange-red flame shapes around the rim |
| 8 | `fb_bajiao.png` | 芭蕉扇 | a big green banana-leaf fan with clear leaf veins, a wrapped red-and-gold handle and a small jade pendant hanging from it |
| 9 | `fb_kunxian.png` | 捆仙繩 | a coiled golden magic rope tied in a neat loop with a lucky knot in the middle and small red tassels at both ends |
| 10 | `fb_taiji.png` | 太極圖 | a half-unrolled scroll on wooden rollers showing a big black-and-white taiji (yin-yang) symbol surrounded by cloud patterns, no writing |
| 11 | `fb_fantian.png` | 番天印 | a large square jade seal stamp with a carved beast-knob handle on top (a small cute lion), green jade with gold edging, the bottom face plain with cloud patterns only, no characters |
| 12 | `fb_liuli.png` | 七寶琉璃燈 | an ornate glass lotus lantern with seven colored gem panels (red, orange, yellow, green, cyan, blue, violet) in a gold frame, a solid golden flame shape inside, a gold hanging hook on top |

## 待辦（照順序畫）

照上表 1～12 順序，一張畫好就推。

GPT 畫歪時可以回它：
- 有字或符文：`Remove ALL text, letters, numbers and runes. Use cloud patterns instead.`
- 有光暈、閃光：`Remove all glow, sparkles and light rays. Only the object itself on flat magenta.`
- 太小：`Make the item fill about 80% of the canvas, like image 2.`
- 畫風不同：`Match the pixel size and thin colored outlines of image 1 exactly. No thick black outlines.`

## 驗收重點

- 像同一款遊戲；沒有任何字或假符文。
- 12 張縮到 48px 一眼分得出是哪一個（圈、帶子、鏡子、棍子、盆、葫蘆、輪子、扇子、繩子、卷軸、印章、燈）。
- 大小、填滿程度彼此一致；去背後邊緣乾淨。

## 意見與待辦

（Claude 驗收後寫在這裡）
- 2026-11-04 20:07 TW　**`fb_qiankun`、`fb_huntian` 通過。** 沒有字、沒有光暈，畫風和魂晶圖示一致；縮到 48px 一眼認得出圈和紅綾。混天綾是深紅不是粉色，去背乾淨。照順序繼續畫，不用停。
- 2026-11-04 20:17 TW　**`fb_zhaoyao`、`fb_dinghai`、`fb_jubao` 通過**（5/12）。無字、無光暈，48px 認得出鏡子、金棍、寶盆；鏡面實心青色、龍框漂亮。繼續照順序畫，不用停。
- 2026-11-04 20:27 TW　**`fb_zijin`、`fb_fenghuo`、`fb_bajiao` 通過**（8/12）。葫蘆是藍紫不是粉紫、去背完整；風火輪火焰是實心色塊；芭蕉扇葉脈清楚。三張比 80% 稍滿一點，程式縮，不用改。繼續畫捆仙繩、太極圖、番天印、七寶琉璃燈。
- 2026-11-04 20:36 TW　**`fb_kunxian`、`fb_taiji`、`fb_fantian` 通過**（11/12）。太極圖卷軸、番天印都沒有字，只有雲紋；印章上的小獅子很可愛。剩 `fb_liuli` 七寶琉璃燈，畫完狀態改「待驗收」。
- 2026-11-04 20:45 TW　**`fb_liuli` 通過**：七色寶石燈、金框、實心金色火焰，紫色偏藍沒被去背吃掉。
- **完成通知：工單 D2 法寶 12 張全部通過**（成品在 `dot/idle-td-d2` 5f75cc1）。第四批 D1＋D2 都完成，可以停止巡查，謝謝。
