import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('map', () => {
  it('runs map cmd', async () => {
    const {stdout} = await runCommand('map')
    expect(stdout).to.contain('hello world')
  })

  it('runs map --name oclif', async () => {
    const {stdout} = await runCommand('map --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
