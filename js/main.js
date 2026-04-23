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

// 検索ボックス（将来の実装用プレースホルダー）
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');

if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      alert(`「${query}」の検索機能は準備中です。`);
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchBtn.click();
  });
}
