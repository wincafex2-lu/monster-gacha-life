# 放置塔防角色點陣圖：工單 5　機甲少年五階（A4）

狀態：待接手（前一張工單出現「完成通知」後才接，順序見 `QUEUE.md`）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-74yvlw`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-74yvlw/idle-td-art/ORDER-05.md
2. 從 `origin/claude/project-thread-74yvlw` 開分支 **`dot/idle-td-5`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-5`。
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

## 角色：機甲少年

穿小機甲裝的少年，越進化機甲越大（坦克／重擊）。主色：藍＋白＋黃。

| 階 | 衣服／頭髮配色 | 新增大配件（累加） | 武器 | 英文（貼給 GPT） |
|---|---|---|---|---|
| 1 | 藍色工作服、護目鏡，棕刺頭 | — | 一隻大扳手 | mechanic boy: spiky brown hair, goggles on forehead, blue work overalls, holding a big wrench |
| 2 | 白藍外骨骼裝 | 背後一個噴射背包 | 機械拳套（右手） | white-and-blue exoskeleton suit, a jetpack on his back, mechanical gauntlet on the right hand |
| 3 | 白藍＋黃條紋裝甲 | 雙肩大型肩甲＋天線 | 雙拳套 | white-blue armor with yellow stripes, big shoulder armor on both shoulders, antenna, gauntlets on both hands |
| 4 | 深藍＋金裝甲，護目鏡變發光面罩 | 背後一隻小機器人助手浮著 | 能量拳（拳頭發藍光） | deep blue and gold armor, glowing visor instead of goggles, a small robot helper floating behind him, energy fists |
| 5 傳說 | 白金傳說機甲，頭髮變亮藍 | 頭盔＋片狀推進器機械翼＋兩個浮空砲台 | 巨大金色機械拳 | legendary white-and-gold mecha armor, bright blue hair, full helmet, blade-like thruster wings, two floating turrets, huge golden mechanical fist |

## 待辦（照順序）

| # | 檔名（`idle-td-art/images/`） | 內容 | 附圖 |
|---|---|---|---|
| 1 | `mecha__t1__stand.png` | 1 階站立 | 標準圖 |
| 2 | `mecha__t2__stand.png`～`mecha__t5__stand.png` | 2～5 階站立 | 標準圖＋已通過的 `mecha__t1__stand.png` |
| 3 | `mecha__t1__attack.png` | 1 階攻擊 4 格橫排 | 標準圖＋`mecha__t1__stand.png`＋`images/disciple__t1__attack.png`（只看格距地線） |
| 4 | `mecha__t2__attack.png`～`mecha__t5__attack.png` | 2～5 階攻擊 | 圖 A＝該階站立，圖 B＝`mecha__t1__attack.png` |

1 階攻擊指令（接在鎖死那段後面）：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: winds up, right fist pulled back by the shoulder, body twisted.
Frame 2: dashes forward with a big straight punch, arm fully extended.
Frame 3: punch at full reach, jetpack/thrusters flare (no effect drawn), back foot planted.
Frame 4: pulls the fist back toward the idle stance.
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

### 2026-11-04 04:37（台灣時間）1 階站立通過
- 棕刺頭、額頭護目鏡、藍色吊帶工作服、大扳手，都對；腳底一致（978），身高 319～978，和標準圖差在髮型，頭身比例一致。通過，繼續 2～5 階站立（附這張當第二張參考，臉要同一個人）。攻擊圖請和站立圖一樣大。

### 2026-11-04 04:50（台灣時間）2～5 階站立通過
- 2 階：白藍外骨骼、噴射背包、機械拳套。3 階：黃條紋裝甲、雙肩大肩甲、天線、雙拳套。4 階：深藍金甲、發光面罩、浮空小機器人、藍光能量拳。5 階：亮藍髮、全罩頭盔、片狀推進翼、兩座浮空砲台、金色巨拳。配件累加都對，身體大小、腳底和 1 階一致。通過。
- 繼續 1 階攻擊（4 格），再 2～5 階攻擊。噴射背包、天線、機器人、推進翼、砲台在攻擊 4 格要跟著動（翼要張合、砲台要上下或轉向），每格都要在，攻擊圖和站立圖一樣大。
