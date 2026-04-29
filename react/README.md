# React 18 Enterprise Architecture Blueprint

A reference scaffold demonstrating production-grade patterns for large React applications.

## Stack

| Concern | Library |
|---------|---------|
| Framework | React 18 + functional components + hooks |
| Language | TypeScript (strict mode) |
| State | Redux Toolkit (RTK) |
| Server data | RTK Query |
| Routing | React Router v6 |
| HTTP | Axios with interceptors |
| Build | Vite |
| Testing | Vitest + React Testing Library |
| Linting | ESLint + Prettier |
| Styling | CSS Modules + CSS variables |

## Folder Structure

```
src/
├── core/               # Infrastructure: axios, RTK store, router
│   ├── api/
│   │   ├── axios.ts        # Singleton axios instance + interceptors
│   │   ├── baseQuery.ts    # RTK Query base query wrapping axios
│   │   └── types.ts        # Shared ApiResponse<T>, PaginatedResponse<T>
│   ├── router/
│   │   └── index.tsx       # createBrowserRouter + ProtectedRoute + GuestRoute
│   └── store/
│       └── index.ts        # configureStore, RootState, AppDispatch
│
├── features/           # Vertical feature slices (self-contained)
│   └── auth/
│       ├── api/        # RTK Query createApi endpoints
│       ├── components/ # Feature-scoped React components
│       ├── hooks/      # Feature-scoped custom hooks
│       ├── pages/      # Route-level page components (lazy loaded)
│       ├── slices/     # Redux slices (state + reducers + selectors)
│       └── types/      # TypeScript interfaces
│
├── layouts/            # Page shell components (AppLayout, AuthLayout) + CSS Modules
├── shared/
│   ├── components/     # Design-system primitives; each in its own folder
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.module.css
│   │       └── Button.test.tsx   # Co-located test
│   ├── hooks/          # Reusable hooks (useLoading, usePagination, typed dispatch/selector)
│   └── types/          # Global utility types
│
├── assets/styles/      # CSS variables + global reset
└── constants/          # App-wide constants (route paths, API paths, storage keys)
```

## Key Patterns

### Feature isolation
Each feature is a self-contained vertical slice owning its API endpoints, Redux slice, hooks, types, and pages. The only coupling point is the Redux store, which imports each feature's reducer.

### RTK Query over axios (for server state)
`core/api/baseQuery.ts` wraps the shared axios instance in an RTK Query `baseQuery`. This means every RTK Query endpoint inherits all interceptors (auth headers, 401 redirect, error normalisation) automatically.

For one-off calls that don't need caching (e.g. dashboard stats), the axios instance is used directly.

### Auth flow
1. `features/auth/api/authApi.ts` — `login` mutation calls `/auth/login`, then `getMe` in `onQueryStarted`, then dispatches `setCredentials` to the Redux slice
2. `features/auth/slices/authSlice.ts` — persists token + user to `localStorage`; `logout` reducer clears both
3. `core/router/index.tsx` — `<ProtectedRoute>` and `<GuestRoute>` read `selectIsAuthenticated` from the slice

### Typed Redux hooks (`shared/hooks/`)
`useAppDispatch` and `useAppSelector` are typed wrappers — use these everywhere instead of the raw `useDispatch`/`useSelector` to get full TypeScript inference with no `any` casts.

### CSS Modules
Each component ships a `.module.css` sibling. CSS custom properties (defined in `assets/styles/variables.css`) are shared across all modules, so theming is a single-file change.

## Adding a New Feature

1. Create `src/features/<name>/` with: `api/`, `components/`, `hooks/`, `pages/`, `slices/`, `types/`
2. Define interfaces in `types/<name>.types.ts`
3. Create a slice in `slices/<name>Slice.ts` and register its reducer in `core/store/index.ts`
4. Create RTK Query endpoints in `api/<name>Api.ts` and add the `reducerPath` + middleware to the store
5. Build page components in `pages/` and add lazy routes in `core/router/index.tsx`

## Getting Started

```bash
cp .env.example .env.local   # set VITE_API_BASE_URL
npm install
npm run dev
npm run test
npm run build
```
