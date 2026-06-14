import { useQueries } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getCharacter } from '../api/client'
import type { Character } from '../api/types'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from './../components/StatusBadge'
import { useCompare } from '../store/compare'

interface Row {
  label: string
  get: (c: Character) => string
}

const ROWS: Row[] = [
  { label: 'Estado', get: (c) => c.status },
  { label: 'Especie', get: (c) => c.species },
  { label: 'Género', get: (c) => c.gender },
  { label: 'Tipo', get: (c) => c.type || '—' },
  { label: 'Origen', get: (c) => c.origin.name },
  { label: 'Ubicación', get: (c) => c.location.name },
  { label: 'Nº de episodios', get: (c) => String(c.episode.length) },
  {
    label: 'Primera aparición',
    get: (c) => (c.episode[0] ? `${c.episode[0].episode}` : '—'),
  },
]

export function ComparePage() {
  // Seleccionamos el record estable y derivamos el array aquí (evita bucle en Zustand v5).
  const itemsRecord = useCompare((s) => s.items)
  const remove = useCompare((s) => s.remove)
  const clear = useCompare((s) => s.clear)
  const items = Object.values(itemsRecord)

  const results = useQueries({
    queries: items.map((it) => ({
      queryKey: ['character', it.id],
      queryFn: () => getCharacter(it.id),
      staleTime: 1000 * 60 * 5,
    })),
  })

  const characters = results.map((r) => r.data).filter(Boolean) as Character[]

  if (items.length === 0) {
    return (
      <>
        <PageHeader title="Comparador" />
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-slate-400">
          <p className="text-4xl">⚖️</p>
          <p>Selecciona hasta 3 personajes con el botón ⚖ en cada tarjeta.</p>
          <Link
            to="/"
            className="rounded-lg bg-portal px-4 py-2 text-sm font-semibold text-space transition hover:brightness-110"
          >
            Explorar personajes
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Comparador" subtitle={`Comparando ${items.length} de 3`}>
        <button
          onClick={clear}
          className="rounded-lg bg-card px-4 py-2 text-sm font-semibold text-slate-300 ring-1 ring-white/10 transition hover:bg-dead hover:text-white"
        >
          Limpiar comparación
        </button>
      </PageHeader>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[480px] border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="w-32" />
              {characters.map((c) => (
                <th key={c.id} className="align-bottom">
                  <div className="relative flex flex-col items-center gap-2 rounded-2xl bg-card p-3 ring-1 ring-white/5">
                    <button
                      onClick={() => remove(c.id)}
                      aria-label={`Quitar ${c.name}`}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm transition hover:bg-dead"
                    >
                      ✕
                    </button>
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-24 w-24 rounded-full object-cover ring-2 ring-portal/40"
                    />
                    <span className="text-center text-sm font-bold">{c.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th className="text-left align-top text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {row.label}
                </th>
                {characters.map((c) => (
                  <td key={c.id} className="rounded-xl bg-card/60 p-3 text-center text-sm">
                    {row.label === 'Estado' ? (
                      <StatusBadge status={c.status} />
                    ) : (
                      <span className="text-slate-100">{row.get(c)}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
