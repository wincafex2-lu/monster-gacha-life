# 放置塔防（修仙守山門）角色點陣圖：工單 1　掃地弟子五階

狀態：待接手
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

這個資料夾是新遊戲「放置塔防」的角色美術交接處。負責驗收的是 Claude 討論串「發想放置型塔防新遊戲」。
不要改動 `idle-td-art/` 以外的檔案，同一個 repo 裡的其他遊戲和這裡無關。

> **2026-11-03 22:07 更新：參考圖以泓直接給 GPT 的比例參考圖為主，畫法改成每階單張，詳見最下面「意見與待辦」。**

> **2026-11-03 22:15 比例已鎖死：一律以 `ref/STANDARD__t2__stand.png`（泓通過的 2 階）為標準，不准更動，詳見最下面「意見與待辦」。**

## 固定流程（接手的人照做）

1. 開工前先 `git fetch origin claude/project-thread-74yvlw`，讀那個分支上最新的這份 README（驗收意見只寫在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-74yvlw/idle-td-art/README.md
2. 「狀態」是「待接手」才接：從 `origin/claude/project-thread-74yvlw` 開你的分支 **`dot/idle-td-1`**，把這份 README 的「狀態」改成「進行中：<誰> <時間>」，馬上推到 `dot/idle-td-1`。之後所有成品和狀態都推到 `dot/idle-td-1`，不要推到 main 或 claude/ 分支。
3. 用 ChatGPT 的畫圖功能畫（開新的對話視窗），照下面「畫風」「待辦」畫，一張畫好就可以先推。
4. 檔案放 `idle-td-art/images/`，檔名照「待辦」表格。
5. 全部交完把「狀態」改成「待驗收」推上；之後每 10 分鐘 fetch 一次 `claude/project-thread-74yvlw`，讀「意見與待辦」，有新意見就照改，不用等人轉達。看到「完成通知」就停止巡查、結束對話。

## 這是什麼遊戲

給 9～11 歲小朋友玩的橫向放置塔防：山門在左邊，妖怪從右邊走來，角色站在山門前自動打。角色會升階（1～5 階），每升一階外型要明顯變強、變華麗，5 階是傳說版。

## 畫風（每次開新的畫圖對話，先貼這段，再附 `ref/disciple__t1__attack.png`）

```
You are my pixel-art character artist. Copy the RENDERING TECHNIQUE of the attached reference sprite exactly.

STYLE
- Fine, delicate, hand-placed pixel art: SMALL pixels, sprite about 90 pixels tall on a 128x128 canvas, lots of small detail.
- Chibi: head 55-60% of total height, tiny body, short limbs.
- Side 3/4 view facing RIGHT: mostly the right side of the face, far eye narrower near the face edge, back of head and hair mass on the left.
- Painterly shading: 4-6 tones per material with HUE SHIFT (shadows toward purple/blue, highlights toward warm yellow). Soft transitions made of hand-placed pixel clusters.
- Outlines THIN, COLORED, SELECTIVE: dark shade of the local color, dropped on lit edges.
- Hair as many separate locks, each with its own highlight. Big glossy anime eyes, several color layers, 2 highlights.
- Soft rich palette, not neon, up to 48 colors.

AVOID
- Chunky 8-bit/16-bit retro sprites, big blocky pixels.
- Thick uniform black or navy outlines.
- Flat vector shapes, glossy toy/plastic look, neon colors, front view.

OUTPUT
- Solid flat magenta #FF00FF background, nothing else on it (no floor, no shadow, no text, no effects).
- Nearest-neighbor upscale, each pixel a 4x4 block.
```

## 角色：掃地弟子（1 階設計＝`ref/disciple__t1__attack.png`）

修仙門派的雜役小弟子，深棕色頭髮綁大包頭＋紅髮帶，淺藍色打補丁的長袍、紅腰帶、布鞋，拿一把大竹掃帚當武器，表情有精神。

五階的變化（每階都要**人物本身的配色明顯變**，再加上**一件大配件**，配件會累加）：

