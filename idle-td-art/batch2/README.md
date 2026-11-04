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
Side 3/4 view facing RIGHT. SUPER-DEFORMED chibi with a HUGE head (about half of the total height, like the attached girl), cool AND cute at the same time like a mascot hero, for kids aged 10-11: confident, charismatic, never plain, never babyish, never scary.
Solid flat magenta #FF00FF background, 1254x1254. No shadow, no floor, no text, no glow, no fire, no lightning, no effects, no projectiles.
```

## 神獸設計

| # | 代號 | 名字 | 身高 | 外型（貼給 GPT 的英文） | 攻擊 4 格（貼給 GPT 的英文） |
|---|---|---|---|---|---|
| 1 | baihu | 白虎 | 100% | SUPER-DEFORMED chibi white tiger god-cub with a HUGE head: the head (ears included) is about HALF of its total height, like the attached girl's head-to-body ratio. Big sharp ice-blue eyes with a cocky confident smirk and one small fang showing, bold black stripes, the stripes on its forehead form the Chinese character 王, an oversized fluffy white mane/cheek ruff, tiny chunky body with short stubby legs and big round paws with silver claws, a golden jade-trimmed ring floating around its neck with three gold bells, a fluffy tail whose tip curls like a wind swirl. Mascot-hero look: cool AND cute, charismatic, instantly readable at small size. | 1: crouches low, tail raised high, ready to pounce. 2: leaps forward, front paws reaching out. 3: big claw swipe to the right, mouth open in a roar, tail whipping behind. 4: back to exactly the idle pose. The tail and bells swing in every frame. |
| 2 | qinglong | 青龍 | 110%（飛） | SUPER-DEFORMED chibi azure dragon with a HUGE head: the head (antlers included) is about HALF of its total height. Big bright golden eyes with a cheeky fearless grin, LARGE dramatic golden antlers, long flowing whiskers, a wild blue-and-white mane, a SHORT chubby teal-scaled serpentine body in a compact S curl (not long and thin), cream belly, cloud-shaped fur tufts at the elbows and tail tip, small claws, one holding a plain white pearl. It FLIES: lowest point about 150 px above the ground line. Mascot-hero look: cool AND cute, charismatic. | 1: rears its head back, body coiling tight. 2: starts to lunge forward. 3: full lunge to the right, mouth wide open, whiskers streaming back. 4: back to exactly the idle pose. Body curve, whiskers and tail differ in every frame. |
| 3 | zhuque | 朱雀 | 100%（飛） | SUPER-DEFORMED chibi vermilion phoenix with a HUGE round head: the head (crest NOT included) is about HALF of its total body height. Big fierce-but-sparkly golden eyes with a proud look, a TALL golden crest of flame-shaped feathers, a small sharp golden beak, a round fluffy red body, BIG dramatic wings with gold-edged feathers, and long flowing tail feathers with flame-shaped tips (drawn as feathers, not fire). It FLIES: lowest tail tip about 120 px above the ground line. Mascot-hero look: cool AND cute, charismatic. | 1: wings raised high, body pulled back. 2: wings sweep down hard, surging forward. 3: wings swept fully forward to the right like a fan blast, crest and tail streaming. 4: back to exactly the idle pose. Wings in a different position every frame; tail feathers wave. |
| 4 | xuanwu | 玄武 | 90%（寬） | SUPER-DEFORMED chibi black tortoise with a HUGE head: the tortoise head is about as tall as its whole shell. Wise but tough face with big bushy white eyebrows, sharp determined eyes and a little white beard, a SMALL round dark-teal shell with bold gold hexagon patterns and a few moss tufts, short stubby legs. A dark-green snake with its OWN big chibi head, yellow eyes and a cheeky tongue-out grin, coiled around the shell with its head raised high. Mascot-hero look: cool AND cute, charismatic, sturdy. | 1: tortoise lifts one front leg high, snake pulls its head back. 2: tortoise stomps down. 3: stomp lands and the snake strikes forward to the right, mouth open. 4: back to exactly the idle pose. The snake is in a different pose every frame. |

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
LOCKED PROPORTIONS: in every frame the head height, body length, body height, leg length and the distance between the feet must match image 2 (within 3%). Accessories (collar, bells, pearl) keep the same size as image 2. Frame 4 must look almost exactly like image 2: same pose, same stance width, same size.
```

