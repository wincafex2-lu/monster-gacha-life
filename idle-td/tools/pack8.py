"""第八批美術打包（上古凶獸：饕餮、檮杌、混沌、窮奇＋葫蘆）。接在前面幾支之後跑，合併進同一份 manifest。
用法：python3 pack8.py <原圖資料夾> <assets 資料夾>
凶獸跟神獸同比例（x_<id> 站姿、xa_<id> 撲擊格）；窮奇是飛的，錨點放身體正中間。
大招圖 xu_<id> 存 1000 寬；葫蘆 g_closed／g_open 存 128（跟法寶圖示一樣）。"""
import sys, os, json
SRC, OUT = sys.argv[1], sys.argv[2]
src = open(os.path.join(os.path.dirname(__file__), 'pack.py'), encoding='utf-8').read()
exec(src[:src.index('files = set(')])
mp = os.path.join(OUT, 'manifest.json')
MAN.update(json.load(open(mp)))
sc = S * X2
for c in ('taotie', 'taowu', 'hundun', 'qiongqi'):
    fly = c == 'qiongqi'
    gy = 627 if fly else ground_y_of(f'{c}__stand.png')
    fx = sprite(f'x_{c}', f'{c}__stand.png', sc, gy)
    sprite(f'xa_{c}', f'{c}__attack_f2.png', sc, 627 if fly else ground_y_of(f'{c}__attack_f2.png'))
    if fly:
        for k in (f'x_{c}', f'xa_{c}'):
            MAN[k][2] = round(MAN[k][0] / 2, 1); MAN[k][3] = round(MAN[k][1] / 2, 1)
    im = keyed(f'{c}__ult.png'); im = im.crop(im.getbbox()); f = 1000 / im.width
    im = im.resize((1000, max(1, round(im.height * f))), Image.LANCZOS); save(f'xu_{c}', im, 500, im.height / 2, q=80)
for g in ('closed', 'open'):
    im = keyed(f'gourd__{g}.png'); im = im.crop(im.getbbox()); f = 128 / max(im.size)
    im = im.resize((max(1, round(im.width * f)), max(1, round(im.height * f))), Image.LANCZOS)
    save(f'g_{g}', im, im.width / 2, im.height / 2)
json.dump(MAN, open(mp, 'w'), separators=(',', ':'))
print({k: v for k, v in MAN.items() if k.startswith(('x_', 'xa_', 'xu_', 'g_'))})
