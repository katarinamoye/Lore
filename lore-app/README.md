# Lore

A contextual book-discovery app inspired by the supplied CSeed PDF photos: warm paper, literary type, illustrated book covers, muted botanical colors, and restrained scrapbook details.

## Run locally

Requires Node.js. No installation step is needed.

```sh
npm start
```

Open http://127.0.0.1:4173. On Windows where PowerShell blocks npm.ps1, use `npm.cmd start` or `node server.mjs`.

## Included

- Responsive home screen with book browsing and mood shortcuts.
- A short discovery quiz for reading context, mood, favorite genres and authors, and avoidances.
- A local collection of 48 books with deterministic recommendation scoring and direct genre browsing.
- Contextual explanations, content caveats, alternate recommendations, and book details.
- A working bookshelf saved to localStorage in the current browser.
- A community preview with a profile, reading goals and logs, sample clubs, challenges, and a local post board.
- Keyboard-accessible controls, native detail dialogs, and reduced-motion support.

Google Fonts supplies DM Sans and Libre Caslon Display; system fallbacks are defined. Publisher cover images load from Open Library when available; original illustrations remain as fallbacks. Page counts vary by edition. Community features are a local prototype: sample clubs and members are not live, posts and goals stay in the current browser, and prize examples are not sponsored offers. The app has no account system or cross-device synchronization.

## Validation

```sh
node --test tests/*.test.mjs
```

Verified the complete discovery flow in Chrome at desktop (1440px) and mobile (390px) widths, including answer validation, multiple avoidances, alternate recommendations, book details, persistence after reload, removal, and horizontal overflow. All five ranking tests pass.

Source lives in `dist/` because this is a buildless static app. `books.mjs` contains the dataset and ranking; `app.mjs` manages UI state; `art.mjs` renders illustrations. The Sites hosting manifest is `.openai/hosting.json`.