GPT 畫歪時可以回它：
- 畫風不同（粗黑框、大像素）：`Match the pixel size and thin colored outlines of image 1 exactly. No thick black outlines.`
- 太幼稚或太恐怖：`Make it cool and majestic for kids aged 9-11, still chibi and cute, not babyish and not scary.`
- 大小不對：`Make the beast about <N>% of the girl's height in image 1, feet on her ground line.`
- 攻擊格裡長相變了：`Every frame must match image 2 exactly in colors, size and details.`
- 畫了火焰或光：`Remove all fire, glow and effects. Only the beast on flat magenta.`


## 比例鎖（2026-11-04 泓定，攻擊圖一律照這個驗收）

- 攻擊圖每一格都量（不是只看第 1 格），跟站立圖比：**頭高、身體長／高、站立時兩腳（四腳）的寬度**，任何一個差超過 **3%** 就退件。
- 頭高＝頭頂（不含角、冠毛、耳朵尖）到下巴。身體量沒彎的部位（腿長、龜殼長寬、軀幹長）。
- **第 4 格（回到待機）要跟站立圖幾乎一模一樣**：同樣的站姿、同樣的腳距、同樣大小。
- 配件大小也要一樣（鈴鐺、玉環、珍珠不能變大）。

## 驗收重點

- 和標準圖放一起看，要像同一款遊戲：像素粗細、描邊、上色一致。
- 身高照表格，腳底在同一條地線（青龍、朱雀例外，每格飛的高度差不多）。
- 攻擊 4 格：長相、顏色、大小每格都和站立圖一樣；會動的部位（尾巴、鈴鐺、鬍鬚、翅膀、尾羽、蛇）每格都要動；不多腳少腳。
- 4 格之間留空隙，不要伸進隔壁格。

## 交付紀錄

- 本第二批專用 ChatGPT 工作對話使用 ImageGen 製作；每次第一張參考均為標準圖。
- 已通過的 v2 站立、白虎與朱雀攻擊保留原始生成檔。玄武／青龍新法按 11:45 意見用站立像素作底，僅合成 ImageGen 所畫的動態區域；不縮放固定部位、不以程式繪製美術，生成原圖保留。
- 本次指定的玄武 v2 攻擊與青龍 v2 修訂均已交付。兩張採站立底圖像素複製與 ImageGen 局部動態合成，固定區域差 0、第四格等於站立（青龍取待機第 1 格，原尺寸 887×887 置入 1254×1254，偏移 x=183/y=90）。依使用者 03:30 UTC 指示，交付後直接接 ORDER-B3 陣法。

| 檔案 | 實際畫布 | 格數 | 交付說明 |
|---|---|---|---|
| `images/baihu__stand.png` | 1254×1254 | 1 | v2 大頭短身白虎，冰藍神氣眼、一顆小虎牙、王紋、玉飾金環三鈴與風旋毛尾。 |
| `images/qinglong__stand.png` | 1774×887 | 2 | v2 大頭金角青龍，神氣金眼、短胖 S 形青鱗身體、藍白鬃與小白珠；兩格上下懸浮。 |
| `images/zhuque__stand.png` | 1774×887 | 2 | v2 大圓頭朱雀、驕傲金眼與高金冠、短圓身、金邊大翼；兩格上振／下振翅膀。 |
| `images/xuanwu__stand.png` | 1254×1254 | 1 | v2 玄武巨頭與小龜殼、濃白眉小白鬚、金紋黑青殼；盤殼蛇有獨立大頭與吐舌笑。 |
| `images/baihu__attack.png` | 2172×724 | 4 | v2 攻擊：蓄勢、躍起、右揮爪、回站立；保留大頭與短身、玉環三鈴，尾巴和鈴鐺各格擺動。 |
| `images/qinglong__attack.png` | 5016×1254 | 4 | 11:45 新法：原待機第 1 格以原尺寸置入 1254 畫格，動態只換嘴、鬍鬚和下段身尾；珍珠／握珠爪像素差 0，第 4 格完整等於原待機格加邊。 |
| `images/zhuque__attack.png` | 2172×724 | 4 | v2 攻擊：高舉雙翅蓄勢、下拍、向右扇擊、回第一格待機；翅膀與三尾羽各格變化，保持大頭短身。 |
| `images/xuanwu__attack.png` | 5016×1254 | 4 | 11:45 新法：複製站立像素成四個原尺寸格，ImageGen 只編修第一格前腳及前三格上段蛇；固定區域差 0，第 4 格完整等於站立。 |

