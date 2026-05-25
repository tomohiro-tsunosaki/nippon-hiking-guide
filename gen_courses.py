# -*- coding: utf-8 -*-
import os

def make_course(filepath, depth, title, title_full, region_label, region_dir, difficulty, difficulty_label,
                location, elevation, distance, time_str, elevation_diff, nearest_station, fee, best_season,
                desc_short, desc_meta, canonical_path,
                overview_h, overview_p1, overview_p2, overview_tip,
                courses_intro, course_rows,
                route_title, route_intro, route_steps,
                season_spring, season_summer, season_autumn, season_winter,
                cal_data,
                access_train, access_car, access_parking,
                tips,
                summary_rows,
                related_links,
                datePublished):
    rel = "../" * depth
    gear_rel = rel + "gear/"
    difficulty_colors = {"easy":"初級","medium":"中級","hard":"上級"}

    def badge_cls(d):
        return d  # easy/medium/hard

    rows_html = ""
    for row in course_rows:
        recommended = ' class="recommended-row"' if row.get("recommended") else ""
        rows_html += f'<tr{recommended}>\n'
        rows_html += f'<td><strong>{row["name"]}</strong>{" ★おすすめ" if row.get("recommended") else ""}</td>\n'
        rows_html += f'<td>{row["distance"]}</td><td>{row["time"]}</td>\n'
        rows_html += f'<td><span class="difficulty {row["diff"]}">{difficulty_colors[row["diff"]]}</span></td>\n'
        rows_html += f'<td>{row["feature"]}</td></tr>\n'

    steps_html = ""
    for i, step in enumerate(route_steps):
        if i > 0:
            steps_html += f'<div class="route-arrow">↓ {step["arrow"]}</div>\n'
        num = "START" if i == 0 else ("GOAL" if i == len(route_steps)-1 else str(i))
        steps_html += f'''<div class="route-step">
  <div class="step-num">{num}</div>
  <div class="step-body">
    <h3>{step["title"]}</h3>
    <p>{step["body"]}</p>
    {"<div class='step-tip'>💡 " + step["tip"] + "</div>" if step.get("tip") else ""}
  </div>
</div>\n'''

    cal_html = ""
    for m, w, s in cal_data:
        cal_html += f'<div class="cal-row"><span class="cal-month">{m}月</span><div class="cal-bar" style="width:{w}%"></div><span class="cal-score">{s}</span></div>\n'

    tips_html = ""
    for tip in tips:
        tips_html += f'''<div class="tip-card {tip["cls"]}">
  <span class="tip-icon">{tip["icon"]}</span>
  <div><h3>{tip["title"]}</h3><p>{tip["body"]}</p></div>
</div>\n'''

    summary_html = ""
    for k, v in summary_rows:
        summary_html += f"<tr><th>{k}</th><td>{v}</td></tr>\n"

    related_html = ""
    for name, href, diff in related_links:
        related_html += f'<li><a href="{href}">{name}</a><span class="difficulty {diff}">{difficulty_colors[diff]}</span></li>\n'

    train_items = "".join(f"<li>{t}</li>" for t in access_train)
    car_items = "".join(f"<li>{c}</li>" for c in access_car)
    park_items = "".join(f"<li>{p}</li>" for p in access_parking)

    html = f'''<!DOCTYPE html>
<html lang="ja">
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6B5X3RYCC0"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-6B5X3RYCC0');
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc_meta}">
  <meta property="og:title" content="{title_full}">
  <meta property="og:description" content="{desc_short}">
  <meta property="og:type" content="article">
  <title>{title_full} | にっぽんハイキングガイド</title>
  <link rel="stylesheet" href="{rel}css/style.css">
  <link rel="stylesheet" href="{rel}css/course.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{title_full}",
    "description": "{desc_short}",
    "author": {{ "@type": "Organization", "name": "にっぽんハイキングガイド" }},
    "datePublished": "{datePublished}"
  }}
  </script>
  <link rel="canonical" href="https://tomohiro-tsunosaki.github.io/nippon-hiking-guide/{canonical_path}">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <div class="logo">
        <a href="{rel}index.html">
          <span class="logo-icon">⛰️</span>
          <span class="logo-text">にっぽんハイキングガイド</span>
        </a>
      </div>
      <nav class="global-nav">
        <ul>
          <li><a href="{rel}index.html#regions">地域から探す</a></li>
          <li><a href="{rel}index.html#difficulty">難易度から探す</a></li>
          <li><a href="{rel}index.html#season">季節から探す</a></li>
          <li><a href="{rel}gear/index.html" class="nav-gear">装備ガイド</a></li>
        </ul>
      </nav>
      <button class="nav-toggle" aria-label="メニュー">&#9776;</button>
    </div>
  </header>

  <nav class="breadcrumb" aria-label="パンくずリスト">
    <div class="container">
      <ol>
        <li><a href="{rel}index.html">ホーム</a></li>
        <li><a href="{rel}index.html#regions">地域</a></li>
        <li><a href="../">{region_label}</a></li>
        <li>{title}</li>
      </ol>
    </div>
  </nav>

  <section class="course-hero">
    <div class="course-hero-bg">
      <div class="course-hero-placeholder">🏔️</div>
    </div>
    <div class="course-hero-overlay"></div>
    <div class="container course-hero-content">
      <div class="course-badges">
        <span class="badge-region">{region_label}</span>
        <span class="badge-difficulty {difficulty}">{difficulty_label}</span>
      </div>
      <h1 class="course-hero-title">{title}</h1>
      <p class="course-hero-sub">{location} ／ 標高 {elevation}</p>
      <div class="course-hero-stats">
        <div class="stat-item"><span class="stat-icon">📏</span><span class="stat-label">距離</span><span class="stat-val">{distance}</span></div>
        <div class="stat-item"><span class="stat-icon">⏱</span><span class="stat-label">所要時間</span><span class="stat-val">{time_str}</span></div>
        <div class="stat-item"><span class="stat-icon">📈</span><span class="stat-label">標高差</span><span class="stat-val">{elevation_diff}</span></div>
        <div class="stat-item"><span class="stat-icon">🚃</span><span class="stat-label">最寄り駅</span><span class="stat-val">{nearest_station}</span></div>
        <div class="stat-item"><span class="stat-icon">💰</span><span class="stat-label">入山料</span><span class="stat-val">{fee}</span></div>
        <div class="stat-item"><span class="stat-icon">📅</span><span class="stat-label">ベストシーズン</span><span class="stat-val">{best_season}</span></div>
      </div>
    </div>
  </section>

  <div class="course-main container">
    <div class="course-body">

      <nav class="toc">
        <h2 class="toc-title">目次</h2>
        <ol>
          <li><a href="#overview">{title}の概要</a></li>
          <li><a href="#courses">コース一覧</a></li>
          <li><a href="#route">{route_title}</a></li>
          <li><a href="#season">季節情報</a></li>
          <li><a href="#access">アクセス・駐車場</a></li>
          <li><a href="#gear">必要な装備</a></li>
          <li><a href="#stay">周辺の宿泊施設</a></li>
          <li><a href="#tips">注意事項・豆知識</a></li>
        </ol>
      </nav>

      <section id="overview" class="content-section">
        <h2>{overview_h}</h2>
        <p>{overview_p1}</p>
        <p>{overview_p2}</p>
        <div class="info-box">
          <span class="info-box-icon">💡</span>
          <div>{overview_tip}</div>
        </div>
      </section>

      <section id="courses" class="content-section">
        <h2>コース一覧</h2>
        <p>{courses_intro}</p>
        <div class="course-table-wrap">
          <table class="course-table">
            <thead>
              <tr><th>ルート</th><th>距離</th><th>所要時間</th><th>難易度</th><th>特徴</th></tr>
            </thead>
            <tbody>
              {rows_html}
            </tbody>
          </table>
        </div>
      </section>

      <section id="route" class="content-section">
        <h2>{route_title}</h2>
        <p>{route_intro}</p>
        <div class="route-steps">
          {steps_html}
        </div>
      </section>

      <section id="season" class="content-section">
        <h2>季節情報</h2>
        <div class="season-grid">
          <div class="season-info spring">
            <div class="season-header"><span class="season-emoji">🌸</span><div><h3>春（3〜5月）</h3><div class="season-rating">おすすめ度：{season_spring[0]}</div></div></div>
            <p>{season_spring[1]}</p>
          </div>
          <div class="season-info summer">
            <div class="season-header"><span class="season-emoji">☀️</span><div><h3>夏（6〜8月）</h3><div class="season-rating">おすすめ度：{season_summer[0]}</div></div></div>
            <p>{season_summer[1]}</p>
          </div>
          <div class="season-info autumn">
            <div class="season-header"><span class="season-emoji">🍁</span><div><h3>秋（9〜11月）</h3><div class="season-rating">おすすめ度：{season_autumn[0]}</div></div></div>
            <p>{season_autumn[1]}</p>
          </div>
          <div class="season-info winter">
            <div class="season-header"><span class="season-emoji">❄️</span><div><h3>冬（12〜2月）</h3><div class="season-rating">おすすめ度：{season_winter[0]}</div></div></div>
            <p>{season_winter[1]}</p>
          </div>
        </div>
        <div class="season-calendar">
          <h3>月別おすすめ度</h3>
          <div class="calendar-bars">
            {cal_html}
          </div>
        </div>
      </section>

      <section id="access" class="content-section">
        <h2>アクセス・駐車場</h2>
        <div class="access-grid">
          <div class="access-card">
            <h3>🚃 電車でのアクセス</h3>
            <ul class="access-list">{train_items}</ul>
          </div>
          <div class="access-card">
            <h3>🚗 車でのアクセス</h3>
            <ul class="access-list">{car_items}</ul>
            <h4>駐車場情報</h4>
            <ul class="access-list">{park_items}</ul>
          </div>
        </div>
      </section>

      <section id="gear" class="content-section">
        <h2>必要な装備</h2>
        <p>安全・快適に楽しむための基本装備を揃えましょう。</p>
        <div class="gear-categories">
          <div class="gear-category must">
            <h3>必須アイテム</h3>
            <ul class="gear-list">
              <li class="gear-item"><span class="gear-icon">🥾</span><div class="gear-detail"><strong>登山靴</strong><p>しっかりとしたトレッキングシューズ・登山靴が必須。</p><a href="{rel}gear/shoes.html" class="gear-link">おすすめ登山靴を見る →</a></div></li>
              <li class="gear-item"><span class="gear-icon">💧</span><div class="gear-detail"><strong>飲料水（1〜2L）</strong><p>行動時間に応じた水分を持参。夏季は多めに。</p></div></li>
              <li class="gear-item"><span class="gear-icon">🧥</span><div class="gear-detail"><strong>レインウェア</strong><p>山の天気は変わりやすい。必ず携行すること。</p><a href="{rel}gear/rain.html" class="gear-link">おすすめレインウェアを見る →</a></div></li>
              <li class="gear-item"><span class="gear-icon">🩹</span><div class="gear-detail"><strong>応急処置セット</strong><p>絆創膏・消毒液など最低限のファーストエイド。</p></div></li>
            </ul>
          </div>
          <div class="gear-category recommend">
            <h3>あると便利</h3>
            <ul class="gear-list">
              <li class="gear-item"><span class="gear-icon">🎒</span><div class="gear-detail"><strong>ザック（20〜30L）</strong><p>日帰りなら20L、宿泊なら30L以上が目安。</p><a href="{rel}gear/pack.html" class="gear-link">おすすめザックを見る →</a></div></li>
              <li class="gear-item"><span class="gear-icon">🦯</span><div class="gear-detail"><strong>トレッキングポール</strong><p>急な下りで膝への負担を軽減。</p><a href="{rel}gear/pole.html" class="gear-link">おすすめポールを見る →</a></div></li>
              <li class="gear-item"><span class="gear-icon">🗺️</span><div class="gear-detail"><strong>地図・スマホ充電バッテリー</strong><p>YAMAPやヤマレコアプリを活用すると安心。</p></div></li>
              <li class="gear-item"><span class="gear-icon">🍱</span><div class="gear-detail"><strong>昼食・行動食</strong><p>エネルギーバーやおにぎりなど行動食を準備。</p></div></li>
            </ul>
          </div>
        </div>
        <div class="gear-cta">
          <p>初心者向けの装備選びをもっと詳しく知りたい方は</p>
          <a href="{rel}gear/index.html" class="btn-gear-full">初心者向け装備ガイドを見る →</a>
        </div>
      </section>

      <section id="stay" class="content-section">
        <h2>周辺の宿泊施設</h2>
        <p>前泊・後泊でゆっくりと{title}周辺を楽しむのもおすすめです。</p>
        <div class="hotel-grid">
          <div class="hotel-card">
            <div class="hotel-img-placeholder">🏨</div>
            <div class="hotel-info">
              <span class="hotel-type">周辺宿泊施設</span>
              <h3>{title}周辺のホテル・旅館</h3>
              <p>登山拠点として便利な宿泊施設が周辺に充実しています。</p>
              <a href="#" class="btn-hotel" rel="nofollow">宿泊施設を探す（楽天トラベル）→</a>
            </div>
          </div>
          <div class="hotel-card">
            <div class="hotel-img-placeholder">⛺</div>
            <div class="hotel-info">
              <span class="hotel-type">山小屋・キャンプ場</span>
              <h3>周辺の山小屋・キャンプ</h3>
              <p>自然の中に泊まる山小屋やキャンプ場もあります。</p>
              <a href="#" class="btn-hotel" rel="nofollow">山小屋・キャンプを探す →</a>
            </div>
          </div>
        </div>
      </section>

      <section id="tips" class="content-section">
        <h2>注意事項・豆知識</h2>
        <div class="tips-grid">
          {tips_html}
        </div>
      </section>

    </div>

    <aside class="course-sidebar">
      <div class="sidebar-card summary-card">
        <h3>基本情報まとめ</h3>
        <table class="summary-table">
          {summary_html}
        </table>
      </div>
      <div class="sidebar-card ad-placeholder">
        <p class="ad-label">広告</p>
        <div class="ad-space">広告スペース（300×250）</div>
      </div>
      <div class="sidebar-card">
        <h3>{region_label}の人気コース</h3>
        <ul class="related-list">
          {related_html}
        </ul>
      </div>
      <div class="sidebar-card gear-sidebar-cta">
        <h3>{title}に必要な装備</h3>
        <p>安全・快適に登るための装備リストを確認しよう。</p>
        <a href="{rel}gear/index.html" class="btn-sidebar-gear">装備ガイドを見る →</a>
      </div>
    </aside>
  </div>

  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-logo"><span>⛰️</span> にっぽんハイキングガイド</div>
      <nav class="footer-nav">
        <ul>
          <li><a href="{rel}about.html">このサイトについて</a></li>
          <li><a href="{rel}privacy.html">プライバシーポリシー</a></li>
          <li><a href="{rel}contact.html">お問い合わせ</a></li>
          <li><a href="{rel}sitemap.html">サイトマップ</a></li>
        </ul>
      </nav>
      <p class="footer-copy">&copy; 2026 にっぽんハイキングガイド. All rights reserved.</p>
    </div>
  </footer>
  <script src="{rel}js/main.js"></script>
</body>
</html>'''
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"OK: {filepath}")

