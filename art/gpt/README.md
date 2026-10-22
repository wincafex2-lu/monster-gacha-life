# 怪獸圖：給 GPT 的說明

這個資料夾放 GPT 畫的怪獸身體圖。Claude 會從這裡讀圖，轉成遊戲用的格式，再加上配件、換色和進化效果。

- 每一隻怪獸的外型設定：[BRIEF.md](BRIEF.md)（先讀最上面的「共同規則」）
- 目前要修改或補畫的圖：見下面「待辦」

**給 GPT 的固定流程（每一次都要做）：**
1. 開始畫之前，重新讀這份 README 的最新版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/main/art/gpt/README.md
2. 先做「待辦」表格裡的項目，再畫新的族群。
3. 上傳完之後，再讀一次這份 README，看「待辦」有沒有新的意見；有的話接著修改，不用等人轉達。
4. 每次上傳時在 commit 訊息寫清楚上傳了哪些怪獸 id。

## 交圖格式

1. 一張圖只畫一隻怪獸，背景透明的 PNG。
2. 檔案放在 `art/gpt/族群英文名/怪獸id.png`，例如 `art/gpt/undead/skeleton.png`。
   同一隻有不同造型：`skeleton~2.png`、`skeleton~3.png`。
   族群英文名：slime、goblin、insect、beast、plant、undead、aquatic、elemental、fairy、demon、dragon、otherworld。
   怪獸 id 一定要用 BRIEF.md 裡的英文 id，不要自己取名字（例如不要用 `skeleton_noble`）。
3. 原始大圖放在同族群的 `originals/` 資料夾，檔名一樣。
4. 縮成 96×88 的規則：
   - 整張單張原圖等比例縮小，不裁切、不從總覽圖截取。
   - 用「區域平均（box / area）」縮小再減色，不要用最近鄰。
   - 最多 48 色；透明度只有全透明或不透明。
   - 角色左右置中，腳底貼在第 82 列（下面留 6 格透明）；上、左、右至少各留 4 格透明，任何部分都不能碰到畫布邊緣。
5. 不要畫武器（劍、法杖、長矛、弓），手空著；武器和其他配件由程式加。
6. 顏色分清楚：身體一個主色、一個副色，眼睛、牙齒、骨頭、金屬用中性色，方便程式換色。

## 進度與待辦（Claude 每小時檢查一次，有新意見會更新這裡）

### 亡靈軍團（undead）：完成
已收下全部 18 隻（骨龍、棺材貓、無頭騎士的重畫版都已收下，畫得很好）。
`_wraith_blue`（藍袍幽魂）先保留，不用重畫。

### 史萊姆軍團（slime）：完成
已收下全部 30 隻，品質很好，不用修改。

### 哥布林部落（goblin）：完成
已收下全部 25 隻，品質很好，手都空著，不用修改。（弓、鼓、蛋、扳手這些手持物由程式畫。）

### 昆蟲軍團（insect）：完成
已收下全部 24 隻，品質很好，不用修改。（鍬形騎士的長槍由程式畫。）

### 野獸軍團（beast）：完成
已收下全部 30 隻。奇美拉重畫版（獅子頭、羊毛身體、蛇尾巴）很好，不用修改。

### 植物軍團（plant）：完成
已收下：mushroom_kid、mandrake、hop_grass、flytrap、cactus、vine、seed_baby、pumpkin_head、bigmouth_flower、little_treant、thorn_rose、bamboo_samurai、ice_flower、elder_treant、moon_beauty、fruit_tree、divine_tree、forest_colossus、world_tree。品質很好，不用修改。（竹子武士的劍由程式畫。）

毒孢子菇（spore_shroom）由泓轉交，已收下，很好。

### 深海王國（aquatic）：完成
已收下全部 24 隻。錦鯉、河神鯰、巨鯨的重畫版都很好。

### 元素之環（elemental）：完成
已收下：spark_sprite、droplet_sprite、breeze_sprite、frost_sprite、thunder_ball、fire_elemental、water_elemental、wind_elemental、stone_golem、mimic、lava_giant、thunderbird、gargoyle、storm_spirit、phoenix、crystal_golem、element_king。品質很好，不用修改。

石精（pebble_sprite）由泓轉交，已收下，很好。

### 妖精之森（fairy）：完成
已收下全部 16 隻，品質很好，不用修改。

### 惡魔領域（demon）：完成
已收下全部 15 隻，品質很好，不用修改。

### 龍之谷（dragon）：完成
已收下全部 14 隻。洞穴龍、黑龍、始祖龍的重畫版臉和眼睛都很清楚，很好。

### 異界來客（otherworld）：完成
已收下全部 6 隻：lost_alien、void_eye、clock_rabbit、stardust_traveler、dream_whale、genesis。品質很好，不用修改。

### 全部進度：240 / 240
全部 240 隻都收齊了，謝謝！

### 待辦（要修改的圖）
| 圖 | 問題 | 怎麼改 |
|---|---|---|
| （目前沒有） | | |
