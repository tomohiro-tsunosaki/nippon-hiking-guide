const fs = require('fs');
const path = require('path');
const BASE = 'C:/Users/user/hiking-site';

function makePage(m) {
  const r = '../../';
  const faqJson = m.faqs.map(f => `{"@type":"Question","name":"${f.q.replace(/"/g,"'")}","acceptedAnswer":{"@type":"Answer","text":"${f.a.replace(/"/g,"'").replace(/\n/g,' ')}"}}`).join(',');
  const diffMap = {'easy':'初級','medium':'中級','hard':'上級'};
  const seasonEmoji = {'spring':'🌸','summer':'☀️','autumn':'🍁','winter':'❄️'};

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6B5X3RYCC0"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-6B5X3RYCC0');</script>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${m.short}ハイキング完全ガイド。${m.desc}">
  <meta property="og:title" content="${m.short}ハイキングガイド | にっぽんハイキングガイド">
  <meta property="og:description" content="${m.desc}">
  <meta property="og:url" content="https://nippon-hiking-guide.com/${m.file.replace(/\\/g,'/')}">
  <meta property="og:type" content="article">
  <title>${m.short}ハイキングガイド | にっぽんハイキングガイド</title>
  <link rel="stylesheet" href="${r}css/style.css">
  <link rel="stylesheet" href="${r}css/course.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${m.short}ハイキングガイド","description":"${m.desc}","author":{"@type":"Organization","name":"にっぽんハイキングガイド"},"datePublished":"2026-06-01","url":"https://nippon-hiking-guide.com/${m.file.replace(/\\/g,'/') }"}</script>
  <link rel="canonical" href="https://nippon-hiking-guide.com/${m.file.replace(/\\/g,'/')}">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"ホーム","item":"https://nippon-hiking-guide.com/"},{"@type":"ListItem","position":2,"name":"${m.region}のハイキング","item":"https://nippon-hiking-guide.com/regions/${m.regionSlug}/"},{"@type":"ListItem","position":3,"name":"${m.short}","item":"https://nippon-hiking-guide.com/${m.file.replace(/\\/g,'/')}"}]}</script>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faqJson}]}</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5465505378438318" crossorigin="anonymous"></script>
