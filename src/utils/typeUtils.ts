// describes a type of T[] that must have at least 1 member
export type NonEmptyArray<T> = [T, ...T[]]

// type guard to ensure that an array has at least 1 member
export const isNonEmptyArray = <T>(arr: T[]): arr is NonEmptyArray<T> => {
  return arr.length > 0
}

// describes the unwrapped type T of an array type T[]
export type Unarray<T> = T extends Array<infer U> ? U : T
