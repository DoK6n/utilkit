import { isString } from '../../src/utils/validataionUtils'

describe('isString', () => {
  it('should return true for string', () => {
    expect(isString('hello')).toBe(true)
  })

  it('should return false for non-string', () => {
    expect(isString({})).toBe(false)
  })
})
