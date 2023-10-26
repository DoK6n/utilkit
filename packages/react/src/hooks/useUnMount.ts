import { isFunction } from './../utils/validataionUtils'
import { useEffect, useRef } from 'react'
import { Callback } from '../types'

/**
 * Calls a function on unmount
 */
export const useUnMount = (callback: Callback) => {
  const isUnMounted = useRef<boolean>(false)

  useEffect(() => {
    return () => {
      if (isUnMounted.current) {
        if (isFunction(callback)) {
          callback()
        }
      }
      isUnMounted.current = true
    }
  }, [])
}
