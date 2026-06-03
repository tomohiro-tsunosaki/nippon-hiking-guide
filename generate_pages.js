const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/user/hiking-site';

const mountains = [
  // 関東
  {
    file: 'regions/kanto/mitakesan.html',
    name: '御岳山（みたけさん）', nameShort: '御岳山',
    region: '関東', prefecture: '東京都青梅市',
    diff: 'easy', diffLabel: '初級',
    elevation: '929m', distance: '約5km', time: '約2〜3時間', elevDiff: '約280m',
    access: 'JR御嶽駅（バス+ケーブルカー）',
    fee: '無料', season: '通年（特に春・秋）',
    emoji: '🐺',
    ogUrl: 'https://nippon-hiking-guide.com/regions/kanto/mitakesan.html',
    canonicalUrl: 'https://nippon-hiking-guide.com/regions/kanto/mitakesan.html',
    breadcrumb2name: '関東のハイキング', breadcrumb2url: 'https://nippon-hiking-guide.com/regions/kanto/',
    desc: '武蔵御嶽神社への参拝と多摩川渓谷の自然を楽しむ東京の名山。ケーブルカーで714mまで上がれるため幅広い層に人気。8月のレンゲショウマが特別名勝。',
    overview: '<p>御岳山（みたけさん）は東京都青梅市に位置する標高929mの山で、山上に武蔵御嶽神社が鎮座します。ケーブルカー（滝本駅〜御岳山駅）で標高約830mまで上がれるため初心者からベテランまで幅広く楽しめます。</p><p>神社周辺には宿坊が立ち並び、古くから信仰登山が盛ん。渓谷沿いのロックガーデン（奥の院コース）は、苔むす岩と清流が織りなす絶景スポットです。8月にはレンゲショウマの群落が見頃を迎えます。</p>',
    courses: [
      {name:'ケーブルカー利用・御岳山コース ★おすすめ', dist:'約5km', time:'約2〜3時間', diff:'初級', note:'神社参拝とロックガーデン'},
      {name:'大岳山への縦走', dist:'約12km', time:'約5〜6時間', diff:'中級', note:'御岳山から大岳山（1,266m）まで縦走'},
      {name:'奥の院コース（ロックガーデン）', dist:'約6km', time:'約3時間', diff:'初級', note:'苔と清流の渓谷美'},
    ],
    routeSteps: [
      {type:'start', title:'御嶽駅（標高225m）', desc:'JR青梅線御嶽駅。バスでケーブルカー滝本駅まで約5分。'},
      {type:'step', title:'御岳山駅（標高約830m）', desc:'ケーブルカーで約6分。山上集落・宿坊街が広がる。御嶽神社まで徒歩約10分。'},
      {type:'step', title:'武蔵御嶽神社', desc:'標高929mの山頂に鎮座。ニホンオオカミ（大口真神）を祀る。展望台から奥多摩の山並みが一望。'},
      {type:'goal', title:'ロックガーデン', desc:'天狗岩・綾広の滝を経由する苔と清流の癒しコース。往復約2時間。'},
    ],
    seasons: [
      {type:'spring', title:'春（3〜5月）', rating:'★★★★☆', text:'ミツバツツジ・ニリンソウが咲き誇る。新緑が美しい季節。'},
      {type:'summer', title:'夏（6〜8月）', rating:'★★★★★', text:'8月のレンゲショウマ（氷室山の群落）が最大の見どころ。涼しく避暑地として人気。'},
      {type:'autumn', title:'秋（9〜11月）', rating:'★★★★☆', text:'紅葉（11月上旬〜中旬）が美しい。大岳山への縦走も快適。'},
      {type:'winter', title:'冬（12〜2月）', rating:'★★★☆☆', text:'積雪時はケーブルカー区間以降にアイゼンが必要。静かな山歩きが楽しめる。'},
    ],
    accessPublic: 'JR青梅線御嶽駅から西東京バス（約5分）→ケーブルカー滝本駅→御岳山駅（約6分）',
    accessCar: '圏央道青梅ICから約30分。滝本駅付近に有料駐車場あり。',
    parking: '滝本駅駐車場（有料・約200台）',
    hotelArea1: '御岳山上の宿坊・山荘', hotelDesc1: '山上集落には武蔵御嶽神社の宿坊が10軒以上。山岳信仰の宿に泊まる体験ができる。',
    hotelArea2: '青梅・奥多摩のホテル', hotelDesc2: '青梅駅・奥多摩駅周辺のホテルを拠点にするのも便利。',
    faqs: [
      {q:'レンゲショウマの見頃はいつですか？', a:'例年8月上旬〜9月上旬が見頃。御岳山は「日本一の群落」とも言われ、約50,000株が咲き誇ります。'},
      {q:'ケーブルカーの料金は？', a:'片道600円、往復1,130円（大人）。通年運行で始発は7:30（土日は6:00）。'},
      {q:'大岳山への縦走はどのくらいかかりますか？', a:'御岳山から大岳山まで片道約2時間。往復で4〜5時間。御岳山駅〜大岳山〜奥多摩駅（バス）の縦走が人気。'},
      {q:'犬の聖地と言われるのはなぜですか？', a:'武蔵御嶽神社はニホンオオカミ（大口真神）を祀る「犬の神様」として有名。愛犬と一緒に参拝する人も多い。'},
      {q:'ロックガーデンとは何ですか？', a:'天狗岩・綾広の滝周辺の岩場と清流が続く渓谷コース。苔むした岩と小川が美しく「東京の秘境」として人気。'},
    ],
    tips: [
      {type:'info', icon:'🐕', title:'愛犬と登山可能', text:'ケーブルカーに愛犬同乗可（ケージ不要・リード着用）。御嶽神社境内も愛犬OKで「犬の聖地」として全国から犬連れが訪れる。'},
      {type:'tip', icon:'📸', title:'レンゲショウマ撮影スポット', text:'8月の御岳山は写真愛好家が多数訪れる。氷室山群落が有名だが早朝が光が柔らかくベスト。'},
      {type:'caution', icon:'⛈️', title:'午後の雷雨', text:'夏季は午後から雷雨になりやすい。14時までには下山開始を。'},
    ],
    relatedCourses: [
      {file:'takao.html', name:'高尾山（東京）', diff:'初級'},
      {file:'oyama.html', name:'大山（神奈川）', diff:'初級'},
      {file:'kumotoriyama.html', name:'雲取山（東京）', diff:'中級'},
    ],
  },
  {
    file: 'regions/kanto/kumotoriyama.html',
    name: '雲取山（くもとりやま）', nameShort: '雲取山',
    region: '関東', prefecture: '東京都・埼玉県・山梨県',
    diff: 'medium', diffLabel: '中級',
    elevation: '2,017m', distance: '約20km', time: '1泊2日（日帰り可）', elevDiff: '約1,300m',
    access: 'JR奥多摩駅（バス）',
    fee: '無料', season: '5〜11月',
    emoji: '☁️',
    ogUrl: 'https://nippon-hiking-guide.com/regions/kanto/kumotoriyama.html',
    canonicalUrl: 'https://nippon-hiking-guide.com/regions/kanto/kumotoriyama.html',
    breadcrumb2name: '関東のハイキング', breadcrumb2url: 'https://nippon-hiking-guide.com/regions/kanto/',
    desc: '東京都最高峰・日本百名山。奥多摩の奥深くに位置し、1泊2日の山小屋泊が人気。東京からアクセスできる本格的な山岳登山。',
    overview: '<p>雲取山（くもとりやま）は標高2,017mで、東京都・埼玉県・山梨県にまたがる東京都最高峰です。日本百名山のひとつで、奥多摩の奥深くに位置します。鴨沢からの日帰り登山も可能ですが、山小屋（雲取山荘）に泊まる1泊2日のコースが魅力的です。</p><p>稜線からは<strong>富士山・南アルプス・大菩薩嶺</strong>などの展望が広がります。秋の紅葉シーズンは特に美しく、冬は積雪した静かな山歩きが楽しめます。</p>',
    courses: [
      {name:'鴨沢コース（往復） ★おすすめ', dist:'約20km', time:'1泊2日', diff:'中級', note:'最短・最ポピュラー。日帰りも可能（体力必要）'},
      {name:'三峯神社コース（埼玉側）', dist:'約14km', time:'約6〜7時間', diff:'中級', note:'秩父側から。稜線歩きが長い'},
      {name:'鴨沢〜三峯縦走', dist:'約22km', time:'1泊2日', diff:'中級', note:'東西縦断縦走の人気コース'},
    ],
    routeSteps: [
      {type:'start', title:'鴨沢バス停（標高540m）', desc:'奥多摩駅から約40分のバス停。登山届ポスト・トイレあり。'},
      {type:'step', title:'堂所（標高1,160m）', desc:'急登が続く区間。ここまで約2時間。ベンチで休憩ポイント。'},
      {type:'step', title:'七ツ石山（標高1,757m）', desc:'富士山・丹沢が見渡せる展望台。七ツ石小屋でテント泊も可能。'},
      {type:'goal', title:'雲取山頂（標高2,017m）', desc:'東京都最高峰。山頂標識・都の山頂碑がある。360度の展望。雲取山荘（宿泊可）まで徒歩約10分。'},
    ],
    seasons: [
      {type:'spring', title:'春（4〜6月）', rating:'★★★★☆', text:'新緑と山桜が美しい。4月下旬〜5月ゴールデンウィークは混雑。'},
      {type:'summer', title:'夏（7〜8月）', rating:'★★★☆☆', text:'標高2,000mで涼しく快適。ただし早朝から登り始めること。'},
      {type:'autumn', title:'秋（9〜11月）', rating:'★★★★★', text:'紅葉（10〜11月上旬）が最も美しいシーズン。混雑するが絶景。'},
      {type:'winter', title:'冬（12〜3月）', rating:'★★★☆☆', text:'積雪あり（アイゼン必須）。静かな山歩き。寒さ対策をしっかり。'},
    ],
    accessPublic: 'JR青梅線奥多摩駅から西東京バスで鴨沢バス停（約40分）',
    accessCar: '国道411号で奥多摩方面へ。鴨沢バス停付近に駐車場あり（約30台・無料）。',
    parking: '小袖乗越駐車場（無料・約20台）または鴨沢バス停付近',
    hotelArea1: '雲取山荘（山頂直下）', hotelDesc1: '山頂から10分の山小屋。要予約・1泊2食付き。通年営業。',
    hotelArea2: '奥多摩町内の宿', hotelDesc2: '奥多摩駅周辺の旅館・民宿。前泊して早朝出発が理想的。',
    faqs: [
      {q:'日帰りは可能ですか？', a:'可能ですが鴨沢から往復20km・標高差1,300mで体力を要します。朝6時台出発で17時頃下山のペースが必要。初回は1泊2日を推奨。'},
      {q:'東京都最高峰について教えてください', a:'雲取山（2,017m）は東京都で最も高い山。2017年の山の年（平成29年、標高2,017m）にちなんで多くの登山者が訪れました。'},
      {q:'山小屋の予約は必要ですか？', a:'雲取山荘は要予約（公式サイトや電話で予約）。特に紅葉シーズンの週末は早めの予約が必要です。'},
      {q:'冬季も登れますか？', a:'登れますが積雪・凍結があるためアイゼン・冬用装備が必須。初心者の冬季登山は避けるか経験者同行を推奨。'},
      {q:'子連れは可能ですか？', a:'日帰りは難易度が高いため子連れには不向き。1泊2日で七ツ石小屋泊なら中学生以上の体力がある子なら可能です。'},
    ],
    tips: [
      {type:'caution', icon:'🌧️', title:'長丁場の準備', text:'往復20kmの長距離登山。食料・水分は十分に携行し、早朝出発を徹底すること。'},
      {type:'info', icon:'🦌', title:'ニホンジカが多い', text:'山中でシカをよく見かける。食べ物を置きっぱなしにしないこと。'},
      {type:'tip', icon:'🌅', title:'山小屋泊で御来光', text:'雲取山荘泊なら翌朝の御来光が楽しめる。富士山シルエットとの御来光は絶景。'},
    ],
    relatedCourses: [
      {file:'takao.html', name:'高尾山（東京）', diff:'初級'},
      {file:'tanzawasan.html', name:'丹沢山（神奈川）', diff:'中級'},
      {file:'mitakesan.html', name:'御岳山（東京）', diff:'初級'},
    ],
  },
];

