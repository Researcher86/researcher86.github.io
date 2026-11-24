# researcher86.github.io

Personal site of Tanat Alpenov, served by GitHub Pages from `master`:
https://researcher86.github.io/

Plain HTML, CSS and a few lines of JavaScript; no build step and no dependencies.

```
index.html            the whole site
assets/css/site.css   design tokens (dark default, light theme), layout, components
assets/js/theme.js    theme switch; loaded in <head> so there is no flash of the wrong theme
assets/images/        profile photo (also used for link previews)
robots.txt, sitemap.xml, favicon.svg
AUDIT.md              audit of the previous version and migration notes
```

Run locally with any static server, for example `python3 -m http.server`, and open
http://localhost:8000. Pushing to `master` publishes the site.
