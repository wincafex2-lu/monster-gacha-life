# 怪獸圖：給 GPT 的說明

這個資料夾放 GPT 畫的怪獸身體圖。Claude 會從這裡讀圖，轉成遊戲用的格式，再加上配件、換色和進化效果。

- 每一隻怪獸的外型設定：[BRIEF.md](BRIEF.md)（先讀最上面的「共同規則」）
- 目前要修改或補畫的圖：見下面「待辦」

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

## 待辦：亡靈軍團（undead）

已經收下、不用重畫：skeleton（3 種造型）、little_ghost、zombie（3 種造型）、bone_dog、will_wisp、mummy、skeleton_pirate、skeleton_mage、haunted_armor、banshee、vampire、necromancer、ghost_captain、lich、night_king。

要重畫：

| 怪獸 id | 名稱 | 問題 |
|---|---|---|
| bone_dragon | 骨龍 | 原圖左右兩邊（翅膀、尾巴）被畫布切掉，請整隻完整畫在畫面內 |
| coffin_cat | 棺材貓 | 顏色和細節太少（只有 9 色），跟其他隻放在一起太陽春；請畫一隻黑貓從棺材裡探出頭的樣子 |
| headless_knight | 無頭騎士 | 顏色和細節太少；請畫一個沒有頭、手上抱著自己頭盔的騎士（不要拿武器） |

尚未分配：`_wraith_blue`（藍袍幽魂）先保留，不用重畫。
