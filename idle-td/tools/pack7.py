"""第七批美術打包（山海經神獸：麒麟、白澤、騰蛇、畢方）。接在前面幾支之後跑，合併進同一份 manifest。
用法：python3 pack7.py <原圖資料夾> <assets 資料夾>
跟四神獸同比例；白澤原圖畫得小一點，放大 1.1 倍；飛的（騰蛇、畢方）錨點放身體正中間。大招圖 bu_<id> 存 1000 寬。"""
import sys, os, json
SRC, OUT = sys.argv[1], sys.argv[2]
src = open(os.path.join(os.path.dirname(__file__), 'pack.py'), encoding='utf-8').read()
exec(src[:src.index('files = set(')])
mp = os.path.join(OUT, 'manifest.json')
MAN.update(json.load(open(mp)))
sc = S * X2
for c in ('qilin', 'baize', 'tengshe', 'bifang'):
    fly = c in ('tengshe', 'bifang')
    k = 1.1 if c == 'baize' else 1
    sprite(f'b_{c}', f'{c}__stand.png', sc * k, 978 if fly else ground_y_of(f'{c}__stand.png'))
    if fly: MAN[f'b_{c}'][2] = round(MAN[f'b_{c}'][0] / 2, 1)
    im = keyed(f'{c}__ult.png'); im = im.crop(im.getbbox()); f = 1000 / im.width
    im = im.resize((1000, max(1, round(im.height * f))), Image.LANCZOS); save(f'bu_{c}', im, 500, im.height / 2, q=80)
json.dump(MAN, open(mp, 'w'), separators=(',', ':'))
print({k: v for k, v in MAN.items() if k.startswith(('b_', 'bu_'))})
