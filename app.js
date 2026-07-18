/* ══════════════════════════════════════════════
   Coffee Mood — общий скрипт для всех страниц:
   подвал, бургер-меню, активный пункт навигации,
   корзина (localStorage) и тост.
   ══════════════════════════════════════════════ */

/* ---------- Подвал (общий для всех страниц) ---------- */
const FOOTER_HTML = `
<footer class="bg-graphite text-cream/80 pt-16 pb-8">
    <div class="max-w-6xl mx-auto px-5 grid gap-10 md:grid-cols-3 mb-12">
        <div>
            <a href="index.html" class="flex items-center gap-2 mb-4">
                <span class="w-9 h-9 rounded-full bg-caramel text-espresso flex items-center justify-center text-lg">☕</span>
                <span class="font-serif text-xl font-semibold text-cream">Coffee&nbsp;Mood</span>
            </a>
            <p class="text-sm text-cream/50 max-w-xs leading-relaxed">Кофейня свежей обжарки. Место, где настроение начинается с чашки.</p>
        </div>
        <div>
            <h3 class="font-serif text-lg font-semibold text-cream mb-4">Контакты</h3>
            <ul class="space-y-2 text-sm">
                <li class="flex gap-2"><span aria-hidden="true">📍</span> г. Москва, ул. Кофейная, 12</li>
                <li class="flex gap-2"><span aria-hidden="true">📞</span> <a href="tel:+79990001122" class="hover:text-caramel transition-colors">+7 (999) 000-11-22</a></li>
                <li class="flex gap-2"><span aria-hidden="true">✉️</span> <a href="mailto:hello@coffeemood.ru" class="hover:text-caramel transition-colors">hello@coffeemood.ru</a></li>
            </ul>
        </div>
        <div>
            <h3 class="font-serif text-lg font-semibold text-cream mb-4">Время работы</h3>
            <ul class="space-y-2 text-sm mb-6">
                <li class="flex justify-between max-w-[220px]"><span>Пн – Пт</span><span class="text-caramel">7:30 – 22:00</span></li>
                <li class="flex justify-between max-w-[220px]"><span>Сб – Вс</span><span class="text-caramel">9:00 – 23:00</span></li>
            </ul>
            <div class="flex gap-3">
                <a href="#" aria-label="Telegram" class="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-caramel hover:text-espresso transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.04 15.51 8.9 19.1c.36 0 .52-.16.71-.35l1.7-1.63 3.53 2.59c.65.36 1.11.17 1.29-.6l2.33-10.94c.21-.98-.35-1.36-.98-1.12L4.1 12.03c-.94.37-.93.9-.16 1.14l3.5 1.09 8.13-5.12c.38-.25.73-.11.44.14l-6.97 6.23Z"/></svg>
                </a>
                <a href="#" aria-label="ВКонтакте" class="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-caramel hover:text-espresso transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.16 17.72c-5.63 0-8.85-3.86-8.98-10.28h2.82c.09 4.71 2.17 6.71 3.82 7.12V7.44h2.66v4.06c1.62-.17 3.33-2.02 3.9-4.06h2.66a7.83 7.83 0 0 1-3.58 5.09 8.12 8.12 0 0 1 4.2 5.19h-2.93a5.07 5.07 0 0 0-4.25-3.67v3.67h-.32Z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" class="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-caramel hover:text-espresso transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                </a>
            </div>
        </div>
    </div>
    <div class="max-w-6xl mx-auto px-5 pt-6 border-t border-cream/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-cream/40">
        <p>© 2026 Coffee Mood. Все права защищены.</p>
        <p>Сделано с ☕ и любовью</p>
    </div>
</footer>

<div id="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 translate-y-24 opacity-0 bg-espresso text-cream text-sm font-medium px-6 py-3 rounded-full shadow-xl transition-all duration-300 pointer-events-none z-50">
    Добавлено в корзину ☕
</div>`;

document.querySelectorAll('[data-include="footer"]').forEach(el => { el.outerHTML = FOOTER_HTML; });

/* ---------- Активный пункт навигации ---------- */
const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.nav === page) {
        link.classList.add('text-mocha', 'after:w-full');
    }
});

/* ---------- Мобильное меню ---------- */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
if (burger && mobileMenu) {
    const lines = burger.querySelectorAll('.burger-line');
    burger.addEventListener('click', () => {
        const open = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', !open);
        lines[0].style.transform = open ? 'translateY(8px) rotate(45deg)' : '';
        lines[1].style.opacity   = open ? '0' : '1';
        lines[2].style.transform = open ? 'translateY(-8px) rotate(-45deg)' : '';
    });
}

/* ---------- Корзина: сохраняется между страницами ---------- */
const CART_KEY = 'coffee-mood-cart';
let cartCount = parseInt(localStorage.getItem(CART_KEY) || '0', 10);
const badge = document.getElementById('cart-badge');

function renderBadge() {
    if (!badge) return;
    if (cartCount > 0) {
        badge.textContent = cartCount;
        badge.classList.remove('hidden');
        badge.classList.add('inline-flex');
    }
}
renderBadge();

let toastTimer;
function addToCart() {
    cartCount++;
    localStorage.setItem(CART_KEY, cartCount);
    renderBadge();

    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('translate-y-24', 'opacity-0');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.add('translate-y-24', 'opacity-0'), 1800);
    }
}

/* Кнопки «В корзину» (делегирование — работает и для динамических карточек) */
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;
    addToCart();
    btn.textContent = 'Добавлено ✓';
    setTimeout(() => (btn.textContent = 'В корзину'), 1200);
});

/* ---------- Плавный скролл для якорей внутри страницы ---------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const headerH = document.querySelector('header').offsetHeight;
        window.scrollTo({ top: target.offsetTop - headerH + 1, behavior: 'smooth' });
    });
});

/* ---------- Плавные переходы между страницами ---------- */
/* Вход: класс page-loaded включает fade-in (см. стили в theme.js) */
requestAnimationFrame(() => document.body.classList.add('page-loaded'));

/* Выход: перехватываем клики по внутренним ссылкам, делаем fade-out и переходим */
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href$=".html"]');
    if (!link || link.target === '_blank' || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    const href = link.getAttribute('href');
    document.body.classList.remove('page-loaded');
    document.body.classList.add('page-leaving');
    setTimeout(() => { location.href = href; }, 320);
});

/* При возврате через кнопку «назад» страница берётся из bfcache — снимаем fade-out */
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        document.body.classList.remove('page-leaving');
        document.body.classList.add('page-loaded');
    }
});

/* ---------- Появление блоков при скролле ---------- */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
