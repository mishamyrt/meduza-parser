/**
 * Iterates over indexes
 * @param len - Array length
 * @param callbackfn - Function that will generate data
 */
export const iterate = <T>(len: number, callbackfn: (i: number) => T): T[] =>
  Array.from(Array(len)).map((_, i) => callbackfn(i))
