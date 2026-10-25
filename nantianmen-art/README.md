# 《一路掃到南天門》美術圖：給 GPT 的說明

這個資料夾是《一路掃到南天門》（修仙放置遊戲）的美術交接處。GPT 在這裡讀規格、交圖；Claude 從這裡讀圖，裁切對齊後放進遊戲。
（這個資料夾和同一個 repo 裡的怪獸遊戲無關，不要改動 `nantianmen-art/` 以外的檔案。）

- 畫風、尺寸、每個角色的設定：[BRIEF.md](BRIEF.md)（先讀最上面的「共同規則」）
- 畫風參考圖：[ref/](ref/)（主角、蘑菇妖、白虎、魔王的比例和水墨畫風；`hero-attack-pose.png` 是主角攻擊姿勢參考）
- 目前要畫或要修改的圖：見下面「待辦」
- 已上傳的圖（自動讀所有分支）：https://wincafex2-lu.github.io/monster-gacha-life/nantianmen-art/gallery.html

**給 GPT 的固定流程（每一次都要做）：**
1. 開始畫之前，重新讀這份 README 的最新版：https://raw.githubusercontent.com/wincafex2-lu/monster-gacha-life/main/nantianmen-art/README.md
2. 只做「待辦」表格裡的項目，照順序做。試做三個角色通過之前，不要畫其他角色。可以在自己的任務分支上傳，Claude 會從分支拿圖。
3. 上傳完之後，再讀一次這份 README，看有沒有新的意見。
4. 上傳時在 commit 訊息（或給泓的訊息）寫清楚上傳了哪些檔名。

## 交圖格式

1. 一張圖只畫一個角色、一個姿勢，面朝右邊，用四分之三側面（稍微轉向畫面、看得到大半張臉），不要完全側面。背景透明最好；做不到的話用單一純色背景（白色或淺灰），不要有地面、影子、文字。
2. **圖片大小不限，直接交繪圖工具輸出的原始大圖，不用自己縮小或裁切。** 縮小、裁切、去背、對齊腳底線都由 Claude 做。
3. 角色要畫完整（不能被切到），四周留一點空白。
4. 同一個角色的站立圖和攻擊圖：用同一個比例畫，**頭的大小要完全一樣**（例如白虎攻擊圖的頭目前比站立圖小約兩成，要避免），臉、衣服、顏色、比例完全相同，只有姿勢不同。
5. **拿武器的手要一致**：站立時用哪一隻手拿武器，攻擊時就用同一隻手（站立單手拿、攻擊改雙手可以，但原本那隻手一定要握著）。不要站立用右手、攻擊換左手。
6. **攻擊圖不畫特效**：刀光、爪痕、氣功、火焰、孢子都不要畫，程式會畫。
7. 檔案放在 `nantianmen-art/images/代號__動作.png`，中間兩條底線，動作只有 `idle`（站立）和 `attack`（攻擊）。
   例：`images/baihu__idle.png`、`images/baihu__attack.png`、`images/hero-chores__idle.png`。
   代號一定要用 BRIEF.md 表格裡的英文代號。檔名不確定也沒關係，在訊息裡寫清楚哪張是誰就好。

## 進度與待辦（Claude 收到圖後會更新這裡）

### 已完成（試做過關，畫風以這些為準）
主角雜役服 `hero-chores`（站立、攻擊）、白虎 `baihu`（站立、攻擊）、蘑菇妖 `mogu`、雜役峰後山背景 `bg-bamboo` 4 層、飛劍普通版 `feijian__field`。
之後畫的每一張都要和這些圖同一個畫風：四分之三側面、Q 版比例、墨線加淡彩、水墨質感。

### 現在：五個分支同時畫（泓 10/24 決定）
每一批開自己的分支，分支名稱照下表。每批照表格順序畫，畫完一張就可以先上傳。檔名、尺寸、規則見上面「交圖格式」和 BRIEF.md。

| 分支 | 內容 | 張數 |
|---|---|---|
| `art/nantianmen-people` | 人物 | 16 |
| `art/nantianmen-partners` | 夥伴（神獸） | 16 |
| `art/nantianmen-enemies` | 敵人（魔王、小怪） | 32 |
| `art/nantianmen-feijian-20261024`（沿用） | 法器 | 13 |
| `art/nantianmen-bg` | 背景 | 20 |

