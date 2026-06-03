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
  // 四国
  {file:'regions/shikoku/tsurugizan.html',regionSlug:'shikoku',name:'剣山（つるぎさん）',short:'剣山',region:'四国',pref:'徳島県三好市',diff:'easy',elev:'1,955m（四国第2の高峰）',dist:'約4km（リフト利用）',time:'2〜3時間',ediff:'約290m（リフト利用）',access:'JR阿波池田駅（バス）',fee:'なし',season:'6〜10月',emoji:'⚔️',
    desc:'四国第2の高峰・日本百名山。観光リフトで手軽に登れる。笹原の稜線と次郎笈への縦走が人気。四国一アクセスしやすい百名山。',
    overview:'<p>剣山（つるぎさん）は徳島県に位置する標高1,955mの山で、四国第2の高峰・日本百名山のひとつです。観光リフトが山頂直下まで運行されており、四国の百名山の中で最も手軽に登れる山として人気があります。</p><p>山頂部は広い笹原が広がり、360度の展望が得られます。隣の次郎笈（1,929m）への縦走は四国随一の稜線歩きとして絶賛されています。</p>',
    courses:[{n:'リフト利用→山頂→次郎笈 ★',d:'約6km',t:'3〜4時間',lv:'初級',note:'リフト利用で山頂へ。次郎笈縦走がおすすめ'},{n:'見ノ越登山口からの徒歩',d:'約4km',t:'約2時間',lv:'初級',note:'リフトを使わず歩いて登るコース'}],
    steps:[{tp:'start',ti:'見ノ越駐車場・リフト乗り場（標高1,420m）',de:'バス終点・駐車場あり。リフト乗り場はここ。'},{tp:'step',ti:'西島駅（リフト終点・標高1,700m）',de:'リフトで約15分。ここから登山道へ。'},{tp:'step',ti:'剣山山頂（標高1,955m）',de:'広い笹原の山頂。ヒュッテ（山小屋）あり。展望台から四国山地を一望。'},{tp:'goal',ti:'次郎笈（じろうぎゅう・標高1,929m）',de:'剣山から約60分。スラリとした三角形のピーク。二山セットで登るのが定番。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★☆☆',tx:'残雪あり（5月まで）。6月下旬から登山可能に。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'笹原の稜線歩きが爽快。ベストシーズン。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★★',tx:'ナナカマド・ダケカンバの紅葉が美しい。10月がベスト。'},{tp:'winter',ti:'冬（11〜5月）',rt:'★★☆☆☆',tx:'積雪あり。アイゼン必要。リフト停止期間あり。'}],
    apub:'JR土讃線阿波池田駅から四季美谷温泉行きバス（夏期・約2時間）で見ノ越バス停下車',acar:'徳島道美馬ICから国道438号経由で見ノ越まで約1時間（急カーブが多い道・注意）',park:'見ノ越駐車場（無料・約200台）',
    ha1:'剣山山頂ヒュッテ',hd1:'山頂に隣接する山小屋（要予約・6〜10月営業）。御来光登山に便利。',ha2:'奥祖谷・東祖谷の宿',hd2:'山麓の祖谷渓エリアの旅館・民宿。かずら橋と合わせた観光も人気。',
    faqs:[{q:'リフトの料金と運行期間は？',a:'大人片道1,000円・往復1,800円（参考）。例年4月末〜11月末まで運行。悪天候時は運休あり。最新情報は公式サイトで確認。'},{q:'次郎笈との縦走について教えてください',a:'剣山山頂から次郎笈まで稜線上を歩いて約60分。美しい笹原の稜線歩きが楽しめます。往復で剣山に戻るか、縦走して下山する方法も。'},{q:'初心者・子連れは可能ですか？',a:'リフト利用コースは整備されており初心者でも安心。小学生以上なら問題なし。山頂のヒュッテで温かい食事もできます。'},{q:'アクセスの注意点は？',a:'国道438号は急カーブ・すれ違い困難な区間あり。特に大型車は注意。夜間・早朝は特に慎重に。'},{q:'冬の登山はできますか？',a:'積雪があるためアイゼン必要。リフトの冬季運休期間あり。経験のない方は春〜秋の登山を推奨。'}],
    tips:[{tp:'tip',ic:'🗡️',ti:'次郎笈とセット登山がおすすめ',tx:'剣山単体より次郎笈との縦走が四国登山の定番。笹原の稜線から見る両山のシルエットは絶景。'},{tp:'info',ic:'🚡',ti:'リフトで楽々アクセス',tx:'山頂直下まで観光リフトが運行。四国の百名山で最も手軽に登れるため、高齢者・初心者にも人気。'},{tp:'caution',ic:'🌧️',ti:'雨の多い徳島の山',tx:'剣山周辺は降水量が多い地域。天気予報を確認し、レインウェアは必ず持参すること。'}],
    rel:[{f:'ishizuchi.html',n:'石鎚山（愛媛）',d:'中級'},{f:'sanrei.html',n:'三嶺（高知・徳島）',d:'中級'}]},

  {file:'regions/shikoku/sanrei.html',regionSlug:'shikoku',name:'三嶺（みうね）',short:'三嶺',region:'四国',pref:'高知県・徳島県',diff:'medium',elev:'1,894m',dist:'約10km',time:'5〜6時間',ediff:'約1,200m',access:'JR大歩危駅（タクシー）',fee:'なし',season:'5〜11月',emoji:'🏔️',
    desc:'四国の秘峰・天空の稜線。人跡まれな笹原の尾根道と山頂付近の天空の池が絶景。剣山との縦走は四国随一の稜線歩き。',
    overview:'<p>三嶺（みうね・さんれい）は高知・徳島県境に位置する標高1,894mの山です。剣山の西に位置し、剣山〜三嶺の縦走コースは「四国随一の稜線歩き」として知名度が高い。</p><p>山頂直下には「天空の池」と呼ばれる池があり、笹原の尾根道からの展望は抜群です。公共交通でのアクセスが難しいため登山者が少なく、静かな山歩きを楽しめます。</p>',
    courses:[{n:'名頃コース（徳島側） ★',d:'約10km',t:'5〜6時間',lv:'中級',note:'最ポピュラーなコース。名頃登山口から'},{n:'いやしの温泉郷コース（高知側）',d:'約12km',t:'6〜7時間',lv:'中級',note:'高知側からのルート。より静か'}],
    steps:[{tp:'start',ti:'名頃登山口（標高700m）',de:'駐車場あり。登山届ポスト設置。'},{tp:'step',ti:'カヤハゲ（標高1,720m）',de:'稜線に出るポイント。三嶺の全貌が見える。'},{tp:'step',ti:'三嶺山頂ヒュッテ付近（1,870m）',de:'天空の池が近く。ヒュッテ（避難小屋）あり。'},{tp:'goal',ti:'三嶺山頂（標高1,894m）',de:'笹原の広い山頂。360度の展望。天空の池を見下ろす絶景。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★★☆',tx:'新緑と残雪のコントラスト。6月まで残雪あり。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'笹原の稜線が爽快。ベストシーズン。'},{tp:'autumn',ti:'秋（10〜11月）',rt:'★★★★★',tx:'草紅葉が最も美しい時期。10月がピーク。'},{tp:'winter',ti:'冬（12〜4月）',rt:'★★☆☆☆',tx:'積雪あり。アイゼン・ピッケル必要。'}],
    apub:'JR土讃線大歩危駅からタクシーで名頃登山口まで（約40分）。公共交通は非常に不便。',acar:'高知道大豊ICから国道32号・439号経由で名頃まで約1時間',park:'名頃登山口駐車場（無料）',
    ha1:'いやしの温泉郷（名頃近く）',hd1:'登山口近くの温泉施設。前泊後泊に便利。',ha2:'大歩危・祖谷温泉の宿',hd2:'祖谷渓エリアの旅館。かずら橋観光と組み合わせるプランが人気。',
    faqs:[{q:'縦走コースの日程を教えてください',a:'剣山〜三嶺の縦走（約28km）は1泊2日が一般的。剣山山頂ヒュッテ泊が最もポピュラー。体力に自信がある人は日帰りも可能。'},{q:'天空の池とはどこにありますか？',a:'三嶺山頂直下（標高1,870m付近）に位置する小さな池。雨水が溜まった天然の池で、晴れた日に青空を映す景色が美しい。'},{q:'公共交通でのアクセス方法は？',a:'JR大歩危駅からタクシーが実質的な選択肢。1日1〜2便の路線バス（祖谷線）もあるが時間がかかる。事前にタクシー予約を推奨。'},{q:'難易度と装備を教えてください',a:'急登ありで体力が必要な中級者向け。日帰り往復10km・標高差1,200mは相応の体力が必要。登山靴・レインウェア・行動食は必須。'}],
    tips:[{tp:'tip',ic:'🌿',ti:'静かな山歩きを楽しめる',tx:'剣山より登山者が少なく静かな山歩きができる。天空の池・笹原の稜線は四国随一の絶景。'},{tp:'caution',ic:'🗺️',ti:'アクセスが難しい',tx:'公共交通が極めて不便。マイカーまたは事前のタクシー手配が必須。下山時刻を考えた計画を立てること。'}],
    rel:[{f:'ishizuchi.html',n:'石鎚山（愛媛）',d:'中級'},{f:'tsurugizan.html',n:'剣山（徳島）',d:'初級'}]},

  {file:'regions/shikoku/kankakei.html',regionSlug:'shikoku',name:'寒霞渓（かんかけい）',short:'寒霞渓',region:'四国',pref:'香川県小豆郡土庄町・小豆島',diff:'easy',elev:'618m（星ヶ城山）',dist:'約4km',time:'1〜2時間',ediff:'約300m（ロープウェイ利用）',access:'高松港（フェリー）→土庄港→バス',fee:'なし',season:'通年（紅葉は10〜11月）',emoji:'🍂',
    desc:'日本三大渓谷美のひとつ・香川県小豆島の景勝地。ロープウェイで絶景へアクセス。秋の紅葉は関西屈指の美しさ。',
    overview:'<p>寒霞渓（かんかけい）は香川県小豆島にある国指定の特別名勝で、日本三大渓谷美のひとつに数えられます。奇岩怪石と深い谷が作り出す景観と、秋の紅葉が特に有名です。</p><p>ロープウェイで手軽に絶景へアクセスできるため初心者から家族連れまで幅広く楽しめます。山頂（星ヶ城山・618m）からは瀬戸内海の多島美を一望できます。</p>',
    courses:[{n:'ロープウェイ利用→山頂散策 ★',d:'約4km',t:'1〜2時間',lv:'初級',note:'ロープウェイで上がり散策・展望を楽しむ'},{n:'表12景コース（登山）',d:'約6km',t:'3〜4時間',lv:'中級',note:'麓から歩いて登る本格コース'},{n:'裏8景コース',d:'約4km',t:'約2時間',lv:'初級',note:'景色が変化する登山道'}],
    steps:[{tp:'start',ti:'寒霞渓ロープウェイ下駅（標高約290m）',de:'土庄港からバスで約30分。駐車場・売店あり。'},{tp:'step',ti:'寒霞渓山頂駅（標高約610m）',de:'ロープウェイで約5分。展望台・レストランあり。'},{tp:'goal',ti:'星ヶ城山（618m）・展望台',de:'瀬戸内海の多島美・岡山方面まで見渡せる大展望。紅葉シーズンは絶景。'}],
    seas:[{tp:'spring',ti:'春（4〜5月）',rt:'★★★★☆',tx:'新緑が美しい。山桜も咲く。'},{tp:'summer',ti:'夏（6〜9月）',rt:'★★★☆☆',tx:'涼しく避暑に最適。'},{tp:'autumn',ti:'秋（10〜11月）',rt:'★★★★★',tx:'モミジ・イチョウの紅葉が最盛期。関西屈指の紅葉スポット。'},{tp:'winter',ti:'冬（12〜3月）',rt:'★★★☆☆',tx:'空気が澄み遠くまで見渡せる。'}],
    apub:'高松港または姫路港からフェリーで小豆島土庄港または坂手港へ→バスで寒霞渓',acar:'土庄港から車で約15分。島内レンタカーも便利。',park:'寒霞渓ロープウェイ下駅付近の駐車場（有料）',
    ha1:'土庄・内海の小豆島の宿',hd1:'土庄・内海地区のホテル・旅館。オリーブ観光の拠点にも。',ha2:'小豆島の旅館・民宿',hd2:'島内各所の宿泊施設。新鮮な海の幸が楽しめる。',
    faqs:[{q:'フェリーのアクセス方法は？',a:'高松港から四国フェリー・ジャンボフェリーで土庄港まで約1時間。姫路港から姫路〜小豆島フェリーで土庄港まで約1時間40分。'},{q:'ロープウェイの料金と運行時間は？',a:'大人片道850円・往復1,500円（参考）。通年運行（8:30〜17:00、繁忙期は延長）。'},{q:'紅葉の見頃はいつですか？',a:'例年10月下旬〜11月中旬が見頃。関西・瀬戸内随一の紅葉スポットで、11月の週末は混雑します。'},{q:'オリーブ公園と合わせて観光できますか？',a:'可能。小豆島はオリーブの名産地で、オリーブ公園・エンジェルロードなど観光スポットが豊富。フェリーで日帰り〜1泊の旅行が人気。'}],
    tips:[{tp:'tip',ic:'🍂',ti:'秋の紅葉は必見',tx:'10月末〜11月中旬の紅葉シーズンは関西有数の美しさ。モミジ・イチョウが渓谷を彩る光景は圧巻。混雑必至なので早朝訪問を。'},{tp:'info',ic:'🫒',ti:'小豆島観光とセットで',tx:'オリーブ公園・エンジェルロードなど観光スポットが豊富な小豆島。寒霞渓登山と島内観光を組み合わせた旅が人気。'}],
    rel:[{f:'ishizuchi.html',n:'石鎚山（愛媛）',d:'中級'},{f:'tsurugizan.html',n:'剣山（徳島）',d:'初級'}]},

  {file:'regions/shikoku/tsutsugazan.html',regionSlug:'shikoku',name:'筒上山（つつがさん）',short:'筒上山',region:'四国',pref:'高知県長岡郡大豊町・愛媛県久万高原町',diff:'medium',elev:'1,859m',dist:'約8km',time:'4〜5時間',ediff:'約700m',access:'JR土居駅（タクシー）',fee:'なし',season:'4〜11月（アケボノツツジは4〜5月）',emoji:'🌺',
    desc:'4〜5月のアケボノツツジ（ピンク色のツツジ）の群落が圧巻の四国の名峰。石鎚山の南に位置し、笹原の稜線歩きが美しい。',
    overview:'<p>筒上山（つつがさん）は高知・愛媛県境に位置する標高1,859mの山です。4月下旬〜5月中旬のアケボノツツジ（ピンク〜薄紅色のツツジ）の群落が圧巻で、四国を代表する花の山として知られています。</p><p>石鎚山の南に位置し、石鎚スカイライン土小屋からアクセスできます。笹原の稜線と花の組み合わせが絶景です。</p>',
    courses:[{n:'土小屋コース ★',d:'約8km',t:'4〜5時間',lv:'中級',note:'土小屋（石鎚スカイライン終点）から登る標準コース'},{n:'面河コース',d:'約12km',t:'6〜7時間',lv:'中級',note:'面河渓谷から登る変化に富むルート'}],
    steps:[{tp:'start',ti:'土小屋登山口（標高1,492m）',de:'石鎚スカイライン終点。駐車場・売店あり。'},{tp:'step',ti:'子持権現山（1,677m）',de:'岩峰。筒上山の全貌が見える。'},{tp:'step',ti:'アケボノツツジ群落（4〜5月）',de:'稜線沿いにアケボノツツジが群生。ピンクの花と笹原が絶景。'},{tp:'goal',ti:'筒上山山頂（1,859m）',de:'笹原の山頂。石鎚山・瓶ヶ森などの展望が広がる。'}],
    seas:[{tp:'spring',ti:'春（4〜5月）',rt:'★★★★★',tx:'アケボノツツジが最盛期（4月下旬〜5月中旬）。四国最大の花見山。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★☆',tx:'涼しい高原ハイキング。石鎚山と合わせた登山が人気。'},{tp:'autumn',ti:'秋（9〜11月）',rt:'★★★★☆',tx:'笹原と石灰岩の紅葉が美しい。'},{tp:'winter',ti:'冬（12〜4月）',rt:'★★☆☆☆',tx:'積雪・凍結あり。土小屋へのアクセス道閉鎖期間あり。'}],
    apub:'JR予讃線土居駅からタクシーで土小屋まで（公共交通不便・要マイカー推奨）',acar:'松山道いよ西条ICから石鎚スカイライン経由で土小屋まで約1時間',park:'土小屋駐車場（無料・約200台）',
    ha1:'土小屋白石旅館',hd1:'土小屋に隣接する旅館。登山者の定宿として知られる（要予約）。',ha2:'久万高原・西条市の宿',hd2:'麓の久万高原町や西条市のホテル・旅館。',
    faqs:[{q:'アケボノツツジの開花状況確認方法は？',a:'愛媛県・高知県の登山情報サイトやSNS（Instagram・X等）で「アケボノツツジ」「筒上山」で検索すると最新開花情報が得られます。'},{q:'土小屋へのアクセス方法は？',a:'石鎚スカイライン経由が一般的。冬季は閉鎖されるため通行可能な時期を事前に確認。マイカーが実質的に必須。'},{q:'石鎚山との縦走は可能ですか？',a:'土小屋から石鎚山〜筒上山の縦走が可能。日帰りで石鎚山を登り、翌日筒上山を登るプランが人気。'},{q:'難易度と装備を教えてください',a:'土小屋（1,492m）からのスタートで標高差は約370m。整備されており中級者向け。登山靴・レインウェア必携。'}],
    tips:[{tp:'tip',ic:'🌸',ti:'アケボノツツジは四国随一',tx:'4月下旬〜5月中旬のアケボノツツジ群落は四国で最も美しい花の山の一つ。ピンクの花が笹原を染める光景は他に代えがたい。'},{tp:'info',ic:'🚗',ti:'石鎚スカイラインを活用',tx:'石鎚スカイライン（無料）で標高1,492mの土小屋まで行けるため、高山の雰囲気を手軽に楽しめる。'}],
    rel:[{f:'ishizuchi.html',n:'石鎚山（愛媛）',d:'中級'},{f:'tsurugizan.html',n:'剣山（徳島）',d:'初級'}]},

  {file:'regions/shikoku/higashiakaishi.html',regionSlug:'shikoku',name:'東赤石山（ひがしあかいしやま）',short:'東赤石山',region:'四国',pref:'愛媛県新居浜市',diff:'medium',elev:'1,706m',dist:'約8km',time:'5〜6時間',ediff:'約1,100m',access:'JR新居浜駅（バス・タクシー）',fee:'なし',season:'6〜10月',emoji:'💎',
    desc:'超塩基性岩（かんらん岩・蛇紋岩）の特殊な岩質に育つ希少高山植物の宝庫。植物愛好家や自然観察登山者に人気の四国の名峰。',
    overview:'<p>東赤石山（ひがしあかいしやま）は愛媛県新居浜市に位置する標高1,706mの山です。超塩基性岩（かんらん岩・蛇紋岩）という特殊な岩石からなり、この岩質特有の希少な高山植物が多数生育しています。</p><p>シコタンソウ・ヒメナデシコ・アカモノなど固有種も多く、植物愛好家や自然観察登山者から特に人気が高い山です。</p>',
    courses:[{n:'瀬場谷コース ★',d:'約8km',t:'5〜6時間',lv:'中級',note:'瀬場登山口から渓谷沿いを登る標準コース'},{n:'日浦コース（筏津コース）',d:'約8km',t:'5〜6時間',lv:'中級',note:'日浦登山口からのルート。周回コースも可能'}],
    steps:[{tp:'start',ti:'瀬場登山口（標高600m）',de:'林道終点に駐車場あり。'},{tp:'step',ti:'瀬場谷（渓谷部）',de:'清流沿いを登る癒しのゾーン。'},{tp:'step',ti:'赤石山荘（標高1,550m）',de:'避難小屋（無人）。ここから稜線へ。'},{tp:'goal',ti:'東赤石山山頂（標高1,706m）',de:'かんらん岩の岩峰。希少高山植物が点在。展望も良好。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★★☆',tx:'高山植物が咲き始める。シコタンソウは6月下旬から。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'高山植物が最盛期。涼しく快適なハイキング。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★☆',tx:'草紅葉と岩峰のコントラストが美しい。'},{tp:'winter',ti:'冬（11〜5月）',rt:'★★☆☆☆',tx:'積雪あり。アイゼン必要。'}],
    apub:'JR予讃線新居浜駅から瀬場登山口行きバス（限定的）またはタクシーで約40分',acar:'松山道新居浜ICから国道11号経由で瀬場登山口まで約30分',park:'瀬場登山口駐車場（無料）',
    ha1:'新居浜市内のホテル',hd1:'JR新居浜駅周辺のビジネスホテル。マイントピア別子（観光施設）も近い。',ha2:'西条市・四国中央市の宿',hd2:'周辺都市のビジネスホテル・旅館。',
    faqs:[{q:'超塩基性岩とはどういうものですか？',a:'地球深部のマントルを構成するかんらん岩が地表に露出した岩石。マグネシウムが多く鉄・ニッケルを含む。この特殊な土壌環境が希少な高山植物を生育させます。'},{q:'見られる希少植物を教えてください',a:'シコタンソウ・ヒメナデシコ・キバナノコマノツメなど蛇紋岩地特有の植物が見られます。7〜8月が開花のピーク。'},{q:'アクセス方法を教えてください',a:'JR新居浜駅からタクシーが実質的な選択肢（バスは本数が少ない）。マイカーは瀬場登山口まで国道11号から林道経由。'},{q:'難易度と装備を教えてください',a:'急登あり・岩場を歩く中級コース。標高差1,100mは相応の体力が必要。しっかりした登山靴・レインウェア必携。'}],
    tips:[{tp:'tip',ic:'🔬',ti:'植物観察登山に最適',tx:'蛇紋岩地特有の希少植物を観察できる日本でも数少ない山のひとつ。植物図鑑を持参して楽しもう。'},{tp:'info',ic:'💎',ti:'かんらん岩の輝き',tx:'かんらん岩（橄欖岩）は深緑〜黄緑色の美しい岩石。岩峰が太陽に輝く様子は美しく、山名の「赤石」とは違う表情を持つ。'}],
    rel:[{f:'ishizuchi.html',n:'石鎚山（愛媛）',d:'中級'},{f:'tsurugizan.html',n:'剣山（徳島）',d:'初級'}]},

  // 九州
  {file:'regions/kyushu/kujusan.html',regionSlug:'kyushu',name:'九重山（くじゅうさん）',short:'九重山',region:'九州',pref:'大分県玖珠郡九重町',diff:'easy',elev:'1,787m（中岳・九州最高峰）',dist:'約10km',time:'4〜6時間',ediff:'約550m',access:'JR豊後中村駅（バス・タクシー）',fee:'なし',season:'5〜10月（ミヤマキリシマは6月）',emoji:'🌿',
    desc:'九州最高峰・中岳を含む大分の名峰群。6月のミヤマキリシマ（ピンクのツツジ）の大群落が圧巻。牧ノ戸峠から登れる初心者向けコース。',
    overview:'<p>九重山（くじゅうさん）は大分県に位置する複数の火山峰からなる山塊で、最高峰は中岳（1,787m・九州本土最高峰）。日本百名山に選定されています。</p><p>6月のミヤマキリシマ（ピンクのツツジ）の大群落で「花の百名山」にも選ばれています。牧ノ戸峠（標高1,330m）まで車で行けるため、実質的な標高差が少なく初心者にも人気の山です。</p>',
    courses:[{n:'牧ノ戸峠コース ★',d:'約10km',t:'4〜6時間',lv:'初級',note:'最もポピュラー。牧ノ戸峠（1,330m）から登る'},{n:'長者原コース',d:'約14km',t:'5〜7時間',lv:'中級',note:'大曲登山口・長者原から。坊ガツル湿原経由'}],
    steps:[{tp:'start',ti:'牧ノ戸峠（標高1,330m）',de:'駐車場・売店あり。多くの登山者が集まる起点。'},{tp:'step',ti:'沓掛山（標高1,503m）',de:'牧ノ戸峠から約30分。展望が開け始める。'},{tp:'step',ti:'久住山（標高1,786m）',de:'九重山塊の盟主的な峰。天狗ヶ城・星生山も見える。'},{tp:'goal',ti:'中岳（標高1,787m）',de:'九州本土最高峰。御池（火口湖）を見下ろす絶景。'}],
    seas:[{tp:'spring',ti:'春（4〜5月）',rt:'★★★★☆',tx:'残雪期から新緑へ。4月には残雪がある。'},{tp:'summer',ti:'夏（6〜8月）',rt:'★★★★★',tx:'ミヤマキリシマ（6月）が最大の見どころ。夏も涼しい。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★☆',tx:'草紅葉・紅葉が美しい。10月の霧氷も人気。'},{tp:'winter',ti:'冬（11〜4月）',rt:'★★★☆☆',tx:'霧氷・積雪あり。アイゼン必要な場合も。'}],
    apub:'JR久大本線豊後中村駅から九重町バス（くじゅう高原バス・夏秋季）で牧ノ戸峠まで',acar:'大分道九重ICから国道210号・やまなみハイウェイ経由で牧ノ戸峠まで約20分',park:'牧ノ戸峠駐車場（無料・約200台）',
    ha1:'長者原・坊ガツルの宿・テント場',hd1:'長者原のビジターセンター周辺の宿泊施設や坊ガツル野営場（無料）。',ha2:'飯田高原・黒川温泉',hd2:'山麓の飯田高原リゾートホテルや九州屈指の温泉地・黒川温泉の旅館。',
    faqs:[{q:'ミヤマキリシマの見頃はいつですか？',a:'例年6月上旬〜中旬が見頃。扇ヶ鼻・平治岳のミヤマキリシマが特に有名で、ピンクの花が斜面を埋め尽くす光景は圧巻。'},{q:'坊ガツル湿原について教えてください',a:'九重山麓に広がるラムサール条約登録湿原。コケモモ・タデ原の植生が豊か。テント場（無料）もあり、縦走登山の拠点として人気。'},{q:'牧ノ戸峠の駐車場は混みますか？',a:'週末・ミヤマキリシマシーズン（6月）は早朝から満車になります。平日または早朝（7時前）到着を推奨。'},{q:'初心者・ファミリーは可能ですか？',a:'牧ノ戸峠（1,330m）からのスタートで標高差が少なく、整備されたコースのため初心者・ファミリーに最適。小学生から楽しめます。'},{q:'日帰りは可能ですか？',a:'牧ノ戸峠から久住山・中岳往復は日帰り可能（約5〜6時間）。坊ガツル湿原まで足を延ばす場合は1泊がおすすめ。'}],
    tips:[{tp:'tip',ic:'🌸',ti:'6月のミヤマキリシマが絶景',tx:'平治岳・扇ヶ鼻・黒岩山のミヤマキリシマ群落は九州随一の規模。ピンクの花が山全体を覆う光景は一見の価値あり。'},{tp:'info',ic:'♨️',ti:'下山後は黒川温泉',tx:'九重山から車で30分の黒川温泉は日本を代表する温泉地。入湯手形（3湯めぐり）が人気。登山の締めくくりに最適。'},{tp:'caution',ic:'🌁',ti:'霧が出やすい',tx:'くじゅう連山は霧が出やすい。ガスの中での登山は方向感覚を失いやすいため、地図・コンパス・スマホGPSを必携。'}],
    rel:[{f:'aso.html',n:'阿蘇山（熊本）',d:'初級'},{f:'yakushima.html',n:'屋久島（鹿児島）',d:'中級'},{f:'sobozan.html',n:'祖母山（大分）',d:'中級'}]},

  {file:'regions/kyushu/kaimonodake.html',regionSlug:'kyushu',name:'開聞岳（かいもんだけ）',short:'開聞岳',region:'九州',pref:'鹿児島県指宿市',diff:'medium',elev:'924m',dist:'約8km',time:'3〜4時間',ediff:'約900m',access:'JR指宿枕崎線開聞駅',fee:'なし',season:'通年（春〜秋がベスト）',emoji:'🌋',
    desc:'薩摩富士の美しい円錐形・鹿児島県の名峰。海に突き出す独立峰で海越しの絶景が素晴らしい。指宿温泉と組み合わせた旅行が人気。',
    overview:'<p>開聞岳（かいもんだけ）は鹿児島県指宿市に位置する標高924mの独立峰で、「薩摩富士」の愛称で親しまれています。薩摩半島南端に位置し、東シナ海・薩摩湾・遠く種子島・屋久島まで望める絶景の展望が魅力です。</p><p>らせん状に山頂を目指すコースは変化に富み、海からそびえる山容は日本の山の中でも特に美しい形を持ちます。日本百名山のひとつ。</p>',
    courses:[{n:'2合目登山口コース（標準） ★',d:'約8km',t:'3〜4時間',lv:'中級',note:'唯一の正規登山コース。らせん状に山頂を目指す'}],
    steps:[{tp:'start',ti:'2合目登山口（標高約50m）',de:'開聞駅から徒歩約30分または車で5分。駐車場あり。'},{tp:'step',ti:'5合目（標高約440m）',de:'大きな岩が目印。ここから展望が開ける。'},{tp:'step',ti:'7合目（標高約680m）',de:'薩摩湾・指宿方面の眺望が素晴らしい。'},{tp:'goal',ti:'山頂（標高924m）',de:'360度の展望。薩摩湾・東シナ海・種子島・屋久島が見渡せる。'}],
    seas:[{tp:'spring',ti:'春（3〜5月）',rt:'★★★★★',tx:'気温が快適で最もおすすめ。桜の頃は山麓も美しい。'},{tp:'summer',ti:'夏（6〜9月）',rt:'★★★☆☆',tx:'暑いが海の青さが際立つ。早朝出発推奨。'},{tp:'autumn',ti:'秋（10〜11月）',rt:'★★★★★',tx:'涼しく快適。空気が澄んで展望が良い。'},{tp:'winter',ti:'冬（12〜2月）',rt:'★★★★☆',tx:'積雪はほぼなし。空気が澄んで遠くまで見渡せる。'}],
    apub:'JR指宿枕崎線開聞駅から2合目登山口まで徒歩約30分（または駅からタクシー5分）',acar:'九州道鹿児島ICから国道226号経由で2合目登山口まで約1時間30分',park:'2合目登山口駐車場（無料）',
    ha1:'指宿温泉のホテル・旅館',hd1:'砂蒸し温泉で有名な指宿温泉。登山後の宿泊に最適。',ha2:'知覧・山川の宿',hd2:'知覧特攻平和会館の近くや山川港周辺の宿泊施設。',
    faqs:[{q:'登山口へのアクセス方法は？',a:'JR開聞駅から徒歩約30分（舗装路）。または車・タクシーで2合目登山口へ。車の場合は国道226号から道路看板を確認。'},{q:'山頂から種子島・屋久島は見えますか？',a:'晴天時は種子島・屋久島・口永良部島まで見渡せます。特に冬（12〜2月）は空気が澄んで見えやすい。'},{q:'難易度はどのくらいですか？',a:'標高924mながら0mに近い海抜から登るため標高差は大きい（約900m）。整備はされているが中級者向け。急な岩場はなく体力勝負。'},{q:'指宿の砂蒸し温泉と合わせた旅行は？',a:'開聞岳登山後に指宿温泉の砂蒸し温泉（砂むし会館「砂楽」等）に立ち寄るプランが人気。鹿児島の食文化も楽しめる。'},{q:'冬でも登れますか？',a:'鹿児島県南部のため積雪はほぼなく、冬でも登山可能。12〜2月の晴れた日は展望が特に良い。'}],
    tips:[{tp:'tip',ic:'🌊',ti:'海から登る独立峰の醍醐味',tx:'ほぼ海抜0mから始まる登山は海越しの絶景が楽しめる。振り返るごとに眼下の薩摩湾が広がる達成感がある。'},{tp:'info',ic:'♨️',ti:'砂蒸し温泉は日本唯一',tx:'指宿温泉の砂蒸し風呂は世界でも珍しい天然温泉。登山の疲れをほぐすのに最適。'}],
    rel:[{f:'aso.html',n:'阿蘇山（熊本）',d:'初級'},{f:'yakushima.html',n:'屋久島（鹿児島）',d:'中級'},{f:'kujusan.html',n:'九重山（大分）',d:'初級'}]},

  {file:'regions/kyushu/unzendake.html',regionSlug:'kyushu',name:'雲仙岳（うんぜんだけ）',short:'雲仙岳',region:'九州',pref:'長崎県島原半島',diff:'easy',elev:'1,483m（平成新山）・1,359m（普賢岳・登山可）',dist:'約7km',time:'3〜4時間',ediff:'約650m',access:'JR諫早駅（バス）または島原港（フェリー）',fee:'なし',season:'4〜11月（ミヤマキリシマは5〜6月）',emoji:'🌋',
    desc:'1990〜95年の大噴火で誕生した平成新山を間近に見る迫力の山。雲仙温泉・地獄の観光と組み合わせた旅行が人気。',
    overview:'<p>雲仙岳（うんぜんだけ）は長崎県島原半島に位置する火山群です。1990〜1995年の火砕流噴火で43名が犠牲になり、溶岩ドーム「平成新山」が誕生しました。普賢岳（1,359m）からは平成新山を間近に見ることができる迫力の絶景が広がります。</p><p>雲仙温泉は天然の地獄（温泉噴気）で有名で、登山と温泉観光をセットで楽しめます。5〜6月のミヤマキリシマも見どころです。</p>',
    courses:[{n:'仁田峠→妙見岳→普賢岳周回 ★',d:'約7km',t:'3〜4時間',lv:'初級',note:'ロープウェイで妙見岳まで上がり周回'},{n:'白雲の池コース',d:'約9km',t:'4〜5時間',lv:'中級',note:'徒歩で登る変化のあるルート'}],
    steps:[{tp:'start',ti:'仁田峠（標高約850m）',de:'ロープウェイ乗り場。駐車場・売店あり。'},{tp:'step',ti:'妙見岳（標高1,333m）',de:'ロープウェイで約4分。国見岳・普賢岳が一望。'},{tp:'step',ti:'国見岳（標高1,347m）',de:'平成新山を間近に見られるポイント。迫力の溶岩ドーム。'},{tp:'goal',ti:'普賢岳（標高1,359m）',de:'雲仙最高峰（登山可能）。平成新山が眼前に迫る絶景。'}],
    seas:[{tp:'spring',ti:'春（3〜5月）',rt:'★★★★☆',tx:'ミツバツツジ・ミヤマキリシマが咲き始める。'},{tp:'summer',ti:'夏（6〜8月）',rt:'★★★★☆',tx:'ミヤマキリシマ（5〜6月）の後、涼しい高原歩き。'},{tp:'autumn',ti:'秋（9〜11月）',rt:'★★★★★',tx:'紅葉（10〜11月）が美しい。温泉と合わせた旅行がおすすめ。'},{tp:'winter',ti:'冬（12〜3月）',rt:'★★★☆☆',tx:'積雪あり。温泉地雲仙の冬情緒も楽しめる。'}],
    apub:'JR長崎本線諫早駅から島鉄バスで雲仙まで約1時間30分。または熊本港から有明フェリーで島原港→バス。',acar:'長崎道諫早ICから国道57号・雲仙グリーンロード経由で仁田峠まで約1時間',park:'仁田峠循環道路入口に有料駐車場',
    ha1:'雲仙温泉の旅館・ホテル',hd1:'日本初の国立公園・雲仙の温泉地。硫黄泉で有名な温泉旅館が多数。',ha2:'島原市内のホテル',hd2:'島原城のある島原市のビジネスホテル。フェリーで熊本との往来に便利。',
    faqs:[{q:'平成新山は登れますか？',a:'平成新山（1,483m）は火山活動のため立入禁止区域内にあり、現在も登山できません。普賢岳（1,359m）から間近に見ることができます。'},{q:'ロープウェイの料金は？',a:'大人片道700円・往復1,300円（参考）。例年3〜11月運行。'},{q:'雲仙地獄の見どころを教えてください',a:'雲仙温泉街には天然の噴気・熱泥が噴出する「地獄」が点在。大叫喚地獄・お糸地獄など30か所以上あり、無料で見学できます。'},{q:'ミヤマキリシマの見頃はいつですか？',a:'例年5月下旬〜6月上旬が見頃。妙見岳・国見岳の斜面がピンク色に染まります。'},{q:'1990年の噴火について教えてください',a:'1990〜95年の噴火は火砕流・土石流で43名が犠牲になった。現地には「砂防みらい館」（無料）があり噴火の記録を学べます。'}],
    tips:[{tp:'info',ic:'🌋',ti:'噴火の歴史を学ぶ',tx:'雲仙岳災害記念館「がまだすドーム」や砂防みらい館で1990年の噴火の記録を見てから登ると、山を見る視点が変わる。'},{tp:'tip',ic:'♨️',ti:'温泉観光と組み合わせ',tx:'雲仙温泉は日本初の国立公園内の温泉地。登山後に地獄めぐり→温泉入浴→海鮮料理のプランが人気。'},{tp:'caution',ic:'⚠️',ti:'平成新山立入禁止区域',tx:'平成新山周辺は立入禁止区域あり。登山道外に出ないよう注意。'}],
    rel:[{f:'aso.html',n:'阿蘇山（熊本）',d:'初級'},{f:'kujusan.html',n:'九重山（大分）',d:'初級'}]},

  {file:'regions/kyushu/sobozan.html',regionSlug:'kyushu',name:'祖母山（そぼさん）',short:'祖母山',region:'九州',pref:'大分県・宮崎県・熊本県',diff:'medium',elev:'1,756m',dist:'約8km',time:'5〜6時間',ediff:'約900m',access:'JR豊後竹田駅（タクシー）',fee:'なし',season:'5〜11月',emoji:'🌲',
    desc:'日本百名山・九州中部山地の主峰。天照大神の祖母・豊玉姫を祀る霊峰。杉の原生林を抜ける本格山岳登山で静かな山歩きが楽しめる。',
    overview:'<p>祖母山（そぼさん）は大分・宮崎・熊本の3県にまたがる標高1,756mの山で、日本百名山のひとつです。天照大神の祖母にあたる豊玉姫を祀る霊峰として知られています。</p><p>九州中部山地の主峰として堂々たる山容を持ち、スギ・ヒノキの原生林を抜ける本格的な山岳登山が楽しめます。観光地化されておらず静かな山歩きができる点も魅力です。</p>',
    courses:[{n:'北谷登山口コース ★',d:'約8km',t:'5〜6時間',lv:'中級',note:'最短・最ポピュラー。千間平経由で山頂へ'},{n:'尾平コース',d:'約12km',t:'6〜7時間',lv:'中級',note:'尾平トンネル側から。縦走向け'},{n:'宮原コース（熊本側）',d:'約10km',t:'5〜6時間',lv:'中級',note:'熊本県側から登るルート'}],
    steps:[{tp:'start',ti:'北谷登山口（標高850m）',de:'駐車場・トイレあり。北谷登山口小屋。'},{tp:'step',ti:'千間平（標高1,400m）',de:'広い台地。展望が開ける。'},{tp:'step',ti:'国観峠（標高1,590m）',de:'祖母山最高峰への分岐点。'},{tp:'goal',ti:'祖母山山頂（標高1,756m）',de:'山頂に小祠あり。阿蘇山・傾山・九重山の展望。'}],
    seas:[{tp:'spring',ti:'春（4〜6月）',rt:'★★★★☆',tx:'シャクナゲ（5〜6月）が咲く。新緑が清々しい。'},{tp:'summer',ti:'夏（7〜9月）',rt:'★★★★☆',tx:'涼しく快適なハイキング。'},{tp:'autumn',ti:'秋（10〜11月）',rt:'★★★★★',tx:'紅葉が最も美しいシーズン。10月下旬〜11月上旬が見頃。'},{tp:'winter',ti:'冬（12〜3月）',rt:'★★★☆☆',tx:'積雪あり。アイゼン必要な場合も。'}],
    apub:'JR豊肥本線豊後竹田駅からタクシーで北谷登山口まで（約50分・公共交通なし）',acar:'大分道竹田ICから国道57号・502号経由で北谷登山口まで約40分',park:'北谷登山口駐車場（無料・約30台）',
    ha1:'豊後竹田市内の旅館',hd1:'竹田市内の旅館・ビジネスホテル。岡城・竹田温泉などの観光も楽しめる。',ha2:'尾平温泉（山麓）',hd2:'山麓の尾平温泉。登山者が多く利用する秘境の温泉地。',
    faqs:[{q:'シャクナゲの見頃と場所は？',a:'例年5月中旬〜6月上旬が見頃。国観峠〜山頂付近の斜面にホンシャクナゲが群生。ピンク〜白色の花が美しい。'},{q:'傾山との縦走はできますか？',a:'祖母山〜障子岳〜古祖母山〜傾山への縦走（約25km）は「祖母・傾・大崩ユネスコエコパーク」の本格縦走コース。2泊3日が標準。'},{q:'公共交通でのアクセス方法は？',a:'豊後竹田駅からタクシーが実質的な選択肢。事前予約を推奨。竹田市観光協会に相談するとタクシー会社を紹介してもらえます。'},{q:'クマはいますか？',a:'九州にツキノワグマは生息していませんが、イノシシが出没することがあります。熊鈴を持つ習慣がない地域ですが、笛などで音を出して歩くと安心。'},{q:'山小屋はありますか？',a:'山頂直下に9合目小屋（無人避難小屋）があります。縦走時の緊急避難に利用可能。'}],
    tips:[{tp:'tip',ic:'🌺',ti:'シャクナゲが絶品',tx:'5月のシャクナゲは祖母山の最大の見どころ。国観峠付近から山頂にかけて群生し、ピンクと白の花が岩稜に映える。'},{tp:'info',ic:'🏔️',ti:'静かな本格登山',tx:'観光地化されていないため登山者が少なく、静かな山歩きができる。九州の山が好きな登山者にとって外せない名峰。'},{tp:'caution',ic:'🚗',ti:'公共交通は使えない',tx:'公共交通がないため、マイカーまたは事前のタクシー手配が必須。下山時刻を想定してタクシー予約しておくと安心。'}],
    rel:[{f:'aso.html',n:'阿蘇山（熊本）',d:'初級'},{f:'yakushima.html',n:'屋久島（鹿児島）',d:'中級'},{f:'kujusan.html',n:'九重山（大分）',d:'初級'}]},
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
