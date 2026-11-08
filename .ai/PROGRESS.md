# Current State — updated 2026-11-08

## Phase
Phase 0: Foundations (weekend 1, first half)

## Done
- [x] Repo scaffolded on disk
- [x] .ai/ canonical files committed
- [x] Pointer files CLAUDE.md / AGENTS.md / GEMINI.md
- [x] .gitattributes + .editorconfig
- [x] GitHub Actions deploy workflow
- [x] Vite + TS + Tailwind v4 + Cytoscape dependency manifest
- [x] vite.config.ts with /scryer/ base path
- [x] index.html + src/main.ts entry rendering "hello world" shell

## In progress
- [ ] First green deploy to GitHub Pages (requires: push to GitHub, enable Pages)

## Blocked / open questions
- None.

## Next session
Phase 1: build the three-panel shell per section 1 of the implementation plan.
Lock the dark theme via tokens.css BEFORE wiring any component — the empty
shell must already look premium at the phase gate.

## Reminder to future sessions
Read .ai/CONTEXT.md, .ai/DECISIONS.md, the last file in .ai/sessions/, and
`git log --oneline -20` before touching code.
