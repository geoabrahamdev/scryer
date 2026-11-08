import type { ReactNode } from 'react'

/**
 * Minimal markdown renderer — paragraphs, headings (## / ###), and **bold**.
 * Intentionally dependency-free; the real document viewer in v2 will swap
 * in Shiki for syntax-highlighted code blocks when a scenario needs them.
 */
export function Markdown({ text }: { text: string }) {
  const blocks = text
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)

  return (
    <div
      className="space-y-4 text-sm leading-relaxed"
      style={{ color: 'var(--text-primary)' }}
    >
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  )
}

function renderBlock(block: string, i: number): ReactNode {
  if (block.startsWith('### ')) {
    return (
      <h4 key={i} className="text-sm font-semibold">
        {renderInline(block.slice(4))}
      </h4>
    )
  }
  if (block.startsWith('## ')) {
    return (
      <h3 key={i} className="text-base font-semibold">
        {renderInline(block.slice(3))}
      </h3>
    )
  }
  if (block.startsWith('# ')) {
    return (
      <h2 key={i} className="text-lg font-semibold">
        {renderInline(block.slice(2))}
      </h2>
    )
  }
  return <p key={i}>{renderInline(block)}</p>
}

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? (
      <strong
        key={i}
        style={{ color: 'var(--accent-1)', fontWeight: 600 }}
      >
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  )
}