| 階 | 衣服／頭髮配色 | 新增的大配件 | 武器 |
|---|---|---|---|
| 1 | 淺藍補丁袍、紅腰帶、深棕髮（照參考圖） | — | 竹掃帚 |
| 2 | 青綠色新袍（沒有補丁）、金色腰帶 | 頭上綁長長的紅色飄帶，往後飄 | 掃帚綁紅繩 |
| 3 | 青綠袍＋金色滾邊和衣襬花紋 | 加一件深藍色披風 | 掃帚毛變翠綠玉色、發微光 |
| 4 | 白袍＋金邊＋藍色刺繡，頭髮變深藍色帶亮藍挑染 | 身邊浮著一把飛劍 | 玉掃帚，柄是金色 |
| 5 傳說 | 金色華麗長袍＋紅色寶石、雙色菱格紋，頭髮變白色帶金色光澤 | 大金冠、背後一對白金大翅膀、兩把飛劍、幾顆浮空光球 | 金柄＋白光掃帚，非常華麗 |

5 階要「一看就是傳說」：輪廓明顯比 1 階大、更華麗。光暈、閃光不要畫，程式會加。

## 待辦（照順序畫）

| # | 檔名（放 `idle-td-art/images/`） | 內容 | 怎麼下指令 |
|---|---|---|---|
| 1 | ~~`disciple__tiers.png`~~（作廢，改每階單張，見最下面） | 1～5 階站立圖，一張圖橫排 5 隻，左 1 右 5 | 附參考圖，貼「畫風」後說：Draw the SAME character as 5 evolution tiers side by side in ONE image, left = tier 1 (exactly the reference design), right = tier 5. Same face, same idle standing pose holding the broom, same size and style. Then follow the tier table (翻成英文寫進去). |
| 2 | `disciple__t2__attack.png` | 2 階攻擊 4 格，橫排 | 附兩張圖：A＝第 1 張裡的 2 階，B＝`ref/disciple__t1__attack.png`。貼下面「升階動作」那段，【N】填 2。 |
| 3 | `disciple__t3__attack.png` | 3 階攻擊 4 格 | 同上，【N】填 3 |
| 4 | `disciple__t4__attack.png` | 4 階攻擊 4 格 | 同上，【N】填 4 |
| 5 | `disciple__t5__attack.png` | 5 階攻擊 4 格 | 同上，【N】填 5 |

升階動作的指令：

```
Image A is the character design (tier 【N】). Image B is an animation strip of the SAME character at tier 1.
Redraw image B frame by frame using the tier 【N】 design from image A.
- Keep EXACTLY the same poses, the same number of frames (4), the same frame order, the same frame spacing and the same ground line as image B.
- Change ONLY the appearance to match image A: outfit colors and patterns, hair, cape, wings, crown, weapon, and all accessories.
- Accessories must follow the motion naturally (cape and ribbons trail behind the swing, wings stay attached to the back, crown stays on the head).
- Same pixel style, solid magenta #FF00FF background, no effects on the background.
```

GPT 畫歪時可以回它：
- 模糊／有漸層：`Redo it as strict pixel art, small pixels, no anti-aliasing, flat color clusters only.`
- 粗黑框：`Change the outline to a thin dark shade of each area's own color, no black outlines.`
- 改了姿勢：`Keep the poses identical to image B; only repaint the character's appearance.`
- 漏了配件：`Add the cape / wings / crown from image A to every frame.`

## 交圖格式

- 背景純洋紅 `#FF00FF`，整片均勻。
- 直接交原始大圖，不用縮小或裁切；Claude 會去背、切格、對齊。
- 一張畫好就先推，commit 訊息寫上傳了哪些檔名。

## 意見與待辦

（Claude 驗收後寫在這裡）

### 2026-11-03 22:02（台灣時間）泓：身體太大，不合格，重畫
- 比例要照參考圖 `ref/disciple__t1__attack.png`：頭佔全身 55～60%，身體（脖子到腳底）大約只有一個頭高，手腳短短的。不要畫成正常比例或頭小身大。
- 五階都要同一個比例，配件（披風、翅膀、金冠）加上去不能把身體拉長。
- 已經畫好的圖如果身體偏大，不要推，直接重畫。
- 給 GPT 的修正指令：`The body is too big. Make it super-deformed chibi exactly like the reference image: head 55-60% of the total height, body from neck to feet only about one head tall, short stubby arms and legs. Keep this same head-to-body ratio for all 5 tiers.`

### 2026-11-03 22:05（台灣時間）泓：第二版「重畫變奇怪了」，改畫法
第二版頭變大了，但變成正面僵直站、手腳縮成一小截、掃帚橫拿，跟參考圖的角色不像同一個人。原因是五隻擠在一張圖，GPT 會把每隻縮小、重新設計。改成這樣畫：

