import type { CharacterSummary } from '../api/types'
import { useFavorites } from '../store/favorites'

interface Props {
  character: CharacterSummary
  className?: string
}

/** Corazón para marcar/desmarcar favoritos. Detiene la propagación para no abrir el modal. */
export function FavoriteButton({ character, className = '' }: Props) {
  const isFavorite = useFavorites((s) => Boolean(s.favorites[character.id]))
  const toggle = useFavorites((s) => s.toggle)

  return (
    <button
      type="button"
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      aria-pressed={isFavorite}
      onClick={(e) => {
        e.stopPropagation()
        toggle(character)
      }}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-base backdrop-blur transition hover:scale-110 ${className}`}
    >
      <span className={isFavorite ? 'grayscale-0' : 'opacity-70 grayscale'}>
        {isFavorite ? '❤️' : '🤍'}
      </span>
    </button>
  )
}
