# 放置塔防角色點陣圖：工單 9　三階角色第 3 組（木乃伊、雪女、貓武士、廚師阿嬤、鯊魚潛水兵）

狀態：待接手（前一張工單出現「完成通知」後才接，順序見 `QUEUE.md`）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-74yvlw`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-74yvlw/idle-td-art/ORDER-09.md
2. 從 `origin/claude/project-thread-74yvlw` 開分支 **`dot/idle-td-9`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-9`。
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

## 角色（每支 1～3 階，每階換配色＋加一件大配件累加）

### 木乃伊（`mummy`，坦克）

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 全身繃帶、一隻眼露出 | little mummy: wrapped in bandages, one eye showing |
| 2 | 繃帶加金色護符；身邊一隻小聖甲蟲 | same character, golden amulets on the bandages, small scarab beside |
| 3 | 金色胸甲＋法老蛇頭冠；繃帶飄動 | same character, golden breastplate, cobra headdress, loose bandage ends floating |

待辦：`mummy__t1__stand.png` → `mummy__t2__stand.png`、`mummy__t3__stand.png` → `mummy__t1__attack.png` → `mummy__t2__attack.png`、`mummy__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: pulls both arms back.
Frame 2: swings a heavy two-arm smash forward.
Frame 3: smash at full reach, bandage ends swinging.
Frame 4: back to idle.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 雪女（`yukionna`，法術（冰））

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 白和服、水藍髮、冰晶髮飾 | snow girl: white kimono, light blue hair, ice crystal hair ornament |
| 2 | 冰藍羽織＋雪花紋；浮空小冰晶 | same character, ice-blue haori with snowflake pattern, small floating ice crystals |
| 3 | 透明冰羽披肩＋冰冠；冰扇 | same character, translucent ice-feather shawl, ice crown, ice fan |

待辦：`yukionna__t1__stand.png` → `yukionna__t2__stand.png`、`yukionna__t3__stand.png` → `yukionna__t1__attack.png` → `yukionna__t2__attack.png`、`yukionna__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: raises the fan / hand.
Frame 2: sweeps the fan forward.
Frame 3: follow-through, sleeves and hair swinging.
Frame 4: back to idle.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 貓武士（`catsamurai`，近戰）

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 橘貓人、藍浪人服、竹刀 | orange cat-person samurai: blue ronin clothes, bamboo practice sword |
| 2 | 紅色陣羽織；武士刀 | same character, red jinbaori vest, real katana |
| 3 | 黑金鎧甲＋鬼角頭盔；雙刀 | same character, black-and-gold armor, oni-horn helmet, two katanas |

待辦：`catsamurai__t1__stand.png` → `catsamurai__t2__stand.png`、`catsamurai__t3__stand.png` → `catsamurai__t1__attack.png` → `catsamurai__t2__attack.png`、`catsamurai__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: draws the sword back, low stance.
Frame 2: fast forward slash.
Frame 3: follow-through, tail and clothes swinging.
Frame 4: back to idle.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 廚師阿嬤（`grandma`，輔助（補血））

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 圍裙、包頭巾、鍋鏟 | cheerful cook grandma: apron, head scarf, spatula |
| 2 | 背後大炒鍋 | same character, a big wok on her back |
| 3 | 金邊廚師高帽＋小推車；金鍋鏟 | same character, tall chef hat with gold trims, small food cart beside her, golden spatula |

待辦：`grandma__t1__stand.png` → `grandma__t2__stand.png`、`grandma__t3__stand.png` → `grandma__t1__attack.png` → `grandma__t2__attack.png`、`grandma__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: raises the spatula.
Frame 2: flips food forward with the spatula.
Frame 3: follow-through, apron swinging.
Frame 4: back to idle, smiling.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 鯊魚潛水兵（`shark`，遠程（魚叉））

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 鯊魚頭套、潛水服、魚叉 | diver kid in a shark hood, wetsuit, harpoon |
| 2 | 氧氣瓶背包＋蛙鞋 | same character, oxygen tank backpack and flippers |
| 3 | 深海鎧甲＋鯊魚鰭披風；三叉戟 | same character, deep-sea armor, shark-fin cape, trident |

