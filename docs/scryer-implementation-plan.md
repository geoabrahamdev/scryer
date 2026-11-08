# Scryer — Implementation Plan

> Browser-only Palantir Foundry-style FDE demo. Paste a messy document → ontology
> assembles into a live graph → query in natural language. Three modes: replay
> (pre-baked), live (WebLLM), bring-your-own-ollama. Ships to GitHub Pages.
>
> **Name:** A scryer divines meaning from a cloudy surface. The palantíri in
> Tolkien are seeing stones; this project scries ontologies out of messy text.
> A tribute to Palantir's namesake without stepping on the trademark.
>
> This document is the canonical brief. Point your AI tool at it at the start of
> every session. Paste its URL into Claude, Codex, and Antigravity as session
> context.

---

## 0. Project summary

**What:** A single-page web app that takes a messy document (consumer complaint,
insurance claim, logistics incident), extracts an ontology, assembles it as a
live knowledge graph, and lets you query in natural language.

**Why:** FDE-shaped portfolio piece + learning project + X-shareable demo.

**For:** Geo (@GeoAbrahamDev), aiming at Forward Deployed Engineer-type roles.

**Hard constraints:**
- Static hosting only (GitHub Pages)
- No API keys required of the end user, ever
- Must run smoothly on a mid-range laptop in Chrome
- No Volvo IP or truck/CI domain content — use consumer complaints, insurance
  claims, logistics incidents
- v1 ships replay mode only. Live (WebLLM) mode is v2.

**Non-goals:**
- Multi-user, auth, persistence
- In-UI ontology editing
- Real-time collaboration
- Anything server-side

**Success criteria:**
- A 20-second screen capture that reads clearly on mobile
- A README that stands on its own without the live demo
- Three scenarios shipped, each with its own narrative arc
- Lighthouse accessibility ≥ 95

---

## 1. UI design direction

The demo lives or dies on how the graph assembles. Spec it tightly.

**Visual language:** Palantir Foundry meets Linear. Dense, dark, confident. Not
playful. Not generic dev-portal.

### Palette (write into `src/styles/tokens.css` on day one)

```css
--bg-base:      #0A0E14;   /* near-black with blue cast */
--bg-raised:    #11161F;
--bg-overlay:   #1A212E;
--border:       #1F2937;
--text-primary: #E6EDF3;
--text-muted:   #7D8590;
--accent-1:     #5EEAD4;   /* teal — primary entity type */
--accent-2:     #F472B6;   /* magenta — secondary entity type */
--accent-3:     #FBBF24;   /* amber — relations */
--accent-glow:  rgba(94, 234, 212, 0.35);
--error:        #F87171;
```

Four accent colors MAX. Entity types map to these. Any more and the graph
becomes soup.

### Typography

- `Inter` (variable) for UI — weights 400/500/600
- `JetBrains Mono` for code, properties, ids
- Base size 14px, headers scale 1.25× each step
- Letter-spacing `-0.01em` on headers (tightens like Linear)

### Layout (desktop ≥1024px)

```
┌─────────────────────────────────────────────────────────────┐
│  LOGO    Scenario ▾    [●Replay / Live]    Speed ▾    ⚙    │  52px topbar
├──────────────┬──────────────────────────────┬───────────────┤
│              │                              │               │
│   DOCUMENT   │       GRAPH CANVAS           │    QUERY      │
│   VIEWER     │       (Cytoscape)            │    PANEL      │
│              │                              │               │
│   24% width  │       52% width              │    24% width  │
│              │                              │               │
├──────────────┴──────────────────────────────┴───────────────┤
│  ⚡ 4 entities · 7 relations · extracted in 1.24s           │  32px status
└─────────────────────────────────────────────────────────────┘
```

Mobile (<768px): tabs switch between the three panels. Graph gets 70vh.

### Motion choreography (the hero moment)

