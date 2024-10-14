import {XMLParser, XMLBuilder} from 'fast-xml-parser'
export interface Adapter {
  decode: (content: string) => Record<string, any>
  encode: (data: Record<string, any>) => string
}
export const Adapters: Record<string, Adapter> = {
  json: {
    encode: (data) => JSON.stringify(data),
    decode: (content) => JSON.parse(content),
  },
  xml: {
    encode: (data) => {
      const builder = new XMLBuilder()
      return builder.build(data)
    },
    decode: (content) => {
      const parser = new XMLParser()
      return parser.parse(content)
    },
  },
}
