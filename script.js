/* ============================================================
   script.js — ALOG Shared JavaScript
   ============================================================ */

// ----- PAGE LOADER -----
const loader = document.getElementById('page-loader');
if (loader) {
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
  // Fallback: hide after 2.5s no matter what
  setTimeout(() => { if (loader) loader.classList.add('hidden'); }, 2500);
}

// ----- NAVBAR SCROLL -----
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
});

// ----- HAMBURGER MENU -----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// Create overlay for mobile menu
const mmOverlay = document.createElement('div');
mmOverlay.className = 'mobile-menu-overlay';
document.body.appendChild(mmOverlay);

function openMobileMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  mmOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  mmOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
  });
  mmOverlay.addEventListener('click', closeMobileMenu);
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMobileMenu);
  });
}

// ----- ACTIVE NAV LINK -----
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ----- SCROLL ANIMATIONS -----
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => fadeObserver.observe(el));
}

// ----- LIGHTBOX -----
let lbImages = [], lbIndex = 0;
function openLB(srcs, idx, captions) {
  lbImages = srcs;
  lbIndex = idx;
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-caption');
  if (img) img.src = srcs[idx];
  if (cap) cap.textContent = (captions && captions[idx]) ? captions[idx] : '';
  const lb = document.getElementById('lightbox');
  if (lb) { lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeLB() {
  const lb = document.getElementById('lightbox');
  if (lb) { lb.classList.remove('open'); document.body.style.overflow = ''; }
}
function navLB(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  const img = document.getElementById('lb-img');
  if (img) img.src = lbImages[lbIndex];
}
const lb = document.getElementById('lightbox');
if (lb) {
  document.getElementById('lb-close')?.addEventListener('click', closeLB);
  document.getElementById('lb-prev')?.addEventListener('click', e => { e.stopPropagation(); navLB(-1); });
  document.getElementById('lb-next')?.addEventListener('click', e => { e.stopPropagation(); navLB(1); });
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') navLB(-1);
    if (e.key === 'ArrowRight') navLB(1);
  });
}

// ----- GALLERY FILTER -----
function initGalleryFilter() {
  const btns = document.querySelectorAll('.gal-btn');
  const items = document.querySelectorAll('.masonry-item[data-cat]');
  if (!btns.length || !items.length) return;

  function getVisible() {
    return Array.from(items).filter(i => i.style.display !== 'none');
  }
  function rewire() {
    const vis = getVisible();
    const srcs = vis.map(i => i.dataset.src);
    const caps = vis.map(i => i.dataset.caption || '');
    vis.forEach((item, i) => {
      item.onclick = () => openLB(srcs, i, caps);
    });
  }
  function filter(cat) {
    items.forEach(item => {
      item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'block' : 'none';
    });
    rewire();
  }
  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      btns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filter(this.dataset.cat);
    });
  });
  filter('all');
}
initGalleryFilter();

// ----- INLINE GALLERY (section galleries on inner pages) -----
function wireInlineGallery(container) {
  if (!container) return;
  const items = container.querySelectorAll('[data-src]');
  const srcs = Array.from(items).map(i => i.dataset.src);
  const caps = Array.from(items).map(i => i.dataset.caption || '');
  items.forEach((item, i) => {
    item.addEventListener('click', () => openLB(srcs, i, caps));
  });
}
document.querySelectorAll('.inline-gallery').forEach(wireInlineGallery);

// ----- CONTACT FORM -----
function initContactForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    const rules = [
      { id: 'f-name',     group: 'fg-name',     check: v => v.trim().length > 1 },
      { id: 'f-email',    group: 'fg-email',    check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'f-division', group: 'fg-division', check: v => v !== '' },
      { id: 'f-message',  group: 'fg-message',  check: v => v.trim().length > 9 },
    ];
    rules.forEach(r => {
      const el = document.getElementById(r.id);
      const grp = document.getElementById(r.group);
      if (!el || !grp) return;
      if (!r.check(el.value)) { grp.classList.add('error'); valid = false; }
      else grp.classList.remove('error');
      el.addEventListener('input', () => { if (r.check(el.value)) grp.classList.remove('error'); }, { once: true });
    });
    if (valid) {
      this.reset();
      const s = document.getElementById('form-success');
      if (s) { s.style.display = 'block'; setTimeout(() => s.style.display = 'none', 5000); }
    }
  });
}
initContactForm('contactForm');

// ----- PROPERTY FILTER -----
function initPropertyFilter() {
  const btns = document.querySelectorAll('.prop-filter-btn');
  const cards = document.querySelectorAll('.property-card[data-type]');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      btns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const f = this.dataset.filter;
      cards.forEach(c => { c.style.display = (f === 'all' || c.dataset.type === f) ? 'block' : 'none'; });
    });
  });
}
initPropertyFilter();
