import { useAppStore } from '../store/app-store'
import { getScenario } from '../scenarios/registry'

/**
 * Bottom status strip. Phase 1 reports entity/relation counts from the
 * active scenario. Phase 2 adds the extraction timing ("in 1.24s") once
 * the replay engine measures it.
 */
export function StatusStrip() {
  const scenarioId = useAppStore((s) => s.scenarioId)
  const scenario = getScenario(scenarioId)
  const entityCount = scenario?.entities.length ?? 0
  const relationCount = scenario?.relations.length ?? 0

  return (
    <footer
      className="h-8 flex items-center whitespace-nowrap px-2 sm:px-4 gap-1.5 sm:gap-3 text-[10px] sm:text-xs font-mono border-t shrink-0"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--bg-raised)',
        color: 'var(--text-muted)',
      }}
    >
      <span aria-hidden="true" style={{ color: 'var(--accent-3)' }}>
        ⚡
      </span>
      <Count value={entityCount} label="entities" />
      <Divider />
      <Count value={relationCount} label="relations" />
      <Divider />
      <span>static shell · phase 1</span>
    </footer>
  )
}

function Count({ value, label }: { value: number; label: string }) {
  return (
    <span>
      <span style={{ color: 'var(--text-primary)' }}>{value}</span> {label}
    </span>
  )
}

function Divider() {
  return (
    <span aria-hidden="true" style={{ opacity: 0.4 }}>
      ·
    </span>
  )
}
