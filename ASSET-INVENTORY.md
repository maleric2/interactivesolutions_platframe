# Asset inventory

Where artwork for the site lives, and what is approved to publish.

## Where to put images

Drop files into the `_linked` folder of the matching project. The `_linked`
folder is required: the build only processes and deploys images found under a
`_linked` directory.

```
src/images/work/light-film/_linked/        ->  /assets/images/work/light-film/_linked/<file>
src/images/work/hooked-on-math/_linked/
src/images/work/my-dubrovnik/_linked/
src/images/work/room8/_linked/
src/images/work/exordium/_linked/

src/images/tools/mesh-merge/_linked/
src/images/tools/easy-house/_linked/
```

### Naming

Use lowercase kebab-case with a two-digit index, one file per intended slot:

```
cover.jpg            wide 16:10 hero/cover for the case card      ~1600x1000
cover-2x.jpg         optional retina variant                      ~2400x1500
shot-01.jpg          in-page screenshot or gallery image
shot-02.jpg
logo.png             only if display rights are confirmed
```

Formats: `.jpg` for photos/screenshots, `.png` for UI captures with fine text,
`.svg` for logos. The build runs `imagemin` automatically, so do not hand-tune.

### Before adding a file

1. It is your own capture, or you have written permission to publish it.
2. Client restrictions are respected (no confidential footage or unreleased UI).
3. For third-party properties (for example Jurassic World), use an approved
   screenshot and link to the official live experience. Do not use protected
   artwork as a large background unless display rights are confirmed.
4. Record the entry in the table below.

## Status

| Project | Real assets | Permission confirmed | Notes |
|---|---|---|---|
| Light Film / Blue Raven | no | n/a | Awaiting approved screenshots; live public game is linkable |
| Hooked on Math | no | not yet | Needs images + confirmation of what can be shown |
| MyDubrovnik | no | not yet | Store imagery may be usable; confirm |
| Room 8 Studio | no | not yet | Confidential work: branded cover is the safe default |
| Exordium | no | not yet | Used only if a project is added to the Work page |
| Mesh Merge | no | own product | Needs 2–4 feature visuals for the tool page |
| Easy House | no | own product | Needs one real preview image before launch messaging |

Until a project has real, approved imagery it uses a neutral branded cover
(brand mark + project label) rendered in CSS. Branded covers are intentional
placeholders, never presented as screenshots.

## Existing approved assets

| File | Purpose |
|---|---|
| `src/images/global/_linked/hero.jpg` | Homepage hero background (owned low-poly render) |
| `src/images/global/_linked/og-cover.jpg` | Social share card (1200x630) |
| `src/images/global/_linked/marko-about.jpg` | About portrait, 900x900 (source `markoAbout.png`) |
| `src/images/global/_linked/marko-about-480.jpg` | About portrait, 480x480 |
| `src/images/global/logo_white.svg` | Full logo lockup (source) |
| `src/images/global/_symbols/brand-mark-white.svg` | Nav/cover brand mark (sprite source) |
| `src/static/favicon*`, `apple-touch-icon.png`, `android-chrome-*` | Favicon set |
