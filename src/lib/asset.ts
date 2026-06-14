/**
 * Resuelve una ruta de la carpeta `public/` respetando el `base` de Vite.
 * En dev base es "/", en el build de GitHub Pages es "/rickAndMorty/".
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
