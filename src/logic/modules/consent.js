/* Analytics loader with an EU consent gate.
 *
 * Google Analytics is NOT loaded until the visitor accepts, so no analytics
 * cookies are set on a first, undecided visit. The choice is remembered in
 * localStorage. Declining is a real option and loads nothing.
 *
 * Only after consent does `window.gtag` exist, which is what `trackEvent`
 * checks for, so no event can be transmitted without consent. */

const STORAGE_KEY = 'is-analytics-consent';
const GA_ID = 'G-PWM0P0NHCX';

let loaded = false;

function readConsent() {

    try {
        return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        return null;
    }

}

function writeConsent(value) {

    try {
        window.localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
        // storage unavailable; the banner simply reappears next visit
    }

}

function loadAnalytics() {

    if (loaded || typeof document === 'undefined') return;

    loaded = true;

    window.dataLayer = window.dataLayer || [];

    window.gtag = function gtag() {
        window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());

    window.gtag('config', GA_ID, {
        anonymize_ip: true,
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ GA_ID }`;
    document.head.appendChild(script);

}

function trackEvent(name, params) {

    if (typeof window.gtag === 'function') {
        window.gtag('event', name, params || {});
    }

}

function wireBanner() {

    const banner = document.querySelector('[data-consent-banner]');

    if (!banner) return;

    const decide = (value) => {

        writeConsent(value);
        banner.setAttribute('hidden', 'hidden');
        banner.remove();

        if (value === 'granted') loadAnalytics();

    };

    const accept = banner.querySelector('[data-consent-accept]');
    const decline = banner.querySelector('[data-consent-decline]');

    if (accept) accept.addEventListener('click', () => decide('granted'));
    if (decline) decline.addEventListener('click', () => decide('denied'));

}

function consent() {

    const state = readConsent();

    if (state === 'granted') {
        loadAnalytics();
        return;
    }

    if (state === 'denied') return;

    // undecided: reveal the banner (it is rendered hidden to avoid a flash)
    const banner = document.querySelector('[data-consent-banner]');

    if (banner) {
        banner.removeAttribute('hidden');
        wireBanner();
    }

}

export {
    consent,
    trackEvent,
    loadAnalytics,
};