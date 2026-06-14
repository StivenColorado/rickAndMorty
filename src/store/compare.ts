import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CharacterSummary } from '../api/types'

const MAX = 3

interface CompareState {
  items: Record<string, CharacterSummary>
  toggle: (character: CharacterSummary) => void
  remove: (id: string) => void
  isSelected: (id: string) => boolean
  isFull: () => boolean
  clear: () => void
}

/** Hasta 3 personajes para comparar lado a lado. Persistido entre sesiones. */
export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      items: {},
      toggle: (character) =>
        set((state) => {
          const next = { ...state.items }
          if (next[character.id]) {
            delete next[character.id]
          } else {
            if (Object.keys(next).length >= MAX) return state // tope alcanzado
            next[character.id] = character
          }
          return { items: next }
        }),
      remove: (id) =>
        set((state) => {
          const next = { ...state.items }
          delete next[id]
          return { items: next }
        }),
      isSelected: (id) => Boolean(get().items[id]),
      isFull: () => Object.keys(get().items).length >= MAX,
      clear: () => set({ items: {} }),
    }),
    { name: 'rm-compare' },
  ),
)

export const COMPARE_MAX = MAX
