import { useEffect } from 'react'
import { Callback } from '../types/types'

/**
 * useUnMount hook
 * @description Calls a function on unmount
 */
export const useUnMount = (callback: Callback) => {
  useEffect(() => {
    return () => {
      if (typeof callback === 'function') {
        callback()
      }
    }
  }, [])
}
