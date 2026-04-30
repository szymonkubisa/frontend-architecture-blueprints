import { ref, computed } from 'vue'

// Composable for cursor-based or offset pagination.
// Call `setTotal` with the count returned by the API after each fetch;
// everything else (page bounds, offset calculation) is derived automatically.
export function usePagination(initialPageSize = 20) {
  const page = ref(1)
  const pageSize = ref(initialPageSize)
  const total = ref(0)

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))
  const hasPrevPage = computed(() => page.value > 1)
  const hasNextPage = computed(() => page.value < totalPages.value)
  // offset is the number of items to skip; pass it directly to the API as a
  // query param (e.g. ?offset=20&limit=20 for the second page).
  const offset = computed(() => (page.value - 1) * pageSize.value)

  function nextPage() {
    if (hasNextPage.value) page.value++
  }

  function prevPage() {
    if (hasPrevPage.value) page.value--
  }

  // goToPage validates the target page number to prevent out-of-range navigation.
  function goToPage(n: number) {
    if (n >= 1 && n <= totalPages.value) page.value = n
  }

  function setTotal(n: number) {
    total.value = n
  }

  // reset is useful when search filters change and results should start from page 1 again.
  function reset() {
    page.value = 1
    total.value = 0
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
