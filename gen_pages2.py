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

def hdr(depth):
    up = "../" * depth
    return f"""  <header class="site-header">
    <div class="container header-inner">
      <div class="logo"><a href="{up}index.html"><span class="logo-icon">⛰️</span><span class="logo-text">にっぽんハイキングガイド</span></a></div>
      <nav class="global-nav"><ul>
        <li><a href="{up}index.html#regions">地域から探す</a></li>
        <li><a href="{up}index.html#difficulty">難易度から探す</a></li>
        <li><a href="{up}index.html#season">季節から探す</a></li>
        <li><a href="{up}gear/index.html" class="nav-gear">装備ガイド</a></li>
      </ul></nav>
      <button class="nav-toggle" aria-label="メニュー">&#9776;</button>
    </div>
  </header>"""

def ftr(depth):
    up = "../" * depth
    return f"""  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-logo"><span>⛰️</span> にっぽんハイキングガイド</div>
      <nav class="footer-nav"><ul>
        <li><a href="{up}about.html">このサイトについて</a></li>
        <li><a href="{up}privacy.html">プライバシーポリシー</a></li>
        <li><a href="{up}contact.html">お問い合わせ</a></li>
        <li><a href="{up}sitemap.html">サイトマップ</a></li>
      </ul></nav>
      <p class="footer-copy">&copy; 2026 にっぽんハイキングガイド. All rights reserved.</p>
    </div>
  </footer>
  <script src="{up}js/main.js"></script>"""

COMMON_STYLE = """  <style>
    .page-hero{padding:60px 20px;text-align:center;color:white;}
    .page-hero h1{font-size:2.2rem;margin-bottom:12px;}
    .page-hero p{font-size:1.05rem;opacity:.92;max-width:620px;margin:0 auto;}
    .content-wrap{max-width:900px;margin:0 auto;padding:40px 20px;}
    .section-h2{font-size:1.6rem;font-weight:700;color:#1b4332;margin:48px 0 12px;border-bottom:3px solid #2d6a4f;padding-bottom:8px;}
    .course-list{display:grid;gap:20px;margin:24px 0;}
    .course-item{background:white;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,.07);padding:24px;display:flex;gap:20px;align-items:flex-start;}
    .ci-emoji{font-size:2.5rem;flex-shrink:0;}
    .ci-body{}
    .ci-title{font-size:1.15rem;font-weight:700;color:#1b4332;margin-bottom:4px;}
    .ci-meta{font-size:.82rem;color:#666;margin-bottom:8px;}
    .ci-desc{font-size:.9rem;color:#444;line-height:1.7;margin-bottom:10px;}
    .ci-link{display:inline-block;background:#2d6a4f;color:white;padding:7px 18px;border-radius:6px;font-size:.85rem;font-weight:700;text-decoration:none;}
    .ci-link:hover{background:#1b4332;}
    .diff-badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:.75rem;font-weight:700;margin-right:6px;}
    .diff-easy{background:#d8f3dc;color:#1b4332;}
    .diff-medium{background:#fff3cd;color:#856404;}
    .diff-hard{background:#fde8e8;color:#9b1c1c;}
    .info-box{background:#e8f4ea;border-left:4px solid #2d6a4f;border-radius:0 8px 8px 0;padding:16px 20px;margin:24px 0;}
    .tips-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin:24px 0;}
    .tip-card{background:white;border-radius:10px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.07);}
    .tip-card.caution{border-top:3px solid #e63946;}
    .tip-card.info{border-top:3px solid #2d6a4f;}
    .tip-card.tip{border-top:3px solid #f77f00;}
    .tip-icon{font-size:1.5rem;margin-bottom:8px;}
    .tip-card h3{font-size:1rem;font-weight:700;color:#1b4332;margin-bottom:6px;}
    .tip-card p{font-size:.88rem;color:#444;line-height:1.6;}
    .gear-btn{display:inline-block;background:#f77f00;color:white;padding:14px 32px;border-radius:8px;font-weight:700;text-decoration:none;margin-top:16px;}
    .gear-btn:hover{background:#e06c00;}
    .article-body{font-size:.95rem;color:#333;line-height:1.9;}
    .article-body h2{font-size:1.5rem;font-weight:700;color:#1b4332;margin:40px 0 12px;border-bottom:2px solid #d8f3dc;padding-bottom:6px;}
    .article-body h3{font-size:1.15rem;font-weight:700;color:#2d6a4f;margin:28px 0 8px;}
    .article-body p{margin-bottom:16px;}
    .article-body ul{margin:8px 0 16px 20px;}
    .article-body li{margin-bottom:6px;}
    .article-meta{font-size:.82rem;color:#888;margin-bottom:32px;}
    .alert{background:#fff3cd;border-left:4px solid #f77f00;border-radius:0 8px 8px 0;padding:14px 18px;margin:20px 0;font-size:.9rem;}
    .alert-danger{background:#fde8e8;border-left:4px solid #e63946;}
  </style>"""

