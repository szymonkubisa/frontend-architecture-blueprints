import { useState, useMemo } from 'react'

export function usePagination(initialPageSize = 20) {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(initialPageSize)
  const [total, setTotal] = useState(0)

  const totalPages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize])
  const hasPrevPage = page > 1
  const hasNextPage = page < totalPages
  const offset = (page - 1) * pageSize

  function nextPage() {
    if (hasNextPage) setPage((p) => p + 1)
  }

  function prevPage() {
    if (hasPrevPage) setPage((p) => p - 1)
  }

  function goToPage(n: number) {
    if (n >= 1 && n <= totalPages) setPage(n)
  }

  function reset() {
    setPage(1)
    setTotal(0)
  }

  return {
    page,
    pageSize,
    total,
    totalPages,
    hasPrevPage,
    hasNextPage,
    offset,
    nextPage,
    prevPage,
    goToPage,
    setTotal,
    reset,
  }
}
