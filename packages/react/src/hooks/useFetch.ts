import { DependencyList, useEffect, useReducer, useRef } from 'react'

type State<Data> = {
  isLoading: boolean
  data?: Data
  error?: unknown
}

type Action<Data> =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; data: Data }
  | { type: 'ERROR'; error: unknown }

function reducer<Data>(state: State<Data>, action: Action<Data>): State<Data> {
  switch (action.type) {
    case 'LOADING': {
      return {
        ...state,
        isLoading: true,
        error: undefined,
      }
    }
    case 'SUCCESS': {
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: undefined,
      }
    }
    case 'ERROR': {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    }
    default:
      throw new Error(`Unknown action type`)
  }
}

interface Option<Data> {
  deps?: DependencyList
  fallbackData?: Data
}

/**
 * ```ts
 * const { data, error, isLoading, mutate } = useFetch<Todo>(() =>
 *  fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => res.json()),
 * )
 * ```
 */
export function useFetch<Data = unknown>(
  fetcher: () => Promise<Data>,
  option?: Option<Data>,
): State<Data> & {
  mutate: () => Promise<void>
} {
  const [state, dispatch] = useReducer(reducer<Data>, {
    isLoading: false,
    data: option?.fallbackData,
    error: undefined,
  })

  const hasFetched = useRef(false)

  const mutate = async () => {
    dispatch({ type: 'LOADING' })
    try {
      const data = (await fetcher()) as Data
      dispatch({ type: 'SUCCESS', data })
    } catch (error) {
      dispatch({ type: 'ERROR', error })
    }
  }

  useEffect(() => {
    if (hasFetched.current) return

    mutate()
    hasFetched.current = true

    return () => {
      hasFetched.current = true
    }
  }, option?.deps || [])

  return { ...state, mutate }
}
