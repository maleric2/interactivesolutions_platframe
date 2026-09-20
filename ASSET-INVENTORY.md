# Asset inventory

Where artwork for the site lives, what is approved to publish, and how each
derivative was produced.

## Folder convention

Originals are preserved untouched in a per-project `_source` folder. Website
files are generated into the sibling `_linked` folder, which is the only place
the build processes and deploys.

```
src/images/work/<project>/_source/   originals — never deployed, never edited
src/images/work/<project>/_linked/   generated derivatives — deployed
src/images/tools/<tool>/_source/
src/images/tools/<tool>/_linked/
```

Original filenames are kept exactly as supplied, including the existing
`jurrasic_*` and `*screnshots*` spellings. Corrected spellings are used only in
derivative filenames (for example `jurassic-cover.jpg`).

## Known asset decisions

- **`jurrasic_anewera-cover.png` is not used and is not committed.** Despite the
  name it is a film rental promo screen carrying Universal, Amblin, Dolby, RealD
  and 4DX marks — movie campaign artwork, not browser-game artwork. Publishing it
  would misrepresent the game and use third-party property. It is kept on disk in
  `_source` but listed in `.gitignore` (this repository is public). The Light Film
  card cover is composed from the real gameplay capture instead.
- **The development captures are not published and not committed.**
  `jurrasic_anewera-dev-gameplay-lvl2.png` shows the internal debug and balancing
  panel (Speed, Obst Gap, Side Enemy, Move Time, Pickup Gap, God Mode, …) and
  `jurrasic_anewera-dev-only-gameplay-lvl2.png` is a dev-only partial capture.
  Both are preserved on disk in `_source` and listed in `.gitignore`. The debug
  panel is the reason: the repository is public and exact tuning values should
  not be exposed. If published later, the intended caption is:
  "Internal browser-based debug and balancing controls used during development to
  tune speed, obstacle spacing, pickup frequency and difficulty."
- `jurrasic_anewera-gameplay-lvl2.png` (clean Level 2 capture) **is** committed
  and used as a second image on the Light Film case study. It is not used as the
  homepage cover because the tutorial modal covers much of the play area.
- Jurrasic gameplay screenshots are portrait (698×1238). They are never force
  cropped; the homepage cover is composed, and the portrait originals stay
  available for the case-study page.
- Logos are supporting attribution only, never a substitute for project imagery.
- No stock or fabricated imagery is used anywhere.

## Status

| Project | Real assets | Permission | Notes |
|---|---|---|---|
| Light Film / Blue Raven | yes — gameplay capture | own work product | Movie promo screen excluded |
| Hooked on Math | yes — cover + gameplay | own work (Dubit client project) | |
| My Dubrovnik | yes — cover + gameplay collage | worked with Async Labs team | Wording: "Worked with the Async Labs team" |
| Room 8 / Solid Bash | logo only | own employer | No project screenshot; logo is attribution |
| Exordium Games | yes — 4 titles | directly employed | |
| Dubit | logo only | own employer | No visuals for BestLife / Phonics / Spelling |
| Mesh Merge | yes — inspector + animated bake | own product | |
| Easy House | yes — 2 editor captures | own product | |

## Originals preserved (`_source`)

| Project | Files |
|---|---|
| light-film | `jurrasic_anewera-gameplay.png`, `jurrasic_anewera-gameplay-lvl2.png`, `lightFilm-logo.png` — plus three files kept on disk but **not committed** (movie promo `jurrasic_anewera-cover.png` and the two dev captures) |
| hooked-on-math | `project-hooked-on-math-cover.jpg`, `project-hooked-on-math-gameplay.png`, `videourl.txt` |
| my-dubrovnik | `project-my-dubrovnik-cover.jpeg`, `project-my-dubrovnik-multiple-gameplay-screnshots.jpeg`, `Async-Labs-logo.jpg`, `videourl.txt` |
| exordium | `Agenda - Gameplay - Upgrades.jpeg`, `LastEncounter-gameplay-greenbiome.jpg`, `LastEncounter_image-600x293.png`, `ZeroReflex-gameplay-airconsole.jpeg`, `Pottery-cover.jpg`, `agenda_web-600x293.png`, `BWM_web-600x293.png`, `Exordium_Games-logo.png` |
| room8 | `Room-8-Group-Solid-Bash-logo.jpg` |
| dubit | `dubit_2026_full_logo_light.svg` |
| tools/mesh-merge | `MeshCombiner_Inspector.png`, `BakeToAtlas.gif` (99 frames) |
| tools/easy-house | `EasyHouse_Overview.jpg`, `EasyHouse_Footprint.jpg` |

## Derivatives (`_linked`)

### work/light-film

