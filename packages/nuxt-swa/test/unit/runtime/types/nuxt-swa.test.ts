import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { template } from 'lodash'
import { describe, expect, it } from 'vitest'

import { defaults, type SWAModuleOptions } from '~/src/config'

describe('runtime/types/nuxt-swa.d.ts.template', async () => {
  const minimumOptions: SWAModuleOptions = {
    authProviders: [],
    customRoles: [],
  }
  const fullOptions: SWAModuleOptions = {
    authProviders: ['github', 'twitter', 'line'],
    customRoles: ['administrator'],
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

  it.each([defaults, minimumOptions, fullOptions])(
    '%o renders expected Type Definition',
    options => expect(template(templateString)({ options })).toMatchSnapshot()
  )
})
