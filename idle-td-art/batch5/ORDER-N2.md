# 放置塔防新弟子：工單 N2　傳說五階・小猴王

狀態：完成通知
（狀態只會是：待接手／進行中：<誰> <時間>／待驗收／完成通知）

工單 N1（`README.md`）出現「完成通知」後再接。流程、鎖死規則、站立與攻擊指令、驗收標準**全部照 `README.md`**，只是分支和角色不同：

- 從 `origin/claude/project-thread-7a7c7v` 開分支 **`dot/idle-td-n2`**，狀態改「進行中：<誰> <時間>」馬上推，之後只推 `dot/idle-td-n2`。
  網頁版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/claude/project-thread-7a7c7v/idle-td-art/batch5/ORDER-N2.md
- 檔案放 `idle-td-art/batch5/images/`。
- 順序：1 階站立 → 2～5 階站立（每階附 1 階站立＋上一階站立）→ 1 階攻擊 f1～f3 → 2～5 階攻擊（可以連續交，Claude 逐階驗）。

N2 出現「完成通知」後，接同資料夾 `ORDER-N3.md`（五傳說神話型態，分支 `dot/idle-td-n3`）。

## 小猴王（`monkey`，傳說・近戰：長棍）

山裡長大的猴子少年，拿長棍，又皮又強。主色：金棕＋紅。尾巴會跟著動作擺。
5 階要「一看就是傳說」：輪廓明顯比 1 階大、更華麗（靠配件，不是身體變大）。

| 階 | 外型 | 英文（貼給 GPT） | 武器 |
|---|---|---|---|
| 1 | 棕毛猴少年、圓猴耳、捲尾巴、粗布灰短打、草繩腰帶、光腳 | monkey boy: brown fur, round monkey ears, curly tail, rough grey cloth short outfit, straw rope belt, bare feet; holds a plain wooden staff | 木棍 |
| 2 | 紅色短褂＋黃邊；額頭綁黃色頭帶，兩條帶尾往後飄 | same character, red short jacket with yellow trims, a yellow headband with two long ends flowing back; iron staff | 鐵棍 |
| 3 | 橘紅短褂＋虎皮短裙；背後紅披風 | same character, orange-red jacket with a tiger-skin wrap skirt and a red cape; staff with gold caps on both ends | 兩頭包金的棍 |
| 4 | 黑金輕甲，毛色變金黃；背後浮一朵小筋斗雲（不要踩在腳下） | same character, black-and-gold light armor, fur turns golden, a small fluffy cloud floating behind the shoulder (NOT under the feet); red-and-gold staff | 紅金棍 |
| 5 傳說 | 金甲紅袍，毛色變金白；頭戴金冠插兩根長長的鳳翎；雲變大繞在身後；披風變金紅雙層 | same character, golden armor and red robe, fur turns golden-white, a golden crown with two very long pheasant tail feathers, a bigger cloud curling behind the body, double-layer gold-and-red cape; ornate golden staff with red ends | 華麗金色長棍 |

臉：`eyes = big golden fiery eyes with small sharp pupils; eyebrows = thick wild brows, bushy at the ends; mouth = wide cheeky monkey grin showing teeth`

攻擊動作（長棍一直在前手，另一手可以一起握）：
- f1：`both hands pull the staff back diagonally behind the body, staff end behind him, a little high (not above the head)`
- f2：`swings the staff horizontally forward in front of the body`
- f3：`thrusts the staff straight forward at full reach, tail swinging`

## 待辦（檔名）

1. `monkey__t1__stand.png`
2. `monkey__t2__stand.png`～`monkey__t5__stand.png`
3. `monkey__t1__attack_f1.png`、`_f2.png`、`_f3.png`
4. `monkey__t<2～5>__attack_f1～f3.png`

共 5 張站立＋15 張攻擊 = 20 張。

## 意見與待辦