交付檔 SHA-256：

- `baihu__stand.png`：`9f1e189c79e5376a97f62c345c004008255e8f03917c2558abca6931cb306222`
- `qinglong__stand.png`：`38c1085d619e60745c66eb8684034cabb3888aa6b938865d463c141d40b80b33`
- `zhuque__stand.png`：`3edf1d90d77b4dc6d024b775d9d5881c1979fc55fe431cca3d6f8b0d3bfbe33b`
- `xuanwu__stand.png`：`d22b6043a6f8428f78354a596d94b988bd2e48666efd9eafceebd8b05c156efd`
- `baihu__attack.png`：`02760b29dbadbe7e02d4ee6fd6104bd4db61688e8df4187222785b24b445cf66`
- `qinglong__attack.png`：`e8bb94879a143edd4416b0492637272f2c0ead93f739ddb54a53ccd76ed63610`
- `zhuque__attack.png`：`7f3a9a52ecf6e66216801e3a5c97ab82a009f14c5ec093f49b2a24bd9fe1be4f`
- `xuanwu__attack.png`：`9845f074fe083801d5dea2751c94aed96032ee48872a4d9efe7a9b1c6d32579f`

## 意見與待辦

（Claude 驗收後寫在這裡）

- 2026-11-04 02:33 TW　**`baihu__stand.png` 通過。** 畫風、描邊、上色和標準圖一致，造型（王字紋、玉環鈴鐺、蓬鬆尾巴）都對。
  - 身高差 ±10%、腳底差幾 px、置中偏一點、背景洋紅有色差：**都不用改**，去背、縮放、對齊由 Claude 用程式做。之後的圖也一樣，不用再花時間修這幾項。
  - 繼續畫 `baihu__attack.png`，之後照待辦順序畫，不用每隻都等驗收（每張推了我會看，有問題寫在這裡）。
- 2026-11-04 03:40 TW　**`baihu__attack.png` 通過。** 4 格長相、配色一致，尾巴和鈴鐺每格都有動，撲跳那格離地正確，其他 3 格腳底同一條線、格子之間有空隙。繼續畫青龍。
- 2026-11-04 03:55 TW　**`qinglong__stand.png`、`qinglong__attack.png` 通過。** 長相和配色每格一致，身體 S 形、鬍鬚、尾巴每格都有變化，珍珠一直握著；前衝那格可以再拉長一點，但程式會補衝刺感，不用重畫。繼續畫朱雀。
- 2026-11-04 04:10 TW　**朱雀、玄武站立＋攻擊通過。** 朱雀翅膀每格位置不同、尾羽有飄；玄武的蛇每格姿勢不同、跺腳那格有抬腳。玄武站立稍微偏左，程式會置中，不用改。
- **完成通知：B1 神獸 8 張全部通過。** 請接 `ORDER-B2.md`（塔），從 `origin/claude/project-thread-giiil5` 開 `dot/idle-td-b2`。B2 一樣：大小差一點、腳底差幾 px、置中、背景色差都不用修，程式處理。
- 2026-11-04 09:20 TW　**返工（照上面「比例鎖」重量的結果）：白虎、玄武、青龍攻擊圖退件，朱雀通過。** 對照圖：站立圖縮成同樣頭高後，和 4 格並排比。
  - `baihu__attack.png`：頭一樣大，但身體變長變矮、四腳距離寬了約 20～25%，玉環鈴鐺大了約 30%；第 4 格是趴低的姿勢，不是站立姿勢。重畫：每格身體長度、腿長、鈴鐺大小照站立圖，第 4 格＝站立圖。
  - `xuanwu__attack.png`：龜殼比站立圖大一圈、整隻變得又高又短（寬高比差約 17%）。重畫：龜殼大小、腳長、身體長度照站立圖，只有抬腳和蛇在動，第 4 格＝站立圖。
  - `qinglong__attack.png`：珍珠和握珠的爪子大了約 5～10%，第 4 格的 S 形比站立圖窄很多。重畫：珍珠大小照站立圖，第 4 格＝站立圖（2 格待機的第 1 格）。
  - 做法：用「攻擊指令」重畫（指令已加比例鎖那段），附圖 2 一定要放已通過的站立圖。畫好推 `dot/idle-td-b1`，**這 3 張先做，做完再繼續 B2 的塔**。
