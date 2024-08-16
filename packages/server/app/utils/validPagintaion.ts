import { Pagination } from '../types/Pagination'

export function transformPagination(
  page: unknown,
  limit: unknown
): Pagination | undefined {
  page = Number(page)
  limit = Number(limit)
  if (
    typeof page !== 'number' ||
    typeof limit !== 'number' ||
    page < 1 ||
    limit < 1
  ) {
    return undefined
  }
  return {
    page,
    limit,
  }
}
