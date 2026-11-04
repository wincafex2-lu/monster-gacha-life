# 放置塔防新弟子：工單 N1　三階角色 4 支（彈弓頑童、擊鼓小樂師、狸貓忍者、月兔仙子）

狀態：待接手
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

驗收的是 Claude 討論串「畫塔防新弟子美術」。不要改動 `idle-td-art/batch5/` 以外的檔案。
這張做完（看到「完成通知」）就接同資料夾的 `ORDER-N2.md`（傳說小猴王）。

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-7a7c7v`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-7a7c7v/idle-td-art/batch5/README.md
2. 從 `origin/claude/project-thread-7a7c7v` 開分支 **`dot/idle-td-n1`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-n1`。
3. 用 ChatGPT 畫圖，一張畫好就推，放 `idle-td-art/batch5/images/`，檔名照「待辦」。
4. 順序（每一步等 Claude 在「意見與待辦」寫通過才做該角色下一步；等的時候可以先做下一個角色）：
   1 階站立 → 2、3 階站立 → 1 階攻擊 f1～f3 → 2、3 階攻擊 f1～f3。
   每 5 分鐘 fetch 一次看意見。
5. 全部交完狀態改「待驗收」；看到「完成通知」就停，接 `ORDER-N2.md`。

## 鎖死規則（不准改）

- 比例、身高、角色大小、像素粗細、畫風、腳底位置，全部照 **`ref/STANDARD__t2__stand.png`**（畫布 1254×1254，本體高約 700px，腳底 y≈978，左右置中）。
- 側 3/4 朝右、輕鬆站，武器拿在**前面那隻手**（畫面右邊的手）放身側。配件只能加在外面，不能把身體拉長或放大。
- 背景純洋紅 `#FF00FF`。光暈、閃光、子彈、石子、手裡劍飛出去、音波都不要畫（程式加）。
- 每升一階：人物本身配色明顯變＋加一件大配件（累加）＋武器升級。
- **每個角色的臉要照下面臉表**，不可以用預設的大圓眼臉；同一角色每階每格都是同一張臉。

### 站立圖指令

附 `ref/STANDARD__t2__stand.png` 放第一張。1 階：

```
Draw a NEW character in EXACTLY the same pixel-art style and proportions as the attached image.
LOCKED PROPORTIONS: match the attached image EXACTLY in head size, body size, total height, pixel size and ground line. Do not change proportions at all. Same 3/4 view facing right, relaxed idle stance, weapon held in the FRONT hand (the hand on the right side of the image) at the side. Solid magenta #FF00FF background, no effects, no shadow, no text.
Character: <英文外型>
Give this character a UNIQUE face, not the default chibi face: <英文臉>. Do not reuse the same face as other characters.
```

2、3 階：附 `ref/STANDARD__t2__stand.png` ＋ 已通過的 1 階站立圖：

```
Image 1 is the proportion standard. Image 2 is this character at tier 1.
Draw the SAME character at tier N: same face, same body size and proportions as image 2, same pose, same ground line, weapon in the same front hand.
Changes for tier N: <英文外型>.
Accessories go on the outside only; do not make the body bigger or longer. Solid magenta #FF00FF background, no effects, no text.
```

### 攻擊圖指令（站立圖逐格改，每階交 f1、f2、f3 三張；第 4 格不用畫）

身體前傾、壓扁、踏步、出招特效、震動都由程式加，**圖裡頭、身體、腿、腳都不要動**。

1 階（附該角色 1 階站立圖）：

```
Edit this exact sprite. Keep the head, face, body, legs, feet, outfit, size and position EXACTLY the same (same pixels where possible).
ONLY change the arms and the weapon to this pose: <動作>. Moving accessories (scarf, tail, ears, ribbons, sleeves) may swing a little.
Do not make the body or legs longer, do not move the feet, do not resize anything. Same magenta #FF00FF background.
The weapon must stay in the SAME hand as in the original sprite (the front hand). The other hand may help. Do not move it to the other hand.
```

2、3 階（附圖 A＝該階站立圖、圖 B＝已通過的 1 階同一格）：

```
Edit image A (tier N sprite). Keep its head, face, body, legs, feet, outfit, size and position EXACTLY the same.
ONLY change the arms and the weapon so the pose matches image B (same character at tier 1). Use the tier N weapon from image A.
Moving accessories may swing a little. Do not resize anything. Same magenta #FF00FF background.
The weapon must stay in the SAME hand as in the original sprite. Do not move it to the other hand.
```

