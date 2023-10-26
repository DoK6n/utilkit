import { useEffect, useRef } from 'react'

/**
 * A React Hook that checks if a component is currently mounted.
 */
export const useIsMount = (): boolean => {
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  return isMountedRef.current
}
