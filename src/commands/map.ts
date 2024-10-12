import {Args, Command, Flags} from '@oclif/core'

export default class Map extends Command {
  static override args = {
    //file: Args.string({description: 'file to read'}),
  }

  static override description = 'describe the command here'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    // flag with a value (-q, --name=VALUE)
    query: Flags.string({char: 'q', description: 'DMAP Query to use for mapping'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Map)
    console.log('your query: ' + flags.query)
  }
}
