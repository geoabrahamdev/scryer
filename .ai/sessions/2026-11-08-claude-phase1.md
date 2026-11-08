# 2026-11-08 — Claude session (Phase 1)

## Worked on
- Phase 1 shell end-to-end on branch `phase-1-shell`
- Followed the plan: dark theme locked FIRST (tokens.css from Phase 0),
  then components, then layout wiring, then keyboard shortcuts
- Enforced CONVENTIONS: every src file under 150 LOC; split Topbar into
  Topbar + TopbarControls when it crept to 162 LOC

## Shipped
- src/scenarios/{types,sample,registry}.ts (sample consumer complaint)
- src/store/app-store.ts (Zustand, flat)
- src/graph/cytoscape-config.ts (pure Scenario -> ElementDefinition[])
- src/graph/style.ts (tokens resolved at init)
- src/types/cytoscape-fcose.d.ts (ambient declaration shim)
- src/components/Topbar.tsx, TopbarControls.tsx, StatusStrip.tsx
- src/components/DocumentViewer.tsx, Markdown.tsx
- src/components/GraphCanvas.tsx, QueryPanel.tsx, MobileTabs.tsx
- src/hooks/use-is-mobile.ts, use-keyboard-shortcuts.ts
- src/App.tsx rewritten as layout switcher

## Half-done
- Nothing. Code complete; `tsc -b` clean. Awaiting local smoke test
  and Pages deploy to close the Phase 1 gate.

## Decisions
- See DECISIONS.md entries for 2026-11-08: dependency-free Markdown,
  Cytoscape style from CSS vars, mobile breakpoint at 768px.

## Notes for next session
- Phase 1 gate is a 10-second mobile clip. If the empty shell doesn't
  already look premium, fix typography/spacing BEFORE merging. Plan sec 3.
- When Geo (or next tool) opens dev server locally, watch for:
  * Cytoscape edge labels readable at zoom 1.0 (font-size 9 may be tight)
  * Mobile tabs underline alignment on the shorter 'Graph' label
  * Scenario picker dropdown background on Firefox vs Chrome (<option>
    styling is notoriously inconsistent)
- Phase 2 starts with docs/replay-format.md — spec the Frame schema
  before writing engine code.
