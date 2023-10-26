import { isFunction } from '../../src/utils/validataionUtils'

describe('isFunction', () => {
  it('should return true for function', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isFunction(() => {})).toBe(true)
  })

  it('should return false for non-function', () => {
    expect(isFunction({})).toBe(false)
  })
})