## 驗收標準

- 每一格頭高（頭頂到下巴）、身體高（下巴到鞋底）跟同階站立圖差 ≤3%；站寬、肩寬、鞋寬差 ≤6%。
- 衣服、配件、武器每格都跟同階站立一樣；武器一直在前手；手指握得像真的。
- 臉照臉表，跟其他角色一眼分得出來。
- 畫好就先上傳最好的一版，Claude 量完決定。

---

## 角色

### 1. 彈弓頑童（`slingkid`，普通・遠程）

鄉下調皮小孩，用彈弓射小石子。主色：草綠＋土棕。

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 草綠短褂打補丁、捲起的棕褲、光腳草鞋、亂翹短髮、鼻頭一點泥；木頭 Y 字彈弓 | mischievous village kid: patched grass-green short jacket, rolled-up brown trousers, straw sandals, messy spiky short hair, a smudge of dirt on the nose; holds a wooden Y-shaped slingshot |
| 2 | 改成橘黃短褂＋藍腰帶；腰間掛一個鼓鼓的竹籃彈藥袋；彈弓綁紅布條 | same character, now an orange-yellow jacket with a blue sash, a bulging little bamboo basket of pebbles hanging at the hip, slingshot wrapped with red cloth |
| 3 | 深藍俠客短打＋金邊、頭綁紅頭巾；肩上站一隻胖麻雀；鐵框大彈弓 | same character, now a navy-blue hero outfit with gold trims and a red headband, a chubby sparrow standing on the shoulder, big iron-framed slingshot |

臉：`eyes = one eye squinting shut as if aiming, the other eye wide open; eyebrows = messy thick brows; mouth = cheeky grin with the tongue tip sticking out of one corner`

攻擊動作（f1～f3）：
- f1：`raises the slingshot forward with the front hand, the back hand pinches the band`
- f2：`full draw: slingshot held out forward in the front hand, the back hand pulls the band back to the cheek, aiming`
- f3：`release: the band snaps forward, the back hand open and flung back`

### 2. 擊鼓小樂師（`drummer`，普通・輔助：全隊加攻速）

過年舞獅隊的小鼓手，打鼓幫大家加油。主色：大紅＋金黃。

| 階 | 外型 | 英文 |
|---|---|---|
| 1 | 紅布衣、黃燈籠褲、頭頂沖天小辮；腰間綁一個小腰鼓；兩支木鼓棒 | festival drummer kid: red cloth top, yellow puffy trousers, a short topknot sticking straight up; small waist drum tied at the hip; two wooden drumsticks |
| 2 | 金黃舞獅服＋紅毛邊；戴一頂舞獅頭造型的帽子（大眼睛、紅鬃毛）；鼓棒綁紅布 | same character, golden lion-dance outfit with red fur trims, wearing a lion-dance-head hat (big eyes, red mane), drumsticks tied with red cloth |
| 3 | 紅金錦緞華服＋祥雲紋；背後揹一面大戰鼓（比頭還大）；金色鼓棒 | same character, red-and-gold brocade outfit with cloud patterns, a big war drum strapped on the back (bigger than the head), golden drumsticks |

臉：`eyes = big round excited eyes with large dark pupils; eyebrows = high raised brows; mouth = wide open shouting mouth, like cheering "Hey!"`

攻擊動作：
- f1：`raises both drumsticks high above the shoulders`
- f2：`strikes down on the waist drum with both sticks`
- f3：`sticks bounce back up, crossing in front of the chest, sleeves swinging`

### 3. 狸貓忍者（`tanuki`，稀有・遠程：手裡劍）

圓滾滾的狸貓小忍者，丟手裡劍。主色：深褐＋灰。

| 階 | 外型 | 英文 |
|---|---|---|
| 1 | 灰色忍者服、圓圓狸貓耳、蓬鬆條紋大尾巴、眼睛周圍深色狸貓斑、口罩遮嘴；手拿一枚手裡劍 | chubby tanuki ninja kid: grey ninja outfit, round tanuki ears, fluffy striped big tail, dark tanuki mask markings around the eyes, cloth mask over the mouth; holds one shuriken |
| 2 | 深綠忍者服；脖子一條長長的紅圍巾往後飄；腰間插兩支苦無 | same character, dark green ninja outfit, a long red scarf flowing back from the neck, two kunai tucked in the belt |
| 3 | 黑紫忍者服＋銀邊；頭上頂一片綠葉；背後揹一枚巨大的四角風魔手裡劍 | same character, black-purple ninja outfit with silver trims, a green leaf on top of the head, a giant four-blade shuriken strapped on the back |

