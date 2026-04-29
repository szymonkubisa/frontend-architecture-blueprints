# Vue 3 Enterprise Architecture Blueprint

A reference scaffold demonstrating production-grade patterns for large Vue 3 applications.

## Stack

| Concern | Library |
|---------|---------|
| Framework | Vue 3 + `<script setup>` + Composition API |
| Language | TypeScript (strict mode) |
| State | Pinia |
| Routing | Vue Router 4 |
| HTTP | Axios with interceptors |
| Build | Vite |
| Testing | Vitest + Vue Test Utils |
| Linting | ESLint + Prettier |

## Folder Structure

```
src/
├── core/               # Infrastructure: axios, router, pinia setup
│   ├── api/            # Axios instance + shared API types
│   ├── router/         # createRouter + auth navigation guard
│   └── store/          # Pinia registration
│
├── features/           # Vertical feature slices (self-contained)
│   └── auth/
│       ├── api/        # HTTP service calls for this feature
│       ├── components/ # Feature-scoped components
│       ├── store/      # Pinia store for this feature
│       ├── types/      # TypeScript interfaces
│       ├── views/      # Route-level page components
│       └── routes.ts   # Route definitions exported and composed in core/router
│
├── layouts/            # App shell layouts (AppLayout, AuthLayout)
├── shared/
│   ├── components/     # Design-system primitives (BaseButton, BaseInput…)
│   ├── composables/    # Reusable Composition API hooks
│   └── types/          # Global utility types
│
├── assets/styles/      # CSS variables + global resets
└── constants/          # App-wide constants (route names, API paths, keys)
```

## Key Patterns

### Feature isolation
Each feature folder is a self-contained vertical slice. It owns its own:
- API service (`features/auth/api/authApi.ts`)
- Pinia store (`features/auth/store/authStore.ts`)
- TypeScript types (`features/auth/types/auth.types.ts`)
- Routes (`features/auth/routes.ts`)

Routes are imported and merged in `core/router/index.ts`.

### Auth guard
`core/router/index.ts` uses a `beforeEach` hook that reads from the Pinia auth store. Routes declare intent via meta flags:
```ts
meta: { requiresAuth: true }   // redirect to /login if not authenticated
meta: { guestOnly: true }      // redirect to /dashboard if already authenticated
```

### Axios interceptors (`core/api/axios.ts`)
- **Request**: injects `Authorization: Bearer <token>` from `localStorage`
- **Response**: on 401 clears token and redirects to `/login`; normalises error messages

### Composables
`useLoading()` wraps any async call with `isLoading` / `error` reactive refs, reducing boilerplate in every view:
```ts
const { isLoading, error, withLoading } = useLoading()
await withLoading(() => fetchData())
```

## Adding a New Feature

1. Create `src/features/<name>/` with the standard subdirectories
2. Define types in `types/<name>.types.ts`
3. Add API calls in `api/<name>Api.ts` (uses the shared axios instance)
4. Create a Pinia store in `store/<name>Store.ts`
5. Build views in `views/` and export routes from `routes.ts`
6. Import the routes array in `core/router/index.ts`

## Getting Started

```bash
cp .env.example .env.local   # set VITE_API_BASE_URL
npm install
npm run dev
npm run test
npm run build
```
