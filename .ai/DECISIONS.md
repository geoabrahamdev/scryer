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

## 2026-11-08 — Dependency-free Markdown renderer for Phase 1
Rationale: The scenario source is 100-200 words of plain prose with the
occasional heading and bolded entity name. `marked` + its sanitizer is
40KB gzipped for a problem a 60-line component solves. Shiki is still
installed and planned for Phase 2 if a scenario carries code blocks; for
now, no parser dep.

## 2026-11-08 — Cytoscape style built from CSS vars at init
Rationale: Cytoscape renders on canvas, so it needs concrete color
strings and cannot read `var(--accent-1)` natively. Alternatives were
(a) hex values duplicated from tokens.css — breaks the single-source-of
-truth rule — or (b) a style built from `getComputedStyle` at mount
time. Picked (b), confined to `src/graph/style.ts` which is explicitly
NOT a component.

## 2026-11-08 — Mobile breakpoint at 768px, tabs below
Rationale: The plan sec 1 specifies tabs under 768px. Between 768 and
1024px the three-panel layout survives with 260px/flex/280px min-widths.
Dropping to tabs earlier would hide the graph on common tablet widths.
