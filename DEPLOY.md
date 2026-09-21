# DEPLOY — interactivesolutions.hr

Short handoff for publishing this repo to Netlify and rolling back safely.
Source of truth for the build is this repo plus `netlify.toml`; the Netlify
dashboard must mirror the values below.

## Current handoff state (2026-09-21)

- Production branch: `master`, published from merge commit `4d610df`.
- PR #2 (`visual-redesign`) is merged; the superseded PR #1 is closed.
- Production site: <https://interactivesolutions.hr/>.
- Current development branch: `phase-1-conversion` (branched from the
  published `master` for post-launch improvements).
- Netlify site slug: `naughty-goldberg-dfe5e7`.
- Agent-verified in production: all public routes return HTTP 200, the legacy
  My Dubrovnik URL redirects, per-page metadata and JSON-LD are present, the
  favicon set serves, the sitemap and robots files are live, and production has
  no preview `X-Robots-Tag: noindex`.
- Left for human verification: confirm the form entry under Forms,
  disable the Netlify preview overlay, check mobile navigation at 320/375 px,
  and confirm the share card after the cache settles.

## Exact Netlify configuration

| Setting | Value |
|---|---|
| Repository | `maleric2/interactivesolutions_platframe` |
| Production branch | `master` |
| Build command | `npm run build` |
| Publish directory | `prd` |
| Node version | **22** — pinned in three places: `netlify.toml` (`NODE_VERSION = "22"`), `.nvmrc` (`22`), `package.json` (`engines.node = "22.x"`). All local builds for this handoff ran on Node v22.14.0. |
| Environment variables | none required |
| Functions | none |

Pretty URLs / rewrites are **not required**: the build emits directory-based
routes (`/services/index.html`, `/work/…/index.html`, …), so every route
resolves natively.

## Netlify Forms

| Item | Value |
|---|---|
| Form name | `project-inquiry` |
| Defined on | `/` and `/contact/` (same form, detected once per deploy) |
| Honeypot | `netlify-honeypot="bot-field"` |
| Success action | `/contact/success/` |
| Collected fields | `situation`, `name`, `email`, `company`, `message`, `budget`, `consent`, `form-name` |

Submissions appear in the Netlify dashboard under
**Site → Forms → project-inquiry**. If the form is missing there after a
deploy, confirm the deploy log scanned HTML containing `data-netlify="true"`.

## Deploy flow (preview first)

1. Push work to a `preview/*` branch — never test on `master`.
2. Open a pull request (or rely on branch deploys) to get a Netlify preview URL.
3. Smoke test the preview (see checklist below).
4. Promote: merge the PR into `master` (a production build starts automatically),
   or in the Netlify dashboard open the passing preview deploy and choose
   **Publish deploy**.

## Smoke-test checklist (preview URL)

- [ ] Direct-load every non-root route: `/services/`, `/work/`,
      `/work/light-film-blue-raven/`, `/work/my-dubrovnik/`, `/tools/`,
      `/tools/mesh-merge/`, `/tools/easy-house/`, `/about/`, `/contact/`,
      `/privacy/` — all HTTP 200, correct title/meta per page.
- [ ] Confirm the legacy `/work/mydubrovnik/` URL redirects to
      `/work/my-dubrovnik/`.
- [ ] Test submission of `project-inquiry` appears under Forms; browser lands on
      `/contact/success/`.
- [ ] Mobile nav (≤ 1024 px): opens/closes, a nav link closes it, `Escape`
      closes it and returns focus to the toggle, Tab stays inside the open menu.
- [ ] Nav logo, About photo crop, pricing block and full form usable at
      320 px / 375 px and desktop widths.
- [ ] `interactivesolutions.hr/robots.txt` and `/sitemap.xml` serve the files
      from this build (check the sitemap lists the current routes).
- [ ] Share preview: paste the production URL into LinkedIn Post Inspector
      after go-live and confirm the `og-cover.jpg` card.

## Rollback

Production publishes only from `master`, so rollback is one of:

1. **Fastest (no code change):** Netlify dashboard → **Deploys** → select the
   last known-good production deploy → **Publish deploy**. The site is back in
   under a minute.
2. **Code revert:** `git revert <bad-commit>` on `master` and push; a fresh
   production build deploys automatically. Verify with the smoke checklist.

Note: DNS currently resolves to Cloudflare (`188.114.96.10` /
`188.114.97.10`), so after publishing or rolling back, purge the Cloudflare
cache for the site (or wait out the edge TTL) before re-testing.

## Known non-blockers

- `prd/assets/images/_sprites/views.svg` ships but is unreferenced — a
  pre-existing generator artifact, not a placeholder. Safe to ignore.
- No analytics provider is installed by design; `dataLayer` hooks are present
  but inert until a tag is added, and the privacy page claims no provider.
