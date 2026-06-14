export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 py-8 text-center text-sm text-slate-500">
      <p>
        Datos por{' '}
        <a
          href="https://rickandmortyapi.com"
          target="_blank"
          rel="noreferrer"
          className="text-portal hover:underline"
        >
          The Rick and Morty API
        </a>
      </p>
    </footer>
  )
}
