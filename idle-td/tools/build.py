"""產生 idle-td/index.html（GitHub Pages，圖片讀 assets/）和單檔預覽版（圖片內嵌）。
用法：python3 tools/build.py [單檔輸出路徑]"""
import json, os, sys, base64
D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
man = json.load(open(os.path.join(D, 'assets', 'manifest.json')))
src = open(os.path.join(D, 'src', 'game.html'), encoding='utf-8').read()
keys = sorted(man)
def out(srcmap, path):
    h = src.replace('__MANIFEST__', json.dumps(man, separators=(',', ':'))).replace('__SRCMAP__', json.dumps(srcmap, separators=(',', ':')))
    open(path, 'w', encoding='utf-8').write(h)
    print(path, round(len(h) / 1e6, 2), 'MB')
out({k: f'assets/{k}.webp' for k in keys}, os.path.join(D, 'index.html'))
if len(sys.argv) > 1:
    inl = {k: 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(D, 'assets', k + '.webp'), 'rb').read()).decode() for k in keys}
    out(inl, sys.argv[1])
