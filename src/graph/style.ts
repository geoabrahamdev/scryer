import type { StylesheetStyle } from "cytoscape"

/**
 * Resolves a CSS custom property on the root element.
 * Falls back to the given value when running outside the browser
 * (SSR, tests) or before styles have loaded.
 */
function resolveToken(name: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  return raw || fallback
}

/**
 * Build the Cytoscape stylesheet lazily so it reads the current token
 * values. Cytoscape renders on canvas and needs concrete color strings,
 * which is the one legitimate reason we resolve CSS vars at runtime here
 * rather than letting them cascade (per CONVENTIONS "never hex in
 * components" — graph/style.ts is a config layer, not a component).
 */
export function buildCytoscapeStyle(): StylesheetStyle[] {
  const accent1 = resolveToken('--accent-1', '#5EEAD4')
  const accent2 = resolveToken('--accent-2', '#F472B6')
  const accent3 = resolveToken('--accent-3', '#FBBF24')
  const accent4 = resolveToken('--accent-4', '#818CF8')
  const textPrimary = resolveToken('--text-primary', '#E6EDF3')
  const textMuted = resolveToken('--text-muted', '#7D8590')
  const bgBase = resolveToken('--bg-base', '#0A0E14')

  return [
    {
      selector: 'node',
      style: {
        'background-color': bgBase,
        'border-width': 2,
        'border-color': accent1,
        'label': 'data(label)',
        'color': textPrimary,
        'font-family': 'Inter, system-ui, sans-serif',
        'font-size': 11,
        'font-weight': 500,
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': 8,
        'width': 36,
        'height': 36,
      },
    },
    {
      selector: 'node[type = "primary"]',
      style: { 'border-color': accent1 },
    },
    {
      selector: 'node[type = "secondary"]',
      style: { 'border-color': accent2 },
    },
    {
      selector: 'node[type = "tertiary"]',
      style: { 'border-color': accent4 },
    },
    {
      selector: 'node:selected',
      style: {
        'border-width': 3,
        'background-color': accent1,
      },
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'control-point-step-size': 40,
        'width': 1.5,
        'line-color': accent3,
        'line-opacity': 0.55,
        'target-arrow-shape': 'triangle',
        'target-arrow-color': accent3,
        'arrow-scale': 0.9,
        'label': 'data(label)',
        'color': textMuted,
        'font-family': 'JetBrains Mono, ui-monospace, monospace',
        'font-size': 9,
        'text-background-color': bgBase,
        'text-background-opacity': 1,
        'text-background-padding': '2px',
        'text-rotation': 'autorotate',
      },
    },
    {
      selector: 'edge:selected',
      style: {
        'line-opacity': 1,
        'width': 2,
      },
    },
  ]
}
