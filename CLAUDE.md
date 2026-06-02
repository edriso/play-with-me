# CLAUDE.md — Let's Play

Project memory for Claude Code. Read this before doing anything. Keep edits aligned with it; if you intentionally diverge, update this file in the same change.

## What Let's Play is

A **frontend-only** app that hands an **exhausted, overwhelmed parent one doable thing** to do with their kid right now. Tagline: **"Too tired to think? Tap once."**

Emotional truth driving every decision: drained, distracted, guilt-ridden parents too often answer "play with me" with "not now." Telling a depleted parent to "be more fun" backfires. So the app **meets the parent at their energy level** and makes saying _yes_ cost almost nothing — including games you play lying on the couch. **Presence beats performance**; a small tired yes counts. No guilt, no streaks-to-fail, no tracking pressure. No backend, no accounts; all state local; works offline.

Distinct from the sibling app **Here** (which is about _remembering_ to show up, with PRIDE coaching). Let's Play solves the in-the-moment **"I'm here but I have nothing left and no ideas."**

> Keep it minimal: **one page**, three phases (pick energy → one idea → favourites). No feeds, accounts, lists, calendars, analytics. The magic is _one tap, one idea_.

## Product shape

`pick energy → one idea → favourites`

- **Pick energy (hero):** "Your kid wants to play. How much do you have in you right now?" → three battery cards: **Running on empty** ("I can barely move") · **A little left** ("I can sit and play") · **I'm good** ("Let's actually move"). Rotating de-guilt note beneath.
- **One idea:** tapping a level shows **a single card** (no list): tags (what's needed — usually "just you"; rough minutes), the idea in big friendly type, an optional "why this helps" line; actions = **♥ favourite**, **"Another idea"** (non-repeating swap), **timer** (inline countdown). The **"empty"** tier shows a reassurance line and only near-zero-effort, lying-down ideas.
- **Favourites:** heart icon (top-right) opens saved ideas, removable. The only storage — a keepsake, not a metric.

### Energy grading = the core mechanic

Each idea has a **minimum energy level**. Default: a higher-energy parent may also be offered easier ideas; a Tweak (`matchExact`) forces same-tier only. The **"empty" tier is the soul**: doctor-and-patient (parent lies still), telling the kid's baby story eyes-closed, finger-drawing on their back, twenty questions, slowest-race. "good" tier is active (floor-is-lava, treasure hunt, dance party, balloon keep-up). Ideas need almost nothing ("just you" or things every home has).

Content tuned for **school-age 5–10**; keep the idea model open to a future age filter (`ageMin`/`ageMax`).

## Design system — warm, soft, calm, grown-up (not a kids' cartoon)

It's for the _parent_. Generous rounded corners (~20–26px), soft shadows, big friendly buttons, lots of air; **one idea fills the screen, never a cluttered list.**

### Themes (CSS custom properties). Default **day**; also **night**.

```css
:root {
  --accent: #5b9e74; /* sage */
  --display: 'Baloo 2', system-ui, sans-serif; /* question, idea text, wordmark */
  --ui: 'Hanken Grotesk', system-ui, sans-serif;
}
/* Day — warm sage */
[data-theme='day'] {
  --bg: #eef4ef;
  --bg-2: #e4eee6;
  --surface: #fff;
  --surface-2: #eef3ee;
  --line: rgba(40, 70, 52, 0.12);
  --ink: #233029;
  --dim: #5e7065;
  --faint: #93a399;
  --on-accent: #fff;
  --shadow: 0 18px 46px -16px rgba(40, 80, 55, 0.3);
}
/* Night — cozy dim sage (warm green-black) */
[data-theme='night'] {
  --bg: #181f1b;
  --bg-2: #131915;
  --surface: #212a24;
  --surface-2: #2a352d;
  --line: rgba(210, 235, 220, 0.1);
  --ink: #e9f0ea;
  --dim: #a3b3a8;
  --faint: #6d7d72;
  --on-accent: #112018;
  --shadow: 0 18px 46px -16px rgba(0, 0, 0, 0.55);
}
--accent-soft: color-mix(in oklab, var(--accent) 14%, transparent);
```

Rules:

- **Sage `#5b9e74` is the accent.** Warm swatches as a tweak (sage, coral `#e08a5a`, amber `#e0a83c`, blue `#5f8fd0`, plum `#b07cc8`); tints via `color-mix`. Body uses a soft radial-gradient bg.
- **Baloo 2** for the question / idea / wordmark; **Hanken Grotesk** for UI. Battery icons for the three levels.

### ⚠️ Animation gotcha (bit this project family repeatedly — keep the fix)

Never animate `opacity` from 0 with `animation-fill-mode: both` for entrances — in some webview/capture contexts it freezes at frame 0 and the element is **stuck invisible** (has hidden whole screens). **Base state `opacity: 1`; animate only `transform`; no `both` fill.** Honor `prefers-reduced-motion`.

### Voice & tone

Warm, never guilt-inducing. **No em dashes** in user copy; write like a person speaks. Examples:

- "You don't have to be fun. You just have to say yes."
- "Five tired minutes with you beats an hour somewhere else."
- "Showing up drained still counts. It really does."
- "Your kid isn't asking for a performance. They're asking for you."

No "you should," no streak-shaming, no pressure. It must never make a tired parent feel judged.

## Tech & architecture

- **React 19 + TypeScript (strict)**, **Vite**, **Tailwind v4** (CSS-first `@theme`, no config; Node 20+).
- **Zustand** (phase/current idea/favourites/settings); one page + phases, **no router**. **Zod** for persisted-shape validation.
- **Persistence behind a typed `repository`** over localStorage (favourites + settings only); components never touch storage directly; Zod safe defaults.
- **PWA**: installable, offline-first (vite-plugin-pwa + manifest, sage icon).
- Folders: `components/`, `features/{pick,idea,favourites}/`, `store/`, `lib/` (repository, idea-bank constant, de-guilt notes, pool/draw utils), `types/`, `styles/`. Co-locate tests.

### Conventions

- Naming: `PascalCase` components/types · `camelCase` functions/vars · `kebab-case` files · `SCREAMING_SNAKE_CASE` constants. One component per file; keep small.
- No `any` (`unknown` + narrowing). **Discriminated unions for `Energy` and phase.** Path aliases.
- **Pure, unit-tested logic** for `poolFor(level, exact)` and `drawIdea(level, avoid)` (non-repeating with graceful fallback) — out of components.
- Accessibility: keyboard-operable, focus management across phases, ARIA labels on icon buttons, visible focus rings, reduced-motion fallbacks, sufficient contrast in both themes.

## Commands

```bash
pnpm install
pnpm dev          # vite dev server
pnpm build        # type-check + production build
pnpm preview      # preview the build
pnpm lint         # eslint, zero warnings
pnpm format       # prettier --write
pnpm test         # vitest (unit + component)
pnpm test:e2e     # playwright
```

Husky: pre-commit runs Prettier + ESLint on staged files; pre-push runs type-check + unit tests. Conventional Commits (commitlint).

## Definition of done

Lint clean (zero warnings), `tsc` clean, unit/component/e2e green (pool/draw logic + the pick-screen-visibility regression especially), builds, **installs and runs offline**, keyboard-accessible, reduced-motion safe, and faithful to this design system — warm sage, Baloo display, soft cards, one idea at a time. The prototype (`Let's Play.html` + `play-data.js` + `play-app.jsx`) is the source of truth for the flow, energy tiers, idea bank, and copy; port it faithfully. Above all: **the pick screen must be visible on load**, and **it must never make a tired parent feel judged** — meet them at their energy and make "yes" easy.
