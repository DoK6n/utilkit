import { expect } from '@jest/globals'
import { readonly } from '../src/readonly'
import { READONLY_ERROR } from '../src/constants/readonly-error.constant'

describe('readonly', () => {
  it('makes object readonly', () => {
    const obj = { a: 1, b: { c: 2 } }
    const ro = readonly(obj)

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ro.a = 2
    }).toThrowError(new Error(READONLY_ERROR.MODIFY_READONLY))

    expect(() => {
      ro.b.c = 3
    }).toThrowError(new Error(READONLY_ERROR.MODIFY_READONLY))

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ro.c = 3
    }).toThrowError(new Error(READONLY_ERROR.MODIFY_READONLY))
  })

  it('throws when accessing non-existing properties', () => {
    const obj = { a: 1, b: { c: 2 } }
    const ro = readonly(obj)

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(ro.d)
    }).toThrowError(new Error(READONLY_ERROR.PROPERTY_DOES_NOT_EXIST('d')))
  })
  it('makes nested objects readonly', () => {
    const obj = { a: 1, b: { c: 2 } }
    const ro = readonly(obj)

    expect(() => {
      ro.b.c = 3
    }).toThrowError(new Error(READONLY_ERROR.MODIFY_READONLY))
  })

  it('makes array readonly', () => {
    const arr = [1, 2, { a: 3 }]
    const ro = readonly(arr)

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ro[0] = 4
    }).toThrowError(new Error(READONLY_ERROR.MODIFY_READONLY))

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ro[2].a = 4
    }).toThrowError(new Error(READONLY_ERROR.MODIFY_READONLY))
  })

  it('makes symbol properties readonly', () => {
    const symbolKey = Symbol('key')
    const obj = { [symbolKey]: 1 }
    const ro = readonly(obj)

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ro[symbolKey] = 2
    }).toThrowError(new Error(READONLY_ERROR.MODIFY_READONLY))
  })

  it('makes function readonly', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const func = () => {}
    const ro = readonly(func)

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ro.prop = 2
    }).toThrowError(new Error(READONLY_ERROR.MODIFY_READONLY))
  })
})
