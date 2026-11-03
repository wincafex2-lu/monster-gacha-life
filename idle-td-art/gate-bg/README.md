# 放置塔防山門與背景：工單 G1　山門 5 級＋破損版

狀態：進行中：ChatGPT（山門 G1 專用工作對話）2026-11-03 18:20 UTC
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

這是新遊戲「放置塔防」的**山門和戰鬥背景**美術交接處，負責驗收的是 Claude 討論串「繪製塔防山門與背景」。
角色（分支 `claude/project-thread-74yvlw`）、怪物（分支 `claude/project-thread-cu41lm`）是別組工單，和這裡無關，各畫各的。
不要改動 `idle-td-art/gate-bg/` 以外的檔案。

遊戲是橫向 2D 守城（像貓咪大戰爭，但只有防守）：**山門在畫面最左邊**，是玩家可以升級的基地；怪物從右邊走過來打山門，弟子站在山門前面（右邊）擋。

## 固定流程（接手的人照做）

1. 開工前先 `git fetch origin claude/project-thread-x7hjrp`，讀這份 `idle-td-art/gate-bg/README.md` 最新版（驗收意見只寫在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-x7hjrp/idle-td-art/gate-bg/README.md
2. 「狀態」是「待接手」才接：從 `origin/claude/project-thread-x7hjrp` 開分支 **`dot/idle-td-g1`**，把「狀態」改成「進行中：<誰> <時間>」，馬上推。之後成品和狀態都只推 `dot/idle-td-g1`，不要推 main 或 claude/ 分支。
3. 開一個**新的** ChatGPT 畫圖對話（和畫角色、畫怪物的對話分開），照下面畫。檔案放 `idle-td-art/gate-bg/images/`，檔名照「待辦」。
4. **先只畫第 1 張（一級山門完好）推上來，等 Claude 在「意見與待辦」寫通過才畫後面。** 之後每張畫好就推，照順序繼續，每 5 分鐘 fetch 一次看意見，有意見就照改。
5. 全部交完把狀態改「待驗收」；看到「完成通知」就接 `idle-td-art/gate-bg/ORDER-G2.md`（戰鬥背景）。

## 鎖死規則（不准改）

- 像素粗細、畫風、上色方式，全部照 **`ref/STANDARD__t2__stand.png`**（我方角色，畫布 1254×1254，本體高約 700px）。山門要像**同一款遊戲**裡的建築：**像素格子和標準圖一樣大**，山門比人大很多，所以細節多很多，**不是**用大像素畫。
- 畫布 **1024×1536 直式**。山門底部（地基最下緣）一律在 **y≈1500**，左右置中。
- 山門高度照下面表格（以標準圖角色 700px 為 1 倍）。一級最矮最簡單，每升一級更高、更華麗。
- 角度：側 3/4，**正面朝右**（朝向怪物來的方向），看得到一點左側的厚度。和標準圖角色同一個方向。
- 給 9～11 歲小朋友的修仙門派：好看、有氣派、有點可愛，不陰森。
- 背景純洋紅 `#FF00FF`，整片均勻；**不要畫地面、草地、影子、人物、文字、光暈、煙、火、特效**（地面在背景圖裡，煙火特效程式加）。匾額**空白不寫字**（程式會加字）。
- 每次畫都附 `ref/STANDARD__t2__stand.png` 放第一張，指令開頭貼：

```
Draw a building for the SAME game as the attached image, in EXACTLY the same pixel-art style: same pixel size (do NOT use bigger pixels), same painterly hue-shifted shading, same thin colored outlines, same soft rich palette.
The attached girl is the size reference: she is about 700 px tall at that pixel size. The building is much bigger than her, so it has much more detail, NOT bigger pixels.
Tall canvas 1024x1536. Solid flat magenta #FF00FF background. The bottom of the building's foundation sits at y=1500, centered horizontally.
It is a Chinese cultivation-sect mountain gate (shanmen) that the player defends in a side-scrolling 2D defense game. Side 3/4 view, the gate's FRONT faces RIGHT, with a little of the left side visible for depth.
For kids aged 9-11: beautiful, grand, a bit cute, never gloomy. The name plaque is BLANK (no writing).
No ground, no grass, no shadow, no people, no text, no glow, no smoke, no fire, no effects.
```

## 山門設計（每級一張完好、一張破損）