BASE = "C:/Users/user/hiking-site"

# ===== 1. 上高地 =====
make_course(
    filepath=f"{BASE}/regions/chubu/kamikochi.html",
    depth=2, title="上高地", title_full="上高地ハイキングガイド｜日本屈指の山岳リゾートを歩く",
    region_label="中部・長野", region_dir="chubu",
    difficulty="easy", difficulty_label="初級〜中級",
    location="長野県松本市", elevation="1,500m", distance="約10km",
    time_str="約4〜5時間", elevation_diff="約100m", nearest_station="上高地バスターミナル",
    fee="無料", best_season="春・夏・秋",
    desc_short="河童橋から明神池まで、日本屈指の山岳リゾート・上高地を徹底ガイド。",
    desc_meta="上高地ハイキングの見どころ・コース・アクセスを詳しく解説。河童橋から明神池まで長野県の絶景ハイキングを紹介。",
    canonical_path="regions/chubu/kamikochi.html",
    overview_h="上高地の概要",
    overview_p1="上高地（かみこうち）は長野県松本市にある標高約1,500mの山岳リゾートです。穂高連峰と焼岳に囲まれた梓川沿いの平地は、四季折々の絶景が広がります。国の特別名勝・天然記念物に指定されており、<strong>マイカー規制</strong>のためバスまたはタクシーでのみアクセス可能です。",
    overview_p2="象徴的な<strong>河童橋</strong>から眺める穂高連峰の景色は日本を代表する絶景のひとつ。標高差がほとんどなく、遊歩道が整備されているため、普通のウォーキングシューズでも歩ける区間が多いのが特徴です。",
    overview_tip="<strong>シャトルバスで行く別天地：</strong>マイカーは沢渡（さわんど）駐車場に停めてバスで入山。5月〜11月が開山期間です。",
    courses_intro="上高地は平坦な遊歩道が中心で、体力に合わせてコースを選べます。",
    course_rows=[
        {"name":"河童橋〜明神池", "distance":"約5km", "time":"約2時間", "diff":"easy", "feature":"最も人気のルート。整備された遊歩道。初心者向け", "recommended":True},
        {"name":"河童橋〜大正池", "distance":"約3km", "time":"約1.5時間", "diff":"easy", "feature":"焼岳と穂高を望む絶景コース"},
        {"name":"明神池〜徳沢", "distance":"約3km（片道）", "time":"約1.5時間", "diff":"easy", "feature":"森林浴が楽しめる静かなルート"},
        {"name":"徳沢〜横尾〜涸沢", "distance":"約16km", "time":"約7時間", "diff":"medium", "feature":"本格登山コース。涸沢カールの紅葉は絶品"},
    ],
    route_title="おすすめルート：河童橋〜明神池",
    route_intro="上高地の定番コース。梓川に沿って歩く平坦なルートで、穂高連峰の絶景を楽しみながら歩けます。",
    route_steps=[
        {"title":"上高地バスターミナル（標高1,504m）", "body":"シャトルバス・タクシーの発着点。インフォメーションセンター、売店あり。", "arrow":""},
        {"title":"河童橋", "body":"上高地の象徴。穂高連峰と焼岳を背景にした景色は日本一とも言われる絶景。写真撮影に最適。", "arrow":"徒歩5分", "tip":"早朝の人が少ない時間帯に来ると幻想的な景色が楽しめます"},
        {"title":"岳沢湿原", "body":"梓川沿いに広がる湿原。カモやサギなど野鳥の宝庫。ニリンソウの群生地としても有名。", "arrow":"徒歩30分"},
        {"title":"明神橋・明神池", "body":"穂高神社嶋宮の境内にある神秘的な池。拝観料500円。隣接する明神館で休憩可能。", "arrow":"徒歩45分"},
    ],
    season_spring=("★★★★★", "5月上旬の開山と同時に訪問できる。ニリンソウの群生と残雪の穂高が美しい。ゴールデンウィークは混雑するので平日推奨。"),
    season_summer=("★★★★☆", "緑が鮮やかで涼しく快適。7〜8月は登山者が多い。早朝の梓川に朝霧が漂う幻想的な景色が見られる。"),
    season_autumn=("★★★★★", "9月下旬〜10月中旬が涸沢の紅葉シーズン。上高地の木々も色づく。透明な空気と錦秋の景色は格別。"),
    season_winter=("−", "11月中旬に閉山。冬季は一般入山不可。"),
    cal_data=[
        (1,0,"−"),(2,0,"−"),(3,0,"−"),(4,0,"−"),(5,90,"★★★★★"),
        (6,80,"★★★★"),(7,75,"★★★★"),(8,75,"★★★★"),(9,85,"★★★★★"),
        (10,95,"★★★★★"),(11,50,"★★★"),(12,0,"−"),
    ],
    access_train=[
        "<strong>新宿駅</strong>からJR特急あずさで松本駅まで約2.5時間 → バスで上高地まで約1時間",
        "<strong>名古屋駅</strong>からJR特急しなので松本駅まで約2時間 → バスで約1時間",
        "松本駅からアルピコ交通バス「上高地線」が運行（夏季）",
    ],
    access_car=[
        "長野自動車道「松本IC」から沢渡（さわんど）駐車場まで約1時間",
        "安房トンネル経由で岐阜側からもアクセス可能",
        "上高地はマイカー規制のため沢渡でシャトルバスに乗り換え必須",
    ],
    access_parking=[
        "沢渡（さわんど）駐車場：1日700円、約2,000台収容",
        "平湯（ひらゆ）駐車場：1日500円（岐阜側）",
        "5月〜11月の週末は早朝から混雑するため7時前到着推奨",
    ],
    tips=[
        {"cls":"caution","icon":"⚠️","title":"マイカー規制に注意","body":"上高地へのマイカー乗り入れは禁止。沢渡または平湯でバスに乗り換えが必要です。"},
        {"cls":"caution","icon":"🐻","title":"クマが生息","body":"上高地にはツキノワグマが生息。食料はしっかり管理し、熊鈴を装着しましょう。"},
        {"cls":"info","icon":"💧","title":"水は飲めません","body":"梓川の水は飲用不可。売店や水場でしっかり補給してから出発しましょう。"},
        {"cls":"info","icon":"🌿","title":"自然保護区","body":"植物の採取、火起こしは禁止。国の特別名勝・天然記念物として厳格に保護されています。"},
        {"cls":"tip","icon":"💡","title":"早朝の上高地が最高","body":"バスの始発前に徒歩や自転車で入ることも可能。朝霧の河童橋は絶景です。"},
        {"cls":"tip","icon":"📱","title":"電波状況","body":"上高地内は場所によって電波が入りにくい。事前に地図をダウンロードしておくと安心。"},
    ],
    summary_rows=[
        ("山名","上高地"),("標高","1,504m（バスターミナル）"),("所在地","長野県松本市"),
        ("難易度","初級〜中級"),("コース距離","約10km（河童橋〜明神池往復）"),
        ("標高差","約100m"),("所要時間","4〜5時間"),("トイレ","各所にあり"),
        ("売店","河童橋・明神館等"),("入山料","無料（明神池拝観500円）"),
    ],
    related_links=[
        ("霧ヶ峰（長野）","kirigamine.html","easy"),
        ("富士山（静岡・山梨）","../chubu/fuji.html","hard"),
        ("白馬岳（長野）","#","hard"),
    ],
    datePublished="2026-04-27"
)

