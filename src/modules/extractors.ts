interface Note {
  title: string
}

interface NotesList {
  [key: string]: Note
}

/**
 * Extract notes from list
 * @param r - Notes list from API
 */
export const extractNotes = (r: NotesList) =>
  Object.keys(r).map(k => r[k])

/**
 * Extract titles from Notes
 */
export const extractTitles = (n: Note[]) =>
  n.map(i => i.title)
