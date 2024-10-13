import Query from '../Query.js'

export default function to(query: Query) {
  const to = query.nextWord()
  if (!to) throw new Error('No target specified')
  query.target = to
  const as = query.nextWord()
  if (as?.toLocaleLowerCase() === 'as') {
    const type = query.nextWord()
    if (!type) throw new Error('Incomplete target "as" statement')
    query.targetFormat = type
  } else if (as) {
    query.words.unshift(as) //no as? returning the word back to the query
  }
}