// HTML template function
function buildPage(m) {
  const diffColor = m.diff === 'easy' ? '#2d6a4f' : m.diff === 'medium' ? '#856404' : '#9b1c1c';
  const diffBg = m.diff === 'easy' ? '#d8f3dc' : m.diff === 'medium' ? '#fff3cd' : '#fde8e8';

  const courseRows = m.courses.map(c => {
    const dc = c.diff === '初級' ? 'easy' : c.diff === '中級' ? 'medium' : 'hard';
    const rec = c.name.includes('★') ? ' class="recommended-row"' : '';
    return `<tr${rec}><td><strong>${c.name}</strong></td><td>${c.dist}</td><td>${c.time}</td><td><span class="difficulty ${dc}">${c.diff}</span></td><td>${c.note}</td></tr>`;
  }).join('\n');

  const routeStepsHtml = m.routeSteps.map((s, i) => {
    const num = s.type === 'start' ? 'START' : s.type === 'goal' ? 'GOAL' : String(i);
    const arrow = (s.type !== 'goal') ? '<div class="route-arrow">↓</div>' : '';
    return `<div class="route-step"><div class="step-num">${num}</div><div class="step-body"><h3>${s.title}</h3><p>${s.desc}</p></div></div>${arrow}`;
  }).join('\n');

  const seasonHtml = m.seasons.map(s => `
    <div class="season-info ${s.type}">
      <div class="season-header"><span class="season-emoji">${s.type==='spring'?'🌸':s.type==='summer'?'☀️':s.type==='autumn'?'🍁':'❄️'}</span><div><h3>${s.title}</h3><div class="season-rating">おすすめ度：${s.rating}</div></div></div>
      <p>${s.text}</p>
    </div>`).join('\n');

  const faqJsonItems = m.faqs.map(f => `{"@type":"Question","name":"${f.q}","acceptedAnswer":{"@type":"Answer","text":"${f.a}"}}`).join(',');

  const faqHtml = m.faqs.map(f => `
    <details style="background:#f0f7f4;border-radius:10px;padding:16px 20px;">
      <summary style="font-weight:700;cursor:pointer;color:#1b4332;">${f.q}</summary>
      <p style="margin-top:10px;color:#333;">${f.a}</p>
    </details>`).join('\n');

  const tipsHtml = m.tips.map(t => `
    <div class="tip-card ${t.type}">
      <span class="tip-icon">${t.icon}</span>
      <div><h3>${t.title}</h3><p>${t.text}</p></div>
    </div>`).join('\n');

  const relatedHtml = m.relatedCourses.map(r => {
    const dc = r.diff === '初級' ? 'easy' : r.diff === '中級' ? 'medium' : 'hard';
    return `<li><a href="${r.file}">${r.name}</a><span class="difficulty ${dc}">${r.diff}</span></li>`;
  }).join('\n');

  const depth = m.file.split('/').length - 1;
  const rel = depth === 2 ? '../../' : '../../../';

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6B5X3RYCC0"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-6B5X3RYCC0');</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${m.nameShort}ハイキング完全ガイド。${m.desc}">
  <meta property="og:title" content="${m.nameShort}ハイキングガイド | にっぽんハイキングガイド">
  <meta property="og:description" content="${m.nameShort}ハイキング完全ガイド。${m.desc}">
  <meta property="og:url" content="${m.ogUrl}">
  <meta property="og:type" content="article">
  <title>${m.nameShort}ハイキングガイド | にっぽんハイキングガイド</title>
  <link rel="stylesheet" href="${rel}css/style.css">
  <link rel="stylesheet" href="${rel}css/course.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${m.nameShort}ハイキングガイド","description":"${m.desc}","author":{"@type":"Organization","name":"にっぽんハイキングガイド"},"datePublished":"2026-06-01"}</script>
  <link rel="canonical" href="${m.canonicalUrl}">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"ホーム","item":"https://nippon-hiking-guide.com/"},{"@type":"ListItem","position":2,"name":"${m.breadcrumb2name}","item":"${m.breadcrumb2url}"},{"@type":"ListItem","position":3,"name":"${m.nameShort}","item":"${m.canonicalUrl}"}]}</script>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faqJsonItems}]}</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5465505378438318" crossorigin="anonymous"></script>
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <div class="logo"><a href="${rel}index.html"><span class="logo-icon">⛰️</span><span class="logo-text">にっぽんハイキングガイド</span></a></div>
      <nav class="global-nav"><ul>
        <li><a href="${rel}index.html#regions">地域から探す</a></li>
        <li><a href="${rel}index.html#difficulty">難易度から探す</a></li>
        <li><a href="${rel}index.html#season">季節から探す</a></li>
        <li><a href="${rel}gear/index.html" class="nav-gear">装備ガイド</a></li>
        <li><a href="${rel}blog/beginner-gear.html">ブログ</a></li>
      </ul></nav>
      <button class="nav-toggle" aria-label="メニュー">&#9776;</button>
    </div>
  </header>
  <nav class="breadcrumb" aria-label="パンくずリスト">
    <div class="container"><ol>
      <li><a href="${rel}index.html">ホーム</a></li>
      <li><a href="${rel}index.html#regions">地域</a></li>
      <li><a href="../">地域</a></li>
      <li>${m.nameShort}</li>
    </ol></div>
  </nav>

  <section class="course-hero">
    <div class="course-hero-bg"><div class="course-hero-placeholder">${m.emoji}</div></div>
    <div class="course-hero-overlay"></div>
    <div class="container course-hero-content">
      <div class="course-badges"><span class="badge-region">${m.region}</span><span class="badge-difficulty ${m.diff}">${m.diffLabel}</span></div>
      <h1 class="course-hero-title">${m.name}</h1>
      <p class="course-hero-sub">${m.prefecture} ／ 標高 ${m.elevation}</p>
      <div class="course-hero-stats">
        <div class="stat-item"><span class="stat-icon">📏</span><span class="stat-label">距離</span><span class="stat-val">${m.distance}</span></div>
        <div class="stat-item"><span class="stat-icon">⏱</span><span class="stat-label">所要時間</span><span class="stat-val">${m.time}</span></div>
        <div class="stat-item"><span class="stat-icon">📈</span><span class="stat-label">標高差</span><span class="stat-val">${m.elevDiff}</span></div>
        <div class="stat-item"><span class="stat-icon">🚃</span><span class="stat-label">最寄り</span><span class="stat-val">${m.access}</span></div>
        <div class="stat-item"><span class="stat-icon">💰</span><span class="stat-label">入山料</span><span class="stat-val">${m.fee}</span></div>
        <div class="stat-item"><span class="stat-icon">📅</span><span class="stat-label">ベストシーズン</span><span class="stat-val">${m.season}</span></div>
      </div>
    </div>
  </section>

  <div class="course-main container">
    <div class="course-body">
      <nav class="toc">
        <h2 class="toc-title">目次</h2>
        <ol>
          <li><a href="#overview">${m.nameShort}の概要</a></li>
          <li><a href="#courses">コース一覧</a></li>
          <li><a href="#route">おすすめルート</a></li>
          <li><a href="#season">季節情報</a></li>
          <li><a href="#access">アクセス・駐車場</a></li>
          <li><a href="#gear">必要な装備</a></li>
          <li><a href="#stay">周辺の宿泊施設</a></li>
          <li><a href="#faq">よくある質問</a></li>
        </ol>
      </nav>

      <section id="overview" class="content-section">
        <h2>${m.nameShort}の概要</h2>
        ${m.overview}
      </section>

      <section id="courses" class="content-section">
        <h2>コース一覧</h2>
        <div class="course-table-wrap">
          <table class="course-table">
            <thead><tr><th>ルート</th><th>距離</th><th>所要時間</th><th>難易度</th><th>特徴</th></tr></thead>
            <tbody>${courseRows}</tbody>
          </table>
        </div>
      </section>

      <section id="route" class="content-section">
        <h2>おすすめルート</h2>
        <div class="route-steps">${routeStepsHtml}</div>
      </section>

      <section id="season" class="content-section">
        <h2>季節情報</h2>
        <div class="season-grid">${seasonHtml}</div>
      </section>

      <section id="access" class="content-section">
        <h2>アクセス・駐車場</h2>
        <div class="access-grid">
          <div class="access-card">
            <h3>🚃 電車・バスでのアクセス</h3>
            <ul class="access-list"><li>${m.accessPublic}</li></ul>
          </div>
          <div class="access-card">
            <h3>🚗 車でのアクセス</h3>
            <ul class="access-list"><li>${m.accessCar}</li></ul>
            <h4>駐車場情報</h4>
            <ul class="access-list"><li>${m.parking}</li></ul>
          </div>
        </div>
      </section>

      <section id="gear" class="content-section">
        <h2>必要な装備</h2>
        <div class="gear-categories">
          <div class="gear-category must">
            <h3>必須アイテム</h3>
            <ul class="gear-list">
              <li class="gear-item"><span class="gear-icon">🥾</span><div class="gear-detail"><strong>登山靴</strong><p>足場に合った靴を選びましょう。</p><a href="${rel}gear/shoes.html" class="gear-link">おすすめ登山靴を見る →</a></div></li>
              <li class="gear-item"><span class="gear-icon">💧</span><div class="gear-detail"><strong>飲料水（1〜2L）</strong><p>行動時間に合わせて十分な水分を準備。</p></div></li>
              <li class="gear-item"><span class="gear-icon">🧥</span><div class="gear-detail"><strong>レインウェア</strong><p>急な天候変化に備えて必携。</p><a href="${rel}gear/rain.html" class="gear-link">おすすめレインウェアを見る →</a></div></li>
            </ul>
          </div>
          <div class="gear-category recommend">
            <h3>あると便利</h3>
            <ul class="gear-list">
              <li class="gear-item"><span class="gear-icon">🎒</span><div class="gear-detail"><strong>ザック（20〜30L）</strong><a href="${rel}gear/pack.html" class="gear-link">おすすめザックを見る →</a></div></li>
              <li class="gear-item"><span class="gear-icon">🥢</span><div class="gear-detail"><strong>トレッキングポール</strong><a href="${rel}gear/pole.html" class="gear-link">おすすめポールを見る →</a></div></li>
            </ul>
          </div>
        </div>
        <div class="gear-cta"><p>装備の詳細はこちら</p><a href="${rel}gear/index.html" class="btn-gear-full">装備ガイドを見る →</a></div>
        <div style="background:#fff8e6;border:2px solid #f77f00;border-radius:12px;padding:20px 24px;margin:24px 0;">
          <h3 style="color:#e06c00;margin-bottom:12px;">Amazonで登山装備を探す</h3>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            <a href="https://www.amazon.co.jp/s?k=登山靴+トレッキングシューズ&tag=nipponhiking2-22" rel="nofollow noopener" target="_blank" style="background:#f77f00;color:white;padding:9px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:.88rem;">🥾 登山靴を探す →</a>
            <a href="https://www.amazon.co.jp/s?k=登山+レインウェア&tag=nipponhiking2-22" rel="nofollow noopener" target="_blank" style="background:#f77f00;color:white;padding:9px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:.88rem;">🧥 レインウェアを探す →</a>
            <a href="https://www.amazon.co.jp/s?k=登山+ザック+バックパック&tag=nipponhiking2-22" rel="nofollow noopener" target="_blank" style="background:#f77f00;color:white;padding:9px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:.88rem;">🎒 ザックを探す →</a>
          </div>
        </div>
      </section>

      <section id="stay" class="content-section">
        <h2>周辺の宿泊施設</h2>
        <div class="hotel-grid">
          <div class="hotel-card">
            <div class="hotel-img-placeholder">🏨</div>
            <div class="hotel-info">
              <span class="hotel-type">宿泊施設</span>
              <h3>${m.hotelArea1}</h3>
              <p>${m.hotelDesc1}</p>
              <a href="//af.moshimo.com/af/c/click?a_id=5506343&p_id=55&pc_id=55&pl_id=629" target="_blank" rel="nofollow noopener" referrerpolicy="no-referrer-when-downgrade" attributionsrc class="btn-hotel">宿泊施設を探す（楽天トラベル）→</a>
            </div>
          </div>
          <div class="hotel-card">
            <div class="hotel-img-placeholder">🏩</div>
            <div class="hotel-info">
              <span class="hotel-type">周辺ホテル</span>
              <h3>${m.hotelArea2}</h3>
              <p>${m.hotelDesc2}</p>
              <a href="//af.moshimo.com/af/c/click?a_id=5506343&p_id=55&pc_id=55&pl_id=629" target="_blank" rel="nofollow noopener" referrerpolicy="no-referrer-when-downgrade" attributionsrc class="btn-hotel">周辺ホテルを探す →</a>
            </div>
          </div>
        </div>
      </section>

      <section class="content-section" id="faq">
        <h2>よくある質問（FAQ）</h2>
        <div style="display:flex;flex-direction:column;gap:16px;margin-top:16px;">
          ${faqHtml}
        </div>
      </section>

      <section class="content-section">
        <h2>関連ブログ記事</h2>
        <ul style="line-height:2;">
          <li><a href="${rel}blog/beginner-gear.html">初心者が最初に揃えるべき登山装備7選</a></li>
          <li><a href="${rel}blog/safety-guide.html">登山の安全対策完全ガイド</a></li>
          <li><a href="${rel}blog/app-guide.html">登山アプリ完全比較2026</a></li>
        </ul>
      </section>

      <section id="tips" class="content-section">
        <h2>注意事項・豆知識</h2>
        <div class="tips-grid">${tipsHtml}</div>
      </section>
    </div>

    <aside class="course-sidebar">
      <div class="sidebar-card summary-card">
        <h3>基本情報まとめ</h3>
        <table class="summary-table">
          <tr><th>山名</th><td>${m.name}</td></tr>
          <tr><th>標高</th><td>${m.elevation}</td></tr>
          <tr><th>所在地</th><td>${m.prefecture}</td></tr>
          <tr><th>難易度</th><td>${m.diffLabel}</td></tr>
          <tr><th>コース距離</th><td>${m.distance}</td></tr>
          <tr><th>所要時間</th><td>${m.time}</td></tr>
          <tr><th>最寄り</th><td>${m.access}</td></tr>
          <tr><th>入山料</th><td>${m.fee}</td></tr>
        </table>
      </div>
      <div class="sidebar-card ad-placeholder">
        <p class="ad-label">広告</p>
        <div class="ad-space"><a href="//af.moshimo.com/af/c/click?a_id=5506332&p_id=6980&pc_id=19965&pl_id=88582" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" attributionsrc><img src="//image.moshimo.com/af-img/6786/000000088582.png" width="300" height="250" style="border:none;"></a><img src="//i.moshimo.com/af/i/impression?a_id=5506332&p_id=6980&pc_id=19965&pl_id=88582" width="1" height="1" style="border:none;" loading="lazy"></div>
      </div>
      <div class="sidebar-card">
        <h3>関連コース</h3>
        <ul class="related-list">${relatedHtml}</ul>
      </div>
      <div class="sidebar-card gear-sidebar-cta">
        <h3>${m.nameShort}に必要な装備</h3>
        <p>安全・快適に登るための装備リストを確認しよう。</p>
        <a href="${rel}gear/index.html" class="btn-sidebar-gear">装備ガイドを見る →</a>
      </div>
    </aside>
  </div>

  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-logo"><span>⛰️</span> にっぽんハイキングガイド</div>
      <nav class="footer-nav"><ul>
        <li><a href="${rel}about.html">このサイトについて</a></li>
        <li><a href="${rel}privacy.html">プライバシーポリシー</a></li>
        <li><a href="${rel}contact.html">お問い合わせ</a></li>
        <li><a href="${rel}sitemap.html">サイトマップ</a></li>
      </ul></nav>
      <p class="footer-copy">&copy; 2026 にっぽんハイキングガイド. All rights reserved.</p>
    </div>
  </footer>
  <script src="${rel}js/main.js"></script>
</body>
</html>`;
}

// Generate pages
let count = 0;
for (const m of mountains) {
  const filePath = path.join(BASE, m.file);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, buildPage(m), 'utf8');
  console.log('Created: ' + m.file);
  count++;
}
console.log(`\nTotal created: ${count} pages`);
