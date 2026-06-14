import type { ReactNode } from 'react'

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children?: ReactNode
}) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        <span className="bg-gradient-to-r from-portal to-rick bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      {subtitle && <p className="mt-1 text-slate-400">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
