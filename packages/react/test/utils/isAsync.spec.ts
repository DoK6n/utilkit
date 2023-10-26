/* eslint-disable @typescript-eslint/no-empty-function */
import { isAsync } from '../../src/utils/validataionUtils'

describe('isAsync', () => {
  it('should return true for Promise', () => {
    expect(isAsync(new Promise(() => {}))).toBe(true)
  })

  it('should return true for async function', () => {
    expect(isAsync(async () => {})).toBe(true)
  })

  it('should return false for non-async', () => {
    expect(isAsync(() => {})).toBe(false)
  })
})
