import type { Mode, Speed } from '../store/app-store'
import { listScenarios } from '../scenarios/registry'

const SPEEDS: readonly Speed[] = [0.5, 1, 2] as const

export function ScenarioPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (id: string) => void
}) {
  const scenarios = listScenarios()
  return (
    <label
      className="flex items-center gap-2 h-8 px-3 rounded text-xs font-mono"
      style={{ background: 'var(--bg-overlay)', color: 'var(--text-muted)' }}
    >
      <span>Scenario</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none cursor-pointer"
        style={{ color: 'var(--text-primary)' }}
      >
        {scenarios.map((s) => (
          <option
            key={s.id}
            value={s.id}
            style={{ background: 'var(--bg-overlay)' }}
          >
            {s.title}
          </option>
        ))}
      </select>
    </label>
  )
}

export function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode
  onChange: (m: Mode) => void
}) {
  return (
    <div
      className="flex items-center h-8 p-0.5 rounded text-xs font-mono"
      style={{ background: 'var(--bg-overlay)' }}
    >
      {(['replay', 'live'] as const).map((m) => {
        const isActive = m === mode
        const isDisabled = m === 'live'
        return (
          <button
            key={m}
            type="button"
            onClick={() => !isDisabled && onChange(m)}
            disabled={isDisabled}
            title={isDisabled ? 'Live mode ships in v2' : undefined}
            className="px-3 h-full rounded transition-colors"
            style={{
              background: isActive ? 'var(--bg-base)' : 'transparent',
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              opacity: isDisabled ? 0.5 : 1,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            {m === 'replay' ? '● Replay' : 'Live'}
          </button>
        )
      })}
    </div>
  )
}

export function SpeedPicker({
  speed,
  onChange,
}: {
  speed: Speed
  onChange: (s: Speed) => void
}) {
  return (
    <label
      className="flex items-center gap-2 h-8 px-3 rounded text-xs font-mono"
      style={{ background: 'var(--bg-overlay)', color: 'var(--text-muted)' }}
    >
      <span>Speed</span>
      <select
        value={speed}
        onChange={(e) => onChange(Number(e.target.value) as Speed)}
        className="bg-transparent outline-none cursor-pointer"
        style={{ color: 'var(--text-primary)' }}
      >
        {SPEEDS.map((s) => (
          <option key={s} value={s} style={{ background: 'var(--bg-overlay)' }}>
            {s}×
          </option>
        ))}
      </select>
    </label>
  )
}
