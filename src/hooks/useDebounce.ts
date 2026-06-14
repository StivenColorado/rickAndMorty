import { useEffect, useState } from 'react'

/** Devuelve `value` tras `delay` ms sin cambios. Útil para búsquedas en vivo. */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}
