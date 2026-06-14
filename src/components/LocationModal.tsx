import { useLocation } from '../hooks/queries'
import { Modal } from './Modal'
import { ResidentGrid } from './ResidentGrid'
import { Spinner } from './States'

interface Props {
  locationId: string | null
  onClose: () => void
  onSelectCharacter: (id: string) => void
}

export function LocationModal({ locationId, onClose, onSelectCharacter }: Props) {
  const { data: location, isLoading } = useLocation(locationId)

  return (
    <Modal open={locationId != null} onClose={onClose}>
      {isLoading || !location ? (
        <Spinner label="Cargando locación…" />
      ) : (
        <div className="p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-white">{location.name}</h2>
              <p className="text-sm text-slate-400">
                {location.type || '—'} · {location.dimension || 'Dimensión desconocida'}
              </p>
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
            Residentes ({location.residents.length})
          </h3>
          <ResidentGrid
            characters={location.residents}
            onSelect={onSelectCharacter}
            emptyMessage="Esta locación no tiene residentes registrados."
          />
        </div>
      )}
    </Modal>
  )
}
