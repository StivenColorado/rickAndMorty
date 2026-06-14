import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-6xl">🛸</p>
      <h1 className="text-3xl font-extrabold">Dimensión no encontrada</h1>
      <p className="text-slate-400">Esta página existe en otra línea temporal.</p>
      <Link
        to="/"
        className="rounded-lg bg-portal px-5 py-2.5 font-semibold text-space transition hover:brightness-110"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
