# Backlog

"Wouldn't it be cool if" ideas. NEVER v1 scope. Revisit after launch.

## Post-v1 features
- Live mode: WebLLM (Llama-3.2-1B) extracting entities from pasted text
- BYO Ollama endpoint in settings
- Streaming extraction → frames generated on the fly
- Toggle Llama 3.2 1B (fast) vs Phi-3 Mini (smarter)

## Nice-to-haves
- Timeline scrubber at the bottom of the graph canvas
- Export graph as PNG / SVG from a context menu
- URL-encodable scenario state (shareable deep links)
- Keyboard-driven NL query history (↑/↓ through past queries)
- Command palette entries for every scenario and every entity
- Dark/light toggle (currently dark-only on purpose)

## Content ideas (more scenarios)
- Medical record → clinical narrative graph
- Legal contract → clause/party/obligation graph
- Hiring transcript → candidate/skill/signal graph
- News article → event/actor/claim graph

## Infrastructure
- Visual regression tests on the three scenarios (Playwright + screenshot diff)
- Bundle-size budget enforced in CI
- Lighthouse CI on every PR

## Marketing
- Hacker News "Show HN" post (only after X launch lands)
- Dev.to writeup on the replay-frames pattern
