import { useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/core/store'

// Typed wrapper around useSelector so selector functions receive the full
// RootState type without needing to import it at every call site.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
