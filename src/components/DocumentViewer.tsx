import { useAppStore } from '../store/app-store'
import { getScenario } from '../scenarios/registry'
import { Markdown } from './Markdown'

/**
 * Left panel. Phase 1 shows the scenario's source document with light
 * markdown formatting. Phase 2 adds doc-span highlight sweeps driven by
 * the replay engine (plan § 1 — hero moment, step 1).
 */
export function DocumentViewer() {
  const scenarioId = useAppStore((s) => s.scenarioId)
  const scenario = getScenario(scenarioId)
  if (!scenario) return <EmptyPanel label="No scenario" />

  return (
    <section
      className="h-full overflow-y-auto p-5"
      style={{ background: 'var(--bg-raised)' }}
      aria-label="Source document"
    >
      <Eyebrow>Source · {scenario.title.replace(/^.*·\s*/, '')}</Eyebrow>
      <Markdown text={scenario.document} />
    </section>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-5 text-[10px] font-mono uppercase tracking-[0.3em]"
      style={{ color: 'var(--text-muted)' }}
    >
      {children}
    </div>
  )
}

function EmptyPanel({ label }: { label: string }) {
  return (
    <section
      className="h-full flex items-center justify-center p-5"
      style={{ background: 'var(--bg-raised)', color: 'var(--text-muted)' }}
    >
      <span className="text-xs font-mono uppercase tracking-[0.3em]">{label}</span>
    </section>
  )
}
