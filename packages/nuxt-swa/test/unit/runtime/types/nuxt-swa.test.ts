// @vitest-environment node
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { template } from 'lodash'
import { describe, expect, it } from 'vitest'

import { defaults, type ModuleOptions } from '~/src/config'
import { _preConfiguredProviders } from '~/src/runtime/constants'

describe('runtime/types/nuxt-swa.d.ts.template', async () => {
  const minimumOptions: ModuleOptions = {
    authProviders: [],
    customRoles: [],
    dataApi: false,
  }
  const defaultOptions = { ...defaults, authProviders: _preConfiguredProviders }
  const fullOptions: ModuleOptions = {
    authProviders: ['github', 'twitter', 'line'],
    customRoles: ['administrator'],
    dataApi: { rest: '/rest', graphql: '/graphql' },
  }
  const templateString = await readFile(
    resolve(
      __dirname,
      '../../../../',
      'src/runtime/types',
      'nuxt-swa.d.ts.template'
    ),
    { encoding: 'utf-8' }
  )

  it.each([defaultOptions, minimumOptions, fullOptions])(
    '%o renders expected Type Definition',
    options => expect(template(templateString)({ options })).toMatchSnapshot()
  )
})