1. **Doc highlight phase** (0–800ms): As the LLM "finds" an entity, highlight
   the span in the document viewer with a soft glow sweep.
2. **Entity entrance** (each 300ms, staggered 150ms): Node fades from opacity
   0.3 to 1, scales 0.6 → 1.0, ease-out-cubic, with a subtle accent-glow pulse.
3. **Edge draw** (400ms per edge): SVG path draws from source to target using
   stroke-dasharray, slight curve.
4. **Settle** (600ms): Force-directed layout runs, nodes find positions with
   spring physics.
5. **Query match** (on NL query): Matched nodes pulse accent-glow 2×,
   non-matches fade to 0.3 opacity, edges along the answer path animate
   stroke-color shift.

**Total replay budget:** 8–12 seconds end-to-end. Anything longer kills the X
clip.

### Micro-details separating "good" from "wow"

- Subtle 32px grid background at 0.03 opacity on the canvas
- Node hover: 180ms scale 1.0 → 1.08, properties card slides in from node
- Query suggestions as chips below the input, pre-filled per scenario
- Status strip numbers count up, don't snap in
- Keyboard shortcuts visible: `1/2/3` for scenarios, `space` to replay, `/` to
  focus query
- A single `prefers-reduced-motion` branch that disables animations but keeps
  end state

### Libraries (non-negotiable)