# ===== 2. 霧ヶ峰 =====
make_course(
    filepath=f"{BASE}/regions/chubu/kirigamine.html",
    depth=2, title="霧ヶ峰", title_full="霧ヶ峰ハイキングガイド｜高原のニッコウキスゲと360度の展望",
    region_label="中部・長野", region_dir="chubu",
    difficulty="easy", difficulty_label="初級",
    location="長野県諏訪市・茅野市", elevation="1,925m（車山）", distance="約8km",
    time_str="約3〜4時間", elevation_diff="約300m", nearest_station="茅野駅（バス利用）",
    fee="無料", best_season="夏（ニッコウキスゲ）・秋",
    desc_short="高原に広がるニッコウキスゲの大群落。霧ヶ峰・車山の絶景ハイキングを完全ガイド。",
    desc_meta="霧ヶ峰ハイキングのコース・アクセス・見どころを解説。ニッコウキスゲが咲く夏の高原を歩く長野県の人気登山スポット。",
    canonical_path="regions/chubu/kirigamine.html",
    overview_h="霧ヶ峰の概要",
    overview_p1="霧ヶ峰（きりがみね）は長野県の八ヶ岳連峰西側に広がる高原で、最高点は<strong>車山（1,925m）</strong>です。7月中旬〜8月上旬に咲く<strong>ニッコウキスゲの大群落</strong>が特に有名で、黄色一面に染まる高原は圧巻の景色を見せてくれます。",
    overview_p2="高原全体が国定公園に指定されており、整備されたハイキングコースが複数あります。車山スキー場のリフトを利用すれば、体力に自信のない方でも山頂付近の展望を楽しめます。",
    overview_tip="<strong>ニッコウキスゲのピーク：</strong>例年7月中旬〜下旬が見頃。鹿の食害防止のためネットで囲まれた群落地が整備されています。",
    courses_intro="霧ヶ峰は高原の散策から本格的な縦走まで幅広いコースがあります。",
    course_rows=[
        {"name":"車山〜車山肩周回", "distance":"約5km", "time":"約2時間", "diff":"easy", "feature":"リフト利用可。360度パノラマが楽しめる定番コース", "recommended":True},
        {"name":"八島湿原周回", "distance":"約4km", "time":"約1.5時間", "diff":"easy", "feature":"高層湿原の自然観察コース。木道整備済み"},
        {"name":"車山〜八島湿原縦走", "distance":"約8km", "time":"約3〜4時間", "diff":"easy", "feature":"霧ヶ峰を横断する人気縦走路"},
        {"name":"蝶々深山経由コース", "distance":"約10km", "time":"約4〜5時間", "diff":"medium", "feature":"静かな高原歩きが楽しめるロングコース"},
    ],
    route_title="おすすめルート：車山周回コース",
    route_intro="リフトを使えば短時間で山頂へ。徒歩でも整備された登山道で比較的楽に歩けます。",
    route_steps=[
        {"title":"車山高原スキー場（標高1,600m）", "body":"バス停・駐車場あり。リフト乗り場はここから。売店・レストランあり。", "arrow":""},
        {"title":"車山山頂（標高1,925m）", "body":"リフト2本で山頂へ（片道1,000円）または徒歩約1時間。360度パノラマの展望台と車山神社がある。", "arrow":"リフト約20分 or 徒歩約60分", "tip":"南アルプス・北アルプス・富士山まで見渡せる絶景スポット"},
        {"title":"車山肩（コロボックルヒュッテ）", "body":"ニッコウキスゲ群落地の中心。山小屋でボルシチが名物。", "arrow":"徒歩約40分"},
        {"title":"車山高原スキー場", "body":"もとの出発点に戻る。帰路はリフト利用も可能。", "arrow":"徒歩約50分"},
    ],
    season_spring=("★★★☆☆", "5〜6月は残雪が消えてレンゲツツジが咲く。人が少なく静かな高原歩きが楽しめる。"),
    season_summer=("★★★★★", "7月中旬〜8月上旬がニッコウキスゲの最盛期。高原全体が黄色に染まる圧巻の景色。"),
    season_autumn=("★★★★★", "9〜10月の草紅葉が美しい。澄んだ空気と360度の展望が楽しめる。混雑も少なく快適。"),
    season_winter=("★★☆☆☆", "スキー場として営業。ハイキングは積雪があり上級者向け。スノーシューツアーも開催。"),
    cal_data=[
        (1,20,"★"),(2,20,"★"),(3,30,"★★"),(4,40,"★★"),(5,60,"★★★"),
        (6,65,"★★★"),(7,100,"★★★★★"),(8,90,"★★★★★"),(9,85,"★★★★★"),
        (10,80,"★★★★"),(11,40,"★★"),(12,20,"★"),
    ],
    access_train=[
        "<strong>新宿駅</strong>からJR特急あずさで茅野駅まで約2時間",
        "茅野駅からアルピコ交通バスで車山高原まで約50分（7〜10月運行）",
        "上諏訪駅からも路線バスあり",
    ],
    access_car=[
        "中央自動車道「諏訪IC」から車山高原まで約30分",
        "中央自動車道「諏訪南IC」からも約35分",
    ],
    access_parking=[
        "車山高原スキー場駐車場：無料、約500台収容",
        "八島湿原駐車場：無料、約100台収容",
        "7月ニッコウキスゲ最盛期は渋滞・満車に注意",
    ],
    tips=[
        {"cls":"info","icon":"🌼","title":"ニッコウキスゲの群落保護","body":"群落地周辺は立ち入り禁止エリアあり。ルートを外れないよう注意しましょう。"},
        {"cls":"caution","icon":"⚠️","title":"霧の発生","body":"霧ヶ峰という名の通り、急に霧が出ることがあります。視界が悪くなったら引き返しましょう。"},
        {"cls":"info","icon":"🦌","title":"ニホンジカに注意","body":"高原にはニホンジカが生息し、植物の食害が問題に。出会っても近づきすぎないこと。"},
        {"cls":"tip","icon":"💡","title":"リフト活用がおすすめ","body":"車山リフトを使えば初心者でも山頂からの絶景を楽しめます。体力に合わせて活用しましょう。"},
        {"cls":"tip","icon":"☀️","title":"紫外線対策を忘れずに","body":"高原は遮るものがなく紫外線が強い。帽子・サングラス・日焼け止めは必携です。"},
        {"cls":"caution","icon":"🌧️","title":"午後は天気が崩れやすい","body":"夏の高原は午後に雷が多い。早朝出発して午前中に行動を終えることをおすすめします。"},
    ],
    summary_rows=[
        ("山名","霧ヶ峰（車山）"),("標高","1,925m"),("所在地","長野県諏訪市・茅野市"),
        ("難易度","初級"),("コース距離","約8km（縦走コース）"),
        ("標高差","約300m"),("所要時間","3〜4時間"),("トイレ","スキー場・各登山口"),
        ("売店","スキー場・コロボックルヒュッテ"),("入山料","無料"),
    ],
    related_links=[
        ("上高地（長野）","kamikochi.html","easy"),
        ("富士山（静岡・山梨）","../chubu/fuji.html","hard"),
        ("八ヶ岳（長野）","#","medium"),
    ],
    datePublished="2026-04-27"
)

