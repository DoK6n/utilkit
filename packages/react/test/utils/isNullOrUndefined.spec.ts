import { isNullOrUndefined } from '../../src/utils/validataionUtils'

describe('isNullOrUndefined', () => {
  it('should return true for null', () => {
    expect(isNullOrUndefined(null)).toBe(true)
  })

  it('should return true for undefined', () => {
    expect(isNullOrUndefined(undefined)).toBe(true)
  })

  it('should return false for empty string', () => {
    expect(isNullOrUndefined('')).toBe(false)
  })

  it('should return false for 0', () => {
    expect(isNullOrUndefined(0)).toBe(false)
  })

  it('should return false for NaN', () => {
    expect(isNullOrUndefined(NaN)).toBe(false)
  })

  it('should return false for false', () => {
    expect(isNullOrUndefined(false)).toBe(false)
  })

  it('should return false for empty object', () => {
    expect(isNullOrUndefined({})).toBe(false)
  })

  it('should return false for empty array', () => {
    expect(isNullOrUndefined([])).toBe(false)
  })
})
