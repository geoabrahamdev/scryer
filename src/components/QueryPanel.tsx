import { useRef } from 'react'
import { useAppStore } from '../store/app-store'
import { getScenario } from '../scenarios/registry'

/**
 * Right panel. Phase 1 renders an input, scenario-specific suggestion
 * chips, and the visible-keyboard-shortcuts hint block. No matching
 * behavior yet — Phase 2 wires it to a static dictionary.
 */
export function QueryPanel() {
  const query = useAppStore((s) => s.query)
  const setQuery = useAppStore((s) => s.setQuery)
  const scenarioId = useAppStore((s) => s.scenarioId)
  const scenario = getScenario(scenarioId)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section
      className="h-full flex flex-col p-5"
      style={{ background: 'var(--bg-raised)' }}
      aria-label="Query panel"
    >
      <Eyebrow>Query</Eyebrow>

      <div className="relative">
        <input
          ref={inputRef}
          id="query-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about the graph…"
          className="w-full h-10 pl-3 pr-10 rounded text-sm font-mono outline-none transition-colors focus:border-accent-1"
          style={{
            background: 'var(--bg-overlay)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
          }}
        />
        <kbd
          aria-hidden="true"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-mono px-1.5 py-0.5 rounded"
          style={{
            color: 'var(--text-muted)',
            background: 'var(--bg-base)',
            border: '1px solid var(--border)',
          }}
        >
          /
        </kbd>
      </div>

      {scenario && scenario.suggestions.length > 0 && (
        <>
          <SubEyebrow>Suggestions</SubEyebrow>
          <div className="flex flex-wrap gap-2">
            {scenario.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="px-2.5 py-1 rounded text-xs font-mono transition-colors hover:border-accent-1"
                style={{
                  background: 'var(--bg-overlay)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="mt-auto pt-8">
        <SubEyebrow>Shortcuts</SubEyebrow>
        <KeyHints />
      </div>
    </section>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-3 text-[10px] font-mono uppercase tracking-[0.3em]"
      style={{ color: 'var(--text-muted)' }}
    >
      {children}
    </div>
  )
}

function SubEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-5 mb-2 text-[10px] font-mono uppercase tracking-[0.25em]"
      style={{ color: 'var(--text-muted)', opacity: 0.7 }}
    >
      {children}
    </div>
  )
}

const HINTS: ReadonlyArray<readonly [string, string]> = [
  ['1 / 2 / 3', 'Switch scenario'],
  ['space', 'Replay'],
  ['/', 'Focus query'],
] as const

function KeyHints() {
  return (
    <ul className="space-y-1.5 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
      {HINTS.map(([key, label]) => (
        <li key={key} className="flex items-center justify-between">
          <span>{label}</span>
          <kbd
            className="px-1.5 py-0.5 rounded text-[11px]"
            style={{
              background: 'var(--bg-overlay)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
          >
            {key}
          </kbd>
        </li>
      ))}
    </ul>
  )
}
