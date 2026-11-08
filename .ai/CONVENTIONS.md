# Conventions

## Code
- TS strict mode on. No `any`. If stuck, use `unknown` + narrow.
- Named exports only. No default exports.
- Files kebab-case, components PascalCase inside.
- Max 150 LOC per file. Split before.
- No class components; functional + hooks.
- SOLID: single responsibility per module. If a file grows a second reason to
  change, split it.

## Styling
- Tailwind classes directly in JSX. No CSS modules unless animating.
- Use CSS vars from tokens.css for colors — NEVER hex in components.
- Motion via `motion` library, never raw CSS transitions for key moments.
- All animations respect `prefers-reduced-motion` via a single branch at the
  engine level, not per-component.

## State
- Zustand for shared state. No Redux, no Context for app state.
- Replay engine as a class, not hooks — it owns its own scheduling.

## Testing / verification
- No automated tests in v1 (scope control). Smoke-test every phase gate by
  recording a short screen clip and watching for jank at 60fps.
- `npm run build` must stay green at every commit.

## Forbidden
- jQuery. Lodash (use native). Moment (use date-fns if needed).
- Any dependency > 50KB gzipped without a DECISIONS.md entry justifying it.
- Build-time LLM calls. Runtime API keys from end-users.
- Volvo IP or truck/CI domain content.

## Commit hygiene
- Commit every ~20 minutes of work.
- Commit messages start with `[phase-N]` and name the change.
- Branch per phase: `phase-1-shell`, `phase-2-replay`, etc.
- PR to main at phase end, description pulled from the session log.
