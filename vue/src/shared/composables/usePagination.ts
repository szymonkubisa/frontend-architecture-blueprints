import { ref, computed } from 'vue'

export function usePagination(initialPageSize = 20) {
  const page = ref(1)
  const pageSize = ref(initialPageSize)
  const total = ref(0)

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))
  const hasPrevPage = computed(() => page.value > 1)
  const hasNextPage = computed(() => page.value < totalPages.value)
  const offset = computed(() => (page.value - 1) * pageSize.value)

  function nextPage() {
    if (hasNextPage.value) page.value++
  }

  function prevPage() {
    if (hasPrevPage.value) page.value--
  }

  function goToPage(n: number) {
    if (n >= 1 && n <= totalPages.value) page.value = n
  }

  function setTotal(n: number) {
    total.value = n
  }

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
