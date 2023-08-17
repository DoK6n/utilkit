import { useEffect, type DependencyList } from 'react'
import type { Maybe } from '../types/types'
import { isAsync, isFunction } from '../utils/validataionUtils'

type EffectCleanup = () => void
type MaybeEffectCleanup = Maybe<EffectCleanup>

type AsyncEffectCallback = () => Promise<MaybeEffectCleanup>

export const useAsyncEffect = (callback: AsyncEffectCallback, deps: DependencyList = []) => {
  useEffect(() => {
    if (!isAsync(callback)) {
      isFunction(callback) && callback()
    }

    let cleanupFunction: MaybeEffectCleanup = null

    const effect = async () => {
      const result = await callback()
      cleanupFunction = isFunction(result) ? result : null
    }

    effect()

    return () => {
      if (cleanupFunction) {
        cleanupFunction()
      }
    }
  }, deps)
}
