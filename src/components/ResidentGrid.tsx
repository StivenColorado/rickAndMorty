import type { CharacterSummary } from '../api/types'
import { StatusBadge } from './StatusBadge'

interface Props {
  characters: CharacterSummary[]
  onSelect: (id: string) => void
  emptyMessage?: string
}

/** Grid compacto de personajes (residentes de una locación o reparto de un episodio). */
export function ResidentGrid({ characters, onSelect, emptyMessage }: Props) {
  if (characters.length === 0) {
    return <p className="text-sm text-slate-500">{emptyMessage ?? 'Sin personajes.'}</p>
  }
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {characters.map((c) => (
        <li key={c.id}>
          <button
            onClick={() => onSelect(c.id)}
            className="flex w-full flex-col items-center gap-1 rounded-xl bg-card p-2 text-center transition hover:bg-white/10"
          >
            <img
              src={c.image}
              alt={c.name}
              loading="lazy"
              className="h-16 w-16 rounded-full object-cover"
            />
            <span className="line-clamp-1 text-xs font-semibold">{c.name}</span>
            <StatusBadge status={c.status} />
          </button>
        </li>
      ))}
    </ul>
  )
}
