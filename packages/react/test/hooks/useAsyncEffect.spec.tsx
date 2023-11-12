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

  it.skip('StrictMode onetime call ', async () => {
    const { rerender } = renderHook(
      ({ count }: { count: number }) => {
        const isMounted = useRef<boolean>(false)

        useEffect(() => {
          if (isMounted.current) {
            console.log('-- isMounted')
          }

          console.log('now isMounted is ', isMounted.current)
          isMounted.current = true
        })
      },
      {
        wrapper: React.StrictMode,
        initialProps: { count: 0 },
      },
    )

    rerender({ count: 1 })
  })

  it('asyncEffect hook', async () => {
    const { rerender } = renderHook(
      ({ count }: { count: number }) => {
        useAsyncEffect(async () => {
          console.log('async function!')
        })
      },
      {
        wrapper: React.StrictMode,
        initialProps: { count: 0 },
      },
    )
  })

  it('sync callback', async () => {
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