待辦：`shark__t1__stand.png` → `shark__t2__stand.png`、`shark__t3__stand.png` → `shark__t1__attack.png` → `shark__t2__attack.png`、`shark__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: pulls the harpoon back to throw.
Frame 2: throws-thrust forward, arm extended.
Frame 3: full reach, cape swinging.
Frame 4: back to idle.
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

- 08:47 台灣時間 1 階站立圖：
  - 貓武士 **通過**（貓臉本身就跟別人不同；之後的階也保持這張臉）。可以接著畫 `catsamurai__t2__stand.png`、`catsamurai__t3__stand.png`。
  - 廚師阿嬤 **退件**：臉跟大家一樣（圓大眼＋張嘴笑）。照上面臉表重畫：笑瞇成彎月的眼、眼角皺紋、灰白彎眉。衣服、身形、鍋鏟都保持不變，只改臉。
  - 鯊魚潛水兵 **退件**：臉跟大家一樣。照臉表重畫：圓大眼小瞳孔、粗八字眉、咧嘴露鯊魚尖牙。鯊魚頭套、潛水衣、魚叉保持不變，只改臉。
  - 改臉用的英文指令（附上原圖）：`Keep this exact sprite (same size, outfit, pose, colors). Only redraw the face: eyes = ..., eyebrows = ..., mouth = .... Solid magenta #FF00FF background.`

### 新規則（2026-11-04 08:45 台灣時間，泓 要求，本單起全部適用）

**1. 攻擊圖鎖比例。** 攻擊圖每一格的頭大小、頭身比都要跟同一階的站立圖一模一樣，身體、腿不可以拉長，人也不可以整個變大。（泓 確認：頭大小差不多，主要是身體被拉長。）Claude 驗收時分開量兩個數字，不看整個人的高度：
- **頭高**：頭頂（不含帽子、髮飾往上翹的部分）到下巴。
- **身體高**：下巴到腳底。

攻擊圖每一格的頭高、身體高都要跟同一階站立圖一樣，兩個數字任何一個差超過 3% 就退件（彎腰、蹲下的格子量伸直的部位，例如腿長）。
寬度也要對（泓 08:50 補充）：以站立圖兩腳站立的寬度（左腳外緣到右腳外緣）當基準，再加上肩寬、單腳鞋子的寬度。第 4 格（待機）兩腳站寬要跟站立圖一樣；跨步、出招的格子腳會張開，就比肩寬和鞋子寬；動作太難比的格子，就單獨拿一隻腳（例如前腳）出來，比那隻腳的長度（膝蓋到腳底）和寬度（腿寬、鞋寬）跟站立圖同一隻腳一樣。差超過 3% 一樣退件。
4 格全部都量，不是只看第 1 格：第 4 格（回到待機）要跟站立圖幾乎一模一樣，第 1～3 格動作不同，就量頭高和沒彎的那段身體。升階攻擊指令最後加這兩行：

```
- Every frame must have EXACTLY the same head size and the same body length as image A (the standing sprite). Do not stretch the torso or legs, do not make the character bigger.
- The head is usually fine; the problem is the BODY getting longer. Keep BOTH the head height (top of head to chin) and the body height (chin to soles) exactly as in image A; the head : body ratio must stay the same. Compare EVERY frame (1-4) with image A side by side before finishing; frame 4 (back to idle) must match image A almost exactly, including the width between the two feet. Shoulder width and shoe size must stay the same as image A in every frame.
```

1 階攻擊指令也加同樣兩行（image A ＝ 1 階站立圖，請一起附上）。

**2. 每個角色的臉要不一樣。** 不可以每個角色都是同一張臉只換眼睛顏色。眼型、眉毛、嘴巴要照下面畫，1 階站立圖指令最後加上該角色那一行：

| 角色 | 眼睛 | 眉毛 | 嘴巴 |
|---|---|---|---|
| 木乃伊 | 一眼露出、半瞇的細長眼，另一眼被繃帶蓋住 | 看不到（繃帶） | 小小歪嘴、有點睏 |
| 雪女 | 細長下垂的冷淡眼、長睫毛 | 細淡、平直 | 小小抿嘴，不笑 |
| 貓武士 | 貓眼（直瞳孔）、眼角上挑 | 粗短、往中間皺（認真） | 貓嘴「ω」，露一顆小尖牙 |
| 廚師阿嬤 | 笑瞇成彎月的眼、眼角有皺紋 | 灰白、彎彎的 | 張大笑，嘴角很高 |
| 鯊魚潛水兵 | 圓圓的大眼、小瞳孔（有點緊張） | 粗、八字往上 | 咧嘴露出一排鯊魚尖牙 |

英文提示（接在角色描述後面）：

```
Give this character a UNIQUE face, not the default chibi face: eyes = <眼睛>, eyebrows = <眉毛>, mouth = <嘴巴>. Do not reuse the same face as other characters.
```

