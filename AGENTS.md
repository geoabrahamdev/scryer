# Codex Entry Point

Read `.ai/CONTEXT.md`, `.ai/PROGRESS.md`, and the last two files in
`.ai/sessions/` before anything else.

Tool-specific notes for Codex below:
- This file is read by Codex per its AGENTS.md convention.
- Commit every ~20 minutes with `[phase-N] ...` prefix.
- End every session with the handoff prompt in `.ai/PROMPTS/handoff.md`.

## Deploy Configuration (configured by /setup-deploy)
- Platform: GitHub Pages
- Production URL: https://geoabrahamdev.github.io/scryer/
- Deploy workflow: `.github/workflows/deploy.yml`
- Deploy status command: GitHub Actions `Deploy` workflow
- Merge method: merge
- Project type: web app
- Post-deploy health check: https://geoabrahamdev.github.io/scryer/

### Custom deploy hooks
- Pre-merge: `npm run build`
- Deploy trigger: automatic on push to `main`
- Deploy status: https://github.com/geoabrahamdev/scryer/actions/workflows/deploy.yml
- Health check: https://geoabrahamdev.github.io/scryer/
