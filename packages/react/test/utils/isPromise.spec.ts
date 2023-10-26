import { isPromise } from '../../src/utils/validataionUtils'

describe('isPromise', () => {
  it('should return true for Promise', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isPromise(new Promise(() => {}))).toBe(true)
  })

  it('should return false for non-Promise', () => {
    expect(isPromise({})).toBe(false)
  })
})
