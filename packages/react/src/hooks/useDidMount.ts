import { useEffect } from 'react'
import { Callback } from '../types/types'

/**
 * useDidMount hook
 * @description Calls a function on mount
 */
export const useDidMount = (callback: Callback) => {
  useEffect(() => {
    if (typeof callback === 'function') {
      callback()
    }
  }, [])
}
