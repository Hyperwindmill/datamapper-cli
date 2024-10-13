interface Source {
  content: string
  type: string
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
  private nextWord() {
    let word = this.words.shift()
    if (word) {
      if ((word.startsWith('"') && word.endsWith('"')) || (word.startsWith("'") && word.endsWith("'"))) {
        word = word.slice(1, -1)
      }
    }
    return word
  }
  private analize() {
    console.log(this.query)
    // Match words or quoted phrases
    this.words = this.query.match(/"[^"]*"|'[^']*'|\w+/g) || []
    let word: string | undefined
    while ((word = this.nextWord())) {
      console.log(word)
    }
  }
  public run() {}
}
