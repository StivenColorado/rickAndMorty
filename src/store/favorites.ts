import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CharacterSummary } from '../api/types'

interface FavoritesState {
  favorites: Record<string, CharacterSummary>
  toggle: (character: CharacterSummary) => void
  isFavorite: (id: string) => boolean
  clear: () => void
}

/** Favoritos persistidos en localStorage. Guardamos el resumen para render sin refetch. */
export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},
      toggle: (character) =>
        set((state) => {
          const next = { ...state.favorites }
          if (next[character.id]) delete next[character.id]
          else next[character.id] = character
          return { favorites: next }
        }),
      isFavorite: (id) => Boolean(get().favorites[id]),
      clear: () => set({ favorites: {} }),
    }),
    { name: 'rm-favorites' },
  ),
)
