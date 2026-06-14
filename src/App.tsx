import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Spinner } from './components/States'
import { CharactersPage } from './pages/CharactersPage'
import { LocationsPage } from './pages/LocationsPage'
import { EpisodesPage } from './pages/EpisodesPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { ComparePage } from './pages/ComparePage'
import { NotFoundPage } from './pages/NotFoundPage'

// El dashboard arrastra Recharts (pesado): lo cargamos bajo demanda.
const StatsPage = lazy(() =>
  import('./pages/StatsPage').then((m) => ({ default: m.StatsPage })),
)

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CharactersPage />} />
        <Route path="locations" element={<LocationsPage />} />
        <Route path="episodes" element={<EpisodesPage />} />
        <Route
          path="stats"
          element={
            <Suspense fallback={<Spinner label="Cargando dashboard…" />}>
              <StatsPage />
            </Suspense>
          }
        />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="compare" element={<ComparePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
