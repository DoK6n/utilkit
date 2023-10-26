/* eslint-disable @typescript-eslint/ban-ts-comment */
import { match } from '../../src/utils/match'

describe('match function', () => {
  type Status = 'SUCCESS' | 'FAIL' | 'PENDING'

  it('should return the correct string for SUCCESS', () => {
    const result = match<Status, string>('SUCCESS', {
      SUCCESS: () => 'succeeded',
      FAIL: () => 'failed',
      PENDING: () => 'pending',
    })
    expect(result).toBe('succeeded')
  })

  it('should return the correct string for FAIL', () => {
    const result = match<Status, string>('FAIL', {
      SUCCESS: () => 'succeeded',
      FAIL: () => 'failed',
      PENDING: () => 'pending',
    })
    expect(result).toBe('failed')
  })

  it('should return null if no matching case is found', () => {
    // @ts-ignore
    const result = match<Status, string>('UNKNOWN', {
      SUCCESS: () => 'succeeded',
      FAIL: () => 'failed',
      PENDING: () => 'pending',
    })
    expect(result).toBe(null)
  })

  it('should use default case if provided', () => {
    // @ts-ignore
    const result = match<Status, string>('UNKNOWN', {
      SUCCESS: () => 'succeeded',
      FAIL: () => 'failed',
      PENDING: () => 'pending',
      default: () => 'unknown',
    })
    expect(result).toBe('unknown')
  })

  it('should return null if cases object is empty', () => {
    const result = match<Status, string>('SUCCESS', {})
    expect(result).toBe(null)
  })
})