def write(path, content):
    fp = os.path.join(BASE, path.replace("/", os.sep))
    with open(fp, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {path}")

# ===== 難易度ページ =====

def diff_page(filename, depth, canonical, title, desc, hero_bg, hero_title, hero_sub, breadcrumb, courses_html, tips_html):
    url = f"https://tomohiro-tsunosaki.github.io/nippon-hiking-guide/{canonical}"
    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
{GA}
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc}">
  <meta property="og:title" content="{title} | にっぽんハイキングガイド">
  <meta property="og:description" content="{desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{url}">
  <meta property="og:site_name" content="にっぽんハイキングガイド">
  <meta property="og:locale" content="ja_JP">
  <meta name="twitter:card" content="summary">
  <title>{title} | にっぽんハイキングガイド</title>
  <link rel="stylesheet" href="{'../' * depth}css/style.css">
  <link rel="canonical" href="{url}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
{COMMON_STYLE}
</head>
<body>
{hdr(depth)}
  <nav class="breadcrumb"><div class="container"><ol>{breadcrumb}</ol></div></nav>
  <div class="page-hero" style="background:{hero_bg};">
    <h1>{hero_title}</h1>
    <p>{hero_sub}</p>
  </div>
  <main>
    <div class="content-wrap">
      <h2 class="section-h2">おすすめコース一覧</h2>
      <div class="course-list">
{courses_html}
      </div>
      <h2 class="section-h2">登山のコツとアドバイス</h2>
      <div class="tips-grid">
{tips_html}
      </div>
      <div style="text-align:center;margin:48px 0;">
        <p style="font-size:1rem;color:#444;margin-bottom:8px;">装備選びに迷ったら</p>
        <a href="{'../' * depth}gear/index.html" class="gear-btn">初心者向け装備ガイドを見る →</a>
      </div>
    </div>
  </main>
{ftr(depth)}
</body>
</html>"""

def ci(emoji, title, region, diff_cls, diff_label, meta, desc, link):
    return f"""        <div class="course-item">
          <div class="ci-emoji">{emoji}</div>
          <div class="ci-body">
            <div class="ci-title">{title} <span class="diff-badge {diff_cls}">{diff_label}</span></div>
            <div class="ci-meta">{region} | {meta}</div>
            <p class="ci-desc">{desc}</p>
            <a href="{link}" class="ci-link">詳しく見る →</a>
          </div>
        </div>"""

def tip(icon, title, text, kind="info"):
    return f"""        <div class="tip-card {kind}">
          <div class="tip-icon">{icon}</div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>"""

# 初心者ページ
beginner_courses = "\n".join([
    ci("🏔️","高尾山（東京）","関東","diff-easy","初級","標高599m・距離3.8km・所要2時間","都心から50分の定番ハイキング山。舗装路の1号路ならスニーカーでOK。ケーブルカー・リフト利用可。","../regions/kanto/takao.html"),
    ci("🏔️","上高地（長野）","中部","diff-easy","初級","標高1,500m・距離10km・所要4時間","穂高連峰を望む高原リゾート。起伏がほぼなく、散歩感覚で歩ける絶景コース。","../regions/chubu/kamikochi.html"),
    ci("🌸","霧ヶ峰（長野）","中部","diff-easy","初級","標高1,925m・距離10km・所要4時間","なだらかな高原で高山植物が豊富。車山山頂へはリフトで楽々アクセス可。","../regions/chubu/kirigamine.html"),
    ci("🌸","吉野山（奈良）","近畿","diff-easy","初級","標高858m・距離8km・所要4時間","3万本の桜が咲く世界遺産。参道を歩きながら歴史と自然を同時に楽しめる。","../regions/kinki/yoshino.html"),
    ci("🐻","知床五湖（北海道）","北海道","diff-easy","初級","距離3km・所要45分","高架木道なら45分で世界遺産の絶景を体験。電動柵で安全に歩ける。","../regions/hokkaido/shiretoko.html"),
    ci("🌋","草千里ケ浜（熊本）","九州","diff-easy","初級","距離3km・所要1時間","阿蘇山のカルデラ内の広大な草原。馬の放牧が見られる絶景スポット。","../regions/kyushu/aso.html"),
])
beginner_tips = "\n".join([
    tip("👟","まずは低山から","高尾山・筑波山など標高500m前後の山から始めましょう。体力を測りながら徐々にステップアップ。","info"),
    tip("🥾","靴だけはケチらない","スニーカーでも登れる山はあるが、登山靴を揃えると疲れにくく滑りにくい。最初の一足を大切に。","tip"),
    tip("💧","水は多めに持参","500mlでは不足することも。1L以上を持参し、売店がない山では特に注意。","info"),
    tip("⏰","早朝スタートが基本","天気が崩れやすい午後を避けるため、遅くとも8時には出発を。","tip"),
    tip("📱","登山アプリを入れよう","YAMAPまたはヤマレコをインストール。GPSで現在地を確認でき、道迷いを防げる。","info"),
    tip("⚠️","単独行は避ける","初心者のうちは必ず複数人で行動を。万が一のトラブル時に助け合えます。","caution"),
])
write("difficulty/beginner.html", diff_page(
    "difficulty/beginner.html", 1, "difficulty/beginner.html",
    "初心者向けハイキングコース",
    "ハイキング初心者におすすめのコース一覧。整備された登山道・短い距離・安全なルートを厳選して紹介。",
    "linear-gradient(135deg,#52b788 0%,#2d6a4f 100%)",
    "🟢 初心者向けコース一覧",
    "体力に自信がなくても大丈夫。整備された道・ケーブルカー・リフトが使える入門コースを厳選しました。",
    '<li><a href="../index.html">ホーム</a></li><li>初心者向けコース</li>',
    beginner_courses, beginner_tips
))

# 中級ページ
intermediate_courses = "\n".join([
    ci("🗻","富士山（静岡・山梨）","中部","diff-medium","中級","標高3,776m・距離12km・所要9時間","日本最高峰への挑戦。7〜9月の開山期間のみ。入山料・弾丸登山禁止等の規制を事前確認。","../regions/chubu/fuji.html"),
    ci("🌿","屋久島・縄文杉（鹿児島）","九州","diff-medium","中級","標高1,936m・距離22km・所要10時間","世界遺産の原生林を10時間歩く。体力と装備が問われる本格的な日帰り縦走。","../regions/kyushu/yakushima.html"),
    ci("❄️","大雪山・旭岳（北海道）","北海道","diff-medium","中級","標高2,291m・距離8km・所要5時間","北海道最高峰。ロープウェイで1,600mまでアクセス可。急登あり。","../regions/hokkaido/daisetsuzan.html"),
    ci("⛩️","石鎚山（愛媛）","四国","diff-medium","中級〜上級","標高1,982m・距離8km・所要5時間","西日本最高峰。鎖場あり。鎖場は迂回路もあり、中級者から挑戦可。","../regions/shikoku/ishizuchi.html"),
    ci("🏔️","丹沢山（神奈川）","関東","diff-medium","中級","標高1,567m・距離16km・所要7時間","神奈川最高峰への縦走。日本百名山。富士山・南アルプスを望む大展望。","#"),
    ci("🌋","阿蘇山・高岳（熊本）","九州","diff-medium","中級","標高1,592m・距離6km・所要3〜4時間","阿蘇最高峰への本格登山。火山規制状況を事前に確認してから出発。","../regions/kyushu/aso.html"),
])
intermediate_tips = "\n".join([
    tip("🎒","30Lのザックで快適に","中級コースは行動時間が長い。30L前後のザックにレインウェア・非常食・ファーストエイドを。","info"),
    tip("🥾","登山靴は防水タイプを","6〜7時間以上の行動では足への負担が大きい。ゴアテックス等の防水登山靴が必須。","tip"),
    tip("⚠️","体力の過信に注意","「初心者コースを完歩できた」と中級に挑む前に、徐々に距離・標高差を増やして体力を積み上げて。","caution"),
    tip("🌦️","天気予報を3日前から","中級以上では悪天候が危険度を大幅に上げる。登山専用天気サービス（Yamma等）を確認。","caution"),
    tip("📋","登山計画書を提出","中級以上の山では登山計画書の提出が重要。コンパス（登山届サービス）がおすすめ。","info"),
    tip("🏃","日ごろのトレーニングを","週1〜2回のウォーキング・階段昇降で基礎体力を維持。筋トレも効果的。","tip"),
])
write("difficulty/intermediate.html", diff_page(
    "difficulty/intermediate.html", 1, "difficulty/intermediate.html",
    "中級ハイキングコース",
    "中級者向けハイキングコース一覧。本格的な標高・距離のコースを厳選。富士山・屋久島など日本の名山に挑戦。",
    "linear-gradient(135deg,#f77f00 0%,#d62828 100%)",
    "🟡 中級者向けコース一覧",
    "体力・装備が問われる本格的なコースです。日本百名山や世界遺産の山々へのチャレンジを楽しんでください。",
    '<li><a href="../index.html">ホーム</a></li><li>中級者向けコース</li>',
    intermediate_courses, intermediate_tips
))

# 上級ページ
advanced_courses = "\n".join([
    ci("🏔️","北アルプス縦走（槍〜穂高）","中部","diff-hard","上級","標高3,190m・距離30km以上・所要2〜3泊","日本最高難度の縦走路。岩稜帯・鎖場連続。経験・体力・装備の三拍子が揃った登山者向け。","#"),
    ci("🦅","剱岳（富山）","中部","diff-hard","上級","標高2,999m・距離10km・所要8時間","「岩と雪の殿堂」。カニのよこばいなど難所が続く。命がけの百名山。","#"),
    ci("⛩️","石鎚山・天狗岳（愛媛）","四国","diff-hard","上級","標高1,982m・距離8km・所要5時間","西日本最高峰。三ノ鎖場・天狗岳ナイフリッジは上級者レベルの緊張感。","../regions/shikoku/ishizuchi.html"),
    ci("🐻","羅臼岳（北海道）","北海道","diff-hard","上級","標高1,661m・距離15km・所要9時間","ヒグマが最も多い知床の最高峰。ガイド同行必須。体力・熊対策の両方が必要。","#"),
    ci("🌿","屋久島・宮之浦岳（鹿児島）","九州","diff-hard","上級","標高1,936m・距離26km・所要1泊2日","屋久島最高峰は縦走コース。縄文杉よりさらにハードな本格的な山岳登山。","../regions/kyushu/yakushima.html"),
    ci("🏔️","槍ヶ岳（長野・岐阜）","中部","diff-hard","上級","標高3,180m・距離20km・所要1泊2日","独特の穂先が印象的な日本アルプスの名峰。山頂直下の岩場クライムが難所。","#"),
])
advanced_tips = "\n".join([
    tip("🪖","ヘルメット必携","上級コースでは落石・転倒時の頭部保護が必須。軽量ヘルメットを必ず持参。","caution"),
    tip("🧗","鎖場・岩場の練習を","いきなり本番は危険。近郊の岩場や低山の鎖場で技術を磨いてから挑戦を。","caution"),
    tip("🤝","ガイドの活用を","初めて挑む上級ルートは経験豊富なガイドと同行するのが最も安全。","info"),
    tip("⚠️","引き返す勇気を持つ","天気の悪化・体調不良・時間オーバーを感じたら即下山。山は逃げない。","caution"),
    tip("📡","ビーコン・衛星電話","圏外になる山域ではGPSビーコン・衛星電話・笛の携帯を。","caution"),
    tip("🏋️","体力は事前に鍛える","上級登山の1〜2ヶ月前から週3回以上の有酸素運動・筋トレで準備を。","tip"),
])
write("difficulty/advanced.html", diff_page(
    "difficulty/advanced.html", 1, "difficulty/advanced.html",
    "上級ハイキングコース",
    "上級者向けハイキングコース一覧。岩場・鎖場・縦走など本格的な山岳登山コースを紹介。",
    "linear-gradient(135deg,#1b4332 0%,#081c15 100%)",
    "🔴 上級者向けコース一覧",
    "岩場・鎖場・長距離縦走など、経験と体力が問われる本格的な山岳コースです。十分な準備と装備で挑んでください。",
    '<li><a href="../index.html">ホーム</a></li><li>上級者向けコース</li>',
    advanced_courses, advanced_tips
))

print("難易度3ページ完了")

# ===== 季節ページ =====

def season_page(filename, depth, canonical, title, desc, hero_bg, hero_title, hero_sub, breadcrumb, intro, courses_html, tips_html, gear_link):
    url = f"https://tomohiro-tsunosaki.github.io/nippon-hiking-guide/{canonical}"
    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
{GA}
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc}">
  <meta property="og:title" content="{title} | にっぽんハイキングガイド">
  <meta property="og:description" content="{desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{url}">
  <meta property="og:site_name" content="にっぽんハイキングガイド">
  <meta property="og:locale" content="ja_JP">
  <meta name="twitter:card" content="summary">
  <title>{title} | にっぽんハイキングガイド</title>
  <link rel="stylesheet" href="{'../' * depth}css/style.css">
  <link rel="canonical" href="{url}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
{COMMON_STYLE}
</head>
<body>
{hdr(depth)}
  <nav class="breadcrumb"><div class="container"><ol>{breadcrumb}</ol></div></nav>
  <div class="page-hero" style="background:{hero_bg};">
    <h1>{hero_title}</h1>
    <p>{hero_sub}</p>
  </div>
  <main>
    <div class="content-wrap">
      <div class="info-box">{intro}</div>
      <h2 class="section-h2">この季節のおすすめコース</h2>
      <div class="course-list">
{courses_html}
      </div>
      <h2 class="section-h2">この季節の注意点と準備</h2>
      <div class="tips-grid">
{tips_html}
      </div>
      <div style="text-align:center;margin:48px 0;">
        <p style="font-size:1rem;color:#444;margin-bottom:8px;">この季節の装備ガイド</p>
        <a href="{gear_link}" class="gear-btn">装備ガイドを見る →</a>
      </div>
    </div>
  </main>
{ftr(depth)}
</body>
</html>"""

