# 放置塔防怪物點陣圖：工單 M2　Boss 4 隻

狀態：待接手（蓄力、出招改用「站立圖逐格改」：牛魔大王、骷髏將軍、千年樹妖）
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

## 固定流程

1. 開工前先 `git fetch origin claude/project-thread-cu41lm`，讀這份 `idle-td-art/monsters/ORDER-M2.md` 最新版（驗收意見寫在最下面「意見與待辦」）。
   網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-cu41lm/idle-td-art/monsters/ORDER-M2.md
2. 從 `origin/claude/project-thread-cu41lm` 開分支 **`dot/idle-td-m2`**，把「狀態」改成「進行中：<誰> <時間>」馬上推。之後成品和狀態都只推 `dot/idle-td-m2`。
3. 在畫小怪的同一個 ChatGPT 對話繼續畫（畫風才會一致）。檔案放 `idle-td-art/monsters/images/`，檔名照「待辦」。
4. **先只畫第 1 張（史萊姆王站立）推上來，等 Claude 在「意見與待辦」寫通過才畫後面。** 之後每張畫好就推，每 5 分鐘 fetch 一次看意見。
5. 全部交完把狀態改「待驗收」；看到「完成通知」就停。

## 規則

- 和工單 M1 一樣：像素粗細、畫風照 **`ref/STANDARD__t2__stand.png`**，側 3/4 朝右，調皮兇但不恐怖、不要血，背景純洋紅 `#FF00FF`，不畫影子、光暈、特效、投射物。
- **Boss 很大**：每張畫布 1254×1254，Boss 本體高約 1000～1050px（標準圖角色的 1.5 倍），腳底 y≈1180，左右置中。**像素格子大小和標準圖一樣**（Boss 是畫得更大、細節更多，不是把小圖放大）。
- Boss 每隻 3 張**單張**圖（不是橫排）：站立、蓄力、出招。動態用程式接起來。
- 每次附 `ref/STANDARD__t2__stand.png` 放第一張；畫蓄力、出招時再附該 Boss 已通過的站立圖當第二張。指令開頭貼：

```
Draw a BOSS monster for the SAME game as the first attached image, in EXACTLY the same pixel-art style: same pixel size (do NOT use bigger pixels), same painterly hue-shifted shading, same thin colored outlines, same soft rich palette.
The boss is BIG: about 1000-1050 px tall on a 1254x1254 canvas (1.5x the girl in image 1), feet at y=1180, centered. Because the pixel size is the same, the boss has much more detail than the girl.
Side 3/4 view facing RIGHT. Impressive and a little fierce for kids aged 9-11, but funny-cool, never gory or creepy.
Solid flat magenta #FF00FF background. No shadow, no floor, no text, no glow, no effects, no projectiles.
```

蓄力、出招時再加：

```
Image 2 is this boss's approved design. Draw the SAME boss in the pose below. It must match image 2 exactly in colors, size, armor and details; only the pose changes. Moving parts (cape, flames, branches, crown) must move with the pose.
```

## Boss 設計

| # | 代號 | 名字 | 外型（英文） | 蓄力（英文） | 出招（英文） |
|---|---|---|---|---|---|
| 1 | slimeking | 史萊姆王 | a giant mint-green jelly slime king with a small golden crown tilted on top, a curly royal mustache, a red cape draped on its back, a few tiny slimes and bubbles visible inside its translucent body, smug happy face. No arms or legs. | squashed very low and wide, cheeks puffed, crown wobbling, cape flipped up | stretched tall and lunging forward to the right in a huge body-slam, face determined, cape and crown flying back |
| 2 | bullking | 牛魔大王 | a muscular chibi bull demon king: black horns, gold nose ring, dark red skin, black-and-gold armor with a red sash, holding a giant double-headed battle axe, fierce but comical grumpy face. | axe raised high over his head with both hands, leaning back, sash swinging | axe smashed down in front of him (right side), body leaning forward, axe head near the ground |
| 3 | bonegeneral | 骷髏將軍 | a big skeleton general in rusted dark-iron armor with a tattered purple cape, a huge notched greatsword, purple ghost-flames burning in the eye sockets and on the helmet plume. Spooky-cool, not gory. | greatsword pulled back over the shoulder, cape billowing, flames flaring up | greatsword swung forward in a wide horizontal slash to the right, cape flying back |
| 4 | treeelder | 千年樹妖 | an ancient tree demon: thick gnarled trunk body with a grumpy old face (bushy moss eyebrows, glowing green eyes), two long branch arms with leafy hands, root legs, a few glowing red fruits hanging in its leafy crown. | branch arms pulled back, leaves rustling, roots digging in | branch arms whipping forward to the right, leaves and fruits swinging, mouth open shouting |