1. **不要再五隻畫在一張。** 改成每階一張，檔名 `disciple__t1__stand.png`～`disciple__t5__stand.png`（`disciple__tiers.png` 不用交了，Claude 會自己拼）。
2. 每張都附新參考圖 **`ref/disciple__t1__stand.png`**（從 1 階攻擊第 4 格裁出來的單隻），貼「畫風」那段，再貼：
```
The attached image is tier 1 of this character. Redraw this EXACT image: same pose, same 3/4 view facing right, same head-to-body ratio, same size on the canvas, same pixel style.
Change ONLY the appearance to tier 【N】: <該階那一列翻成英文：衣服頭髮配色、新增大配件、武器>.
Accessories are added ON TOP; they must not change the body proportions or the pose.
Solid magenta #FF00FF background.
```
3. 1 階直接交 `ref/disciple__t1__stand.png` 不用畫。先畫 2 階推上來，Claude 驗過比例 OK 再畫 3～5 階。
4. 之後攻擊圖（待辦 2～5）的圖 A 改用這裡的單階站立圖。

### 2026-11-03 22:05（台灣時間）泓：比例參考改成這種
**泓指定：參考圖以泓提供的比例參考圖為主**（泓已在 GPT 對話裡直接附給 GPT，不會放進 repo；比例、大小、站姿、畫風都先看這張。`ref/disciple__t1__stand.png` 只用來看掃地弟子的長相和服裝）。在同一個 GPT 對話裡繼續畫，讓 GPT 沿用那張比例參考；若開新對話，請泓再附一次。不用等檔案，直接開始畫 2 階。英文指令最後加上這段：
```
The FIRST attached image is the MAIN reference for proportions, size, stance and pixel style. The second image only shows this character's face, hair and outfit.
PROPORTIONS (most important): compact cute game sprite. Head about HALF of the total height, body from neck to feet about ONE head tall, but arms and legs clearly visible (short, not stumps), feet visible. Relaxed idle stance in 3/4 view facing right, weapon held at the side or resting, NOT held horizontally across the body. The whole character fits in a squarish box, a little taller than wide (not counting wings/weapon).
```

### 2026-11-03 22:11（台灣時間）泓：用泓在你對話裡傳的參考圖
- **接手的人（Codex）注意：泓已經在你的對話視窗裡傳了比例參考圖，那張就是主參考圖。** 不用等 `ref/proportion__main.png`，也不會有這個檔案，直接用你對話裡那張。
- 現在的 `disciple__t2__stand.png`（22:07）是在主參考之前畫的，**不算數，照主參考圖重畫 2 階**：比例、大小、站姿、點陣畫風照主參考圖；長相和服裝照 `ref/disciple__t1__stand.png`＋階級表。站姿要像主參考圖那樣輕鬆站，掃帚放身側或扛著，不要斜擋在身前。
- 畫 GPT 時把主參考圖放第一張附上，指令照上面 22:05、22:07 兩段。
- 重畫好的 2 階推上來後等 Claude 驗收，通過才畫 3～5 階。

### 2026-11-03 22:15（台灣時間）泓：2 階（22:12 版）通過，**比例鎖死，不准更動**
- 22:12 重畫的 `disciple__t2__stand.png` 通過，已複製成 **`ref/STANDARD__t2__stand.png`＝比例標準**。之後每一張（站立、攻擊、每一階）都照它，**不准改**：
  - 頭身比、身高、角色大小、像素粗細、畫風，全部和標準圖一樣。
  - 畫布 1254×1254 時角色本體（不含飄帶、武器、翅膀）高約 700px，腳底在 y≈978，左右置中。
  - 配件（披風、飛劍、翅膀、金冠、光球）只能「加在外面」，不能把身體拉長、放大或縮小。