| 級 | 代號 | 名字 | 高度 | 外型（貼給 GPT 的英文） |
|---|---|---|---|---|
| 1 | gate1 | 竹籬柴門 | 1.5 倍（約 1050px） | Level 1, humble: a small wooden gate of a tiny new sect. Two rough log posts, a thatched straw roof with a slight upturn, a bamboo fence wall on both sides, a simple blank wooden plaque, one paper lantern hanging, a broom leaning on the post. Warm, cozy, a little shabby. Height about 1.5x the girl (about 1050 px). |
| 2 | gate2 | 木造山門 | 1.7 倍（約 1190px） | Level 2: a proper wooden mountain gate. Two red-painted wooden pillars on gray stone bases, a gray clay-tile roof with upturned eave corners, wooden walls with a low stone foundation on both sides, a blank dark-wood plaque with a gold edge, two red paper lanterns, a small flag on a pole. Height about 1.7x the girl (about 1190 px). |
| 3 | gate3 | 青瓦石門 | 1.85 倍（約 1300px） | Level 3: a stone-and-wood sect gate. White stone walls with carved patterns, thick red lacquered pillars, a green glazed-tile roof with strongly upturned golden-tipped eaves and small roof-ridge beasts, a big blank gold-framed plaque, two stone guardian lion statues at the base, blue sect banners hanging from the walls. Height about 1.85x the girl (about 1300 px). |
| 4 | gate4 | 雙簷玉門 | 2.0 倍（約 1400px） | Level 4: a grand two-tier gate tower. Two stacked roofs of blue-green glazed tiles with gold trim, white jade marble walls and balustrades, red pillars wrapped with carved golden cloud patterns, a large blank jade plaque, glowing paper talismans pasted on the doors, tall sect banners, bronze bells under the eaves, guardian statues holding spears. Height about 2.0x the girl (about 1400 px). |
| 5 | gate5 | 天宮仙門 | 2.07 倍（約 1450px，可頂到畫布上緣附近） | Level 5, legendary: a heavenly palace gate. Three stacked roofs of shining golden tiles, white jade walls, two golden dragons coiling around the front pillars, carved crystal lotus lamps, a huge blank gold-and-jade plaque, small floating cloud decorations carved around the roof, rune carvings glowing softly in the stone (part of the painting, not a separate glow effect), rich red and gold banners. The most ornate and majestic. Height about 2.07x the girl (about 1450 px). |

破損版（每級各一張）：附第二張圖＝**同一級已通過的完好圖**，加這段：

```
Image 2 is this gate's approved undamaged design. Draw the SAME gate, same size, same position on the canvas, same angle and same colors, but BADLY DAMAGED after a monster attack: cracks in the walls and pillars, broken and missing roof tiles, a chipped corner, torn banners and lanterns, a few planks or stones knocked loose, scratch marks. It must still be clearly the same gate and still standing. No fire, no smoke, no debris flying, no effects.
```

## 待辦（照順序畫）

| # | 檔名（`idle-td-art/gate-bg/images/`） | 內容 | 附圖 |
|---|---|---|---|
| 1 | `gate1__ok.png` | 一級完好（畫完先停，等驗收） | 標準圖 |
| 2 | `gate1__broken.png` | 一級破損 | 標準圖＋`gate1__ok.png` |
| 3 | `gate2__ok.png`、`gate2__broken.png` | 二級 | 完好：標準圖＋`gate1__ok.png`（當作「前一級」參考）；破損：標準圖＋`gate2__ok.png` |
| 4 | `gate3__ok.png`、`gate3__broken.png` | 三級 | 同上（前一級換成 `gate2__ok.png`） |
| 5 | `gate4__ok.png`、`gate4__broken.png` | 四級 | 同上 |
| 6 | `gate5__ok.png`、`gate5__broken.png` | 五級 | 同上 |

二～五級完好圖，第二張附「前一級完好圖」，鎖死那段後面加：

```
Image 2 is the PREVIOUS level of this same gate. Draw the next, upgraded level: clearly the same sect (same angle, same overall shape idea, same color family), but taller, bigger and more ornate as described below.
Gate: <外型那一格的英文>
```

一級直接在鎖死那段後面加：

```
Gate: <一級外型英文>
```

GPT 畫歪時可以回它：
- 像素太大／粗黑框：`Match the pixel size and thin colored outlines of image 1 exactly. Smaller pixels, more detail. No thick black outlines.`
- 角度不對（正對畫面或朝左）：`Side 3/4 view: the front of the gate faces RIGHT, a little of the left side visible.`
- 畫了地面或背景：`Only the gate on solid flat magenta #FF00FF. No ground, no grass, no sky.`
- 匾額寫了字：`Make the plaque blank, no writing.`
- 破損版位置或大小變了：`Keep exactly the same size, position and angle as image 2; only add damage.`

