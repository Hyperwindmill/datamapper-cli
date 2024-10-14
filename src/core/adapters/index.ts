import {XMLParser, XMLBuilder} from 'fast-xml-parser'
export interface Adapter {
  decode: (content: string) => Record<string, any>
  encode: (data: Record<string, any>) => string
  extension: string
}
export const Adapters: Record<string, Adapter> = {
  json: {
    encode: (data) => JSON.stringify(data),
    decode: (content) => JSON.parse(content),
    extension: 'json',
  },
  xml: {
    encode: (data) => {
      const builder = new XMLBuilder({
        ignoreAttributes: false,
        arrayNodeName: 'test',
        format: true,
        attributeNamePrefix: '$',
      }) //TODO implement adapter options
      return builder.build({root: data}) //TODO: define root in options
    },
    decode: (content) => {
      const parser = new XMLParser()
      return parser.parse(content)
    },
    extension: 'xml',
  },
}