</head>
<body>
  <header class="site-header"><div class="container header-inner">
    <div class="logo"><a href="${r}index.html"><span class="logo-icon">⛰️</span><span class="logo-text">にっぽんハイキングガイド</span></a></div>
    <nav class="global-nav"><ul>
      <li><a href="${r}index.html#regions">地域から探す</a></li>
      <li><a href="${r}index.html#difficulty">難易度から探す</a></li>
      <li><a href="${r}index.html#season">季節から探す</a></li>
      <li><a href="${r}gear/index.html" class="nav-gear">装備ガイド</a></li>
      <li><a href="${r}blog/beginner-gear.html">ブログ</a></li>
    </ul></nav>
    <button class="nav-toggle" aria-label="メニュー">&#9776;</button>
  </div></header>
  <nav class="breadcrumb" aria-label="パンくずリスト"><div class="container"><ol>
    <li><a href="${r}index.html">ホーム</a></li>
    <li><a href="${r}index.html#regions">地域</a></li>
    <li><a href="./">${m.region}</a></li>
    <li>${m.short}</li>
  </ol></div></nav>
  <section class="course-hero">
    <div class="course-hero-bg"><div class="course-hero-placeholder">${m.emoji}</div></div>
    <div class="course-hero-overlay"></div>
    <div class="container course-hero-content">
      <div class="course-badges"><span class="badge-region">${m.region}</span><span class="badge-difficulty ${m.diff}">${diffMap[m.diff]}</span></div>
      <h1 class="course-hero-title">${m.name}</h1>
      <p class="course-hero-sub">${m.pref} ／ 標高 ${m.elev}</p>
      <div class="course-hero-stats">
        <div class="stat-item"><span class="stat-icon">📏</span><span class="stat-label">距離</span><span class="stat-val">${m.dist}</span></div>
        <div class="stat-item"><span class="stat-icon">⏱</span><span class="stat-label">所要時間</span><span class="stat-val">${m.time}</span></div>
        <div class="stat-item"><span class="stat-icon">📈</span><span class="stat-label">標高差</span><span class="stat-val">${m.ediff}</span></div>
        <div class="stat-item"><span class="stat-icon">🚃</span><span class="stat-label">最寄り</span><span class="stat-val">${m.access}</span></div>
        <div class="stat-item"><span class="stat-icon">💰</span><span class="stat-label">入山料</span><span class="stat-val">${m.fee}</span></div>
        <div class="stat-item"><span class="stat-icon">📅</span><span class="stat-label">ベストシーズン</span><span class="stat-val">${m.season}</span></div>
      </div>
    </div>
  </section>
  <div class="course-main container">
    <div class="course-body">
      <nav class="toc"><h2 class="toc-title">目次</h2><ol>
        <li><a href="#overview">${m.short}の概要</a></li>
        <li><a href="#courses">コース一覧</a></li>
        <li><a href="#route">おすすめルート</a></li>
        <li><a href="#season">季節情報</a></li>
        <li><a href="#access">アクセス・駐車場</a></li>
        <li><a href="#gear">必要な装備</a></li>
        <li><a href="#stay">周辺の宿泊施設</a></li>
        <li><a href="#faq">よくある質問</a></li>
      </ol></nav>

      <section id="overview" class="content-section">
        <h2>${m.short}の概要</h2>
        ${m.overview}
      </section>

      <section id="courses" class="content-section">
        <h2>コース一覧</h2>
        <div class="course-table-wrap"><table class="course-table">
          <thead><tr><th>ルート</th><th>距離</th><th>所要時間</th><th>難易度</th><th>特徴</th></tr></thead>
          <tbody>
            ${m.courses.map(c => {
              const dc = c.lv === '初級' ? 'easy' : c.lv === '中級' ? 'medium' : 'hard';
              const rec = c.n.includes('★') ? ' class="recommended-row"' : '';
              return `<tr${rec}><td><strong>${c.n}</strong></td><td>${c.d}</td><td>${c.t}</td><td><span class="difficulty ${dc}">${c.lv}</span></td><td>${c.note}</td></tr>`;
            }).join('\n')}
          </tbody>
        </table></div>
      </section>

      <section id="route" class="content-section">
        <h2>おすすめルート</h2>
        <div class="route-steps">
          ${m.steps.map((s, i) => {
            const num = s.tp === 'start' ? 'START' : s.tp === 'goal' ? 'GOAL' : String(i);
            const arr = s.tp !== 'goal' ? '<div class="route-arrow">↓</div>' : '';
            return `<div class="route-step"><div class="step-num">${num}</div><div class="step-body"><h3>${s.ti}</h3><p>${s.de}</p></div></div>${arr}`;
          }).join('\n')}
        </div>
      </section>

      <section id="season" class="content-section">
        <h2>季節情報</h2>
        <div class="season-grid">
          ${m.seas.map(s => `<div class="season-info ${s.tp}"><div class="season-header"><span class="season-emoji">${seasonEmoji[s.tp]}</span><div><h3>${s.ti}</h3><div class="season-rating">おすすめ度：${s.rt}</div></div></div><p>${s.tx}</p></div>`).join('\n')}
        </div>
      </section>

      <section id="access" class="content-section">
        <h2>アクセス・駐車場</h2>
        <div class="access-grid">
          <div class="access-card"><h3>🚃 電車・バスでのアクセス</h3><ul class="access-list"><li>${m.apub}</li></ul></div>
          <div class="access-card"><h3>🚗 車でのアクセス</h3><ul class="access-list"><li>${m.acar}</li></ul><h4>駐車場情報</h4><ul class="access-list"><li>${m.park}</li></ul></div>
        </div>
      </section>

      <section id="gear" class="content-section">
        <h2>必要な装備</h2>
        <div class="gear-categories">
          <div class="gear-category must"><h3>必須アイテム</h3><ul class="gear-list">
            <li class="gear-item"><span class="gear-icon">🥾</span><div class="gear-detail"><strong>登山靴</strong><p>足場に合った靴を選びましょう。</p><a href="${r}gear/shoes.html" class="gear-link">おすすめ登山靴を見る →</a></div></li>
            <li class="gear-item"><span class="gear-icon">💧</span><div class="gear-detail"><strong>飲料水（1.5〜2L）</strong><p>行動時間に合わせて十分な水分を準備。</p></div></li>
            <li class="gear-item"><span class="gear-icon">🧥</span><div class="gear-detail"><strong>レインウェア</strong><p>急な天候変化に備えて必携。</p><a href="${r}gear/rain.html" class="gear-link">おすすめを見る →</a></div></li>
          </ul></div>
          <div class="gear-category recommend"><h3>あると便利</h3><ul class="gear-list">
            <li class="gear-item"><span class="gear-icon">🎒</span><div class="gear-detail"><strong>ザック（20〜30L）</strong><a href="${r}gear/pack.html" class="gear-link">おすすめを見る →</a></div></li>
            <li class="gear-item"><span class="gear-icon">🥢</span><div class="gear-detail"><strong>トレッキングポール</strong><a href="${r}gear/pole.html" class="gear-link">おすすめを見る →</a></div></li>
          </ul></div>
        </div>
        <div class="gear-cta"><p>装備の詳細はこちら</p><a href="${r}gear/index.html" class="btn-gear-full">装備ガイドを見る →</a></div>
        <div style="background:#fff8e6;border:2px solid #f77f00;border-radius:12px;padding:20px 24px;margin:24px 0;">
          <h3 style="color:#e06c00;margin-bottom:12px;">Amazonで登山装備を探す</h3>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            <a href="https://www.amazon.co.jp/s?k=%E7%99%BB%E5%B1%B1%E9%9D%B4&tag=nipponhiking2-22" rel="nofollow noopener" target="_blank" style="background:#f77f00;color:white;padding:9px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:.88rem;">🥾 登山靴 →</a>
            <a href="https://www.amazon.co.jp/s?k=%E7%99%BB%E5%B1%B1+%E3%83%AC%E3%82%A4%E3%83%B3%E3%82%A6%E3%82%A7%E3%82%A2&tag=nipponhiking2-22" rel="nofollow noopener" target="_blank" style="background:#f77f00;color:white;padding:9px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:.88rem;">🧥 レインウェア →</a>
            <a href="https://www.amazon.co.jp/s?k=%E7%99%BB%E5%B1%B1+%E3%82%B6%E3%83%83%E3%82%AF&tag=nipponhiking2-22" rel="nofollow noopener" target="_blank" style="background:#f77f00;color:white;padding:9px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:.88rem;">🎒 ザック →</a>
          </div>
        </div>
      </section>

      <section id="stay" class="content-section">
        <h2>周辺の宿泊施設</h2>
        <div class="hotel-grid">
          <div class="hotel-card"><div class="hotel-img-placeholder">🏨</div><div class="hotel-info">
            <span class="hotel-type">宿泊施設</span><h3>${m.ha1}</h3><p>${m.hd1}</p>
            <a href="//af.moshimo.com/af/c/click?a_id=5506343&p_id=55&pc_id=55&pl_id=629" target="_blank" rel="nofollow noopener" referrerpolicy="no-referrer-when-downgrade" attributionsrc class="btn-hotel">宿泊施設を探す（楽天トラベル）→</a>
          </div></div>
          <div class="hotel-card"><div class="hotel-img-placeholder">⛺</div><div class="hotel-info">
            <span class="hotel-type">周辺ホテル</span><h3>${m.ha2}</h3><p>${m.hd2}</p>
            <a href="//af.moshimo.com/af/c/click?a_id=5506343&p_id=55&pc_id=55&pl_id=629" target="_blank" rel="nofollow noopener" referrerpolicy="no-referrer-when-downgrade" attributionsrc class="btn-hotel">周辺ホテルを探す →</a>
          </div></div>
        </div>
      </section>

      <section class="content-section" id="faq">
        <h2>よくある質問（FAQ）</h2>
        <div style="display:flex;flex-direction:column;gap:16px;margin-top:16px;">
          ${m.faqs.map(f => `<details style="background:#f0f7f4;border-radius:10px;padding:16px 20px;"><summary style="font-weight:700;cursor:pointer;color:#1b4332;">${f.q}</summary><p style="margin-top:10px;color:#333;">${f.a}</p></details>`).join('\n')}
        </div>
      </section>

      <section class="content-section">
        <h2>関連ブログ記事</h2>
        <ul style="line-height:2;">
          <li><a href="${r}blog/beginner-gear.html">初心者が最初に揃えるべき登山装備7選</a></li>
          <li><a href="${r}blog/safety-guide.html">登山の安全対策完全ガイド</a></li>
          <li><a href="${r}blog/app-guide.html">登山アプリ完全比較2026</a></li>
        </ul>
      </section>

      <section id="tips" class="content-section">
        <h2>注意事項・豆知識</h2>
        <div class="tips-grid">
          ${m.tips.map(t => `<div class="tip-card ${t.tp}"><span class="tip-icon">${t.ic}</span><div><h3>${t.ti}</h3><p>${t.tx}</p></div></div>`).join('\n')}
        </div>
      </section>
    </div>

    <aside class="course-sidebar">
      <div class="sidebar-card summary-card"><h3>基本情報まとめ</h3>
        <table class="summary-table">
          <tr><th>山名</th><td>${m.name}</td></tr>
          <tr><th>標高</th><td>${m.elev}</td></tr>
          <tr><th>所在地</th><td>${m.pref}</td></tr>
          <tr><th>難易度</th><td>${diffMap[m.diff]}</td></tr>
          <tr><th>距離</th><td>${m.dist}</td></tr>
          <tr><th>所要時間</th><td>${m.time}</td></tr>
          <tr><th>最寄り</th><td>${m.access}</td></tr>
          <tr><th>入山料</th><td>${m.fee}</td></tr>
        </table>
      </div>
      <div class="sidebar-card ad-placeholder"><p class="ad-label">広告</p>
        <div class="ad-space"><a href="//af.moshimo.com/af/c/click?a_id=5506332&p_id=6980&pc_id=19965&pl_id=88582" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" attributionsrc><img src="//image.moshimo.com/af-img/6786/000000088582.png" width="300" height="250" style="border:none;"></a><img src="//i.moshimo.com/af/i/impression?a_id=5506332&p_id=6980&pc_id=19965&pl_id=88582" width="1" height="1" style="border:none;" loading="lazy"></div>
      </div>
      <div class="sidebar-card"><h3>関連コース</h3>
        <ul class="related-list">
          ${m.rel.map(r2 => {const dc=r2.d==='初級'?'easy':r2.d==='中級'?'medium':'hard';return `<li><a href="${r2.f}">${r2.n}</a><span class="difficulty ${dc}">${r2.d}</span></li>`;}).join('\n')}
        </ul>
      </div>
      <div class="sidebar-card gear-sidebar-cta">
        <h3>${m.short}に必要な装備</h3>
        <p>安全・快適に登るための装備リスト。</p>
        <a href="${r}gear/index.html" class="btn-sidebar-gear">装備ガイドを見る →</a>
      </div>
    </aside>
  </div>
  <footer class="site-footer"><div class="container footer-inner">
    <div class="footer-logo"><span>⛰️</span> にっぽんハイキングガイド</div>
    <nav class="footer-nav"><ul>
      <li><a href="${r}about.html">このサイトについて</a></li>
      <li><a href="${r}privacy.html">プライバシーポリシー</a></li>
      <li><a href="${r}contact.html">お問い合わせ</a></li>
      <li><a href="${r}sitemap.html">サイトマップ</a></li>
    </ul></nav>
    <p class="footer-copy">&copy; 2026 にっぽんハイキングガイド. All rights reserved.</p>
  </div></footer>
  <script src="${r}js/main.js"></script>
