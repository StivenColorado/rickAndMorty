import type { Status } from '../api/types'

// Fondo oscuro semitransparente para que el texto sea legible sobre cualquier imagen.
const text: Record<Status, string> = {
  Alive: 'text-alive',
  Dead: 'text-dead',
  unknown: 'text-slate-200',
}

const dot: Record<Status, string> = {
  Alive: 'bg-alive',
  Dead: 'bg-dead',
  unknown: 'bg-slate-300',
}

export function StatusBadge({ status, species }: { status: Status; species?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm ${text[status]}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot[status]}`} />
      {status}
      {species ? <span className="font-normal opacity-80">· {species}</span> : null}
    </span>
  )
}
