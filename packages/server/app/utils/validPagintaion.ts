import { Pagination } from '../types/Pagination'

export function transformPagination(
  page: unknown,
  limit: unknown,
): Pagination | undefined {
  const pageLocal = Number(page)
  const limitLocal = Number(limit)
  console.log(page, limit)
  if (!pageLocal || !limitLocal || pageLocal < 1 || limitLocal < 1) {
    return undefined
  }
  return {
    page: pageLocal,
    limit: limitLocal,
  }
}
