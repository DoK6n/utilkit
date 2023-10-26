/* eslint-disable @typescript-eslint/no-empty-function */
import { isAsyncFunction } from '../../src/utils/validataionUtils'

describe('isAsyncFunction', () => {
  it('should return true for async function', () => {
    expect(isAsyncFunction(async () => {})).toBe(true)
  })

  it('should return false for non-async function', () => {
    expect(isAsyncFunction(() => {})).toBe(false)
  })
})