# ===== 3. 大雪山 =====
make_course(
    filepath=f"{BASE}/regions/hokkaido/daisetsuzan.html",
    depth=2, title="大雪山", title_full="大雪山ハイキングガイド｜北海道の屋根・旭岳を歩く",
    region_label="北海道", region_dir="hokkaido",
    difficulty="medium", difficulty_label="中級",
    location="北海道上川郡東川町", elevation="2,291m（旭岳）", distance="約8km",
    time_str="約5〜6時間", elevation_diff="約600m", nearest_station="旭川駅（バス利用）",
    fee="無料", best_season="夏・紅葉（9月）",
    desc_short="北海道最高峰・旭岳を含む大雪山。日本で最も早い紅葉と雄大な大自然を楽しむハイキングガイド。",
    desc_meta="大雪山・旭岳ハイキングのコース・アクセス・見どころを詳しく解説。北海道最高峰と日本最早の紅葉を楽しめる登山スポット。",
    canonical_path="regions/hokkaido/daisetsuzan.html",
    overview_h="大雪山の概要",
    overview_p1="大雪山（だいせつざん）は北海道中央部に広がる火山群の総称で、<strong>旭岳（2,291m）は北海道最高峰</strong>です。「北海道の屋根」とも呼ばれ、高山植物・野生動物・火山地形など豊かな自然が広がります。ロープウェイを使えば標高1,600m付近まで一気に上がれます。",
    overview_p2="最大の見どころは<strong>日本で最も早い紅葉</strong>。例年9月中旬に旭岳周辺が色づき始め、9月下旬には見頃を迎えます。夏（6〜8月）は高山植物のお花畑が広がり、エゾナキウサギやクマも見られる野生動物の宝庫です。",
    overview_tip="<strong>ロープウェイ活用が必須：</strong>姿見駅（1,600m）まではロープウェイ（往復3,200円）で。そこからの登山は本格的な装備が必要です。",
    courses_intro="大雪山には複数のコースがありますが、旭岳往復が最も人気です。",
    course_rows=[
        {"name":"旭岳ロープウェイ〜旭岳山頂往復", "distance":"約8km", "time":"約5〜6時間", "diff":"medium", "feature":"北海道最高峰への定番コース", "recommended":True},
        {"name":"姿見の池周回（ロープウェイ山上駅から）", "distance":"約2.5km", "time":"約1時間", "diff":"easy", "feature":"火山地形と高山植物を楽しむ初心者向け周回路"},
        {"name":"旭岳〜北鎮岳縦走", "distance":"約14km", "time":"約7〜8時間", "diff":"hard", "feature":"大雪山系を縦走する健脚者向けルート"},
        {"name":"黒岳コース", "distance":"約6km", "time":"約4時間", "diff":"medium", "feature":"層雲峡温泉からロープウェイで行く人気コース"},
    ],
    route_title="おすすめルート：旭岳往復コース",
    route_intro="ロープウェイで姿見駅まで上がり、旭岳山頂を目指す日帰りコース。高山植物と火山地形が楽しめます。",
    route_steps=[
        {"title":"旭岳ロープウェイ山麓駅（標高1,100m）", "body":"旭川駅からバスで約1.5時間。ビジターセンター・売店あり。ロープウェイ乗り場。", "arrow":""},
        {"title":"姿見駅（標高1,600m）", "body":"ロープウェイ山上駅。火山性ガスの噴気孔が間近に見られる。姿見の池への遊歩道はここから。", "arrow":"ロープウェイ約10分", "tip":"悪天候時はここで引き返すことも視野に"},
        {"title":"姿見の池", "body":"旭岳が水面に映る絶景スポット。秋は紅葉、夏は高山植物に囲まれた神秘的な池。", "arrow":"徒歩約30分"},
        {"title":"旭岳山頂（標高2,291m）", "body":"北海道最高峰。360度の大パノラマ。天気が良ければ遠く十勝岳連峰まで見渡せる。", "arrow":"徒歩約2〜3時間"},
    ],
    season_spring=("★★☆☆☆", "5〜6月は残雪が多くアイゼン必要。登山経験者向け。ロープウェイは5月下旬から運行開始。"),
    season_summer=("★★★★★", "7〜8月は高山植物のお花畑が最盛期。エゾコザクラ・チングルマなどが咲き誇る。天気の良い日が多い。"),
    season_autumn=("★★★★★", "9月中旬〜下旬が紅葉の最盛期。日本で最も早い紅葉として全国から観光客が訪れる。"),
    season_winter=("−", "厳冬期は本格的な雪山登山の装備が必要。一般登山者には不向き。"),
    cal_data=[
        (1,0,"−"),(2,0,"−"),(3,0,"−"),(4,20,"★"),(5,30,"★★"),
        (6,60,"★★★"),(7,90,"★★★★★"),(8,95,"★★★★★"),(9,100,"★★★★★"),
        (10,40,"★★"),(11,10,"★"),(12,0,"−"),
    ],
    access_train=[
        "<strong>旭川駅</strong>から旭川電気軌道バスで旭岳ロープウェイまで約1.5時間",
        "<strong>新千歳空港</strong>からJRで旭川まで約1.5時間 → バスに乗り換え",
    ],
    access_car=[
        "旭川市内から国道39号→道道旭岳線で旭岳ロープウェイまで約1時間",
        "旭川鷹栖ICから約40分",
    ],
    access_parking=[
        "旭岳ロープウェイ駐車場：無料、約200台収容",
        "9月紅葉シーズンの週末は大変混雑。早朝到着推奨",
    ],
    tips=[
        {"cls":"caution","icon":"🐻","title":"ヒグマが生息","body":"大雪山系にはヒグマが生息。熊鈴を装着し、単独行動は避けましょう。出会っても走って逃げないこと。"},
        {"cls":"caution","icon":"⛈️","title":"高山の気象変化に注意","body":"夏でも急に気温が下がることがあります。防寒着・レインウェアを必ず携行してください。"},
        {"cls":"caution","icon":"🌋","title":"火山ガスに注意","body":"姿見周辺は火山性ガスが発生。立ち入り禁止エリアには近づかないこと。"},
        {"cls":"info","icon":"💡","title":"最新情報を確認","body":"入山前に東川町やロープウェイ公式サイトで最新の登山情報・天気を確認しましょう。"},
        {"cls":"tip","icon":"🌺","title":"高山植物の宝庫","body":"大雪山系は日本最大規模の高山植物群落地。チングルマ・エゾルリムラサキなど珍しい植物が見られます。"},
        {"cls":"tip","icon":"🦊","title":"野生動物との出会い","body":"エゾナキウサギ・エゾシマリスなど可愛い動物も多い。静かに歩くと出会える確率が高まります。"},
    ],
    summary_rows=[
        ("山名","大雪山（旭岳）"),("標高","2,291m"),("所在地","北海道上川郡東川町"),
        ("難易度","中級"),("コース距離","約8km（往復）"),
        ("標高差","約700m（姿見駅から）"),("所要時間","5〜6時間"),("トイレ","山麓駅・姿見駅"),
        ("売店","山麓駅・姿見駅"),("入山料","無料（ロープウェイ往復3,200円）"),
    ],
    related_links=[
        ("知床（北海道）","shiretoko.html","medium"),
        ("羊蹄山（北海道）","#","hard"),
        ("利尻山（北海道）","#","hard"),
    ],
    datePublished="2026-04-27"
)

