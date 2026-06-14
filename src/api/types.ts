/**
 * Tipos del API de Rick & Morty (capa GraphQL).
 * Schema: https://rickandmortyapi.com/graphql
 *
 * Nota: en GraphQL el escalar `ID` se serializa como string, por eso todos
 * los ids del front son `string`.
 */

export type Status = 'Alive' | 'Dead' | 'unknown'
export type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown'

export interface ApiInfo {
  count: number
  pages: number
  next: number | null
  prev: number | null
}

export interface Paginated<T> {
  info: ApiInfo
  results: T[]
}

/** Datos mínimos para tarjetas, favoritos, residentes y reparto. */
export interface CharacterSummary {
  id: string
  name: string
  image: string
  status: Status
  species: string
  gender: Gender
  location: { name: string }
}

/** Episodio reducido (para "primera aparición"). */
export interface EpisodeRef {
  id: string
  name?: string
  episode?: string
  air_date?: string
}

export interface Character extends CharacterSummary {
  type: string
  created: string
  origin: { name: string; dimension: string | null }
  location: { name: string; dimension: string | null }
  episode: EpisodeRef[]
}

export interface Location {
  id: string
  name: string
  type: string
  dimension: string
  residents: CharacterSummary[]
  created: string
}

export interface Episode {
  id: string
  name: string
  air_date: string
  episode: string
  characters: CharacterSummary[]
  created: string
}

/* Filtros soportados por el API */
export interface CharacterFilters {
  page?: number
  name?: string
  status?: Status | ''
  species?: string
  gender?: Gender | ''
}

export interface LocationFilters {
  page?: number
  name?: string
  type?: string
  dimension?: string
}

export interface EpisodeFilters {
  page?: number
  name?: string
  episode?: string
}
