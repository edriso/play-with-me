# Play With Me

**Too tired to think? Tap once.** Play With Me is a **frontend-only** app that
hands an exhausted, overwhelmed parent **one** doable thing to do with their kid
right now. It meets you at your energy level — including games you can play lying
on the couch — so saying _yes_ costs almost nothing. Presence beats performance,
and a small tired yes genuinely counts. No guilt, no streaks to fail, no tracking.

There is no backend, no account, and no network. Everything lives on your device
and the app works fully offline.

---

## How it works — one page, three phases

`pick energy → one idea → favourites`

1. **Pick energy** (the hero question). _"Your kid wants to play. How much do you
   have in you right now?"_ — three battery-graded cards: **Running on empty**
   ("I can barely move"), **A little left** ("I can sit and play"), **I'm good**
   ("Let's actually move"). A rotating de-guilt note sits beneath.
2. **One idea.** Tapping a level shows a **single card** — no scrolling, no list —
   with what's needed (usually "just you"), rough minutes, the idea in big
   friendly type, and an optional "why this helps" line. You can **♥ favourite**
   it, draw **Another idea** (a non-repeating swap), or start an inline **timer**.
   The **empty** tier opens with a reassurance line and only genuinely
   near-zero-effort, lying-down ideas.
3. **Favourites.** The heart in the top-right keeps the ideas you loved. It's the
   only storage — a keepsake, not a metric.

### Energy grading is the core

Each idea carries a **minimum energy level**. By default a higher-energy parent
is also offered the easier ideas (sometimes a couch game is exactly right); a
setting (`matchExact`) forces same-tier-only. The "empty" tier is the soul of the
app — be the patient while your kid plays doctor, tell their baby story with your
eyes closed, finger-draw on their back, the world's slowest race. Content is tuned
for school-age kids (5–10), and the idea model leaves room for a future age filter.

The whole tone is **warm and never guilt-inducing**: "You don't have to be fun.
You just have to say yes."

---

## Tech stack

- **React 19 + TypeScript** (strict), built with **Vite**
- **Tailwind CSS v4** (configured in CSS with `@theme`, no `tailwind.config.js`)
- **Zustand** for state (no router — it's one page with phases)
- **Zod** validates the persisted shape (favourites + settings only)
- **vite-plugin-pwa** so the app is installable and works offline
- **Vitest** + **Testing Library** for unit and component tests, **Playwright**
  for browser tests

---

## Getting started

You need **Node 20+** and **pnpm** (`npm install -g pnpm`).

```bash
pnpm install
pnpm dev
```

Open <http://localhost:5173>. There is nothing else to configure — no backend.

---

## Commands

| Command          | What it does                              |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Start the Vite dev server                 |
| `pnpm build`     | Type-check and build for production       |
| `pnpm preview`   | Preview the production build locally      |
| `pnpm lint`      | Run ESLint (must pass with zero warnings) |
| `pnpm format`    | Format every file with Prettier           |
| `pnpm typecheck` | Type-check without building               |
| `pnpm test`      | Run the unit and component tests (Vitest) |
| `pnpm test:e2e`  | Run the browser tests (Playwright)        |

Run `pnpm test:e2e:install` once to download the browser before `pnpm test:e2e`.

---

## How it is built

```
src/
├── components/        icon, overlay, the settings panel
├── features/
│   ├── pick/          the energy question
│   ├── idea/          the single idea card + timer
│   └── favourites/    saved ideas
├── store/             the Zustand store (settings + favourites)
├── hooks/             interval, apply-theme
├── lib/               ideas (the bank + notes), pool/draw logic, repository
├── types/             Zod schemas and the types they produce
└── styles/            the warm sage theme + layout CSS
```

A few ideas worth knowing:

- **The energy logic is pure and tested.** `poolFor(level, exact)` returns the
  ideas a parent can do (easier tiers included by default, or the exact tier), and
  `drawIdea(level, avoid, exact)` picks one at random while avoiding recently-seen
  ideas, falling back to the full pool once they've all been seen. Both live in
  `lib/pool.ts` with an injectable random so tests are deterministic.
- **Saving goes through one seam.** `lib/repository.ts` is a small typed interface
  over localStorage; saved data is parsed with Zod, so an old or corrupt shape
  safely falls back to defaults. Only favourites + settings are stored.

### Adding ideas

Append to `IDEAS` in `src/lib/ideas.ts` with an `energy` (`empty` / `some` /
`good`), the `text`, what's `need`ed, rough `mins`, and a `why`. The grading and
draw logic pick it up automatically.

### ⚠️ One animation gotcha that's deliberately fixed

Entrances never animate `opacity` from 0 with `animation-fill-mode: both` — in
some webview/capture contexts that freezes at frame 0 and leaves the element
**stuck invisible** (it has hidden whole screens). Every entrance keeps
`opacity: 1` and animates only `transform`.

---

## Accessibility & motion

- Every control is keyboard-operable with a visible focus ring; the settings
  dialog traps focus and closes on Escape; icon buttons carry labels.
- The app honors `prefers-reduced-motion` and ships warm **day** and cozy
  **night** themes with sufficient contrast in both.

---

## License

MIT.
