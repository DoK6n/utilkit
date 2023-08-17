import { AnyFunction } from '../types/types'

export const isPromise = (target: unknown): target is Promise<any> => target instanceof Promise

export const isFunction = (target: unknown): target is AnyFunction => typeof target === 'function'

export const isAsyncFunction = (target: unknown): target is AnyFunction =>
  isFunction(target) && target.constructor.name === 'AsyncFunction'

export const isAsync = (target: unknown) => isPromise(target) || isAsyncFunction(target)
