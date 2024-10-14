import { Adapters } from './adapters/index.js'
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
  targetFormat: string = 'json'
  target: string = 'output'
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
      word = word.toLocaleLowerCase()
      if (Object.hasOwn(Expressions, word)) {
        Expressions[word](this)
      }
    }
  }
  public run() {
    if(!this.staticSource) throw new Error("No source is defined");
    const parser=Adapters[this.staticSource.type.toLocaleLowerCase()];
    if(!parser) throw new Error('No adapter available for '+this.staticSource.type);
    const from=parser.decode(this.staticSource.content);
    if(!from) throw new Error(this.staticSource.type+' adapter was not able to read source content');
    const encoder=Adapters[this.targetFormat.toLocaleLowerCase()];
    if(!encoder) throw new Error('No adapter available for '+this.targetFormat);
    const to=encoder.encode(from);
    if(!from) throw new Error(this.targetFormat+' adapter was not able to encode your source content');
    console.log(to);
  }
}