# ===== 4. 知床 =====
make_course(
    filepath=f"{BASE}/regions/hokkaido/shiretoko.html",
    depth=2, title="知床", title_full="知床ハイキングガイド｜世界遺産の原始林を歩く",
    region_label="北海道", region_dir="hokkaido",
    difficulty="medium", difficulty_label="中級",
    location="北海道斜里郡斜里町・目梨郡羅臼町", elevation="1,661m（羅臼岳）", distance="約10km",
    time_str="約4〜6時間", elevation_diff="約500m", nearest_station="知床斜里駅（バス利用）",
    fee="無料（知床五湖は環境保全費あり）", best_season="夏・秋",
    desc_short="ユネスコ世界遺産・知床の原始林と野生動物。知床五湖・カムイワッカ湯の滝など絶景コースを徹底ガイド。",
    desc_meta="知床ハイキングのコース・アクセス・見どころを解説。世界遺産の原始林・知床五湖・羅臼岳など北海道の絶景を紹介。",
    canonical_path="regions/hokkaido/shiretoko.html",
    overview_h="知床の概要",
    overview_p1="知床（しれとこ）は北海道東部に位置し、<strong>2005年にユネスコ世界自然遺産に登録</strong>された日本唯一の「海と山が一体となった世界遺産」です。ヒグマ・エゾシカ・シャチ・流氷など、世界的にも希少な自然環境が残されています。",
    overview_p2="ハイキングの代表的なスポットは<strong>知床五湖</strong>。高架木道（無料）または地上遊歩道（要レクチャー受講）で湖と原始林を巡ります。上級者には<strong>羅臼岳</strong>への登山も人気です。",
    overview_tip="<strong>ヒグマ対策が最重要：</strong>知床ではヒグマが頻繁に目撃されます。入山前に知床五湖フィールドハウスでレクチャーを受けることが義務付けられています。",
    courses_intro="知床は自然保護のため、立ち入りエリアが制限されています。ルールを守って楽しみましょう。",
    course_rows=[
        {"name":"知床五湖・高架木道", "distance":"約0.8km", "time":"約40分", "diff":"easy", "feature":"無料・年間通じて歩ける。一湖と展望台まで", "recommended":True},
        {"name":"知床五湖・地上遊歩道（大ループ）", "distance":"約3km", "time":"約1.5時間", "diff":"easy", "feature":"レクチャー受講後に入山可。五つの湖を全て巡る"},
        {"name":"羅臼岳（岩尾別コース）", "distance":"約10km", "time":"約6〜8時間", "diff":"hard", "feature":"知床最高峰への本格登山。上級者向け"},
        {"name":"カムイワッカ湯の滝", "distance":"往復約1km", "time":"約1時間", "diff":"easy", "feature":"川を登って行く温泉の滝。ぬるめの湯に足をつけられる"},
    ],
    route_title="おすすめルート：知床五湖・地上遊歩道（大ループ）",
    route_intro="五つの神秘的な湖を巡る、知床の大自然を満喫できるコース。",
    route_steps=[
        {"title":"知床五湖フィールドハウス", "body":"地上遊歩道利用者は必ずここでヒグマ対策レクチャー受講（無料・約10分）。", "arrow":""},
        {"title":"五湖（ごこ）", "body":"最も奥にある五番目の湖。静寂な森の中にある小さな湖。", "arrow":"徒歩約30分", "tip":"ヒグマが出没しやすいエリア。熊鈴と笛を忘れずに"},
        {"title":"四湖・三湖・二湖", "body":"それぞれ異なる表情を持つ湖。二湖からは知床連山が湖面に映る絶景が見られる。", "arrow":"徒歩約40分"},
        {"title":"一湖・展望台", "body":"最も大きな湖。羅臼岳を背景にした景色は知床を代表する絶景。", "arrow":"徒歩約20分"},
    ],
    season_spring=("★★★☆☆", "4〜5月は流氷が去り野鳥が飛来。ヒグマが冬眠から目覚め出没が増える。地上遊歩道の開放は5月から。"),
    season_summer=("★★★★★", "6〜8月が最も歩きやすい。高山植物・野生動物の観察に最適。観光シーズンで賑わう。"),
    season_autumn=("★★★★★", "9〜10月は紅葉と野生動物の活動期。ヒグマが冬眠前で活発。エゾシカも多く見られる。"),
    season_winter=("★★☆☆☆", "流氷シーズン（1〜3月）は別の魅力あり。ウトロ側でクルーズツアーが人気。ハイキングは困難。"),
    cal_data=[
        (1,20,"★"),(2,30,"★★"),(3,25,"★"),(4,40,"★★"),(5,60,"★★★"),
        (6,80,"★★★★"),(7,95,"★★★★★"),(8,90,"★★★★★"),(9,85,"★★★★★"),
        (10,70,"★★★★"),(11,30,"★★"),(12,15,"★"),
    ],
    access_train=[
        "<strong>網走駅</strong>からJR釧網本線で知床斜里駅まで約1時間 → バスで約1.5時間",
        "<strong>新千歳空港</strong>から女満別空港（飛行機約45分）→ バスで約2時間",
    ],
    access_car=[
        "網走市内から国道334号で知床五湖まで約1.5時間",
        "斜里町市内から知床横断道路を経由して約50分",
    ],
    access_parking=[
        "知床五湖駐車場：1回500円（普通車）",
        "ピーク時（7〜8月）は早朝でも混雑。シャトルバス利用も検討を",
    ],
    tips=[
        {"cls":"caution","icon":"🐻","title":"ヒグマとの遭遇","body":"知床はヒグマの密度が高い地域です。単独行は避け、熊鈴必携。出会ったら静かに距離を取りましょう。"},
        {"cls":"caution","icon":"⚠️","title":"入林規制","body":"知床半島の先端部（知床岬）は原則立ち入り禁止。ルールを守って自然を守りましょう。"},
        {"cls":"info","icon":"💡","title":"地上遊歩道の利用制限","body":"地上遊歩道はヒグマ活動期（8月1日〜）は事前予約・ガイド同行が必要な場合があります。事前確認を。"},
        {"cls":"tip","icon":"🦅","title":"野鳥・野生動物の宝庫","body":"オジロワシ・エゾシカ・キタキツネなど多様な野生動物に出会える可能性大。双眼鏡があると楽しさ倍増。"},
        {"cls":"tip","icon":"🌊","title":"クルーズツアーもおすすめ","body":"知床岬へは観光船クルーズが人気。崖から流れ落ちる滝や岩場のトドも見られます。"},
        {"cls":"caution","icon":"🌧️","title":"天気の変化が激しい","body":"知床は急に天気が変わります。レインウェアと防寒着は常に携行してください。"},
    ],
    summary_rows=[
        ("エリア名","知床"),("標高","1,661m（羅臼岳）"),("所在地","北海道斜里郡・目梨郡"),
        ("難易度","中級（五湖は初級）"),("コース距離","約3km（五湖大ループ）"),
        ("標高差","約50m（五湖コース）"),("所要時間","1.5〜2時間（五湖）"),
        ("トイレ","フィールドハウス"),("売店","フィールドハウス内"),
        ("入山料","無料（環境保全費500円）"),
    ],
    related_links=[
        ("大雪山（北海道）","daisetsuzan.html","medium"),
        ("阿寒湖（北海道）","#","easy"),
        ("摩周岳（北海道）","#","medium"),
    ],
    datePublished="2026-04-27"
)

