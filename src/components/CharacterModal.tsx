import { useCharacter } from '../hooks/queries'
import { FavoriteButton } from './FavoriteButton'
import { Modal } from './Modal'
import { StatusBadge } from './StatusBadge'
import { Spinner } from './States'

interface Props {
  characterId: string | null
  onClose: () => void
}

export function CharacterModal({ characterId, onClose }: Props) {
  const { data: character, isLoading } = useCharacter(characterId)
  const firstSeen = character?.episode?.[0]

  return (
    <Modal open={characterId != null} onClose={onClose}>
      {isLoading || !character ? (
        <Spinner />
      ) : (
        <div className="flex flex-col sm:flex-row">
          {/* Imagen cuadrada — la API entrega 300×300, así no se recorta. */}
          <div className="relative shrink-0 sm:w-56">
            <img
              src={character.image}
              alt={character.name}
              className="aspect-square w-full object-cover sm:h-full"
            />
            <span className="absolute left-3 top-3">
              <FavoriteButton character={character} />
            </span>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-lg text-white transition hover:bg-dead sm:hidden"
            >
              ✕
            </button>
          </div>

          <div className="relative flex-1 p-5">
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 hidden h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-dead sm:flex"
            >
              ✕
            </button>

            <h2 className="pr-10 text-2xl font-extrabold text-white">{character.name}</h2>
            <div className="mt-2">
              <StatusBadge status={character.status} species={character.species} />
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <Field label="Género" value={character.gender} />
              <Field label="Tipo" value={character.type || '—'} />
              <Field label="Origen" value={character.origin.name} />
              <Field label="Ubicación" value={character.location.name} />
            </dl>

            <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-sm text-slate-300">
              <p>
                <span className="font-semibold text-slate-200">Primera aparición:</span>{' '}
                {firstSeen ? `${firstSeen.episode} — ${firstSeen.name}` : '—'}
              </p>
              <p>
                <span className="font-semibold text-slate-200">Episodios:</span>{' '}
                {character.episode.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="text-slate-100">{value}</dd>
    </div>
  )
}
