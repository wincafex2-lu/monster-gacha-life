# 放置塔防山門與背景：工單 G2　戰鬥背景 3 張（分層）

狀態：完成通知
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-x7hjrp`，讀這份 `idle-td-art/gate-bg/ORDER-G2.md` 最新版（驗收意見寫在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-x7hjrp/idle-td-art/gate-bg/ORDER-G2.md
2. 從 `origin/claude/project-thread-x7hjrp` 開分支 **`dot/idle-td-g2`**，把「狀態」改成「進行中：<誰> <時間>」馬上推。之後成品和狀態都只推 `dot/idle-td-g2`。
3. 在畫山門的同一個 ChatGPT 對話繼續畫（畫風才會一致）。檔案放 `idle-td-art/gate-bg/images/`，檔名照「待辦」。
4. **先只畫第 1 張（草地遠景）推上來，等 Claude 在「意見與待辦」寫通過才畫後面。** 之後每張畫好就推，每 5 分鐘 fetch 一次看意見。
5. 全部交完把狀態改「待驗收」；看到「完成通知」就停。

## 背景怎麼用（先看懂）

- 畫面是橫向捲動：山門在最左邊，怪物從右邊走來，弟子和怪物都**站在地面上左右走**。
- 每個背景拆成 **3 層**，程式疊起來，捲動時遠的動得慢、近的動得快：
  1. **遠景 far**：天空＋很遠的山或景物，**整張畫滿**，沒有洋紅。
  2. **中景 mid**：樹林、竹林、小山丘這一排，**上半部是洋紅**（會變透明，透出遠景），景物從下面長上來，下緣畫到底。
  3. **地面 ground**：人物走路的那條地，**只有畫布下面一條**，地面最上緣大約在 **y≈780**，往下畫到底；y≈780 以上全部洋紅。
- 每層都是 **1536×1024 橫式**，而且要**左右可以無縫接**（最左邊和最右邊的景物要能接起來，程式會一直重複貼）。
- 大小感：遊戲裡一個弟子在這張 1024 高的畫布上大約只有 **180px 高**，腳踩在 y≈850 附近。所以竹子、樹要比人高很多，草叢大約到人的小腿。
- **不要畫**：山門、建築的大門、人物、怪物、文字、UI、光暈特效、飄的螢火蟲或落葉（程式加）。

## 鎖死規則

- 和山門同一款遊戲：畫風、上色方式照 **`ref/STANDARD__t2__stand.png`**（柔和、色相偏移的明暗、細彩色描邊），**細緻的小像素**。遠景可以比較柔、對比低，地面最清楚。
- 每次附 `ref/STANDARD__t2__stand.png` 放第一張，畫同一個背景的第 2、3 層時再附**同背景已通過的遠景**當第二張（顏色、光線要一致）。指令開頭貼：

```
Draw a background layer for the SAME game as the first attached image, in the same pixel-art style: painterly hue-shifted shading, thin colored outlines, soft rich palette, fine small pixels with lots of detail.
It is for a side-scrolling 2D defense game (characters walk left and right on the ground). Wide canvas 1536x1024.
The layer MUST tile seamlessly left-to-right: the left edge and right edge must connect perfectly when repeated.
For kids aged 9-11: beautiful and inviting, a little magical, never creepy.
No buildings, no gate, no people, no monsters, no text, no UI, no glow effects, no floating particles.
```

同一背景第 2、3 層再加：

```
Image 2 is the approved FAR layer of this same background. Match its colors, lighting and time of day exactly.
```

## 背景設計

| # | 代號 | 名字 | 遠景 far（英文） | 中景 mid（英文） | 地面 ground（英文） |
|---|---|---|---|---|---|
| 1 | meadow | 山門前草地 | Fully painted, no magenta. A bright sunny morning sky with soft fluffy clouds, distant blue-green misty mountain peaks in Chinese landscape style, a faint waterfall on one far cliff, a few tiny birds-shaped cloud wisps. Calm and fresh. | Top half solid magenta #FF00FF (will be transparent). From the bottom up: a row of rolling green hills, a few pine trees and pink peach-blossom trees, small rocks. The tallest trees reach about y=250; the bottom edge is filled to y=1024. | Everything above y=780 is solid magenta #FF00FF. From y=780 down: a grassy dirt road seen from the side, a bright grass edge on top with small wildflowers and clover, then layered brown earth and pebbles below. The walking surface is flat. |
| 2 | bamboo | 竹林 | Fully painted, no magenta. A soft green-gold afternoon sky seen through a far misty bamboo forest: pale layered bamboo silhouettes fading into mist, gentle light rays painted softly. | Top half solid magenta #FF00FF. Tall green bamboo stalks and leaf clusters growing from the bottom, some stalks reaching near the top of the image, a few ferns and mossy rocks at their base, small gaps between the stalks. | Everything above y=780 is solid magenta #FF00FF. From y=780 down: a mossy stone path with bamboo leaves scattered on it, small bamboo shoots at the edge, dark rich soil below. The walking surface is flat. |
| 3 | nightwood | 夜晚妖林 | Fully painted, no magenta. A deep blue-purple night sky with a big round pale moon and stars, far twisted forest silhouettes in cool purple-blue. Mysterious but pretty, not scary. | Top half solid magenta #FF00FF. Twisted dark trees with curly branches, glowing blue and teal mushrooms at their roots, a few old stone lanterns, hanging vines. The glow is painted color only, no separate glow effect. | Everything above y=780 is solid magenta #FF00FF. From y=780 down: a dark mossy forest floor road with roots, small glowing mushrooms at the edge, purple-blue soil below. The walking surface is flat. |

## 待辦（照順序畫）

| # | 檔名（`idle-td-art/gate-bg/images/`） | 內容 | 附圖 |
|---|---|---|---|
| 1 | `bg-meadow__far.png` | 草地遠景（畫完先停，等驗收） | 標準圖 |
| 2 | `bg-meadow__mid.png`、`bg-meadow__ground.png` | 草地中景、地面 | 標準圖＋`bg-meadow__far.png` |
| 3 | `bg-bamboo__far.png` | 竹林遠景 | 標準圖 |
| 4 | `bg-bamboo__mid.png`、`bg-bamboo__ground.png` | 竹林中景、地面 | 標準圖＋`bg-bamboo__far.png` |
| 5 | `bg-nightwood__far.png` | 妖林遠景 | 標準圖 |
| 6 | `bg-nightwood__mid.png`、`bg-nightwood__ground.png` | 妖林中景、地面 | 標準圖＋`bg-nightwood__far.png` |

GPT 畫歪時可以回它：
- 左右接不起來：`The left and right edges must match so the image tiles seamlessly when repeated horizontally.`
- 中景或地面上方沒留洋紅：`Everything above <y> must be solid flat magenta #FF00FF.`
- 畫了房子、門、人：`Remove all buildings, gates and people. Only nature.`
- 像素太大、太粗糙：`Use smaller pixels and more detail, matching the style of image 1.`

