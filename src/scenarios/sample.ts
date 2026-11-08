import type { Scenario } from './types'

/**
 * Phase 1 sample scenario — a consumer complaint about a delayed refund.
 *
 * Shape matches the Phase 2 target (6+ entities with a mix of types),
 * but behavior is static: no replay frames, no query matching.
 *
 * Consumer complaints are safe content per the "no Volvo IP" rule in
 * docs/scryer-implementation-plan.md § 0.
 */
export const sampleScenario: Scenario = {
  id: 'sample',
  title: 'Sample · consumer complaint',
  document: `## Delayed refund — order #A-8821

I ordered a pair of noise-cancelling headphones from **Nebula Audio**
on 14 September 2026. The package arrived damaged, so I returned it
the same day using the return label.

Nebula Audio's support agent, **Priya K.**, confirmed the return on
16 September and said the refund of **₹8,990** would be issued within
7 business days.

It has now been 23 business days and I have not received the refund.
I have emailed support three times with no response.

Please help me resolve this.

— Arjun R.`,
  entities: [
    {
      id: 'e-arjun',
      label: 'Arjun R.',
      type: 'primary',
      props: { role: 'Complainant' },
    },
    {
      id: 'e-nebula',
      label: 'Nebula Audio',
      type: 'secondary',
      props: { role: 'Retailer' },
    },
    {
      id: 'e-priya',
      label: 'Priya K.',
      type: 'primary',
      props: { role: 'Support agent' },
    },
    {
      id: 'e-refund',
      label: 'Refund ₹8,990',
      type: 'tertiary',
      props: { amount: '₹8,990', status: 'Outstanding' },
    },
  ],
  relations: [
    { id: 'r-1', from: 'e-arjun',  to: 'e-nebula', label: 'filed against' },
    { id: 'r-2', from: 'e-priya',  to: 'e-nebula', label: 'works at' },
    { id: 'r-3', from: 'e-nebula', to: 'e-refund', label: 'owes' },
    { id: 'r-4', from: 'e-priya',  to: 'e-refund', label: 'confirmed' },
  ],
  suggestions: [
    'Who owes the refund?',
    'Who confirmed the return?',
    'List everyone involved.',
  ],
}
