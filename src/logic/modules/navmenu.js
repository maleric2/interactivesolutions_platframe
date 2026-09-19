/* Mobile navigation behavior: link activation closes the menu,
 * Escape closes it and returns focus to the toggle, and Tab is wrapped
 * inside the open menu. Inert on desktop viewports where the menu never
 * collapses (the checkbox is display:none there). */

export default function navMenu() {

    const toggle = document.querySelector('.nav-toggle');
    const label = document.querySelector('.nav-toggle-label');
    const nav = document.querySelector('.site-nav');

    if (!toggle || !label || !nav) return;

    const isCollapsed = () => getComputedStyle(label).display !== 'none';
    const isOpen = () => toggle.checked;

    const close = (refocus) => {
        if (!isOpen()) return;
        toggle.checked = false;
        if (refocus) label.focus({ preventScroll: true });
    };

    // selecting a destination dismisses the menu
    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => close(false));
    });

    nav.addEventListener('keydown', (event) => {

        if (!isCollapsed() || !isOpen()) return;

        if (event.key === 'Escape') {
            close(true);
            return;
        }

        if (event.key !== 'Tab') return;

        // keep tab order inside the open menu
        const links = [...nav.querySelectorAll('a')];
        if (!links.length) return;
        const first = links[0];
        const last = links[links.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }

    });

}