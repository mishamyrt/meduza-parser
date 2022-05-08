import { extractNotes, extractTitles } from './modules/extractors'
import axios from 'axios'
import { flushTo } from './modules/fs'
import { iterate } from './modules/iterate'
import { pageConfig } from './modules/params'
import { joinLines } from './modules/string'
import { debounce } from './modules/async'

const pagesCount = 1500
const batchSize = 40
const delay = 200

const meduzaUrl = 'https://meduza.io'
const apiPath = `${meduzaUrl}/api/v3/search`

const flush = flushTo('out/result.txt')

Promise.all(
  iterate(pagesCount, n =>
    () => axios.get(apiPath, pageConfig(n))
      .then(r => r.data.documents)
      .then(extractNotes)
      .then(extractTitles)
      .then(joinLines)
      .then(flush)
      .then(() => console.log(`Page ${n} parsed.`))
      .catch(() => console.log(`Cannot parse page ${n}.`))))
  .then(r => debounce(r, batchSize, delay))
  .then(() => console.log('Successfully parsed'))
  .catch(e => console.error(`Something went wrong. ${e}`))
