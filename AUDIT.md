# Site audit

Audit of `researcher86.github.io` at commit `939bdef` (2026-11-24), before the redesign.
Several issues from an earlier review were fixed in `939bdef` and were re-checked against the
current source; they are listed at the end so they are not reported twice.

Severity: **High** — wrong or missing information, or something a visitor hits. **Medium** —
accessibility, SEO or maintainability cost. **Low** — cleanup.

## Findings

| # | Severity | Finding | Files | Recommended fix |
|---|---|---|---|---|
| 1 | High | The engineering labs — 15 public repositories (PHP Systems Lab, Architecture Lab, Architecture Decision Lab, System Design Lab, Algorithms Lab, Engineering Lab book) — are not mentioned anywhere. They are the strongest evidence of the author's current level. | `index.html` | Make Engineering Labs a primary section, described from each repository's README and `composer.json`. |
| 2 | High | Career section stops at Innovation Group (06.2021–03.2026), which has no description. The employer since 2026-04-22 is missing. | `index.html` | Add the current role; add a description for Innovation Group. Both need input from the author (marked TODO). |
| 3 | High | Positioning is out of date: "Цель — найти интересную работу", "20+ years programming, 10+ professionally". The CV's own dates give commercial work from 05.2014 (12+ years) and study from 2007. | `index.html` | Rewrite the summary with dates that match the experience list. |
| 4 | High | The three INTUIT certificate links (`intuit.ru/verifydiplomas/…`) return 404. | `index.html` | Drop the dead links; keep the certificates as plain text. |
| 5 | Medium | Content is Russian-only while 3 of 8 employers are outside the CIS. | all pages | English as the primary language (per brief). |
| 6 | Medium | Every social icon link (`<i class="fa …">` inside `<a>`) and the back-to-top link have no accessible name; screen readers announce an empty link. | `index.html`, `portfolio-pages/*` | Text labels or `aria-label`, inline SVG with `aria-hidden`. |
| 7 | Medium | Modal "Закрыть" controls are `<a>` without `href`, so they are not reachable by keyboard; project details are revealed on hover only. | `index.html` | Remove the modals; show project content inline. |
| 8 | Medium | Heading hierarchy: every resume block uses its own `<h1>`, `h3` follows `h1` directly, the portfolio uses `h5`. | `index.html` | One `h1`, `h2` per section, `h3` per item. |
| 9 | Medium | No canonical URL, Twitter card, structured data, `robots.txt` or `sitemap.xml`. | — | Add them. |
| 10 | Medium | Header height and `body` width are set from JavaScript on load and on resize, which causes layout shift and a horizontal-scroll risk on mobile. The navigation fades in and out on scroll. | `js/init.js` | CSS layout only, static header. |
| 11 | Medium | jQuery 1.10.2 (2013) and jQuery Migrate, Waypoints, FitText, Magnific Popup and Modernizr are used for: smooth scrolling, nav highlighting, headline sizing and modals. All of these are CSS or a few lines of native code today. | `index.html`, `js/*` | Remove all of them. |
| 12 | Medium | Portfolio and certificate screenshots are 2014–2018 UIs and partly third-party systems (a state-services portal, a client's internal service map in `bellone/5.png`). They add weight and some show architecture the author may not own. | `images/portfolio/*` | Text-first project descriptions; do not publish third-party internal diagrams. |
| 13 | Medium | Fifteen project pages duplicate content from the cards and modals (three copies of each description). | `portfolio-pages/*` | One source: a section on the main page. |
| 14 | Low | Asset weight: `vh/2.gif` 3.8 MB, `header-background.jpg` 535 KB, 3 font families, 2 icon fonts. | `images`, `css` | System font stack, inline SVG icons, no decorative background. |
| 15 | Low | IE7–IE8 conditional comments, `.mobile-btn` links that do nothing without CSS `:target`. | `index.html` | Remove. |
| 16 | Low | A third-party Codewars badge image is hot-linked from the page (an extra origin, layout shift while it loads). | `index.html` | Link to the profile in text or drop it. |
| 17 | Low | `README.md` contains only the URL. | `README.md` | Describe how the site is built and deployed. |

### External links (checked 2026-11-24)

| Link | Status |
|---|---|
| github.com/Researcher86 and the linked repositories | 200 |
| t.me/researcher2286 | 200 |
| intuit.ru/verifydiplomas/100781854, 100781757, 100825887 | **404** |
| linkedin.com/in/researcher2286 | 999 — LinkedIn blocks automated checks; verify by hand |
| codewars.com badge | 200 |

### Already fixed in `939bdef` (verified in source and in the browser)

The Internet Store card opened `#modal-09` (NextLevelHealth) instead of `#modal-10`; a duplicate
NextLevelHealth card; jQuery loaded over HTTP; `maximum-scale=1`; `lang="en"` on Russian pages;
empty `title`/`description`; empty `alt` attributes; unused fonts, icon sources and images.

## Migration risks

- **Old URLs.** `portfolio-pages/*.html` will stop existing. GitHub Pages cannot send 301s; anyone
  holding a direct link gets a 404. The site is a one-page CV, so the risk is low.
- **Lost Russian content.** The Russian text and screenshots stay in git history. A Russian
  version, if wanted, goes in a separate `/ru/` route with `hreflang`.
- **Facts only the author knows.** The current employer, the Innovation Group description and
  per-project contributions beyond what the old pages state are marked `TODO` instead of guessed.
- **Third-party images.** Old screenshots of client systems are removed rather than migrated.

## Validation report (redesign, 2026-11-24)

Tested locally (`python3 -m http.server`) in Chrome; not yet deployed.

| Check | Result |
|---|---|
| HTML structure: balanced tags, unique ids, one `h1`, no heading-level jumps | Pass (scripted check) |
| Internal anchors and local files referenced from `index.html` | Pass, all resolve |
| External links (26) | 25 × 200; LinkedIn returns 999 to bots — verify by hand |
| Console errors on load and on theme switch | None |
| Theme: OS light → light, toggle → dark, choice kept after reload, `aria-label` updates | Pass |
| No flash of the wrong theme | `theme.js` sets `data-theme` before the stylesheet loads |
| Layout at 1536, 714 and 375 px: no horizontal scroll, 16 px gutters on phones | Pass |
| Keyboard: skip link first, visible focus ring, theme toggle reachable and labelled | Pass |
| Page weight | HTML ~30 KB, CSS ~12 KB, JS 1 KB, photo 54 KB, no web fonts or third-party requests |

Not tested: Safari and Firefox, real phones, a screen reader, the W3C validator, link previews in
Telegram/LinkedIn (need the deployed URL).

### Content decisions

- Current role (systeme.io, since 2026-04-22) and Innovation Group achievements were added from the
  author's notes and commit history, without internal project names, the business domain,
  ticket links or hiring details.
- "12+ years" follows the CV dates (commercial work from May 2014).
- Russian version at `/ru/`, linked both ways with `hreflang` and a language switch in the header.
  It is a translation of the same content and markup, so both pages must be edited together.