- 每次畫都附 `ref/STANDARD__t2__stand.png`（放第一張；22:21 起不用再附泓的原參考圖），指令加一句：`LOCKED PROPORTIONS: match the first image EXACTLY in head size, body size, total height, pixel size and ground line. Do not change proportions at all; only change colors, outfit and accessories.`
- 接下來的順序：
  1. **1 階站立重畫**（`disciple__t1__stand.png`，覆蓋舊的）：照標準圖比例，外型照 1 階（淺藍補丁袍、紅腰帶、竹掃帚）。
  2. 3、4、5 階站立（`disciple__t3__stand.png`～`t5`）。
  3. 攻擊動畫改用新比例：**1～5 階都要**（`disciple__t1__attack.png`～`t5`，各 4 格橫排），動作參考 `ref/disciple__t1__attack.png` 的 4 個姿勢，但比例、大小、像素照標準圖。舊的 1 階攻擊圖只看動作，不看比例。
- 每張畫好就推，Claude 每 5 分鐘驗一次。

### 2026-11-03 22:20（台灣時間）1 階站立（22:18 版）通過
- 和標準圖比對：身高 698 vs 702px、腳底 y 976 vs 978，比例一致。外型（淺藍補丁袍、紅腰帶、竹掃帚）正確。
- 繼續畫 3、4、5 階站立。

### 2026-11-03 22:21（台灣時間）泓：不用再附原參考圖
- **之後只附 `ref/STANDARD__t2__stand.png`（標準圖）就好，泓那張原參考圖不用再附。** 比例以標準圖鎖定。上面「每次都附主參考圖」的要求取消。
- 畫 3～5 階時可再加附已通過的 `images/disciple__t1__stand.png` 當第二張（看同一個人的長相）。
- 不用等，直接開始畫 3 階。

### 2026-11-03 22:28（台灣時間）3、4、5 階站立＋1 階攻擊（新比例）通過
- 3～5 階站立：本體大小、腳底 y 和標準圖一致；配色、披風、飛劍、玉掃帚、5 階金冠翅膀光球都照階級表。通過。
- `disciple__t1__attack.png`（22:25）：比例和標準圖一致，4 格動作清楚。通過。
- 繼續畫 2～5 階攻擊：圖 A＝該階已通過的站立圖，圖 B＝這張新的 `images/disciple__t1__attack.png`（不是 ref 裡的舊圖），用「升階動作」那段指令。

### 2026-11-03 22:29（台灣時間）2、3 階攻擊通過
- 姿勢、格位、腳底和 1 階攻擊一致，外型照該階站立圖。通過，繼續 4、5 階攻擊。

### 2026-11-03 22:31（台灣時間）下一張工單已備好
- 本工單收完（看到「完成通知」）後，接 `idle-td-art/ORDER-02.md`（狐仙少女五階，分支 `dot/idle-td-2`）。

### 2026-11-03 22:33（台灣時間）泓：驗收重點（之後每張都照這個檢查）
- **服裝一致**：攻擊每一格的衣服、頭髮、配件、武器顏色細節，都要和同階站立圖一樣（例：3 階掃帚＝金柄＋紅繩＋翠綠毛；披風、飄帶每格都在）。
- **動作不奇怪**：手要握在武器上、不能多手少手；腳底每格都在同一條地線；配件跟著動作自然飄，不能突然消失或換邊；身體大小每格一樣。
- 攻擊圖裡的角色比站立圖大約 14%：Claude 切格時會統一縮放，不用重畫；但之後攻擊圖請盡量畫得和站立圖一樣大。

### 2026-11-03 22:37（台灣時間）4、5 階攻擊驗收
- 4 階：白袍藍刺繡、深藍髮、飛劍、玉掃帚每格一致，動作正常。通過。
- 5 階：金冠、翅膀、雙飛劍、光球、白光掃帚每格都在，動作正常。小提醒：攻擊圖翅膀比站立圖略小，先不改，等泓看驗收頁決定。
- 10 張全部驗過，等泓最後確認後寫「完成通知」。

### 2026-11-03 22:56（台灣時間）泓：5 階攻擊退件，重畫
- `disciple__t5__attack.png` **第 3 格服裝和其他格不一樣**：下半身變成藍色裙＋紅腰帶，少了金色菱格紋華麗袍。4 格都要和 `disciple__t5__stand.png` 一模一樣的衣服。
- 翅膀也要和站立圖一樣大（現在攻擊圖翅膀偏小）。
- 重畫整條 4 格，給 GPT 加一句：`Every frame must wear EXACTLY the same outfit as image A: the gold diamond-pattern robe with red gems on the whole body, including the lower half. Do not change the outfit in any frame. Wings the same size as in image A.`
- 畫完推上來，其他 9 張已通過不用動。
