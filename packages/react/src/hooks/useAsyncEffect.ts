import { useEffect, type DependencyList, useRef } from 'react'
import type { Maybe } from '../types'
import { isAsync, isFunction } from '../utils/validataionUtils'

type EffectCleanup = () => void
type MaybeEffectCleanup = Maybe<EffectCleanup>

type AsyncEffectCallback = () => Promise<MaybeEffectCleanup>

export const useAsyncEffect = (callback: AsyncEffectCallback, deps: DependencyList = []) => {
  const isMounted = useRef<boolean>(false)

  useEffect(() => {
    if (isMounted.current) {
      if (!isAsync(callback)) {
        isFunction(callback) && callback()
      }
    }
    let cleanupFunction: MaybeEffectCleanup = null

    const effect = async () => {
      const result = await callback()
      cleanupFunction = isFunction(result) ? result : null
    }

    if (isMounted.current) {
      effect()
    }
    isMounted.current = true

    return () => {
      if (cleanupFunction) {
        cleanupFunction()
      }
    }
  }, deps)
}
