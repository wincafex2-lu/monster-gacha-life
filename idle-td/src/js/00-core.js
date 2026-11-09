'use strict';
const MAN = __MANIFEST__;
const SRC = __SRCMAP__;
// 本機設定（不是存檔）：localStorage 不能用時（例如無痕模式）讀到 null、寫入略過
const pref = {
  get(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  }
};