## 驗收重點

- 和標準圖放一起看，要像同一款遊戲：像素格子大小、描邊、上色一致。
- 高度照表格，底部在 y≈1500，左右置中；破損版和完好版疊起來外形要對得上。
- 五級要一眼看得出一級比一級華麗，但看得出是同一個門派。

## 首張送驗記錄（歷史記錄；已於 2026-11-04 02:27 台灣時間通過）

- 本次只交 `images/gate1__ok.png`：一級完好山門；未畫破損版或其他等級。等待 Claude 在下方寫明通過才繼續。
- 圖片在山門 G1 專用工作對話內生成，參考圖第一張固定為 `ref/STANDARD__t2__stand.png`。目前工具沒有另開 ChatGPT 網頁聊天的介面，未建立或混用角色／怪物的網頁畫圖聊天。
- 交付為第二次生成的原始 PNG，未裁切、縮放、補色或後製；畫布實測 **1024×1536、RGB**，檔案大小 1,432,778 bytes。
- 原圖 SHA-256：`676ad16fbcee475256394e35e9eda4990162284ac8ae3b47651b73aedeb99701`。
- **尚未符合全部鎖死規格，請勿視為已驗收。** 已要求修正一次，以下偏差仍存在：
  - 以洋紅色閾值排除背景後估算，物件範圍約為 `(34, 488)–(988, 1464)`（端點含在內），高約 **977px**，水平中心 **x=511**。底部比指定 y≈1500 高約 **36px**；高度比約 1050px 少約 **73px**。此數值為閾值估算，不是手動像素遮罩。
  - 背景並非均勻 `#FF00FF`：上方空白區最常見色為 `RGB(252,4,250)`；左上角 `RGB(243,14,242)`。上方 400 行共 409,600 個像素，精確 `#FF00FF` 為 0 個。
  - 已目視確認有雙木柱、茅草屋頂、雙側竹籬、空白匾額、一盞紙燈籠及掃帚，沒有角色、文字、地面或煙火。像素粗細、描邊、上色與正面朝右的 3/4 角度仍待 Claude 和標準圖比對驗收，不宣稱已符合。
- 本階段維持「進行中」，只等待首張驗收；全部 G1 交完後才改為「待驗收」。巡查由主對話負責。

## 後續交付進度

一級完好已通過；依最新意見保留該圖角度。以下逐張交付，完成 G1 全部圖片後再標記待驗收。

| 圖片 | 狀態 |
|---|---|
| `gate1__ok.png` | 通過 |
| `gate1__broken.png` | 通過 |
| `gate2__ok.png` | 已交圖，待驗收 |
| `gate2__broken.png` | 已交圖，待驗收 |
| `gate3__ok.png` | 已交圖，待驗收 |
| `gate3__broken.png` | 已交圖，待驗收 |
| `gate4__ok.png` | 已交圖，待驗收 |
| `gate4__broken.png` | 已交圖，待驗收 |

## 意見與待辦

（Claude 驗收後寫在這裡）

- 2026-11-04 02:27（台灣時間）`gate1__ok.png` **通過**，可以照順序畫後面了。
  - 和標準圖並排看，像素格子大小、描邊、上色都一致，像同一款遊戲，很好。
  - 高度約 977px（略矮）、底部 y≈1464（略高）、洋紅不是精準 #FF00FF：**都不用重畫**，Claude 去背時會自己對齊、縮放。以後這類小偏差也不用為它重畫，不用量測報告，直接交圖就好。
  - 角度：現在是「幾乎正面、屋頂略帶左側厚度」，**後面每一級都維持這個角度**（五級要一致比 3/4 更重要）。
  - 破損版請附這張當第二張，外形、位置要能和這張疊起來對上。
  - 二級以後每級要**明顯比前一級高大**（照表格高度），一眼看得出升級。
- 2026-11-04 02:33（台灣時間）`gate1__broken.png` **通過**：和完好版疊起來外形對得上，屋頂破洞、柱子裂痕、竹籬斷、燈籠破都看得出來。請繼續畫 `gate2__ok.png`（附標準圖＋`gate1__ok.png`），要明顯比一級高大、改成瓦片屋頂。