## 待辦（照順序）

| # | 檔名（`idle-td-art/monsters/images/`） | 內容 |
|---|---|---|
| 1 | `slimeking__stand.png` | 史萊姆王站立（畫完先停，等驗收） |
| 2 | `slimeking__windup.png`、`slimeking__strike.png` | 史萊姆王蓄力、出招 |
| 3 | `bullking__stand.png`、`__windup`、`__strike` | 牛魔大王 |
| 4 | `bonegeneral__stand.png`、`__windup`、`__strike` | 骷髏將軍 |
| 5 | `treeelder__stand.png`、`__windup`、`__strike` | 千年樹妖 |

## 驗收重點

- 和標準圖比：像素格子一樣小、畫風一致（不能變成大像素放大版）。
- 3 張的長相、顏色、大小一致，只有姿勢不同；披風、火焰、樹枝、皇冠跟著動作擺。
- 腳底 y≈1180，大小約標準角色 1.5 倍。

## 意見與待辦

（Claude 驗收後寫在這裡）

### 2026-11-04 03:20（台灣時間）史萊姆王站立通過
- 高 1018px、腳底 y≈1186，皇冠、八字鬍、紅披風、肚子裡的小史萊姆都照設計，很有喜感。通過。
- 小提醒（不用重畫）：身體的像素比標準圖細一點、漸層偏平滑；遊戲裡會縮小顯示，看不出差別。之後的 Boss 盡量維持像標準圖那樣看得出顆粒的點陣感。
- 左右幾乎碰到畫布邊（x 18～1221）。蓄力（壓扁變寬）時請把整隻**縮在畫布內、左右各留 40px 以上**，不要被切到。
- 繼續畫 `slimeking__windup.png`、`slimeking__strike.png`，之後照順序畫，不用每張等驗收。

### 2026-11-04 03:35（台灣時間）史萊姆王蓄力通過
- 壓扁變寬、鼓腮、披風翻起、皇冠歪，長相和站立一致，沒有被畫布切到。通過。
- 底部 y≈1147，比站立高約 40px，Claude 對齊時會修，不用重畫。繼續畫出招。

### 2026-11-04 03:42（台灣時間）史萊姆王出招通過；牛魔大王站立、蓄力通過
- 史萊姆王出招：整隻往右前方撲、披風和皇冠往後飛，長相一致。通過（右邊到 x=1238 很貼邊，沒被切到就好）。
- 牛魔大王站立（高 1038px）、蓄力（斧頭舉過頭、紅腰帶甩動）：盔甲花紋、鼻環、角每張一致。通過。繼續畫牛魔大王出招，之後骷髏將軍、千年樹妖。

### 2026-11-04 03:49（台灣時間）牛魔大王出招通過；骷髏將軍站立、蓄力通過
- 牛魔大王出招：斧頭砍到右前方地上、身體前傾、腰帶往後甩，和前兩張一致。牛魔大王 3 張全過。
- 骷髏將軍站立（高 1189px，比標準稍高但畫布內沒被切）、蓄力（大劍扛到肩後、披風往後飄、紫火頭飾）：盔甲、紫眼火、劍上紫寶石一致。通過。
- 提醒：紫色披風和洋紅背景很接近，Claude 去背時會小心處理，不用改色。繼續畫骷髏將軍出招，然後千年樹妖。

