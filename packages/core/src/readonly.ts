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
 * ---
 *
 * 이 함수는 인자로 전달된 객체를 불변하게 설정하여 `읽기 전용`으로 만들고, `Proxy 객체`를 반환합니다.
 * 내부적으로는 Proxy 객체와 `Object.freeze()`를 사용합니다. isFrozen을 사용하여 불변성을 검사하고, 불변이 아니라면 에러를 발생시킵니다.
 * 또한 Proxy를 사용하여 대상 객체를 변경하려고 시도하거나 존재하지 않는 속성을 호출하려고 할 때도 에러를 발생시킵니다.
 *
 * `Reflect.ownKeys()` 메소드는 심볼 속성과 문자열 키를 포함한 모든 객체의 고유 속성 키를 배열로 반환합니다.
 *
 * 따라서 readonly 함수는 심볼 속성을 포함한 모든 속성을 수정 불가능하게 만듭니다.
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
