# Scryer

> Ontologies from messy text, in your browser.

Paste a messy document — a consumer complaint, an insurance claim, a logistics
incident — and watch Scryer scry an ontology out of it: entities and relations
assembling into a live, queryable knowledge graph. No backend. No API keys.
Just a GitHub Pages tab.

**Status:** Phase 0 — foundations. Live demo and screen capture land at Phase 4.

The canonical implementation plan lives in [`docs/scryer-implementation-plan.md`](./docs/scryer-implementation-plan.md).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Push to `main`. GitHub Actions does the rest. The site lives under the repo
name, so `vite.config.ts` pins `base: '/scryer/'`. If you fork, change it.

## Stack

- Vite + TypeScript
- Tailwind CSS v4 (CSS-first config — see `src/styles/tokens.css`)
- Cytoscape.js with `fcose` layout
- Zustand for shared state
- `motion` for key transitions
- Shiki for in-doc syntax highlighting

See [`.ai/DECISIONS.md`](./.ai/DECISIONS.md) for why each choice.

## Working on this project with an AI tool

Three AI tools rotate on this repo (Claude Code, Codex, Antigravity).
Session memory lives in [`.ai/`](./.ai/). Start every session with
[`.ai/PROMPTS/onboard.md`](./.ai/PROMPTS/onboard.md) and end every
session with [`.ai/PROMPTS/handoff.md`](./.ai/PROMPTS/handoff.md).

## License

MIT (TBD — placeholder until v1 launch).
