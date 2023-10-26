import { isEmptyObject } from '../../src/utils/validataionUtils'

describe('isEmptyObject', () => {
  it('should return true for an empty object', () => {
    expect(isEmptyObject({})).toBe(true)
  })

  it('should return false for a non-empty object', () => {
    expect(isEmptyObject({ key: 'value' })).toBe(false)
  })

  it('should return false for an array', () => {
    expect(isEmptyObject([])).toBe(false)
  })

  it('should return false for null', () => {
    expect(isEmptyObject(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isEmptyObject(undefined)).toBe(false)
  })

  it('should return false for a number', () => {
    expect(isEmptyObject(42)).toBe(false)
  })

  it('should return false for a string', () => {
    expect(isEmptyObject('test')).toBe(false)
  })

  it('should return false for a function', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isEmptyObject(() => {})).toBe(false)
  })

  it('should return false for a date', () => {
    expect(isEmptyObject(new Date())).toBe(false)
  })
})
