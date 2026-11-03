# 放置塔防怪物點陣圖：工單 M1　小怪 8 種

狀態：完成通知
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

這是新遊戲「放置塔防」的**怪物**美術交接處，負責驗收的是 Claude 討論串「繪製塔防怪物和 Boss」。
角色美術是另一組工單（分支 `claude/project-thread-74yvlw`），和這裡無關，兩邊各畫各的。
不要改動 `idle-td-art/monsters/` 以外的檔案。

## 固定流程（接手的人照做）

1. 開工前先 `git fetch origin claude/project-thread-cu41lm`，讀這份 `idle-td-art/monsters/README.md` 最新版（驗收意見只寫在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-cu41lm/idle-td-art/monsters/README.md
2. 「狀態」是「待接手」才接：從 `origin/claude/project-thread-cu41lm` 開分支 **`dot/idle-td-m1`**，把「狀態」改成「進行中：<誰> <時間>」，馬上推。之後成品和狀態都只推 `dot/idle-td-m1`，不要推 main 或 claude/ 分支。
3. 開一個**新的** ChatGPT 畫圖對話（和畫角色的對話分開），照下面畫。檔案放 `idle-td-art/monsters/images/`，檔名照「待辦」。
4. **先只畫第 1 張（史萊姆站立）推上來，等 Claude 在「意見與待辦」寫通過才畫後面。** 之後每張畫好就推，照順序繼續，每 5 分鐘 fetch 一次看意見，有意見就照改。
5. 全部交完把狀態改「待驗收」；看到「完成通知」就接 `idle-td-art/monsters/ORDER-M2.md`（Boss）。

## 鎖死規則（不准改）

- 像素粗細、畫風、上色方式，全部照 **`ref/STANDARD__t2__stand.png`**（這是我方角色，畫布 1254×1254，本體高約 700px，腳底 y≈978）。怪物要像是**同一款遊戲**裡的敵人。
- 怪物大小照下面表格的「身高」（以標準圖本體 700px 為 100%），腳底一律在 y≈978、左右置中（會飛的例外，表格有寫）。
- 一律側 3/4 **朝右**畫（和標準圖同方向；遊戲裡程式會左右翻成朝左走過來）。
- 給 9～11 歲小朋友：**調皮、好笑、有點兇但不恐怖**，不要血、不要噁心。
- 背景純洋紅 `#FF00FF`，整片均勻；不要畫影子、地板、文字、光暈、爆炸、投射物（程式會加）。
- 每次畫都附 `ref/STANDARD__t2__stand.png` 放第一張，指令開頭貼：

```
Draw a NEW enemy monster for the SAME game as the attached image, in EXACTLY the same pixel-art style: same pixel size, same painterly hue-shifted shading, same thin colored outlines, same soft rich palette.
The attached girl is the 100% size reference (her body is about 700 px tall on a 1254x1254 canvas, feet at y=978). Draw the monster at the height I give below, feet on the same ground line, centered.
Side 3/4 view facing RIGHT. Cute-but-mischievous monster for kids aged 9-11: funny and a little fierce, never gory or creepy.
Solid flat magenta #FF00FF background, 1254x1254. No shadow, no floor, no text, no glow, no effects, no projectiles.
```

## 怪物設計