# 春
spring_courses = "\n".join([
    ci("🌸","吉野山（奈良）","近畿・3月末〜4月上旬","diff-easy","初級","距離8km・所要4時間","3万本の桜が山全体を染める日本一の桜の名所。開花は下から上へ順番に。","../regions/kinki/yoshino.html"),
    ci("🏔️","高尾山（東京）","関東・3月下旬〜4月","diff-easy","初級","距離3.8km・所要2時間","桜・ミズバショウ・スミレなど多彩な春の花。春と秋が最もおすすめのシーズン。","../regions/kanto/takao.html"),
    ci("🏔️","上高地（長野）","中部・5月上旬〜","diff-easy","初級","距離10km・所要4時間","残雪の穂高を背景に新緑が輝く。開山直後の5月上旬は人が少なく快適。","../regions/chubu/kamikochi.html"),
    ci("🌿","屋久島（鹿児島）","九州・4月〜5月","diff-medium","中級","距離22km・所要10時間","新緑のシーズン。苔と杉が鮮やかな緑に包まれ最も美しい季節のひとつ。","../regions/kyushu/yakushima.html"),
    ci("⛩️","石鎚山（愛媛）","四国・5月末〜6月","diff-hard","中級〜上級","距離8km・所要5時間","シャクナゲの群落が満開に。岩峰と花のコントラストが絶景。","../regions/shikoku/ishizuchi.html"),
])
spring_tips = "\n".join([
    tip("🌸","桜の開花情報を確認","標高によって開花時期が1〜2週間ずれる。出発前に現地の開花情報をチェック。","info"),
    tip("🧥","朝晩の冷え込みに注意","春は昼間暖かくても朝晩は冷える。フリース・ウィンドブレーカーを持参。","caution"),
    tip("☔","春雨に備える","春は雨が多い季節。防水性の高いレインウェアは必携。","caution"),
    tip("👟","残雪に注意","標高の高い山では5〜6月でも雪が残る。チェーンスパイクを持参しておくと安心。","caution"),
    tip("📸","朝イチで出発","桜シーズンは混雑が激しい。早朝スタートで人のいない絶景写真を狙おう。","tip"),
    tip("🌼","花を踏まないで","山の花は貴重。登山道を外れず、花の上に立たないようにしましょう。","info"),
])
write("season/spring.html", season_page(
    "season/spring.html", 1, "season/spring.html",
    "春のハイキング", "春のおすすめハイキングコース。桜・山野草が咲く3〜5月の絶景スポットを全国から厳選して紹介。",
    "linear-gradient(135deg,#f9c6d0 0%,#e0629a 100%)",
    "🌸 春のハイキング（3〜5月）",
    "桜・山野草・新緑と、山が最も彩り豊かになる季節。吉野山の桜から上高地の新緑まで、春の絶景を求めて歩こう。",
    '<li><a href="../index.html">ホーム</a></li><li>春のハイキング</li>',
    "春のハイキングのベストシーズンは3月末〜5月。低山では桜・スミレ・ミズバショウ、高山では雪解けの花が一斉に咲き始めます。「花の百名山」など、春ならではの美しさを持つ山は全国各地にあります。",
    spring_courses, spring_tips,
    "../gear/rain.html"
))

