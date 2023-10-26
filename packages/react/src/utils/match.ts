type DefaultCase<R> = {
  default?: () => R
}

type MatchCases<T extends string, R> = {
  [K in T]?: () => R
} & DefaultCase<R>

export function match<T extends string, R>(value: T, cases: MatchCases<T, R>): R | null {
  const callback = cases[value] || cases.default

  if (callback) {
    return callback()
  }
  return null
}
