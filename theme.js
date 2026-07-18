/* ── Coffee Mood: общая тема Tailwind ──
   Подключается сразу после CDN Tailwind на каждой странице. */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                cream:    '#F5EFE6',   // бежевый фон
                latte:    '#E8DCC8',   // светлый акцент
                caramel:  '#C8A97E',   // карамельный акцент
                mocha:    '#6F4E37',   // кофейный
                espresso: '#3B2A20',   // глубокий коричневый
                graphite: '#2B2B2B',   // графитовый
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Manrope', 'sans-serif'],
            },
        }
    }
};

/* ── Общие анимации и эффекты (подключаются на каждой странице) ── */
document.head.insertAdjacentHTML('beforeend', `
<style>
    /* Плавный переход между страницами */
    body { opacity: 0; }
    body.page-loaded  { opacity: 1; transition: opacity .5s ease; }
    body.page-leaving { opacity: 0; transition: opacity .35s ease; }

    /* Надпись Coffee Mood с фото внутри букв.
       background-color — запасной цвет, если фото не загрузится */
    .text-photo {
        background-color: #3B2A20;
        background-image: url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1400&q=70');
        background-size: cover;
        background-position: center;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    /* Появление блоков при скролле */
    .reveal { opacity: 0; transform: translateY(32px); transition: opacity .8s cubic-bezier(.22,.61,.36,1), transform .8s cubic-bezier(.22,.61,.36,1); }
    .reveal.visible { opacity: 1; transform: none; }

    /* Парение чашки на hero */
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
    .float-anim { animation: float 5s ease-in-out infinite; }

    /* Пар над чашкой */
    @keyframes steam {
        0%   { transform: translateY(0) scaleX(1); opacity: 0; }
        20%  { opacity: .6; }
        60%  { transform: translateY(-22px) scaleX(1.2); opacity: .3; }
        100% { transform: translateY(-42px) scaleX(.8); opacity: 0; }
    }
    .steam { animation: steam 3s ease-out infinite; }
    .steam:nth-child(2) { animation-delay: 1s; }
    .steam:nth-child(3) { animation-delay: 2s; }

    /* Уважение к reduced motion */
    @media (prefers-reduced-motion: reduce) {
        body, .reveal { transition: none !important; opacity: 1 !important; transform: none !important; }
        .float-anim, .steam { animation: none !important; }
    }
</style>`);
