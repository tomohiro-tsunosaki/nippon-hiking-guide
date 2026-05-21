// ハンバーガーメニュー
const navToggle = document.querySelector('.nav-toggle');
const globalNav = document.querySelector('.global-nav');

if (navToggle && globalNav) {
  navToggle.addEventListener('click', () => {
    globalNav.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !globalNav.contains(e.target)) {
      globalNav.classList.remove('open');
    }
  });
}

// スムーススクロール（ナビリンク）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      globalNav.classList.remove('open');
    }
  });
});

// ヘッダーのスクロール時にシャドウ強調
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.14)';
  } else {
    header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
  }
});

// カードのスクロールアニメーション（IntersectionObserver）
const animateItems = document.querySelectorAll(
  '.course-card, .region-card, .diff-card, .season-card, .article-card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.style.transform.replace('translateY(24px)', 'translateY(0)');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animateItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = (item.style.transform || '') + ' translateY(24px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease';
  observer.observe(item);
});

// サイト内検索の実装
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');

if (searchBtn && searchInput) {
  // 検索結果ドロップダウンを作成
  const dropdown = document.createElement('div');
  dropdown.className = 'search-dropdown';
  dropdown.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:white;border-radius:0 0 12px 12px;box-shadow:0 8px 24px rgba(0,0,0,0.15);max-height:360px;overflow-y:auto;z-index:1000;display:none;';
  const searchWrap = searchInput.closest('.hero-search-wrap');
  searchWrap.appendChild(dropdown);

  function doSearch(query) {
    if (!query || query.length < 2) { dropdown.style.display = 'none'; return; }
    const q = query.toLowerCase();
    const results = SEARCH_DATA.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.tags.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    ).slice(0, 8);

    if (results.length === 0) {
      dropdown.innerHTML = '<div style="padding:16px;color:#666;font-size:.9rem;">「' + query + '」に一致するページが見つかりませんでした。</div>';
    } else {
      dropdown.innerHTML = results.map(r =>
        '<a href="' + r.url + '" style="display:block;padding:12px 16px;border-bottom:1px solid #f0f0f0;text-decoration:none;color:#1b4332;font-weight:700;font-size:.9rem;">' +
        r.title + '<span style="display:block;font-size:.78rem;color:#666;font-weight:400;margin-top:2px;">' + r.desc + '</span></a>'
      ).join('');
    }
    dropdown.style.display = 'block';
  }

  // 日本語IME変換中は中間文字で誤発火しないよう制御
  let isComposing = false;
  searchInput.addEventListener('compositionstart', () => { isComposing = true; });
  searchInput.addEventListener('compositionend', () => {
    isComposing = false;
    doSearch(searchInput.value.trim());
  });
  searchInput.addEventListener('input', () => {
    if (!isComposing) doSearch(searchInput.value.trim());
  });
  searchBtn.addEventListener('click', () => {
    const q = searchInput.value.trim();
    if (q) doSearch(q);
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { const r = SEARCH_DATA.find(p => p.title.toLowerCase().includes(searchInput.value.toLowerCase())); if(r) location.href = r.url; }
    if (e.key === 'Escape') dropdown.style.display = 'none';
  });
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) dropdown.style.display = 'none';
  });
}
