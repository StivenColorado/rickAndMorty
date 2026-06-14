import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  getCharacter,
  getCharacters,
  getEpisode,
  getEpisodes,
  getLocation,
  getLocations,
} from '../api/client'
import type {
  CharacterFilters,
  EpisodeFilters,
  LocationFilters,
} from '../api/types'

/* Reutilizamos páginas anteriores mientras carga la nueva → paginación sin parpadeos. */
const listOptions = { placeholderData: keepPreviousData, staleTime: 1000 * 60 * 5 }

export function useCharacters(filters: CharacterFilters) {
  return useQuery({
    queryKey: ['characters', filters],
    queryFn: () => getCharacters(filters),
    ...listOptions,
  })
}

export function useCharacter(id: string | null) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id as string),
    enabled: id != null,
  })
}

export function useLocations(filters: LocationFilters) {
  return useQuery({
    queryKey: ['locations', filters],
    queryFn: () => getLocations(filters),
    ...listOptions,
  })
}

/** Detalle de locación: incluye los residentes completos (una sola query GraphQL). */
export function useLocation(id: string | null) {
  return useQuery({
    queryKey: ['location', id],
    queryFn: () => getLocation(id as string),
    enabled: id != null,
  })
}

export function useEpisodes(filters: EpisodeFilters) {
  return useQuery({
    queryKey: ['episodes', filters],
    queryFn: () => getEpisodes(filters),
    ...listOptions,
  })
}

/** Detalle de episodio: incluye el reparto completo (una sola query GraphQL). */
export function useEpisode(id: string | null) {
  return useQuery({
    queryKey: ['episode', id],
    queryFn: () => getEpisode(id as string),
    enabled: id != null,
  })
}