- `cytoscape.js` + `cytoscape-fcose` (organic force-directed layout)
- `motion` (Framer Motion's lean successor) for panel transitions
- `shiki` for document syntax highlighting
- `cmdk` for the command palette
- Tailwind CSS v4 for everything else

**Reference material to keep open while designing:** Observable notebooks
(information density), Linear (motion grammar), Figma's canvas (zoom/pan),
Palantir Foundry screencaps on YouTube (graph aesthetics).

---

## 2. Shared memory across Claude / Codex / Antigravity

The failure mode you're avoiding: each tool re-asks the same context, decisions
are lost between sessions, two tools silently diverge on conventions.

### File layout

```
scryer/
├── .ai/
│   ├── CONTEXT.md          # canonical project brief — read first every session
│   ├── DECISIONS.md        # append-only architecture decisions (ADR-lite)
│   ├── PROGRESS.md         # current phase, done, in-progress, blocked
│   ├── CONVENTIONS.md      # code style, patterns, forbidden choices
│   ├── GLOSSARY.md         # terms (ontology, entity, scenario, replay-frame…)
│   ├── BACKLOG.md          # "wouldn't it be cool if" ideas — never v1 scope
│   ├── PROMPTS/
│   │   ├── onboard.md
│   │   └── handoff.md
│   └── sessions/
│       ├── 2026-11-09-claude.md
│       ├── 2026-11-10-codex.md
│       └── 2026-11-11-antigravity.md
├── CLAUDE.md               # Claude Code reads this
├── AGENTS.md               # Codex reads this
└── GEMINI.md               # Antigravity reads this
```

The three tool-specific files are thin pointers — same three lines each:

```markdown
# <Tool> Entry Point

Read `.ai/CONTEXT.md`, `.ai/PROGRESS.md`, and the last two files in
`.ai/sessions/` before anything else.

Tool-specific notes for <tool> below:
- <any quirks for that tool>
```

This keeps the three in sync without Windows symlink pain. The source of truth
is always `.ai/CONTEXT.md`.

### `.ai/CONTEXT.md` (canonical — 300–500 words, update sparingly)

```markdown
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
```

### `.ai/DECISIONS.md` (append-only)

```markdown
# Architecture Decisions

## 2026-11-09 — Vite over Next.js
Rationale: Pages needs static output. Next needs export mode + extra config.
Vite is simpler and faster.

## 2026-11-09 — Cytoscape over D3
Rationale: fcose layout is production-grade and node/edge styling is
declarative. D3 would take 3× the code for the same result.

## 2026-11-10 — Replay frames as JSON arrays of events
Rationale: Enables variable-speed playback and scrubbing without recomputing.
See docs/replay-format.md for schema.
```

### `.ai/PROGRESS.md` (overwritten at session end, short)

```markdown
# Current State — updated 2026-11-10

## Phase
Phase 2: replay mode (weekend 3 of 4)

## Done
- [x] Repo + Pages deploy pipeline
- [x] Three-panel shell, dark theme, tokens
- [x] Cytoscape mounted, sample graph renders
- [x] Scenario 1 (consumer complaint) — frames authored

## In progress
- [ ] Replay engine timing (choppy around frame 4)
- [ ] Doc-span highlight sweep animation

## Blocked / open questions
- NL query match: fuzzy or exact? defaulting to exact for v1.

## Next session
Fix frame-4 jitter. Then author scenario 2 (insurance claim).
```

### `.ai/CONVENTIONS.md`

```markdown
# Conventions

## Code
- TS strict mode on. No `any`. If stuck, use `unknown` + narrow.
- Named exports only. No default exports.
- Files kebab-case, components PascalCase inside.
- Max 150 LOC per file. Split before.
- No class components; functional + hooks.

## Styling
- Tailwind classes directly in JSX. No CSS modules unless animating.
- Use CSS vars from tokens.css for colors — never hex in components.
- Motion via `motion` library, never raw CSS transitions for key moments.

## State
- Zustand for shared state. No Redux, no Context for app state.
- Replay engine as a class, not hooks.

## Forbidden
- jQuery. Lodash (use native). Moment (use date-fns if needed).
- Any dependency > 50KB gzipped without justification in DECISIONS.
```

### Session protocol

**Start of every AI-tool session — paste this verbatim (saved in `.ai/PROMPTS/onboard.md`):**

```
Read .ai/CONTEXT.md, .ai/PROGRESS.md, .ai/DECISIONS.md, and the last
session log. Then tell me in 5 bullets what we're doing next. Don't
start coding yet.
```

**End of every session — paste this verbatim (saved in `.ai/PROMPTS/handoff.md`):**

```
Before we stop: append a session log to .ai/sessions/YYYY-MM-DD-<tool>.md
with what we did, what's half-done, and any decision worth recording.
Update .ai/PROGRESS.md. If any architectural decisions were made, append
to .ai/DECISIONS.md. Commit everything.
```

Discipline on these two prompts is 80% of what makes the system work.

### Session log template (`.ai/sessions/YYYY-MM-DD-<tool>.md`)

```markdown
# 2026-11-09 — Claude session

## Worked on
- Replay engine scaffold
- Frame scheduling via requestAnimationFrame

## Shipped
- src/replay/engine.ts
- src/replay/frames/complaint-01.json

## Half-done
- Frame interpolation — works but jittery

## Decisions
- See DECISIONS.md entry for 2026-11-09

## Notes for next session
- Jitter likely from re-triggering force layout every frame. Try pinning
  positions after frame 3.
```

### Git as the memory substrate

- Commits every ~20 minutes of work
- Commit messages start with `[phase-N]` and name the change
- Branch per phase: `phase-1-shell`, `phase-2-replay`, etc.
- PR to main at phase end, description pulled from the session log
- `git log --oneline -20` + `.ai/PROGRESS.md` + last session file = full context
  in 30 seconds

### Windows wrinkle

Add `.gitattributes`:

```
* text=auto eol=lf
*.md text eol=lf
```

Prevents the three tools from fighting each other with LF/CRLF churn.

---

## 3. Full implementation plan

Four weekends. Strict phase gates. Don't start a phase until the previous
phase's deliverable is live on GitHub Pages.

### Phase 0 — Foundations (half of weekend 1, ~6 hours)

**Deliverables:**
- Repo created, pushed, Pages enabled, first "hello world" deploy green
- `.ai/` scaffolding committed with all canonical files filled in
- `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` pointer files
- `.gitattributes`, `.editorconfig`, `.github/workflows/deploy.yml`

**Stack lock-in (`package.json` deps):**

```json
{
  "vite": "^6.0",
  "typescript": "^5.6",
  "tailwindcss": "^4.0",
  "cytoscape": "^3.30",
  "cytoscape-fcose": "^2.2",
  "motion": "^11",
  "zustand": "^5",
  "shiki": "^1.24"
}
```

**GitHub Action (`.github/workflows/deploy.yml`):**

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**`vite.config.ts` — don't skip the base path:**

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/scryer/',
  build: { outDir: 'dist' }
})
```

### Phase 1 — Static shell (second half of weekend 1 + weekend 2, ~16 hours)

**Deliverables (each live on Pages at phase end):**
- Three-panel layout exact to the spec above
- Dark theme with tokens.css
- Topbar with scenario picker (dropdown stub), mode toggle, speed control
- Status strip
- Cytoscape canvas mounts and renders a hardcoded 4-node graph with correct
  styling
- Document viewer renders markdown with Shiki
- Query panel accepts input (no behavior yet)
- Keyboard shortcut scaffolding (1/2/3, space, /)
- Mobile: tabs switch panels

**File structure at phase end:**

```
src/
├── main.tsx
├── App.tsx
├── styles/
│   ├── tokens.css
│   └── globals.css
├── components/
│   ├── Topbar.tsx
│   ├── DocumentViewer.tsx
│   ├── GraphCanvas.tsx
│   ├── QueryPanel.tsx
│   └── StatusStrip.tsx
├── graph/
│   ├── cytoscape-config.ts
│   └── style.ts
├── store/
│   └── app-store.ts
└── scenarios/
    └── sample.ts