| File | Size | Source → transform |
|---|---|---|
| `jurassic-cover.jpg` | 1600×1000 | composed: gameplay cover-scaled, blurred 54px, brightness 0.30, blended 42% over `#0a1130` tint; framed gameplay (90% height) pasted left with drop shadow and 2px border; IS brand mark watermark right at 85% opacity |
| `jurassic-cover-800.jpg` | 800×500 | same composition, downscaled |
| `jurassic-gameplay.jpg` | 680×1210 | `jurrasic_anewera-gameplay.png`, width-scaled, RGBA→RGB |
| `jurassic-gameplay-400.jpg` | 400×711 | same, 400px |
| `jurassic-gameplay-lvl2.jpg` | 680×1206 | `jurrasic_anewera-gameplay-lvl2.png` (clean Level 2), width-scaled, RGBA→RGB |
| `jurassic-gameplay-lvl2-400.jpg` | 400×709 | same, 400px |
| `lightfilm-logo.png` | 540×302 | `lightFilm-logo.png`, uniform black background made transparent |

### work/hooked-on-math

| File | Size | Source → transform |
|---|---|---|
| `cover.jpg` / `-800` / `-400` | 1365×768 / 800×450 / 400×225 | `project-hooked-on-math-cover.jpg`, width-scaled |
| `gameplay.jpg` / `-600` | 1200×675 / 600×338 | `project-hooked-on-math-gameplay.png`, RGBA→RGB, width-scaled |

### work/my-dubrovnik

| File | Size | Source → transform |
|---|---|---|
| `cover.jpg` / `-600` / `-400` | 875×500 / 600×343 / 400×229 | `project-my-dubrovnik-cover.jpeg`, width-scaled |
| `gameplay.jpg` / `-800` | 1600×1082 / 800×541 | `project-my-dubrovnik-multiple-gameplay-screnshots.jpeg`, width-scaled |
| `async-labs-logo.png` | 300×150 | `Async-Labs-logo.jpg`, grayscale JPEG → PNG (white background retained, shown in a light chip) |

### work/exordium

| File | Size | Source → transform |
|---|---|---|
| `cover.jpg` / `-800` | 1600×900 / 800×450 | `Agenda - Gameplay - Upgrades.jpeg` |
| `last-encounter.jpg` / `-600` | 1200×675 / 600×338 | `LastEncounter-gameplay-greenbiome.jpg` |
| `zero-reflex.jpg` / `-600` | 1200×750 / 600×375 | `ZeroReflex-gameplay-airconsole.jpeg` |
| `pottery.jpg` / `-400` | 720×360 / 400×200 | `Pottery-cover.jpg` |
| `exordium-logo.png` | 600×135 | `Exordium_Games-logo.png` (already transparent) |

### work/room8 and work/dubit

| File | Size | Source → transform |
|---|---|---|
| `room8/solid-bash-logo.jpg` / `-320` | 640×360 / 320×180 | `Room-8-Group-Solid-Bash-logo.jpg`, downscaled |
| `dubit/dubit-logo.svg` | vector | `dubit_2026_full_logo_light.svg`, copied (light version for dark UI) |

### tools

| File | Size | Source → transform |
|---|---|---|
| `mesh-merge/inspector.jpg` / `-800` | 1368×766 / 800×448 | `MeshCombiner_Inspector.png`, RGBA→RGB |
| `mesh-merge/draw-calls.jpg` | 1140×225 | 3× upscale of the inspector crop (815,415)–(1195,490) showing "Draw Calls: 9 → After 1" |
| `mesh-merge/bake-to-atlas.gif` | 1368×764, 99 frames | `BakeToAtlas.gif`, copied (build optimises via gifsicle) |
| `easy-house/overview.jpg` / `-800` | 1234×695 / 800×451 | `EasyHouse_Overview.jpg` |
| `easy-house/footprint.jpg` / `-800` | 1234×700 / 800×454 | `EasyHouse_Footprint.jpg` |

## Attribution logos and links

Displayed as supporting elements only. Never hotlinked from third-party sites.

| Entity | Link |
|---|---|
| Dubit Limited | https://dubit.io/ |
| Room 8 Studio | https://room8studio.com/ |
| Light Film | https://lightfilm.tv/ |
| Blue Raven LA | https://www.blueravenla.com/ |
| Exordium Games | https://exordiumgames.com/ |
| Jurassic World Rebirth: A New Era | https://www.jurassicworld.com/anewera/ |
| Park Marjan: Upoznaj botaniku | https://play.google.com/store/apps/details?id=hr.marjanparksuma.upoznajbotaniku |

## Other approved assets

| File | Purpose |
|---|---|
| `src/images/global/_linked/hero.jpg` | Homepage hero background (owned render) |
| `src/images/global/_linked/og-cover.jpg` | Social share card 1200×630 |
| `src/images/global/_linked/marko-about.jpg` / `-480` | About portrait |
| `src/images/global/_symbols/brand-mark-white.svg` | Nav and cover brand mark |
| `src/static/favicon*`, `apple-touch-icon.png`, `android-chrome-*` | Favicon set |

## Still missing

BestLife, Hooked on Phonics and Hooked on Spelling have no visuals. They appear
as text credits with a restrained branded fallback until real, approved assets
exist.