臉：`eyes = round shiny eyes inside dark tanuki eye-patch markings; eyebrows = small serious slanted brows; mouth = hidden behind the cloth ninja mask`

攻擊動作：
- f1：`front hand pulls the shuriken back across the chest, ready to throw`
- f2：`flicks the front arm forward, shuriken at the fingertips`
- f3：`front arm fully extended forward, hand open (shuriken gone), scarf and tail swinging`

### 4. 月兔仙子（`moonrabbit`，史詩・輔助：山門護盾＋減速）

住在月亮上的搗藥兔仙女。主色：白＋淡紫＋銀。

| 階 | 外型 | 英文 |
|---|---|---|
| 1 | 長長白兔耳（一隻折下來）、白色短髮、淡紫襦裙；手拿木頭搗藥杵 | moon rabbit girl: long white rabbit ears (one ear flopped down), short white hair, pale purple Chinese ruqun dress; holds a wooden medicine pestle (mallet) |
| 2 | 藍紫襦裙＋銀邊；頭戴銀色月牙髮飾；腰間掛藥囊；玉杵 | same character, blue-violet dress with silver trims, a silver crescent-moon hair ornament, a herb pouch at the waist, jade pestle |
| 3 | 白金仙裙＋星月紋；肩上飄一條披帛；身邊浮一盞玉兔燈籠；月牙形銀杵 | same character, white-and-gold fairy dress with star and moon patterns, a floating shawl ribbon over the shoulders, a jade rabbit lantern floating beside her, crescent-shaped silver pestle |

臉：`eyes = round ruby-red rabbit eyes, calm and half-lidded; eyebrows = faint thin brows slanted up in the middle (a little worried); mouth = small rabbit "Y" mouth showing two front teeth`

攻擊動作：
- f1：`raises the pestle up beside the head with the front hand`
- f2：`taps the pestle forward, arm extended`
- f3：`pestle pointing down-forward at the end of the tap, ears and ribbons swinging`

---

## 待辦（檔名，放 `idle-td-art/batch5/images/`）

每個角色（`<代號>` = slingkid／drummer／tanuki／moonrabbit）：

1. `<代號>__t1__stand.png`
2. `<代號>__t2__stand.png`、`<代號>__t3__stand.png`
3. `<代號>__t1__attack_f1.png`、`_f2.png`、`_f3.png`
4. `<代號>__t2__attack_f1～f3.png`、`<代號>__t3__attack_f1～f3.png`

共 4 支 × 12 張 = 48 張。

## 意見與待辦

（Claude 驗收後寫在這裡）
- 21:35 台灣時間 1 階站立：
  - 擊鼓小樂師 **通過**（身高 701px，標準 704，−0.4%；腳底 y=975；沖天辮、腰鼓、兩支鼓棒、大圓眼＋大喊嘴都對）。可以畫 `drummer__t2__stand.png`、`drummer__t3__stand.png`，臉保持這張。
  - 彈弓頑童 **退件（只因為大小）**：身高 798px，比標準 704 大 13%，腳底 y=1072（要 ≈978），整個人畫大了。臉（一眼瞇、吐舌頭）、衣服、彈弓都很好，**請把同一張圖等比例縮到身高約 704px、腳底放回 y≈978、左右置中**，其他不要改。也可以附這張重新叫 GPT：`Keep this exact character design, but scale it down so it matches image 1 exactly: total height about 704 px, feet at y=978, centered. Do not redesign.`
- 21:42 台灣時間 1 階站立：
  - 狸貓忍者 **通過**（腳底 y=979；頭、身體大小跟標準一樣，圓耳比標準的包頭低所以總高 661 正常；眼周狸貓斑＋口罩、條紋大尾巴、手裡劍在前手都對）。
  - 月兔仙子 **通過**（腳底 y=978；總高 783 是多了兔耳，頭和身體跟標準一樣大；一耳折下、紅眼半瞇、八字淡眉、兔嘴露門牙、杵在前手都對）。
  - 兩人可以接著畫 2、3 階站立，臉保持這張。彈弓頑童照上一則縮小重交。
