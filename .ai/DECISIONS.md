# Architecture Decisions

Append-only. Each entry: date, title, one-paragraph rationale.

## 2026-11-08 — Vite over Next.js
Rationale: Pages needs static output. Next needs export mode + extra config.
Vite is simpler, faster, and has no server-only runtime surface to accidentally
reach for.

## 2026-11-08 — Cytoscape over D3
Rationale: fcose layout is production-grade and node/edge styling is
declarative. D3 would take ~3× the code for the same result and bring its own
force-directed bugs to debug.

## 2026-11-08 — Tailwind v4 over v3
Rationale: v4's CSS-first config fits the single-page-app constraint. No
`tailwind.config.ts` to drift from `tokens.css`; everything is CSS vars.

## 2026-11-08 — Zustand over Redux/Context
Rationale: Shared state is small (current scenario, replay phase, selected
node). Zustand is one hook and no boilerplate. Redux is overkill, Context
re-renders too aggressively for the graph canvas.

## 2026-11-08 — Replay frames as JSON event arrays
Rationale: Enables variable-speed playback and scrubbing without recomputing.
Each frame is a timestamped event; the engine schedules them via
requestAnimationFrame. See docs/replay-format.md once Phase 2 begins.
