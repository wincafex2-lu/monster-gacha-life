# 放置塔防角色點陣圖：工單 7　三階角色第 1 組（法老王、吸血鬼、鐵甲將軍、流浪劍士、森林精靈）

狀態：待接手（前一張工單出現「完成通知」後才接，順序見 `QUEUE.md`）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-74yvlw`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-74yvlw/idle-td-art/ORDER-07.md
2. 從 `origin/claude/project-thread-74yvlw` 開分支 **`dot/idle-td-7`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-7`。
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

### 法老王（`pharaoh`，法術）

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 小王子：白麻衣、藍金條紋頭巾、金臂環 | little pharaoh prince: white linen clothes, blue-and-gold striped nemes headdress, gold armbands |
| 2 | 金色衣領、手持小權杖；身邊一隻小聖甲蟲 | same character, golden broad collar, holding a small scepter, a little scarab floating beside him |
| 3 | 黃金法老頭冠＋黑金披風；聖甲蟲變大金色 | same character, golden pharaoh crown, black-and-gold cape, the scarab now big and golden |

待辦：`pharaoh__t1__stand.png` → `pharaoh__t2__stand.png`、`pharaoh__t3__stand.png` → `pharaoh__t1__attack.png` → `pharaoh__t2__attack.png`、`pharaoh__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: raises the scepter up high.
Frame 2: points the scepter forward, casting.
Frame 3: arm fully extended, headdress and cape swinging.
Frame 4: lowers the scepter back.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 吸血鬼（`vampire`，近戰（吸血））

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 黑斗篷、紅領結、白襯衫、尖牙 | little vampire: pale skin, slicked black hair, tiny fangs, white shirt, red bow tie, black cape |
| 2 | 立領大斗篷內紅；身邊兩隻小蝙蝠 | same character, high-collar big cape with red lining, two small bats flying beside him |
| 3 | 酒紅燕尾服＋銀十字飾；斗篷變蝙蝠翅膀形 | same character, wine-red tailcoat with silver ornaments, cape shaped like bat wings |

待辦：`vampire__t1__stand.png` → `vampire__t2__stand.png`、`vampire__t3__stand.png` → `vampire__t1__attack.png` → `vampire__t2__attack.png`、`vampire__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: crouches, cape pulled around, claws ready.
Frame 2: lunges forward with a claw swipe, cape flaring open.
Frame 3: claw swipe at full reach, cape spread wide.
Frame 4: straightens back, cape settling.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 鐵甲將軍（`general`，坦克）

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 中式小兵：布甲、頭巾、大刀 | little Chinese soldier: cloth armor, headband, holding a big guandao blade |
| 2 | 鐵甲＋紅披風；背後一面令旗 | same character, iron armor and red cape, one command flag on his back |
| 3 | 金甲虎頭肩＋紅纓頭盔；背後三面令旗 | same character, golden armor with tiger-head pauldrons, helmet with red plume, three command flags on his back |

待辦：`general__t1__stand.png` → `general__t2__stand.png`、`general__t3__stand.png` → `general__t1__attack.png` → `general__t2__attack.png`、`general__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: raises the big blade over his shoulder.
Frame 2: swings the blade down diagonally with force.
Frame 3: blade at the bottom of the swing, cape and flags swinging.
Frame 4: lifts the blade back to idle.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 流浪劍士（`swordsman`，近戰）

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 西式：皮衣、圍巾、木劍 | wandering boy swordsman: messy blond hair, leather jacket, scarf, wooden sword |
| 2 | 銀胸甲、長圍巾飄；鐵劍 | same character, silver breastplate, long flowing scarf, iron sword |
| 3 | 藍銀騎士甲＋藍披風；聖劍 | same character, blue-and-silver knight armor, blue cape, ornate holy sword |

待辦：`swordsman__t1__stand.png` → `swordsman__t2__stand.png`、`swordsman__t3__stand.png` → `swordsman__t1__attack.png` → `swordsman__t2__attack.png`、`swordsman__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: pulls the sword back for a horizontal slash.
Frame 2: slashes horizontally across, body turning.
Frame 3: follow-through, sword extended, scarf and cape swinging.
Frame 4: returns to guard stance.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 森林精靈（`elf`，法術（樹））

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 尖耳、綠葉裙、木杖 | forest elf girl: pointy ears, long green hair, leaf dress, wooden staff |
| 2 | 花冠＋藤蔓繞身；杖頂開花 | same character, flower crown, vines wrapping around her, flowers blooming on the staff top |
| 3 | 白金葉片長袍＋蝴蝶翅膀；杖變古樹枝 | same character, white-gold leaf robe, butterfly wings, staff becomes an ancient tree branch |

待辦：`elf__t1__stand.png` → `elf__t2__stand.png`、`elf__t3__stand.png` → `elf__t1__attack.png` → `elf__t2__attack.png`、`elf__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: raises the staff with both hands.
Frame 2: thrusts the staff forward, casting.
Frame 3: staff extended, hair, leaves and wings swinging.
Frame 4: lowers the staff.
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

### 2026-11-04 06:20（台灣時間）5 支 1 階站立全部通過
- 法老王：白麻衣、藍金條紋頭巾、金臂環。吸血鬼：黑斗篷、紅領結、白襯衫、尖牙。鐵甲將軍：布甲、紅頭巾、大刀。流浪劍士：皮衣、紅圍巾、木劍。森林精靈：尖耳、綠葉裙、木杖。比例、腳底都和標準圖一致。全部通過。
- 每支接著畫 2、3 階站立（附該角色 1 階當第二張參考，臉要同一個人），再畫攻擊。攻擊圖人物和站立一樣大；斗篷、圍巾、披風、旗子、翅膀、蝙蝠、聖甲蟲這些在攻擊 4 格要跟著動、每格都在；武器不換手。
