import { gql, GraphQLClient, ClientError } from 'graphql-request'
import type {
  Character,
  CharacterFilters,
  Episode,
  EpisodeFilters,
  Location,
  LocationFilters,
  Paginated,
} from './types'

// En dev usamos el proxy de Vite (mismo origen → sin CORS); en producción, el endpoint directo.
// graphql-request necesita una URL absoluta, así que componemos el mismo origen en dev.
const ENDPOINT = import.meta.env.DEV
  ? `${window.location.origin}/graphql`
  : 'https://rickandmortyapi.com/graphql'

const client = new GraphQLClient(ENDPOINT)

/** El API responde 404 (sin coincidencias) como error GraphQL; lo detectamos para tratarlo como "vacío". */
export function isNotFound(error: unknown): boolean {
  return (
    error instanceof ClientError &&
    (error.response.status === 404 ||
      (error.response.errors?.some((e) => /404|not found/i.test(e.message)) ?? false))
  )
}

/* Construye el objeto `filter` omitiendo valores vacíos. */
function cleanFilter<T extends Record<string, unknown>>(filter: T) {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(filter)) {
    if (v !== undefined && v !== null && v !== '') out[k] = v
  }
  return out
}

/* ── Fragmentos ────────────────────────────────────────────────── */
const CHARACTER_SUMMARY = gql`
  fragment CharacterSummary on Character {
    id
    name
    image
    status
    species
    gender
    location {
      name
    }
  }
`

/* ── Characters ────────────────────────────────────────────────── */
export async function getCharacters(filters: CharacterFilters = {}) {
  const { page, ...rest } = filters
  const query = gql`
    ${CHARACTER_SUMMARY}
    query Characters($page: Int, $filter: FilterCharacter) {
      characters(page: $page, filter: $filter) {
        info {
          count
          pages
          next
          prev
        }
        results {
          ...CharacterSummary
        }
      }
    }
  `
  const data = await client.request<{ characters: Paginated<Character> }>(query, {
    page: page ?? 1,
    filter: cleanFilter(rest),
  })
  return data.characters
}

export async function getCharacter(id: string) {
  const query = gql`
    query Character($id: ID!) {
      character(id: $id) {
        id
        name
        image
        status
        species
        gender
        type
        created
        origin {
          name
          dimension
        }
        location {
          name
          dimension
        }
        episode {
          id
          name
          episode
          air_date
        }
      }
    }
  `
  const data = await client.request<{ character: Character }>(query, { id })
  return data.character
}

/* ── Locations ─────────────────────────────────────────────────── */
export async function getLocations(filters: LocationFilters = {}) {
  const { page, ...rest } = filters
  const query = gql`
    query Locations($page: Int, $filter: FilterLocation) {
      locations(page: $page, filter: $filter) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          type
          dimension
          residents {
            id
          }
        }
      }
    }
  `
  const data = await client.request<{ locations: Paginated<Location> }>(query, {
    page: page ?? 1,
    filter: cleanFilter(rest),
  })
  return data.locations
}

export async function getLocation(id: string) {
  const query = gql`
    ${CHARACTER_SUMMARY}
    query Location($id: ID!) {
      location(id: $id) {
        id
        name
        type
        dimension
        created
        residents {
          ...CharacterSummary
        }
      }
    }
  `
  const data = await client.request<{ location: Location }>(query, { id })
  return data.location
}

/* ── Episodes ──────────────────────────────────────────────────── */
export async function getEpisodes(filters: EpisodeFilters = {}) {
  const { page, ...rest } = filters
  const query = gql`
    query Episodes($page: Int, $filter: FilterEpisode) {
      episodes(page: $page, filter: $filter) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          air_date
          episode
          characters {
            id
          }
        }
      }
    }
  `
  const data = await client.request<{ episodes: Paginated<Episode> }>(query, {
    page: page ?? 1,
    filter: cleanFilter(rest),
  })
  return data.episodes
}

/* ── Estadísticas ──────────────────────────────────────────────── */
export interface CharacterFacet {
  status: string
  species: string
  gender: string
}

/**
 * Obtiene las facetas (status/species/gender) de TODOS los personajes.
 * 1ª petición: descubre el total de páginas. 2ª petición: trae el resto
 * en una sola query usando alias por página — algo que con REST exigiría N requests.
 */
export async function getAllCharacterFacets(): Promise<CharacterFacet[]> {
  const firstQuery = gql`
    query FacetsFirst {
      characters(page: 1) {
        info {
          pages
        }
        results {
          status
          species
          gender
        }
      }
    }
  `
  const first = await client.request<{
    characters: { info: { pages: number }; results: CharacterFacet[] }
  }>(firstQuery)

  const pages = first.characters.info.pages
  const all = [...first.characters.results]
  if (pages <= 1) return all

  // Construye una única query con un alias por página restante.
  const aliases = Array.from(
    { length: pages - 1 },
    (_, i) =>
      `p${i + 2}: characters(page: ${i + 2}) { results { status species gender } }`,
  ).join('\n')
  const restQuery = `query FacetsRest {\n${aliases}\n}`

  const rest = await client.request<Record<string, { results: CharacterFacet[] }>>(restQuery)
  for (const value of Object.values(rest)) all.push(...value.results)
  return all
}

export async function getEpisode(id: string) {
  const query = gql`
    ${CHARACTER_SUMMARY}
    query Episode($id: ID!) {
      episode(id: $id) {
        id
        name
        air_date
        episode
        created
        characters {
          ...CharacterSummary
        }
      }
    }
  `
  const data = await client.request<{ episode: Episode }>(query, { id })
  return data.episode
}
