import { useAppStore } from '../store/app-store'
import {
  ScenarioPicker,
  ModeToggle,
  SpeedPicker,
} from './TopbarControls'

/**
 * The top command strip. Phase 1 wires scenario picker, mode toggle,
 * speed, and a decorative settings button. Phase 2 enables live mode.
 */
export function Topbar() {
  const scenarioId = useAppStore((s) => s.scenarioId)
  const mode = useAppStore((s) => s.mode)
  const speed = useAppStore((s) => s.speed)
  const setMode = useAppStore((s) => s.setMode)
  const setSpeed = useAppStore((s) => s.setSpeed)
  const setScenario = useAppStore((s) => s.setScenario)

  return (
    <header
      className="h-[52px] flex items-center justify-between px-4 border-b shrink-0"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--bg-raised)',
      }}
    >
      <div className="flex items-center gap-5">
        <Logo />
        <ScenarioPicker value={scenarioId} onChange={setScenario} />
      </div>
      <div className="flex items-center gap-3">
        <ModeToggle mode={mode} onChange={setMode} />
        <SpeedPicker speed={speed} onChange={setSpeed} />
        <SettingsButton />
      </div>
    </header>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <span
        aria-hidden="true"
        className="h-3 w-3 rounded-full"
        style={{
          background: 'var(--accent-1)',
          boxShadow: '0 0 10px var(--accent-glow)',
        }}
      />
      <span className="font-semibold tracking-tight text-[15px]">Scryer</span>
    </div>
  )
}

function SettingsButton() {
  return (
    <button
      type="button"
      aria-label="Settings"
      className="h-8 w-8 rounded flex items-center justify-center text-base"
      style={{
        background: 'var(--bg-overlay)',
        color: 'var(--text-muted)',
      }}
    >
      ⚙
    </button>
  )
}