已交的 3 張 1 階站立圖（貓武士、廚師阿嬤、鯊魚）若臉沒照上表，會退件重畫。
- 08:54 台灣時間 改臉後：廚師阿嬤 **通過**（笑瞇彎月眼、張大笑）、鯊魚潛水兵 **通過**（圓眼小瞳孔、八字眉、鯊魚牙）。三人都可以接著畫 2、3 階站立圖，臉要保持這張。木乃伊、雪女的 1 階站立圖照臉表畫。
- 09:05 台灣時間 2、3 階站立圖：貓武士、廚師阿嬤、鯊魚潛水兵 6 張全部 **通過**（配件照表累加、身形大小和 1 階一樣、臉保持）。下一步：三人的 1 階攻擊圖（附 1 階站立圖當 image A，記得加上面「攻擊圖鎖比例」那幾行，4 格的頭高、身體高、腳寬都要跟站立圖一樣）。
- 09:33 台灣時間 木乃伊、雪女 1 階站立 **通過**（木乃伊一眼露出半瞇、雪女細長冷淡眼＋抿嘴，臉都跟別人不同）。兩人可以接著畫 2、3 階站立，臉保持這張。貓武士、阿嬤、鯊魚照上一則畫 1 階攻擊。

### 規則調整（2026-11-04 09:39 台灣時間，泓 核准）

- **頭高、身體高：維持 3%。**
- **站寬、肩寬、鞋寬、前腳：放寬到 6%**（鞋子只有幾十個像素，3% 只差一兩個像素，GPT 控制不到，量測誤差也有約 2%）。
- **第 4 格（回到待機）**：Claude 切圖時直接換成站立圖本身，不用畫到完全一樣；但第 4 格仍要畫，當作動作收尾的參考。
- **畫好就先上傳**，由 Claude 量完決定通過或退件，不要自己卡著不交。
- 09:45 台灣時間 木乃伊、雪女 2、3 階站立 4 張 **通過**（聖甲蟲、金護符、蛇頭冠、飄動繃帶；冰晶羽織、浮空冰晶、冰冠、冰扇、羽毛披肩都照表）。下一步：兩人的 1 階攻擊。
- 09:45 台灣時間 1 階攻擊：貓武士、廚師阿嬤、鯊魚潛水兵 **通過**。臉對齊後量 4 格，頭高、身體高都在 3% 內，寬度在 6% 內，第 4 格跟站立圖幾乎重疊；動作順、尾巴有擺。下一步：三人的 2、3 階攻擊（圖 B 用這次通過的 1 階攻擊，加鎖比例那幾行）。
- 09:53 台灣時間 1 階攻擊：木乃伊、雪女 **通過**（臉對齊後頭高、身體高在 3% 內，寬度在 6% 內；繃帶、袖子、髮帶有擺動；雪女攻擊時眼睛睜大一點可以，眼型眉毛嘴巴沒變）。下一步：兩人的 2、3 階攻擊。
- 10:05 台灣時間 2、3 階攻擊：貓武士、廚師阿嬤、鯊魚潛水兵、木乃伊 8 張 **通過**（臉對齊後頭高、身體高在 3% 內，寬度 6% 內；每格服裝和同階站立一致；陣羽織、披風、繃帶有擺動；貓 3 階雙刀、阿嬤 3 階金鍋鏟＋推車、鯊魚 3 階三叉戟都對）。只剩雪女 2、3 階攻擊。

### 10:12 台灣時間 更正：之前的攻擊圖「通過」撤回（Claude 驗收看錯）

泓 指出身體明顯變大。Claude 改用數字量（臉對齊後，頭頂到臉、臉到腳底分開算，跟同階站立圖比），之前用眼睛看對照圖判斷是錯的。結果：

| 角色 | 1 階攻擊（f1 / f2 / f3 / f4 身體差） | 2 階 | 3 階 |
|---|---|---|---|
| 貓武士 | +2 / **+6** / +2 / +2 | **+2～+3**（邊緣） | **+13～+19** |
| 廚師阿嬤 | **+8 / +9 / +18 / +11** | **+10～+18** | **+4～+8** |
| 鯊魚潛水兵 | **+5 / +5 / +5 / +5**；前手握魚叉的手指畫錯 | 通過（−2～+1） | **+5～+7**，頭 −4 |
| 木乃伊 | +3 / +1 / −3 / **+6**（邊緣） | **+1～+4**（邊緣） | **+6～+10** |
| 雪女 | **+6 / +6 / +8 / +8** | 未交 | 未交 |

（單位 %；粗體＝超過 3%。頭高大多在 ±3% 內，問題都在身體被畫長。）

**只有鯊魚 2 階攻擊通過，其他全部重畫。** 重點：
- 腿和軀幹不能比站立圖長，畫完把每一格跟站立圖並排，從下巴到腳底量一次。
- 鯊魚：前手握魚叉要像真的握住棍子（4 根手指從同一邊包住、拇指在另一邊），手套形狀跟站立圖一樣。
- 順序：先重交 5 支 1 階攻擊，通過後再重畫 2、3 階（用新 1 階當圖 B）。

### 10:14 台灣時間 新畫法試做（先用廚師阿嬤 1 階攻擊）

一次畫 4 格時 GPT 會把身體畫長。改成**拿站立圖一格一格改**：

