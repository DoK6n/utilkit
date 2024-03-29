/* eslint-disable @typescript-eslint/no-empty-function */
import { isAsyncFunction } from '../../src/utils/validataionUtils'

describe('isAsyncFunction', () => {
  it('should return true for async arrow function', () => {
    expect(isAsyncFunction(async () => {})).toBe(true)
  })

  it('should return true for async function declaration', () => {
    expect(isAsyncFunction(async function () {})).toBe(true)
  })

  it('should return false for non-async function', () => {
    expect(isAsyncFunction(() => {})).toBe(false)
  })

  it('should return false for primise', () => {
    expect(isAsyncFunction(new Promise(() => {}))).toBe(false)
  })
})
