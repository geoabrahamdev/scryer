# Codex session — Phase 1 release

## What changed
- Verified the six Phase 1 commits, including the release-only mobile
  overflow fix, and merged `phase-1-shell` into `main`.
- Removed the Claude co-author and session trailers from reachable
  commit messages. Authors, file contents, commit dates, and scoped
  commit boundaries were preserved.
- Kept local recovery refs under
  `refs/backup/pre-contributor-cleanup/` before replacing remote
  `main` with a guarded `--force-with-lease`.
- Preserved the unrelated working-tree deletion of
  `src/replay/.gitkeep` on the original feature checkout; it was not
  included in the release.

## Verification
- `npm ci`: 0 vulnerabilities.
- `npm run build`: TypeScript and Vite passed.
- Desktop 1440×900: document, graph, query, controls, keyboard focus,
  and suggestion behavior passed; no console errors.
- Mobile 390×844: no horizontal overflow; Document, Graph, and Query
  tabs all switch correctly; no console errors.
- GitHub Pages Deploy run 42505640453: build and deploy jobs succeeded
  for merge 33b01b8.
- Live page and its Phase 1 JS/CSS assets return HTTP 200.
- GitHub contributors API no longer returns `claude`.

## Half-done
- Nothing in Phase 1. The generated bundle is above Vite's 500 kB
  warning threshold and should be revisited as Phase 2 adds code.

## Next
Start Phase 2 by specifying `Frame` in `docs/replay-format.md`, then
build the replay engine and author scenario 1 frames. Do not add
scenarios 2 and 3 until scenario 1 replays at 60fps.
