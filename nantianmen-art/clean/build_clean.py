# Build cleaned (background removed) copies of every GPT image into OUT, with manifest.json {file: raw blob sha}
import subprocess, json, os, sys, io
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from keyout import keyout
REPO = '/home/user/monster-gacha-life'; OUT = sys.argv[1]
def git(*a, binary=False):
    r = subprocess.run(['git', '-C', REPO] + list(a), capture_output=True, check=True)
    return r.stdout if binary else r.stdout.decode()
refs = [l.split()[1].replace('refs/heads/', '') for l in git('ls-remote', 'origin', 'refs/heads/art/nantianmen*').splitlines()]
refs.sort(reverse=True)   # same priority as gallery
chosen = {}
for b in refs:
    git('fetch', '-q', 'origin', f'+refs/heads/{b}:refs/remotes/origin/{b}')
    for line in git('ls-tree', f'origin/{b}', 'nantianmen-art/images/').splitlines():
        meta, path = line.split('\t'); sha = meta.split()[2]; f = os.path.basename(path)
        if f.endswith('.png') and f not in chosen: chosen[f] = (b, sha)
os.makedirs(OUT, exist_ok=True)
mpath = os.path.join(OUT, 'manifest.json')
man = json.load(open(mpath)) if os.path.exists(mpath) else {}
done = 0
OVR = {'egg-rare__idle.png': {'T1': 7, 'holes': False},
       # background layers: remove every enclosed pocket of background colour (gaps between bamboo, inside railings)
       **{f'bg-{a}__ground.png': {'bgsample': 'top', 'holes': False} for a in 'bamboo herb town volcano cloud palace'.split()},
       **{f: {'allholes': 12} for f in ['bg-bamboo__mid.png', 'bg-palace__far.png', 'bg-palace__mid.png', 'bg-cloud__far.png', 'bg-cloud__mid.png', 'bg-town__mid.png']}}   # pale highlight touches the edge with no outline
for f, (b, sha) in sorted(chosen.items()):
    if f.endswith('__sky.png'): continue
    if man.get(f, {}).get('raw') == sha and os.path.exists(os.path.join(OUT, f)): continue
    try:
        im = Image.open(io.BytesIO(git('cat-file', 'blob', sha, binary=True))); im.load()
    except Exception as e:
        print('BROKEN', f, b, e); continue
    if f.endswith('__full.png'):   # whole scenes: keep as drawn
        im.save(os.path.join(OUT, f), optimize=True); man[f] = {'raw': sha, 'branch': b}; done += 1; print('copied', f, b); continue
    keyout(im, crop=not f.startswith('bg-'), **OVR.get(f, {})).save(os.path.join(OUT, f), optimize=True)
    man[f] = {'raw': sha, 'branch': b}; done += 1
    print('cleaned', f, b)
json.dump(man, open(mpath, 'w'), ensure_ascii=False, indent=0, sort_keys=True)
print('total', len(man), 'new', done)
