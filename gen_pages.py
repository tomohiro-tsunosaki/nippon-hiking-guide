import os

BASE = r"C:\Users\user\hiking-site"
GA = """  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6B5X3RYCC0"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-6B5X3RYCC0');
  </script>"""

STYLE_BLOCK = """  <style>
    .region-hero{background:linear-gradient(135deg,#2d6a4f 0%,#40916c 100%);color:white;padding:60px 20px;text-align:center;}
    .region-hero h1{font-size:2.5rem;margin-bottom:12px;}
    .region-hero p{font-size:1.1rem;opacity:.9;max-width:640px;margin:8px auto 0;}
    .region-hero-emoji{font-size:3rem;margin-bottom:12px;}
    .course-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;margin:40px 0;}
    .course-card{background:white;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.08);overflow:hidden;transition:transform .2s;}
    .course-card:hover{transform:translateY(-4px);}
    .card-img{height:150px;display:flex;align-items:center;justify-content:center;font-size:4rem;background:#f0f7f4;}
    .card-body{padding:20px;}
    .card-badges{display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;}
    .bdiff{padding:3px 10px;border-radius:20px;font-size:.75rem;font-weight:700;}
    .bdiff.easy{background:#d8f3dc;color:#1b4332;}
    .bdiff.medium{background:#fff3cd;color:#856404;}
    .bdiff.hard{background:#fde8e8;color:#9b1c1c;}
    .card-title{font-size:1.2rem;font-weight:700;color:#1b4332;margin-bottom:6px;}
    .card-meta{font-size:.82rem;color:#666;margin-bottom:10px;}
    .card-desc{font-size:.88rem;color:#444;line-height:1.6;margin-bottom:14px;}
    .btn-course{display:inline-block;background:#2d6a4f;color:white;padding:9px 22px;border-radius:8px;font-weight:700;text-decoration:none;font-size:.88rem;}
    .btn-course:hover{background:#1b4332;}
    .region-info{background:#f0f7f4;border-radius:12px;padding:28px 32px;margin:32px 0;}
    .region-info h2{color:#1b4332;margin-bottom:12px;}
    .region-info p{color:#333;line-height:1.8;}
    .section-title{font-size:1.6rem;font-weight:700;color:#1b4332;margin:48px 0 8px;border-bottom:3px solid #2d6a4f;padding-bottom:8px;}
  </style>"""

def make_header(depth):
    up = "../" * depth
    return f"""  <header class="site-header">
    <div class="container header-inner">
      <div class="logo"><a href="{up}index.html"><span class="logo-icon">&#9968;&#65039;</span><span class="logo-text">&#12395;&#12387;&#12413;&#12435;&#12495;&#12452;&#12461;&#12531;&#12464;&#12460;&#12452;&#12489;</span></a></div>
      <nav class="global-nav"><ul>
        <li><a href="{up}index.html#regions">&#22320;&#22495;&#12363;&#12425;&#25506;&#12377;</a></li>
        <li><a href="{up}index.html#difficulty">&#38627;&#26131;&#24230;&#12363;&#12425;&#25506;&#12377;</a></li>
        <li><a href="{up}index.html#season">&#23395;&#31295;&#12363;&#12425;&#25506;&#12377;</a></li>
        <li><a href="{up}gear/index.html" class="nav-gear">&#35013;&#20633;&#12460;&#12452;&#12489;</a></li>
      </ul></nav>
      <button class="nav-toggle" aria-label="&#12�&#12491;&#12517;&#12540;">&#9776;</button>
    </div>
  </header>"""

