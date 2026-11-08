/**
 * Phase 0 placeholder shell.
 *
 * Phase 1 will replace this with the real three-panel layout
 * (DocumentViewer / GraphCanvas / QueryPanel) defined in
 * docs/scryer-implementation-plan.md § 1.
 *
 * Until then, this screen exists to prove the deploy pipeline is green and
 * the token palette renders on real hardware.
 */
export function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 canvas-grid">
      <div className="max-w-xl text-center">
        <p
          className="font-mono text-xs uppercase tracking-[0.3em] mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          phase 0 · foundations
        </p>
        <h1 className="text-5xl font-semibold mb-4 tracking-tight">Scryer</h1>
        <p className="text-lg mb-2" style={{ color: 'var(--text-muted)' }}>
          Ontologies from messy text, in your browser.
        </p>
        <div className="mt-10 flex items-center justify-center gap-2 text-xs font-mono">
          <Dot color="var(--accent-1)" />
          <Dot color="var(--accent-2)" />
          <Dot color="var(--accent-3)" />
          <Dot color="var(--accent-4)" />
          <span className="ml-3" style={{ color: 'var(--text-muted)' }}>
            palette locked
          </span>
        </div>
      </div>
    </main>
  )
}

function Dot({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-3 w-3 rounded-full"
      style={{ background: color, boxShadow: `0 0 12px ${color}` }}
    />
  )
}