# 夏
summer_courses = "\n".join([
    ci("🗻","富士山（静岡・山梨）","中部・7月〜9月初旬","diff-medium","中級","距離12km・所要9時間","開山期間は7月1日〜9月10日。混雑を避けるなら平日・9月がおすすめ。","../regions/chubu/fuji.html"),
    ci("🌼","霧ヶ峰（長野）","中部・7月上旬〜8月","diff-easy","初級","距離10km・所要4時間","ニッコウキスゲの群落が黄色に染まる。涼しく快適な高原ハイキング。","../regions/chubu/kirigamine.html"),
    ci("❄️","大雪山・旭岳（北海道）","北海道・7月〜8月","diff-medium","中級","距離8km・所要5時間","本州が猛暑の中、北海道の山上は15℃前後。コマクサのお花畑が見頃。","../regions/hokkaido/daisetsuzan.html"),
    ci("🏔️","上高地（長野）","中部・7月〜8月","diff-easy","初級","距離10km・所要4時間","標高1,500mは夏でも涼しい。穂高の雄大な姿を見ながら歩く。","../regions/chubu/kamikochi.html"),
    ci("🐻","知床五湖（北海道）","北海道・7月〜8月","diff-easy","初級〜中級","距離3〜8km・所要1〜4時間","地上遊歩道がフル解放。ヒグマの親子に出会える可能性も。","../regions/hokkaido/shiretoko.html"),
])
summer_tips = "\n".join([
    tip("⚡","雷に注意","夏の山は午後から雷が発生しやすい。12時頃には下山開始できるスケジュールを。","caution"),
    tip("☀️","日焼け対策を","高山では紫外線が強い。日焼け止め・帽子・UVカットウェアは必携。","info"),
    tip("🌡️","熱中症対策","1時間ごとにこまめな水分補給を。塩分も一緒に補給すると効果的。","caution"),
    tip("🌅","早朝スタート","夏の山は早出が鉄則。日の出とともに出発すると涼しく、午後の雷も避けられる。","tip"),
    tip("🐝","虫除け対策","夏の低〜中山は虫が多い。虫除けスプレー・長袖で対策を。","info"),
    tip("🧴","高山の日焼けに注意","標高が100m上がると紫外線量が約1%増える。富士山山頂は平地の1.4倍。","caution"),
])
write("season/summer.html", season_page(
    "season/summer.html", 1, "season/summer.html",
    "夏のハイキング", "夏のおすすめハイキングコース。高山植物・富士山開山・涼しい北海道の山など7〜8月の絶景コースを紹介。",
    "linear-gradient(135deg,#48cae4 0%,#0077b6 100%)",
    "☀️ 夏のハイキング（7〜8月）",
    "富士山が開山し、高山植物が咲き乱れる夏山シーズン。北海道・長野の高原では涼しい風の中でハイキングを楽しめます。",
    '<li><a href="../index.html">ホーム</a></li><li>夏のハイキング</li>',
    "夏のハイキングは7月〜8月がハイシーズン。富士山の開山（7月1日）、ニッコウキスゲの最盛期（7月）、大雪山の高山植物（7〜8月）など見どころ満載。ただし熱中症・雷・紫外線への対策が必須です。",
    summer_courses, summer_tips,
    "../gear/wear.html"
))

