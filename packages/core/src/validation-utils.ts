export type Callback = () => void

export type AnyFunction = (...args: any[]) => any

export type Maybe<T> = T | null

export const isPromise = (target: unknown): target is Promise<any> => target instanceof Promise

export const isFunction = (target: unknown): target is AnyFunction => typeof target === 'function'

export const isAsyncFunction = (target: unknown): target is AnyFunction =>
  isFunction(target) && target.constructor.name === 'AsyncFunction'

export const isAsync = (target: unknown) => isPromise(target) || isAsyncFunction(target)

export const isString = (target: unknown): target is string => typeof target === 'string'

export type EmptyObject = { [K in string | number]: never }

export const isNullOrUndefined = (value: unknown): value is null | undefined => value == null

export const isEmptyObject = (target: unknown): target is EmptyObject =>
  !isNullOrUndefined(target) &&
  typeof target === 'object' &&
  !Array.isArray(target) &&
  Object.keys(target as object).length === 0 &&
  (target as object).constructor === Object

export const validationUtils = {
  isPromise,
  isFunction,
  isAsyncFunction,
  isAsync,
  isString,
  isNullOrUndefined,
  isEmptyObject,
}
