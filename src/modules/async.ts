/**
 * Splits an array into packs
 * @param r - Source array
 * @param batchSize - Maximum size of batch
 */
function splitBy <T> (r: T[], batchSize: number): T[][] {
  const batches = [] as T[][]
  const batchesCount = Math.ceil(r.length / batchSize)

  for (let i = 0; i < batchesCount; i++) {
    const offset = i * batchSize
    const endIndex = offset + batchSize <= r.length
      ? offset + batchSize
      : r.length
    batches.push([...r.slice(offset, endIndex)])
  }
  return batches
}

/**
 * Async delay
 * @param delay - Timeout
 */
const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay))

/**
 * Debounces async functions
 * @param p - Array with Promise factories
 * @param batchSize
 * @param timeout - Delay between batches
 */
export async function debounce<T> (p: (() => Promise<T>)[], batchSize = 1, timeout = 0) {
  const batches = splitBy(p, batchSize)
  for (const batch of batches) {
    await Promise.all(batch.map(i => i()))
    await sleep(timeout)
  }
  return batches
}