```

**Phase gate:** Record a 10-second clip of the empty shell on mobile. If it
doesn't already look premium with no data, fix typography/spacing before moving
on.

### Phase 2 — Replay engine + scenario 1 (weekend 3, ~10 hours)

**The replay frame format** (also write to `docs/replay-format.md` and
`.ai/DECISIONS.md`):

```ts
type Frame =
  | { t: number; kind: 'highlight-span'; docSpan: [number, number]; color: string }
  | { t: number; kind: 'add-entity';     id: string; label: string; type: string; props: Record<string, string> }
  | { t: number; kind: 'add-relation';   id: string; from: string; to: string; label: string }
  | { t: number; kind: 'settle';         duration: number }
  | { t: number; kind: 'query-match';    nodeIds: string[]; edgeIds: string[] }

type Scenario = {
  id: string
  title: string
  document: string           // markdown
  entityTypes: Record<string, { color: string; icon: string }>
  frames: Frame[]
  suggestions: { q: string; matchFrameId?: string }[]
}
```

**Deliverables:**
- Replay engine class: load scenario → schedule frames → emit events →
  components react
- Scenario 1: consumer complaint about a delayed refund
  - Document: 180-word complaint email
  - 6–8 entities, 7–10 relations
  - 3 suggested queries
- Doc span highlight animation
- Entity entrance animation
- Edge draw animation
- Settle via `fcose` with animation on
- Query matching: match on entity label and relation label, static dictionary
  for v1

**Phase gate:** The 8-second replay must play without jank at 60fps. Record a
clip. If any frame stutters, fix before moving on.

### Phase 3 — Scenarios 2 & 3, polish (weekend 4, ~12 hours)

**Deliverables:**
- Scenario 2: Insurance claim (auto accident)
- Scenario 3: Logistics incident (shipment damage)
- Properties card on node hover
- Query match pulse animation
- Mobile polish — real test on actual phone
- `prefers-reduced-motion` branch
- Accessibility: focus rings, aria-labels on graph nodes (describe via live
  region)
- README with embedded 20-second gif
- `docs/how-it-works.md` with architecture diagram
- OG image for link previews

### Phase 4 — Launch (end of weekend 4, ~3 hours)

**Pre-flight checklist (don't launch without all green):**

- [ ] All three scenarios play cleanly in Chrome, Firefox, Safari
- [ ] Mobile portrait and landscape both usable
- [ ] Page loads in <2s on throttled 4G (check in Lighthouse)
- [ ] Lighthouse accessibility ≥ 95
- [ ] README's top is a GIF, not a paragraph
- [ ] Repo has description, topics (`fde`, `ontology`, `demo`, `palantir`,
      `graph`), and a social preview image
- [ ] Repo is pinned on GitHub profile
- [ ] First line of README includes the live demo URL
- [ ] Can explain what it does in one sentence without saying "ontology"

### Phase 5 (v2, defer until v1 lands AND gets ≥20 X reactions)

Live mode. Only build if the audience signal says there's demand.

- `coi-serviceworker.js` for cross-origin isolation
- WebLLM with `Llama-3.2-1B-Instruct-q4f16_1-MLC` as default (800MB)
- Streaming extraction → frames generated on the fly
- Toggle between Llama 3.2 1B (fast) and Phi-3 Mini (smarter)
- "Bring your own Ollama endpoint" option in settings

---

## 4. X launch plan

### During build (3 weeks of posts)

- **Weekend 1 wrap:** screenshot of the empty shell + "the goal:" one-liner
- **Weekend 2 wrap:** 10-sec clip of first entity assembling
- **Weekend 3 wrap:** full 8-sec replay clip, no words, just the magic
- **Weekend 4 wrap:** launch post

### Launch post (draft now, revise on launch day)

```
I built a browser-only clone of Palantir's demo.

