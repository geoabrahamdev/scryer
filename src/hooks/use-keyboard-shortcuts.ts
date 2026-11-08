import { useEffect } from 'react'
import { useAppStore } from '../store/app-store'
import { listScenarios } from '../scenarios/registry'

/**
 * Global keyboard shortcuts per plan § 1:
 *   1 / 2 / 3  switch scenario
 *   space      replay (Phase 2 wires the engine)
 *   /          focus the query input
 *
 * Ignored while typing in an input/textarea/contenteditable field, so
 * the user can still type "1" into the query box without switching away.
 */
export function useKeyboardShortcuts(): void {
  const setScenario = useAppStore((s) => s.setScenario)

  useEffect(() => {
    function isTypingTarget(el: EventTarget | null): boolean {
      if (!(el instanceof HTMLElement)) return false
      const tag = el.tagName
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        el.isContentEditable
      )
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && !isTypingTarget(e.target)) {
        e.preventDefault()
        const input = document.getElementById('query-input')
        if (input instanceof HTMLInputElement) input.focus()
        return
      }

      if (isTypingTarget(e.target)) return

      if (e.key === '1' || e.key === '2' || e.key === '3') {
        const idx = Number(e.key) - 1
        const scenarios = listScenarios()
        const target = scenarios[idx]
        if (target) {
          e.preventDefault()
          setScenario(target.id)
        }
        return
      }

      if (e.code === 'Space') {
        // Phase 2: trigger replay engine. No-op for now.
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [setScenario])
}
