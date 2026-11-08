# Glossary

**Entity** — a node in the knowledge graph. Has `id`, `label`, `type`,
and a bag of string properties. Types map 1:1 to accent colors.

**Relation** — a directed edge between two entities. Has `id`, `from`, `to`,
`label`. In v1 relations are untyped beyond their label.

**Ontology** — the set of entity types + relation labels defined by a scenario.
Static, declared in the scenario file.

**Scenario** — a complete demo unit: a source document, an ontology, and the
replay frames that assemble the graph. Three scenarios ship in v1 (consumer
complaint, insurance claim, logistics incident).

**Frame** — a single replay event with a timestamp (ms from scenario start)
and a `kind` discriminator: `highlight-span`, `add-entity`, `add-relation`,
`settle`, `query-match`.

**Replay engine** — the class that reads a scenario's frame list and emits
events to the UI on schedule. Does not touch the DOM directly.

**Replay mode** — v1's only mode. Pre-baked scenarios play back deterministically.
No LLM at runtime.

**Live mode** — v2. WebLLM extracts entities from a user-pasted document in-browser.

**BYO mode** — v2 fallback. User points the app at their own Ollama endpoint.

**Hero moment** — the 8–12s stretch where a document becomes a graph. This is
what the X clip has to capture.

**Phase gate** — the checkpoint at the end of each phase. Don't start the next
phase until the current phase's deliverable is live on Pages and demos cleanly.
