import { useAppStore } from '../store/app-store'
import type { PanelId } from '../store/app-store'

const TABS: ReadonlyArray<{ id: PanelId; label: string }> = [
  { id: 'document', label: 'Document' },
  { id: 'graph', label: 'Graph' },
  { id: 'query', label: 'Query' },
] as const

/**
 * Mobile-only tab bar (<768px). Switches which panel is visible.
 * On desktop the layout shows all three at once instead.
 */
export function MobileTabs() {
  const activePanel = useAppStore((s) => s.activePanel)
  const setActivePanel = useAppStore((s) => s.setActivePanel)

  return (
    <nav
      role="tablist"
      aria-label="Panels"
      className="flex shrink-0 border-b"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--bg-raised)',
      }}
    >
      {TABS.map((t) => {
        const isActive = activePanel === t.id
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => setActivePanel(t.id)}
            className="flex-1 h-10 text-[11px] font-mono uppercase tracking-[0.25em] transition-colors"
            style={{
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: isActive
                ? '2px solid var(--accent-1)'
                : '2px solid transparent',
            }}
          >
            {t.label}
          </button>
        )
      })}
    </nav>
  )
}
