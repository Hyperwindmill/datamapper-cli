interface Source {
  content: string
  type: string
}
export default class Query {
  query: string = ''
  staticSource?: Source
  constructor(query: string, staticSource?: Source) {
    this.query = query
    this.staticSource = staticSource
  }
  public run(){
    
  }
}