| # | 代號 | 名字 | 身高 | 外型（貼給 GPT 的英文） | 攻擊 4 格（貼給 GPT 的英文） |
|---|---|---|---|---|---|
| 1 | slime | 果凍史萊姆 | 45% | a round translucent mint-green jelly slime with a little leaf sprout on top, two big shiny eyes and a cheeky grin, no arms or legs, you can see a few bubbles inside its body. Height about 45% of the girl. | 1: squashes down flat, gathering power. 2: stretches tall and leans forward. 3: lunges forward with a headbutt, body stretched like a teardrop. 4: wobbles back to round. The leaf sprout flops with every move. |
| 2 | mushroom | 蘑菇妖 | 60% | a grumpy mushroom spirit: big red cap with white spots, a chubby cream stem body with an angry little face, tiny stubby arms and two short legs. Height about 60%. | 1: crouches and pulls its cap down. 2: jumps up, cap flaps up. 3: slams the cap forward like a hat-swat, cap tilted toward the right. 4: lands and straightens the cap. The cap must bounce and tilt differently in every frame. |
| 3 | imp | 小鬼 | 80% | a small red-skinned oni imp with one stubby yellow horn, wild black hair, a tiger-striped loincloth, a big toothy grin with one fang, holding a spiked wooden club over the shoulder. Height about 80%. | 1: raises the club high behind the head. 2: swings the club down in front, leaning forward. 3: club hits the ground in front (right side), body low. 4: hoists the club back on the shoulder, grinning. |
| 4 | skeleton | 骷髏兵 | 100% | a chibi skeleton soldier with a dented rusty helmet, a round wooden shield on the left arm and a short bone sword in the right hand, a torn red sash at the waist, glowing blue dots for eyes. Goofy, rattly, not scary. Height about 100%. | 1: raises the shield and pulls the sword back. 2: steps forward and thrusts the sword. 3: full stab with sword arm extended to the right, sash flying. 4: back to guard stance behind the shield. |
| 5 | wolf | 狼妖 | 95% | a gray wolf demon standing on two legs, fluffy chest fur, a ragged blue scarf, sharp claws, a big bushy tail, yellow eyes with a mischievous look. Height about 95% (ears included). | 1: crouches low, claws back, tail up. 2: leaps forward. 3: claw swipe across to the right, scarf and tail trailing behind. 4: lands in a crouch. The tail and scarf must swing in every frame. |
| 6 | golem | 石頭怪 | 115% | a chunky mossy boulder golem: round rock body with moss and a small flower on top, two huge stone fists, short thick legs, two glowing orange eyes in a dark crack. Wider than tall, heavy and slow. Height about 115%. | 1: lifts both fists high over its head. 2: starts to slam down, body leaning forward. 3: both fists pound the ground in front (right side), body squashed low. 4: pushes back up. Small pebbles on the body stay in place. |
| 7 | bat | 蝙蝠妖 | 55%（飛） | a round purple bat demon: fluffy round body, huge pointy ears, big wings with a lighter membrane, two little fangs, tiny feet. It FLIES: its lowest point floats about 250 px above the ground line (so feet at about y=730). Height about 55%. | 1: wings raised high, body pulled back. 2: wings sweep down, diving forward-down. 3: bite at the lowest point, mouth open, wings swept back. 4: flaps back up, wings half open. The wings MUST flap: a different wing position in every frame. |
| 8 | umbrella | 紙傘妖 | 85% | a paper-umbrella yokai: an old red oiled-paper umbrella with one big eye in the middle and a long silly tongue sticking out, standing on ONE hairy leg with a wooden sandal (geta). Funny, not scary. Height about 85%. | 1: spins the umbrella body, tilting back. 2: hops forward on its one leg. 3: lashes the long tongue straight forward to the right. 4: tongue snaps back, lands on the leg. The umbrella ribs and paper tilt and spin in every frame. |

## 待辦（照順序畫）

| # | 檔名（`idle-td-art/monsters/images/`） | 內容 | 附圖 |
|---|---|---|---|
| 1 | `slime__stand.png` | 史萊姆站立（畫完先停，等驗收） | 標準圖 |
| 2 | `slime__attack.png` | 史萊姆攻擊 4 格 | 標準圖＋`slime__stand.png`＋`ref/LAYOUT__attack-strip.png` |
| 3 | `mushroom__stand.png`、`mushroom__attack.png` | 蘑菇妖 | 同上（換成該怪的站立圖） |
| 4 | `imp__stand.png`、`imp__attack.png` | 小鬼 | 同上 |
| 5 | `skeleton__stand.png`、`skeleton__attack.png` | 骷髏兵 | 同上 |
| 6 | `wolf__stand.png`、`wolf__attack.png` | 狼妖 | 同上 |
| 7 | `golem__stand.png`、`golem__attack.png` | 石頭怪 | 同上 |
| 8 | `bat__stand.png`（2 格：翅膀上、翅膀下）、`bat__attack.png` | 蝙蝠妖 | 同上 |
| 9 | `umbrella__stand.png`、`umbrella__attack.png` | 紙傘妖 | 同上 |

站立圖指令（接在鎖死那段後面）：

```
Monster: <外型那一格的英文>
Relaxed idle pose, facing right, whole body visible.
```

蝙蝠站立改成：

```
Monster: <蝙蝠外型英文>
Draw a 2-frame hovering idle strip, frames side by side in ONE image like the layout reference: frame 1 wings up, frame 2 wings down. Same body size and same height in both frames.
```

攻擊指令（接在鎖死那段後面，附 3 張：標準圖、該怪已通過的站立圖、`ref/LAYOUT__attack-strip.png`）：

```
Image 2 is this monster's approved design. Draw a 4-frame attack animation strip of the SAME monster, frames side by side in ONE image, with the same frame spacing, frame size and ground line as image 3 (image 3 is ONLY a layout reference; do not copy that character or its poses).
<攻擊 4 格那一格的英文>
The monster must look EXACTLY like image 2 in every frame: same colors, same size, same details. Moving parts (tail, scarf, wings, cap, leaf, tongue) must visibly move with the action; they must NOT look identical across frames.
Feet on the same ground line in all frames (the bat keeps flying). Do not draw impact effects, dust, slashes or projectiles; code adds them.
```

GPT 畫歪時可以回它：
- 畫風不同（粗黑框、大像素）：`Match the pixel size and thin colored outlines of image 1 exactly. No thick black outlines.`
- 太恐怖：`Make it cuter and funnier for kids aged 9-11, keep it a little fierce but not scary.`
- 大小不對：`Make the monster about <N>% of the girl's height in image 1, feet on her ground line.`
- 攻擊格裡長相變了：`Every frame must match image 2 exactly in colors, size and details.`

## 驗收重點（同角色工單）

