# 放置塔防角色點陣圖：工單 8　三階角色第 2 組（妖狐、熊貓拳師、海盜船長、殭屍道士、巫婆學徒）

狀態：進行中：Codex 2026-11-04 07:21（台灣時間）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-74yvlw`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-74yvlw/idle-td-art/ORDER-08.md
2. 從 `origin/claude/project-thread-74yvlw` 開分支 **`dot/idle-td-8`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-8`。
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

### 妖狐（`kitsune`，法術（火））

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 狐耳少年、深藍短褂、一團狐火 | fox-eared boy: silver hair, fox ears, dark blue short jacket, one fox tail, a small orange fox-fire in his palm |
| 2 | 2 條尾巴＋狐面具；火變藍 | same character, TWO tails, fox mask on the side of his head, the fire becomes blue |
| 3 | 3 條尾巴＋黑金羽織；身邊一圈狐火 | same character, THREE tails, black-and-gold haori, a ring of blue fox-fires around him |

待辦：`kitsune__t1__stand.png` → `kitsune__t2__stand.png`、`kitsune__t3__stand.png` → `kitsune__t1__attack.png` → `kitsune__t2__attack.png`、`kitsune__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: pulls the hand with fox-fire back.
Frame 2: throws the fox-fire forward, arm extended.
Frame 3: follow-through, tails and jacket swinging.
Frame 4: returns to idle.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 熊貓拳師（`panda`，近戰）

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 熊貓耳帽、白黑功夫服 | kung-fu kid in a panda-ear hood, white-and-black kung fu clothes |
| 2 | 紅腰帶＋竹籃背包；拳套 | same character, red sash, bamboo basket backpack, fist wraps |
| 3 | 金邊黑功夫服＋背後竹子長棍 | same character, black kung fu outfit with gold trims, long bamboo staff on his back |

待辦：`panda__t1__stand.png` → `panda__t2__stand.png`、`panda__t3__stand.png` → `panda__t1__attack.png` → `panda__t2__attack.png`、`panda__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: chambers a fist at the waist, low stance.
Frame 2: straight punch forward.
Frame 3: punch at full reach, sash swinging.
Frame 4: returns to stance.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 海盜船長（`pirate`，遠程（槍））

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 條紋衫、紅頭巾、小手槍 | little pirate: striped shirt, red bandana, small flintlock pistol |
| 2 | 船長帽＋眼罩；肩上一隻鸚鵡 | same character, captain hat and eye patch, a parrot on his shoulder |
| 3 | 金扣大衣＋骷髏帽；雙火槍 | same character, long coat with gold buttons, skull hat, two flintlock pistols |

待辦：`pirate__t1__stand.png` → `pirate__t2__stand.png`、`pirate__t3__stand.png` → `pirate__t1__attack.png` → `pirate__t2__attack.png`、`pirate__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: raises the pistol, aiming.
Frame 2: fires: arm extended, recoil starting (no smoke drawn).
Frame 3: recoil, arm kicks up, coat swinging.
Frame 4: lowers the pistol.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 殭屍道士（`jiangshi`，輔助（定身））

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 小殭屍：清朝官服、額頭黃符、雙手前伸 | little jiangshi hopping zombie: Qing official robe and hat, yellow talisman on the forehead, arms stretched forward |
| 2 | 帽子加紅珠；身邊飄符紙 | same character, red bead on the hat, paper talismans floating around |
| 3 | 紫金官服＋背後大符旗；額符變金色 | same character, purple-gold official robe, big talisman flag on the back, the forehead talisman becomes golden |

待辦：`jiangshi__t1__stand.png` → `jiangshi__t2__stand.png`、`jiangshi__t3__stand.png` → `jiangshi__t1__attack.png` → `jiangshi__t2__attack.png`、`jiangshi__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: crouches before a hop, arms forward.
Frame 2: hops forward, arms stiff, sleeves flapping.
Frame 3: lands, talisman fluttering.
Frame 4: back to idle.
Keep the feet on the same ground line in all frames. Projectiles, slashes and glow are added by code, do not draw them.
```

### 巫婆學徒（`witch`，法術）

| 階 | 外型 | 英文（貼給 GPT） |
|---|---|---|
| 1 | 尖帽、紫斗篷、小掃帚 | witch apprentice girl: pointy hat, purple cloak, small broom |
| 2 | 帽子更大加星星；肩上黑貓 | same character, bigger hat with stars, a black cat on her shoulder |
| 3 | 星空長袍＋浮空魔法書；掃帚變法杖 | same character, starry night robe, a magic book floating beside her, broom becomes a wand-staff |

待辦：`witch__t1__stand.png` → `witch__t2__stand.png`、`witch__t3__stand.png` → `witch__t1__attack.png` → `witch__t2__attack.png`、`witch__t3__attack.png`

1 階攻擊指令：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: raises the staff over her head.
Frame 2: swings it forward, casting.
Frame 3: arm extended, cloak and hat swinging.
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
