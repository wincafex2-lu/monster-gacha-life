# 放置塔防第二批點陣圖：工單 B1　神獸 4 隻

狀態：待驗收
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

這是新遊戲「放置塔防」**第二批美術（神獸、塔、陣法）**的交接處，負責驗收的是 Claude 討論串「繪製塔防塔、陣法與神獸」。
角色（分支 `claude/project-thread-74yvlw`）和怪物（分支 `claude/project-thread-cu41lm`）是別組工單，和這裡無關，各畫各的。
不要改動 `idle-td-art/batch2/` 以外的檔案。

## 這批的順序

| 順序 | 工單 | 內容 | 分支 |
|---|---|---|---|
| 1 | README.md（這份） | 神獸 4 隻：白虎、青龍、朱雀、玄武（站立＋攻擊） | dot/idle-td-b1 |
| 2 | ORDER-B2.md | 塔 5 種 × 3 階（站立＋攻擊） | dot/idle-td-b2 |
| 3 | ORDER-B3.md | 攻擊陣 6＋防禦陣 6（俯視圖示＋地面陣） | dot/idle-td-b3 |

一張工單出現「完成通知」就接下一張，不用等人轉達。

## 固定流程（接手的人照做）

1. 開工前先 `git fetch origin claude/project-thread-giiil5`，讀這份最新版（驗收意見只寫在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-giiil5/idle-td-art/batch2/README.md
2. 「狀態」是「待接手」才接：從 `origin/claude/project-thread-giiil5` 開分支 **`dot/idle-td-b1`**，把「狀態」改成「進行中：<誰> <時間>」，馬上推。之後成品和狀態都只推 `dot/idle-td-b1`，不要推 main 或 claude/ 分支。
3. 開一個**新的** ChatGPT 畫圖對話（和畫角色、畫怪物的對話分開），照下面畫。檔案放 `idle-td-art/batch2/images/`，檔名照「待辦」。
4. **先只畫第 1 張（白虎站立）推上來，等 Claude 在「意見與待辦」寫通過才畫後面。** 之後每張畫好就推，照順序繼續，每 5 分鐘 fetch 一次看意見，有意見就照改。
5. 全部交完把狀態改「待驗收」；看到「完成通知」就接 `ORDER-B2.md`。

## 鎖死規則（不准改）

- 像素粗細、畫風、上色方式，全部照 **`ref/STANDARD__t2__stand.png`**（我方角色，畫布 1254×1254，本體高約 700px，腳底 y≈978）。神獸要像**同一款遊戲**裡的夥伴。
- 大小照下面表格的「身高」（以標準圖本體 700px 為 100%），腳底在 y≈978、左右置中（會飛的例外，表格有寫）。
- 一律側 3/4 **朝右**畫（和標準圖同方向，敵人從右邊來）。
- 給 9～11 歲小朋友：**Q 版、可愛但威風帥氣**，不要太幼稚，也不要恐怖。
- 背景純洋紅 `#FF00FF`，整片均勻；不要畫影子、地板、文字、光暈、火焰、雷電、爆炸、投射物（程式會加）。
- 每次畫都附 `ref/STANDARD__t2__stand.png` 放第一張，指令開頭貼：

```
Draw a NEW divine guardian beast for the SAME game as the attached image, in EXACTLY the same pixel-art style: same pixel size, same painterly hue-shifted shading, same thin colored outlines, same soft rich palette.
The attached girl is the 100% size reference (her body is about 700 px tall on a 1254x1254 canvas, feet at y=978). Draw the beast at the height I give below, feet on the same ground line, centered.
Side 3/4 view facing RIGHT. Chibi and cute but majestic and cool, for kids aged 9-11: not babyish, not scary.
Solid flat magenta #FF00FF background, 1254x1254. No shadow, no floor, no text, no glow, no fire, no lightning, no effects, no projectiles.
```

## 神獸設計