#### 1. 人物（`art/nantianmen-people`）
每個都畫 `__idle` 和 `__attack` 兩張。
- 主角另外 5 套服裝：`hero-sword`、`hero-alchemy`、`hero-tamer`、`hero-shop`、`hero-talisman`。臉、身高、比例和 `hero-chores` 完全一樣，只換服裝、髮型和武器。**這 5 套都不拿掃帚**，各自的武器、站立和攻擊動作見 BRIEF.md「主角」表格。
- 人物大將：`tietou`（鐵頭師兄）、`shen`（沈傲天）、`ye`（夜無塵）。

#### 2. 夥伴（`art/nantianmen-partners`）
每個都畫 `__idle` 和 `__attack` 兩張，照這個順序：`feng`、`xuanwu`、`baize`、`qinglong`、`qilin`、`jiuwei`、`taotie`、`fenghuang`。
神獸的站立圖和白虎一樣有氣勢（身體壓低或昂首、有神獸特徵的墨色飄毛、火焰或雲氣般的毛髮），不要畫成普通動物。
夥伴畫完後，接著在同一個分支畫**靈獸蛋** 5 張：`egg-common`、`egg-rare`、`egg-epic`、`egg-legend`、`egg-shell`，只畫 `__idle`（見 BRIEF.md「靈獸蛋」）。
再接著畫**普通、稀有夥伴** 12 張，只畫 `__idle`：`zhihe`、`zhusun`、`dangkang`、`xuangui`、`jiao`、`lushu`、`xiaozuanfeng`、`tudigong`、`shanshen`、`tieshan`、`leizhenzi`、`tuxingsun`（見 BRIEF.md「普通、稀有夥伴」）。

#### 3. 敵人（`art/nantianmen-enemies`）
- 魔王，畫 `__idle` 和 `__attack` 兩張：`heixiong`、`shuyao`、`kuilei`、`niutou`。
- 小怪，只畫 `__idle`：`limao`、`shijing`、`jiangshi`、`denglong`、`shuzhuang`、`houyao`、`sheyao`、`bianfu`、`kulou`、`langyao`、`zhiren`。
- 新小怪（泓 10/24 確認，各區新敵人），一樣只畫 `__idle`：`ginseng`、`yaoguan`、`xiabing`、`rongyangui`、`huoshu`、`yunduo`、`xianhe`、`leigong`、`shuangjing`、`tianbing`、`shenquan`、`jiahou`、`shishi`。外型見 BRIEF.md 角色清單。
小怪要像蘑菇妖一樣有表情、可愛又有點兇，臉轉向畫面。

#### 4. 法器（沿用 `art/nantianmen-feijian-20261024`）
飛劍普通版已完成 ✅，仙器版也完成了 ✅。接著畫其他 6 個，每個畫 `__field` 和 `__xian` 兩張：`hulu`、`leizhu`、`bagua`、`fuzhen`、`tieguo`、`ruyi`。仙器版每一個都要非常華麗（BRIEF.md「法器」）。

#### 5. 背景（`art/nantianmen-bg`）
其他 5 區，每區 4 層 `sky`、`far`、`mid`、`ground`，照這個順序：`bg-herb`、`bg-town`、`bg-volcano`、`bg-cloud`、`bg-palace`。
寬高比照 `bg-bamboo`（約 3:1），左右要能無縫接起來。`sky` 以外的層：透明背景最好；**如果透明做出來有彩邊或白毛，直接改用單一純色底交圖，Claude 去背**（泓 10/24 同意）。純色底的顏色：一般用純白 `#FFFFFF`；**雲海 `bg-cloud` 和天宮 `bg-palace` 有白雲、白玉，請改用純洋紅 `#FF00FF`**，畫面裡不要用到洋紅色。底色要整片均勻，不要漸層或紋理。

#### 5c. 招式特效（法器分支 `art/nantianmen-feijian-20261024`，泓 10/24）
在法器分支畫 19 張特效圖，規格見 BRIEF.md「招式特效」，檔名 `images/代號__fx.png`。**先畫這 9 張：** `fx-slash`、`fx-splat`、`fx-bloom`、`fx-burst`、`fx-thunder-1`、`fx-thunder-2`、`fx-fire`、`fx-claw`、`fx-qi`，再畫其他的。

#### 5b. 遊戲介面（一樣用背景分支 `art/nantianmen-bg`，泓 10/24 決定，不用另外開分支）
背景畫完後，在**同一個分支** `art/nantianmen-bg` 接著畫介面圖，共 49 張：12 張介面框和按鈕、7 張戰鬥招式提示（墨條、印章、光暈）、30 個小圖示。代號、長寬比、樣子見 BRIEF.md「遊戲介面」。檔名是 `images/代號__ui.png`（例：`images/ui-panel__ui.png`、`images/ui-ic-stone__ui.png`）。照表格順序畫，先畫大的框和按鈕，再畫小圖示。圖裡不寫字（只有 `ui-logo` 例外）。

