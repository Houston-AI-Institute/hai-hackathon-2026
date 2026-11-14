# HAI Hackathon 2026: showcase and participant guide

The Houston AI Institute Hackathon 2026 took place on November 7, 2026, at SmartCore Labs in Manvel, Texas. `showcase.html` shows what the five teams built and the results. The other pages are the participant guide used on the day (the challenges, where to get the data, free AI tools, and how to submit), kept for reference.

Live site: https://houston-ai-institute.github.io/hai-hackathon-2026/

## What's here

Plain HTML and CSS, with a little JavaScript for the phone menu, the light/dark switch and the showcase photo carousels. No framework, no build step, no web fonts, no tracking, no cookies. Every page works with JavaScript turned off.

- `index.html` and the other `.html` files: one file per page.
- `assets/style.css`: all styles, with light and dark mode.
- `showcase.html`: results, the five projects, and how to work with the Institute.
- `assets/site.js`: the phone menu, the light/dark switch, and the showcase carousels (the images still scroll without it).
- `assets/showcase/`: event photos, project screenshots (`g/`), the teams' slides (`decks/`) and the social share image.
- `assets/sponsors/`, `assets/logos/`: sponsor and partner logos.
- `.nojekyll`: tells GitHub Pages to serve the files as they are.

The shared header and footer are copied into each page by the maintainer before each commit.

To view it on your computer, open `index.html` in a browser, or run `python3 -m http.server` in this folder and go to http://localhost:8000.

## License

- Code (HTML structure, CSS, JavaScript): MIT. See `LICENSE`.
- Site text: Creative Commons Attribution 4.0 (CC BY 4.0).
- Not covered by either license: text, data and logos supplied by partner and sponsor organizations, and third-party data linked from the site, which keep their own terms.
- Team projects, code, slides and screenshots belong to each team. Event photos may not be reused without permission.

## Contact

initiatives@houstonaiinstitute.com