1. 附上 `grandma__t1__stand.png`，用下面指令產生第 1 格；第 2、3 格各再做一次（換動作描述）。第 4 格不用畫（切圖時用站立圖）。
2. 3 格各存一張：`grandma__t1__attack_f1.png`、`grandma__t1__attack_f2.png`、`grandma__t1__attack_f3.png`（Claude 自己拼成一條）。

```
Edit this exact sprite. Keep the head, face, body, legs, feet, outfit, size and position EXACTLY the same (same pixels where possible).
ONLY change the arms and the spatula to this pose: <動作>.
Do not make the body or legs longer, do not move the feet, do not resize anything. Same magenta #FF00FF background.
```

動作：f1 = raises the spatula up high；f2 = swings the spatula forward, arm extended；f3 = spatula pointing down-forward at the end of the swing, apron ties swinging.

阿嬤這樣做通過的話，其他角色的攻擊圖都改用這個方法。
- 10:16 台灣時間 雪女 2、3 階攻擊收到，但 1 階攻擊已經退件（身體 +6～8%），2、3 階要等新 1 階通過後一起重畫。工單 9 狀態維持「進行中」，請先做上面阿嬤的新畫法試做。
- 10:31 台灣時間 阿嬤新畫法試做：f1／f2／f3 量起來頭 −0.3～−0.4%、身體 −0.2～+0.2%，**比例完全對**（以前一次畫 4 格是 +8～+18%）。已交給泓 看動作是否夠用，等泓決定是否全部改用這個方法；這段時間先不要畫別的攻擊圖。

### 11:33 台灣時間 攻擊圖一律改用「站立圖逐格改」（泓 核准）

阿嬤試做比例誤差 0.4% 以內，泓 看過程式加的動作示範後同意。**從現在起所有攻擊圖都用這個方法，不再一次畫 4 格的長條。**

- 每階攻擊交 3 張單格：`<代號>__t<階>__attack_f1.png`、`_f2.png`、`_f3.png`。第 4 格不用畫（用站立圖）。身體前傾、壓扁、踏步、刀光、震動都由程式加，**圖裡身體、腿、腳都不要動**。
- **1 階**：附 1 階站立圖，用下面指令，`<動作>` 照該角色原本攻擊指令的 Frame 1～3 描述。
- **2 階以上**：附圖 A＝該階站立圖、圖 B＝已通過的 1 階同一格，用第二段指令。

```
Edit this exact sprite. Keep the head, face, body, legs, feet, outfit, size and position EXACTLY the same (same pixels where possible).
ONLY change the arms and the weapon to this pose: <動作>. Moving accessories (cape, tail, ribbons, wings) may swing a little.
Do not make the body or legs longer, do not move the feet, do not resize anything. Same magenta #FF00FF background.
```

```
Edit image A (tier N sprite). Keep its head, face, body, legs, feet, outfit, size and position EXACTLY the same.
ONLY change the arms and the weapon so the pose matches image B (same character at tier 1). Use the tier N weapon from image A.
Moving accessories (cape, tail, ribbons, wings) may swing a little. Do not resize anything. Same magenta #FF00FF background.
```

- 阿嬤 1 階攻擊（f1～f3 試做）**通過**。接著：阿嬤 2、3 階；貓武士、鯊魚、木乃伊、雪女 1 階起全部用新方法重交（鯊魚 2 階舊長條也一起改成新方法，風格才一致）。

### 12:55 台灣時間 逐格攻擊 45 格驗收

數字（臉對齊後跟同階站立圖比）：45 格頭高都在 ±1.8% 內、身體高都在 ±2.6% 內，全部在 3% 內。

- 廚師阿嬤 1～3 階、貓武士 1～3 階、鯊魚潛水兵 1～3 階、木乃伊 1～3 階、雪女 1、2 階：**通過**（衣服、配件、武器每格都跟站立一致；鯊魚手套手指正常）。
- 雪女 3 階：f1、f3 **通過**；**f2 退件**：冰扇從原本那隻手跑到另一隻（伸出去的手）拿，武器不能換手。請重做 `yukionna__t3__attack_f2.png`：冰扇留在站立圖那隻手，另一隻手往前伸施法；冰晶可以飄。

### 13:00 台灣時間 更正：武器換手（泓 指出）

- 貓武士 1、2 階 f1 **退件**：站立圖竹刀／武士刀拿在前面那隻手（畫面右邊），f1 舉刀時換成後面那隻手拿。
- 鯊魚潛水兵 1、2、3 階 f1 **退件**：同樣問題，魚叉／三叉戟舉到肩後時換成後面那隻手。
- 重畫這 5 格：**武器一律留在站立圖那隻手**（前手）。舉起的動作改成前手把武器往後上方舉起（像要往前揮或丟），後手握拳或扶在胸前。
- 指令加一句：`The weapon must stay in the SAME hand as in the original sprite (the front hand). Do not move it to the other hand.`
