/**
 * Minimal module declaration for cytoscape-fcose, which ships no
 * TypeScript types. The extension factory gets handed to cytoscape.use()
 * and is never called directly, so we only need to call the result an
 * extension (unknown shape).
 */
declare module 'cytoscape-fcose' {
  import type cytoscape from 'cytoscape'
  const extension: cytoscape.Ext
  export default extension
}