# ===== 5. 吉野山 =====
make_course(
    filepath=f"{BASE}/regions/kinki/yoshino.html",
    depth=2, title="吉野山", title_full="吉野山ハイキングガイド｜日本一の桜と修験道の霊場を歩く",
    region_label="近畿・奈良", region_dir="kinki",
    difficulty="easy", difficulty_label="初級",
    location="奈良県吉野郡吉野町", elevation="約858m（金峯山寺付近）", distance="約6km",
    time_str="約3〜4時間", elevation_diff="約350m", nearest_station="近鉄吉野駅",
    fee="無料（蔵王堂拝観700円）", best_season="春（桜）・秋",
    desc_short="日本一の桜名所・吉野山。ユネスコ世界遺産の修験道の霊場と2万本超の桜を歩くハイキングガイド。",
    desc_meta="吉野山ハイキングのコース・アクセス・桜の見頃・見どころを解説。日本一の桜と世界遺産の霊場を巡る奈良県の人気コース。",
    canonical_path="regions/kinki/yoshino.html",
    overview_h="吉野山の概要",
    overview_p1="吉野山（よしのやま）は奈良県中部に広がる山で、<strong>2万本を超えるヤマザクラ</strong>が山肌を埋め尽くす日本随一の桜の名所です。古くは役小角（えんのおづぬ）が開いた修験道の聖地であり、<strong>2004年にユネスコ世界遺産「紀伊山地の霊場と参詣道」</strong>として登録されました。",
    overview_p2="山は下千本・中千本・上千本・奥千本の4エリアに分かれ、桜の見頃は山麓から山頂へと順に移っていきます。ロープウェイを使えばアクセスも楽で、山上の参道を歩きながら金峯山寺・吉水神社など歴史的建造物を巡ることができます。",
    overview_tip="<strong>桜のシーズンは大混雑：</strong>4月上旬の桜最盛期は車でのアクセスが規制されます。近鉄電車＋ロープウェイの利用が確実です。",
    courses_intro="吉野山は桜のシーズンと紅葉のシーズンで楽しみ方が変わります。",
    course_rows=[
        {"name":"近鉄吉野駅〜奥千本（往復）", "distance":"約6km", "time":"約3〜4時間", "diff":"easy", "feature":"吉野山全体を縦走する定番コース", "recommended":True},
        {"name":"ロープウェイ〜中千本〜上千本", "distance":"約3km", "time":"約1.5時間", "diff":"easy", "feature":"ロープウェイ利用の短縮コース。桜シーズンに人気"},
        {"name":"奥千本〜大峯山（天川村）", "distance":"約15km", "time":"約7時間", "diff":"hard", "feature":"修験道の聖地・大峯山（女人禁制）への縦走路"},
    ],
    route_title="おすすめルート：吉野駅〜奥千本縦走",
    route_intro="近鉄吉野駅からロープウェイを使って山上へ。参道沿いの桜と歴史的建造物を楽しみながら奥千本を目指します。",
    route_steps=[
        {"title":"近鉄吉野駅（標高265m）", "body":"大阪阿部野橋から特急で約1時間。ロープウェイ乗り場まで徒歩5分。", "arrow":""},
        {"title":"吉野山駅（ロープウェイ山上駅）", "body":"日本最古のロープウェイ（片道450円）。七曲坂を歩いて登ることも可能（約20分）。", "arrow":"ロープウェイ3分 or 徒歩20分", "tip":"桜シーズンは早朝のロープウェイが混雑。時間に余裕を持って"},
        {"title":"金峯山寺（蔵王堂）", "body":"吉野山のシンボル的存在。国宝の蔵王権現像が安置される巨大な木造建造物。拝観700円。", "arrow":"徒歩10分"},
        {"title":"吉水神社・中千本エリア", "body":"南北朝時代に後醍醐天皇が御所とした世界遺産。中千本の桜展望が素晴らしい。", "arrow":"徒歩30分"},
        {"title":"上千本・奥千本エリア（標高858m付近）", "body":"最も神聖な場所。金峯神社・西行庵がある。人が少なく静かな桜を楽しめる。", "arrow":"徒歩40分"},
    ],
    season_spring=("★★★★★", "3月下旬〜4月中旬が桜のシーズン。下千本→中千本→上千本→奥千本と順に開花。見頃は4月上旬。"),
    season_summer=("★★★☆☆", "新緑が美しい。人が少なく静かに歩ける。修験道の修行者とすれ違うこともある。"),
    season_autumn=("★★★★☆", "11月の紅葉は桜と並ぶ見どころ。金峯山寺周辺の紅葉と歴史的建造物のコントラストが美しい。"),
    season_winter=("★★☆☆☆", "積雪は少ないが寒い。雪化粧の金峯山寺は幻想的。参拝者は少なく静かに歩ける。"),
    cal_data=[
        (1,30,"★★"),(2,30,"★★"),(3,60,"★★★"),(4,100,"★★★★★"),(5,65,"★★★"),
        (6,50,"★★★"),(7,45,"★★"),(8,45,"★★"),(9,55,"★★★"),
        (10,70,"★★★★"),(11,85,"★★★★★"),(12,35,"★★"),
    ],
    access_train=[
        "<strong>大阪阿部野橋駅</strong>から近鉄特急で吉野駅まで約1時間（特急利用推奨）",
        "<strong>京都駅</strong>からJR奈良線→近鉄で吉野まで約2時間",
        "<strong>名古屋駅</strong>から近鉄特急で約2.5時間",
    ],
    access_car=[
        "西名阪自動車道「郡山IC」から国道169号経由で約1時間",
        "南阪奈道路「葛城IC」から約40分",
        "桜シーズン（4月上旬）はマイカー規制あり",
    ],
    access_parking=[
        "吉野駅周辺に民間駐車場あり（1日1,000〜2,000円）",
        "桜シーズンは周辺道路が大渋滞。電車利用を強く推奨",
    ],
    tips=[
        {"cls":"caution","icon":"👥","title":"桜シーズンの大混雑","body":"4月上旬の桜最盛期は数十万人が訪れます。平日か早朝の来訪を強くおすすめします。"},
        {"cls":"info","icon":"🚗","title":"桜シーズンはマイカー規制","body":"4月上旬〜中旬の土日祝は麓から吉野山へのマイカー乗り入れが規制されます。電車利用が確実。"},
        {"cls":"info","icon":"⛪","title":"修験道の聖地","body":"吉野山は現在も修験道の修行が続く場所。蔵王堂など神聖な場所では節度ある行動を。"},
        {"cls":"tip","icon":"🌸","title":"桜は下から順に咲く","body":"「下千本→中千本→上千本→奥千本」と開花が進みます。最新情報をチェックして訪問計画を立てて。"},
        {"cls":"tip","icon":"🍡","title":"吉野グルメ","body":"吉野葛を使ったくず餅・葛きりが名物。参道沿いの茶店で休憩しながら楽しんでください。"},
        {"cls":"tip","icon":"📱","title":"混雑情報の確認","body":"桜シーズンは吉野町観光公社のウェブサイトで開花情報・混雑情報を事前確認しましょう。"},
    ],
    summary_rows=[
        ("山名","吉野山"),("標高","約858m（奥千本）"),("所在地","奈良県吉野郡吉野町"),
        ("難易度","初級"),("コース距離","約6km（往復）"),
        ("標高差","約350m"),("所要時間","3〜4時間"),("トイレ","各所にあり"),
        ("売店","参道沿いに多数"),("入山料","無料（蔵王堂拝観700円）"),
    ],
    related_links=[
        ("大台ヶ原（奈良・三重）","#","medium"),
        ("金剛山（大阪・奈良）","#","easy"),
        ("六甲山（兵庫）","#","easy"),
    ],
    datePublished="2026-04-27"
)

