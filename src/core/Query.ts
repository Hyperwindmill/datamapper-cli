import {Expressions} from './expressions/index.js'

interface Source {
  content: string
  type: string
}
export interface Expression {
  (query: Query): void
}
export default class Query {
  query: string = ''
  staticSource?: Source
  words: string[] = []
  constructor(query: string, staticSource?: Source) {
    this.query = query
    this.staticSource = staticSource
    this.analize()
  }
  public nextWord() {
    let word = this.words.shift()
    if (word) {
      if ((word.startsWith('"') && word.endsWith('"')) || (word.startsWith("'") && word.endsWith("'"))) {
        word = word.slice(1, -1)
      }
    }
    //console.log('NEXT: ' + word)
    return word
  }
  private analize() {
    console.log(this.query)
    // Match words(all non ws chars) or quoted phrases
    this.words = this.query.match(/"[^"]*"|'[^']*'|\S+/g) || []
    let word: string | undefined
    while ((word = this.nextWord())) {
      if (Object.hasOwn(Expressions, word)) {
        Expressions[word](this)
      }
    }
  }
  public run() {}
}
