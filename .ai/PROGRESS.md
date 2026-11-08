# Current State — updated 2026-11-08

## Phase
Phase 1: static shell. Merged to `main`, deployed, and verified live at
https://geoabrahamdev.github.io/scryer/.

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
- [x] Responsive shell verified at 1440×900 and 390×844; no horizontal
      overflow and all three mobile tabs render the expected panel
- [x] Query suggestion, '/' focus shortcut, speed picker, and disabled
      live mode verified; browser console clean
- [x] `npm ci` audit clean (0 vulnerabilities) and `npm run build`
      clean against the strict TypeScript config
- [x] GitHub Pages Deploy run 42505640453 succeeded for merge 33b01b8;
      live HTML and hashed JS/CSS assets return HTTP 200
- [x] Removed the stale Claude entry from the GitHub homepage
      Contributors panel by cycling the default branch through a clean
      temporary ref; REST data, Insights data, and the visible panel now
      agree that Claude is absent

## In progress
- None.

## Blocked / open questions
- Vite reports a 730 kB minified JS chunk (229 kB gzip). This is not a
  Phase 1 blocker, but Phase 2 should consider lazy-loading Cytoscape or
  manual chunking before the app grows further.

## Next session
Phase 2: replay engine + scenario 1 frames per plan sec 3. Spec the
Frame schema into docs/replay-format.md first, then the engine class,
then author the frames. Do not add scenarios 2 & 3 until scenario 1
replays at 60fps.

## Reminder to future sessions
Read .ai/CONTEXT.md, .ai/DECISIONS.md, the last two files in
.ai/sessions/, and `git log --oneline -20` before touching code.
