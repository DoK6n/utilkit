import { readonly } from '@utilkit/core'

const obj = { a: 1, b: { c: 2 } }
const ro = readonly(obj)

ro.a = 2
