import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFavorites } from '../store/favorites'
import { useCompare } from '../store/compare'
import { asset } from '../lib/asset'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const favCount = useFavorites((s) => Object.keys(s.favorites).length)
  const compareCount = useCompare((s) => Object.keys(s.items).length)

  const links = [
    { to: '/', label: 'Personajes', end: true },
    { to: '/locations', label: 'Locaciones' },
    { to: '/episodes', label: 'Episodios' },
    { to: '/stats', label: 'Estadísticas' },
    { to: '/compare', label: 'Comparar', badge: compareCount },
    { to: '/favorites', label: 'Favoritos', badge: favCount },
  ]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-portal text-space' : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`

  const Badge = ({ count }: { count: number }) =>
    count > 0 ? (
      <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rick px-1 text-xs font-bold text-space">
        {count}
      </span>
    ) : null

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-space/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="flex shrink-0 items-center gap-2 font-display text-lg font-extrabold">
          <img src={asset('img/morty_icon.png')} alt="" className="h-8 w-8" />
          <span className="bg-gradient-to-r from-portal to-rick bg-clip-text text-transparent">
            Rick&nbsp;&amp;&nbsp;Morty
          </span>
        </NavLink>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
              {l.badge !== undefined && <Badge count={l.badge} />}
            </NavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-xl lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-white/5 px-4 pb-3 pt-2 lg:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {l.label}
              {l.badge !== undefined && <Badge count={l.badge} />}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