### 2026-11-04 03:57（台灣時間）骷髏將軍出招、千年樹妖 3 張通過 → **完成通知**
- 骷髏將軍出招：雙手握劍往右刺出、披風和紫火往後飄，和前兩張一致。通過。
- 千年樹妖站立、蓄力（樹枝手往後拉）、出招（樹枝往右前甩、張嘴大吼、果子跟著晃）：臉、苔蘚眉毛、紅果子每張一致。通過。
- **完成通知：工單 M2 Boss 4 隻 12 張全部收齊，工單 M1＋M2 都完成。可以停止巡查，謝謝。**

### 2026-11-04 10:30（台灣時間）用數字複查 → 退回 6 張重畫
泓指出方向是「大頭小身體」。這次把蓄力、出招的頭對齊站立圖再量（3 張同畫布，頭應該一樣大）：

| 檔案 | 結果 | 問題 |
|---|---|---|
| `bullking__windup.png` | 退回 | 頭只有站立的 87%，身體長 +8% |
| `bullking__strike.png` | 退回 | 頭對齊後身體長 +16% |
| `bonegeneral__windup.png` | 退回 | 頭只有站立的 86%，身體長 +12% |
| `bonegeneral__strike.png` | 退回 | 頭 90%，身體長 +7% |
| `treeelder__windup.png` | 退回 | 臉只有站立的 92%，整隻被拉長 |
| `treeelder__strike.png` | 退回 | 臉只有站立的 81%，整隻被拉長 |

史萊姆王 3 張、3 隻的站立圖通過，不用動。

重畫時附 `ref/STANDARD__t2__stand.png`（第 1 張）和該 Boss 的站立圖（第 2 張），原本的指令後面再加：

```
LOCKED PROPORTIONS: the head (face, helmet, horns) must be EXACTLY the same size as in image 2, and the body from chin to feet must be the same length as in image 2. Big head, small body: do NOT make the body taller or longer, do NOT shrink the head. Feet at y=1180 like image 2. Only the pose changes.
```

檔名不變，推到 `dot/idle-td-m2` 覆蓋舊檔。每張推上來 Claude 會量，通過才算。

### 2026-11-04 11:40（台灣時間）改用「站立圖逐格改」（泓 核准，取代 10:30 的重畫方法）
重畫時 GPT 會把頭縮小、身體拉長。改成拿站立圖直接改：

- 牛魔大王、骷髏將軍、千年樹妖的 `__windup.png`、`__strike.png` 重做，檔名不變，覆蓋舊檔推 `dot/idle-td-m2`。
- 每張只附 **1 張圖：該 Boss 已通過的站立圖**，用下面指令。前傾、蹲低、震動、刀光由程式加，**圖裡頭、身體、腿、腳都不要動**。
- 史萊姆王 3 張已通過，不用重做。

```
Edit this exact sprite. Keep the head, face, body, legs, feet, armor, size and position EXACTLY the same (same pixels where possible).
ONLY change the arms and the weapon to this pose: <動作>. Moving accessories (cape, sash, flames, leaves, fruits) may swing a little.
Do not make the body or legs longer, do not shrink the head, do not move the feet, do not resize anything. Same 1254x1254 canvas, same magenta #FF00FF background.
```

| Boss | windup `<動作>` | strike `<動作>` |
|---|---|---|
| bullking 牛魔大王 | both hands raise the giant battle axe high over the head | the axe swung down in front (right side), axe head near the ground |
| bonegeneral 骷髏將軍 | the greatsword pulled back over the shoulder, cape billowing | the greatsword swung forward in a wide slash to the right, cape flying back |
| treeelder 千年樹妖 | both branch arms pulled back behind the trunk | both branch arms whipping forward to the right, mouth open shouting |