- 21:48 台灣時間：
  - 彈弓頑童 1 階站立（縮小版）**通過**（身高 703、腳底 978）。可以畫 2、3 階站立。
  - 擊鼓小樂師 2 階站立 **通過**（身體大小、腳底跟 1 階一樣；金黃舞獅服紅毛邊、舞獅頭帽、鼓棒綁紅布、臉保持）。繼續 3 階站立。
- 21:55 台灣時間：
  - 擊鼓小樂師 3 階站立 **通過**（身體、腳底跟 1 階一樣；紅金祥雲錦緞、背後大戰鼓、金鼓棒、舞獅帽保留）。小樂師三階站立全收，下一步 1 階攻擊 f1～f3（附 1 階站立）。
  - 狸貓忍者 2 階站立 **通過**（深綠忍者服、紅長圍巾往後飄、腰間兩支苦無；身形、臉、尾巴跟 1 階一樣）。繼續 3 階站立。
- 22:02 台灣時間：
  - 狸貓忍者 3 階站立 **通過**（黑紫忍者服、頭頂綠葉、背後巨大風魔手裡劍；身形、腳底跟 1 階一樣）。狸貓三階站立全收，下一步 1 階攻擊 f1～f3。
  - 月兔仙子 2 階站立 **通過**（藍紫裙銀邊、月牙髮飾、藥囊、玉杵；身形、臉、腳底跟 1 階完全一樣）。繼續 3 階站立。
- 22:15 台灣時間：
  - 月兔仙子 3 階站立 **通過**（白金星月仙裙、飄帶披帛、浮空玉兔燈籠、月牙銀杵；身形、腳底跟 1 階一樣）。月兔三階站立全收，下一步 1 階攻擊 f1～f3。
  - 彈弓頑童 2 階站立 **通過**（橘黃短褂藍腰帶、竹籃彈藥袋、紅布彈弓；身高 704、腳底 979）。
  - 彈弓頑童 3 階站立 **退件**：腿被畫長，腳底跑到 y=1038（要 978），身體高多了約 60px（+8%）。衣服、紅頭巾、麻雀、鐵彈弓都很好。請**用已通過的 2 階站立圖去改**，不要重畫整個人：
    `Edit this exact sprite (tier 2). Keep the head, face, body, legs, feet, size and position EXACTLY the same. Only change the outfit to: navy-blue hero outfit with gold trims, red headband, a chubby sparrow on the shoulder, big iron-framed slingshot. Solid magenta #FF00FF background.`
  - 擊鼓小樂師 1 階攻擊 f1 **通過**（頭 95%、腳 90% 跟站立圖同像素，頭頂 274、腳底 975 完全一樣；雙鼓棒舉高、腰鼓保留）。繼續 f2、f3。
- 22:20 台灣時間 擊鼓小樂師 1 階攻擊 f2 **通過**（頭 97% 同像素、頭頂 274、腳底 976；雙棒打在腰鼓上，腿只被鼓擋住一點）。繼續 f3。
  另外：可以同時進行別的角色（彈弓頑童 3 階重交、狸貓／月兔 1 階攻擊），不用等一格一格驗完。
- 22:29 台灣時間：
  - 彈弓頑童 3 階站立（從 2 階改）**通過**（身高 704、腳底 979 跟 2 階一樣；深藍金邊、紅頭巾、肩上麻雀、鐵框大彈弓）。彈弓頑童三階站立全收，下一步 1 階攻擊。
  - 擊鼓小樂師 1 階攻擊 f3 **通過**（頭 96% 同像素、腳底 976；鼓棒在胸前交叉）。1 階攻擊 3 格全收，下一步 2、3 階攻擊（圖 A＝該階站立、圖 B＝1 階同一格）。
  - 狸貓忍者 1 階攻擊 f1 **通過**（頭 95%、腳 92% 同像素；前手把手裡劍收到胸前）。繼續 f2、f3。
- 22:37 台灣時間 狸貓忍者 1 階攻擊 f2、f3 **通過**（頭 95% 同像素、頭頂 318、腳底 979 跟站立一樣；前手伸出丟手裡劍、f3 手張開、尾巴有擺）。1 階攻擊全收，下一步 2、3 階攻擊。彈弓頑童、月兔仙子 1 階攻擊也可以開始。
- 22:45 台灣時間 擊鼓小樂師 2 階攻擊 f1～f3 **通過**（頭頂 259～260、腳底 975 跟 2 階站立一樣，頭 87～91% 同像素；舞獅帽、紅布鼓棒保留，動作跟 1 階一致）。下一步 3 階攻擊。
