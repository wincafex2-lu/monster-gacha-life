"""第五批美術打包（新弟子：彈弓頑童、擊鼓小樂師、狸貓忍者、月兔仙子，之後小猴王）。
接在 pack.py 之後跑，用 pack.py 同一套去背／縮放／腳底對齊，合併進同一份 manifest。
用法：python3 pack5.py <原圖資料夾> <assets 資料夾>"""
import sys, os, json
SRC, OUT = sys.argv[1], sys.argv[2]
src = open(os.path.join(os.path.dirname(__file__), 'pack.py'), encoding='utf-8').read()
exec(src[:src.index('files = set(')])  # 只拿 pack.py 的函式（keyed / sprite / ground_y_of）
mp = os.path.join(OUT, 'manifest.json')
MAN.update(json.load(open(mp)))
files = set(os.listdir(SRC))
sc = S * X2
for c in sorted({f.split('__')[0] for f in files if f.endswith('__stand.png') and '__t' in f}):
    for t in range(1, 6):
        n = f'{c}__t{t}__stand.png'
        if n not in files: continue
        gy = ground_y_of(n)
        fx = sprite(f'c_{c}_{t}', n, sc, gy)
        for f in (1, 2, 3):
            na = f'{c}__t{t}__attack_f{f}.png'
            if na in files: sprite(f'c_{c}_{t}_a{f}', na, sc, gy, foot_x=fx)
json.dump(MAN, open(mp, 'w'), separators=(',', ':'))
print(len(MAN), 'sprites')