- 和標準圖放一起看，要像同一款遊戲：像素粗細、描邊、上色一致。
- 身高照表格，腳底在同一條地線（蝙蝠例外）。
- 攻擊 4 格：長相、顏色、大小每格都和站立圖一樣；會動的部位（尾巴、圍巾、翅膀、菇傘、葉子、舌頭）每格都要動；不多手少手。

## 意見與待辦

（Claude 驗收後寫在這裡）

### 2026-11-04 02:14（台灣時間）史萊姆站立通過
- 和標準圖並排比：像素粗細、描邊、上色一致，像同一款遊戲。高度 314px（標準 45%），腳底 y≈985，朝右，表情調皮。通過。
- 洋紅背景有細微色差（252,3,251）**沒關係，不用再修**，Claude 去背時會容許色差。之後不用再為背景色重畫。
- 繼續畫 `slime__attack.png`，之後照待辦順序畫下去，每張畫好就推，不用每張等驗收。

### 2026-11-04 02:27（台灣時間）史萊姆攻擊通過
- 4 格：壓扁→拉高→往前頂→彈回，葉子每格都在動，腳底同一條地線（y=602），第 4 格大小和站立圖一致（約 1.03 倍）。顏色、泡泡、表情每格一致。通過。
- 繼續畫蘑菇妖站立和攻擊，照待辦順序下去。

### 2026-11-04 02:37（台灣時間）蘑菇妖、小鬼、骷髏兵通過；狼妖站立通過
- 三隻的站立和攻擊 4 格都通過：畫風和標準圖一致，身高 62%／83%／97%，腳底在地線；攻擊每格長相、顏色一致，菇傘、狼牙棒、紅腰帶有跟著動作擺。
- 骷髏兵拿的是骨頭棒不是骨刀，很好笑，**保留不用改**。
- 狼妖站立（身高 102%）通過，繼續畫狼妖攻擊。
- 攻擊條裡的怪物比站立圖小（約 0.6～0.75 倍），Claude 切格時會統一縮放，**不用重畫**；之後的攻擊條可以讓怪物畫大一點、填滿格子高度。

### 2026-11-04 02:44（台灣時間）石頭怪、蝙蝠妖通過；紙傘妖站立通過；**狼妖攻擊退件重畫**
- 石頭怪：站立＋攻擊通過（身高 111%，雙拳舉起→捶地，小花跟著晃）。
- 蝙蝠妖：站立 2 格＋攻擊 4 格通過，翅膀每格都不同，飛在空中。
- 紙傘妖站立（85%）通過，繼續畫紙傘妖攻擊。
- **`wolf__attack.png` 重畫**：
  1. 狼在攻擊條裡畫得太小（只有格子高度的 45%，其他怪約 60～75%），放大到站立圖大小後像素會變粗。請讓狼**填滿格子高度約 85%**。
  2. 尾巴在攻擊格裡比站立圖大很多（快跟身體一樣大），要和 `wolf__stand.png` 一樣大小。
  3. 給 GPT 加一句：`Draw the wolf BIGGER, filling about 85% of the frame height. The tail must be the same size as in image 2, not bigger. Keep the same poses: crouch, leap, claw swipe, land.`

### 2026-11-04 02:50（台灣時間）紙傘妖攻擊通過
- 4 格：傾身→單腳跳→舌頭往前甩→收回，傘面、木屐、舌頭每格都在動，補丁位置一致。通過。
- M1 只剩 **`wolf__attack.png` 重畫**（見 02:44 的意見）。重畫好推上來，通過就發完成通知。

### 2026-11-04 02:57（台灣時間）狼妖攻擊重畫版通過；**改成重畫狼妖站立**，然後直接接 M2
- `wolf__attack.png`（6211a35）：大小對了，4 格動作清楚，圍巾每格飄。通過，保留這版。
- 但這版狼毛色偏暖棕、尾巴比站立圖小很多，和 `wolf__stand.png`（偏灰、尾巴很大）放一起會跳。**改成以攻擊圖為準，重畫 `wolf__stand.png`**：附 `ref/STANDARD__t2__stand.png`＋`images/wolf__attack.png`，給 GPT 加一句：`Redraw the standing idle pose of the wolf from image 2: exactly the same fur colors (warm gray-brown), the same tail size, the same scarf and the same size as in image 2. Relaxed idle stance facing right, feet at y=978, height about 100% of the girl.`
- 狼妖站立推上來後**不用等驗收**，直接接 `ORDER-M2.md`（Boss，分支 `dot/idle-td-m2`）開始畫史萊姆王站立。狼妖站立驗過後我會在這裡寫 M1 完成通知。

### 2026-11-04 03:04（台灣時間）狼妖站立重畫版通過 → **完成通知**
- 毛色、尾巴、圍巾和攻擊圖一致，身高 97%。通過。
- **完成通知：工單 M1 小怪 8 種 16 張全部收齊。請接 `ORDER-M2.md`（Boss，分支 `dot/idle-td-m2`）。**
