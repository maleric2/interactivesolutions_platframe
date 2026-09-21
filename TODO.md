# TODO — open items

Tracked work that is not yet done. Newest context first.

---

## Completed autonomously (no owner action needed)

- **CI added** - `.github/workflows/ci.yml` runs `npm ci`, `npm run build` and
  `npm test` on pushes to master/visual-redesign/preview branches and on PRs to
  master, then verifies the key build outputs exist.
- **Dependabot added** - `.github/dependabot.yml` opens weekly npm PRs for
  minor/patch updates only (majors are ignored by rule because ESLint 7,
  Rollup 2, Babel 7 and cssnano 4 predate current lines and must be upgraded
  in isolation).
- **Spacing audited** - all 57 distinct values in the stylesheet were
  inventoried. Margin/padding specifically are already consistent (mostly
  12/16/20/24/32, with five deliberate micro-values for chevron clearance and
  list indents). No refactor was warranted; normalising them would be churn
  with no visible benefit.
- **Visual review follow-up** - tool-card bodies now fill their equal-height grid
  cells so actions align consistently; buttons have a pressed state; card/button
  motion is disabled under `prefers-reduced-motion`.
- **Career timeline corrected** - `/about/` now follows the owner-confirmed path:
  Nanobit, Exordium Games, Async Labs, parallel Cybertale Studio, Interactive
  Solutions obrt with Dubit/Cybertale work, Room 8 Studio, then Algebra and Light
  Film / Blue Raven after the 2023 layoffs.
- **Cross-page review follow-up** - renamed the My Dubrovnik route to
  `/work/my-dubrovnik/` with a legacy redirect, standardized all case-study
  metadata bars, added career timeline markers, and highlighted honest/cautionary
  product notes without duplicating the existing callout component.
- **Qwen review follow-up** - Asset Store links carry UTM tracking; the obrt is
  explained for international clients; privacy links open in a new tab so form
  state is preserved; the success page states that every inquiry is reviewed
  personally with no sales team in between. Declined: hero rephrase, homepage
  Tools removal, homepage logo banner (all against settled trailer decisions);
  Easy House email capture deferred until the launch-list flow exists; layoff
  wording left as the owner wrote it (see open question below).


## P0 — blockers before the site goes live

### 1. ~~Contact form does not submit~~ — RESOLVED, awaiting one real submission

**Status:** Netlify form detection was enabled by the owner and a redeploy ran.
Verified against the deployed HTML: `data-netlify="true"` has now been **stripped
by Netlify** and the form is registered, exactly as their docs describe for a
working form:

```html
<form action='/contact/success/' class='contact-form' method='POST' name='project-inquiry'>
```

**Still to confirm by hand:** submit the form once and check the entry appears
under **Forms → project-inquiry** and the browser lands on `/contact/success/`
without a 404. Use a real email address and full sentences, or Akismet may file
the test as spam (check the **Spam submissions** tab before concluding it failed).

<details>
<summary>Original diagnosis (kept for the record)</summary>

**Symptom:** submitting the contact form sent no email, and the browser landed on
`/contact/success/` showing Netlify's "Page not found" 404.

**Cause:** Netlify parses the HTML **at deploy time** and, when it registers a
form, strips `data-netlify="true"` and injects the hidden `form-name` input. The
attribute was still present in the deployed HTML, which proved detection had never
run. With no form registered the POST was not handled and landed on the `action`
path as a plain request — hence the 404. The success page itself was always fine
(it is generated and returns 200).

**Fix applied:** enabling form detection in the Netlify UI, then redeploying.
</details>

### 2. Production has never been deployed

`origin/master` is still the old site (`9361770`). Live `interactivesolutions.hr`
has no `/contact/` page at all — both `/contact/` and `/contact/success/` return
404 there. Everything built in this branch exists only on the deploy preview and
in `prd/`. See `DEPLOY.md` for the exact Netlify settings and the rollback steps.

---

## P1 — content and assets awaiting the owner

- **MeshMerge demo video** — the animated GIF is in place for now.
- **GA4 verification** — confirm Realtime shows traffic after accepting the consent
  banner. Optional: add a custom dimension for the `cta` event parameter so
  `cta_click` can be broken down by button.
- **Two unused recommendations** — Oleksandr Shevtsov and Hrvoje Drinovac are
  transcribed and available; only three are published.
- **Four unused Dubit images** — Phonics gameplay + logo, Spelling cover + small
  logo. Preserved in `_source`, not placed.

---

## P1 — design

- ~~**Cinematic interactive hero.**~~ **DONE** — pointer parallax on the background
  and glow at different rates, a 14-dot particle field, a scroll-driven fade and
  shift into Selected Work, gated behind `prefers-reduced-motion` (which returns
  the static hero untouched) and paused when the hero is off screen. Lives in its
  own module (`logic/modules/hero.js`); only transform and opacity are animated.
- **More real imagery, fewer repeated navy card surfaces.** The homepage is still
  largely card-on-navy. Real screenshots where they exist would lift it further.
- **Nav order** — the header still lists Services before Work while the homepage
  now leads with Work. Deliberate (site-wide IA vs homepage narrative); change only
  if it proves confusing.

---

## P2 — later

- Optional interactive `/lab/` or `/play/` route, loaded only on request. Do not
  autoplay Unity WebGL in the hero.
- Technical articles (one per month), each linked to a service or tool.
- Dependency modernisation: ESLint 7, Rollup 2, Babel 7 and cssnano 4 are several
  majors behind. Upgrade in isolated branches, reviewing each.
- Add CI (build, lint, link check, accessibility) and Dependabot/Renovate.

---

## Deferred deliberately (with reasons)

- **Spacing-scale refactor.** Spacing values are ad-hoc (18/22/26/30/34/38px). Real
  debt, but a broad refactor with no specific visual defect to fix. Wants its own
  pass with before/after screenshots.
- **Button hover white-flash.** `.btn-primary` and the header CTA hover to solid
  white, which is loud on an otherwise restrained dark page. Consistent today;
  needs an eyeball decision.
- Rejected after review: fixed-height card images, light-theme tag pills,
  line-clamped case-study copy, an absolutely-positioned "coming soon" badge, a
  "Recommended" pricing badge, extra section dividers.

---

## Housekeeping

- **Untracked in the repo root** (never committed): `.qwen/`, `CV_Marko_Aleric_EN.pdf`,
  `CV_Marko_Aleric_2025_EN.pdf`, `backup.txt`, `netlify logs.txt`, and the three
  planning `.md` documents. Decide: commit, ignore, or delete.
- **PR #1 is superseded** by PR #2 (it is an earlier commit range of the same work).
  Close it to avoid confusion.
- **Unpublished captures** stay off-repo on purpose (movie promo screen and the two
  dev screenshots exposing internal tuning values) — kept on disk in `_source`,
  listed in `.gitignore`.
