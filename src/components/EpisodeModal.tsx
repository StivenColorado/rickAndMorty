import { useEpisode } from '../hooks/queries'
import { Modal } from './Modal'
import { ResidentGrid } from './ResidentGrid'
import { Spinner } from './States'

interface Props {
  episodeId: string | null
  onClose: () => void
  onSelectCharacter: (id: string) => void
}

export function EpisodeModal({ episodeId, onClose, onSelectCharacter }: Props) {
  const { data: episode, isLoading } = useEpisode(episodeId)

  return (
    <Modal open={episodeId != null} onClose={onClose}>
      {isLoading || !episode ? (
        <Spinner label="Cargando episodio…" />
      ) : (
        <div className="p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-rick/20 px-2.5 py-0.5 text-xs font-semibold text-rick">
                {episode.episode}
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-white">{episode.name}</h2>
              <p className="text-sm text-slate-400">Emitido: {episode.air_date}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-dead"
            >
              ✕
            </button>
          </div>

          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Reparto ({episode.characters.length})
          </h3>
          <ResidentGrid
            characters={episode.characters}
            onSelect={onSelectCharacter}
            emptyMessage="Sin reparto registrado."
          />
        </div>
      )}
    </Modal>
  )
}