# 秋
autumn_courses = "\n".join([
    ci("🍁","高尾山（東京）","関東・11月下旬〜12月上旬","diff-easy","初級","距離3.8km・所要2時間","東京都内屈指の紅葉。11月下旬〜12月上旬がピーク。もみじまつり開催。","../regions/kanto/takao.html"),
    ci("❄️","大雪山・旭岳（北海道）","北海道・9月上旬〜","diff-medium","中級","距離8km・所要5時間","日本で最も早い紅葉（9月上旬〜）。ナナカマドの赤とウラシマツツジが絶景。","../regions/hokkaido/daisetsuzan.html"),
    ci("🐻","知床五湖（北海道）","北海道・9月〜10月","diff-easy","初級〜中級","距離3〜8km・所要1〜4時間","湖面に映る紅葉が圧倒的。秋の知床は本島随一の紅葉絶景スポット。","../regions/hokkaido/shiretoko.html"),
    ci("🏔️","上高地（長野）","中部・9月下旬〜10月","diff-easy","初級","距離10km・所要4時間","カラマツの黄葉と穂高の岩峰のコントラストが絶品。閉山（11月中旬）前が狙い目。","../regions/chubu/kamikochi.html"),
    ci("🌋","阿蘇山（熊本）","九州・9月〜11月","diff-easy","初級〜中級","距離6km・所要3時間","ススキの草原が黄金色に輝く秋の阿蘇。外輪山からのカルデラ一望が最高。","../regions/kyushu/aso.html"),
])
autumn_tips = "\n".join([
    tip("🍁","紅葉の見頃は標高次第","低山は11月、高山は9月から紅葉が始まる。標高1,000mごとに約1〜2週間早まる。","info"),
    tip("🌅","日が短くなる","秋は日没が早い。17時前には下山完了を目標にスケジュールを組む。","caution"),
    tip("🧥","防寒具を忘れずに","紅葉シーズンの山は朝晩の冷え込みが激しい。フリース・ダウンは必携。","caution"),
    tip("📅","紅葉情報を事前確認","紅葉は年によって時期が変わる。山岳気象サービス・観光協会HPで確認を。","info"),
    tip("🚗","混雑に備える","秋の紅葉シーズンはどの山も大混雑。駐車場・シャトルバスの情報を事前確認。","tip"),
    tip("🌧️","秋雨に注意","秋は雨の多い季節。防水レインウェアは必ず持参。","caution"),
])
write("season/autumn.html", season_page(
    "season/autumn.html", 1, "season/autumn.html",
    "秋のハイキング", "秋のおすすめハイキングコース。紅葉が美しい9〜11月の絶景スポットを全国から厳選して紹介。",
    "linear-gradient(135deg,#e9c46a 0%,#d62828 100%)",
    "🍁 秋のハイキング（9〜11月）",
    "山が最も美しく染まる紅葉の季節。大雪山の早い紅葉（9月）から高尾山のもみじ（11月末）まで、全国の秋色ハイキングへ。",
    '<li><a href="../index.html">ホーム</a></li><li>秋のハイキング</li>',
    "秋のハイキングは9月〜11月が旬。北海道の紅葉は9月から始まり、本州の低山では11〜12月初旬まで楽しめます。ただし日の入りが早くなるため、計画は余裕を持って。",
    autumn_courses, autumn_tips,
    "../gear/rain.html"
))

# 冬
winter_courses = "\n".join([
    ci("🏔️","高尾山（東京）","関東・12月〜2月","diff-easy","初級","距離3.8km・所要2時間","空気が澄んで富士山が最もよく見える季節。積雪がなければスニーカーでも登れる。","../regions/kanto/takao.html"),
    ci("❄️","蔵王山（宮城・山形）","東北・1月〜3月","diff-easy","初級（樹氷観賞）","ロープウェイ利用","蔵王の「樹氷（スノーモンスター）」は1月〜3月が見頃。ロープウェイで観賞可。","#"),
    ci("🌸","吉野山（奈良）","近畿・1月〜2月","diff-easy","初級","距離8km・所要4時間","雪化粧した桜の木が幻想的。観光客が少なく静かに歩ける穴場シーズン。","../regions/kinki/yoshino.html"),
    ci("🏔️","六甲山（兵庫）","近畿・12月〜2月","diff-easy","初級","距離7km・所要3.5時間","雪の六甲山と神戸の夜景の組み合わせが絶景。稜線は積雪に注意。","#"),
])
winter_tips = "\n".join([
    tip("🧥","防寒・防風が最重要","冬山では体温管理が命に関わる。防風・保温性の高いレイヤリングを徹底。","caution"),
    tip("⚠️","アイゼン・チェーンスパイクを","積雪・凍結した登山道は非常に滑りやすい。軽アイゼンを必ず携行。","caution"),
    tip("🌅","日照時間が短い","冬は16時前後に日没する。余裕を持って14時には下山開始を。","caution"),
    tip("📺","天気予報を入念に","冬山の悪天候は危険度が一気に上がる。前日・当日朝の天気予報を確認してから出発。","caution"),
    tip("💧","水分補給を忘れずに","寒いと喉が渇きにくいが脱水は起こる。こまめに水分を補給しよう。","info"),
    tip("🥶","低体温症に注意","濡れた状態で風に当たると低体温症のリスクが高まる。ウェアは速乾性のものを。","caution"),
])
write("season/winter.html", season_page(
    "season/winter.html", 1, "season/winter.html",
    "冬のハイキング", "冬のおすすめハイキングコース。雪景色・樹氷・澄んだ空気が楽しめる12〜2月のコースを紹介。",
    "linear-gradient(135deg,#a8dadc 0%,#1d3557 100%)",
    "❄️ 冬のハイキング（12〜2月）",
    "澄んだ空気と雪景色が魅力の冬山。防寒・安全対策をしっかり準備すれば、他のシーズンにはない絶景が待っています。",
    '<li><a href="../index.html">ホーム</a></li><li>冬のハイキング</li>',
    "冬のハイキングは防寒・安全対策が最重要です。雪のない低山（高尾山など）は初心者でも楽しめます。積雪地では必ずアイゼン・スパイクを。冬山は経験者と同行するのがベストです。",
    winter_courses, winter_tips,
    "../gear/safety.html"
))

print("季節4ページ完了")

# ===== ブログページ =====

