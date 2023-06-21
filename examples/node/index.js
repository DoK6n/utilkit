// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readonly } = require('@utilkit/core')

const obj = { a: 1, b: { c: 2 } }
const ro = readonly(obj)

ro.a = 3