def make_footer(depth):
    up = "../" * depth
    return f"""  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-logo"><span>&#9968;&#65039;</span> &#12395;&#12387;&#12413;&#12435;&#12495;&#12452;&#12461;&#12531;&#12464;&#12460;&#12452;&#12489;</div>
      <nav class="footer-nav"><ul>
        <li><a href="{up}about.html">&#12371;&#12398;&#12469;&#12452;&#12488;&#12395;&#12388;&#12356;&#12390;</a></li>
        <li><a href="{up}privacy.html">&#12503;&#12521;&#12452;&#12496;&#12471;&#12540;&#12509;&#12522;&#12471;&#12540;</a></li>
        <li><a href="{up}contact.html">&#12362;&#21839;&#12356;&#21512;&#12431;&#12379;</a></li>
        <li><a href="{up}sitemap.html">&#12469;&#12452;&#12488;&#12510;&#12483;&#12503;</a></li>
      </ul></nav>
      <p class="footer-copy">&copy; 2026 &#12395;&#12387;&#12413;&#12435;&#12495;&#12452;&#12461;&#12531;&#12464;&#12460;&#12452;&#12489;. All rights reserved.</p>
    </div>
  </footer>
  <script src="{up}js/main.js"></script>"""

def make_card(emoji, title, region_label, diff, diff_label, meta, desc, link):
    return (
        '        <div class="course-card">\n'
        f'          <div class="card-img">{emoji}</div>\n'
        '          <div class="card-body">\n'
        f'            <div class="card-badges"><span class="bdiff {diff}">{diff_label}</span>'
        f'<span style="font-size:.75rem;color:#888;">{region_label}</span></div>\n'
        f'            <div class="card-title">{title}</div>\n'
        f'            <div class="card-meta">{meta}</div>\n'
        f'            <p class="card-desc">{desc}</p>\n'
        f'            <a href="{link}" class="btn-course">&#35442;&#12375;&#12367;&#35211;&#12427; &#8594;</a>\n'
        '          </div>\n'
        '        </div>'
    )

def build_page(canonical_path, title, desc, hero_emoji, hero_title, hero_sub, breadcrumb_html, cards_html, info_title, info_text, css_path, depth):
    url = f"https://tomohiro-tsunosaki.github.io/nippon-hiking-guide/{canonical_path}"
    hdr = make_header(depth)
    ftr = make_footer(depth)
    return (
        '<!DOCTYPE html>\n<html lang="ja">\n<head>\n'
        + GA + '\n'
        + f'  <meta charset="UTF-8">\n'
        + f'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        + f'  <meta name="description" content="{desc}">\n'
        + f'  <meta property="og:title" content="{title} | &#12395;&#12387;&#12413;&#12435;&#12495;&#12452;&#12461;&#12531;&#12464;&#12460;&#12452;&#12489;">\n'
        + f'  <meta property="og:description" content="{desc}">\n'
        + f'  <meta property="og:type" content="website">\n'
        + f'  <meta property="og:url" content="{url}">\n'
        + f'  <meta property="og:site_name" content="&#12395;&#12387;&#12413;&#12435;&#12495;&#12452;&#12461;&#12531;&#12464;&#12460;&#12452;&#12489;">\n'
        + f'  <meta property="og:locale" content="ja_JP">\n'
        + f'  <meta name="twitter:card" content="summary">\n'
        + f'  <title>{title} | &#12395;&#12387;&#12413;&#12435;&#12495;&#12452;&#12461;&#12531;&#12464;&#12460;&#12452;&#12489;</title>\n'
        + f'  <link rel="stylesheet" href="{css_path}">\n'
        + f'  <link rel="canonical" href="{url}">\n'
        + '  <link rel="preconnect" href="https://fonts.googleapis.com">\n'
        + '  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">\n'
        + STYLE_BLOCK + '\n'
        + '</head>\n<body>\n'
        + hdr + '\n'
        + f'  <nav class="breadcrumb"><div class="container"><ol>{breadcrumb_html}</ol></div></nav>\n'
        + f'  <div class="region-hero">\n'
        + f'    <div class="region-hero-emoji">{hero_emoji}</div>\n'
        + f'    <h1>{hero_title}</h1>\n'
        + f'    <p>{hero_sub}</p>\n'
        + '  </div>\n'
        + '  <main>\n    <div class="container">\n'
        + '      <h2 class="section-title">&#12362;&#12377;&#12377;&#12417;&#12467;&#12540;&#12473;&#19968;&#35272;</h2>\n'
        + '      <div class="course-grid">\n'
        + cards_html + '\n'
        + '      </div>\n'
        + f'      <div class="region-info"><h2>{info_title}</h2><p>{info_text}</p></div>\n'
        + '    </div>\n  </main>\n'
        + ftr + '\n'
        + '</body>\n</html>'
    )

