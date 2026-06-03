const fs = require('fs');
const path = require('path');
const BASE = 'C:/Users/user/hiking-site';

function makePage(m) {
  const r = '../../';
  const faqJson = m.faqs.map(f => `{"@type":"Question","name":"${f.q.replace(/"/g,"'").replace(/\n/g,' ')}","acceptedAnswer":{"@type":"Answer","text":"${f.a.replace(/"/g,"'").replace(/\n/g,' ')}"}}`).join(',');
  const diffMap = {'easy':'初級','medium':'中級','hard':'上級'};
  const sEmoji = {'spring':'🌸','summer':'☀️','autumn':'🍁','winter':'❄️'};
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6B5X3RYCC0"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-6B5X3RYCC0');</script>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${m.short}ハイキング完全ガイド。${m.desc}">
  <meta property="og:title" content="${m.short}ハイキングガイド | にっぽんハイキングガイド">
  <meta property="og:description" content="${m.desc}">
  <meta property="og:url" content="https://nippon-hiking-guide.com/${m.file}">
  <meta property="og:type" content="article">
  <title>${m.short}ハイキングガイド | にっぽんハイキングガイド</title>
  <link rel="stylesheet" href="${r}css/style.css"><link rel="stylesheet" href="${r}css/course.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${m.short}ハイキングガイド","description":"${m.desc}","author":{"@type":"Organization","name":"にっぽんハイキングガイド"},"datePublished":"2026-06-01","url":"https://nippon-hiking-guide.com/${m.file}"}</script>
  <link rel="canonical" href="https://nippon-hiking-guide.com/${m.file}">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"ホーム","item":"https://nippon-hiking-guide.com/"},{"@type":"ListItem","position":2,"name":"${m.region}のハイキング","item":"https://nippon-hiking-guide.com/regions/${m.regionSlug}/"},{"@type":"ListItem","position":3,"name":"${m.short}","item":"https://nippon-hiking-guide.com/${m.file}"}]}</script>
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
    <li><a href="${r}index.html">ホーム</a></li><li><a href="${r}index.html#regions">地域</a></li>
    <li><a href="./">${m.region}</a></li><li>${m.short}</li>
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
        <li><a href="#overview">${m.short}の概要</a></li><li><a href="#courses">コース一覧</a></li>
        <li><a href="#route">おすすめルート</a></li><li><a href="#season">季節情報</a></li>
        <li><a href="#access">アクセス・駐車場</a></li><li><a href="#gear">必要な装備</a></li>
        <li><a href="#stay">周辺の宿泊施設</a></li><li><a href="#faq">よくある質問</a></li>
      </ol></nav>
      <section id="overview" class="content-section"><h2>${m.short}の概要</h2>${m.overview}</section>
      <section id="courses" class="content-section"><h2>コース一覧</h2>
        <div class="course-table-wrap"><table class="course-table">
          <thead><tr><th>ルート</th><th>距離</th><th>所要時間</th><th>難易度</th><th>特徴</th></tr></thead>
          <tbody>${m.courses.map(c=>{const dc=c.lv==='初級'?'easy':c.lv==='中級'?'medium':'hard';const rec=c.n.includes('★')?' class="recommended-row"':'';return `<tr${rec}><td><strong>${c.n}</strong></td><td>${c.d}</td><td>${c.t}</td><td><span class="difficulty ${dc}">${c.lv}</span></td><td>${c.note}</td></tr>`;}).join('')}</tbody>
        </table></div>
      </section>
      <section id="route" class="content-section"><h2>おすすめルート</h2>
        <div class="route-steps">${m.steps.map((s,i)=>{const num=s.tp==='start'?'START':s.tp==='goal'?'GOAL':String(i);const arr=s.tp!=='goal'?'<div class="route-arrow">↓</div>':'';return `<div class="route-step"><div class="step-num">${num}</div><div class="step-body"><h3>${s.ti}</h3><p>${s.de}</p></div></div>${arr}`;}).join('')}</div>
      </section>
      <section id="season" class="content-section"><h2>季節情報</h2>
        <div class="season-grid">${m.seas.map(s=>`<div class="season-info ${s.tp}"><div class="season-header"><span class="season-emoji">${sEmoji[s.tp]}</span><div><h3>${s.ti}</h3><div class="season-rating">おすすめ度：${s.rt}</div></div></div><p>${s.tx}</p></div>`).join('')}</div>
      </section>
      <section id="access" class="content-section"><h2>アクセス・駐車場</h2>
        <div class="access-grid">
          <div class="access-card"><h3>🚃 電車・バス</h3><ul class="access-list"><li>${m.apub}</li></ul></div>
          <div class="access-card"><h3>🚗 車</h3><ul class="access-list"><li>${m.acar}</li></ul><h4>駐車場</h4><ul class="access-list"><li>${m.park}</li></ul></div>
        </div>
      </section>
      <section id="gear" class="content-section"><h2>必要な装備</h2>
        <div class="gear-categories">
          <div class="gear-category must"><h3>必須アイテム</h3><ul class="gear-list">
            <li class="gear-item"><span class="gear-icon">🥾</span><div class="gear-detail"><strong>登山靴</strong><a href="${r}gear/shoes.html" class="gear-link">おすすめを見る →</a></div></li>
            <li class="gear-item"><span class="gear-icon">💧</span><div class="gear-detail"><strong>飲料水（1〜2L）</strong></div></li>
            <li class="gear-item"><span class="gear-icon">🧥</span><div class="gear-detail"><strong>レインウェア</strong><a href="${r}gear/rain.html" class="gear-link">おすすめを見る →</a></div></li>
          </ul></div>
          <div class="gear-category recommend"><h3>あると便利</h3><ul class="gear-list">
            <li class="gear-item"><span class="gear-icon">🎒</span><div class="gear-detail"><strong>ザック</strong><a href="${r}gear/pack.html" class="gear-link">おすすめを見る →</a></div></li>
            <li class="gear-item"><span class="gear-icon">🥢</span><div class="gear-detail"><strong>トレッキングポール</strong><a href="${r}gear/pole.html" class="gear-link">おすすめを見る →</a></div></li>
          </ul></div>
        </div>
        <div class="gear-cta"><a href="${r}gear/index.html" class="btn-gear-full">装備ガイドを見る →</a></div>
        <div style="background:#fff8e6;border:2px solid #f77f00;border-radius:12px;padding:20px 24px;margin:24px 0;">
          <h3 style="color:#e06c00;margin-bottom:12px;">Amazonで登山装備を探す</h3>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            <a href="https://www.amazon.co.jp/s?k=%E7%99%BB%E5%B1%B1%E9%9D%B4&tag=nipponhiking2-22" rel="nofollow noopener" target="_blank" style="background:#f77f00;color:white;padding:9px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:.88rem;">🥾 登山靴 →</a>
            <a href="https://www.amazon.co.jp/s?k=%E7%99%BB%E5%B1%B1+%E3%83%AC%E3%82%A4%E3%83%B3%E3%82%A6%E3%82%A7%E3%82%A2&tag=nipponhiking2-22" rel="nofollow noopener" target="_blank" style="background:#f77f00;color:white;padding:9px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:.88rem;">🧥 レインウェア →</a>
            <a href="https://www.amazon.co.jp/s?k=%E7%99%BB%E5%B1%B1+%E3%82%B6%E3%83%83%E3%82%AF&tag=nipponhiking2-22" rel="nofollow noopener" target="_blank" style="background:#f77f00;color:white;padding:9px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:.88rem;">🎒 ザック →</a>
          </div>
        </div>
      </section>
      <section id="stay" class="content-section"><h2>周辺の宿泊施設</h2>
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
      <section class="content-section" id="faq"><h2>よくある質問（FAQ）</h2>
        <div style="display:flex;flex-direction:column;gap:16px;margin-top:16px;">
          ${m.faqs.map(f=>`<details style="background:#f0f7f4;border-radius:10px;padding:16px 20px;"><summary style="font-weight:700;cursor:pointer;color:#1b4332;">${f.q}</summary><p style="margin-top:10px;color:#333;">${f.a}</p></details>`).join('')}
        </div>
      </section>
      <section class="content-section"><h2>関連ブログ記事</h2><ul style="line-height:2;">
        <li><a href="${r}blog/beginner-gear.html">初心者が最初に揃えるべき登山装備7選</a></li>
        <li><a href="${r}blog/safety-guide.html">登山の安全対策完全ガイド</a></li>
        <li><a href="${r}blog/app-guide.html">登山アプリ完全比較2026</a></li>
      </ul></section>
      <section id="tips" class="content-section"><h2>注意事項・豆知識</h2>
        <div class="tips-grid">${m.tips.map(t=>`<div class="tip-card ${t.tp}"><span class="tip-icon">${t.ic}</span><div><h3>${t.ti}</h3><p>${t.tx}</p></div></div>`).join('')}</div>
      </section>
    </div>
    <aside class="course-sidebar">
      <div class="sidebar-card summary-card"><h3>基本情報まとめ</h3>
        <table class="summary-table">
          <tr><th>山名</th><td>${m.name}</td></tr><tr><th>標高</th><td>${m.elev}</td></tr>
          <tr><th>所在地</th><td>${m.pref}</td></tr><tr><th>難易度</th><td>${diffMap[m.diff]}</td></tr>
          <tr><th>距離</th><td>${m.dist}</td></tr><tr><th>所要時間</th><td>${m.time}</td></tr>
          <tr><th>最寄り</th><td>${m.access}</td></tr><tr><th>入山料</th><td>${m.fee}</td></tr>
        </table>
      </div>
      <div class="sidebar-card ad-placeholder"><p class="ad-label">広告</p>
        <div class="ad-space"><a href="//af.moshimo.com/af/c/click?a_id=5506332&p_id=6980&pc_id=19965&pl_id=88582" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" attributionsrc><img src="//image.moshimo.com/af-img/6786/000000088582.png" width="300" height="250" style="border:none;"></a><img src="//i.moshimo.com/af/i/impression?a_id=5506332&p_id=6980&pc_id=19965&pl_id=88582" width="1" height="1" style="border:none;" loading="lazy"></div>
      </div>
      <div class="sidebar-card"><h3>関連コース</h3><ul class="related-list">
        ${m.rel.map(r2=>{const dc=r2.d==='初級'?'easy':r2.d==='中級'?'medium':'hard';return `<li><a href="${r2.f}">${r2.n}</a><span class="difficulty ${dc}">${r2.d}</span></li>`;}).join('')}
      </ul></div>
      <div class="sidebar-card gear-sidebar-cta"><h3>${m.short}に必要な装備</h3><p>安全・快適に登るための装備リスト。</p><a href="${r}gear/index.html" class="btn-sidebar-gear">装備ガイドを見る →</a></div>
    </aside>
  </div>
  <footer class="site-footer"><div class="container footer-inner">
    <div class="footer-logo"><span>⛰️</span> にっぽんハイキングガイド</div>
    <nav class="footer-nav"><ul>
      <li><a href="${r}about.html">このサイトについて</a></li><li><a href="${r}privacy.html">プライバシーポリシー</a></li>
      <li><a href="${r}contact.html">お問い合わせ</a></li><li><a href="${r}sitemap.html">サイトマップ</a></li>
    </ul></nav>
    <p class="footer-copy">&copy; 2026 にっぽんハイキングガイド. All rights reserved.</p>
  </div></footer>
  <script src="${r}js/main.js"></script>
