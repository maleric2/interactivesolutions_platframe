/* Cinematic hero scene.
 *
 * Adds pointer parallax, a light particle field and a scroll-driven fade into
 * the next section. Purely additive: with reduced motion, a coarse pointer or
 * no JavaScript at all, the hero renders exactly as it does without this module,
 * and every piece of content stays readable without any interaction.
 *
 * Only transforms and opacity are touched, so nothing here can cause layout. */

const PARTICLES = 24;

export default function hero() {

    const hero = document.querySelector('.front');

    if (!hero) return;

    const parallax = hero.querySelector('.hero-parallax');
    const glow = hero.querySelector('.hero-glow');
    const field = hero.querySelector('.hero-particles');
    const content = hero.querySelector('.hero-content');

    if (!parallax) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    // immediate static fallback
    if (reduced.matches) return;

    // ---- decorative particle field, generated so the markup stays clean
    if (field) {
        for (let i = 0; i < PARTICLES; i += 1) {
            const dot = document.createElement('span');
            const scale = 0.7 + (Math.random() * 1.2);
            dot.style.left = `${Math.round(Math.random() * 100)}%`;
            dot.style.top = `${Math.round(Math.random() * 100)}%`;
            dot.style.width = `${(3.2 * scale).toFixed(1)}px`;
            dot.style.height = `${(3.2 * scale).toFixed(1)}px`;
            dot.style.opacity = (0.30 + (Math.random() * 0.50)).toFixed(2);
            dot.style.animationDuration = `${(11 + (Math.random() * 14)).toFixed(1)}s`;
            dot.style.animationDelay = `${(-Math.random() * 20).toFixed(1)}s`;
            field.appendChild(dot);
        }
    }

    // ---- pointer parallax
    const fine = window.matchMedia('(pointer: fine)').matches;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let visible = true;
    let frame = null;

    function onMove(event) {
        targetX = ((event.clientX / window.innerWidth) - 0.5) * 2;
        targetY = ((event.clientY / window.innerHeight) - 0.5) * 2;
    }

    function tick() {

        currentX += (targetX - currentX) * 0.055;
        currentY += (targetY - currentY) * 0.055;

        const height = hero.offsetHeight || 1;
        const progress = Math.min(1, Math.max(0, window.scrollY / height));

        parallax.style.transform = `translate3d(${ (-currentX * 26).toFixed(2) }px, ${ ((-currentY * 16) + (progress * 46)).toFixed(2) }px, 0)`;

        if (glow) {
            glow.style.transform = `translate3d(${ (currentX * 48).toFixed(2) }px, ${ ((currentY * 30) - (progress * 22)).toFixed(2) }px, 0)`;
        }

        if (content) {
            content.style.transform = `translate3d(0, ${ (progress * 30).toFixed(2) }px, 0)`;
            content.style.opacity = (1 - (progress * 1.4)).toFixed(3);
        }

        frame = visible ? window.requestAnimationFrame(tick) : null;

    }

    function start() {
        if (frame === null && visible) frame = window.requestAnimationFrame(tick);
    }

    function stop() {
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
    }

    if (fine) window.addEventListener('mousemove', onMove, { passive: true });

    // only animate while the hero is actually on screen
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
            visible = entries[0].isIntersecting;
            if (visible) start();
        }, { threshold: 0 }).observe(hero);
    }

    start();

    // if the visitor turns reduced motion on mid-session, drop back to static
    const onPreferenceChange = () => {
        if (!reduced.matches) return;
        stop();
        [parallax, glow, content].forEach((el) => {
            if (el) el.style.cssText = '';
        });
        if (field) field.innerHTML = '';
    };

    if (typeof reduced.addEventListener === 'function') {
        reduced.addEventListener('change', onPreferenceChange);
    } else if (typeof reduced.addListener === 'function') {
        reduced.addListener(onPreferenceChange);
    }

}