# Current State — updated 2026-11-08

## Phase
Phase 1: static shell. Code complete on branch `phase-1-shell`. Awaiting
local verification + Pages deploy to close the Phase 1 gate.

## Done
- [x] Phase 0 live: https://geoabrahamdev.github.io/scryer/
- [x] Scenario schema (types.ts, sample.ts, registry.ts) — refund
      complaint, 4 entities, 4 relations, 3 suggestions
- [x] Zustand store (scenarioId, mode, speed, activePanel, query,
      selectedNodeId)
- [x] Graph layer: pure Cytoscape adapter + token-driven stylesheet
      (resolved at init from CSS vars; canvas needs concrete colors)
- [x] Topbar: logo, scenario picker, mode toggle (live disabled with
      v2 tooltip), speed picker, settings button
- [x] StatusStrip: entity/relation counts + phase label
- [x] DocumentViewer with minimal Markdown renderer
- [x] GraphCanvas: Cytoscape + fcose, tap-to-select, destroy on unmount
- [x] QueryPanel: input, '/' keycap, suggestion chips, Shortcuts legend
- [x] MobileTabs + useIsMobile hook (<768px breakpoint)
- [x] useKeyboardShortcuts: 1/2/3 switch scenario, '/' focus query,
      space reserved for Phase 2 replay trigger
- [x] tsc -b clean, strict mode with noUncheckedIndexedAccess
- [x] Every src file under the 150-LOC CONVENTIONS limit

## In progress
- [ ] Local `npm run dev` + `npm run build` smoke test on Windows
- [ ] Phase 1 gate: 10-second clip of the empty shell on mobile per
      plan sec 3. Capture BEFORE merging phase-1-shell to main.

## Blocked / open questions
- None.

## Next session
Phase 2: replay engine + scenario 1 frames per plan sec 3. Spec the
Frame schema into docs/replay-format.md first, then the engine class,
then author the frames. Do not add scenarios 2 & 3 until scenario 1
replays at 60fps.

## Reminder to future sessions
Read .ai/CONTEXT.md, .ai/DECISIONS.md, the last two files in
.ai/sessions/, and `git log --oneline -20` before touching code.
