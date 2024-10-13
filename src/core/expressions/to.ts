import Query from '../Query.js'
import * as pathLib from 'path'

export default function to(query: Query) {
  const to = query.nextWord()
  if (!to) throw new Error('No target specified')
  query.target = to
  const as = query.nextWord()
  if (as?.toLocaleLowerCase() === 'as') {
    const type = query.nextWord()
    if (!type) throw new Error('Incomplete target "as" statement')
    query.targetFormat = type
  } else {
    if (as) {
      query.words.unshift(as) //no as? returning the word back to the query
    }
    const typeFromExtension = pathLib.extname(query.target)
    if (typeFromExtension) {
      query.targetFormat = typeFromExtension.substring(1)
    } else {
      throw new Error('Could not infer type from target extension, please specify using "as" (ex:to target as xml)')
    }
  }
}