- 2026-11-04 09:10 TW　**泓：神獸全部重畫 v2。** 原因：頭太小、造型中庸（要帥不帥、要可愛不可愛）。上面「神獸設計」已換成 v2（頭佔全身約一半、表情神氣、招牌配件誇張）。上面的返工意見作廢，舊圖全部不用。
  - 順序：**先畫 4 隻站立**（`baihu__stand.png`、`qinglong__stand.png`、`zhuque__stand.png`、`xuanwu__stand.png`，覆蓋舊檔，青龍朱雀一樣 2 格），4 張都推上 `dot/idle-td-b1` 後**停下來**，等「意見與待辦」寫通過再畫攻擊。
  - 攻擊照「比例鎖」：每格頭高、身體、腳距跟站立差 3% 以內，第 4 格＝站立。
- 2026-11-04 09:38 TW　**泓通過 v2 方向；`baihu__stand.png`、`qinglong__stand.png`、`zhuque__stand.png`（v2）通過。** 不用再停：畫完 `xuanwu__stand.png`（同樣 v2 大頭帥萌）就直接畫 4 隻攻擊（攻擊指令照「比例鎖」：每格頭高、身體、腳距跟站立差 3% 以內，第 4 格＝站立，鈴鐺珍珠不變大），之後補 ORDER-B2 的 6 張重畫。
- 2026-11-04 09:50 TW　**`xuanwu__stand.png`（v2）通過**（大頭、粗眉白鬍、大頭蛇吐舌，和另外 3 隻同一個方向）。接著畫 4 隻攻擊。
- 2026-11-04 10:30 TW　**`baihu__attack.png`（v2）通過**（數字量：4 格頭的大小差 2% 以內；第 4 格下巴到腳底差 1%、四腳距離差 1%，跟站立圖一樣；第 1 格蹲、第 2 格跳、第 3 格抬爪是動作，不算）。
- 2026-11-04 10:40 TW　**`zhuque__attack.png`（v2）通過**：第 1～3 格頭和胸腹大小差 2～4%（第 2、3 格翅膀蓋住胸口，量不準），第 4 格胸腹大 4%，**遊戲裡第 4 格直接用站立圖**，所以不用重畫。
- 2026-11-04 10:40 TW　**`qinglong__attack.png`（v2）退件**：第 1、4 格身體（肚子、握珠的爪和珍珠）比站立圖小 5～6%（以頭的大小對齊），第 3 格小 9%。重畫：頭、身體、爪、珍珠每格都跟站立圖一樣大，只有身體彎的形狀、鬍鬚、尾巴在動。建議做法：拿站立圖當底，一格一格只改姿勢。第 4 格可以直接放站立圖。
- 2026-11-04 11:45 TW　**攻擊圖改新做法（泓同意，角色那批已經在用）**：剩下的 `qinglong__attack.png`（重畫）和 `xuanwu__attack.png` 照這個畫：
  1. 拿已通過的站立圖當底，**一格一格只改會動的部位**，身體其他像素直接沿用，不重畫、不縮放。
     - 青龍：頭、珍珠、握珠的爪大小完全不變；只改身體彎的形狀、鬍鬚、尾巴、張嘴。
     - 玄武：龜殼、頭、四腳大小完全不變；只改抬一隻前腳踏地、蛇頭往前咬、張嘴。
  2. 只要畫第 1～3 格（蓄力、出手、收招）；**第 4 格直接貼站立圖**。圖片排法不變（4 格一條，照 ref/LAYOUT__attack-strip.png），青龍朱雀照舊會飛。
  3. 前傾、壓扁、踏步、停頓、震動、光效都由程式做，圖裡不要畫光、不要畫速度線。
  4. 推 `dot/idle-td-b1`，**不用停**，接著畫 ORDER-B3.md 的陣法（推 `dot/idle-td-b3`）。
- 2026-11-04 11:55 TW　**`xuanwu__attack.png`（新做法）通過**：逐像素比對站立圖，第 1～3 格只改了 6～9% 的像素（前腳、蛇），龜殼、頭、腳全部沒動；第 4 格跟站立圖一模一樣。去背乾淨，沒有雜點。接著照同樣做法交 `qinglong__attack.png`，然後直接做 ORDER-B3。
