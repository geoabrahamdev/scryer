import type { ElementDefinition } from 'cytoscape'
import type { Scenario } from '../scenarios/types'

/**
 * Translate a Scenario into the elements Cytoscape expects.
 * Pure function — no side effects, no DOM access.
 */
export function toCytoscapeElements(scenario: Scenario): ElementDefinition[] {
  const nodes: ElementDefinition[] = scenario.entities.map((e) => ({
    group: 'nodes',
    data: {
      id: e.id,
      label: e.label,
      type: e.type,
    },
  }))
  const edges: ElementDefinition[] = scenario.relations.map((r) => ({
    group: 'edges',
    data: {
      id: r.id,
      source: r.from,
      target: r.to,
      label: r.label,
    },
  }))
  return [...nodes, ...edges]
}