</body>
</html>`;
}

const data = [
  {file:'regions/hokkaido/youteizan.html',regionSlug:'hokkaido',name:'羊蹄山（ようていざん）',short:'羊蹄山',region:'北海道',pref:'北海道虻田郡倶知安町',diff:'hard',elev:'1,898m',dist:'約15km',time:'7〜9時間',ediff:'約1,500m',access:'倶知安駅（タクシー）',fee:'無料',season:'6〜9月',emoji:'🏔️',
    desc:'蝦夷富士の別名を持つ北海道の秀峰。端正な円錐形が美しい日本百名山。全コース7〜9時間の本格登山で高山植物も豊富。',
    overview:'<p>羊蹄山（ようていざん）は北海道倶知安町に位置する標高1,898mの美しい独立峰です。「蝦夷富士」の別名通り端正な円錐形の山容は北海道随一の存在感を誇り、日本百名山のひとつです。</p><p>山頂のお鉢（火口周辺）を一周するお鉢巡りが名物。高山植物の宝庫でもあり、7〜8月には多彩な花が咲き誇ります。比羅夫コースが最もポピュラーです。</p>',
    courses:[{n:'比羅夫コース ★',d:'約15km',t:'7〜9時間',lv:'上級',note:'最ポピュラー。0合目から山頂往復'},{n:'真狩コース',d:'約14km',t:'7〜8時間',lv:'上級',note:'南側から登る変化に富むルート'}],
    steps:[{tp:'start',ti:'比羅夫登山口（0合目・標高400m）',de:'駐車場・登山届ポストあり。'},{tp:'step',ti:'5合目（標高約1,100m）',de:'水場あり（要煮沸）。展望が開け始める。'},{tp:'step',ti:'お花畑',de:'高山植物が密集する絶景地点。'},{tp:'goal',ti:'山頂・お鉢（標高1,898m）',de:'360度の大展望。お鉢巡りは約40分で一周。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★☆☆',tx:'残雪が残る。6月下旬まで雪渓あり。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'高山植物が最盛期。登山のベストシーズン。'},{tp:'autumn',ti:'秋（9月）',rt:'★★★★☆',tx:'草紅葉が美しい。10月には積雪の可能性あり。'},{tp:'winter',ti:'冬（10〜5月）',rt:'★☆☆☆☆',tx:'積雪期は一般登山不可。'}],
    apub:'倶知安駅からタクシーで比羅夫登山口まで約15分',acar:'道央道倶知安ICから登山口まで約5km',park:'比羅夫登山口駐車場（無料・約50台）',
    ha1:'洞爺湖温泉のホテル',hd1:'麓の洞爺湖温泉に多数のホテル・旅館。登山前後の宿泊に最適。',ha2:'倶知安・ニセコのホテル',hd2:'倶知安駅周辺やニセコリゾートの宿泊施設。',
    faqs:[{q:'羊蹄山は日帰りで登れますか？',a:'体力があれば日帰り可能ですが、標高差1,500m・7〜9時間の行程は体力的にきつい。早朝4〜5時出発が必須です。'},{q:'登山適期はいつですか？',a:'7〜8月が高山植物も見頃でベスト。積雪は例年6月中旬まで、10月上旬から降雪があるため実質的な登山シーズンは6月下旬〜9月。'},{q:'熊はいますか？',a:'北海道全域にヒグマが生息しており羊蹄山周辺も例外ではありません。熊鈴必携、複数人での登山を推奨します。'},{q:'水場はありますか？',a:'5合目付近（比羅夫コース）に水場があります。ただし必ず煮沸またはフィルター処理してから飲用してください。'},{q:'アクセス方法を教えてください',a:'倶知安駅からタクシーで比羅夫登山口まで約15分。マイカーの場合は道央道倶知安ICから約5km。'}],
    tips:[{tp:'caution',ic:'🐻',ti:'ヒグマ対策必須',tx:'北海道全域にヒグマが生息。熊鈴・複数人登山・熊スプレー携行を推奨。単独行は避けること。'},{tp:'caution',ic:'⛄',ti:'積雪・降雪に注意',tx:'10月には山頂付近で降雪あり。天気予報を必ず確認し、防寒具を十分に準備すること。'},{tp:'tip',ic:'💧',ti:'お鉢巡りがおすすめ',tx:'山頂のお鉢（直径約700m）を一周する「お鉢巡り」は約40分。羊蹄山ならではの絶景を楽しめる。'}],
    rel:[{f:'daisetsuzan.html',n:'大雪山（北海道）',d:'中級'},{f:'shiretoko.html',n:'知床（北海道）',d:'中級'},{f:'rishirizan.html',n:'利尻山（北海道）',d:'上級'}]},

  {file:'regions/hokkaido/rishirizan.html',regionSlug:'hokkaido',name:'利尻山（りしりざん）',short:'利尻山',region:'北海道',pref:'北海道利尻島',diff:'hard',elev:'1,721m',dist:'約10km',time:'8〜10時間',ediff:'約1,550m',access:'利尻島・鴛泊フェリーターミナル',fee:'保全協力金500円（任意）',season:'6〜9月',emoji:'🌊',
    desc:'利尻島に聳える孤高の独立峰・利尻富士。海越しに見る山容は日本随一の絶景。日本百名山。',
    overview:'<p>利尻山（りしりざん）は北海道最北の利尻島に聳える標高1,721mの独立峰です。「利尻富士」の別名を持ち、オホーツク海に浮かぶ孤島から天に向かって聳える姿は壮大です。日本百名山のひとつ。</p><p>島全体が利尻礼文サロベツ国立公園に指定されており、固有種の高山植物（リシリヒナゲシ等）が見られます。エスケープルートがないため天候判断が特に重要です。</p>',
    courses:[{n:'鴛泊コース（北側） ★',d:'約10km',t:'8〜10時間',lv:'上級',note:'一般的な登山ルート。5合目登山口から'},{n:'沓形コース（南側）',d:'約10km',t:'8〜10時間',lv:'上級',note:'静かなルート。道が険しい箇所あり'}],
    steps:[{tp:'start',ti:'5合目登山口（標高220m）',de:'鴛泊港からタクシーまたは徒歩約1時間。'},{tp:'step',ti:'8合目（長官山・標高1,218m）',de:'利尻山の全貌が初めて見える展望地。'},{tp:'step',ti:'9合目（標高約1,410m）',de:'砂礫地帯が始まる。足場が不安定。'},{tp:'goal',ti:'山頂（標高1,721m）',de:'360度の大展望。晴れれば礼文島・サハリンまで見える。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★☆☆',tx:'雪渓が残る。6月下旬まで残雪あり要注意。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'高山植物最盛期。島ならではの澄んだ空気。'},{tp:'autumn',ti:'秋（9月）',rt:'★★★★☆',tx:'草紅葉が美しい。'},{tp:'winter',ti:'冬（10〜5月）',rt:'☆☆☆☆☆',tx:'一般登山不可。'}],
    apub:'稚内港からフェリー約1時間45分で鴛泊港。5合目登山口までタクシーまたは徒歩。',acar:'島内のレンタカーまたはタクシー利用。',park:'5合目登山口に駐車場あり（無料）',
    ha1:'鴛泊・沓形の旅館・民宿',hd1:'利尻島内の旅館や民宿。ウニ料理が名物。前泊・後泊に最適。',ha2:'稚内のホテル',hd2:'フェリー乗り場のある稚内市内のホテル。',
    faqs:[{q:'フェリーのアクセスを教えてください',a:'稚内港からハートランドフェリーで鴛泊港まで約1時間45分（高速船は約40分）。礼文島経由便もあり。'},{q:'日帰り登山はできますか？',a:'島に宿泊して翌朝から登るのが一般的。日帰りフェリーの場合、早朝便で到着後すぐ登山すれば可能ですが、天候不良時のリスクが高い。'},{q:'山頂の岩場は危険ですか？',a:'9合目以上は砂礫・岩場が続き、風が強い日は特に危険。ヘルメット着用を推奨する登山者も多い。'},{q:'ベストシーズンはいつですか？',a:'7月上旬〜8月下旬。高山植物が最も豊かで天候が比較的安定する。'},{q:'礼文島と組み合わせて観光できますか？',a:'可能。フェリーで礼文島とセットで観光するプランが人気。利尻登山+礼文トレッキングで2〜3泊がおすすめ。'}],
    tips:[{tp:'caution',ic:'🌬️',ti:'天候変化が激しい',tx:'島山のため気象変化が急激。強風・霧・雨が突然来ることがある。風速10m/s以上の予報があれば中止を検討。'},{tp:'caution',ic:'🚫',ti:'エスケープルートなし',tx:'一度登り始めたら山頂か登山口しか選択肢がない。体調管理と天候判断が特に重要。'},{tp:'tip',ic:'🦪',ti:'登山後はウニ料理を',tx:'利尻昆布で育つ利尻のウニは絶品。登山後の宿の夕食または港の食堂でぜひ。'}],
    rel:[{f:'daisetsuzan.html',n:'大雪山（北海道）',d:'中級'},{f:'youteizan.html',n:'羊蹄山（北海道）',d:'上級'}]},

  {file:'regions/hokkaido/tokachidake.html',regionSlug:'hokkaido',name:'十勝岳（とかちだけ）',short:'十勝岳',region:'北海道',pref:'北海道空知郡上富良野町',diff:'medium',elev:'2,077m',dist:'約8km',time:'5〜6時間',ediff:'約690m',access:'上富良野駅（タクシー）',fee:'無料',season:'7〜9月',emoji:'🌋',
    desc:'活火山の荒涼とした火山地形と美瑛・富良野の丘が望める北海道の百名山。望岳台から登れる中級コース。',
    overview:'<p>十勝岳（とかちだけ）は北海道中央部に位置する活火山で、標高2,077m。日本百名山のひとつです。荒涼とした溶岩台地・火口・砂礫の独特な景観が広がります。</p><p>麓には美瑛・富良野のカラフルな丘が広がり、山頂からの眺望は絶景。噴火警戒レベルの確認が必須ですが、望岳台（1,390m）まで車で行けるため実質の標高差は約690mと中級者向けです。</p>',
    courses:[{n:'望岳台コース ★',d:'約8km',t:'5〜6時間',lv:'中級',note:'最短・ポピュラー。望岳台（1,390m）から'},{n:'吹上温泉コース',d:'約12km',t:'7〜8時間',lv:'中級',note:'吹上温泉側から。変化に富む'}],
    steps:[{tp:'start',ti:'望岳台（標高1,390m）',de:'駐車場・ビジターセンターあり。ここまで車でアクセス可能。'},{tp:'step',ti:'避難小屋（標高1,680m）',de:'緊急時の避難施設。ここから急登が始まる。'},{tp:'step',ti:'昭和火口縁（標高約1,900m）',de:'噴火の痕跡が生々しい。ガスに注意。'},{tp:'goal',ti:'山頂（標高2,077m）',de:'360度の展望。富良野・美瑛の丘・大雪山系が一望。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★☆☆',tx:'残雪あり。アイゼン必要な場合も。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'登山ベストシーズン。高山植物も見頃。'},{tp:'autumn',ti:'秋（9月）',rt:'★★★★☆',tx:'草紅葉が美しい。涼しく歩きやすい。'},{tp:'winter',ti:'冬（10〜6月）',rt:'★☆☆☆☆',tx:'一般登山不可。'}],
    apub:'JR富良野線上富良野駅から登山バス（夏季）または望岳台までタクシー約20分',acar:'道央道滝川ICから国道38・452号経由で望岳台まで約1時間',park:'望岳台駐車場（無料・約100台）',
    ha1:'白金温泉・吹上温泉の宿',hd1:'山麓の白金温泉・吹上温泉（野湯も有名）に旅館あり。',ha2:'富良野・美瑛のホテル',hd2:'観光地として有名な富良野・美瑛エリアに多数の宿泊施設。',
    faqs:[{q:'噴火の危険はありますか？',a:'十勝岳は活火山です。気象庁の噴火警戒レベルを事前確認してください。レベル1（通常）なら登山可能。最新情報は気象庁公式サイトで。'},{q:'望岳台からの難易度は？',a:'望岳台（1,390m）から山頂（2,077m）まで標高差約690m・片道約4km。急登ですが道は明瞭で中級登山者向け。'},{q:'富良野・美瑛とセットで観光できますか？',a:'可能。十勝岳登山後に美瑛の丘・富良野のラベンダー観光を組み合わせるプランが人気。7〜8月がベスト。'},{q:'残雪期のアイゼンは必要ですか？',a:'6月下旬まで雪渓が残ることがあります。チェーンスパイクまたは軽アイゼンを携行すると安心。'},{q:'火山性ガスは危険ですか？',a:'火口付近では硫化水素等のガスが発生することがあります。気分が悪くなったらすぐ離れてください。'}],
    tips:[{tp:'caution',ic:'🌋',ti:'活火山の情報確認',tx:'登山前に気象庁の噴火警戒レベルを必ず確認。レベル2以上は登山禁止となります。'},{tp:'tip',ic:'🌸',ti:'美瑛・富良野観光と組み合わせ',tx:'山頂から美瑛の丘・富良野のラベンダー畑が眼下に見える。下山後の観光もセットで計画を。'},{tp:'info',ic:'🚗',ti:'望岳台まで車でアクセス可',tx:'標高1,390mの望岳台まで舗装路で行けるため、実質的な登山区間が短い中級者向きの山。'}],
    rel:[{f:'daisetsuzan.html',n:'大雪山（北海道）',d:'中級'},{f:'youteizan.html',n:'羊蹄山（北海道）',d:'上級'}]},

  {file:'regions/hokkaido/niseko.html',regionSlug:'hokkaido',name:'ニセコ・ワイスホルン',short:'ニセコ',region:'北海道',pref:'北海道虻田郡倶知安町',diff:'easy',elev:'1,044m',dist:'約5km',time:'2〜3時間',ediff:'約300m',access:'倶知安駅',fee:'無料',season:'6〜10月',emoji:'⛷️',
    desc:'世界屈指のパウダースノーで有名なニセコの夏ハイキング。羊蹄山を望む大展望台として人気の初級コース。',
    overview:'<p>ニセコ・ワイスホルンはニセコアンヌプリの北に位置するなだらかな山で標高1,044m。冬は世界中からスキーヤーが集まるリゾートとして有名ですが、夏は羊蹄山を望む絶好のハイキングコースとして楽しめます。</p><p>ゴンドラを利用すれば比較的短時間でハイキングを楽しめます（夏季運行要確認）。家族連れや軽ハイキングを楽しみたい方に最適です。</p>',
    courses:[{n:'ゴンドラ利用コース ★',d:'約5km',t:'2〜3時間',lv:'初級',note:'ゴンドラ夏季運行時（要確認）'},{n:'麓から登山道',d:'約8km',t:'4〜5時間',lv:'初級',note:'体力に自信がある方向け'}],
    steps:[{tp:'start',ti:'ニセコアンヌプリゴンドラ乗り場',de:'夏季ゴンドラ運行時はここから。運行期間は要確認。'},{tp:'step',ti:'山腹（標高約800m）',de:'羊蹄山の美しい姿が正面に見える。ニセコ連山の展望が広がる。'},{tp:'goal',ti:'ワイスホルン山頂（1,044m）',de:'羊蹄山・ニセコ連峰の大展望。快晴時は遠く積丹半島まで見える。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★☆☆',tx:'残雪あり。6月中旬から登山可能になることが多い。'},{tp:'summer',ti:'夏（7〜9月）',rt:'★★★★☆',tx:'ハイキングのベストシーズン。高山の風が気持ちいい。'},{tp:'autumn',ti:'秋（10月）',rt:'★★★★☆',tx:'紅葉が美しい。10月下旬から積雪の可能性あり。'},{tp:'winter',ti:'冬（11〜4月）',rt:'★★★★★',tx:'スキーシーズン。世界最高峰のパウダースノー。'}],
    apub:'JR函館本線倶知安駅からニセコリゾート行きバスまたはタクシー',acar:'道央道倶知安ICから国道5号経由でニセコスキー場まで約10分',park:'ニセコアンヌプリ国際スキー場駐車場（無料）',
    ha1:'ニセコのリゾートホテル',hd1:'国際的なリゾートエリアのため外資系高級ホテルから旅館まで多数。',ha2:'倶知安・真狩のホテル',hd2:'倶知安駅周辺や真狩村の宿泊施設。羊蹄山登山拠点にも。',
    faqs:[{q:'夏季のゴンドラは運行していますか？',a:'運行期間・時間はシーズンによって変わります。ニセコアンヌプリ国際スキー場の公式サイトで最新情報を確認してください。'},{q:'羊蹄山との違いは？',a:'ニセコは初級向けで気軽に楽しめる山。羊蹄山は上級向けで7〜9時間の本格登山。目的に合わせて選びましょう。'},{q:'家族連れでも楽しめますか？',a:'ゴンドラ利用コースは小学生以上なら十分楽しめます。山上の景色は格別で、家族でのハイキングに最適。'},{q:'ニセコでのアクセス方法は？',a:'倶知安駅からバスまたはタクシーでニセコ各スキー場へ。新千歳空港からのシャトルバスも運行しています。'}],
    tips:[{tp:'info',ic:'🌏',ti:'国際的なリゾート',tx:'ニセコは外国人観光客が多い国際的なリゾート。英語対応の施設も多い。'},{tp:'tip',ic:'🎿',ti:'スキーとのセット旅行も人気',tx:'春スキー（3〜4月）と登山をセットにした旅行プランも人気。ゴールデンウィーク頃までスキー可能な年もある。'},{tp:'caution',ic:'🐻',ti:'熊出没情報を確認',tx:'北海道全域でヒグマが生息。登山前に地元の最新情報を確認してください。'}],
    rel:[{f:'youteizan.html',n:'羊蹄山（北海道）',d:'上級'},{f:'daisetsuzan.html',n:'大雪山（北海道）',d:'中級'}]},

  {file:'regions/hokkaido/rausudake.html',regionSlug:'hokkaido',name:'羅臼岳（らうすだけ）',short:'羅臼岳',region:'北海道',pref:'北海道目梨郡羅臼町（知床半島）',diff:'hard',elev:'1,661m',dist:'約15km',time:'8〜10時間',ediff:'約1,400m',access:'JR知床斜里駅（バス）',fee:'入山届必須',season:'7〜9月',emoji:'🐻',
    desc:'世界自然遺産・知床半島の最高峰。ヒグマの密度が日本最高レベル。ガイド同行または複数人での登山が強く推奨される上級コース。',
    overview:'<p>羅臼岳（らうすだけ）は世界自然遺産・知床半島の最高峰（標高1,661m）です。日本百名山のひとつで、知床半島の大自然を体感できる本格登山ルートです。</p><p>知床はヒグマの密度が日本最高レベルで、登山者はガイド同行または複数人での行動が強く推奨されます。山頂からは国後島・オホーツク海の絶景が広がります。</p>',
    courses:[{n:'木下小屋コース（唯一の一般登山道） ★',d:'約15km',t:'8〜10時間',lv:'上級',note:'羅臼温泉側からの標準ルート'}],
    steps:[{tp:'start',ti:'木下小屋（標高約270m）',de:'羅臼温泉街の道路沿い。登山届必須。'},{tp:'step',ti:'弥三吉水（標高約800m）',de:'水場あり（要煮沸）。ここまで急登が続く。'},{tp:'step',ti:'羅臼平（標高約1,420m）',de:'広い平地。キャンプ指定地あり。ヒグマ出没情報を確認。'},{tp:'goal',ti:'山頂（標高1,661m）',de:'知床連山・国後島・オホーツク海の大展望。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★☆☆',tx:'残雪が多い。7月まで雪渓あり。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'登山ベストシーズン。ヒグマも活発なため注意。'},{tp:'autumn',ti:'秋（9月）',rt:'★★★★☆',tx:'紅葉が美しい。10月から積雪の可能性。'},{tp:'winter',ti:'冬（10〜6月）',rt:'☆☆☆☆☆',tx:'一般登山不可。'}],
    apub:'JR知床斜里駅からバスでウトロ温泉または羅臼方面へ。木下小屋は羅臼温泉バス停から徒歩約5分。',acar:'知床峠を経由して羅臼側へ。羅臼温泉街に駐車場あり。',park:'木下小屋付近の駐車スペース（限定）',
    ha1:'羅臼温泉の旅館・民宿',hd1:'登山口近くの羅臼温泉に旅館・民宿あり。前泊後泊に便利。',ha2:'ウトロ温泉のホテル',hd2:'知床観光の拠点・ウトロ温泉に多数の宿泊施設。',
    faqs:[{q:'ヒグマ対策を具体的に教えてください',a:'熊鈴を常時着用、複数人（3人以上推奨）で行動、食料はヒグマ対策コンテナに保管、死骸・糞を発見したら引き返す、早朝・夕方の単独行は避けること。知床財団のガイドラインも参照を。'},{q:'ガイド同行は必須ですか？',a:'法的義務ではありませんが、知床財団・羅臼町観光協会は強く推奨しています。初めての方は地元認定ガイドと同行するのが最善です。'},{q:'登山届はどこで提出しますか？',a:'木下小屋にある登山届ポストに提出。またはコンパス（web）でオンライン提出も可。提出は義務ではないが強く推奨。'},{q:'ベストシーズンはいつですか？',a:'7月〜8月下旬。残雪が解け、天候も比較的安定する時期がベスト。'},{q:'知床五湖との組み合わせ観光は？',a:'可能。登山前日に知床五湖の地上遊歩道ツアーに参加して知床を予習するプランがおすすめ。'}],
    tips:[{tp:'caution',ic:'🐻',ti:'ヒグマは本物の危険',tx:'知床のヒグマは野生個体で攻撃性が高い場合も。単独登山は絶対避け、グループで熊鈴を鳴らし続けること。'},{tp:'caution',ic:'📋',ti:'登山届の提出を',tx:'必ず登山届を提出し、下山後も届出を。入山時刻・ルート・人数を正確に記入すること。'},{tp:'tip',ic:'🌊',ti:'知床の大自然を体感',tx:'世界自然遺産に登録された原始の自然が残る知床。山頂からオホーツク海と国後島を望む景色はここでしか見られない。'}],
    rel:[{f:'daisetsuzan.html',n:'大雪山（北海道）',d:'中級'},{f:'shiretoko.html',n:'知床（北海道）',d:'中級'}]},
];

let count = 0;
for (const m of data) {
  const fp = path.join(BASE, m.file);
  const dir = path.dirname(fp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});
  fs.writeFileSync(fp, makePage(m), 'utf8');
  console.log('OK: ' + m.file);
  count++;
}
console.log('Done: ' + count + ' pages');