Paste a messy document. Watch it become a queryable knowledge graph.
No API keys. No backend. Just a GitHub Pages tab.

Live demo: <url>
Code: <url>

How it works ↓
[20-second screen capture clip]
```

Reply chain with 1 post per architectural decision. Pure FDE catnip for the
right audience.

---

## 5. Risks and pre-flight checks

1. **Animation polish is 60% of the perceived value.** If you spend equal time
   on all phases, Phase 2 will be rushed and the demo will look like every
   other dev portfolio. Allocate 1.5× the budgeted time to animation
   choreography. Cut a scenario before you cut polish.

2. **You will want to add features in v1.** Don't. The scope above is already
   ambitious for four weekends given your Volvo day job. Every "wouldn't it be
   cool if" goes in `.ai/BACKLOG.md`, nowhere else.

3. **The README is the product for 80% of viewers.** Most people on X won't
   click through. Most who click won't try the demo. Most who try won't try
   all three scenarios. The README's top 400 pixels — hero gif + one-sentence
   pitch + live demo link — carries the whole thing. Write and iterate it
   before Phase 4.

---

## Appendix A — First-session prompt for any AI tool

Paste this at the start of your very first session on the repo:

```
I'm starting a new project called Scryer. It's a browser-only
Palantir-style FDE demo for my portfolio.

Before writing any code:
1. Read this implementation plan (scryer-implementation-plan.md)
2. Scaffold the .ai/ directory per section 2 of the plan
3. Create the three pointer files CLAUDE.md, AGENTS.md, GEMINI.md
4. Set up the Vite + TS + Tailwind v4 + Cytoscape project per Phase 0
5. Commit in small chunks with [phase-0] prefix

Stop after Phase 0 and show me what you've shipped before starting Phase 1.
```

## Appendix B — Mid-session recovery prompt

If an AI tool loses context mid-session:

```
We're mid-build on Scryer. Please:
1. Read .ai/CONTEXT.md, .ai/PROGRESS.md, .ai/DECISIONS.md
2. Read the most recent file in .ai/sessions/
3. Run: git log --oneline -20
4. Then summarize in 5 bullets what state we're in and what's next.
Don't touch code until I confirm your summary.
```