</body></html>`;
}

const data = [
  // 近畿
  {file:'regions/kinki/odaigahara.html',regionSlug:'kinki',name:'大台ヶ原（おおだいがはら）',short:'大台ヶ原',region:'近畿',pref:'奈良県・三重県',diff:'easy',elev:'1,695m（日出ヶ岳）',dist:'約8km',time:'3〜4時間',ediff:'約200m',access:'近鉄大和上市駅（バス）',fee:'なし',season:'5〜11月（特に秋）',emoji:'🌫️',
    desc:'国内屈指の多雨地帯・神秘的な苔の原生林とユネスコエコパーク。大蛇嵓の絶壁と秋の紅葉が絶景。初心者向けの整備されたコース。',
    overview:'<p>大台ヶ原（おおだいがはら）は奈良県・三重県境に位置する年間降水量4,000mmを超える国内屈指の多雨地帯です。苔むした倒木・霧・コケむした大地が独特の神秘的な景観を作り出します。ユネスコエコパーク（生物圏保存地域）に登録されています。</p><p>東大台の周回コース（約8km・3〜4時間）は整備されており初心者でも安心して歩けます。大蛇嵓（だいじゃぐら）の切り立った絶壁と秋の紅葉（10〜11月）が特に人気です。</p>',
    courses:[{n:'東大台周回コース ★',d:'約8km',t:'3〜4時間',lv:'初級',note:'整備されたメインコース。大蛇嵓・正木ヶ原を巡る'},{n:'西大台コース',d:'約10km',t:'4〜5時間',lv:'初級',note:'要事前申請・人数制限あり。原始の森を歩く'}],
    steps:[{tp:'start',ti:'大台ヶ原ビジターセンター（標高1,580m）',de:'駐車場・トイレ・展示あり。登山起点。'},{tp:'step',ti:'日出ヶ岳（標高1,695m）',de:'最高峰。展望台から大峰山系・熊野灘を望む。'},{tp:'step',ti:'正木ヶ原',de:'立ち枯れたトウヒの白骨林が幻想的。'},{tp:'goal',ti:'大蛇嵓（だいじゃぐら）',de:'切り立った断崖。足元は1,000m超の断崖絶壁。柵あり。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★★☆',tx:'新緑が美しい。霧雨に煙る苔の森が幻想的。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★☆☆',tx:'涼しく快適。霧が多い。レインウェア必携。'},{tp:'autumn',ti:'秋（10〜11月）',rt:'★★★★★',tx:'紅葉が最盛期。特に大蛇嵓周辺の紅葉は絶景。'},{tp:'winter',ti:'冬（12〜4月）',rt:'★★☆☆☆',tx:'積雪あり。アイゼン必要な場合も。'}],
    apub:'近鉄大和上市駅から奈良交通バスで大台ヶ原（夏秋季節運行・約2時間）',acar:'国道169号→大台ヶ原ドライブウェイ経由。登山口まで約1時間（吉野方面から）。',park:'大台ヶ原駐車場（無料・約300台）',
    ha1:'大台ヶ原ロッジ（山上）',hd1:'駐車場に隣接する宿泊施設。要予約。6〜11月営業。',ha2:'上北山温泉・下北山温泉',hd2:'山麓の温泉宿。登山後の疲れを癒すのに最適。',
    faqs:[{q:'雨の日でも楽しめますか？',a:'大台ヶ原は年間降水量4,000mmを超える多雨地帯。霧や雨の日は苔が一層美しく輝き、幻想的な雰囲気になります。レインウェアを着用して歩く「雨の森」もおすすめです。'},{q:'大蛇嵓は危険ですか？',a:'展望台には柵が設置されています。通常の行動範囲では危険はありませんが、柵を超えての行動は絶対に避けてください。風の強い日は特に注意が必要です。'},{q:'西大台の申請方法は？',a:'西大台への立入は事前の入域届出と費用（500円）が必要です。1日の上限人数あり。大台ヶ原ビジターセンターに問い合わせください。'},{q:'シカ食害問題とは何ですか？',a:'大台ヶ原ではニホンジカによる植生への食害が深刻な問題となっています。防護柵設置など対策が進められていますが、森の変化を目の当たりにできます。'},{q:'駐車場はいつ混みますか？',a:'紅葉シーズン（10月中旬〜11月上旬）の週末は早朝から満車になることがあります。6時台までに到着するか平日訪問を推奨。'}],
    tips:[{tp:'tip',ic:'🌫️',ti:'霧の森が絶景',tx:'大台ヶ原の真骨頂は霧に包まれた苔の森。晴れの日も美しいが、霧が出ている日は特別な幻想的雰囲気を楽しめる。'},{tp:'caution',ic:'🌧️',ti:'雨具は必携',tx:'いつ雨が降っても不思議ではない多雨地帯。レインウェアは必ず携行すること。防水の靴も推奨。'},{tp:'info',ic:'🦌',ti:'野生の鹿に出会える',tx:'大台ヶ原には多くのニホンジカが生息。日中でも登山道近くで見かけることができる。食べ物は与えないこと。'}],
    rel:[{f:'yoshino.html',n:'吉野山（奈良）',d:'初級'},{f:'rokko.html',n:'六甲山（兵庫）',d:'初級'},{f:'omineyama.html',n:'大峰山（奈良）',d:'中級'}]},

  {file:'regions/kinki/kongosan.html',regionSlug:'kinki',name:'金剛山（こんごうさん）',short:'金剛山',region:'近畿',pref:'大阪府・奈良県',diff:'easy',elev:'1,125m（葛木岳）',dist:'約6km',time:'3〜4時間',ediff:'約830m',access:'近鉄富田林駅（バス）',fee:'なし',season:'通年（冬の霧氷も人気）',emoji:'🏯',
    desc:'年間登山者数が日本最多とも言われる大阪近郊の人気の山。「回数登山」文化で有名。葛木神社を目指す信仰登山の伝統も残る。',
    overview:'<p>金剛山（こんごうさん）は大阪府と奈良県の境に位置する標高1,125mの山で、大阪南部のシンボルです。年間登山者数が100万人を超えるとも言われ、日本で最も多く登られている山のひとつです。</p><p>「回数登山」文化が根付いており、1,000回以上登った常連登山者も多数います。葛木神社（山頂）への参拝登山の伝統があり、冬には霧氷（氷瀑・氷柱）が美しく人気です。</p>',
    courses:[{n:'千早本道 ★',d:'約6km',t:'3〜4時間',lv:'初級',note:'最短・最ポピュラー。登山口から山頂広場へ'},{n:'ダイトレコース',d:'約15km',t:'約6時間',lv:'中級',note:'ダイヤモンドトレール（縦走路）の一部'},{n:'文珠尾根コース',d:'約6km',t:'3〜4時間',lv:'初級',note:'千早本道と合わせて周回可能'}],
    steps:[{tp:'start',ti:'金剛山登山口バス停（標高約290m）',de:'バス終点。売店・トイレあり。千早本道入口はすぐ。'},{tp:'step',ti:'カトラ谷分岐（標高約600m）',de:'春のカタクリの群落が有名な分岐点。'},{tp:'step',ti:'5合目（標高約820m）',de:'休憩ポイント。ここから傾斜が緩くなる。'},{tp:'goal',ti:'山頂広場・葛木神社（標高1,125m）',de:'山頂広場に温度計・掲示板あり。葛木神社は奥の院として神聖な場所。'}],
    seas:[{tp:'spring',ti:'春（3〜5月）',rt:'★★★★☆',tx:'カタクリの花（4月上旬）が名物。新緑が美しい。'},{tp:'summer',ti:'夏（6〜8月）',rt:'★★★★☆',tx:'大阪市内より5〜10℃低い。避暑ハイキングに人気。'},{tp:'autumn',ti:'秋（9〜11月）',rt:'★★★★☆',tx:'紅葉（11月上旬〜中旬）が美しい。'},{tp:'winter',ti:'冬（12〜2月）',rt:'★★★★★',tx:'霧氷（樹氷）が美しいシーズン。積雪時はアイゼン必要。'}],
    apub:'近鉄長野線富田林駅から南海バスで金剛山登山口バス停まで約30分',acar:'阪和道美原北ICから国道309号経由で登山口まで約40分',park:'金剛山登山口付近の有料駐車場（各所あり）',
    ha1:'金剛山麓の旅館・民宿',hd1:'千早赤阪村の宿泊施設。山村の素朴な環境で宿泊できる。',ha2:'富田林・河内長野のホテル',hd2:'近鉄沿線のビジネスホテル。大阪市内からのアクセスも便利。',
    faqs:[{q:'回数登山とはどういうものですか？',a:'金剛山では「回数登山」として何度も登った回数を登山記録簿に記入し、100回・500回・1000回以上で表彰される仕組みがあります。1000回以上の常連登山者が多数います。'},{q:'ロープウェイの現状は？',a:'金剛山ロープウェイは老朽化のため2019年に運行休止。現在は廃止状態で利用できません。'},{q:'冬の雪・霧氷の状況は？',a:'例年12月下旬〜2月に霧氷が見られます。山頂の気温は氷点下になることも。雪が積もった場合はアイゼン（チェーンスパイク）が必要。'},{q:'カタクリの見頃はいつですか？',a:'例年4月上旬〜中旬が見頃。カトラ谷周辺のカタクリ群落は関西有数の規模。'},{q:'初心者・子連れでも登れますか？',a:'千早本道は整備されており初心者でも安心。小学生以上なら問題なく登れます。往復3〜4時間を目安に。'}],
    tips:[{tp:'tip',ic:'❄️',ti:'冬の霧氷が絶景',tx:'12〜2月の晴れた日に見られる霧氷（樹氷）が金剛山の冬の名物。山頂の木々が白く輝く光景は幻想的。アイゼン持参で。'},{tp:'info',ic:'📊',ti:'回数登山の文化',tx:'山頂にある登山回数の掲示板は圧巻。「12,000回以上」という強者も。気負わず自分のペースで何度でも登ってみよう。'},{tp:'caution',ic:'⛄',ti:'冬は滑り止め必携',tx:'積雪・凍結時は千早本道も滑りやすい。チェーンスパイクまたは軽アイゼンを持参すること。'}],
    rel:[{f:'rokko.html',n:'六甲山（兵庫）',d:'初級'},{f:'yoshino.html',n:'吉野山（奈良）',d:'初級'},{f:'odaigahara.html',n:'大台ヶ原（奈良）',d:'初級'}]},

  {file:'regions/kinki/hieizan.html',regionSlug:'kinki',name:'比叡山（ひえいざん）',short:'比叡山',region:'近畿',pref:'滋賀県大津市・京都府京都市',diff:'easy',elev:'848m（大比叡）',dist:'約5km（ケーブル利用）',time:'2〜3時間',ediff:'約400m（ケーブル利用）',access:'京阪出町柳駅（叡電）またはJR比叡山坂本駅',fee:'延暦寺拝観料1,000円',season:'通年',emoji:'🛕',
    desc:'天台宗総本山・延暦寺を擁する世界遺産の霊山。琵琶湖と京都市街の展望が広がる。ケーブルカーで手軽にアクセス可能。',
    overview:'<p>比叡山（ひえいざん）は京都府と滋賀県にまたがる標高848mの霊山です。伝教大師最澄が開いた天台宗総本山・延暦寺が鎮座し、ユネスコ世界遺産に登録されています。日本仏教の母山として法然・親鸞・道元・日蓮など多くの名僧が修行した場所です。</p><p>叡山ケーブル（京都側）または坂本ケーブル（滋賀側）でアクセスできるため初心者でも手軽に登山できます。山頂からは琵琶湖と京都市街の大展望が楽しめます。</p>',
    courses:[{n:'叡山ケーブル利用コース ★',d:'約5km',t:'2〜3時間',lv:'初級',note:'京都側・八瀬からケーブルで登る定番ルート'},{n:'雲母坂（きらら坂）コース',d:'約8km',t:'3〜4時間',lv:'中級',note:'修学院から徒歩で登る。古道を歩く'},{n:'坂本ケーブルコース',d:'約4km',t:'約2時間',lv:'初級',note:'滋賀側・坂本からケーブルで登る'}],
    steps:[{tp:'start',ti:'八瀬比叡山口駅（叡山電鉄）',de:'出町柳から叡電で約15分。ケーブル乗り場まで徒歩。'},{tp:'step',ti:'比叡山頂（ケーブル駅）',de:'ケーブル約9分で山頂駅。ここから延暦寺根本中堂まで徒歩約20分。'},{tp:'step',ti:'延暦寺根本中堂',de:'1,200年不滅の法灯が灯る延暦寺の中心。拝観料1,000円。'},{tp:'goal',ti:'大比叡山頂（標高848m）',de:'一等三角点。琵琶湖・京都市街の大展望。'}],
    seas:[{tp:'spring',ti:'春（3〜5月）',rt:'★★★★☆',tx:'桜・新緑が美しい。4月の桜シーズンは特に人気。'},{tp:'summer',ti:'夏（6〜8月）',rt:'★★★☆☆',tx:'京都市内より涼しい。蝉時雨の中の参道歩きが独特。'},{tp:'autumn',ti:'秋（9〜11月）',rt:'★★★★★',tx:'紅葉（11月）が美しい。比叡山全体が色づく。'},{tp:'winter',ti:'冬（12〜2月）',rt:'★★★☆☆',tx:'積雪あり。雪の延暦寺も幻想的。防寒対策を。'}],
    apub:'京阪出町柳駅→叡山電車→八瀬比叡山口駅→叡山ケーブル（約6分）→比叡山頂',acar:'名神高速京都東ICから湖西道路・比叡山ドライブウェイ経由で山頂駐車場まで約30分',park:'比叡山山頂駐車場（有料）',
    ha1:'延暦寺会館（宿坊）',hd1:'延暦寺の宿坊。精進料理・朝のお勤め体験ができる。要予約。',ha2:'京都・大津のホテル',hd2:'京都駅・大津駅周辺の宿泊施設。観光の拠点として便利。',
    faqs:[{q:'延暦寺の拝観料はいくらですか？',a:'東塔・西塔・横川の三塔共通拝観券は1,000円（2026年参考）。各エリアを別々に拝観する場合は各700円。'},{q:'世界遺産について教えてください',a:'「古都京都の文化財」の構成資産として比叡山延暦寺がユネスコ世界遺産に登録されています（1994年）。'},{q:'千日回峰行とはなんですか？',a:'比叡山で行われる天台宗の荒行。7年間で1,000日（最初4年間は年100日、後半は200日）にわたって山中を歩き続ける修行。'},{q:'アクセス方法を教えてください',a:'京都側からは叡山ケーブルが便利。滋賀側からはJR比叡山坂本駅から坂本ケーブル。または車で比叡山ドライブウェイ経由。'},{q:'子連れでも楽しめますか？',a:'ケーブルカー利用なら子どもでも問題なし。延暦寺の参拝もできます。歩く距離は短いため家族でのお出かけに最適。'}],
    tips:[{tp:'info',ic:'🛕',ti:'日本仏教の聖地',tx:'法然・親鸞・道元・日蓮・一遍など鎌倉仏教の祖師がほぼ全員修行した場所。「仏教の母山」として特別な場所。'},{tp:'tip',ic:'🍂',ti:'秋の紅葉ライトアップ',tx:'11月には延暦寺周辺で紅葉ライトアップが行われることがある。夜の延暦寺は昼間とは異なる幻想的な雰囲気。'},{tp:'caution',ic:'❄️',ti:'冬は積雪・凍結に注意',tx:'比叡山は冬に積雪することがある。特にケーブル周辺の石畳は凍結しやすい。滑りにくい靴で。'}],
    rel:[{f:'rokko.html',n:'六甲山（兵庫）',d:'初級'},{f:'yoshino.html',n:'吉野山（奈良）',d:'初級'},{f:'kongosan.html',n:'金剛山（大阪・奈良）',d:'初級'}]},

  {file:'regions/kinki/omineyama.html',regionSlug:'kinki',name:'大峰山（おおみねさん）',short:'大峰山',region:'近畿',pref:'奈良県吉野郡天川村',diff:'medium',elev:'1,719m（山上ヶ岳）',dist:'約8km',time:'4〜5時間',ediff:'約1,000m',access:'近鉄下市口駅（バス）',fee:'奥駈道整備協力金あり',season:'5〜10月',emoji:'🔮',
    desc:'修験道の聖地として1,300年以上の歴史を持つ日本百名山。吉野山から熊野への「大峰奥駈道」の要衝。女人禁制が今も続く。',
    overview:'<p>大峰山（おおみねさん）は奈良県に位置する標高1,719m（山上ヶ岳）の霊山で、日本百名山のひとつです。役行者（えんのぎょうじゃ）が1,300年以上前に開いた修験道の聖地として知られています。</p><p>吉野山から熊野大社を結ぶ「大峰奥駈道」の起点であり、現在も女人禁制（女性は山頂域への入山不可）が続く数少ない山です。「西の覗き」と呼ばれる断崖絶壁での修行が有名です。</p>',
    courses:[{n:'洞川温泉コース ★',d:'約8km',t:'4〜5時間',lv:'中級',note:'洞川温泉から大峰山寺まで'},{n:'吉野からの奥駈道',d:'約30km+',t:'複数日',lv:'上級',note:'熊野への本格縦走。経験者向け'}],
    steps:[{tp:'start',ti:'洞川温泉（標高約820m）',de:'行者の宿場町。宿坊が多数ある。バス終点。'},{tp:'step',ti:'一本松茶屋（標高約1,250m）',de:'休憩ポイント。茶屋あり（営業時期限定）。'},{tp:'step',ti:'お花畑（標高約1,600m）',de:'高山植物が咲く台地。'},{tp:'goal',ti:'山頂・大峰山寺（標高1,719m）',de:'蔵王堂が鎮座する山頂。「西の覗き」は崖から身を乗り出す荒行体験スポット。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★★☆',tx:'山開き（5月3日）から登山可能。シャクナゲが咲く。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'修験道の夏行が盛ん。白装束の行者が多く訪れる。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★☆',tx:'紅葉が美しい。山閉い（9月23日ごろ）後は入山不可。'},{tp:'winter',ti:'冬（11〜4月）',rt:'☆☆☆☆☆',tx:'入山期間外。積雪のため一般登山不可。'}],
    apub:'近鉄吉野線下市口駅から奈良交通バスで洞川温泉まで（約1時間30分）',acar:'南阪奈道路葛城ICから国道309号経由で洞川温泉まで約1時間',park:'洞川温泉の有料駐車場',
    ha1:'洞川温泉の宿坊・旅館',hd1:'行者の宿場町として発展した洞川温泉。宿坊での精進料理体験も人気。',ha2:'天川村・吉野町の宿',hd2:'天川村内や吉野山周辺の旅館・民宿。',
    faqs:[{q:'女人禁制とはどういうことですか？',a:'山上ヶ岳（大峰山）への女性の入山は今も禁じられています。宗教的慣習によるものです。なお、隣接する稲村ヶ岳は女性も登山可能です。'},{q:'西の覗きとは何ですか？',a:'大峰山寺の修行場のひとつ。断崖絶壁から身を乗り出して「懺悔」する荒行体験ができます（補助ロープあり）。信仰の場でもあるため敬虔な態度で参加を。'},{q:'修験道体験はできますか？',a:'洞川温泉の宿坊によっては修験道体験プログラムを提供しているところがあります。ご祈祷・法螺貝吹き・滝行など。'},{q:'山開きはいつですか？',a:'例年5月3日が山開き（戸開式）で、登山可能になります。山閉いは9月23日ごろ（秋分の日）。この期間外は入山不可。'},{q:'洞川温泉について教えてください',a:'大峰山の麓にある温泉郷。行者が祈祷の前後に宿泊する宿場町として発展。かんぽの宿もある。名水（ごろごろ水）も有名。'}],
    tips:[{tp:'info',ic:'🙏',ti:'修験道の聖地として敬虔に',tx:'大峰山は今も現役の修験道の場。白装束の行者が多く訪れる神聖な場所。観光気分ではなく敬虔な姿勢で訪問してほしい。'},{tp:'caution',ic:'🚺',ti:'女性の入山について',tx:'山上ヶ岳は女人禁制が続いています。事前に確認してから訪問してください。女性は隣接の稲村ヶ岳（1,725m）への登山が可能です。'},{tp:'tip',ic:'💧',ti:'ごろごろ水が名物',tx:'洞川の「ごろごろ水」は環境省の名水百選に選定された天然水。登山前後の水分補給に活用できる。'}],
    rel:[{f:'yoshino.html',n:'吉野山（奈良）',d:'初級'},{f:'odaigahara.html',n:'大台ヶ原（奈良）',d:'初級'}]},

  // 中国
  {file:'regions/chugoku/azumayama.html',regionSlug:'chugoku',name:'吾妻山（あづまやま）',short:'吾妻山',region:'中国',pref:'広島県・島根県',diff:'easy',elev:'1,238m',dist:'約6km',time:'2〜3時間',ediff:'約300m',access:'JR備後落合駅（タクシー）',fee:'なし',season:'通年（水仙は1〜2月）',emoji:'🌼',
    desc:'1〜2月の水仙100万本の群落と10月のリンドウで有名な比婆道後帝釈国定公園の高原の山。360度の大展望が魅力。',
    overview:'<p>吾妻山（あづまやま）は広島・島根両県にまたがる標高1,238mのなだらかな高原状の山です。比婆道後帝釈国定公園に含まれ、360度の大展望が素晴らしい。</p><p>1〜2月の水仙（約100万本）と10月初旬のリンドウの群落が特に有名で、花の季節には多くの登山者が訪れます。休暇村比婆山を拠点とした登山コースが整備されています。</p>',
    courses:[{n:'休暇村コース ★',d:'約6km',t:'2〜3時間',lv:'初級',note:'休暇村比婆山から山頂への最短コース'},{n:'池の原キャンプ場コース',d:'約8km',t:'3〜4時間',lv:'初級',note:'池の原から登る変化のあるルート'}],
    steps:[{tp:'start',ti:'休暇村比婆山（標高約950m）',de:'宿泊・食事施設あり。ここから登山道へ。'},{tp:'step',ti:'水仙群落（1〜2月）',de:'1〜2月は一面に水仙が咲き誇る絶景が広がる。'},{tp:'goal',ti:'吾妻山山頂（標高1,238m）',de:'360度の大展望。比婆山連峰・道後山・大山が一望。'}],
    seas:[{tp:'spring',ti:'春（4〜5月）',rt:'★★★★☆',tx:'残雪がなくなり快適な登山ができる。新緑が美しい。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★☆☆',tx:'涼しく快適。高原の爽快感が味わえる。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★★',tx:'10月初旬のリンドウ群落が絶景。紅葉も美しい。'},{tp:'winter',ti:'冬（1〜2月）',rt:'★★★★★',tx:'水仙100万本の群落が見頃。雪景色との共演も美しい。'}],
    apub:'JR芸備線備後落合駅からタクシーで約10分で休暇村比婆山。または庄原市バス。',acar:'中国道庄原ICから国道432号経由で休暇村比婆山まで約40分',park:'休暇村比婆山駐車場（無料）',
    ha1:'休暇村比婆山',hd1:'登山口直結の国民休暇村。温泉あり。要予約。',ha2:'庄原市内のホテル',hd2:'庄原駅周辺のビジネスホテルや旅館。',
    faqs:[{q:'水仙の見頃と場所を教えてください',a:'例年1月中旬〜2月下旬が見頃。山頂南側の斜面に約100万本の水仙が咲きます。雪と水仙のコントラストが美しい。'},{q:'リンドウの群落はいつ見られますか？',a:'例年10月上旬が見頃。山頂付近に紫色のリンドウが群生し、草紅葉とのコントラストが美しい。'},{q:'車以外のアクセス方法は？',a:'JR芸備線備後落合駅からタクシーまたは庄原市のコミュニティバスを利用。公共交通は本数が少ないため時刻確認が必要。'},{q:'道後山・比婆山との縦走はできますか？',a:'吾妻山〜道後山〜比婆山の縦走コースがあります。1日で全山を縦走することも可能（約15km・6〜7時間）。'}],
    tips:[{tp:'tip',ic:'❄️',ti:'冬の水仙＋雪景色',tx:'雪が残る斜面に水仙が咲く1〜2月の光景は日本でも珍しい景観。早めに行かないと水仙が散ってしまうことも。'},{tp:'info',ic:'🌼',ti:'花の季節が特におすすめ',tx:'水仙（1〜2月）・リンドウ（10月）・紅葉と、季節ごとに異なる花や色で楽しめる山。年に何度も訪れる登山者も多い。'}],
    rel:[{f:'daisen.html',n:'大山（鳥取）',d:'中級'},{f:'dogoyama.html',n:'道後山（広島・鳥取）',d:'初級'},{f:'hibayama.html',n:'比婆山（広島）',d:'初級'}]},

  {file:'regions/chugoku/sanbesan.html',regionSlug:'chugoku',name:'三瓶山（さんべさん）',short:'三瓶山',region:'中国',pref:'島根県大田市',diff:'easy',elev:'1,126m（男三瓶山）',dist:'約8km',time:'4〜5時間',ediff:'約650m',access:'JR大田市駅（バス・タクシー）',fee:'なし',season:'4〜11月',emoji:'🌋',
    desc:'火山がつくる独特の地形と全国最大規模の陸化湿原を持つ島根の名峰。男・女・子・孫の4つの峰を周回するコースが人気。',
    overview:'<p>三瓶山（さんべさん）は島根県中央部に位置する火山がつくる独特の地形を持つ山です。男三瓶山（1,126m）を主峰に、女三瓶山・子三瓶山・孫三瓶山と名付けられた複数の峰が連なります。</p><p>山麓には三瓶山湿原（天然記念物・全国最大規模の陸化湿原）があり、生物多様性の宝庫として知られています。西の原からの周回コースが人気です。</p>',
    courses:[{n:'西の原周回コース ★',d:'約8km',t:'4〜5時間',lv:'初級',note:'西の原から男三瓶山→室ノ内周回'},{n:'北の原コース（ロープウェイ利用）',d:'約5km',t:'約3時間',lv:'初級',note:'ロープウェイで山頂付近まで（営業期間要確認）'}],
    steps:[{tp:'start',ti:'西の原（標高480m）',de:'広大な草原。観光センターあり。登山起点。'},{tp:'step',ti:'男三瓶山山頂（標高1,126m）',de:'360度の展望。大山・日本海が見渡せる。'},{tp:'step',ti:'室ノ内（標高950m）',de:'火口跡の谷。植生が豊か。'},{tp:'goal',ti:'西の原（下山）',de:'草原に戻ってゴール。'}],
    seas:[{tp:'spring',ti:'春（4〜5月）',rt:'★★★★☆',tx:'山野草が咲き始める。ヤマシャクヤク（5月）が有名。'},{tp:'summer',ti:'夏（6〜8月）',rt:'★★★★☆',tx:'涼しく快適。高原のハイキングを楽しめる。'},{tp:'autumn',ti:'秋（9〜11月）',rt:'★★★★★',tx:'草原の草紅葉と山の紅葉が美しい。'},{tp:'winter',ti:'冬（12〜3月）',rt:'★★★☆☆',tx:'積雪あり。雪の三瓶山も美しい。'}],
    apub:'JR山陰本線大田市駅から石見交通バスでさんべ荘前まで（約1時間30分）',acar:'松江道三刀屋木次ICから国道54号・375号経由で西の原まで約1時間',park:'西の原駐車場（無料・約200台）',
    ha1:'国民宿舎さんべ荘',hd1:'西の原に隣接する国民宿舎。温泉あり。登山前後の宿泊に便利。',ha2:'三瓶温泉周辺の宿',hd2:'三瓶温泉郷の旅館・ホテル。',
    faqs:[{q:'三瓶山湿原の見どころは？',a:'全国最大規模の陸化湿原（縄文時代の森が埋もれた泥炭層）があります。三瓶自然館サヒメルでは埋没林の展示も見られます。'},{q:'ファミリー向けのコースはありますか？',a:'西の原の草原散策（平坦・30分程度）は子連れでも楽しめます。男三瓶山への本格登山は小学校高学年以上が目安。'},{q:'ロープウェイは利用できますか？',a:'三瓶山ロープウェイの営業状況は変動します。三瓶自然館サヒメルや観光協会に最新情報を確認してください。'},{q:'大山と合わせて観光できますか？',a:'三瓶山から大山までは車で約1時間。島根・鳥取の2座をセットで登る登山者も多い。'}],
    tips:[{tp:'info',ic:'🌿',ti:'湿原と火山地形の共存',tx:'三瓶山では火山地形と湿原が隣接するユニークな自然環境。三瓶自然館サヒメルで予習してから登ると理解が深まる。'},{tp:'tip',ic:'🌺',ti:'ヤマシャクヤクは5月に',tx:'5月中旬、男三瓶山山麓周辺でヤマシャクヤクの白い花が見頃。見つけたら大切に観察を。'}],
    rel:[{f:'daisen.html',n:'大山（鳥取）',d:'中級'},{f:'azumayama.html',n:'吾妻山（広島）',d:'初級'}]},

  {file:'regions/chugoku/korouhanzan.html',regionSlug:'chugoku',name:'恐羅漢山（おそらかんざん）',short:'恐羅漢山',region:'中国',pref:'広島県・島根県',diff:'medium',elev:'1,346m（中国地方第2位）',dist:'約8km',time:'4〜5時間',ediff:'約700m',access:'JR三次駅（バス・タクシー）',fee:'なし',season:'5〜11月',emoji:'🌲',
    desc:'中国地方第2の高峰。広大なブナ原生林と春の新緑・秋の紅葉が美しい。冬はスキー場としても賑わう広島・島根の境の山。',
    overview:'<p>恐羅漢山（おそらかんざん）は広島・島根県境に位置する標高1,346mの中国地方第2位の高峰です。ブナの原生林が広がり、春の新緑と秋の紅葉が特に美しい。</p><p>冬は恐羅漢スノーパーク（スキー場）として賑わいます。牛小屋高原から登る標準コースが整備されており、中級者向けの本格的なハイキングが楽しめます。</p>',
    courses:[{n:'牛小屋高原コース ★',d:'約8km',t:'4〜5時間',lv:'中級',note:'牛小屋高原スキー場から山頂往復'},{n:'五龍の滝コース',d:'約10km',t:'5〜6時間',lv:'中級',note:'五龍の滝経由。変化に富むルート'}],
    steps:[{tp:'start',ti:'牛小屋高原スキー場（標高650m）',de:'駐車場あり。夏はグリーンシーズン営業。'},{tp:'step',ti:'夏焼峠（標高1,100m）',de:'眺望が開ける峠。ここからブナ原生林が始まる。'},{tp:'goal',ti:'恐羅漢山山頂（標高1,346m）',de:'中国地方第2の高峰。ブナ林に囲まれた静かな山頂。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★★★',tx:'ブナの新緑が絶景。5月下旬〜6月の萌黄色が最も美しい。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★☆☆',tx:'涼しく快適なハイキング。ブナ林の木漏れ日が気持ちいい。'},{tp:'autumn',ti:'秋（10〜11月）',rt:'★★★★★',tx:'ブナ黄葉が圧巻。10月下旬〜11月上旬が見頃。'},{tp:'winter',ti:'冬（12〜3月）',rt:'★★★★☆',tx:'スキーシーズン。積雪が多く登山は上級者向け。'}],
    apub:'JR三次駅からタクシーで牛小屋高原まで（公共交通は不便・要マイカー推奨）',acar:'中国道三次ICから国道184号経由で牛小屋高原まで約40分',park:'牛小屋高原駐車場（無料）',
    ha1:'牛小屋高原キャンプ場・ロッジ',hd1:'スキー場に隣接するロッジ。グリーンシーズン営業あり。',ha2:'三次市内のホテル',hd2:'JR三次駅周辺のビジネスホテル。',
    faqs:[{q:'ブナ原生林の見頃はいつですか？',a:'新緑は5月下旬〜6月、紅葉は10月下旬〜11月上旬が見頃。特に秋のブナ黄葉は中国地方有数の美しさです。'},{q:'冬のスキーシーズンについて教えてください',a:'恐羅漢スノーパークは12月〜3月が営業期間。中国地方最大級の積雪量で、スキー・スノーボードが楽しめます。'},{q:'登山道の難易度は？',a:'牛小屋高原から夏焼峠まではなだらかな登り。峠から山頂は急登があるが、整備されており中級者なら問題なし。'},{q:'マイカーがない場合のアクセスは？',a:'三次駅からのタクシーが実質的な選択肢。事前に地元タクシー会社に相談することをおすすめします。'}],
    tips:[{tp:'tip',ic:'🍂',ti:'秋のブナ黄葉は中国地方随一',tx:'10月下旬のブナの黄葉は中国地方で最も美しい紅葉スポットのひとつ。燃えるような黄色い森を歩ける。'},{tp:'caution',ic:'🗺️',ti:'公共交通が不便',tx:'最寄り駅からのバスがなく、実質マイカーかタクシー利用が必須。登山計画の際は交通手段を事前に確保すること。'}],
    rel:[{f:'daisen.html',n:'大山（鳥取）',d:'中級'},{f:'azumayama.html',n:'吾妻山（広島）',d:'初級'}]},

  {file:'regions/chugoku/dogoyama.html',regionSlug:'chugoku',name:'道後山（どうごやま）',short:'道後山',region:'中国',pref:'広島県庄原市・鳥取県日野郡日野町',diff:'easy',elev:'1,271m',dist:'約5km',time:'2〜3時間',ediff:'約300m',access:'JR芸備線道後山駅（徒歩）',fee:'なし',season:'5〜11月',emoji:'🐄',
    desc:'開放的な草原が広がるなだらかな高原の山。JRの駅から歩いて行ける数少ない登山口が特徴。大山の展望台として人気。',
    overview:'<p>道後山（どうごやま）は広島・鳥取県境の比婆道後帝釈国定公園に属するなだらかな草原の山です。標高1,271mですが山頂付近は牧場のような開放感ある高原景観が広がります。</p><p>JR芸備線道後山駅から登山口まで徒歩約15分と、電車でアクセスできる数少ない山です。月見ヶ丘からは大山が一望でき、ファミリーハイキングにも最適です。</p>',
    courses:[{n:'道後山駅→岩樋山→道後山周回 ★',d:'約5km',t:'2〜3時間',lv:'初級',note:'駅から歩いてアクセスできる定番コース'},{n:'月見ヶ丘コース',d:'約6km',t:'3時間',lv:'初級',note:'大山展望の名所・月見ヶ丘を経由'}],
    steps:[{tp:'start',ti:'道後山駅（標高約1,000m）',de:'JR芸備線の秘境駅。登山口まで徒歩約15分。'},{tp:'step',ti:'岩樋山（標高1,271m）',de:'道後山連峰の最高峰。大山・比婆山連峰が見える。'},{tp:'goal',ti:'道後山・月見ヶ丘（標高1,190m付近）',de:'草原が広がる開放的な台地。大山の展望が素晴らしい。'}],
    seas:[{tp:'spring',ti:'春（4〜5月）',rt:'★★★★☆',tx:'スミレ・カタクリなどの花が咲く。牧歌的な春の高原。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★☆',tx:'涼しく快適。草原のハイキングを楽しめる。'},{tp:'autumn',ti:'秋（10〜11月）',rt:'★★★★☆',tx:'草紅葉と展望が美しい。大山が特によく見える。'},{tp:'winter',ti:'冬（12〜3月）',rt:'★★★☆☆',tx:'積雪あり。雪の草原歩きも良い。'}],
    apub:'JR芸備線道後山駅から登山口まで徒歩約15分（電車本数が少ない・要時刻確認）',acar:'中国道東城ICから国道314号経由で道後山駅付近まで約30分',park:'道後山駅付近の駐車スペース',
    ha1:'庄原市東城の宿',hd1:'東城町内の旅館・民宿。比較的近くにある宿泊施設。',ha2:'庄原市内のホテル',hd2:'庄原市街のビジネスホテル。',
    faqs:[{q:'大山はどこから見えますか？',a:'月見ヶ丘（標高1,190m付近）から大山が特によく見えます。晴天時は大山の雄大な姿が正面に見え、中国地方最高峰の迫力を感じられます。'},{q:'電車でのアクセス方法を教えてください',a:'JR芸備線道後山駅（1日2〜3本）が最寄り駅。ただし本数が非常に少ないため必ず時刻表を確認してください。'},{q:'ファミリー登山に適していますか？',a:'草原状のなだらかなコースで子どもでも歩きやすく、ファミリー登山に最適。道後山駅からのアクセスも子供が喜ぶ秘境感があります。'},{q:'吾妻山・比婆山との縦走はできますか？',a:'道後山〜比婆山〜吾妻山の縦走（約15km）が可能。それぞれが魅力的な山で縦走すると中国山地の自然を満喫できます。'}],
    tips:[{tp:'info',ic:'🚃',ti:'JR道後山駅は秘境駅',tx:'1日数本しか列車が来ない秘境駅からのアクセスが道後山の特徴。列車旅と組み合わせたユニークな登山を楽しめる。'},{tp:'tip',ic:'🏔️',ti:'大山の絶景展望台',tx:'月見ヶ丘は大山を眺める絶好の展望台。中国山地の中から見る大山は格別。'}],
    rel:[{f:'daisen.html',n:'大山（鳥取）',d:'中級'},{f:'azumayama.html',n:'吾妻山（広島）',d:'初級'},{f:'hibayama.html',n:'比婆山（広島）',d:'初級'}]},

  {file:'regions/chugoku/hibayama.html',regionSlug:'chugoku',name:'比婆山（ひばやま）',short:'比婆山',region:'中国',pref:'広島県庄原市',diff:'easy',elev:'1,264m（御陵）',dist:'約7km',time:'3〜4時間',ediff:'約350m',access:'JR備後西城駅（タクシー）',fee:'なし',season:'4〜11月（カタクリは4月）',emoji:'⛩️',
    desc:'古事記でイザナミノミコトを葬ったとされる聖地。巨木ブナの神域と4月のカタクリ群落が美しい比婆道後帝釈国定公園の霊山。',
    overview:'<p>比婆山（ひばやま）は広島県庄原市に位置する標高1,264mの霊山です。古事記に「イザナミノミコトを葬った比婆山」として登場する神話の地で、御陵と呼ばれる山頂には巨大なイチイの木が神木として立っています。</p><p>比婆道後帝釈国定公園に含まれ、ブナ・ミズナラの巨木が立ち並ぶ神域を歩く独特の体験ができます。4月のカタクリ群落が特に有名です。</p>',
    courses:[{n:'出雲峠→御陵→烏帽子山周回 ★',d:'約7km',t:'3〜4時間',lv:'初級',note:'出雲峠から主要峰を巡る定番周回コース'},{n:'比婆山県民の森コース',d:'約8km',t:'3〜4時間',lv:'初級',note:'県民の森から登る整備されたルート'}],
    steps:[{tp:'start',ti:'比婆山県民の森公園センター（標高910m）',de:'駐車場・トイレ・コテージあり。'},{tp:'step',ti:'出雲峠（標高1,100m）',de:'周回コースの起点となる峠。吾妻山・道後山への分岐。'},{tp:'step',ti:'御陵（標高1,264m）',de:'最高峰。イチイの巨木と石碑がある。神聖な雰囲気。'},{tp:'goal',ti:'烏帽子山（1,225m）→池ノ段',de:'稜線歩きで複数の峰を巡る。ブナ原生林が美しい。'}],
    seas:[{tp:'spring',ti:'春（4〜5月）',rt:'★★★★★',tx:'カタクリ（4月中旬〜下旬）が最大の見どころ。群落が斜面を紫色に染める。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★☆☆',tx:'ブナの緑が涼しい。静かな神域の森歩きを楽しめる。'},{tp:'autumn',ti:'秋（10〜11月）',rt:'★★★★★',tx:'ブナの黄葉が圧巻。県民の森周辺の紅葉も美しい。'},{tp:'winter',ti:'冬（12〜3月）',rt:'★★★☆☆',tx:'積雪あり。雪の神域も幻想的。スノーシュー登山も可能。'}],
    apub:'JR芸備線備後西城駅からタクシーで比婆山県民の森まで約20分',acar:'中国道東城ICから国道314号経由で比婆山県民の森まで約30分',park:'比婆山県民の森公園センター駐車場（無料）',
    ha1:'比婆山県民の森のコテージ・ロッジ',hd1:'公園センターに隣接するコテージ・ロッジ（要予約）。自然の中での宿泊体験。',ha2:'庄原市内・東城町の宿',hd2:'庄原市や東城町内のビジネスホテル・旅館。',
    faqs:[{q:'イザナミノミコトとの関係を教えてください',a:'古事記には「イザナミノミコトを出雲と伯伎の堺の比婆山に葬りき」と記されています。日本神話の創世神が眠るとされる聖地です。'},{q:'カタクリの見頃と場所は？',a:'例年4月中旬〜下旬が見頃。出雲峠〜御陵間の斜面にカタクリが群生し、紫色の絨毯のような光景が広がります。'},{q:'吾妻山・道後山との縦走コースは？',a:'比婆山→道後山→吾妻山の縦走が可能（約15km・6〜7時間）。中国山地の豊かな自然を1日で満喫できるコース。'},{q:'アクセス方法を教えてください',a:'JR備後西城駅からタクシー（約20分）または車で県民の森へ。電車本数が少ないため時刻確認が必要。'}],
    tips:[{tp:'tip',ic:'🌸',ti:'4月のカタクリ群落',tx:'4月のカタクリ群落は比婆山最大の見どころ。斜面一面に紫色のカタクリが咲く光景は関西以西では有数の規模。'},{tp:'info',ic:'⛩️',ti:'神話の地を歩く',tx:'古事記に登場する「イザナミの御陵」を歩く体験は他の山では味わえない。神話の舞台を実際に歩く感動がある。'}],
    rel:[{f:'daisen.html',n:'大山（鳥取）',d:'中級'},{f:'azumayama.html',n:'吾妻山（広島）',d:'初級'},{f:'dogoyama.html',n:'道後山（広島・鳥取）',d:'初級'}]},
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
