# Scryer — Project Brief

## What it is
Browser-only Palantir Foundry-style demo. Paste messy document → ontology
assembles into live graph → query in natural language. Three modes:
replay (pre-baked), live (WebLLM in-browser), bring-your-own-ollama.

## Why
FDE-portfolio piece for Geo (@GeoAbrahamDev).
Learning + portfolio + X-shareable. No API keys at runtime, ever.

## Hard constraints
- Deploys to GitHub Pages (static only, no backend)
- No runtime API keys from end-users
- Must run on mid-range laptop in Chrome
- No Volvo IP or truck/CI domain content — consumer complaints / insurance /
  logistics only
- v1 ships replay mode only. Live mode is v2.

## Architecture (v1)
- Vite + TypeScript + Tailwind v4
- Cytoscape.js (fcose layout) for the graph
- Static JSON "replay frames" per scenario
- No build-time LLM calls — all outputs pre-baked and committed
- GitHub Actions deploy to Pages

## Non-goals
- Multi-user, auth, persistence
- Editing the ontology in-UI
- Real-time collaboration
- Anything server-side

## Success criteria
- 20-second screen capture that reads clearly on mobile
- README that stands on its own without the live demo
- Three scenarios shipped, each with its own narrative
- Lighthouse accessibility ≥ 95

## Canonical plan
The full implementation plan lives at docs/scryer-implementation-plan.md.
This file is the elevator pitch; that file is the contract.