| # | 代號 | 名字 | 身高 | 外型（貼給 GPT 的英文） | 攻擊 4 格（貼給 GPT 的英文） |
|---|---|---|---|---|---|
| 1 | baihu | 白虎 | 105% | a chibi white tiger guardian beast: snow-white fur with bold black-gray stripes, the stripes on its forehead form the Chinese character 王, icy blue eyes, a floating jade ring collar with small gold bells, silver claws, a long striped tail with a fluffy tip, standing on four legs with chest proud. Height about 105% of the girl (ears included). | 1: crouches low on four legs, tail raised high, ready to pounce. 2: leaps forward, front paws reaching out. 3: big claw swipe to the right with the front paw, mouth open in a roar, tail whipping behind. 4: lands back on four legs. The tail and the bells on the jade collar must swing in every frame. |
| 2 | qinglong | 青龍 | 120%（飛） | a chibi azure Chinese dragon: long serpentine teal-blue scaled body curled in an S shape in the air, small golden antlers, long flowing whiskers, a cream belly, little cloud-shaped tufts of fur at the elbows and tail tip, four small claws, one claw holding a plain white pearl. It FLIES: its lowest point floats about 150 px above the ground line. Height about 120%. | 1: rears its head back, body coiling tight. 2: starts to lunge forward, body uncoiling. 3: full lunge to the right with mouth wide open, body stretched long, whiskers streaming back. 4: curls back into the S shape. The body curve, whiskers and tail must be different in every frame. |
| 3 | zhuque | 朱雀 | 100%（飛） | a chibi vermilion phoenix (Zhuque): bright red-orange feathers with gold edges, a small golden crest of three feathers, kind but fierce golden eyes, wide wings, and very long flowing tail feathers whose tips are shaped like flames (drawn as feathers, not real fire). It FLIES: its lowest tail tip floats about 120 px above the ground line. Height about 100% (body and wings, not counting the long tail). | 1: wings raised high, body pulled back. 2: wings sweep down hard, body surging forward. 3: wings swept fully forward to the right like a big fan blast, crest and tail streaming. 4: wings half open, gliding back. The wings MUST flap: a different wing position in every frame; the tail feathers wave. |
| 4 | xuanwu | 玄武 | 95%（寬） | a chibi black tortoise guardian (Xuanwu): a big dark-teal shell with gold hexagon patterns and small moss, sturdy dark-green legs, a calm wise old face with a little white beard, and a dark-green snake with yellow eyes coiled around the shell, its head raised above the tortoise. Wider than tall, solid and heavy. Height about 95% (snake head included). | 1: tortoise lifts one front leg high, snake pulls its head back. 2: tortoise stomps down, body leaning forward. 3: stomp lands, and the snake strikes forward to the right with mouth open. 4: snake pulls back and recoils around the shell, tortoise back to stance. The snake must be in a different pose in every frame. |

## 待辦（照順序畫）

| # | 檔名（`idle-td-art/batch2/images/`） | 內容 | 附圖 |
|---|---|---|---|
| 1 | `baihu__stand.png` | 白虎站立（畫完先停，等驗收） | 標準圖 |
| 2 | `baihu__attack.png` | 白虎攻擊 4 格 | 標準圖＋`baihu__stand.png`＋`ref/LAYOUT__attack-strip.png` |
| 3 | `qinglong__stand.png`（2 格：身體上、身體下）、`qinglong__attack.png` | 青龍 | 同上（換成該神獸的站立圖） |
| 4 | `zhuque__stand.png`（2 格：翅膀上、翅膀下）、`zhuque__attack.png` | 朱雀 | 同上 |
| 5 | `xuanwu__stand.png`、`xuanwu__attack.png` | 玄武 | 同上 |

站立圖指令（接在鎖死那段後面）：

```
Beast: <外型那一格的英文>
Relaxed but proud idle pose, facing right, whole body visible.
```

青龍、朱雀站立改成：

```
Beast: <外型那一格的英文>
Draw a 2-frame hovering idle strip, frames side by side in ONE image like the layout reference (attach ref/LAYOUT__attack-strip.png, only for spacing): frame 1 body/wings up, frame 2 body/wings down. Same size in both frames.
```

攻擊指令（接在鎖死那段後面，附 3 張：標準圖、該神獸已通過的站立圖、`ref/LAYOUT__attack-strip.png`）：

```
Image 2 is this beast's approved design. Draw a 4-frame attack animation strip of the SAME beast, frames side by side in ONE image with clear empty space between frames, with the same frame spacing, frame size and ground line as image 3 (image 3 is ONLY a layout reference; do not copy that character or its poses).
<攻擊 4 格那一格的英文>
The beast must look EXACTLY like image 2 in every frame: same colors, same size, same details. Moving parts (tail, bells, whiskers, wings, tail feathers, snake) must visibly move with the action; they must NOT look identical across frames.
Feet on the same ground line in all frames (the flying ones keep flying). Do not draw fire, wind, slashes, impact effects or projectiles; code adds them.
```

GPT 畫歪時可以回它：
- 畫風不同（粗黑框、大像素）：`Match the pixel size and thin colored outlines of image 1 exactly. No thick black outlines.`
- 太幼稚或太恐怖：`Make it cool and majestic for kids aged 9-11, still chibi and cute, not babyish and not scary.`
- 大小不對：`Make the beast about <N>% of the girl's height in image 1, feet on her ground line.`
- 攻擊格裡長相變了：`Every frame must match image 2 exactly in colors, size and details.`
- 畫了火焰或光：`Remove all fire, glow and effects. Only the beast on flat magenta.`

## 驗收重點