def blog_page(filename, depth, canonical, title, desc, hero_bg, breadcrumb, published, article_body):
    url = f"https://tomohiro-tsunosaki.github.io/nippon-hiking-guide/{canonical}"
    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
{GA}
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc}">
  <meta property="og:title" content="{title} | にっぽんハイキングガイド">
  <meta property="og:description" content="{desc}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{url}">
  <meta property="og:site_name" content="にっぽんハイキングガイド">
  <meta property="og:locale" content="ja_JP">
  <meta name="twitter:card" content="summary">
  <title>{title} | にっぽんハイキングガイド</title>
  <link rel="stylesheet" href="{'../' * depth}css/style.css">
  <link rel="canonical" href="{url}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {{"@context":"https://schema.org","@type":"Article","headline":"{title}","description":"{desc}","author":{{"@type":"Organization","name":"にっぽんハイキングガイド"}},"datePublished":"{published}","url":"{url}"}}
  </script>
{COMMON_STYLE}
</head>
<body>
{hdr(depth)}
  <nav class="breadcrumb"><div class="container"><ol>{breadcrumb}</ol></div></nav>
  <div class="page-hero" style="background:{hero_bg};padding:50px 20px;">
    <h1 style="font-size:1.8rem;max-width:700px;margin:0 auto;">{title}</h1>
  </div>
  <main>
    <div class="content-wrap">
      <p class="article-meta">公開日: {published} | にっぽんハイキングガイド編集部</p>
      <div class="article-body">
{article_body}
      </div>
      <div style="text-align:center;margin:48px 0;">
        <a href="{'../' * depth}gear/index.html" class="gear-btn">装備ガイドを見る →</a>
      </div>
    </div>
  </main>
{ftr(depth)}
</body>
</html>"""

# fuji-2026.html
fuji_body = """        <p>富士山は毎年7月〜9月に開山し、世界中から多くの登山者が訪れます。2026年シーズンも入山規制・通行料・混雑対策が実施されます。登山前に必ず最新情報を確認してください。</p>

        <h2>2026年シーズンの基本情報</h2>
        <div class="alert">
          <strong>⚠️ 重要:</strong> 弾丸登山（夜間〜早朝にかけた連続登山）は禁止されています。山小屋での休息を挟むプランを立てましょう。
        </div>
        <ul>
          <li><strong>開山期間：</strong> 2026年7月1日（水）〜9月10日（木）予定</li>
          <li><strong>通行料（保全協力金）：</strong> 各登山口で1人2,000円（義務化）</li>
          <li><strong>通行規制：</strong> 吉田ルートは16:00〜翌日3:00まで登山道ゲートを閉鎖</li>
          <li><strong>1日あたりの登山者数上限：</strong> 吉田ルート約4,000人（上限超過時は入山規制）</li>
        </ul>

        <h2>4つの登山ルートを比較</h2>
        <h3>吉田ルート（山梨県・最も人気）</h3>
        <p>五合目（2,305m）から山頂（3,776m）まで。距離約14km・所要9〜10時間。登山者の約6割がこのルートを選ぶ。山小屋・トイレが充実。山梨県側から富士スバルライン五合目へバスでアクセス可。</p>

        <h3>須走ルート（静岡県・穴場）</h3>
        <p>五合目（2,000m）から。距離約15km・所要10〜11時間。下山道の「砂走り」が有名。混雑が吉田ルートより少なく、比較的静かに登れる。</p>

        <h3>御殿場ルート（静岡県・本格派）</h3>
        <p>新五合目（1,440m）から。距離約17km・所要11〜12時間。標高差が最大のため体力が必要。砂走りが最も長く下山が楽しい。</p>

        <h3>富士宮ルート（静岡県・最短距離）</h3>
        <p>五合目（2,380m）から。距離約9km・所要8〜9時間。最短で山頂に到達できる。急登が続くため、登りはきつい。</p>

        <h2>混雑状況と対策</h2>
        <p>富士山の混雑は年々深刻化しています。特に吉田ルートの混雑は顕著で、7月第3〜4週、お盆期間（8月10〜15日前後）は山小屋が満室になることも。</p>
        <ul>
          <li><strong>空いている時期：</strong> 7月上旬（開山直後）・9月上旬（閉山近く）</li>
          <li><strong>空いている曜日：</strong> 平日（火・水・木曜日）</li>
          <li><strong>出発タイミング：</strong> 五合目を午前中（8〜10時）に出発→山小屋泊→翌朝ご来光→下山</li>
        </ul>

        <h2>必要な装備チェックリスト</h2>
        <ul>
          <li>✅ 登山靴（防水・ハイカット）</li>
          <li>✅ 防寒具（ダウン・フリース：山頂は0〜5℃）</li>
          <li>✅ レインウェア（上下セパレート）</li>
          <li>✅ ヘッドライト（予備電池付き）</li>
          <li>✅ 高山病対策（ゆっくり登る・水分補給）</li>
          <li>✅ トレッキングポール</li>
          <li>✅ 行動食・水（1.5L以上）</li>
        </ul>

        <h2>高山病対策</h2>
        <p>富士山は標高が高く、高山病が最も起こりやすい山のひとつです。3,000m以上では空気中の酸素濃度が平地の約70%になります。</p>
        <ul>
          <li>ゆっくりしたペースで登る（1時間に300m以上登らない）</li>
          <li>こまめな水分補給（500ml/時間が目安）</li>
          <li>七合目〜八合目の山小屋で1〜2時間の休憩を取る</li>
          <li>症状（頭痛・吐き気・めまい）が出たら無理せず下山</li>
        </ul>
        <p>詳しくは<a href="../gear/altitude.html">高山病対策ガイド</a>もご覧ください。</p>"""

write("blog/fuji-2026.html", blog_page(
    "blog/fuji-2026.html", 1, "blog/fuji-2026.html",
    "富士山2026年最新情報｜入山料・通行規制・混雑対策を解説",
    "富士山2026年シーズンの最新情報。入山料2,000円・弾丸登山禁止・4ルート比較・混雑対策をわかりやすく解説。",
    "linear-gradient(135deg,#0077b6 0%,#1b4332 100%)",
    '<li><a href="../index.html">ホーム</a></li><li>ブログ</li><li>富士山2026年最新情報</li>',
    "2026-04-26", fuji_body
))

# beginner-gear.html
gear_body = """        <p>「初めてのハイキングに何を揃えればいい？」という疑問に答えます。全部を一度に揃える必要はありません。まずは「最低限必要なもの」から始めましょう。</p>

        <h2>1. 登山靴 — 最も大切な投資</h2>
        <p>登山靴はハイキング装備の中で最も重要なアイテムです。スニーカーでも低山は登れますが、足首のサポートがないため捻挫しやすく、濡れると滑りやすい。</p>
        <h3>初心者に選ぶべき登山靴</h3>
        <ul>
          <li><strong>ミドルカット防水モデル：</strong> 足首をサポートし、雨・水たまりでも安心。コロンビア・キャラバン・メレルが人気。</li>
          <li><strong>価格の目安：</strong> 初めの1足は8,000〜15,000円のモデルで十分。</li>
          <li><strong>必ず試着：</strong> ネット通販より登山専門店での試着購入がベスト。</li>
        </ul>
        <p>→ <a href="../gear/shoes.html">おすすめ登山靴ガイドを見る</a></p>

        <h2>2. ザック（リュックサック）— 容量は用途で選ぶ</h2>
        <p>日帰りハイキングには20〜30Lのザックが最適です。大きすぎると重く、小さすぎると荷物が入らない。</p>
        <ul>
          <li><strong>20L：</strong> 軽量・コンパクト。高尾山・上高地などの整備された道に最適。</li>
          <li><strong>25〜30L：</strong> 日帰り全般に対応。富士山・屋久島など長時間の山行に。</li>
        </ul>
        <p>→ <a href="../gear/pack.html">おすすめザックガイドを見る</a></p>

        <h2>3. レインウェア — 命を守る装備</h2>
        <div class="alert alert-danger">
          <strong>⚠️ 注意：</strong> 「晴れ予報だから不要」は間違いです。山の天気は変わりやすく、レインウェアは緊急時の保温具にもなります。必ず携行してください。
        </div>
        <ul>
          <li><strong>ゴアテックス素材：</strong> 防水と透湿を両立。モンベルのストームクルーザーがコスパ最強。</li>
          <li><strong>上下セパレート：</strong> ポンチョより上下に分かれたタイプが機能的。</li>
        </ul>
        <p>→ <a href="../gear/rain.html">おすすめレインウェアガイドを見る</a></p>

        <h2>4. ウェア — レイヤリングが基本</h2>
        <p>登山のウェアは「レイヤリング（重ね着）」が基本。以下の3層で対応します：</p>
        <ul>
          <li><strong>ベースレイヤー（肌着）：</strong> 速乾性の化学繊維素材。綿は乾きにくく危険。</li>
          <li><strong>ミドルレイヤー（保温）：</strong> フリース・ダウン。休憩時の体温低下を防ぐ。</li>
          <li><strong>アウターレイヤー（防風・防水）：</strong> レインウェアが兼用できる。</li>
        </ul>

        <h2>5. その他の必需品</h2>
        <ul>
          <li><strong>ヘッドライト：</strong> 日没後の下山・緊急時に必須。スマホのライトは電池切れリスクあり。</li>
          <li><strong>飲料水：</strong> 1L以上持参。売店がない山では2L以上。</li>
          <li><strong>行動食：</strong> おにぎり・エネルギーバー・ドライフルーツなど。</li>
          <li><strong>救急セット：</strong> 絆創膏・消毒液・痛み止め。</li>
          <li><strong>地図・スマホ：</strong> YAMAPやヤマレコをインストール。オフラインマップを事前DL。</li>
        </ul>

        <h2>まとめ：最初に揃える優先順位</h2>
        <p>全部を一度に揃えなくてOKです。以下の順番で少しずつ揃えていきましょう：</p>
        <ul>
          <li>1位: <strong>登山靴</strong>（足への影響が最大）</li>
          <li>2位: <strong>レインウェア</strong>（安全に直結）</li>
          <li>3位: <strong>ザック（20〜30L）</strong>（快適さに直結）</li>
          <li>4位: <strong>ヘッドライト</strong>（緊急時に必須）</li>
          <li>5位: <strong>速乾ウェア</strong>（快適さが変わる）</li>
        </ul>"""

write("blog/beginner-gear.html", blog_page(
    "blog/beginner-gear.html", 1, "blog/beginner-gear.html",
    "初心者向け登山装備の選び方ガイド｜最初に揃えるべき5つのアイテム",
    "ハイキング初心者が最初に揃えるべき装備を解説。登山靴・ザック・レインウェアの選び方から優先順位まで詳しく紹介。",
    "linear-gradient(135deg,#2d6a4f 0%,#40916c 100%)",
    '<li><a href="../index.html">ホーム</a></li><li>ブログ</li><li>初心者向け装備ガイド</li>',
    "2026-04-20", gear_body
))

# autumn-2026.html
autumn_body = """        <p>2026年の秋、日本各地で紅葉が見頃を迎えます。今年の紅葉前線は例年並みの予想。今から行き先を決めて、絶景ハイキングを楽しみましょう。</p>

        <h2>北海道：日本最早の紅葉（9月上旬〜）</h2>
        <h3>大雪山・旭岳（上川地方）</h3>
        <p>北海道の旭岳では毎年9月上旬から紅葉が始まります。ナナカマドの真っ赤な葉とウラシマツツジの赤紫が、2,000m以上の高山に広がる光景は圧巻です。</p>
        <ul>
          <li>紅葉見頃：9月上旬〜中旬（年によって変動）</li>
          <li>ロープウェイ利用で1,600mまでアクセス可</li>
          <li>姿見の池周回コース（約3km・1.5時間）でも十分楽しめる</li>
        </ul>
        <p>→ <a href="../regions/hokkaido/daisetsuzan.html">大雪山・旭岳ハイキングガイドを見る</a></p>

        <h3>知床五湖（斜里町）</h3>
        <p>世界遺産の知床では9月中旬〜10月上旬に紅葉が見頃に。湖面に映り込む赤・黄・オレンジのコントラストが特に美しい。</p>
        <ul>
          <li>紅葉見頃：9月中旬〜10月上旬</li>
          <li>地上遊歩道5湖コース（約8km・3〜4時間）で全湖を巡れる</li>
        </ul>
        <p>→ <a href="../regions/hokkaido/shiretoko.html">知床ハイキングガイドを見る</a></p>

        <h2>本州：秋の山を楽しむ（10〜11月）</h2>
        <h3>上高地（長野県）</h3>
        <p>上高地の紅葉は9月下旬〜10月中旬。カラマツが一斉に黄金色に染まり、穂高連峰の岩峰とのコントラストが息をのむ美しさ。</p>
        <ul>
          <li>紅葉見頃：9月下旬〜10月中旬</li>
          <li>閉山は11月中旬。紅葉シーズンは早めに予約を</li>
        </ul>
        <p>→ <a href="../regions/chubu/kamikochi.html">上高地ハイキングガイドを見る</a></p>

        <h3>高尾山（東京都）</h3>
        <p>東京からアクセス抜群の高尾山は11月下旬〜12月上旬に紅葉のピークを迎えます。もみじまつりも開催され、週末は大変混雑します。</p>
        <ul>
          <li>紅葉見頃：11月下旬〜12月上旬</li>
          <li>週末はケーブルカーが長蛇の列。早朝7時台の出発を推奨</li>
        </ul>
        <p>→ <a href="../regions/kanto/takao.html">高尾山ハイキングガイドを見る</a></p>

        <h2>2026年秋ハイキングの準備ポイント</h2>
        <ul>
          <li><strong>防寒具は必須：</strong> 紅葉の時期は朝晩が急激に冷える。フリース・ダウンを持参。</li>
          <li><strong>早起きが基本：</strong> 人気スポットは週末に大混雑。6〜7時台の出発で快適に楽しめる。</li>
          <li><strong>天気予報を確認：</strong> 紅葉シーズンは秋雨も多い。登山専用天気サービスで直前まで確認。</li>
          <li><strong>日没が早い：</strong> 10月は17時台に日没。15時には下山を開始するスケジュールで。</li>
        </ul>"""

write("blog/autumn-2026.html", blog_page(
    "blog/autumn-2026.html", 1, "blog/autumn-2026.html",
    "2026年秋の紅葉ハイキングおすすめスポット｜大雪山・知床・上高地・高尾山",
    "2026年秋の紅葉ハイキングおすすめスポット。大雪山・知床・上高地・高尾山など全国の紅葉名山と見頃時期を解説。",
    "linear-gradient(135deg,#e9c46a 0%,#d62828 100%)",
    '<li><a href="../index.html">ホーム</a></li><li>ブログ</li><li>2026年秋の紅葉ハイキング</li>',
    "2026-04-24", autumn_body
))

print("ブログ3ページ完了")

# ===== 高山病対策ガイド（gear/altitude.html）=====
altitude_body = """        <p>富士山や北アルプスなど、標高2,000mを超える山に登ると「高山病」になる可能性があります。高山病は油断すると命に関わる症状に進展することもあるため、事前の知識と対策が重要です。</p>

        <h2>高山病とは？</h2>
        <p>高山病（急性高山病）は、標高が上がるにつれて空気中の酸素濃度が低くなることで起こる症状の総称です。標高3,000mでは酸素濃度が平地の約70%になります。</p>
        <ul>
          <li><strong>軽症：</strong> 頭痛・吐き気・食欲不振・倦怠感・眠れない</li>
          <li><strong>中症：</strong> 激しい頭痛・嘔吐・ふらつき・歩行困難</li>
          <li><strong>重症：</strong> 高地肺水腫・高地脳浮腫（意識障害・生命の危機）</li>
        </ul>
        <div class="alert alert-danger">
          <strong>⚠️ 重要：</strong> 軽症でも無視して登り続けると急速に悪化することがあります。症状が出たら必ず下山・休息してください。
        </div>

        <h2>高山病になりやすい人</h2>
        <p>高山病は体力・年齢・性別に関係なく誰でもなる可能性があります。以下の条件が重なるとリスクが上がります：</p>
        <ul>
          <li>急激に標高を上げた（例：バスで富士山5合目まで一気に移動）</li>
          <li>睡眠不足・疲れた状態で登山</li>
          <li>脱水状態</li>
          <li>前回も高山病になった経験がある</li>
          <li>過去に問題なかった＝今回も大丈夫とは限らない</li>
        </ul>

        <h2>高山病の予防法</h2>
        <h3>1. ゆっくり登る（最重要）</h3>
        <p>1時間に登る標高差を300m以下に抑えましょう。「ゆっくりゆっくり」が高山病予防の基本中の基本です。富士山では五合目に着いたらすぐ登り始めず、30分〜1時間は現地で体を慣らしてから出発してください。</p>

        <h3>2. 水分をこまめに補給</h3>
        <p>1時間に500ml程度の水分補給を目安に。アルコール・カフェインは利尿作用があるため、登山中は控えるのが賢明です。</p>

        <h3>3. 深呼吸を意識する</h3>
        <p>深呼吸を意識して酸素をしっかり取り込みましょう。歩きながら腹式呼吸を練習するのも効果的です。</p>

        <h3>4. 適切な休息と睡眠</h3>
        <p>山小屋に泊まって体を高度に慣らしてから山頂を目指す「高所順応」が効果的です。富士山では七〜八合目の山小屋宿泊が推奨されています。</p>

        <h3>5. 予防薬（ダイアモックス）</h3>
        <p>アセタゾラミド（商品名：ダイアモックス）は高山病の予防・治療薬として医師が処方できます。登山2日前から服用すると効果的。副作用（手足のしびれ・頻尿など）があるため、必ず医師に相談してから。</p>

        <h2>高山病の対処法</h2>
        <p>以下の症状が出た場合の対処法です：</p>
        <ul>
          <li><strong>頭痛・吐き気：</strong> まず休息。水分補給。症状が続く・悪化するなら下山。</li>
          <li><strong>市販薬：</strong> イブプロフェン（頭痛に効果的）。アスピリンは避ける。</li>
          <li><strong>下山が最善：</strong> 300〜500m下山するだけで症状が劇的に改善することが多い。</li>
          <li><strong>酸素缶：</strong> 一時的な症状緩和に有効。ただし根本解決にはならない。</li>
        </ul>
        <div class="alert">
          <strong>💡 判断の目安：</strong> 「頭痛薬を飲んで1〜2時間休んでも改善しない」「症状が悪化している」の場合は迷わず下山してください。
        </div>

        <h2>富士山での高山病対策まとめ</h2>
        <ul>
          <li>五合目に着いたら30分以上かけて体を慣らす</li>
          <li>登山ペースは「友人と会話できる速さ」を保つ</li>
          <li>弾丸登山（夜間ノンストップ）は絶対に避ける</li>
          <li>七〜八合目の山小屋に宿泊して順応</li>
          <li>水は1.5L以上持参し、こまめに飲む</li>
          <li>症状が出たら潔く下山の判断を</li>
        </ul>"""

altitude_html = f"""<!DOCTYPE html>
<html lang="ja">
<head>
{GA}
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="高山病の症状・原因・予防法・対処法を徹底解説。富士山・北アルプス登山前に必読の高山病完全ガイド。">
  <meta property="og:title" content="高山病対策ガイド | にっぽんハイキングガイド">
  <meta property="og:description" content="高山病の症状・原因・予防法・対処法を徹底解説。富士山・北アルプス登山前に必読の高山病完全ガイド。">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://tomohiro-tsunosaki.github.io/nippon-hiking-guide/gear/altitude.html">
  <meta property="og:site_name" content="にっぽんハイキングガイド">
  <meta property="og:locale" content="ja_JP">
  <meta name="twitter:card" content="summary">
  <title>高山病対策ガイド｜症状・予防・対処法 | にっぽんハイキングガイド</title>
  <link rel="stylesheet" href="../css/style.css">
  <link rel="canonical" href="https://tomohiro-tsunosaki.github.io/nippon-hiking-guide/gear/altitude.html">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {{"@context":"https://schema.org","@type":"Article","headline":"高山病対策ガイド","description":"高山病の症状・予防・対処法を解説","author":{{"@type":"Organization","name":"にっぽんハイキングガイド"}},"datePublished":"2026-04-26","url":"https://tomohiro-tsunosaki.github.io/nippon-hiking-guide/gear/altitude.html"}}
  </script>
{COMMON_STYLE}
</head>
<body>
{hdr(1)}
  <nav class="breadcrumb"><div class="container"><ol><li><a href="../index.html">ホーム</a></li><li><a href="../gear/index.html">装備ガイド</a></li><li>高山病対策</li></ol></div></nav>
  <div class="page-hero" style="background:linear-gradient(135deg,#023e8a 0%,#0077b6 100%);padding:60px 20px;text-align:center;color:white;">
    <h1 style="font-size:2rem;">🏔️ 高山病対策ガイド</h1>
    <p style="font-size:1.05rem;opacity:.92;max-width:600px;margin:10px auto 0;">富士山・北アルプス登山で知っておくべき高山病の症状・予防・対処法を徹底解説します。</p>
  </div>
  <main>
    <div class="content-wrap">
      <p class="article-meta">監修：にっぽんハイキングガイド編集部 | 更新日: 2026-04-26</p>
      <div class="article-body">
{altitude_body}
      </div>
      <div style="text-align:center;margin:48px 0;">
        <p style="font-size:1rem;color:#444;margin-bottom:8px;">安全な登山のための装備を確認しよう</p>
        <a href="../gear/safety.html" class="gear-btn">安全装備ガイドを見る →</a>
      </div>
    </div>
  </main>
{ftr(1)}
</body>
</html>"""

write("gear/altitude.html", altitude_html)
print("高山病対策ページ完了")
print("\n全ページ作成完了！")
