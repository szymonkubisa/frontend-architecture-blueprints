export type ID = string

export type Nullable<T> = T | null
export type Maybe<T> = T | null | undefined

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
}

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T
  label: string
  sortable?: boolean
  width?: string
}

export interface SortConfig {
  field: string
  direction: 'asc' | 'desc'
}
