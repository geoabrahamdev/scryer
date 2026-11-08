import { useEffect, useRef } from 'react'
import cytoscape from 'cytoscape'
import type { Core, LayoutOptions } from 'cytoscape'
import fcose from 'cytoscape-fcose'
import { useAppStore } from '../store/app-store'
import { getScenario } from '../scenarios/registry'
import { buildCytoscapeStyle } from '../graph/style'
import { toCytoscapeElements } from '../graph/cytoscape-config'

/**
 * Register fcose exactly once per module load. Cytoscape allows duplicate
 * registration without throwing but this keeps the intent explicit.
 */
let fcoseRegistered = false
function ensureFcose() {
  if (fcoseRegistered) return
  cytoscape.use(fcose)
  fcoseRegistered = true
}

/**
 * Centre panel. Phase 1 mounts Cytoscape with the active scenario's
 * elements and styles them from design tokens. Phase 2 hands control
 * to the replay engine (staggered add-entity / add-relation frames).
 */
export function GraphCanvas() {
  const scenarioId = useAppStore((s) => s.scenarioId)
  const selectNode = useAppStore((s) => s.selectNode)
  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<Core | null>(null)

  useEffect(() => {
    ensureFcose()
    const container = containerRef.current
    if (!container) return
    const scenario = getScenario(scenarioId)
    if (!scenario) return

    const cy = cytoscape({
      container,
      elements: toCytoscapeElements(scenario),
      style: buildCytoscapeStyle(),
      layout: {
        name: 'fcose',
        animate: true,
        animationDuration: 600,
        nodeRepulsion: 6000,
        idealEdgeLength: 90,
        padding: 40,
      } as LayoutOptions,
      wheelSensitivity: 0.2,
      minZoom: 0.4,
      maxZoom: 2.5,
    })

    cy.on('tap', 'node', (evt) => selectNode(evt.target.id()))
    cy.on('tap', (evt) => {
      if (evt.target === cy) selectNode(null)
    })

    cyRef.current = cy
    return () => {
      cy.destroy()
      cyRef.current = null
    }
  }, [scenarioId, selectNode])

  return (
    <div
      ref={containerRef}
      className="h-full w-full canvas-grid"
      role="application"
      aria-label="Knowledge graph canvas"
    />
  )
}
