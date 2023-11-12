import { useRef, useEffect } from 'react'
import { Callback } from '../types'
import { isFunction } from 'src/utils/validataionUtils'

/**
 * Calls a function on mount
 */
export const useDidMount = (callback: Callback) => {
  const isMounted = useRef<boolean>(false)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if (isFunction(callback)) {
        callback()
      }
    } else {
      if (isMounted.current) {
        if (isFunction(callback)) {
          callback()
        }
      }
    }
    isMounted.current = true
  }, [])
}
