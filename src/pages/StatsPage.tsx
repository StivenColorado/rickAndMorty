import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { getAllCharacterFacets } from '../api/client'
import { PageHeader } from '../components/PageHeader'
import { ErrorState, Spinner } from '../components/States'

const STATUS_COLORS: Record<string, string> = {
  Alive: '#55cc44',
  Dead: '#d63d2e',
  unknown: '#9e9e9e',
}
const GENDER_COLORS = ['#00b5cc', '#97ce4c', '#c084fc', '#9e9e9e']

function countBy<T>(items: T[], key: (t: T) => string) {
  const map = new Map<string, number>()
  for (const it of items) {
    const k = key(it) || 'unknown'
    map.set(k, (map.get(k) ?? 0) + 1)
  }
  return map
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in rounded-2xl bg-card p-5 ring-1 ring-white/5">
      <h3 className="mb-4 font-bold text-slate-100">{title}</h3>
      {children}
    </div>
  )
}

export function StatsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['character-facets'],
    queryFn: getAllCharacterFacets,
    staleTime: 1000 * 60 * 30,
  })

  const stats = useMemo(() => {
    if (!data) return null
    const status = [...countBy(data, (c) => c.status)].map(([name, value]) => ({ name, value }))
    const gender = [...countBy(data, (c) => c.gender)].map(([name, value]) => ({ name, value }))
    const species = [...countBy(data, (c) => c.species)]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
    return { total: data.length, status, gender, species }
  }, [data])

  return (
    <>
      <PageHeader
        title="Estadísticas"
        subtitle="Distribución del multiverso, agregada en vivo vía GraphQL"
      />

      {isLoading ? (
        <Spinner label="Agregando el multiverso…" />
      ) : isError || !stats ? (
        <ErrorState message="No se pudieron calcular las estadísticas." onRetry={() => refetch()} />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-portal/20 to-rick/20 p-5 ring-1 ring-white/5 lg:col-span-2">
            <span className="text-slate-300">Personajes analizados</span>
            <span className="font-display text-3xl font-extrabold text-portal">{stats.total}</span>
          </div>

          <Panel title="Estado">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={stats.status}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {stats.status.map((s) => (
                    <Cell key={s.name} fill={STATUS_COLORS[s.name] ?? '#9e9e9e'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Género">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={stats.gender}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {stats.gender.map((g, i) => (
                    <Cell key={g.name} fill={GENDER_COLORS[i % GENDER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Top 8 especies">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={stats.species} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  width={110}
                />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="value" fill="#97ce4c" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>
        </div>
      )}
    </>
  )
}

const tooltipStyle = {
  background: '#151a2e',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  color: '#e2e8f0',
}
