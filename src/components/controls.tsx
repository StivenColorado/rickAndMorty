import type { SelectHTMLAttributes } from 'react'

const fieldBase =
  'w-full rounded-xl bg-card px-4 py-2.5 text-sm text-slate-100 ring-1 ring-white/10 transition focus:outline-none focus:ring-2 focus:ring-portal'

export function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${fieldBase} pl-9`}
        autoComplete="off"
      />
    </div>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
  placeholder?: string
}

export function Select({ options, placeholder, ...props }: SelectProps) {
  return (
    <select {...props} className={fieldBase}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
