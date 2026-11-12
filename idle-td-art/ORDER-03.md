# 放置塔防角色點陣圖：工單 3　龍騎小將五階（A1）

狀態：完成通知
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-74yvlw`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-74yvlw/idle-td-art/ORDER-03.md
2. 從 `origin/claude/project-thread-74yvlw` 開分支 **`dot/idle-td-3`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-3`。
3. 用 ChatGPT 畫圖，一張畫好就推，放 `idle-td-art/images/`，檔名照「待辦」。
4. **每個角色先只交 1 階站立，等 Claude 在「意見與待辦」寫通過才畫該角色其他張。** 等的時候可以先畫下一個角色的 1 階站立。每 5 分鐘 fetch 一次看意見。
5. 全部交完狀態改「待驗收」；看到「完成通知」就停，接 `QUEUE.md` 下一張。

## 鎖死規則（不准改）

- 比例、身高、角色大小、像素粗細、畫風、腳底位置，全部照 **`ref/STANDARD__t2__stand.png`**（畫布 1254×1254，本體高約 700px，腳底 y≈978，左右置中）。
- 側 3/4 朝右、輕鬆站。配件只能加在外面，不能把身體拉長或放大。
- 背景純洋紅 `#FF00FF`，光暈閃光、子彈、特效都不要畫（程式加）。
- 每次畫都附 `ref/STANDARD__t2__stand.png` 放第一張，指令開頭貼：

```
Draw a NEW character in EXACTLY the same pixel-art style and proportions as the attached image.
LOCKED PROPORTIONS: match the attached image EXACTLY in head size, body size, total height, pixel size and ground line. Do not change proportions at all. Same 3/4 view facing right, relaxed idle stance. Solid magenta #FF00FF background, no effects, no shadow, no text.
```

## 驗收重點

- 服裝一致：攻擊每一格的衣服、頭髮、配件、武器細節都要和同階站立圖一模一樣（下半身也是）。
- 會動的配件要動：翅膀、披風、尾巴、飄帶、袖子、頭髮在攻擊 4 格要跟著甩動，不能每格都一樣。
- 動作不奇怪：手握住武器、不多手少手；腳底每格同一條地線；每格身體一樣大，也和站立圖一樣大。
- 4 格之間留空隙，武器不要伸進隔壁格。

## 角色：龍騎小將

少年小將軍，紅黑短甲、頭盔有龍角，拿長槍，個性很拼（坦克）。主色：紅＋黑。

| 階 | 衣服／頭髮配色 | 新增大配件（累加） | 武器 | 英文（貼給 GPT） |
|---|---|---|---|---|
| 1 | 舊皮甲，暗紅布衣，黑髮 | — | 木桿鐵槍頭 | young boy general: black short hair, worn leather armor over dark red cloth, small helmet with tiny dragon horns, holding a wooden spear with an iron tip |
| 2 | 鮮紅鐵甲＋黑邊 | 背後一面小紅旗 | 紅纓槍 | bright red iron armor with black trims, a small red banner flag on his back, red-tasseled spear |
| 3 | 紅甲＋金色鱗片紋 | 龍頭肩甲（左肩一個龍頭） | 槍頭變龍牙形 | red armor with gold scale patterns, a dragon-head pauldron on the left shoulder, spear head shaped like a dragon fang |
| 4 | 黑金重甲，頭髮變暗紅 | 背後一隻小紅龍盤在肩上 | 火紋長槍 | black-and-gold heavy armor, dark red hair, a small red dragon curled on his shoulders, long spear with flame patterns |
| 5 傳說 | 金紅龍鱗全甲，頭髮變金色 | 龍角金盔＋一對赤金龍翼＋小龍變大繞身 | 金色龍槍，槍頭燃火 | full gold-and-red dragon-scale armor, golden hair, golden helmet with big dragon horns, a pair of red-gold dragon wings, the dragon now bigger and coiling around him, golden dragon spear |

## 待辦（照順序）

