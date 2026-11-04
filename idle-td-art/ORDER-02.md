# 放置塔防角色點陣圖：工單 2　狐仙少女五階（A3）

狀態：完成通知
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-74yvlw`，讀這份 `idle-td-art/ORDER-02.md` 最新版（驗收意見寫在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-74yvlw/idle-td-art/ORDER-02.md
2. 從 `origin/claude/project-thread-74yvlw` 開分支 **`dot/idle-td-2`**，把「狀態」改成「進行中：<誰> <時間>」馬上推。之後成品和狀態都只推 `dot/idle-td-2`。
3. 用 ChatGPT 畫圖，一張畫好就推，檔案放 `idle-td-art/images/`，檔名照「待辦」。
4. **先只畫第 1 張（1 階站立）推上來，等 Claude 在「意見與待辦」寫通過才畫後面。** 之後每張推完照順序繼續，每 5 分鐘 fetch 一次看意見。
5. 全部交完把狀態改「待驗收」；看到「完成通知」就接 `QUEUE.md` 的下一張工單。

## 鎖死規則（不准改）

- 比例、身高、角色大小、像素粗細、畫風、腳底位置，全部照 **`ref/STANDARD__t2__stand.png`**（畫布 1254×1254，本體高約 700px，腳底 y≈978，左右置中）。
- 側 3/4 朝右、輕鬆站。配件只能加在外面，不能把身體拉長或放大。
- 背景純洋紅 `#FF00FF`，光暈閃光不要畫。
- 每次畫都附 `ref/STANDARD__t2__stand.png` 放第一張，指令開頭貼：

```
Draw a NEW character in EXACTLY the same pixel-art style and proportions as the attached image.
LOCKED PROPORTIONS: match the attached image EXACTLY in head size, body size, total height, pixel size and ground line. Do not change proportions at all. Same 3/4 view facing right, relaxed idle stance. Solid magenta #FF00FF background, no effects, no shadow, no text.
```

## 角色：狐仙少女

九尾妖狐少女，狐耳、巫女服，用符咒打（法術型）。**尾巴數量隨階數增加：1→3→5→7→9**，這是最重要的辨識點。主色：白＋紅＋橘。

| 階 | 衣服／頭髮配色 | 新增大配件（累加） | 武器 | 英文（貼給 GPT） |
|---|---|---|---|---|
| 1 | 白衣紅褲，橘色頭髮、橘色狐耳 | 1 條橘色狐尾 | 一張黃符紙 | fox-girl shrine maiden: orange hair with orange fox ears, white top and red hakama, ONE fluffy orange fox tail, holding one yellow paper talisman |
| 2 | 白衣紅褲＋金邊 | 3 條尾巴＋手邊一團藍色狐火 | 一疊符 | same girl, gold trims on the white top, THREE fox tails, a small blue fox-fire floating by her hand, holding a stack of talismans |
| 3 | 紅白巫女服＋花紋，頭髮變亮金橘 | 5 條尾巴＋狐面具戴在頭側 | 神樂鈴 | red-and-white shrine robe with flower patterns, bright golden-orange hair, FIVE tails, a white fox mask worn on the side of her head, holding a kagura bell staff |
| 4 | 紫黑和服＋金色楓葉紋，頭髮變銀白 | 7 條尾巴＋背後一圈浮空符紙 | 金鈴杖 | purple-black kimono with gold maple-leaf pattern, silver-white hair, SEVEN tails, a ring of floating paper talismans behind her, golden bell staff |
| 5 傳說 | 白金華麗和服＋紅寶石，頭髮白金、尾尖金色 | 9 條大尾巴展開成扇形＋金色狐耳冠＋三團狐火 | 金色長鈴杖掛滿符 | gorgeous white-and-gold kimono with red gems, platinum hair, NINE big tails fanned out behind her with golden tips, a golden crown between the fox ears, three blue fox-fires floating around, long golden bell staff hung with talismans |

## 待辦（照順序）

| # | 檔名（`idle-td-art/images/`） | 內容 | 附圖 |
|---|---|---|---|
| 1 | `fox__t1__stand.png` | 1 階站立 | 標準圖 |
| 2 | `fox__t2__stand.png`～`fox__t5__stand.png`（4 張） | 2～5 階站立 | 標準圖＋已通過的 `fox__t1__stand.png`（同一個人的臉） |
| 3 | `fox__t1__attack.png` | 1 階攻擊 4 格橫排 | 標準圖＋`fox__t1__stand.png`＋`images/disciple__t1__attack.png`（只參考格數、格距、地線） |
| 4 | `fox__t2__attack.png`～`fox__t5__attack.png` | 2～5 階攻擊 | 圖 A＝該階站立，圖 B＝`fox__t1__attack.png`，用工單 1 的「升階動作」指令 |

1 階攻擊指令（接在鎖死那段後面）：

