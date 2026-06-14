import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../store/favorites'
import { CharacterCard } from '../components/CharacterCard'
import { CharacterModal } from '../components/CharacterModal'
import { PageHeader } from '../components/PageHeader'

export function FavoritesPage() {
  const favRecord = useFavorites((s) => s.favorites)
  const clear = useFavorites((s) => s.clear)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const favorites = Object.values(favRecord)

  return (
    <>
      <PageHeader title="Favoritos" subtitle={`${favorites.length} personaje(s) guardado(s)`}>
        {favorites.length > 0 && (
          <button
            onClick={clear}
            className="rounded-lg bg-card px-4 py-2 text-sm font-semibold text-slate-300 ring-1 ring-white/10 transition hover:bg-dead hover:text-white"
          >
            Vaciar favoritos
          </button>
        )}
      </PageHeader>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-slate-400">
          <p className="text-4xl">💔</p>
          <p>Aún no tienes favoritos.</p>
          <Link
            to="/"
            className="rounded-lg bg-portal px-4 py-2 text-sm font-semibold text-space transition hover:brightness-110"
          >
            Explorar personajes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((c) => (
            <CharacterCard key={c.id} character={c} onClick={(ch) => setSelectedId(ch.id)} />
          ))}
        </div>
      )}

      <CharacterModal characterId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  )
}
