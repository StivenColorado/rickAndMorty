import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { isNotFound } from '../api/client'
import type { Gender, Status } from '../api/types'
import { useCharacters } from '../hooks/queries'
import { useDebounce } from '../hooks/useDebounce'
import { CharacterCard } from '../components/CharacterCard'
import { CharacterModal } from '../components/CharacterModal'
import { PageHeader } from '../components/PageHeader'
import { Pagination } from '../components/Pagination'
import { SearchInput, Select } from '../components/controls'
import { CharacterGridSkeleton, EmptyState, ErrorState } from '../components/States'

const STATUS_OPTIONS = [
  { value: 'Alive', label: 'Vivo' },
  { value: 'Dead', label: 'Muerto' },
  { value: 'unknown', label: 'Desconocido' },
]
const GENDER_OPTIONS = [
  { value: 'Female', label: 'Femenino' },
  { value: 'Male', label: 'Masculino' },
  { value: 'Genderless', label: 'Sin género' },
  { value: 'unknown', label: 'Desconocido' },
]

export function CharactersPage() {
  const [params, setParams] = useSearchParams()

  const page = Number(params.get('page') || 1)
  const status = (params.get('status') || '') as Status | ''
  const gender = (params.get('gender') || '') as Gender | ''
  const species = params.get('species') || ''

  // Búsqueda local con debounce para no golpear el API en cada tecla.
  const [search, setSearch] = useState(params.get('name') || '')
  const debouncedName = useDebounce(search, 400)

  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Sincroniza el término "debounced" hacia la URL (reseteando a página 1).
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

  const updateParam = (key: string, value: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) next.set(key, value)
      else next.delete(key)
      next.delete('page')
      return next
    })
  }

  const goToPage = (p: number) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(p))
      return next
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { data, isLoading, isError, error, refetch, isPlaceholderData } = useCharacters({
    page,
    name: debouncedName,
    status,
    gender,
    species,
  })

  // El API devuelve 404 cuando no hay coincidencias: lo tratamos como "vacío".
  const isNoResults = isError && isNotFound(error)

  return (
    <>
      <PageHeader title="Personajes" subtitle="Explora el multiverso de Rick & Morty">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <SearchInput value={search} onChange={setSearch} placeholder="Buscar por nombre…" />
          </div>
          <Select
            value={status}
            onChange={(e) => updateParam('status', e.target.value)}
            options={STATUS_OPTIONS}
            placeholder="Estado: todos"
          />
          <Select
            value={gender}
            onChange={(e) => updateParam('gender', e.target.value)}
            options={GENDER_OPTIONS}
            placeholder="Género: todos"
          />
          <SearchInput
            value={species}
            onChange={(v) => updateParam('species', v)}
            placeholder="Especie (ej: Human)…"
          />
        </div>
      </PageHeader>

      {isLoading ? (
        <CharacterGridSkeleton />
      ) : isNoResults ? (
        <EmptyState message="Ningún personaje coincide con esos filtros." />
      ) : isError ? (
        <ErrorState message="No se pudieron cargar los personajes." onRetry={() => refetch()} />
      ) : data ? (
        <>
          <p className="mb-4 text-sm text-slate-500">{data.info.count} personajes encontrados</p>
          <div
            className={`grid grid-cols-2 gap-4 transition-opacity sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${
              isPlaceholderData ? 'opacity-60' : ''
            }`}
          >
            {data.results.map((c) => (
              <CharacterCard key={c.id} character={c} onClick={(ch) => setSelectedId(ch.id)} />
            ))}
          </div>
          <Pagination page={page} totalPages={data.info.pages} onChange={goToPage} />
        </>
      ) : null}

      <CharacterModal characterId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  )
}