```
Draw a 4-frame attack animation strip of this character, frames side by side in ONE image, same frame spacing and ground line as the disciple strip (that strip is ONLY a layout reference, do not copy the broom or the poses).
Frame 1: wind-up, raises the talisman beside her head, tails swing back.
All tails, sleeves and hair must visibly swing with the motion in every frame; they must NOT look identical across frames.
Frame 2: throws the talisman forward with the right arm extended, body leaning forward.
Frame 3: follow-through, arm fully extended, tail swings forward.
Frame 4: recovering back toward the idle stance.
Keep the feet on the same ground line in all frames. The talisman projectile and glow are added by code, do not draw them.
```

## 驗收重點（泓指定）

- 服裝一致：攻擊每一格的衣服、頭髮、尾巴數、配件、武器細節都要和同階站立圖一樣。
- 會動的配件要動（泓指定）：尾巴、袖子、飄帶、符紙在攻擊 4 格要跟著甩動，不能每格都一樣。
- 動作不奇怪：手握住武器、不多手少手；腳底每格同一條地線；尾巴配件跟動作自然擺，不能消失或數量變；每格身體一樣大，也和站立圖一樣大。

## 意見與待辦

（Claude 驗收後寫在這裡）

### 2026-11-04 02:01（台灣時間）1 階站立通過
- 身高、腳底和標準圖一致（283～977 vs 275～978）；橘髮狐耳、白衣紅褲、1 條尾巴、黃符紙都對。通過，繼續 2～5 階站立（附這張當第二張參考，臉要同一個人）。

### 2026-11-04 02:16（台灣時間）2、3 階站立通過
- 2 階：3 條尾巴、白衣金邊、藍狐火、一疊符，比例一致。通過。
- 3 階：5 條尾巴、狐面具、花紋巫女服、神樂鈴，比例一致。通過。繼續 4、5 階。

### 2026-11-04 02:24（台灣時間）4、5 階站立通過；1 階攻擊第 3 格退件
- 4 階：7 條銀白尾巴、紫黑楓葉和服、浮空符紙圈、金鈴杖，比例一致。通過。
- 5 階：9 條金尖大尾巴扇形展開、金冠、三團狐火、白金和服、金長鈴杖，比例一致。通過。
- `fox__t1__attack.png`：比例、服裝 4 格一致，丟符動作清楚；**但第 3 格尾巴從身後左邊跳到身體前面右邊（從兩腿間跑出來），看起來很怪。** 尾巴要一直留在身後（左邊），只改變擺的角度：第 1 格往後下垂、第 2 格往上甩、第 3 格往上往後揚起最高、第 4 格回落。重畫整條（之後 2～5 階都照這條，所以要先修好）。
- 給 GPT 加一句：`The tail must ALWAYS stay behind her body on the LEFT side and never pass between or in front of her legs. Show the swing only by changing the tail's angle: frame 1 low, frame 2 rising, frame 3 highest and flared up behind her, frame 4 coming down.`

### 2026-11-04 02:31（台灣時間）1 階攻擊重畫通過；2、3 階攻擊退件重畫
- `fox__t1__attack.png`（02:27 版）：尾巴一直在身後，第 3 格往上揚起，服裝一致。通過。**之後 2～5 階攻擊的圖 B 一律用這個新版。**
- `fox__t2__attack.png`、`fox__t3__attack.png` 是照舊的 1 階畫的，第 3、4 格尾巴跑到身體前面右邊、蓋到腿，退件。用新的 1 階攻擊當圖 B 重畫。
- 多條尾巴的規則：尾巴從屁股後面長出，**整把在身體後面像扇子展開**（可以從身體兩側露出來，和該階站立圖一樣），但不能從兩腿間或身體前面穿出來、不能蓋住腿和衣服。尾巴條數每格都要對（2 階 3 條、3 階 5 條、4 階 7 條、5 階 9 條）。
- 給 GPT 加一句：`All tails grow from behind her hips and fan out BEHIND her body like in image A; they may show on both sides of her body but must never pass in front of her legs or body. Keep exactly N tails in every frame.`

### 2026-11-04 02:39（台灣時間）2 階攻擊重畫通過
- `fox__t2__attack.png`（02:30 版）：3 條尾巴一直在身後、第 3 格揚起，白衣金邊、藍狐火、一疊符每格一致。通過。
- 3 階攻擊照同樣方式重畫；接著 4、5 階。

### 2026-11-04 03:00（台灣時間）3～5 階攻擊通過 → 完成通知
- 3 階（重畫版）、4 階、5 階攻擊：尾巴條數對、都在身後展開並跟著擺，服裝每格和站立一致。通過。
- 小提醒：4、5 階攻擊圖角色畫得比站立圖小一點，Claude 打包時會統一縮放，不用重畫；之後的角色請盡量讓攻擊圖和站立圖一樣大。
- **完成通知：工單 2 狐仙少女 10 張全部收齊。請接 `QUEUE.md` 下一張：`ORDER-03.md` 龍騎小將（分支 `dot/idle-td-3`）。**
