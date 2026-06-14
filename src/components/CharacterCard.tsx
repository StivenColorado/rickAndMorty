import type { CharacterSummary } from '../api/types'
import { CompareButton } from './CompareButton'
import { FavoriteButton } from './FavoriteButton'
import { StatusBadge } from './StatusBadge'

interface Props {
  character: CharacterSummary
  onClick?: (character: CharacterSummary) => void
}

export function CharacterCard({ character, onClick }: Props) {
  return (
    <article className="group relative animate-fade-in">
      {/* Acciones flotantes (no abren el modal) */}
      <div className="absolute right-2 top-2 z-10 flex gap-1.5 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
        <CompareButton character={character} />
        <FavoriteButton character={character} />
      </div>

      <button
        type="button"
        onClick={() => onClick?.(character)}
        className="flex w-full flex-col overflow-hidden rounded-2xl bg-card text-left shadow-lg ring-1 ring-white/5 transition duration-200 hover:-translate-y-1 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-portal"
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <span className="absolute left-2 top-2">
            <StatusBadge status={character.status} />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1 p-3">
          <h3 className="line-clamp-1 font-bold text-slate-50" title={character.name}>
            {character.name}
          </h3>
          <p className="text-xs text-slate-400">
            {character.species}
            {character.gender !== 'unknown' ? ` · ${character.gender}` : ''}
          </p>
          <p className="mt-auto line-clamp-1 text-xs text-slate-500">
            <span className="text-portal">📍</span> {character.location.name}
          </p>
        </div>
      </button>
    </article>
  )
}
