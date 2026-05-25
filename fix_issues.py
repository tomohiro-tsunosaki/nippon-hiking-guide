import os
import re

BASE = r'C:\Users\user\hiking-site'

# ── 1. og:url を追加するファイルと URL のマッピング ──────────────────────────
OG_URL_MAP = {
    'regions/chubu/kamikochi.html':   'https://nippon-hiking-guide.com/regions/chubu/kamikochi.html',
    'regions/chubu/kirigamine.html':  'https://nippon-hiking-guide.com/regions/chubu/kirigamine.html',
    'regions/chubu/yatsugatake.html': 'https://nippon-hiking-guide.com/regions/chubu/yatsugatake.html',
    'regions/chugoku/daisen.html':    'https://nippon-hiking-guide.com/regions/chugoku/daisen.html',
    'regions/hokkaido/daisetsuzan.html': 'https://nippon-hiking-guide.com/regions/hokkaido/daisetsuzan.html',
    'regions/hokkaido/shiretoko.html': 'https://nippon-hiking-guide.com/regions/hokkaido/shiretoko.html',
    'regions/kanto/takao.html':       'https://nippon-hiking-guide.com/regions/kanto/takao.html',
    'regions/kanto/tsukuba.html':     'https://nippon-hiking-guide.com/regions/kanto/tsukuba.html',
    'regions/kinki/rokko.html':       'https://nippon-hiking-guide.com/regions/kinki/rokko.html',
    'regions/kinki/yoshino.html':     'https://nippon-hiking-guide.com/regions/kinki/yoshino.html',
    'regions/kyushu/aso.html':        'https://nippon-hiking-guide.com/regions/kyushu/aso.html',
    'regions/kyushu/yakushima.html':  'https://nippon-hiking-guide.com/regions/kyushu/yakushima.html',
    'regions/shikoku/ishizuchi.html': 'https://nippon-hiking-guide.com/regions/shikoku/ishizuchi.html',
    'regions/tohoku/zao.html':        'https://nippon-hiking-guide.com/regions/tohoku/zao.html',
    'privacy.html':  'https://nippon-hiking-guide.com/privacy.html',
    'contact.html':  'https://nippon-hiking-guide.com/contact.html',
}

# ── 2. ホテル/宿泊リンクの href="#" → 実URL マッピング ──────────────────────
# (ファイルパス, 旧テキスト断片, 新URL) のリスト
HOTEL_LINK_MAP = [
    # 高尾山
    ('regions/kanto/takao.html',
     '詳細・予約（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/tokyo/hachioji/'),
    ('regions/kanto/takao.html',
     '八王子のホテルを探す（じゃらん）',
     'https://www.jalan.net/kankou/spt_guide/130000/131040/'),
    # 富士山
    ('regions/chubu/fuji.html',
     '河口湖のホテルを探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/yamanashi/kawaguchiko/'),
    ('regions/chubu/fuji.html',
     '山小屋を予約する',
     'https://www.fujisan-climb.jp/staying/'),
    ('regions/chubu/fuji.html',
     '富士山オフィシャルサイト',
     'https://www.fujisan-climb.jp/'),
    # 上高地
    ('regions/chubu/kamikochi.html',
     '宿泊施設を探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/nagano/kamikochi/'),
    ('regions/chubu/kamikochi.html',
     '山小屋・キャンプを探す',
     'https://www.kamikochi.or.jp/plan/lodging'),
    # 霧ヶ峰
    ('regions/chubu/kirigamine.html',
     '宿泊施設を探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/nagano/suwa/'),
    ('regions/chubu/kirigamine.html',
     '山小屋・キャンプを探す',
     'https://travel.rakuten.co.jp/yado/nagano/tateshina/'),
    # 八ヶ岳
    ('regions/chubu/yatsugatake.html',
     '山小屋を予約する',
     'https://travel.rakuten.co.jp/yado/nagano/yatsugatake/'),
    ('regions/chubu/yatsugatake.html',
     '宿泊施設を探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/nagano/yatsugatake/'),
    # 大山
    ('regions/chugoku/daisen.html',
     '宿泊施設を探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/tottori/daisen/'),
    ('regions/chugoku/daisen.html',
     'キャンプ場を探す',
     'https://www.jalan.net/kankou/spt_camp/31000/'),
    # 大雪山
    ('regions/hokkaido/daisetsuzan.html',
     '宿泊施設を探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/hokkaido/asahikawa/'),
    ('regions/hokkaido/daisetsuzan.html',
     '山小屋・キャンプを探す',
     'https://travel.rakuten.co.jp/yado/hokkaido/daisetsuzan/'),
    # 知床
    ('regions/hokkaido/shiretoko.html',
     '宿泊施設を探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/hokkaido/shiretoko/'),
    ('regions/hokkaido/shiretoko.html',
     '山小屋・キャンプを探す',
     'https://www.shiretoko.asia/'),
    # 六甲
    ('regions/kinki/rokko.html',
     '有馬温泉の宿を探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/hyogo/arima/'),
    ('regions/kinki/rokko.html',
     '神戸・宝塚の宿を探す',
     'https://travel.rakuten.co.jp/yado/hyogo/kobe/'),
    # 吉野
    ('regions/kinki/yoshino.html',
     '宿泊施設を探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/nara/yoshino/'),
    ('regions/kinki/yoshino.html',
     '山小屋・キャンプを探す',
     'https://travel.rakuten.co.jp/yado/nara/yoshino/'),
    # 阿蘇
    ('regions/kyushu/aso.html',
     '宿泊施設を探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/kumamoto/aso/'),
    ('regions/kyushu/aso.html',
     '山小屋・キャンプを探す',
     'https://travel.rakuten.co.jp/yado/kumamoto/aso/'),
    # 屋久島
    ('regions/kyushu/yakushima.html',
     '屋久島のホテルを探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/kagoshima/yakushima/'),
    ('regions/kyushu/yakushima.html',
     '民宿を探す（じゃらん）',
     'https://www.jalan.net/kankou/spt_guide/460000/464010/'),
    # 蔵王
    ('regions/tohoku/zao.html',
     '宿泊施設を探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/yamagata/zao/'),
    ('regions/tohoku/zao.html',
     '山形市内の宿を探す',
     'https://travel.rakuten.co.jp/yado/yamagata/yamagata/'),
    # 石鎚山
    ('regions/shikoku/ishizuchi.html',
     '宿泊施設を探す（楽天トラベル）',
     'https://travel.rakuten.co.jp/yado/ehime/saijo/'),
    ('regions/shikoku/ishizuchi.html',
     '山小屋・キャンプを探す',
     'https://travel.rakuten.co.jp/yado/ehime/saijo/'),
]

