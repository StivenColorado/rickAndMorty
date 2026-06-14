interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

/** Genera una lista compacta de páginas con elipsis: 1 … 4 5 [6] 7 8 … 42 */
function buildRange(page: number, total: number): (number | '…')[] {
  const delta = 1
  const range: (number | '…')[] = []
  const left = Math.max(2, page - delta)
  const right = Math.min(total - 1, page + delta)

  range.push(1)
  if (left > 2) range.push('…')
  for (let i = left; i <= right; i++) range.push(i)
  if (right < total - 1) range.push('…')
  if (total > 1) range.push(total)

  return range
}

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null
  const pages = buildRange(page, totalPages)

  const btn =
    'min-w-9 h-9 px-2 rounded-lg text-sm font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed'

  return (
    <nav className="flex flex-wrap items-center justify-center gap-1.5 py-8" aria-label="Paginación">
      <button
        className={`${btn} bg-card text-slate-300 hover:bg-portal hover:text-space`}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="px-1 text-slate-500">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`${btn} ${
              p === page
                ? 'bg-portal text-space shadow-glow'
                : 'bg-card text-slate-300 hover:bg-portal/30'
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        className={`${btn} bg-card text-slate-300 hover:bg-portal hover:text-space`}
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Página siguiente"
      >
        ›
      </button>
    </nav>
  )
}