| # | 檔名（`idle-td-art/images/`） | 內容 | 附圖 |
|---|---|---|---|
| 1 | `dragon__t1__stand.png` | 1 階站立 | 標準圖 |
| 2 | `dragon__t2__stand.png`～`dragon__t5__stand.png` | 2～5 階站立 | 標準圖＋已通過的 `dragon__t1__stand.png` |
| 3 | `dragon__t1__attack.png` | 1 階攻擊 4 格橫排 | 標準圖＋`dragon__t1__stand.png`＋`images/disciple__t1__attack.png`（只看格距地線） |
| 4 | `dragon__t2__attack.png`～`dragon__t5__attack.png` | 2～5 階攻擊 | 圖 A＝該階站立，圖 B＝`dragon__t1__attack.png` |

1 階攻擊指令（接在鎖死那段後面）：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: spear pulled back at hip, body coiled, front foot forward.
Frame 2: thrusts the spear straight forward, arms fully extended, body leaning in.
Frame 3: spear at full reach, back foot planted, cape and tassel swinging forward.
Frame 4: pulls the spear back toward the idle stance.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

升階攻擊指令（附圖 A＝該階已通過站立圖，圖 B＝已通過的 1 階攻擊圖）：

```
Image A is the character design (tier N). Image B is an animation strip of the SAME character at tier 1.
Redraw image B frame by frame using the tier N design from image A.
- Keep EXACTLY the same poses, the same number of frames (4), the same frame order, the same frame spacing and the same ground line as image B.
- Every frame must wear EXACTLY the same outfit as image A, including the lower half of the body. Same size as image A.
- Accessories must follow the motion: wings flap, capes, tails and ribbons swing; they must not look identical in every frame.
- Same pixel style, solid magenta #FF00FF background.
```

## 意見與待辦

（Claude 驗收後寫在這裡）

### 2026-11-04 03:12（台灣時間）1 階站立通過
- 黑髮、龍角小頭盔、舊皮甲＋暗紅布衣、木桿鐵槍頭，比例和腳底一致（角色連角高 664px，略矮但在範圍內）。通過，繼續 2～5 階站立（附這張當第二張參考）。
- 攻擊圖請畫得和站立圖一樣大。

### 2026-11-04 03:30（台灣時間）2～5 階站立、1～2 階攻擊通過
- 站立 2～5 階：紅甲小紅旗 → 金鱗紋龍頭肩甲 → 黑金重甲暗紅髮＋小紅龍 → 金紅龍鱗甲金髮＋龍角金盔＋赤金龍翼＋大龍繞身，比例腳底一致。通過。
- 1 階攻擊：長槍前刺 4 格，手都握在槍上、腳在同一條線，服裝一致。通過（之後 2～5 階攻擊的圖 B 用它）。
- 2 階攻擊：背後小紅旗和紅纓每格都在擺動，服裝和 2 階站立一致。通過。繼續 3～5 階攻擊（小龍、龍翼要跟著動作動）。

### 2026-11-04 03:38（台灣時間）3、4 階攻擊通過；5 階攻擊退件
- 3 階：龍頭肩甲、龍牙槍頭、紅旗紅纓每格都在且會擺。通過。
- 4 階：黑金甲、暗紅髮、肩上小紅龍、火紋槍每格一致。通過。
- **5 階攻擊退件：龍翼和繞身大龍都比 5 階站立圖小很多**（站立圖翅膀展開約身高 1.7 倍，攻擊圖只剩約 1 倍，大龍也縮成肩上一顆頭）。翅膀、大龍的大小要和 `dragon__t5__stand.png` 一樣；翅膀照之前說的要拍動（第 1 格上收、第 2～3 格往後拍開、第 4 格半開），大龍身體跟著動作扭動。重畫整條。
- 給 GPT 加一句：`The dragon wings and the big coiling dragon must be the SAME SIZE as in image A (wingspan about 1.7x the character height) in every frame. Do not shrink them.`

### 2026-11-04 04:00（台灣時間）5 階攻擊重畫通過 → 完成通知
- 龍翼、繞身大龍恢復和站立同大，翅膀第 1 格上收、第 2～3 格展開、第 4 格半開。通過。
- 小提醒：5 階攻擊圖整體畫得比站立圖小約 30%，Claude 打包時已統一縮放，不用重畫；之後請讓攻擊圖角色和站立圖一樣大。
- **完成通知：工單 3 龍騎小將 10 張全部收齊。請接 `QUEUE.md` 下一張：`ORDER-04.md` 星弓少女（分支 `dot/idle-td-4`）。**
