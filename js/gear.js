// 予算タブ切り替え
function showBudget(id, btn) {
  document.querySelectorAll('.budget-panels').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.budget-tab').forEach(el => el.classList.remove('active'));
  const target = document.getElementById('budget-' + id);
  if (target) target.classList.add('active');
  if (btn) btn.classList.add('active');
}

// FAQ アコーディオン
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// チェックリスト：完了状態を localStorage に保存
document.querySelectorAll('.check-item input[type="checkbox"]').forEach((cb, i) => {
  const key = 'check_' + window.location.pathname + '_' + i;
  cb.checked = localStorage.getItem(key) === '1';
  cb.addEventListener('change', () => {
    localStorage.setItem(key, cb.checked ? '1' : '0');
  });
});

// ギアナビのアクティブ状態
const currentPath = window.location.pathname;
document.querySelectorAll('.gear-nav-item').forEach(link => {
  if (link.getAttribute('href') && currentPath.endsWith(link.getAttribute('href').replace('../', ''))) {
    link.classList.add('active');
  }
});
