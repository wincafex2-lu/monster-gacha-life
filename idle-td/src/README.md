# 掃帚守山門 程式碼

`tools/build.py` 把這裡的檔案合成一個 `idle-td/index.html`（GitHub Pages 用），
`index.tpl.html` 裡每一行 `@@include <檔名>` 會換成那個檔的內容，順序就是載入順序。
全部的 js 合起來是同一個 `<script>`，所以檔案之間的變數、函式都互相看得到；
**檔案順序不能隨便換**（上面的 `const` 要先跑，下面才用得到）。

| 檔案 | 內容 |
| --- | --- |
| `index.tpl.html` | 網頁骨架：上方資訊列、按鈕、面板外框 |
| `css/style.css` | 全部樣式 |
| `js/00-core.js` | 圖片清單（打包時填入）、本機設定 `pref.get/set` |
| `js/01-heroes.js` | 弟子資料：角色、被動、極意、覺醒、紅星、神話、合擊、大招表 |
| `js/02-items.js` | 法寶、魔頭、陣法資料 |
| `js/03-beasts.js` | 神獸、兌換碼、共鳴、上古凶獸（含凶獸戰鬥和繪圖）、試煉塔 |
| `js/04-progress.js` | 修煉、飛升、境界、首次過關獎勵、升階需求 |
| `js/05-save.js` | 存檔（`idle-td-save-v1`）、舊存檔補欄位、自動存檔 |
| `js/06-stats.js` | 數值公式：怪物血量、攻擊、升級花費、大數字顯示 |
| `js/07-images.js` | 載圖（上陣的先載，其他用到才載）、畫布大小、鏡頭縮放 |
| `js/08-field.js` | 戰場狀態 `B`、站位、開新關、生怪 |
| `js/09-loop.js` | 主迴圈 `frame` → `step`（每段一個 `stepXxx` 函式） |
| `js/10-combat.js` | 普攻、投射物、傷害 `hit`、山門受傷 |
| `js/11-stage.js` | 過關、失敗、試煉塔開始／結束 |
| `js/12-sound.js` | 音樂和音效（WebAudio 即時合成） |
| `js/13-ults.js` | 神獸大招、弟子大招、冷卻、射程 |
| `js/14-fengshen.js` | 封神三傳說（楊戩、哪吒、敖丙）、大招特色效果 |
| `js/15-draw.js` | 畫面：`draw` → 每層一個 `drawXxx` 函式 |
| `js/16-draw-fx.js` | 畫投射物和特效 |
| `js/17-ui.js` | 換站位、頭像列、傷害表、BUFF 列、上方資訊 |
| `js/18-panels.js` | 面板開關、隊伍總加成、弟子頁 |
| `js/19-gacha.js` | 召喚（弟子、陣法、神獸） |
| `js/20-gate.js` | 山門頁（每個分頁一個 `gateTabXxx` 函式） |
| `js/21-boot.js` | 獎勵、離線收益、啟動、測試用的 `window.__fast`、`__api` |

## 改完要做的事

```
python3 tools/build.py                 # 產生 index.html
node tools/check.js                    # 跟 git HEAD 的 index.html 對照
```

`tools/check.js` 把亂數、時間、計時器、音效時鐘都固定住，用同一套劇本（新手、後期全解鎖、
凶獸、飛升、每個面板、按鈕、本機設定）跑新舊兩版，比對存檔、戰場、畫面像素和面板內容。
- **只整理程式（不改玩法）**：要「全部一樣」才算過。
- **有改玩法**：一定會有不一樣，用來看影響到哪些地方。
- `node tools/check.js <版本> --self`：舊版自己跑兩次，確認測試本身穩定。

排版用 prettier（設定在 `idle-td/.prettierrc.json`）：`prettier --write src/js/*.js src/css/style.css`。