（Claude 驗收後寫在這裡）
- 10:18 台灣時間 小猴王 1 階站立 **通過**（腳底 979，頭和身體跟標準一樣大，沒有包頭所以總高 658 正常；金色火眼、粗野眉、咧嘴笑、捲尾巴、灰粗布短打、草繩腰帶、光腳、木棍在前手都對）。可以畫 2～5 階站立（附 1 階＋上一階），臉和身體大小保持這張。
- 10:33 台灣時間 小猴王 2 階站立 **通過**（頭頂 321、腳底 979 跟 1 階一樣、頭 88% 同像素；紅短褂黃邊、黃頭帶兩條帶尾往後飄、鐵棍）。繼續 3 階站立。
- 10:42 台灣時間 小猴王 3、4 階站立 **通過**（頭頂 321、腳底 979、輪廓跟 1 階一樣；3 階橘紅短褂、虎皮短裙、紅披風、兩頭包金棍；4 階黑金輕甲、金毛、肩後小雲、紅金棍）。繼續 5 階站立。
- 10:50 台灣時間 小猴王 5 階站立 **退件（只因為大小）**：整個人被放大了約 30%（腳底跑到 y=1011，臉和身體都比 1～4 階大）。設計很好（白金毛、金冠鳳翎、金甲紅袍、雙層披風、大雲、華麗金棍），**請用已通過的 4 階站立圖去改**，不要重畫整個人：
  `Edit this exact sprite (tier 4). Keep the head, face, body, legs, feet, size and position EXACTLY the same. Do not make anything bigger. Only change: fur turns golden-white, golden armor and red robe, a golden crown with two very long pheasant tail feathers, a bigger cloud curling behind the body, double-layer gold-and-red cape, ornate golden staff with red ends. Accessories go outside the body. Solid magenta #FF00FF background.`
  量法：頭頂（不含冠和羽毛）、下巴、腳底 y=979 要跟 4 階一樣。
- 10:57 台灣時間 小猴王 5 階站立（從 4 階改）**通過**（腳底 979，臉、身體跟 4 階一樣大；白金毛、金冠鳳翎、金甲紅袍、雙層披風、大雲、華麗金棍；冠和羽毛往上加高是配件，OK）。5 階站立全收，下一步 1 階攻擊 f1～f3（附 1 階站立）。
- 11:14 台灣時間 小猴王 1 階攻擊：
  - f1、f3 **通過**（頭 95～96% 同像素、頭頂 321、腳底 979；f1 雙手把棍拉到身後、f3 往前刺，棍一直在前手）。
  - f2 **退件（小問題）**：棍子伸出畫布右邊被切掉（x 到 1253）。請重做 f2，棍子長度跟站立圖一樣、整根留在畫布裡（右端最遠到 x≈1150），其他不變。可以加一句：`The whole staff must stay inside the canvas, same length as in the original sprite.`
  - f2 改好就可以接 2～5 階攻擊（圖 B 用 1 階同一格）。
- 11:24 台灣時間 小猴王 1 階攻擊 f2（重交）**通過**（棍右端 x=1115 整根在畫布內、頭頂 321、腳底 979、頭 94% 同像素；雙手橫掃向前）。1 階攻擊全收，請接 2～5 階攻擊 f1～f3（圖 A＝該階站立，圖 B＝1 階同一格），可以連續交。
- 11:31 台灣時間 小猴王 2 階攻擊 f1、f3 **通過**（頭頂 321～322、腳底 979、頭 93% 同像素；紅短褂、黃頭帶、鐵棍都對，f1 拉到身後、f3 往前刺）。**2 階 f2 還沒看到**，請補交（橫掃向前、整根棍留在畫布內），然後接 3～5 階攻擊。
- 11:37 台灣時間 小猴王 2 階攻擊 f2 **通過**（頭 95% 同像素、頭頂 321、腳底 979，棍右端 x=1093 在畫布內），2 階攻擊全收。3 階攻擊 f1 **通過**（頭頂 322、腳底 978、頭 92% 同像素；披風和虎皮裙跟著動，棍拉到身後）。繼續 3 階 f2、f3。
- 11:47 台灣時間 小猴王 3 階攻擊 f2、f3 **通過**（頭 93～96% 同像素、頭頂 321、腳底 978，棍在畫布內），3 階攻擊全收。4 階攻擊 f1 **通過**（頭 92%、頭頂 321、腳底 978；金毛、黑金甲、小雲、紅金棍拉到身後）。繼續 4 階 f2、f3，然後 5 階。
- 11:57 台灣時間 小猴王 4 階攻擊 f2、f3 **通過**（頭 94～95% 同像素、頭頂 321、腳底 978，棍右端最遠 x=1111 在畫布內），4 階攻擊全收。5 階攻擊 f1 **通過**（冠頂 61 對站立 62、腳底 979、臉和身體跟 5 階站立一樣大；華麗金棍拉到身後，冠、鳳翎、大雲、雙層披風都在）。最後 5 階 f2、f3。
- 12:05 台灣時間 小猴王 5 階攻擊 f2、f3 **通過**（冠頂 61、腳底 978，跟 5 階站立一樣大；f2 橫掃、f3 往前刺，華麗金棍右端最遠 x=1116 在畫布內）。

## 完成通知（2026-11-05 12:05 台灣時間）
工單 N2 小猴王 20 張全收（站立 5、攻擊 15 格，第 4 格用站立圖；畫家分支 `dot/idle-td-n2` c2265a9）。請停在這裡，接同資料夾 `ORDER-N3.md`（五傳說神話型態，分支 `dot/idle-td-n3`）。