# ===== 6. 阿蘇山 =====
make_course(
    filepath=f"{BASE}/regions/kyushu/aso.html",
    depth=2, title="阿蘇山", title_full="阿蘇山ハイキングガイド｜世界最大級のカルデラと活火山を歩く",
    region_label="九州・熊本", region_dir="kyushu",
    difficulty="easy", difficulty_label="初級〜中級",
    location="熊本県阿蘇市", elevation="1,592m（高岳）", distance="約8km",
    time_str="約4〜5時間", elevation_diff="約550m", nearest_station="阿蘇駅（バス利用）",
    fee="無料（ロープウェイ別途）", best_season="春・秋",
    desc_short="世界最大級のカルデラと活火山・阿蘇山。中岳の噴火口と高岳の絶景ハイキングを完全ガイド。",
    desc_meta="阿蘇山ハイキングのコース・アクセス・火山規制情報を解説。中岳・高岳への登山と世界最大のカルデラを楽しむ熊本の絶景スポット。",
    canonical_path="regions/kyushu/aso.html",
    overview_h="阿蘇山の概要",
    overview_p1="阿蘇山（あそさん）は熊本県中部に位置する活火山群の総称です。<strong>世界最大級のカルデラ（東西18km×南北25km）</strong>を持ち、カルデラの中に約5万人が暮らす世界的に珍しい地形です。中央火口丘群には中岳・高岳・根子岳・烏帽子岳・杵島岳の「阿蘇五岳」がそびえます。",
    overview_p2="活火山のため<strong>火山活動の状況により立ち入り規制</strong>が変わります。中岳の噴火口周辺は警戒レベルに応じてアクセスが制限されます。事前に最新の規制情報を確認することが重要です。",
    overview_tip="<strong>火山規制を必ず確認：</strong>登山前に気象庁・阿蘇火山防災会議協議会のウェブサイトで最新の噴火警戒レベルを確認してください。",
    courses_intro="阿蘇山は火山活動の状況によって歩けるコースが変わります。最新情報を確認のうえ計画を立てましょう。",
    course_rows=[
        {"name":"高岳（米塚コース）", "distance":"約8km", "time":"約4〜5時間", "diff":"medium", "feature":"阿蘇最高峰。火口壁を歩く迫力のコース", "recommended":True},
        {"name":"杵島岳（草千里〜杵島岳）", "distance":"約3km", "time":"約1.5時間", "diff":"easy", "feature":"草千里展望台から登れる初心者向けコース"},
        {"name":"烏帽子岳", "distance":"約2km", "time":"約1時間", "diff":"easy", "feature":"草千里から最も近い山。展望が良い"},
        {"name":"根子岳（大戸尾根コース）", "distance":"約6km", "time":"約4時間", "diff":"hard", "feature":"険しい岩峰。上級者向け。要ルート確認"},
    ],
    route_title="おすすめルート：草千里〜杵島岳",
    route_intro="観光客にも人気の草千里から杵島岳を目指す比較的短いコース。阿蘇カルデラの絶景が楽しめます。",
    route_steps=[
        {"title":"草千里ヶ浜駐車場（標高1,100m）", "body":"阿蘇の観光中心地。草原の中に馬が放牧される牧歌的な景色。売店・レストランあり。", "arrow":""},
        {"title":"草千里展望台", "body":"カルデラと中央火口丘群を一望できる絶景ポイント。中岳の噴煙が見える。", "arrow":"徒歩10分"},
        {"title":"杵島岳（標高1,270m）", "body":"草千里の縁を歩いて登る。360度のパノラマ展望。中岳・高岳・根子岳が一望できる。", "arrow":"徒歩約50分", "tip":"火口縁を歩くため風が強い日は要注意"},
        {"title":"草千里駐車場（下山）", "body":"往路を戻るか、周回コースで下山。", "arrow":"徒歩約40分"},
    ],
    season_spring=("★★★★★", "3〜5月の野焼き後の新緑と残雪の阿蘇五岳が美しい。ミヤマキリシマ（ツツジの一種）が5〜6月に開花。"),
    season_summer=("★★★☆☆", "草原が緑に覆われ牧歌的な景色。暑い日が多い。夕立に注意。"),
    season_autumn=("★★★★★", "10〜11月の草原が黄金色に染まる。澄んだ空気で遠くの山まで見渡せる。"),
    season_winter=("★★☆☆☆", "阿蘇は雪が少ないため冬でも歩ける日がある。防寒が必要。路面凍結に注意。"),
    cal_data=[
        (1,35,"★★"),(2,35,"★★"),(3,70,"★★★★"),(4,80,"★★★★"),(5,90,"★★★★★"),
        (6,65,"★★★"),(7,55,"★★★"),(8,55,"★★★"),(9,75,"★★★★"),
        (10,90,"★★★★★"),(11,75,"★★★★"),(12,40,"★★"),
    ],
    access_train=[
        "<strong>熊本駅</strong>からJR豊肥本線で阿蘇駅まで約1時間20分",
        "阿蘇駅からバスで草千里まで約30分",
        "<strong>博多駅</strong>からJR特急で阿蘇まで約2時間",
    ],
    access_car=[
        "九州自動車道「熊本IC」から国道57号経由で約1時間30分",
        "大分自動車道「湯布院IC」から約1時間",
    ],
    access_parking=[
        "草千里駐車場：1回500円（普通車）",
        "阿蘇山上広場駐車場：1回500円",
        "春・秋の連休は渋滞するため早朝出発推奨",
    ],
    tips=[
        {"cls":"caution","icon":"🌋","title":"火山規制を必ず確認","body":"活火山のため噴火警戒レベルにより立ち入り禁止区域が変わります。登山前に必ず最新情報を確認。"},
        {"cls":"caution","icon":"💨","title":"火山ガスに注意","body":"噴火口周辺では有毒ガスが発生。ガスマスク貸し出しもありますが、風向きによっては近づけません。"},
        {"cls":"info","icon":"🐴","title":"草千里の放牧馬","body":"草千里では牛や馬が放牧されています。近づきすぎず、えさを与えないでください。"},
        {"cls":"tip","icon":"🌅","title":"野焼きの季節","body":"2〜3月に行われる野焼きの後、緑が芽吹く様子は阿蘇ならではの景色。芽吹き後の新緑は感動的。"},
        {"cls":"tip","icon":"♨️","title":"下山後の温泉","body":"黒川温泉・内牧温泉など阿蘇周辺には名湯が多い。登山帰りに温泉を楽しみましょう。"},
        {"cls":"caution","icon":"⛈️","title":"夏の夕立に注意","body":"夏は午後から急に雷雨になることが多い。午前中に行動を終えるスケジュールをおすすめします。"},
    ],
    summary_rows=[
        ("山名","阿蘇山（高岳）"),("標高","1,592m"),("所在地","熊本県阿蘇市"),
        ("難易度","初級〜中級"),("コース距離","約8km（高岳往復）"),
        ("標高差","約550m"),("所要時間","4〜5時間"),("トイレ","草千里・山上広場"),
        ("売店","草千里・山上広場"),("入山料","無料"),
    ],
    related_links=[
        ("久住山（大分）","#","medium"),
        ("屋久島（鹿児島）","../kyushu/yakushima.html","hard"),
        ("雲仙岳（長崎）","#","medium"),
    ],
    datePublished="2026-04-27"
)

