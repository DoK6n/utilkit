import { useEffect, type DependencyList, useRef } from 'react'
import type { Maybe } from '../types'
import { isAsync, isFunction } from '../utils/validataionUtils'

type EffectCleanup = () => void
type MaybeEffectCleanup = Maybe<EffectCleanup>

type AsyncEffectCallback = () => Promise<MaybeEffectCleanup | void> | MaybeEffectCleanup | void

export const useAsyncEffect = (callback: AsyncEffectCallback, deps: DependencyList = []) => {
  const isMounted = useRef<boolean>(false)

  useEffect(() => {
    let cleanup: MaybeEffectCleanup = null

    // when callback is syncFunction
    if (isMounted.current && !isAsync(callback)) {
      const result = callback()
      if (isFunction(callback)) {
        cleanup = result as MaybeEffectCleanup
        return () => {
          cleanup?.()
        }
      }
    }

    // when callback is AsyncFunction
    const effect = async () => {
      const result = await callback()
      if (isFunction(result)) {
        cleanup = result
      }
    }

    if (isMounted.current && isAsync(callback)) {
      effect()
    }

    isMounted.current = true

    return () => {
      cleanup?.()
    }
  }, deps)
}
