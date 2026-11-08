import type { Scenario } from './types'
import { sampleScenario } from './sample'

/**
 * Scenario registry. Keep this list in sync with keyboard shortcuts
 * (1/2/3 map to the first three entries once Phase 2 ships scenarios 2 & 3).
 */
const SCENARIOS: readonly Scenario[] = [sampleScenario] as const

const byId: ReadonlyMap<string, Scenario> = new Map(
  SCENARIOS.map((s) => [s.id, s] as const),
)

export function getScenario(id: string): Scenario | undefined {
  return byId.get(id)
}

export function listScenarios(): readonly Scenario[] {
  return SCENARIOS
}
