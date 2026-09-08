# TaskFlow

A lightweight kanban-style task board built with React and TypeScript. Drag tasks between
**To do → In progress → Done**, filter by priority, search across titles and notes, and
everything persists locally so your board survives a page refresh.

**[Live demo →](#)** _(add your deployed link here once you deploy)_

![TaskFlow board](docs/screenshot.png)
_(add a screenshot after you deploy — see "Adding a screenshot" below)_

## Why this project

This was built as a portfolio piece to demonstrate front-end fundamentals without leaning on
a UI kit or drag-and-drop library — the whole interaction model (drag events, filtering,
persistence, forms) is hand-rolled in React + TypeScript.

## Features

- **Three-column kanban board** with native HTML5 drag-and-drop (no external DnD library)
- **Add / edit / delete tasks** with title, notes, priority, and an optional due date
- **Live search** across task titles and notes
- **Priority filtering** (All / High / Medium / Low)
- **Overdue detection** — past-due tasks are flagged automatically
- **Persistent storage** via `localStorage`, with graceful fallback if storage is unavailable
- **Accessible by default** — labeled form controls, visible focus states, keyboard-navigable
- **Fully typed** with TypeScript, strict mode enabled
- **Unit tested** with Vitest + React Testing Library

## Tech stack

| Layer       | Choice                          |
|-------------|----------------------------------|
| UI          | React 18 + TypeScript            |
| Build tool  | Vite                              |
| Styling     | Plain CSS with custom properties (no framework) |
| Testing     | Vitest + React Testing Library    |
| Persistence | Browser `localStorage`            |

## Getting started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# run the test suite
npm test

# build for production
npm run build
```

The dev server runs at `http://localhost:5173` by default.

## Project structure

```
src/
  components/
    Column.tsx        # A single board column, handles drop events
    TaskCard.tsx       # Individual task card, handles drag start/end
    AddTaskForm.tsx    # Inline expandable form for creating a task
  App.tsx              # Board state, filtering logic, layout
  storage.ts           # localStorage read/write + seed data
  types.ts             # Shared TypeScript types
  styles.css           # All styling, via CSS custom properties
  App.test.tsx         # Component tests
```

## Deploying

This is a static Vite app, so it deploys anywhere that serves static files:

- **Vercel**: `vercel` (auto-detects Vite)
- **Netlify**: drag the `dist/` folder into Netlify, or connect the repo
- **GitHub Pages**: run `npm run build`, then publish the `dist/` folder

## Adding a screenshot

Once deployed, take a screenshot of the board (with a few tasks in each column), save it as
`docs/screenshot.png`, and it'll show up in this README automatically.

## Possible next steps

- Sync tasks to a real backend (Firebase/Supabase) instead of `localStorage`
- Multi-user boards with auth
- Reordering within a column, not just across columns
- Keyboard-only drag-and-drop (arrow keys) for full accessibility parity

## License

MIT — see [LICENSE](LICENSE).
