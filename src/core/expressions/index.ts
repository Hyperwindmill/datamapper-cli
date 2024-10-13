import {Expression} from '../Query.js'
import * as fs from 'fs'

export const Expressions: Record<string, Expression> = {
  from: (query) => {
    const path = query.nextWord()
    const as = query.nextWord()
    let type = query.nextWord()
    if (path === 'static' && !query.staticSource) throw new Error('No static source has been provided')
    if (!query.staticSource) query.staticSource = {content: '', type: ''}
    if (!path) throw new Error('Source path must be provided')
    if (as !== 'as') {
      if (path === 'static' && !query.staticSource?.type) {
        throw new Error(
          'No static source type has been provided, either provide one in the query or set it using the --type (-t) flag',
        )
      }
      if (path !== 'static') throw new Error('from directive requires to specify a type (ex: from XXX as json)')
      if (as) query.words.unshift(as)
      if (type) query.words.unshift(type) //when no "as" has been provided, the words are returned back to the array for further processing
      //TODO: detect type from file extension
    } else if (type) {
      query.staticSource.type = type
    }
    if (path !== 'static') {
      if (!fs.existsSync(path)) throw new Error('File not found: ' + path)
      query.staticSource.content = fs.readFileSync(path).toString()
    }
    if (!query.staticSource.type || query.staticSource.type === '') throw new Error('no type found')
    if (!query.staticSource.content || query.staticSource.content === '') throw new Error('no content found')
    console.log(query.staticSource)
  },
}