#### 6. 新篇章第 1 批：西遊篇（新分支 `art/nantianmen-xiyou`，泓 10/24 確認）
清單和外型見 BRIEF.md 最後「新篇章」的第 1 批：夥伴 4 個、首領 5 個（各 `__idle`、`__attack`），小怪 6 個（只畫 `__idle`），背景 3 張（每區只畫 1 張 `__full`）。共 27 張（8＋10＋6＋3）。可以和上面五個分支同時畫。
西遊篇已完成 ✅（10/24）。

#### 6b. 副本小怪（敵人分支 `art/nantianmen-enemies`）
9 隻副本小怪，只畫 `__idle`：`shuyaojing`、`dengxin`、`luanshu`、`lingzhi`、`heshouwu`、`kuangshi`、`yuansuling`、`yuansuhou`、`yuansushi`（見 BRIEF.md「副本」）。副本背景 5 張也要畫，每個副本畫 1 張一整張的 `bg-代號__full.png`（放敵人分支，規格見 BRIEF.md「副本」和「背景」）。

#### 7. 新篇章第 2 批：封神篇（分支 `art/nantianmen-fengshen`，現在開始畫）
清單和外型見 BRIEF.md「第 2 批：封神篇」：夥伴 3 個、首領 6 個（各畫 `__idle`、`__attack`），小怪 7 個（只畫 `__idle`），背景 3 張（每區 1 張 `__full`），共 28 張（6＋12＋7＋3）。蝦兵沿用 `xiabing`，不用畫。

#### 8. 新篇章第 3 批：山海篇（分支 `art/nantianmen-shanhai`，封神篇畫完就接著畫）
清單和外型見 BRIEF.md「第 3 批：山海篇」：神獸夥伴 3 個、首領 6 個（各畫 `__idle`、`__attack`），小怪 9 個（只畫 `__idle`），背景 3 張（每區 1 張 `__full`），共 30 張（6＋12＋9＋3）。

**畫圖順序（不用再問）：** 先做「待辦」裡的地面重畫 → 第 5c 項招式特效 → 第 5b 項介面圖和封神篇角色可以同時畫 → 第 6b 項副本小怪 → 山海篇。**背景已決定（10/25）：封神篇、山海篇、副本的背景都畫一整張 `__full`，不用分 4 層**，可以直接畫，跟角色一起畫。

**全部分支一覽（之後不會再加新分支）：** `art/nantianmen-people`、`art/nantianmen-partners`、`art/nantianmen-enemies`、`art/nantianmen-feijian-20261024`、`art/nantianmen-bg`、`art/nantianmen-xiyou`、`art/nantianmen-fengshen`、`art/nantianmen-shanhai`。要修改的圖，直接傳回原本的分支。

### 10/24 21:30 檢查結果
已通過：`hero-sword`（攻擊圖換手已修好）、`hero-alchemy`、`hero-tamer`、`hero-shop`、`hero-talisman`、`feng`（飛起來了）、`xuanwu`、`baize`、`qinglong`、`qilin`、魔王 `heixiong`、`shuyao`、`kuilei`、`niutou`、目前上傳的小怪、6 個法器的 `__field` 和 `__xian`、背景 `bg-herb` 4 層、`bg-town` sky/far/ground、`bg-volcano` 4 層、`bg-cloud__sky`、`bg-palace__sky`。
還沒畫：`tietou`、`shen`、`ye`、`jiuwei`、`taotie`、`fenghuang`、新小怪 `yunduo`、`xianhe`、`leigong`、`shuangjing`、`tianbing`、`shenquan`、`jiahou`、`shishi`、`bg-town__mid`、`bg-cloud` 和 `bg-palace` 其他 3 層。

### 待辦（要修改的圖）
`feijian__xian.png` 拉直已由 Claude 修好、玄武黑色版已完成（10/24）。

6 區新地面已完成 ✅（10/24）。

西遊 3 張背景重畫已完成 ✅（10/25）。

**10/25 檢查結果：** 清單上的圖全部畫完、都已通過並交給遊戲（封神、山海、副本小怪、11 張一整張背景、19 個招式特效、49 張介面圖）。`fx-slash` 也已經正常。目前沒有要修改的圖，等這裡寫下一批再畫。
