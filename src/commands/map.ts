import {Args, Command, Flags} from '@oclif/core'
import Query from '../core/Query.js'

export default class Map extends Command {
  static override args = {
    //file: Args.string({description: 'file to read'}),
  }

  static override description = 'describe the command here'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    // flag with a value (-q, --name=VALUE)
    query: Flags.string({char: 'q', description: 'DMAP Query to use for mapping', required: true}),
    source: Flags.string({char: 's', description: 'Inline source to be used by the query'}),
    type: Flags.string({char: 't', description: 'Inline source type to be used by the query'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Map)
    const query = new Query(
      flags.query,
      flags.source && flags.type ? {content: flags.source, type: flags.type} : undefined,
    )
    query.run()
  }
}
