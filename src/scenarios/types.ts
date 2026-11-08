/**
 * Scenario schema shared by replay engine, graph layer, and UI.
 *
 * Phase 1 uses only `entities`, `relations`, `document`, `title`,
 * `suggestions`. Phase 2 adds the replay `frames` field defined in
 * docs/scryer-implementation-plan.md § 2 — intentionally omitted
 * here until we need it.
 */

export type EntityType = 'primary' | 'secondary' | 'tertiary'

export interface Entity {
  readonly id: string
  readonly label: string
  readonly type: EntityType
  readonly props: Readonly<Record<string, string>>
}

export interface Relation {
  readonly id: string
  readonly from: string
  readonly to: string
  readonly label: string
}

export interface Scenario {
  readonly id: string
  readonly title: string
  readonly document: string
  readonly entities: readonly Entity[]
  readonly relations: readonly Relation[]
  readonly suggestions: readonly string[]
}
