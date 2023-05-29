import { READONLY_ERROR } from './constants/readonly-error.constant'

/**
 * The function sets the object passed as an argument to be immutable, making it `read-only`, and returns a `Proxy object`.
 * Internally, it uses Proxy objects and `Object.freeze()`. It checks for immutability using isFrozen and throws an error if it's not.
 * It also throws an error when trying to change the target object using a Proxy, and when trying to call a property that doesn't exist.
 *
 * The `Reflect.ownKeys()` method returns an array of all the object's own property keys, including symbol properties and string keys.
 *
 * Therefore, the readonly function makes all properties, including symbol properties, unmodifiable.
 *
 * @template T
 * @param {T} target
 */
export function readonly<T extends object>(target: T) {
  const keys = Reflect.ownKeys(target) as (keyof T)[]
  keys.forEach((property) => {
    const value = target[property]
    if (typeof value === 'object' && value !== null) {
      ;(target as Record<keyof T, unknown>)[property] = readonly(value)
      if (!Object.isFrozen(value)) {
        throw new Error(READONLY_ERROR.DEPENDENCY_NOT_READONLY(String(property)))
      }
    }
  })

  return new Proxy(Object.freeze(target), {
    set: function () {
      throw new Error(READONLY_ERROR.MODIFY_READONLY)
    },
    get: function (target, property) {
      if (!Reflect.has(target, property)) {
        throw new Error(READONLY_ERROR.PROPERTY_DOES_NOT_EXIST(String(property)))
      }
      return Reflect.get(target, property)
    },
  })
}
