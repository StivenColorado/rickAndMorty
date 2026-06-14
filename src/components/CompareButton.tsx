import type { CharacterSummary } from '../api/types'
import { useCompare } from '../store/compare'

interface Props {
  character: CharacterSummary
}

/** Botón para añadir/quitar un personaje del comparador (máx. 3). */
export function CompareButton({ character }: Props) {
  const selected = useCompare((s) => Boolean(s.items[character.id]))
  const full = useCompare((s) => Object.keys(s.items).length >= 3)
  const toggle = useCompare((s) => s.toggle)

  const disabled = !selected && full

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={selected ? 'Quitar del comparador' : 'Añadir al comparador'}
      aria-pressed={selected}
      title={disabled ? 'Máximo 3 personajes' : 'Comparar'}
      onClick={(e) => {
        e.stopPropagation()
        toggle(character)
      }}
      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm backdrop-blur transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30 ${
        selected ? 'bg-rick text-space' : 'bg-black/50 text-white'
      }`}
    >
      ⚖
    </button>
  )
}