## 驗收重點

- 3 層疊起來（加上山門和角色）要好看、顏色光線一致，人物站在地面上不突兀。
- 左右重複貼不能看出明顯接縫（小接縫 Claude 會自己修）。
- 洋紅區要乾淨、整片均勻，好去背。

## 意見與待辦

（Claude 驗收後寫在這裡）

- 2026-11-04 03:05（台灣時間）`bg-meadow__far.png` **通過**：很漂亮，左右重複貼看不出接縫，雲山瀑布都對。請照順序繼續畫中景、地面，之後竹林、妖林。
  - 和 G1 一樣：小偏差（洋紅不是精準 #FF00FF、地面線差幾十 px）不用重畫，Claude 會自己修，直接交圖就好。
  - 中景、地面請注意：**上面留的洋紅區要整片乾淨**，不要有雲、霧或半透明的東西跨進洋紅區（去背後會變成怪色邊）。
- 2026-11-04 03:13（台灣時間）`bg-meadow__mid.png` **通過**：和遠景疊起來很好看，洋紅區乾淨。左右接縫處山坡線有一點點錯開，Claude 自己修，不用重畫。請繼續 `bg-meadow__ground.png`。
- 2026-11-04 03:25（台灣時間）`bg-meadow__ground`、`bg-bamboo__far`、`bg-bamboo__mid`、`bg-bamboo__ground`、`bg-nightwood__far`、`bg-nightwood__mid` **全部通過**。三層疊起來加上山門和角色都很好看，地面高度對，左右接得起來。
  - 竹林中景葉子邊緣有洋紅滲進去（去背後變紫點），Claude 用程式清掉，不用重畫。
  - 請畫最後一張 `bg-nightwood__ground.png`。妖林的樹和地面本來就偏紫，**地面這張請盡量少用接近洋紅的粉紫色**（用藍紫、深藍、青綠），去背才不會被吃掉。
- 2026-11-04 03:30（台灣時間）`bg-nightwood__ground.png` **通過**：地面高度對，顏色和妖林一致，去背乾淨。
- **完成通知**：G2 三個背景 9 層全部驗收完成，請停止巡查。辛苦了！泓之後若要改，我會另外在這裡寫。
