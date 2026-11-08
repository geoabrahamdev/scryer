import { Topbar } from './components/Topbar'
import { StatusStrip } from './components/StatusStrip'
import { DocumentViewer } from './components/DocumentViewer'
import { GraphCanvas } from './components/GraphCanvas'
import { QueryPanel } from './components/QueryPanel'
import { MobileTabs } from './components/MobileTabs'
import { useAppStore } from './store/app-store'
import { useIsMobile } from './hooks/use-is-mobile'
import { useKeyboardShortcuts } from './hooks/use-keyboard-shortcuts'

/**
 * Top-level layout switcher.
 *
 * Desktop (>=768px): three panels side by side per plan § 1
 *   DocumentViewer  24%   —  GraphCanvas  52%   —  QueryPanel  24%
 * Mobile  (<768px):  tab strip switches which of the three is visible,
 *                    with the graph getting ~70vh when active.
 */
export function App() {
  useKeyboardShortcuts()
  const isMobile = useIsMobile()

  return (
    <div
      className="h-screen flex flex-col"
      style={{ background: 'var(--bg-base)' }}
    >
      <Topbar />
      <main className="flex-1 flex min-h-0">
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </main>
      <StatusStrip />
    </div>
  )
}

function DesktopLayout() {
  return (
    <>
      <aside
        className="w-[24%] min-w-[260px] border-r"
        style={{ borderColor: 'var(--border)' }}
      >
        <DocumentViewer />
      </aside>
      <div className="flex-1 min-w-0">
        <GraphCanvas />
      </div>
      <aside
        className="w-[24%] min-w-[280px] border-l"
        style={{ borderColor: 'var(--border)' }}
      >
        <QueryPanel />
      </aside>
    </>
  )
}

function MobileLayout() {
  const activePanel = useAppStore((s) => s.activePanel)
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <MobileTabs />
      <div className="flex-1 min-h-0">
        {activePanel === 'document' && <DocumentViewer />}
        {activePanel === 'graph' && (
          <div style={{ height: '70vh' }}>
            <GraphCanvas />
          </div>
        )}
        {activePanel === 'query' && <QueryPanel />}
      </div>
    </div>
  )
}