# ===== 7. 石鎚山 =====
make_course(
    filepath=f"{BASE}/regions/shikoku/ishizuchi.html",
    depth=2, title="石鎚山", title_full="石鎚山ハイキングガイド｜西日本最高峰への挑戦",
    region_label="四国・愛媛", region_dir="shikoku",
    difficulty="medium", difficulty_label="中級",
    location="愛媛県西条市・上浮穴郡久万高原町", elevation="1,982m", distance="約10km",
    time_str="約5〜7時間", elevation_diff="約700m", nearest_station="伊予西条駅（バス利用）",
    fee="無料（ロープウェイ別途）", best_season="春・夏・秋",
    desc_short="西日本最高峰・石鎚山への挑戦。鎖場と天狗岳の絶景ハイキングを徹底ガイド。",
    desc_meta="石鎚山ハイキングのコース・アクセス・鎖場情報を解説。西日本最高峰への登山と天狗岳の絶景。愛媛県の人気登山スポット。",
    canonical_path="regions/shikoku/ishizuchi.html",
    overview_h="石鎚山の概要",
    overview_p1="石鎚山（いしづちさん）は愛媛県にある<strong>西日本最高峰（1,982m）</strong>の山です。日本七霊山のひとつとして古くから信仰を集めており、白装束の修験者が今でも登山する霊山です。「天狗岳」と呼ばれる岩峰は石鎚山のシンボルで、鋭く尖った姿が印象的です。",
    overview_p2="登山ルートには<strong>3か所の鎖場</strong>があり、これが石鎚山の最大の特徴です。最長の鎖場は約68mもあり、スリルと達成感を味わえます。鎖場が不安な方はう回路もあるので、初めての方でも安心して登れます。",
    overview_tip="<strong>鎖場の心得：</strong>三点支持（両手・両足のうち3点を常に固定）を守れば比較的安全。雨天時は非常に滑りやすいので、鎖場の日程は晴天を選びましょう。",
    courses_intro="石鎚山への主要ルートはロープウェイを利用する土小屋コースと成就コースです。",
    course_rows=[
        {"name":"成就コース（ロープウェイ利用）", "distance":"約10km", "time":"約5〜6時間", "diff":"medium", "feature":"最もポピュラーなコース。鎖場あり", "recommended":True},
        {"name":"土小屋コース", "distance":"約8km", "time":"約4〜5時間", "diff":"medium", "feature":"比較的なだらかで歩きやすい。車でのアクセスが便利"},
        {"name":"面河コース", "distance":"約12km", "time":"約6〜8時間", "diff":"hard", "feature":"原生林の中を歩く自然豊かなルート。距離が長い"},
        {"name":"天狗岳（弥山〜天狗岳）", "distance":"往復約0.5km", "time":"約30分", "diff":"hard", "feature":"スリリングな岩稜歩き。高度感あり。ヘルメット推奨"},
    ],
    route_title="おすすめルート：成就コース（鎖場あり）",
    route_intro="ロープウェイで一気に高度を稼ぎ、3か所の鎖場を経て山頂弥山・天狗岳を目指す定番コース。",
    route_steps=[
        {"title":"石鎚山ロープウェイ山麓駅（標高455m）", "body":"バス停・駐車場あり。ロープウェイで一気に1,300m付近まで上昇。", "arrow":""},
        {"title":"成就駅・石鎚神社成就社（標高1,450m）", "body":"ロープウェイ山上駅。石鎚神社成就社があり参拝できる。登山届はここで提出。", "arrow":"ロープウェイ約8分", "tip":"ロープウェイは往復2,100円。7月〜9月の山開きシーズンは混雑します"},
        {"title":"鎖場（一の鎖・二の鎖・三の鎖）", "body":"一の鎖33m・二の鎖65m・三の鎖68m。垂直に近い岩場を鎖を使って登る。雨天時は危険。", "arrow":"徒歩約2時間"},
        {"title":"弥山（山頂・標高1,974m）", "body":"頂上山荘あり。天狗岳を間近に見られる。晴れた日は瀬戸内海まで見渡せる。", "arrow":"徒歩約1時間"},
        {"title":"天狗岳（標高1,982m）", "body":"石鎚山最高点。細い岩稜を伝って到達する。高度感があるが絶景は格別。", "arrow":"徒歩約15分"},
    ],
    season_spring=("★★★★☆", "5〜6月のアケボノツツジが有名。ピンクの花と新緑のコントラストが美しい。残雪に注意。"),
    season_summer=("★★★★★", "7月1日の山開きから9月の山閉めまでが登山シーズン。高山植物が見頃。7月は登山者が最多。"),
    season_autumn=("★★★★★", "10〜11月の紅葉は西日本屈指の美しさ。霧の中に浮かぶ天狗岳は幻想的。"),
    season_winter=("★★☆☆☆", "積雪期は本格的な雪山装備が必要。アイゼン・ピッケル必携。初心者は避けること。"),
    cal_data=[
        (1,15,"★"),(2,15,"★"),(3,30,"★★"),(4,60,"★★★"),(5,85,"★★★★★"),
        (6,80,"★★★★"),(7,90,"★★★★★"),(8,85,"★★★★★"),(9,80,"★★★★"),
        (10,90,"★★★★★"),(11,70,"★★★★"),(12,25,"★★"),
    ],
    access_train=[
        "<strong>松山駅</strong>からJR予讃線で伊予西条駅まで約1時間",
        "伊予西条駅から石鎚山ロープウェイまでバスで約40分（7〜8月運行）",
        "<strong>高松駅</strong>から特急いしづちで伊予西条まで約1時間20分",
    ],
    access_car=[
        "松山自動車道「いよ西条IC」から石鎚山ロープウェイまで約30分",
        "土小屋へは瓶ヶ森林道（UFOライン）経由で松山から約2時間",
    ],
    access_parking=[
        "ロープウェイ駐車場：1日600円、約200台収容",
        "土小屋駐車場：無料、約200台収容（7〜8月の週末は早朝で満車になることも）",
    ],
    tips=[
        {"cls":"caution","icon":"⚠️","title":"鎖場は慎重に","body":"雨天時の鎖場は大変滑りやすく危険。天気予報を確認し、悪天候なら迷わずう回路を選択してください。"},
        {"cls":"caution","icon":"🌩️","title":"落雷に注意","body":"稜線上は落雷の危険が高い。雷が近づいたら低い場所へすぐ避難。天狗岳の岩稜は特に危険。"},
        {"cls":"info","icon":"🙏","title":"霊山への敬意","body":"石鎚山は現役の霊山。山頂の石鎚神社には敬意を持って参拝を。白装束の修験者とすれ違うことも。"},
        {"cls":"tip","icon":"🏔️","title":"天狗岳のスリル","body":"弥山から天狗岳への岩稜はスリルがありますが、慎重に歩けば一般登山者でも達成感を得られます。"},
        {"cls":"tip","icon":"🌺","title":"アケボノツツジ","body":"5〜6月のアケボノツツジは石鎚山の春を代表する光景。薄ピンクの花が山肌を彩ります。"},
        {"cls":"info","icon":"💡","title":"山開きの時期","body":"例年7月1日が山開き。山開きの週末は多くの信者・登山者が一斉に登るため非常に混雑します。"},
    ],
    summary_rows=[
        ("山名","石鎚山"),("標高","1,982m（天狗岳）"),("所在地","愛媛県西条市ほか"),
        ("難易度","中級"),("コース距離","約10km（成就コース往復）"),
        ("標高差","約700m（成就社から）"),("所要時間","5〜7時間"),
        ("トイレ","成就社・弥山山頂"),("売店","成就社・弥山山頂"),("入山料","無料"),
    ],
    related_links=[
        ("剣山（徳島）","#","medium"),
        ("瓶ヶ森（愛媛）","#","easy"),
        ("佐多岬（愛媛）","#","easy"),
    ],
    datePublished="2026-04-27"
)

print("\n全コースページ作成完了！")
