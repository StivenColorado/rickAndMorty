import type { Status } from '../api/types'

const styles: Record<Status, string> = {
  Alive: 'bg-alive/15 text-alive',
  Dead: 'bg-dead/15 text-dead',
  unknown: 'bg-unknown/15 text-unknown',
}

const dot: Record<Status, string> = {
  Alive: 'bg-alive',
  Dead: 'bg-dead',
  unknown: 'bg-unknown',
}

export function StatusBadge({ status, species }: { status: Status; species?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot[status]}`} />
      {status}
      {species ? <span className="font-normal opacity-80">· {species}</span> : null}
    </span>
  )
}
