import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { isNotFound } from '../api/client'
import { useEpisodes } from '../hooks/queries'
import { useDebounce } from '../hooks/useDebounce'
import { CharacterModal } from '../components/CharacterModal'
import { EpisodeModal } from '../components/EpisodeModal'
import { PageHeader } from '../components/PageHeader'
import { Pagination } from '../components/Pagination'
import { SearchInput } from '../components/controls'
import { EmptyState, ErrorState, PanelGridSkeleton } from '../components/States'

export function EpisodesPage() {
  const [params, setParams] = useSearchParams()
  const page = Number(params.get('page') || 1)

  const [search, setSearch] = useState(params.get('name') || '')
  const debouncedName = useDebounce(search, 400)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [characterId, setCharacterId] = useState<string | null>(null)

  useEffect(() => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (debouncedName) next.set('name', debouncedName)
        else next.delete('name')
        next.delete('page')
        return next
      },
      { replace: true },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName])

  const goToPage = (p: number) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(p))
      return next
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { data, isLoading, isError, error, refetch, isPlaceholderData } = useEpisodes({
    page,
    name: debouncedName,
  })
  const isNoResults = isError && isNotFound(error)

  return (
    <>
      <PageHeader title="Episodios" subtitle="Las 5 temporadas, episodio por episodio">
        <div className="max-w-md">
          <SearchInput value={search} onChange={setSearch} placeholder="Buscar episodio…" />
        </div>
      </PageHeader>

      {isLoading ? (
        <PanelGridSkeleton />
      ) : isNoResults ? (
        <EmptyState message="Ningún episodio coincide con la búsqueda." />
      ) : isError ? (
        <ErrorState message="No se pudieron cargar los episodios." onRetry={() => refetch()} />
      ) : data ? (
        <>
          <div
            className={`grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${
              isPlaceholderData ? 'opacity-60' : ''
            }`}
          >
            {data.results.map((ep) => (
              <button
                key={ep.id}
                onClick={() => setSelectedId(ep.id)}
                className="group flex animate-fade-in flex-col gap-1 rounded-2xl bg-card p-5 text-left ring-1 ring-white/5 transition hover:-translate-y-1 hover:shadow-glow"
              >
                <span className="w-fit rounded-full bg-rick/20 px-2.5 py-0.5 text-xs font-semibold text-rick">
                  {ep.episode}
                </span>
                <h3 className="mt-1 text-lg font-bold text-slate-50">{ep.name}</h3>
                <p className="text-sm text-slate-400">📅 {ep.air_date}</p>
                <p className="mt-auto pt-2 text-xs text-slate-500">
                  {ep.characters.length} personajes →
                </p>
              </button>
            ))}
          </div>
          <Pagination page={page} totalPages={data.info.pages} onChange={goToPage} />
        </>
      ) : null}

      <EpisodeModal
        episodeId={selectedId}
        onClose={() => setSelectedId(null)}
        onSelectCharacter={(id) => {
          setSelectedId(null)
          setCharacterId(id)
        }}
      />
      <CharacterModal characterId={characterId} onClose={() => setCharacterId(null)} />
    </>
  )
}
