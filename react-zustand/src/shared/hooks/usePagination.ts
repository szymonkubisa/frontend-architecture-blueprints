import { useState, useMemo } from 'react'

// Hook for cursor-based or offset pagination.
// Call `setTotal` with the count returned by the API after each fetch;
// everything else (page bounds, offset calculation) is derived automatically.
export function usePagination(initialPageSize = 20) {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(initialPageSize)
  const [total, setTotal] = useState(0)

  const totalPages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize])
  const hasPrevPage = page > 1
  const hasNextPage = page < totalPages
  // offset is the number of items to skip; pass it directly to the API as a
  // query param (e.g. ?offset=20&limit=20 for the second page).
  const offset = (page - 1) * pageSize

  function nextPage() {
    if (hasNextPage) setPage((p) => p + 1)
  }

  function prevPage() {
    if (hasPrevPage) setPage((p) => p - 1)
  }

  // goToPage validates the target page number to prevent out-of-range navigation.
  function goToPage(n: number) {
    if (n >= 1 && n <= totalPages) setPage(n)
  }

  // reset is useful when search filters change and results start from page 1 again.
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
