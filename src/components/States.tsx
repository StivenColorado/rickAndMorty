/** Estados compartidos: cargando (spinner propio de Rick), error, vacío y skeletons. */

export function Spinner({ label = 'Cargando…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400">
      {/* Spinner propio del proyecto: el gif de Rick en portal */}
      <img
        src="/img/loading_rick.gif"
        alt=""
        className="h-24 w-24 rounded-full object-cover ring-2 ring-portal/40"
      />
      <span className="animate-pulse text-sm">{label}</span>
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <p className="text-2xl">🛸</p>
      <p className="text-slate-300">{message ?? 'Algo salió mal al contactar la nave nodriza.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-portal px-4 py-2 text-sm font-semibold text-space transition hover:brightness-110"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}

export function EmptyState({ message = 'No hay resultados.' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20 text-center text-slate-400">
      <p className="text-2xl">🔍</p>
      <p>{message}</p>
    </div>
  )
}

/* ── Skeletons ─────────────────────────────────────────────────── */

export function CharacterCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-white/5">
      <div className="skeleton aspect-square w-full" />
      <div className="flex flex-col gap-2 p-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
      </div>
    </div>
  )
}

export function CharacterGridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function PanelGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-2xl bg-card p-5 ring-1 ring-white/5">
          <div className="skeleton h-5 w-2/3 rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
          <div className="skeleton h-4 w-1/3 rounded" />
        </div>
      ))}
    </div>
  )
}
