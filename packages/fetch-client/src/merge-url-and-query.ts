import QueryString from 'qs'

export type EmptyObject = { [K in string | number]: never }

export const isNullOrUndefined = (value: unknown): value is null | undefined => value == null

export const isEmptyObject = (target: unknown): target is EmptyObject =>
  !isNullOrUndefined(target) &&
  typeof target === 'object' &&
  !Array.isArray(target) &&
  Object.keys(target as object).length === 0 &&
  (target as object).constructor === Object

export function mergeUrlAndQuery(url: string, queryParams: any) {
  if (!isEmptyObject(queryParams)) {
    const params = QueryString.stringify(queryParams, { addQueryPrefix: true })
    return `${url}?${params.toString()}`
  }
  return url
}
