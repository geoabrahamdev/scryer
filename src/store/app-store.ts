import { create } from 'zustand'

export type Mode = 'replay' | 'live'
export type Speed = 0.5 | 1 | 2
export type PanelId = 'document' | 'graph' | 'query'

interface AppState {
  readonly scenarioId: string
  readonly mode: Mode
  readonly speed: Speed
  readonly activePanel: PanelId
  readonly query: string
  readonly selectedNodeId: string | null

  readonly setScenario: (id: string) => void
  readonly setMode: (m: Mode) => void
  readonly setSpeed: (s: Speed) => void
  readonly setActivePanel: (p: PanelId) => void
  readonly setQuery: (q: string) => void
  readonly selectNode: (id: string | null) => void
}

/**
 * Single Zustand store. Keep this flat — no nested slices in v1.
 * The replay engine (Phase 2) will own its own clock and only push
 * finished events into this store, never the other way round.
 */
export const useAppStore = create<AppState>((set) => ({
  scenarioId: 'sample',
  mode: 'replay',
  speed: 1,
  activePanel: 'graph',
  query: '',
  selectedNodeId: null,

  setScenario: (scenarioId) => set({ scenarioId }),
  setMode: (mode) => set({ mode }),
  setSpeed: (speed) => set({ speed }),
  setActivePanel: (activePanel) => set({ activePanel }),
  setQuery: (query) => set({ query }),
  selectNode: (selectedNodeId) => set({ selectedNodeId }),
}))
