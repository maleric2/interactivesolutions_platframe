/* Click tracking for elements carrying a `data-analytics` value.
 *
 * Events are routed through the consent module, so nothing is sent unless the
 * visitor has accepted analytics. Without consent `trackEvent` is a no-op. */

import { trackEvent } from 'modules/consent';

function analytics() {

    const nodes = document.querySelectorAll('[data-analytics]');

    if (!nodes.length) return;

    for (const node of nodes) {

        node.addEventListener('click', () => {
            trackEvent('cta_click', {
                cta: node.getAttribute('data-analytics'),
            });
        });

    }

}

export {
    analytics,
};