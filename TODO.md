# TODO — open items

Tracked work that is not yet done. Newest context first.

---

## P0 — blockers before the site goes live

### 1. Contact form does not submit (owner: enable Netlify setting)

**Symptom:** submitting the contact form sends no email, and the browser lands on
`/contact/success/` showing Netlify's "Page not found" 404.

**Diagnosis (verified against Netlify's docs, not guessed):**
Netlify's form handling parses the HTML **at deploy time** and, when it registers a
form, it **strips `data-netlify="true"` and injects the hidden `form-name` input**.
On the deployed preview that attribute is **still present**, which proves form
detection never ran for this site.

Because no form is registered, the POST is not handled and lands on the `action`
path as a plain request — hence the 404. The success page itself is fine: it is
generated at `prd/contact/success/index.html` and returns **200** on the preview.

Netlify's own troubleshooting guide lists "Form detection disabled" as a cause of
missing submissions.

**Fix (Netlify UI — cannot be done from the repo):**
1. Netlify UI → the site → **Forms** → **Enable form detection**.
2. **Redeploy** the site (detection only runs on a new deploy).
3. Re-submit the form and confirm:
   - the submission appears under **Forms → project-inquiry**, and
   - the browser lands on `/contact/success/` with no 404.

**Note for testing:** use a real email address and write full sentences in the
message field, or Akismet may file the test as spam (check the **Spam
submissions** tab before concluding it failed).

**After enabling detection, the deployed HTML should no longer contain
`data-netlify="true"`.** That is the quickest way to confirm it worked.

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

- **Cinematic interactive hero.** The one deliberate "wow" moment: subtle
  cursor-reactive parallax, foreground/background depth, gentle camera drift, a
  strong transition into Selected Work. Must respect `prefers-reduced-motion`,
  degrade to the current static hero, and require no interaction to read content.
  Keep it in its own bundle so the rest of the site stays fast.
- **More real imagery, fewer repeated navy card surfaces.**
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
