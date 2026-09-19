/* Provider-agnostic click tracking.
 *
 * Any element carrying a `data-analytics="event_name"` attribute reports a click.
 * Events are pushed to `window.dataLayer`, which Google Tag Manager and GA4 both
 * consume, so no vendor SDK is required for the markup to be wired correctly.
 * If no tag manager is present the call is a no-op. */

function track(name, detail) {

    if (typeof window === 'undefined') return;

    const payload = detail ? { event: name, detail } : { event: name };

    if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload);
    }

}

function analytics() {

    const nodes = document.querySelectorAll('[data-analytics]');

    if (!nodes.length) return;

    for (const node of nodes) {

        node.addEventListener('click', () => {
            track('cta_click', node.getAttribute('data-analytics'));
        });

    }

}

export {
    analytics,
    track,
};