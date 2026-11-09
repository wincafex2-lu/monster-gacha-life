"""產生 idle-td/index.html（GitHub Pages，圖片讀 assets/）和單檔預覽版（圖片內嵌）。
用法：python3 tools/build.py [單檔輸出路徑]
程式碼在 src/：index.tpl.html（網頁骨架）＋ css/style.css ＋ js/*.js，打包時照 @@include 合成一個檔"""
import json, os, sys, base64
D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
man = json.load(open(os.path.join(D, 'assets', 'manifest.json')))
def assemble():
    """src/index.tpl.html 裡每行 @@include <檔名> 換成 src/<檔名> 的內容（css/、js/ 照檔名順序）"""
    S = os.path.join(D, 'src')
    out = []
    for line in open(os.path.join(S, 'index.tpl.html'), encoding='utf-8').read().splitlines(keepends=True):
        if line.startswith('@@include '):
            out.append(open(os.path.join(S, line[10:].strip()), encoding='utf-8').read())
        else:
            out.append(line)
    return ''.join(out)
src = assemble()
keys = sorted(man)
def out(srcmap, path):
    h = src.replace('__MANIFEST__', json.dumps(man, separators=(',', ':'))).replace('__SRCMAP__', json.dumps(srcmap, separators=(',', ':')))
    open(path, 'w', encoding='utf-8').write(h)
    print(path, round(len(h) / 1e6, 2), 'MB')
out({k: f'assets/{k}.webp' for k in keys}, os.path.join(D, 'index.html'))
if len(sys.argv) > 1:
    # 單檔預覽上限 16MB：角色（×0.72）、大招圖（×0.56）、樓閣、陣法、背景圖重新壓縮（攻擊格 quality 44、其他 60），其他圖照原檔
    # 壓過的圖快取在 ~/.cache/idle-td-inline，下次 build 不用重壓
    import io, hashlib
    from PIL import Image
    CACHE = os.path.expanduser('~/.cache/idle-td-inline'); os.makedirs(CACHE, exist_ok=True)
    def data(k):
        raw = open(os.path.join(D, 'assets', k + '.webp'), 'rb').read()
        if k.startswith(('c_', 'ult_', 'bu_', 'xu_', 'x_', 'xa_', 'tower', 'd_', 'bg_')):
            q = 44 if k.startswith('c_') and '_a' in k[2:] else 60
            cp = os.path.join(CACHE, hashlib.md5(raw).hexdigest() + f'_{q}s{"v" if k.startswith(("ult_", "bu_", "xu_")) else ""}.webp')
            if not os.path.exists(cp):
                im0 = Image.open(io.BytesIO(raw))
                if k.startswith(('c_', 'ult_', 'bu_', 'xu_')):
                    f = .56 if k.startswith(('ult_', 'bu_', 'xu_')) else .72
                    im0 = im0.resize((max(1, round(im0.width * f)), max(1, round(im0.height * f))), Image.LANCZOS)
                bio = io.BytesIO(); im0.save(bio, 'WEBP', quality=q, method=4)
                open(cp, 'wb').write(min(raw, bio.getvalue(), key=len))
            raw = open(cp, 'rb').read()
        return 'data:image/webp;base64,' + base64.b64encode(raw).decode()
    inl = {k: data(k) for k in keys}
    out(inl, sys.argv[1])
