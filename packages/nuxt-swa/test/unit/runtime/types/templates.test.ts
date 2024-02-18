import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { template } from 'lodash'
import { describe, expect, it } from 'vitest'

import { defaults, type SWAModuleOptions } from '~/src/module'

describe('runtime/types', () => {
  const minimumOptions: SWAModuleOptions = {
    authProviders: [],
    customRoles: [],
  }
  const fullOptions: SWAModuleOptions = {
    authProviders: ['github', 'twitter', 'line'],
    customRoles: ['administrator'],
  }
  describe.each(['UserRole.d.ts.template', 'IdentityProvider.d.ts.template'])(
    '%s',
    async file => {
      const pathes = [__dirname, '../../../../', 'src/runtime/types', file]
      const templateString = await readFile(resolve(...pathes), {
        encoding: 'utf-8',
      })

      it.each([defaults, minimumOptions, fullOptions])(
        '%o renders expected Type Definition',
        options =>
          expect(template(templateString)({ options })).toMatchSnapshot()
      )
    }
  )
})
