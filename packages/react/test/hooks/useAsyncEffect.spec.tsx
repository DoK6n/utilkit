/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef, useState } from 'react'
import { act, render, renderHook, waitFor } from '@testing-library/react'
import { useAsyncEffect } from '../../src/hooks/useAsyncEffect'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('useAsyncEffect', () => {
  it('is defined', () => {
    expect.hasAssertions()
    expect(useAsyncEffect).toBeDefined()
  })

  it('asyncEffect hook', async () => {
    expect.hasAssertions()
    let callCount = 0

    const { result } = renderHook(
      ({ count }: { count: number }) => {
        const [value, setValue] = useState(false)

        useAsyncEffect(async () => {
          await sleep(300)
          setValue(true)
          callCount++
        })

        return { value, callCount }
      },
      {
        wrapper: React.StrictMode,
        initialProps: { count: 0 },
      },
    )

    expect(result.current.value).toBe(false)

    await waitFor(() => {
      expect(result.current.callCount).toBe(1)
      expect(result.current.value).toBe(true)
    })
  })

  it.skip('sync callback', async () => {
    const { rerender } = renderHook(
      ({ count }: { count: number }) => {
        useAsyncEffect(() => {
          console.log('sync function!')
        })
      },
      {
        wrapper: React.StrictMode,
        initialProps: { count: 0 },
      },
    )
  })
})
