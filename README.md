# Developer portfolio

A local, dependency-free portfolio featuring Orbit and the language app. The two project previews use the supplied screenshots and link to the real apps.

## Run locally

With Node.js installed, run `npm start` from this folder and open `http://127.0.0.1:4173`. You can also open `dist/index.html` directly.

## Edit

- `dist/index.html`: content, accessible project links, and layout.
- `dist/portfolio.css`: responsive design, hover effects, and animations.
- `dist/portfolio.js`: project link configuration and motion controls.
- `dist/projects.js`: app destinations; update matching HTML links too for visitors without JavaScript.
- `dist/assets/`: the two supplied app screenshots.

The motion toggle pauses animation and remembers the preference where browser storage is available. System reduced-motion preferences are respected. Links open in a new tab; only Orbit and the language app are external project destinations.

The screenshots are supplied snapshots, not live embeds. The language screenshot includes a saved-translations warning present in the original capture.

Changes are local. No publishing is configured or performed by the preview server.
