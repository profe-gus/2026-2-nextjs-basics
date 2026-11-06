# DashStudents Frontend

Frontend en Next.js (App Router) para la API de estudiantes hecha con NestJS + Postgres. Se construye por etapas en Computación en Internet 3 (2026-2). Este README documenta únicamente lo que existe hoy en el repo.

## Inicio rápido

```bash
pnpm install
# crear .env.local con API_URL (ver "Variables de entorno")
pnpm dev                     # http://localhost:3000
```

La API de estudiantes (NestJS) debe estar corriendo, por ejemplo en `http://localhost:9000/api`, y poblada con `GET http://localhost:9000/api/seed`.

## Stack

| Pieza | Versión / decisión |
|-------|--------------------|
| Next.js | 16.4.2 (App Router, Turbopack) |
| React | 19.3.0 |
| Estilos | Tailwind CSS 4 |
| Lenguaje | TypeScript, alias de importación `@/*` |
| Gestor de paquetes | pnpm |

> `next.config.ts` tiene activados `cacheComponents` y `partialPrefetching`. No es el Next.js de los tutoriales antiguos: consulta `node_modules/next/dist/docs/` antes de fiarte de la memoria.

## Variables de entorno

| Variable | Alcance | Para qué sirve |
|----------|---------|----------------|
| `API_URL` | Solo servidor | URL base de la API NestJS, p. ej. `http://localhost:9000/api` |

## Rutas

| Ruta | Archivo | Contenido |
|------|---------|-----------|
| `/` | `app/page.tsx` | Página de inicio (vacía por ahora) |
| `/students` | `app/students/page.tsx` | Tabla de estudiantes con búsqueda y paginación (`GET {API_URL}/student`). Acepta `?q=texto&page=2` |
| `/about` | `app/about/page.tsx` | Sección "About this project" |
| `/counter` | `app/counter/page.tsx` | Contador interactivo (Client Component) |

Regla de oro del App Router: **la carpeta define la URL, el archivo define el rol** (`page.tsx`, `layout.tsx`, `route.ts`).

## Estructura del proyecto

```
app/
  layout.tsx            Layout raíz: Navbar + <main> que envuelve todas las páginas
  page.tsx              /
  about/page.tsx        /about
  students/page.tsx     /students
  counter/page.tsx      /counter
components/
  Brand.tsx             Marca "Dash" + "Students"
  Navbar.tsx            Client Component (usePathname para resaltar el link activo)
  Section.tsx           Contenedor con id, título y children
  Paginator.tsx         Paginador por links (<, números con "...", >); conserva los params
  students/
    StudentTable.tsx    Tabla; recibe students por props
    StudentRow.tsx      Fila de un estudiante
    StudentBadge.tsx    Badge Active / Inactive
    StudentSearch.tsx   Client Component: input de búsqueda con debounce que escribe `?q=`
lib/
  student-list.ts       Funciones puras: filterStudents, paginate, getPageNumbers
data/students.mock.ts   Mock tipado de estudiantes
interfaces/
  student.interface.ts  Tipo Student
  nav-links.interface.ts  Tipo NavLinks ({ href, title })
```

## Cómo está construido

### Componentes y props

- Los datos bajan por props: `Navbar` recibe `links`, `StudentTable` recibe `students`, y `Section` envuelve a sus hijos con `children`.
- `StudentTable` no sabe de dónde vienen los datos: antes recibía el mock de `data/students.mock.ts`, ahora recibe la respuesta de la API, sin cambiar la tabla, la fila ni el badge.
- Las listas usan `key={student.id}` en el elemento que devuelve el `.map`.

### Server vs Client Components

| Server Component (por defecto) | Client Component (`"use client"`) |
|--------------------------------|-----------------------------------|
| Puede ser `async`, lee datos y secretos | No puede ser `async` |
| Su JS no se envía al navegador | Su JS se envía y se hidrata |
| Sin `useState`, `useEffect` ni `onClick` | Hooks, eventos y APIs del navegador |

En este repo:

- **Server Components:** `StudentTable`, `StudentRow`, `StudentBadge`, `Section`, `Brand`, `Paginator` y el layout. `app/students/page.tsx` también lo es: hace el `fetch` con `API_URL` y usa `connection()`, por eso no lleva `"use client"`.
- **Client Components:** `Navbar` (necesita `usePathname`), `StudentSearch` (necesita `useRouter`, `useSearchParams` y `onChange`) y `app/counter/page.tsx` (necesita `useState` y `onClick`).

`"use client"` no significa "solo se renderiza en el cliente": significa "desde aquí hacia abajo el código también viaja al navegador". Por eso solo se marca lo que lo necesita, y no el layout completo.

### Búsqueda y paginación en `/students`

El estado vive en la URL (`/students?q=ana&page=2`), no en `useState`: así se puede compartir el link y funciona el botón "atrás".

1. `StudentSearch` (cliente) espera 300 ms tras teclear, arma `?q=` con `router.replace`, y borra `page` para volver a la primera página.
2. `StudentResults` (async, dentro de `Suspense`) lee `searchParams`, pide los estudiantes a la API (`GET {API_URL}/student`, sin `limit`) y aplica `filterStudents` (por id, nombre o nickname, sin distinguir mayúsculas) y luego `paginate` (6 por página, `PAGE_SIZE`; la página se ajusta al rango válido).
3. `Paginator` genera los links con `Link` y conserva `q` en cada uno.

Hay dos `Suspense`: uno para el buscador (usa `useSearchParams`) y otro con el fallback "Cargando estudiantes..." para los resultados. El filtrado y la paginación ocurren en memoria sobre lo que devuelva la API, no en la API.

## Problemas conocidos

- Como `fetch` ya no envía `limit`, el total de estudiantes depende del valor por defecto de la API (no verificado aquí). Si la API pagina por defecto, el buscador solo verá esa primera tanda.
- En `app/layout.tsx` los links de la Navbar usan `href: "students"` y `"about"` (sin `/` inicial), por lo que la comparación `pathname === link.href` de la Navbar nunca coincide y el link activo no se resalta.
- El `metadata` del layout todavía tiene el título por defecto "Create Next App".

## Scripts

| Comando | Para qué sirve |
|---------|----------------|
| `pnpm dev` | Servidor de desarrollo (Turbopack) |
| `pnpm build` | Build de producción, imprime la tabla de rutas |
| `pnpm start` | Sirve el build de producción |
| `pnpm lint` | ESLint |