- 和標準圖放一起看，要像同一款遊戲：像素粗細、描邊、上色一致。
- 身高照表格，腳底在同一條地線（青龍、朱雀例外，每格飛的高度差不多）。
- 攻擊 4 格：長相、顏色、大小每格都和站立圖一樣；會動的部位（尾巴、鈴鐺、鬍鬚、翅膀、尾羽、蛇）每格都要動；不多腳少腳。
- 4 格之間留空隙，不要伸進隔壁格。

## 交付紀錄

- 全部圖片在本第二批專用 ChatGPT 工作對話使用 ImageGen 製作，每次均以標準圖為第一張參考。
- 提交生成原始 PNG；不裁切、不縮放、不替換背景，不用程式繪圖。程式僅讀取尺寸與校驗檔案；各次原圖保留在工作環境。
- 依 2026-11-04 02:33 TW 驗收意見，身高 ±10%、腳底／置中小偏差與洋紅色差不重畫，交由 Claude 後製。

| 檔案 | 實際畫布 | 格數 | 交付說明 |
|---|---|---|---|
| `images/baihu__stand.png` | 1254×1254 | 1 | 2026-11-04 02:33 TW 通過；本體約 684px、腳底 y≈971，細微偏差由 Claude 後製。 |
| `images/baihu__attack.png` | 2172×724 | 4 | 蓄勢、跳躍、揮爪、落地；尾巴與鈴鐺擺動，已修正每格三顆鈴鐺。 |
| `images/qinglong__stand.png` | 1536×1024 | 2 | 懸浮上／下兩格，S 形身體、鬍鬚與尾部有變化；四肢及白珍珠一致。 |
| `images/qinglong__attack.png` | 2172×724 | 4 | 蓄力盤身、起衝、張口前衝、回復 S 形；已收窄第三格尾部，保留格間空隙。 |
| `images/zhuque__stand.png` | 1536×1024 | 2 | 懸浮上／下拍翼兩格，三羽金冠、兩翼與長尾羽保持同一造型；無火焰特效。 |
| `images/zhuque__attack.png` | 2172×724 | 4 | 抬翼、下拍、雙翼向右揮出、半開翼滑翔；尾羽隨動，無火焰或風效。 |
| `images/xuanwu__stand.png` | 1254×1254 | 1 | 四足玄武、金邊六角甲紋、少量苔蘚與白鬍鬚；單蛇盤殼抬頭，朝右。 |
| `images/xuanwu__attack.png` | 2172×724 | 4 | 抬前足、前傾踏下、落地與蛇向右突擊、蛇回盤；蛇姿逐格不同，四足完整。 |

原檔 SHA-256：

- `baihu__stand.png`：`4d70250273a2f910c9a158ef48df7a5200dcf8e17bcdaaa36bd028a228cfbb7e`
- `baihu__attack.png`：`9ec4b173f06c7dfe7b7b77c7580ac6004bbf54a2db21a88600de481047c49080`
- `qinglong__stand.png`：`6b159aea569e7c835a7501af42492807669eacf68b08decc6a09182ebf0aabb5`
- `qinglong__attack.png`：`21f33c99c089287f35d15b4e3b21cff81cb4baa75ea35cd009f495ce641229dd`
- `zhuque__stand.png`：`4d239d80dbcdf9a3990302cb53a0256a3ef986c949ee8fbe86f950b5c54ce198`
- `zhuque__attack.png`：`88ee78e815c730f11b152459f3c652f63b668115dae13bc2ab06fd222b002a4b`
- `xuanwu__stand.png`：`9de389708ed490bb0e52ae6c6c2467eaee736c2411be5ef1e70591b490f08648`
- `xuanwu__attack.png`：`6b4fa28418604f077afa657b2f893d94f4cd07057c51ec3d3f6a794e4aae861e`

## 意見與待辦

（Claude 驗收後寫在這裡）

- 2026-11-04 02:33 TW　**`baihu__stand.png` 通過。** 畫風、描邊、上色和標準圖一致，造型（王字紋、玉環鈴鐺、蓬鬆尾巴）都對。
  - 身高差 ±10%、腳底差幾 px、置中偏一點、背景洋紅有色差：**都不用改**，去背、縮放、對齊由 Claude 用程式做。之後的圖也一樣，不用再花時間修這幾項。
  - 繼續畫 `baihu__attack.png`，之後照待辦順序畫，不用每隻都等驗收（每張推了我會看，有問題寫在這裡）。
- 2026-11-04 03:40 TW　**`baihu__attack.png` 通過。** 4 格長相、配色一致，尾巴和鈴鐺每格都有動，撲跳那格離地正確，其他 3 格腳底同一條線、格子之間有空隙。繼續畫青龍。
- 2026-11-04 03:55 TW　**`qinglong__stand.png`、`qinglong__attack.png` 通過。** 長相和配色每格一致，身體 S 形、鬍鬚、尾巴每格都有變化，珍珠一直握著；前衝那格可以再拉長一點，但程式會補衝刺感，不用重畫。繼續畫朱雀。
