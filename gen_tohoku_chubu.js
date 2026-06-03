const fs = require('fs');
const path = require('path');
const BASE = 'C:/Users/user/hiking-site';

function makePage(m) {
  const r = '../../';
  const faqJson = m.faqs.map(f => `{"@type":"Question","name":"${f.q.replace(/"/g,"'")}","acceptedAnswer":{"@type":"Answer","text":"${f.a.replace(/"/g,"'").replace(/\n/g,' ')}"}}`).join(',');
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
          <div class="access-card"><h3>🚗 車でのアクセス</h3><ul class="access-list"><li>${m.acar}</li></ul><h4>駐車場</h4><ul class="access-list"><li>${m.park}</li></ul></div>
        </div>
      </section>
      <section id="gear" class="content-section"><h2>必要な装備</h2>
        <div class="gear-categories">
          <div class="gear-category must"><h3>必須アイテム</h3><ul class="gear-list">
            <li class="gear-item"><span class="gear-icon">🥾</span><div class="gear-detail"><strong>登山靴</strong><a href="${r}gear/shoes.html" class="gear-link">おすすめを見る →</a></div></li>
            <li class="gear-item"><span class="gear-icon">💧</span><div class="gear-detail"><strong>飲料水（1.5〜2L）</strong></div></li>
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
  // 東北
  {file:'regions/tohoku/hakkodasan.html',regionSlug:'tohoku',name:'八甲田山（はっこうださん）',short:'八甲田山',region:'東北',pref:'青森県青森市',diff:'medium',elev:'1,585m（大岳）',dist:'約8km',time:'4〜5時間',ediff:'約600m',access:'青森駅（バス）',fee:'無料',season:'7〜9月（冬樹氷は12〜2月）',emoji:'🌿',
    desc:'田茂萢湿原の絶景と冬の樹氷「雪の回廊」で有名な東北の百名山。ロープウェイで山頂付近までアクセス可能。',
    overview:'<p>八甲田山（はっこうださん）は青森県に位置する複数の火山が連なる山系の総称で、最高峰は大岳（1,585m）。日本百名山のひとつです。冬の「樹氷モンスター」と夏の田茂萢湿原のニッコウキスゲが特に有名。</p><p>ロープウェイで標高1,324mの山頂公園駅まで上がれるため、初心者から中級者まで楽しめます。酸ヶ湯温泉を拠点とした周回コースが人気です。</p>',
    courses:[{n:'酸ヶ湯周回コース ★',d:'約8km',t:'4〜5時間',lv:'中級',note:'酸ヶ湯温泉起点の定番周回'},{n:'ロープウェイ利用コース',d:'約5km',t:'約3時間',lv:'初級',note:'ロープウェイで上り湿原散策'}],
    steps:[{tp:'start',ti:'酸ヶ湯温泉（標高890m）',de:'青森駅から約70分のバス。国民保養温泉地・ヒバ千人風呂が名物。'},{tp:'step',ti:'仙人岱（標高1,290m）',de:'高山植物が豊富な湿原地帯。'},{tp:'step',ti:'大岳山頂（標高1,585m）',de:'360度の展望。岩木山・白神山地まで見渡せる。'},{tp:'goal',ti:'毛無岱（标高约1,000m）',de:'紅葉が美しい湿原。木道が整備されていて歩きやすい。'}],
    seas:[{tp:'spring',ti:'春（4〜5月）',rt:'★★★☆☆',tx:'「雪の回廊」が残る時期。残雪でぬかるみあり。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'ニッコウキスゲ・ハクサンチドリが咲く最盛期。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★★',tx:'毛無岱の草紅葉が絶景。10月中旬が見頃。'},{tp:'winter',ti:'冬（1〜2月）',rt:'★★★★★',tx:'樹氷モンスター（スノーモンスター）が見頃。'}],
    apub:'青森駅からJRバス十和田湖行きで酸ヶ湯温泉下車（約70分）',acar:'東北道青森ICから国道103号経由で酸ヶ湯温泉まで約40分',park:'酸ヶ湯温泉駐車場（無料・約400台）',
    ha1:'酸ヶ湯温泉旅館',hd1:'登山口直結の国民保養温泉地。ヒバ千人風呂（混浴）が有名。要予約。',ha2:'青森市内のホテル',hd2:'青森駅周辺のビジネスホテル。ねぶた祭の拠点にもなる。',
    faqs:[{q:'冬の樹氷はいつ見られますか？',a:'例年1月中旬〜2月下旬が見頃。ロープウェイを利用して樹氷原まで上がれます。ライトアップも実施されます。'},{q:'ロープウェイはいつ運行していますか？',a:'通年運行（整備期間を除く）。片道1,300円（大人）。冬季は6時台から運行し、樹氷鑑賞に対応。'},{q:'初心者でも登れますか？',a:'ロープウェイ利用で山頂公園から田茂萢湿原を散策するコース（約1時間）は初心者でも楽しめます。'},{q:'熊はいますか？',a:'ツキノワグマが生息しています。熊鈴を持参し、単独行は避けてください。'},{q:'酸ヶ湯温泉の入浴料は？',a:'日帰り入浴は600円。ヒバ千人風呂（混浴）は独特の文化があります。'}],
    tips:[{tp:'caution',ic:'⛈️',ti:'午後の天候変化',tx:'八甲田山は霧が出やすい。午後は急に視界が悪くなることがあるため、早朝出発を心がけること。'},{tp:'tip',ic:'❄️',ti:'冬の樹氷鑑賞',tx:'ロープウェイで樹氷原（1,600m付近）まで上がれる。1〜2月の「樹氷ライトアップ」は幻想的。'},{tp:'info',ic:'♨️',ti:'酸ヶ湯温泉は必訪',tx:'pH1.1の強酸性硫黄泉。下山後の疲労回復に最適。千人風呂（160畳！）は東北を代表する名湯。'}],
    rel:[{f:'zao.html',n:'蔵王山（東北）',d:'初級'},{f:'adatarasan.html',n:'安達太良山（福島）',d:'初級'}]},

  {file:'regions/tohoku/adatarasan.html',regionSlug:'tohoku',name:'安達太良山（あだたらやま）',short:'安達太良山',region:'東北',pref:'福島県二本松市',diff:'easy',elev:'1,700m（箕輪山）',dist:'約8km',time:'4〜5時間',ediff:'約650m',access:'JR二本松駅（バス）',fee:'無料',season:'6〜10月',emoji:'☁️',
    desc:'高村光太郎の詩「智恵子抄」で詠まれた福島の百名山。ゴンドラ利用で初心者でも登れる。噴火口跡「沼ノ平」の絶景が見どころ。',
    overview:'<p>安達太良山（あだたらやま）は福島県二本松市に位置する標高1,700m（最高峰・箕輪山）の山で、日本百名山のひとつです。高村光太郎の詩集「智恵子抄」に登場する「ほんとうの空」で有名です。</p><p>ゴンドラを使えば山頂まで比較的楽にアクセスでき、紅葉シーズン（10月上旬）は特に人気が高い山です。噴火口跡の「沼ノ平」は立入禁止区域ですが、外縁からの眺めは圧巻です。</p>',
    courses:[{n:'ゴンドラ利用コース ★',d:'約8km',t:'4〜5時間',lv:'初級',note:'ゴンドラで薬師岳まで上がる定番コース'},{n:'奥岳登山口からの周回',d:'約9km',t:'5〜6時間',lv:'中級',note:'全コース徒歩。変化のある周回ルート'}],
    steps:[{tp:'start',ti:'あだたら山ロープウェイ（奥岳登山口）',de:'バス終点。ゴンドラ乗り場はここ。駐車場あり。'},{tp:'step',ti:'薬師岳（1,350m）',de:'ゴンドラ降り場。展望台あり。ここから登山開始。'},{tp:'step',ti:'安達太良山本峰（乳首・1,699m）',de:'特徴的な岩峰「乳首」が山頂のシンボル。360度の展望。'},{tp:'goal',ti:'沼ノ平展望（1,600m付近）',de:'噴火口跡の絶景。立入禁止区域の外縁から眺める。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★★☆',tx:'シャクナゲ・ミネザクラが咲く。新緑が爽快。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★☆',tx:'涼しく快適なハイキング。高山植物が見頃。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★★',tx:'紅葉（10月上旬）が最盛期。混雑するが絶景。'},{tp:'winter',ti:'冬（11〜4月）',rt:'★★★☆☆',tx:'積雪あり。アイゼン必要。冬山装備が必須。'}],
    apub:'JR東北本線二本松駅からあだたら山ロープウェイ行きバス（あだたら山ろく号・夏秋季節運行）',acar:'東北道二本松ICから国道459号経由で奥岳登山口まで約15分',park:'奥岳駐車場（無料・約700台）',
    ha1:'岳温泉の旅館・ホテル',hd1:'麓の岳温泉は福島を代表する温泉地。源泉かけ流しの宿が多数。登山前後に最適。',ha2:'二本松市内のホテル',hd2:'JR二本松駅周辺のビジネスホテル。',
    faqs:[{q:'ゴンドラはいつ運行していますか？',a:'例年4月下旬〜11月下旬（整備期間除く）。片道1,000円・往復1,500円（大人）。紅葉シーズンは7時台から運行。'},{q:'沼ノ平には入れますか？',a:'火山性ガスのため沼ノ平への立入は禁止されています。展望台から眺めることはできます。'},{q:'智恵子抄との関係を教えてください',a:'高村光太郎の詩集「智恵子抄」に「安達太良山の上に広がるほんとうの空がある」という表現があります。詩のゆかりの地として全国から訪れる方がいます。'},{q:'紅葉の見頃はいつですか？',a:'例年10月上旬〜中旬が見頃。特に沼ノ平周辺の紅葉は絶景です。'},{q:'初心者でも登れますか？',a:'ゴンドラ利用コースは整備されており初心者でも安心。山頂直下は少し急ですが鎖場はありません。'}],
    tips:[{tp:'tip',ic:'🍂',ti:'秋の紅葉が最もおすすめ',tx:'10月上旬の紅葉シーズンは沼ノ平の錆色と紅葉のコントラストが絶景。混雑するが一見の価値あり。'},{tp:'caution',ic:'🌫️',ti:'沼ノ平の火山性ガス',tx:'沼ノ平周辺では火山性ガスが発生することがある。立入禁止区域は必ず守ること。'},{tp:'info',ic:'☁️',ti:'智恵子抄の「ほんとうの空」',tx:'東京出身の智恵子が「ほんとうの空」と表現した安達太良山上の空。詩を読んでから訪れるとより感動的。'}],
    rel:[{f:'zao.html',n:'蔵王山（東北）',d:'初級'},{f:'hakkodasan.html',n:'八甲田山（青森）',d:'中級'}]},

  {file:'regions/tohoku/akitakomadake.html',regionSlug:'tohoku',name:'秋田駒ヶ岳（あきたこまがたけ）',short:'秋田駒ヶ岳',region:'東北',pref:'秋田県仙北市・岩手県雫石町',diff:'easy',elev:'1,637m（女岳）',dist:'約8km',time:'4〜5時間',ediff:'約490m',access:'JR田沢湖駅（バス）',fee:'無料',season:'6〜8月（高山植物）',emoji:'🌸',
    desc:'コマクサの大群落と多彩な高山植物で「花の百名山」に選ばれた東北の名峰。マイカー規制あり・8合目バス停から登山。',
    overview:'<p>秋田駒ヶ岳（あきたこまがたけ）は秋田県と岩手県にまたがる標高1,637mの山です。「花の百名山」に選ばれており、6〜7月のコマクサ（高山植物の女王）の大群落が圧巻です。</p><p>マイカー規制があり、8合目登山口まで田沢湖高原からのバスを利用します。8合目バス停からのコースは比較的アクセスしやすく、初〜中級者にも人気です。</p>',
    courses:[{n:'8合目→阿弥陀池→男岳周回 ★',d:'約8km',t:'4〜5時間',lv:'初級',note:'コマクサ・阿弥陀池・男岳を巡る定番コース'},{n:'8合目→女岳往復',d:'約5km',t:'約3時間',lv:'初級',note:'最高峰への最短ルート'}],
    steps:[{tp:'start',ti:'8合目バス停（標高1,280m）',de:'田沢湖高原からバスで。駐車場・トイレあり。'},{tp:'step',ti:'阿弥陀池（標高1,463m）',de:'高層湿原。コマクサ群落が近くにある。避難小屋あり。'},{tp:'step',ti:'男岳（1,623m）',de:'阿弥陀池を見下ろす絶好の展望地。'},{tp:'goal',ti:'女岳（1,637m）・馬場の小路（ムーミン谷）',de:'最高峰とお花畑の谷。コマクサは6月〜7月が見頃。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★★☆',tx:'コマクサが咲き始める。残雪で一部アイゼン必要の場合も。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'コマクサ最盛期は6〜7月。高山植物全般が見頃。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★☆',tx:'草紅葉が美しい。特に阿弥陀池周辺の紅葉が人気。'},{tp:'winter',ti:'冬（11〜5月）',rt:'☆☆☆☆☆',tx:'一般登山不可。'}],
    apub:'JR田沢湖駅から羽後交通バスで8合目まで（5〜11月の一定期間・マイカー規制あり）',acar:'秋田道大曲ICから国道46号・田沢湖高原経由で8合目まで（マイカー規制期間はバスに乗換）',park:'田沢湖高原の駐車場からバス利用（マイカー規制期間は8合目まで車不可）',
    ha1:'乳頭温泉の旅館',hd1:'「秘湯を守る会」加盟の乳頭温泉郷（7つの温泉宿）。日本を代表する秘湯。要予約。',ha2:'田沢湖高原・角館のホテル',hd2:'田沢湖高原のリゾートホテルや角館の武家屋敷街近くの宿。',
    faqs:[{q:'コマクサの見頃はいつですか？',a:'例年6月中旬〜7月中旬が最盛期。特に「馬場の小路（ムーミン谷）」のコマクサ群落は規模が大きく圧巻です。'},{q:'マイカー規制はいつですか？',a:'例年5月下旬〜10月末の一定期間（曜日・時間帯指定）にマイカー規制が実施されます。田沢湖高原からシャトルバスを利用してください。'},{q:'8合目バスの時刻は？',a:'JR田沢湖駅発が始発（約50分で8合目着）。シーズン中は増便あり。最新時刻は羽後交通公式サイトで確認。'},{q:'子連れでも楽しめますか？',a:'8合目から阿弥陀池周辺は比較的歩きやすく、小学生以上なら楽しめます。ただし急な天候変化に備えて防寒具を準備してください。'},{q:'乳頭温泉について教えてください',a:'田沢湖高原の奥にある「乳頭温泉郷」は7つの宿が点在する日本屈指の秘湯。登山前後に宿泊するプランが人気です。'}],
    tips:[{tp:'tip',ic:'🌺',ti:'コマクサは東北随一の規模',tx:'秋田駒ヶ岳のコマクサ群落は東北最大規模。6月下旬〜7月上旬が最も多く咲き、ピンク色の絨毯が広がる。'},{tp:'caution',ic:'🌁',ti:'ガスが出やすい山',tx:'午後からガスが発生しやすい。午前中の行動を心がけ、視界が悪くなったら無理に進まない。'},{tp:'info',ic:'🚌',ti:'バス移動が原則',tx:'マイカー規制期間中は田沢湖高原駐車場でバスに乗り換えが必要。事前に運行スケジュールを確認しておくこと。'}],
    rel:[{f:'zao.html',n:'蔵王山（東北）',d:'初級'},{f:'iwateyama.html',n:'岩手山（岩手）',d:'中級'}]},

  {file:'regions/tohoku/iwateyama.html',regionSlug:'tohoku',name:'岩手山（いわてさん）',short:'岩手山',region:'東北',pref:'岩手県盛岡市・八幡平市',diff:'medium',elev:'2,038m（岩手県最高峰）',dist:'約12km',time:'7〜8時間',ediff:'約1,500m',access:'JR盛岡駅（バス・タクシー）',fee:'無料',season:'7〜9月',emoji:'🗻',
    desc:'岩手県最高峰・南部片富士の美しい山容。日本百名山。馬返し登山口からの本格登山でお鉢巡りが醍醐味。',
    overview:'<p>岩手山（いわてさん）は岩手県の最高峰で標高2,038m。「南部片富士」と称される端正な山容が美しく、日本百名山のひとつです。盛岡市内からも山容が望め、岩手県のシンボルとなっています。</p><p>山頂のお鉢（直径約2km）を一周するお鉢巡りが登山の醍醐味。お鉢内にある不動平避難小屋を利用した1泊2日の登山も人気です。</p>',
    courses:[{n:'馬返しコース（旧道・新道） ★',d:'約12km',t:'7〜8時間',lv:'中級',note:'最ポピュラー。0合目から山頂往復'},{n:'焼走りコース',d:'約13km',t:'7〜8時間',lv:'中級',note:'溶岩流跡を歩くユニークなルート'}],
    steps:[{tp:'start',ti:'馬返し登山口（標高530m）',de:'駐車場・トイレあり。登山届ポスト設置。'},{tp:'step',ti:'6合目（標高1,450m）',de:'旧道と新道の合流点。視界が一気に開ける。'},{tp:'step',ti:'不動平（標高1,820m）',de:'お鉢の入口。避難小屋あり。ここからお鉢巡りへ。'},{tp:'goal',ti:'山頂（標高2,038m）',de:'岩手県最高峰。360度の大展望。晴天時は八甲田山・鳥海山まで見渡せる。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★☆☆',tx:'残雪あり。6月中旬まで雪渓が残ることも。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'登山ベストシーズン。高山植物が見頃。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★☆',tx:'草紅葉・紅葉が美しい。9月下旬から色づき始める。'},{tp:'winter',ti:'冬（11〜6月）',rt:'☆☆☆☆☆',tx:'積雪期は一般登山不可。'}],
    apub:'JR盛岡駅から岩手県交通バスで馬返しバス停まで（夏季季節運行・約50分）',acar:'東北道盛岡ICから国道4号・46号経由で馬返し登山口まで約40分',park:'馬返し駐車場（無料・約200台）',
    ha1:'盛岡市内のホテル',hd1:'JR盛岡駅周辺のホテルが便利。前泊して早朝出発するプランに。',ha2:'網張温泉・鶯宿温泉',hd2:'山麓の温泉地。下山後の温泉入浴に立ち寄れる宿も多い。',
    faqs:[{q:'お鉢巡りとはどういうものですか？',a:'山頂のカルデラ縁（直径約2km）を一周するコース。約1時間で巡れる。お鉢の内側には噴気孔があり活火山の迫力を感じられます。'},{q:'馬返しから山頂までの所要時間は？',a:'登り約4〜5時間、下り約3〜4時間。往復7〜8時間。体力によって大幅に変わるため時間に余裕を持ったプランで。'},{q:'初心者でも登れますか？',a:'急登が続き標高差1,500mは体力を要します。ハイキング経験者（月1〜2回）で体力がある方なら挑戦できます。'},{q:'アクセス方法を教えてください',a:'盛岡駅からバス（夏季季節運行）または車で馬返し登山口へ。マイカーの場合は早朝到着がおすすめ。'},{q:'水場はありますか？',a:'8合目付近に水場（湧水）があります。必ず煮沸して飲用してください。'}],
    tips:[{tp:'info',ic:'🏔️',ti:'お鉢巡りは必見',tx:'山頂のお鉢（火口）を一周するお鉢巡りは岩手山登山の醍醐味。好天時は絶景が広がる。余裕があれば必ず歩こう。'},{tp:'caution',ic:'⛈️',ti:'午後の雷雨',tx:'夏は午後から雷雨が発生しやすい。12時には下山開始を目標に計画を立てること。'},{tp:'tip',ic:'🌺',ti:'コマクサが見られる',tx:'7〜8合目付近でコマクサが見られる。白色のコマクサ（「白コマクサ」）が特に珍しい。'}],
    rel:[{f:'zao.html',n:'蔵王山（東北）',d:'初級'},{f:'akitakomadake.html',n:'秋田駒ヶ岳（秋田）',d:'初級'}]},

  {file:'regions/tohoku/gassan.html',regionSlug:'tohoku',name:'月山（がっさん）',short:'月山',region:'東北',pref:'山形県西村山郡西川町',diff:'easy',elev:'1,984m',dist:'約8km（リフト利用）',time:'4〜5時間',ediff:'約550m（リフト利用）',access:'JR鶴岡駅・山形駅（バス）',fee:'月山神社本宮拝観料500円',season:'7〜9月',emoji:'🌙',
    desc:'出羽三山の一つ・月山。仏教・神道の霊山として1,000年以上の信仰を持ち、夏スキーでも有名。リフト利用で初心者も登れる。',
    overview:'<p>月山（がっさん）は山形県に位置する標高1,984mの霊山で、出羽三山（羽黒山・湯殿山・月山）のひとつです。日本百名山に選定されています。</p><p>日本有数の豪雪地帯で、6〜7月まで残雪が残り夏スキーが楽しめることでも有名です。姥沢からのリフト（夏季運行）を利用すれば比較的手軽に登山できます。</p>',
    courses:[{n:'姥沢コース（リフト利用） ★',d:'約8km',t:'4〜5時間',lv:'初級',note:'リフトを使う最ポピュラーなコース'},{n:'弥陀ヶ原コース',d:'約10km',t:'5〜6時間',lv:'初級',note:'湿原地帯を歩く。月山の霊山らしさを感じる'}],
    steps:[{tp:'start',ti:'姥沢駐車場（標高940m）',de:'夏季はここからリフト乗り場へ徒歩約15分。'},{tp:'step',ti:'姥ヶ岳（標高1,670m）',de:'リフト山頂駅から徒歩20分。牛首方面へ続く稜線歩き。'},{tp:'step',ti:'牛首分岐（標高1,800m）',de:'弥陀ヶ原コースとの合流点。山頂へ最後の登りへ。'},{tp:'goal',ti:'月山山頂・月山神社本宮（標高1,984m）',de:'本宮参拝（拝観料500円）。厳かな雰囲気の山頂。'}],
    seas:[{tp:'spring',ti:'春（4〜6月）',rt:'★★★★★',tx:'夏スキーシーズン（4月〜7月上旬）。残雪の上をスキー・スノボ。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'高山植物が見頃。ウルップソウなど希少種も咲く。'},{tp:'autumn',ti:'秋（9月）',rt:'★★★★☆',tx:'草紅葉が美しい。9月下旬から色づき始める。'},{tp:'winter',ti:'冬（10〜3月）',rt:'★☆☆☆☆',tx:'豪雪のため一般登山不可。'}],
    apub:'JR鶴岡駅から庄内交通バスで姥沢口まで（夏秋季節運行・約1時間30分）',acar:'山形道月山ICから県道27号経由で姥沢まで約30分',park:'姥沢駐車場（有料・約400台）',
    ha1:'志津温泉・肘折温泉の旅館',hd1:'山麓の志津温泉は月山登山の前後泊に最適。肘折温泉も奥羽山系の名湯。',ha2:'鶴岡市内のホテル',hd2:'庄内エリアの中心地・鶴岡市のホテル。鶴岡市は食文化でも有名。',
    faqs:[{q:'夏スキーはいつできますか？',a:'姥沢スキー場の夏スキーは例年4月下旬〜7月上旬。月山スキー場は東北最遅の春スキーで有名。'},{q:'月山神社への参拝方法を教えてください',a:'山頂の月山神社本宮への参拝は入山料（拝観料）500円が必要。白装束の修験者が多く訪れる神聖な場所です。'},{q:'リフトの料金と時期は？',a:'月山リフトは例年7月上旬〜10月上旬の運行。片道900円・往復1,600円（大人）。'},{q:'弥陀ヶ原の見どころを教えてください',a:'弥陀ヶ原は高層湿原地帯で、木道が整備されています。ワタスゲ・ミツガシワなど湿地の植物が豊富です。'},{q:'宿泊しながら登れますか？',a:'山頂付近に月山頂上小屋あり（要予約・6〜9月営業）。麓の志津温泉に前泊して早朝出発するプランも人気。'}],
    tips:[{tp:'tip',ic:'⛷️',ti:'夏スキーは日本随一',tx:'月山のフィールドは春スキーのメッカ。GW〜7月上旬まで天然雪でスキー・スノボが楽しめる。レンタル装備もあり。'},{tp:'info',ic:'🙏',ti:'神聖な霊山',tx:'月山神社本宮は神聖な場所。参拝の際はマナーを守ること。白衣・白装束でお参りする修験者の方々も多い。'},{tp:'caution',ic:'🌧️',ti:'豪雪地帯の気象',tx:'月山は山形県でも有数の豪雪地帯。夏でも急に気温が下がることがある。防寒着必携。'}],
    rel:[{f:'zao.html',n:'蔵王山（東北）',d:'初級'},{f:'hakkodasan.html',n:'八甲田山（青森）',d:'中級'}]},

  // 中部
  {file:'regions/chubu/norikuradake.html',regionSlug:'chubu',name:'乗鞍岳（のりくらだけ）',short:'乗鞍岳',region:'中部',pref:'長野県・岐阜県',diff:'easy',elev:'3,026m（剣ヶ峰）',dist:'約6km',time:'2〜3時間',ediff:'約300m',access:'松本バスターミナル（バス）',fee:'無料',season:'7〜9月',emoji:'🌤️',
    desc:'バスで標高2,702mまで行ける3,000m超の高山。マイカー規制で環境保全。高山植物が豊富な初心者向けアルプスの玄関口。',
    overview:'<p>乗鞍岳（のりくらだけ）は長野県・岐阜県にまたがる標高3,026mの山で、日本百名山のひとつです。バスで標高2,702m（畳平）まで行けるため、3,000m超の山としては最も手軽に登れる山として人気があります。</p><p>マイカー規制（環境保全）が実施されており、バスまたは自転車でのみアクセス可能。高山植物の宝庫でコロナ観測所跡の剣ヶ峰（最高峰）からの展望が絶景です。</p>',
    courses:[{n:'畳平→剣ヶ峰（往復） ★',d:'約6km',t:'2〜3時間',lv:'初級',note:'バスで畳平まで上がり山頂を目指す'},{n:'畳平→大黒岳',d:'約2km',t:'約30分',lv:'初級',note:'富士見岳・大黒岳への手軽な散策'}],
    steps:[{tp:'start',ti:'畳平バスターミナル（標高2,702m）',de:'バスで約1時間30分。ビジターセンター・売店あり。コロナ観測所が見える。'},{tp:'step',ti:'肩ノ小屋（標高2,763m）',de:'乗鞍スカイラインとの分岐点。山小屋あり。'},{tp:'step',ti:'蚕玉岳（標高2,979m）',de:'剣ヶ峰直前のピーク。山頂が視界に入る。'},{tp:'goal',ti:'剣ヶ峰（標高3,026m）',de:'最高峰。朝日観測所（廃止）の建物が目印。北アルプス・富士山の展望。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★☆☆',tx:'残雪が多い。7月まで雪が残ることも。スキー可能な時期もあり。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'高山植物の最盛期。コマクサ・ウルップソウ・ハクサンイチゲが見頃。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★☆',tx:'草紅葉が美しい。初雪は10月下旬から。'},{tp:'winter',ti:'冬（11〜6月）',rt:'☆☆☆☆☆',tx:'バス運行なし。一般登山不可。'}],
    apub:'松本バスターミナルから乗鞍岳直行バスで畳平まで約1時間30分（7〜10月季節運行）',acar:'マイカー規制あり。乗鞍高原駐車場でバスに乗換。',park:'乗鞍高原・観光センター駐車場（無料）からシャトルバス利用',
    ha1:'乗鞍高原の旅館・ペンション',hd1:'麓の乗鞍高原は旅館・ペンション多数。温泉もあり登山前後の宿泊に最適。',ha2:'松本市内のホテル',hd2:'JR松本駅周辺のビジネスホテル。アルプスの玄関口として利便性高い。',
    faqs:[{q:'バスの時刻と期間は？',a:'松本バスターミナルから乗鞍高原行き→乗鞍高原から畳平行きで2本乗継。7〜10月の季節運行。最新時刻は松本電鉄バス公式サイトで確認。'},{q:'高山病対策は必要ですか？',a:'畳平（2,702m）に着いたらすぐ動かず30分以上高度順応してから登山開始。ゆっくり歩き、水分をこまめに補給することが重要です。'},{q:'初心者・子連れでも登れますか？',a:'畳平から剣ヶ峰は整備された登山道で初心者でも問題ありません。ただし高山病対策と防寒具（山頂は0〜10℃）は必須です。'},{q:'御来光を見るにはどうすればいいですか？',a:'畳平の山小屋（大雪渓小屋など）に前泊するか、早朝バスを利用。肩ノ小屋泊も可能（要予約）。'},{q:'コマクサはどこで見られますか？',a:'剣ヶ峰周辺の砂礫地や富士見岳周辺で見られます。7月中旬〜8月上旬が最盛期。'}],
    tips:[{tp:'caution',ic:'🏔️',ti:'高山病に注意',tx:'畳平は既に2,702m。平地から一気にバスで上がるため高山病になりやすい。到着後は必ず30分以上安静にして体を慣らすこと。'},{tp:'tip',ic:'🌺',ti:'高山植物の宝庫',tx:'乗鞍岳は日本を代表する高山植物の宝庫。コマクサ・ウルップソウ・チングルマなど多種多様な花が咲く。'},{tp:'info',ic:'🚌',ti:'マイカー規制を忘れずに',tx:'乗鞍は環境保全のためマイカー規制あり。乗鞍高原の駐車場から必ずシャトルバスを利用してください。'}],
    rel:[{f:'fuji.html',n:'富士山（静岡・山梨）',d:'中級'},{f:'kamikochi.html',n:'上高地（長野）',d:'初級'},{f:'yarigadake.html',n:'槍ヶ岳（長野・岐阜）',d:'上級'}]},

  {file:'regions/chubu/ontakesan.html',regionSlug:'chubu',name:'御嶽山（おんたけさん）',short:'御嶽山',region:'中部',pref:'長野県・岐阜県',diff:'medium',elev:'3,067m（剣ヶ峰）',dist:'約9km',time:'5〜6時間',ediff:'約1,200m',access:'JR木曽福島駅（バス・タクシー）',fee:'入山協力金1,000円（任意）',season:'7〜9月',emoji:'🙏',
    desc:'御嶽教の霊山として古くから信仰される独立峰。2014年の噴火で多くの犠牲者が出たが現在は登山可能（噴火警戒レベル1）。',
    overview:'<p>御嶽山（おんたけさん）は長野・岐阜県境に位置する標高3,067mの独立峰で、日本百名山のひとつです。御嶽教の霊山として古くから修験の山として知られています。</p><p>2014年9月の噴火では多くの方が犠牲になりました。現在は噴火警戒レベル1で登山が再開されていますが、入山前に必ず最新の警戒レベルを確認してください。ロープウェイ利用が可能です。</p>',
    courses:[{n:'黒沢コース（ロープウェイ利用） ★',d:'約9km',t:'5〜6時間',lv:'中級',note:'ロープウェイで7合目まで。最ポピュラー'},{n:'王滝コース',d:'約10km',t:'5〜6時間',lv:'中級',note:'王滝口からのルート。修験道の雰囲気'}],
    steps:[{tp:'start',ti:'黒沢口ロープウェイ山頂駅（標高2,150m）',de:'ロープウェイで7合目相当まで上がれる。'},{tp:'step',ti:'8合目女人堂（標高2,470m）',de:'かつて女人禁制の境界だった場所。山小屋あり。'},{tp:'step',ti:'9合目・石室山荘（標高2,780m）',de:'山小屋あり。山頂まであと少し。'},{tp:'goal',ti:'剣ヶ峰（標高3,067m）',de:'御嶽神社奥社が鎮座。2014年噴火の碑がある。噴火警戒レベル確認必須。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★☆☆',tx:'残雪あり。アイゼン必要な場合も。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'登山ベストシーズン。高山植物も見頃。'},{tp:'autumn',ti:'秋（9月）',rt:'★★★★★',tx:'紅葉（9月下旬〜10月上旬）が絶景。閉山前が混雑。'},{tp:'winter',ti:'冬（10〜6月）',rt:'☆☆☆☆☆',tx:'閉山・一般登山不可。'}],
    apub:'JR中央本線木曽福島駅から黒沢口行きバス（夏季）またはタクシーでロープウェイ乗り場まで',acar:'中央道伊那ICから国道361号経由で黒沢口登山口まで約1時間',park:'黒沢口駐車場（有料・約400台）',
    ha1:'木曽福島・開田高原の宿',hd1:'木曽福島町内や開田高原の旅館・民宿。木曽の宿場町情緒も楽しめる。',ha2:'御嶽山麓の山小屋',hd2:'黒沢山荘・八合目女人堂など山中の山小屋（要予約・6〜10月営業）。',
    faqs:[{q:'現在登山できますか？',a:'噴火警戒レベル1の場合は山頂火口から500m以内立入規制ありで登山可能です。入山前に気象庁公式サイトで最新のレベルを確認してください。'},{q:'ロープウェイの料金は？',a:'片道1,550円・往復3,000円（大人）。6月中旬〜11月上旬運行。'},{q:'2014年噴火について教えてください',a:'2014年9月27日に水蒸気噴火が突然発生し、登山者63名が犠牲になりました。登山道脇に慰霊碑があります。現地での静粛なマナーを心がけてください。'},{q:'ヘルメットは必要ですか？',a:'火山活動に備えてヘルメット着用を強く推奨しています。山麓でレンタルも可能です。'},{q:'御嶽教の霊場としての見どころは？',a:'登山道沿いに多数の石仏・霊神碑が並ぶ。御嶽神社奥社・王滝口頂上奥社など信仰の痕跡が各所に見られます。'}],
    tips:[{tp:'caution',ic:'🌋',ti:'噴火警戒レベルを必ず確認',tx:'入山前に気象庁の噴火警戒レベルを確認することが絶対に必要。レベル2以上は立入規制区域が拡大します。'},{tp:'caution',ic:'⛑️',ti:'ヘルメット着用推奨',tx:'噴火時に備えてヘルメット着用を推奨。山麓でレンタルできる場合もある。'},{tp:'info',ic:'🙏',ti:'慰霊の気持ちで登山を',tx:'2014年の噴火で63名が亡くなった。登山道には多くの慰霊碑がある。静粛なマナーで登山してください。'}],
    rel:[{f:'fuji.html',n:'富士山（静岡・山梨）',d:'中級'},{f:'norikuradake.html',n:'乗鞍岳（長野・岐阜）',d:'初級'}]},

  {file:'regions/chubu/hakusan.html',regionSlug:'chubu',name:'白山（はくさん）',short:'白山',region:'中部',pref:'石川県・岐阜県',diff:'medium',elev:'2,702m（御前峰）',dist:'約13km',time:'7〜8時間',ediff:'約1,500m',access:'金沢駅・白山市（バス）',fee:'無料',season:'7〜9月',emoji:'⛩️',
    desc:'富士山・立山とともに日本三名山に数えられる霊山。高山植物の宝庫（クロユリ・ハクサンフウロ）と翠ヶ池の絶景が魅力。',
    overview:'<p>白山（はくさん）は石川県と岐阜県にまたがる標高2,702mの山で、富士山・立山と並ぶ日本三名山のひとつ。日本百名山に選定されています。白山比咩（しらやまひめ）神社の御神体山として古くから信仰されています。</p><p>高山植物の宝庫として有名で、クロユリ・ハクサンフウロなど「白山」の名を冠した固有種も多数見られます。翠ヶ池（みどりがいけ）の美しい火口湖も見どころです。</p>',
    courses:[{n:'砂防新道（往復） ★',d:'約13km',t:'7〜8時間',lv:'中級',note:'別当出合から山頂往復。最短ルート'},{n:'観光新道',d:'約13km',t:'7〜8時間',lv:'中級',note:'尾根道コース。下り利用が一般的'}],
    steps:[{tp:'start',ti:'別当出合（標高1,250m）',de:'登山バスの終点。駐車場・トイレあり。'},{tp:'step',ti:'甚之助避難小屋（標高1,970m）',de:'休憩ポイント。別当谷・南竜ヶ馬場への分岐。'},{tp:'step',ti:'室堂平（標高2,450m）',de:'山小屋（白山室堂）あり。お花畑が広がる。翠ヶ池もここから。'},{tp:'goal',ti:'御前峰（標高2,702m）',de:'白山最高峰。白山奥社奥宮が鎮座。翠ヶ池を見下ろす絶景。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★★☆☆',tx:'残雪あり。6月中旬まで雪渓が残る。アイゼン必要な場合も。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'高山植物最盛期。クロユリ（7月）が見頃。登山ベストシーズン。'},{tp:'autumn',ti:'秋（9月）',rt:'★★★★☆',tx:'空気が澄み展望良好。草紅葉も美しい。'},{tp:'winter',ti:'冬（10〜6月）',rt:'☆☆☆☆☆',tx:'一般登山不可。'}],
    apub:'JR金沢駅から白山登山バス（夏季）で別当出合まで約2時間。または白山市経由。',acar:'北陸道白山ICから国道157号経由で別当出合まで約1時間20分（夏季一部マイカー規制あり）',park:'市ノ瀬駐車場（無料）からシャトルバス。またはシーズンオフのみ別当出合駐車場利用可。',
    ha1:'白山室堂（山頂直下の山小屋）',hd1:'御前峰から徒歩5分。要予約・1泊2食付き。6〜9月営業。',ha2:'白峰温泉・市ノ瀬の宿',hd2:'山麓の白峰温泉（白山比咩神社周辺）や市ノ瀬の旅館・民宿。',
    faqs:[{q:'山小屋の予約はどうすればいいですか？',a:'白山室堂（石川県白山自然保護センター）のウェブサイトか電話で予約。7〜8月の週末は特に早めの予約が必要です。'},{q:'クロユリの見頃はいつですか？',a:'例年7月上旬〜中旬が見頃。室堂平周辺で群落が見られます。白山のシンボルフラワーです。'},{q:'砂防新道と観光新道の違いは？',a:'砂防新道は谷沿いの最短ルートで安全性が高い。観光新道は尾根道で展望が良いが距離が長め。一般的に登りは砂防新道・下りは観光新道を使う人が多い。'},{q:'翠ヶ池はどこにありますか？',a:'室堂平から御前峰山頂方面へ登った後、北側のお池めぐりコースで見られます。エメラルドグリーンの美しい火口湖です。'},{q:'アクセス方法を教えてください',a:'金沢駅から夏季限定の白山登山バスが便利。マイカーの場合は市ノ瀬でシャトルバスに乗り換えが必要な期間あり（要確認）。'}],
    tips:[{tp:'tip',ic:'🌺',ti:'高山植物の多様性',tx:'白山は「花の山」として著名。クロユリ・ハクサンフウロ・ニッコウキスゲ・コバイケイソウなど多種多様な高山植物が見られる。'},{tp:'info',ic:'⛩️',ti:'三名山の一つとしての格式',tx:'古来から霊山として崇められ、白山比咩神社の総本社も白山の麓にある。信仰登山の雰囲気を感じながら歩ける。'},{tp:'caution',ic:'🌧️',ti:'北陸の気象に注意',tx:'白山は日本海側の気候で雨が多い。梅雨時期（6月）は特に雨具が必須。天気予報をしっかり確認して行動すること。'}],
    rel:[{f:'fuji.html',n:'富士山（静岡・山梨）',d:'中級'},{f:'norikuradake.html',n:'乗鞍岳（長野・岐阜）',d:'初級'}]},

  {file:'regions/chubu/yarigadake.html',regionSlug:'chubu',name:'槍ヶ岳（やりがたけ）',short:'槍ヶ岳',region:'中部',pref:'長野県・岐阜県',diff:'hard',elev:'3,180m',dist:'約20km（上高地から往復）',time:'1泊2日推奨',ediff:'約1,500m',access:'松本バスターミナル（上高地行きバス乗継）',fee:'環境保全協力金1,000円（任意）',season:'7〜10月',emoji:'🗡️',
    desc:'北アルプスを代表する憧れの名峰。独特の穂先が天を衝く「日本のマッターホルン」。山小屋が充実しており多くの登山者が挑戦する。',
    overview:'<p>槍ヶ岳（やりがたけ）は北アルプスを代表する標高3,180mの名峰で、日本百名山のひとつです。天を衝くような独特の鋭い穂先が特徴的で「日本のマッターホルン」とも呼ばれます。</p><p>上高地からの日本アルプス縦走の起点・終点として多くの登山者が目指す憧れの山です。山頂直下に鎖場・梯子がありますが、槍ヶ岳山荘など充実した山小屋があるため多くの方が挑戦できます。</p>',
    courses:[{n:'上高地→槍ヶ岳（王道コース） ★',d:'約20km',t:'1泊2日',lv:'上級',note:'最もポピュラー。槍沢ルート'},{n:'東鎌尾根縦走',d:'約25km',t:'2泊3日',lv:'上級',note:'西鎌尾根からも縦走可能'}],
    steps:[{tp:'start',ti:'上高地バスターミナル（標高1,504m）',de:'松本からバスで約1時間。マイカー規制あり。'},{tp:'step',ti:'槍沢ロッジ（標高1,820m）',de:'上高地から約5時間。宿泊可（要予約）。ここまでが比較的なだらか。'},{tp:'step',ti:'槍ヶ岳山荘（標高3,080m）',de:'山頂直下の山小屋（要予約）。ここから穂先へ。'},{tp:'goal',ti:'槍ヶ岳山頂（標高3,180m）',de:'梯子と鎖場を経て山頂へ。360度の絶景。北アルプス・富士山が一望。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★☆☆☆',tx:'残雪期。アイゼン・ピッケル必要。上級者向け。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'最ポピュラーなシーズン。山小屋も賑わう。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★☆',tx:'紅葉と雪の共演が美しい。10月は積雪の可能性あり。'},{tp:'winter',ti:'冬（11〜6月）',rt:'★☆☆☆☆',tx:'積雪期は上級者専用。一般登山者は不可。'}],
    apub:'松本バスターミナルから上高地行きバスで約1時間15分（マイカー規制あり）',acar:'マイカー規制あり。沢渡駐車場（有料）からシャトルバス。',park:'沢渡駐車場（有料・約2,500台）からシャトルバスで上高地へ',
    ha1:'槍ヶ岳山荘（山頂直下）',hd1:'山頂直下の標高3,080m。要予約・1泊2食付き。7〜10月営業。',ha2:'槍沢ロッジ・ヒュッテ大槍',hd2:'槍沢沿いの山小屋。前泊として利用。要予約。',
    faqs:[{q:'山頂の岩場（穂先）の難易度は？',a:'梯子・鎖場が連続しますが岩場として特別難しいわけではありません。高所恐怖症でなく、岩場の基本的な動き（三点支持）ができれば登れます。'},{q:'初心者でも登れますか？',a:'山小屋泊コースとしては中〜上級者向け。日帰り経験が複数回あり体力に自信がある方が対象。登山歴1年以上推奨。'},{q:'山小屋の予約方法を教えてください',a:'槍ヶ岳山荘グループの公式サイトからオンライン予約可。7〜8月の週末は2〜3ヶ月前から埋まることも。'},{q:'上高地から槍ヶ岳までの所要時間は？',a:'上高地から槍ヶ岳山荘まで約6〜8時間（標準）。1日目に槍沢ロッジ泊・2日目に山荘泊・3日目下山の3泊4日プランも人気。'},{q:'北穂高・奥穂高への縦走はできますか？',a:'可能。槍ヶ岳から奥穂高への縦走（大キレット越え）は北アルプス最難関ルートのひとつ。十分な経験と体力が必要です。'}],
    tips:[{tp:'caution',ic:'⛰️',ti:'急な天候変化に注意',tx:'北アルプスの3,000m峰は天候変化が急激。午後から雷雨になりやすいため、山頂到着は10〜11時を目標に。'},{tp:'tip',ic:'⛺',ti:'山小屋は早めに予約',tx:'7〜8月の週末は予約が取りにくい。計画が決まり次第すぐに予約すること。'},{tp:'info',ic:'🗡️',ti:'北アルプスの象徴',tx:'槍ヶ岳の穂先は遠くからでも一目でわかる北アルプスのシンボル。上高地から見上げると「あの先端が山頂」とわかる感動がある。'}],
    rel:[{f:'fuji.html',n:'富士山（静岡・山梨）',d:'中級'},{f:'kamikochi.html',n:'上高地（長野）',d:'初級'},{f:'tsurugigatake.html',n:'剱岳（富山）',d:'上級'}]},

  {file:'regions/chubu/tsurugigatake.html',regionSlug:'chubu',name:'剱岳（つるぎだけ）',short:'剱岳',region:'中部',pref:'富山県（北アルプス）',diff:'hard',elev:'2,999m',dist:'約10km（室堂から往復）',time:'8〜10時間（1泊2日推奨）',ediff:'約1,300m',access:'富山地方鉄道立山駅（立山黒部アルペンルート）',fee:'アルペンルート交通費別途',season:'7〜9月',emoji:'⚔️',
    desc:'「岩と雪の殿堂」と呼ばれる北アルプスの難峰。カニのヨコバイ・タテバイが名物の日本一般登山最難関クラス。経験者向け。',
    overview:'<p>剱岳（つるぎだけ）は富山県に位置する標高2,999mの岩峰で、日本百名山のひとつです。「岩と雪の殿堂」と称され、カニのヨコバイ・タテバイと呼ばれる鎖場は日本の一般登山道として最難関クラスです。</p><p>加賀藩時代から「誰も登れない山」として語り継がれ、1907年に陸軍測量隊が初登頂。新田次郎の小説「剱岳・点の記」でも有名です。室堂（立山黒部アルペンルート）が拠点です。</p>',
    courses:[{n:'別山尾根ルート ★',d:'約10km',t:'8〜10時間（1泊2日）',lv:'上級',note:'一般的な標準ルート。剱山荘泊が多い'},{n:'早月尾根ルート',d:'約14km',t:'1泊2日',lv:'上級',note:'馬場島から。累積標高差2,200m以上の過酷なルート'}],
    steps:[{tp:'start',ti:'室堂平（標高2,450m）',de:'立山黒部アルペンルートの室堂ターミナル。'},{tp:'step',ti:'剱沢キャンプ場（標高2,530m）',de:'テント泊の適地。剣山荘（山小屋）もあり。'},{tp:'step',ti:'前剱（標高2,813m）',de:'ここから難所が続く。カニのタテバイ（鎖場）へ。'},{tp:'goal',ti:'剱岳山頂（標高2,999m）',de:'岩の山頂。360度の展望。富山湾まで見渡せる日もある。下りはカニのヨコバイ経由。'}],
    seas:[{tp:'spring',ti:'春（5〜6月）',rt:'★★☆☆☆',tx:'残雪・凍結多い。アイゼン・ピッケル必須。上級者専用。'},{tp:'summer',ti:'夏（7〜8月）',rt:'★★★★★',tx:'最もポピュラーなシーズン。7〜8月が山小屋も混雑。'},{tp:'autumn',ti:'秋（9〜10月）',rt:'★★★★☆',tx:'紅葉が美しい。10月は積雪の可能性あり。早めの行動が必須。'},{tp:'winter',ti:'冬（11〜6月）',rt:'★☆☆☆☆',tx:'完全な雪山登山。一般登山者不可。'}],
    apub:'富山地方鉄道立山駅から立山黒部アルペンルートで室堂まで約1時間30分',acar:'北陸道立山ICから立山駅まで約20分。立山駅に駐車場あり（有料）。',park:'立山駅駐車場（有料）',
    ha1:'剱山荘・剱沢小屋（山中）',hd1:'剱沢に位置する山小屋。要予約・1泊2食付き。7〜9月営業。',ha2:'室堂平・みくりが池温泉',hd2:'室堂平のみくりが池温泉（日本最高所の温泉旅館）。要予約。',
    faqs:[{q:'カニのヨコバイとは何ですか？',a:'山頂直下の下降時に通る岩場の鎖場区間の通称。急峻な岩壁を横移動（ヨコバイ）する部分で、足場が見えにくく高度感があります。同様にタテバイ（登り時の鎖場）も難所です。'},{q:'初心者でも登れますか？',a:'難易度は高いため、岩場経験（鎖場・ナイフリッジ）がない初心者にはおすすめできません。最低でも登山経験2年以上・岩場経験ありの方向けです。'},{q:'アルペンルートの交通費は？',a:'富山側（立山駅〜室堂）は大人片道3,130円（2026年参考）。往復では相当な費用になるため、信濃大町側との通り抜けプランも人気です。'},{q:'ヘルメットは必要ですか？',a:'必須です。落石・転倒対策のため、剱岳ではヘルメット着用が強く推奨されています。剱山荘等でレンタル可能。'},{q:'早月尾根と別山尾根の違いは？',a:'別山尾根（室堂側）が一般的な登山ルート。早月尾根（馬場島側）は累積標高差が2,200m以上あり、日本三大急登のひとつ。上級者向け。'}],
    tips:[{tp:'caution',ic:'⛑️',ti:'ヘルメット着用必須',tx:'剱岳では落石・転倒のリスクが高いためヘルメット着用必須。山小屋でレンタル可能。'},{tp:'caution',ic:'⚠️',ti:'下りがより危険',tx:'カニのヨコバイなど下りの鎖場の方が登りより難しい。焦らず三点支持を徹底すること。'},{tp:'info',ic:'📖',ti:'「点の記」を読んでから登ろう',tx:'新田次郎の小説「剱岳・点の記」は剱岳初登頂の物語。映画にもなっている。読んでから登ると一段と感動が深まる。'}],
    rel:[{f:'fuji.html',n:'富士山（静岡・山梨）',d:'中級'},{f:'yarigadake.html',n:'槍ヶ岳（長野・岐阜）',d:'上級'},{f:'norikuradake.html',n:'乗鞍岳（長野・岐阜）',d:'初級'}]},
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