# ── 3. 特定リンク修正（takao.html の tsukuba リンク）──────────────────────
SPECIFIC_FIXES = [
    ('regions/kanto/takao.html',
     '<li><a href="#">筑波山（茨城）</a>',
     '<li><a href="tsukuba.html">筑波山（茨城）</a>'),
]

# ──────────────────────────────────────────────────────────────────────────────

def fix_file(rel_path, fixes_applied):
    fpath = os.path.join(BASE, rel_path.replace('/', os.sep))
    if not os.path.exists(fpath):
        print(f"  [SKIP] {rel_path} not found")
        return
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content

    # 1. og:url
    if rel_path in OG_URL_MAP and 'og:url' not in content:
        url = OG_URL_MAP[rel_path]
        tag = f'  <meta property="og:url" content="{url}">\n'
        # Insert after og:description or og:type line
        for marker in ['property="og:description"', 'property="og:type"']:
            idx = content.find(marker)
            if idx != -1:
                end = content.index('\n', idx) + 1
                content = content[:end] + tag + content[end:]
                fixes_applied.append(f'{rel_path}: added og:url')
                break

    # 2. ホテルリンク href="#" → 実URL
    for (frel, text_fragment, new_url) in HOTEL_LINK_MAP:
        if frel != rel_path:
            continue
        # Match: href="#" ... text_fragment ... </a>
        pattern = r'<a href="#"([^>]*)>([^<]*' + re.escape(text_fragment) + r'[^<]*)</a>'
        def make_replacement(url):
            def repl(m):
                return f'<a href="{url}" target="_blank" rel="nofollow noopener"{m.group(1)}>{m.group(2)}</a>'
            return repl
        new_content = re.sub(pattern, make_replacement(new_url), content)
        if new_content != content:
            content = new_content
            fixes_applied.append(f'{rel_path}: fixed hotel link "{text_fragment}"')

    # Special: fuji.html のオフィシャルサイトリンク（aタグではなくインライン）
    if rel_path == 'regions/chubu/fuji.html':
        old = '<a href="#" style="color:var(--color-primary);">富士山オフィシャルサイト</a>'
        new = '<a href="https://www.fujisan-climb.jp/" target="_blank" rel="nofollow noopener" style="color:var(--color-primary);">富士山オフィシャルサイト</a>'
        if old in content:
            content = content.replace(old, new)
            fixes_applied.append(f'{rel_path}: fixed 富士山オフィシャルサイト link')

    # 3. 個別リンク修正
    for (frel, old_str, new_str) in SPECIFIC_FIXES:
        if frel != rel_path:
            continue
        if old_str in content:
            content = content.replace(old_str, new_str)
            fixes_applied.append(f'{rel_path}: fixed specific link')

    if content != original:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)

# 対象ファイルを集める
target_files = set()
target_files.update(OG_URL_MAP.keys())
for (frel, _, _) in HOTEL_LINK_MAP:
    target_files.add(frel)
for (frel, _, _) in SPECIFIC_FIXES:
    target_files.add(frel)

fixes_applied = []
for rel in sorted(target_files):
    fix_file(rel, fixes_applied)

print(f"Applied {len(fixes_applied)} fixes:")
for f in fixes_applied:
    print(f"  + {f}")