# Data for 8 region pages
regions = [
    {
        "path": "regions/kanto/index.html", "depth": 2,
        "canonical": "regions/kanto/",
        "title": "関東のハイキング",
        "desc": "関東のおすすめハイキングコース一覧。高尾山・奥多摩など東京・神奈川・茨城の絶景コースを紹介。",
        "hero_emoji": "🗻", "hero_title": "関東のハイキング",
        "hero_sub": "都心から日帰りで行ける山が豊富。電車アクセスが良く、初心者から上級者まで楽しめるコースが揃っています。",
        "breadcrumb": '<li><a href="../../index.html">ホーム</a></li><li>関東のハイキング</li>',
        "css": "../../css/style.css",
        "info_title": "関東ハイキングの特徴",
        "info_text": "首都圏からのアクセスが抜群で、電車一本で行ける山が多い。高尾山を筆頭に整備されたコースが充実。初心者向けから縦走まで多彩なコースが揃う日本最大のハイキングエリア。春の桜・秋の紅葉シーズンは特に人気が高い。",
        "cards": [
            make_card("🏔️","高尾山（東京）","関東","easy","初級","標高599m・距離3.8km・所要2時間","都心から50分。年間300万人が訪れる日本一人気の山。初心者・子連れに最適。","takao.html"),
            make_card("⛰️","筑波山（茨城）","関東","easy","初級","標高877m・距離6km・所要3時間","ケーブルカー・ロープウェイあり。関東平野を一望する日本百名山。","#"),
            make_card("🗻","大山（神奈川）","関東","easy","初級","標高1,252m・距離7km・所要3.5時間","雨降山とも呼ばれる神奈川の名峰。阿夫利神社へ参拝しながら登る。","#"),
            make_card("🌿","御岳山（東京）","関東","easy","初級","標高929m・距離5km・所要3時間","武蔵御嶽神社への参拝と渓谷美が楽しめる。ケーブルカー利用可。","#"),
            make_card("🏕️","丹沢山（神奈川）","関東","medium","中級","標高1,567m・距離16km・所要7時間","日本百名山。富士山の絶景が広がる神奈川最高峰への縦走コース。","#"),
            make_card("🌄","雲取山（東京・埼玉）","関東","medium","中級","標高2,017m・距離20km・所要1泊2日","東京都最高峰。尾根道の縦走が楽しめる本格的な日本百名山。","#"),
        ]
    },
    {
        "path": "regions/chubu/index.html", "depth": 2,
        "canonical": "regions/chubu/",
        "title": "中部のハイキング",
        "desc": "中部地方のおすすめハイキングコース一覧。富士山・上高地・霧ヶ峰など長野・静岡・山梨の名山を紹介。",
        "hero_emoji": "🗻", "hero_title": "中部のハイキング",
        "hero_sub": "日本アルプスをはじめ、富士山・上高地など日本を代表する絶景スポットが集中。本格的な高山ハイキングが楽しめます。",
        "breadcrumb": '<li><a href="../../index.html">ホーム</a></li><li>中部のハイキング</li>',
        "css": "../../css/style.css",
        "info_title": "中部ハイキングの特徴",
        "info_text": "日本アルプス（北・中央・南）を擁する日本最大の山岳地帯。富士山・上高地など世界的に有名なスポットが集中。標高3,000m超の本格的な高山登山から、上高地・霧ヶ峰のような整備されたウォーキングまで幅広い層に対応。",
        "cards": [
            make_card("🗻","富士山（静岡・山梨）","中部","medium","中級","標高3,776m・距離12km・所要9時間","日本最高峰・世界文化遺産。7〜9月開山。一生に一度は登りたい山。","fuji.html"),
            make_card("🏔️","上高地（長野）","中部","easy","初級","標高1,500m・距離10km・所要4時間","穂高連峰を望む高原リゾート。大正池・河童橋・明神池が見どころ。","kamikochi.html"),
            make_card("🌸","霧ヶ峰（長野）","中部","easy","初級","標高1,925m・距離10km・所要4時間","ニッコウキスゲ咲く高原。車山からの360度パノラマが絶景。","kirigamine.html"),
            make_card("🏕️","乗鞍岳（長野・岐阜）","中部","easy","初級","標高3,026m・距離6km・所要3時間","バスで2,700mまで行ける3,000m超の山。高山植物が豊富。","#"),
            make_card("⛰️","御嶽山（長野・岐阜）","中部","medium","中級","標高3,067m・距離9km・所要5時間","独立峰の霊山。御嶽教の聖地。ロープウェイ利用可。","#"),
            make_card("❄️","白山（石川）","中部","medium","中級","標高2,702m・距離約13km・所要7時間","三霊山の一つ。高山植物の宝庫。石川・岐阜にまたがる百名山。","#"),
        ]
    },
    {
        "path": "regions/kyushu/index.html", "depth": 2,
        "canonical": "regions/kyushu/",
        "title": "九州のハイキング",
        "desc": "九州のおすすめハイキングコース一覧。屋久島・阿蘇山・九重山など、火山と原生林が融合した九州の名山を紹介。",
        "hero_emoji": "🌋", "hero_title": "九州のハイキング",
        "hero_sub": "活火山と世界遺産の原生林が共存する九州。屋久島の縄文杉から阿蘇のカルデラまで、ダイナミックな自然を体験できます。",
        "breadcrumb": '<li><a href="../../index.html">ホーム</a></li><li>九州のハイキング</li>',
        "css": "../../css/style.css",
        "info_title": "九州ハイキングの特徴",
        "info_text": "活火山・世界遺産・亜熱帯の植生など、他の地方にない独特の魅力。阿蘇・屋久島・霧島など個性豊かな山が揃う。気候が温暖で春や秋はとくに快適。",
        "cards": [
            make_card("🌿","屋久島・縄文杉（鹿児島）","九州","medium","中級","標高1,936m・距離22km・所要10時間","樹齢7,200年の縄文杉を目指す世界遺産の旅。日本最高の神秘体験。","yakushima.html"),
            make_card("🌋","阿蘇山（熊本）","九州","easy","初級〜中級","標高1,592m・距離6km・所要3時間","世界最大級のカルデラ。草千里と火口の壮大な景色。","aso.html"),
            make_card("🏔️","九重山（大分）","九州","easy","初級","標高1,787m・距離10km・所要5時間","九州の屋根。花の百名山でコマクサなど高山植物が豊富。","#"),
            make_card("🌊","開聞岳（鹿児島）","九州","medium","中級","標高924m・距離8km・所要4時間","薩摩富士。海に浮かぶような美しいコニーデ型火山。","#"),
            make_card("☁️","雲仙岳（長崎）","九州","easy","初級","標高1,483m・距離7km・所要4時間","普賢岳をはじめとする火山群。温泉地としても有名な九州の名山。","#"),
            make_card("⛰️","祖母山（大分・宮崎）","九州","medium","中級","標高1,756m・距離8km・所要5時間","日本百名山。杉の原生林を抜ける本格的な山岳コース。","#"),
        ]
    },
    {
        "path": "regions/hokkaido/index.html", "depth": 2,
        "canonical": "regions/hokkaido/",
        "title": "北海道のハイキング",
        "desc": "北海道のおすすめハイキングコース一覧。大雪山・知床・羊蹄山など、雄大な自然が広がる北海道の名山を紹介。",
        "hero_emoji": "❄️", "hero_title": "北海道のハイキング",
        "hero_sub": "日本最大の大自然。ヒグマが生息する原生の森、日本で最初に紅葉が訪れる大雪山、世界遺産の知床。スケールが違う北海道のハイキングへ。",
        "breadcrumb": '<li><a href="../../index.html">ホーム</a></li><li>北海道のハイキング</li>',
        "css": "../../css/style.css",
        "info_title": "北海道ハイキングの特徴",
        "info_text": "本州と異なる亜寒帯の自然。ヒグマが生息する原生林、日本最大の国立公園（大雪山系）、世界遺産（知床）など唯一無二の自然体験ができる。夏は短く7〜9月がベストシーズン。",
        "cards": [
            make_card("❄️","大雪山・旭岳（上川）","北海道","medium","中級","標高2,291m・距離8km・所要5時間","北海道最高峰。日本最早の紅葉（9月）とコマクサのお花畑。","daisetsuzan.html"),
            make_card("🐻","知床五湖（斜里）","北海道","easy","初級〜中級","標高200m・距離3〜8km・所要1〜4時間","世界遺産の秘境。ヒグマが棲む原始の湖沼群。","shiretoko.html"),
            make_card("🏔️","羊蹄山（虻田）","北海道","hard","上級","標高1,898m・距離15km・所要8時間","蝦夷富士の別名を持つ美しい火山。北海道を代表する百名山。","#"),
            make_card("🌊","利尻山（利尻）","北海道","hard","上級","標高1,721m・距離10km・所要8時間","利尻島に聳える独立峰。海越しに見る山容は日本随一の絶景。","#"),
            make_card("🌋","十勝岳（上川）","北海道","medium","中級","標高2,077m・距離8km・所要5時間","活火山。荒涼とした火山地形と美瑛の丘のコントラストが壮観。","#"),
            make_card("⛷️","ニセコ・ワイスホルン（倶知安）","北海道","easy","初級","標高1,044m・距離5km・所要3時間","スキーリゾートの夏ハイキング。羊蹄山の展望台として人気。","#"),
        ]
    },
    {
        "path": "regions/kinki/index.html", "depth": 2,
        "canonical": "regions/kinki/",
        "title": "近畿のハイキング",
        "desc": "近畿のおすすめハイキングコース一覧。吉野山・六甲山・大台ヶ原など関西の名山を紹介。",
        "hero_emoji": "🌸", "hero_title": "近畿のハイキング",
        "hero_sub": "世界遺産の吉野山の桜から六甲山の展望まで、歴史と自然が融合した近畿のハイキング。大阪・京都・奈良から日帰り圏内のコースが揃っています。",
        "breadcrumb": '<li><a href="../../index.html">ホーム</a></li><li>近畿のハイキング</li>',
        "css": "../../css/style.css",
        "info_title": "近畿ハイキングの特徴",
        "info_text": "歴史的な霊山・聖地が多い。吉野の桜、六甲の夜景、大台ヶ原の苔むす原生林など個性豊か。大阪・京都・奈良から気軽に日帰りできるコースが充実している。",
        "cards": [
            make_card("🌸","吉野山（奈良）","近畿","easy","初級","標高858m・距離8km・所要4時間","3万本の桜が咲く世界遺産。日本一の桜の名所。4月上旬がベスト。","yoshino.html"),
            make_card("🌆","六甲山（兵庫）","近畿","easy","初級","標高931m・距離7km・所要3.5時間","神戸の夜景が見える都市近郊の人気ハイキング山。ロープウェイあり。","#"),
            make_card("🌿","大台ヶ原（奈良）","近畿","easy","初級","標高1,695m・距離約8km・所要4時間","国内屈指の多雨地帯。苔と霧の神秘的な原生林の世界。","#"),
            make_card("⛰️","金剛山（奈良・大阪）","近畿","easy","初級","標高1,125m・距離6km・所要3時間","年間登山者数が日本一とも言われる大阪近郊の人気の山。","#"),
            make_card("⛩️","比叡山（滋賀・京都）","近畿","easy","初級","標高848m・距離5km・所要2.5時間","延暦寺を擁する霊山。琵琶湖と京都市街を一望できる展望。","#"),
            make_card("🏔️","大峰山（奈良）","近畿","medium","中級","標高1,719m・距離8km・所要5時間","修験道の聖地。大峰奥駈道の起点となる霊験あらたかな山。","#"),
        ]
    },
    {
        "path": "regions/shikoku/index.html", "depth": 2,
        "canonical": "regions/shikoku/",
        "title": "四国のハイキング",
        "desc": "四国のおすすめハイキングコース一覧。石鎚山・剣山など西日本最高峰を擁する四国の山々を紹介。",
        "hero_emoji": "⛩️", "hero_title": "四国のハイキング",
        "hero_sub": "西日本最高峰の石鎚山をはじめ、四国八十八ヶ所遍路の道が続く霊験あらたかな山々。手つかずの自然と深い信仰の地、四国のハイキングへ。",
        "breadcrumb": '<li><a href="../../index.html">ホーム</a></li><li>四国のハイキング</li>',
        "css": "../../css/style.css",
        "info_title": "四国ハイキングの特徴",
        "info_text": "石鎚山・剣山という日本百名山を擁す。遍路文化と山岳信仰が根付く霊山が多い。本州に比べ人が少なく、静かな山行が楽しめる穴場エリア。",
        "cards": [
            make_card("⛩️","石鎚山（愛媛）","四国","hard","中級〜上級","標高1,982m・距離8km・所要5時間","西日本最高峰。鎖場が名物の七霊山。四国ハイキングの最高峰。","ishizuchi.html"),
            make_card("🏔️","剣山（徳島）","四国","easy","初級","標高1,955m・距離4km・所要3時間","四国第二の高峰。リフト利用で手軽に登れる百名山。","#"),
            make_card("🌿","三嶺（高知・徳島）","四国","medium","中級","標高1,894m・距離10km・所要6時間","四国の秘峰。笹原の尾根道と天空の池が絶景。","#"),
            make_card("🍁","寒霞渓（香川）","四国","easy","初級","標高618m・距離4km・所要2時間","小豆島の紅葉の名所。日本三大渓谷美のひとつ。ロープウェイあり。","#"),
            make_card("🌸","筒上山（高知）","四国","medium","中級","標高1,859m・距離8km・所要5時間","アケボノツツジの群落が美しい四国の名峰。","#"),
            make_card("🔴","東赤石山（愛媛）","四国","medium","中級","標高1,706m・距離8km・所要5時間","超塩基性岩の特殊な植生。希少な高山植物の宝庫。","#"),
        ]
    },
    {
        "path": "regions/chugoku/index.html", "depth": 2,
        "canonical": "regions/chugoku/",
        "title": "中国地方のハイキング",
        "desc": "中国地方のおすすめハイキングコース一覧。大山・吾妻山・三瓶山など、中国山地の名山を紹介。",
        "hero_emoji": "🏔️", "hero_title": "中国地方のハイキング",
        "hero_sub": "中国山地の最高峰・大山（伯耆富士）をはじめ、山陰・山陽の個性豊かな山々。混雑が少なく、静かなハイキングを楽しめる隠れたエリアです。",
        "breadcrumb": '<li><a href="../../index.html">ホーム</a></li><li>中国地方のハイキング</li>',
        "css": "../../css/style.css",
        "info_title": "中国地方ハイキングの特徴",
        "info_text": "比較的人が少なく静かな山行が楽しめる。ブナの原生林が美しい大山系、火山地形の三瓶山など多彩な自然環境。山陰・山陽の気候差も楽しむことができる。",
        "cards": [
            make_card("🏔️","大山（鳥取）","中国","medium","中級","標高1,729m・距離6km・所要4時間","中国地方最高峰・伯耆富士。ブナ林が美しい百名山。","#"),
            make_card("🌸","吾妻山（広島）","中国","easy","初級","標高1,238m・距離6km・所要3時間","水仙・リンドウが咲く高原。360度の眺望が魅力。","#"),
            make_card("🌋","三瓶山（島根）","中国","easy","初級","標高1,126m・距離8km・所要4時間","火山がつくる草原と湿原。国立公園の隠れた名峰。","#"),
            make_card("❄️","恐羅漢山（広島）","中国","medium","中級","標高1,346m・距離8km・所要4時間","中国地方第二の高峰。ブナ原生林が広がる山。","#"),
            make_card("🌿","道後山（広島・鳥取）","中国","easy","初級","標高1,271m・距離5km・所要2.5時間","のびやかな草原が広がる高原の山。","#"),
            make_card("⛩️","比婆山（広島）","中国","easy","初級","標高1,264m・距離7km・所要3.5時間","イザナミを祀る古代の聖地。スキー場も隣接する霊山。","#"),
        ]
    },
    {
        "path": "regions/tohoku/index.html", "depth": 2,
        "canonical": "regions/tohoku/",
        "title": "東北のハイキング",
        "desc": "東北のおすすめハイキングコース一覧。蔵王山・八甲田山・安達太良山など東北の名山を紹介。",
        "hero_emoji": "🌄", "hero_title": "東北のハイキング",
        "hero_sub": "樹氷の蔵王、紅葉の八甲田、「智恵子の空」安達太良山。東北の山は四季折々に圧倒的な自然美を見せてくれます。",
        "breadcrumb": '<li><a href="../../index.html">ホーム</a></li><li>東北のハイキング</li>',
        "css": "../../css/style.css",
        "info_title": "東北ハイキングの特徴",
        "info_text": "豊富な積雪による豊かな水源と植生。蔵王の樹氷・八甲田の紅葉・安達太良の空など文学や芸術にも影響を与えた山が多い。梅雨が少なく6〜10月が快適なシーズン。",
        "cards": [
            make_card("❄️","蔵王山（宮城・山形）","東北","easy","初級","標高1,841m・距離6km・所要3時間","御釜（エメラルドグリーンの火口湖）と冬の樹氷が有名な東北の名山。","#"),
            make_card("🌿","八甲田山（青森）","東北","medium","中級","標高1,585m・距離8km・所要5時間","田茂萢湿原の絶景と冬のスキーで有名な百名山。","#"),
            make_card("🌄","安達太良山（福島）","東北","easy","初級","標高1,700m・距離8km・所要4時間","高村光太郎ゆかりの山。「ほんとうの空」が待つ福島の百名山。","#"),
            make_card("🌸","秋田駒ヶ岳（秋田）","東北","easy","初級","標高1,637m・距離8km・所要4時間","高山植物の宝庫。コマクサの大群落が見事。","#"),
            make_card("🏔️","岩手山（岩手）","東北","medium","中級","標高2,038m・距離12km・所要8時間","南部片富士の美しい山容。岩手の最高峰・百名山。","#"),
            make_card("🌙","月山（山形）","東北","easy","初級","標高1,984m・距離8km・所要5時間","出羽三山の一つ。夏スキーと残雪ハイクで有名な霊山。","#"),
        ]
    },
]

count = 0
for r in regions:
    cards_html = "\n".join(r["cards"])
    html = build_page(
        r["canonical"], r["title"], r["desc"],
        r["hero_emoji"], r["hero_title"], r["hero_sub"],
        r["breadcrumb"], cards_html,
        r["info_title"], r["info_text"],
        r["css"], r["depth"]
    )
    fp = os.path.join(BASE, r["path"].replace("/", os.sep))
    with open(fp, "w", encoding="utf-8") as f:
        f.write(html)
    count += 1
    print(f"OK: {r['path']}")

print(f"\n{count} pages created.")
