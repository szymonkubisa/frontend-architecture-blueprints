import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/core/store'

// Typed wrapper around useDispatch so callers don't need to annotate the
// generic manually every time and thunk actions are properly typed.
export const useAppDispatch = () => useDispatch<AppDispatch>()
