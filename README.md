# Rick & Morty Explorer

Explorador del universo de **Rick & Morty** (personajes, locaciones, episodios y
estadísticas) construido sobre la
[API de Rick and Morty](https://rickandmortyapi.com/documentation) vía **GraphQL**.

Originalmente era un sitio en HTML/CSS/JS vanilla; fue **migrado a React + TypeScript**
con un stack moderno, responsive mejorado y funciones avanzadas.

## Stack

- **React 19** + **TypeScript** (modo estricto)
- **Vite** como bundler y dev server
- **GraphQL** (`graphql-request`) como capa de datos
- **TanStack Query** para caché, estados de carga/error y paginación sin parpadeos
- **Zustand** (con `persist`) para favoritos y comparador
- **Recharts** para el dashboard de estadísticas
- **React Router** para navegación SPA
- **Tailwind CSS v4** para el diseño y el responsive
- **pnpm** como gestor de paquetes

## Funciones

- 🔎 **Búsqueda en vivo** con _debounce_ en personajes, locaciones y episodios.
- 🎛️ **Filtros avanzados** por estado, género y especie (variables GraphQL).
- 🔗 **Estado en la URL**: filtros y página en _query params_ (compartible y navegable).
- 🪟 **Modales de detalle** — gracias a GraphQL, cada uno en **una sola petición** (sin N+1):
  - Personaje → origen, ubicación, **primera aparición** y nº de episodios.
  - Locación → **residentes** anidados.
  - Episodio → **reparto** anidado.
- ⭐ **Favoritos** persistentes en `localStorage` con vista dedicada y contador.
- ⚖️ **Comparador** de hasta 3 personajes lado a lado en tabla.
- 📊 **Dashboard de estadísticas** (estado/género/especies) agregando **todos** los
  personajes en pocas peticiones mediante **multi-alias GraphQL**, graficado con Recharts.
- 💀 **Skeleton loaders**, animaciones de entrada y **spinner propio** (gif de Rick).
- 📄 **Paginación inteligente** con elipsis, basada en `info.pages`.
- 📱 **Responsive** de móvil a escritorio, con menú hamburguesa y grids fluidos.
- ⚡ **Code-splitting**: el dashboard (Recharts) se carga bajo demanda con `lazy()`.

## Scripts

```bash
pnpm install     # instalar dependencias
pnpm dev         # servidor de desarrollo (http://localhost:5173)
pnpm build       # type-check + build de producción
pnpm preview     # previsualizar el build
```

> En desarrollo, las peticiones a `/graphql` se redirigen mediante el proxy de Vite
> hacia `https://rickandmortyapi.com` para evitar problemas de CORS. En producción se
> consume el endpoint directamente (soporta CORS).

## Estructura

```
src/
├── api/          # cliente GraphQL (graphql-request) + tipos
├── components/   # UI reutilizable (cards, modales, navbar, charts, skeletons…)
├── hooks/        # hooks de TanStack Query y utilidades (useDebounce)
├── store/        # stores de Zustand (favoritos, comparador)
├── pages/        # Personajes, Locaciones, Episodios, Estadísticas, Favoritos, Comparar, 404
├── App.tsx       # rutas (con lazy-loading del dashboard)
└── main.tsx      # bootstrap (QueryClient + Router)
```

El sitio original quedó archivado en [`legacy/`](./legacy) como referencia.

## Notas técnicas (de interés para portafolio)

- **Por qué GraphQL aquí importa:** en REST, abrir una locación obligaba a pedir cada
  residente por separado (N+1). Con GraphQL el detalle llega anidado en **un request**.
  El dashboard agrega los ~800 personajes con **una query multi-alias** en lugar de ~40
  peticiones REST.
- **Zustand v5:** los selectores derivados (`Object.values`) se calculan en el componente,
  no en el selector, para evitar el _re-render loop_ de `useSyncExternalStore`.
