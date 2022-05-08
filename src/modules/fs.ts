import { promises } from 'fs'
const { appendFile } = promises

/**
 * Returns flusher function
 */
export const flushTo = (fileName: string) => (content: string) =>
  appendFile(fileName, content)
