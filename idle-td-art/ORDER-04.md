# 放置塔防角色點陣圖：工單 4　星弓少女五階（A2）

狀態：待接手（前一張工單出現「完成通知」後才接，順序見 `QUEUE.md`）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-74yvlw`，讀這份最新版（驗收意見在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-74yvlw/idle-td-art/ORDER-04.md
2. 從 `origin/claude/project-thread-74yvlw` 開分支 **`dot/idle-td-4`**，狀態改「進行中：<誰> <時間>」馬上推。之後只推 `dot/idle-td-4`。
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

## 角色：星弓少女

西式遊俠女孩，綠斗篷、馬尾、長弓（遠程）。主色：綠＋棕。

| 階 | 衣服／頭髮配色 | 新增大配件（累加） | 武器 | 英文（貼給 GPT） |
|---|---|---|---|---|
| 1 | 灰綠斗篷、棕皮衣、棕馬尾 | — | 木短弓 | ranger girl: brown ponytail, grey-green hooded cloak, brown leather tunic, holding a small wooden bow |
| 2 | 森林綠斗篷＋銀扣 | 背後箭筒插滿羽毛箭 | 雕花長弓 | forest green cloak with silver clasp, a quiver full of feathered arrows on her back, carved longbow |
| 3 | 綠＋銀甲片，馬尾變亮栗色 | 頭上一隻白色貓頭鷹站著 | 弓身有藤蔓 | green outfit with silver armor plates, bright chestnut ponytail, a small white owl standing on her head, bow wrapped in vines |
| 4 | 深藍星空斗篷＋銀星點，頭髮變銀藍 | 背後浮著一圈 5 顆小星星 | 銀色星弓 | deep blue starry cloak with silver star dots, silver-blue hair, a ring of five small floating stars behind her, silver star bow |
| 5 傳說 | 白銀＋星空藍華麗披風，頭髮變白金帶星光 | 星冠＋背後一對光羽翼＋貓頭鷹變星光鳳凰 | 月牙形大弓，弦是光 | gorgeous white-silver and starry blue cape, platinum hair with star sparkles, a star crown, a pair of light-feather wings, the owl now a starlight phoenix, big crescent-moon bow |

## 待辦（照順序）

| # | 檔名（`idle-td-art/images/`） | 內容 | 附圖 |
|---|---|---|---|
| 1 | `archer__t1__stand.png` | 1 階站立 | 標準圖 |
| 2 | `archer__t2__stand.png`～`archer__t5__stand.png` | 2～5 階站立 | 標準圖＋已通過的 `archer__t1__stand.png` |
| 3 | `archer__t1__attack.png` | 1 階攻擊 4 格橫排 | 標準圖＋`archer__t1__stand.png`＋`images/disciple__t1__attack.png`（只看格距地線） |
| 4 | `archer__t2__attack.png`～`archer__t5__attack.png` | 2～5 階攻擊 | 圖 A＝該階站立，圖 B＝`archer__t1__attack.png` |

1 階攻擊指令（接在鎖死那段後面）：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image with clear empty space between frames, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy its weapon or poses).
Frame 1: draws an arrow from the quiver / nocks it, bow lowered.
Frame 2: raises the bow and pulls the string fully back, aiming right.
Frame 3: releases: string snaps forward, drawing arm flies back, ponytail and cloak swing.
Frame 4: lowers the bow back toward the idle stance.
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

### 2026-11-04 04:01（台灣時間）1 階站立通過
- 棕馬尾、灰綠斗篷、棕皮衣、木短弓，比例腳底一致。通過，繼續 2～5 階站立（附這張當第二張參考）。攻擊圖請和站立圖一樣大。
