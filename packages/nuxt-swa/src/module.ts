import {
  addImports,
  addRouteMiddleware,
  addServerHandler,
  addServerImports,
  addTypeTemplate,
  createResolver,
  defineNuxtModule,
  useLogger,
} from '@nuxt/kit'
import { defu } from 'defu'
import { joinURL } from 'ufo'

import { defaults, resolveAuthProviders } from './config'

const packageName = 'nuxt-swa'
const authEndpoint = '/.auth'
const dataApiEndpoint = '/data-api'

export default defineNuxtModule({
  meta: {
    name: packageName,
    configKey: 'swa',
    compatibility: {
      nuxt: '^3.9.0',
    },
  },
  defaults,
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const logger = useLogger(packageName)

    const preset = nuxt.options.nitro?.preset
    if (preset !== 'azure')
      logger.warn(
        `\`nitro.preset\` in your \`nuxt.config.ts\` file is ${preset ? `"${preset}"` : preset}.\nConsider set it to "azure".`
      )

    if (!nuxt.options.nitro?.azure?.config)
      logger.warn(
        '`nitro.azure.config` in your `nuxt.config.ts` file is undefined.\nIf you are using `staticwebapp.config.json`, consider migrating that configuration.'
      )

    if (options.authProviders === undefined)
      options.authProviders = resolveAuthProviders(
        nuxt.options.nitro?.azure?.config
      )

    // Core Type definition
    addTypeTemplate({
      filename: `types/${packageName}.d.ts`,
      src: resolve('runtime/types/nuxt-swa.d.ts.template'),
      options,
    })
    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: `types/${packageName}.d.ts` })
      references.push({ path: resolve('./runtime/types.d.ts') })
    })

    // Proxy Azure SWA built-in API
    addServerHandler({
      route: `${dataApiEndpoint}/**`,
      handler: resolve('./runtime/server/proxy'),
    })
    addServerHandler({
      route: `${authEndpoint}/**`,
      handler: resolve('./runtime/server/proxy'),
    })

    // Auth Feature
    if (options.authProviders.length) {
      addImports({
        name: 'useEasyAuth',
        from: resolve('runtime/composables/useEasyAuth'),
      })
      addRouteMiddleware({
        name: 'auth',
        path: resolve('runtime/middleware/auth'),
        global: true,
      })
      addServerImports(
        ['getClientPrincipal', 'hasRole'].map(name => ({
          name,
          from: resolve('runtime/server/utils/auth'),
        }))
      )
    }

    // Data API feature
    if (options.dataApi) {
      nuxt.options.runtimeConfig.public.swa = defu(
        nuxt.options.runtimeConfig.public.swa,
        {
          rest: joinURL(dataApiEndpoint, options.dataApi.rest),
          graphql: joinURL(dataApiEndpoint, options.dataApi.graphql),
        }
      )
      addImports(
        ['useDataApi', 'useFetchRest', 'useFetchGraphQL'].map(name => ({
          name,
          from: resolve('runtime/composables/useDataApi'),
        }))
      )
    }
  },
})

declare module 'nitropack' {
  interface NitroOptions {
    azure?: { config?: AzureStaticWebAppsConfig }
  }

  /** Documentation: https://aka.ms/swa/config-schema */
  interface AzureStaticWebAppsConfig {
    /** Route definitions to modify routing behavior */
    routes?: Route[]
    /** A default file to return if the request does not match a resource */
    navigationFallback?: {
      /** The default file to return if the request does not match a resource */
      rewrite: string
      /** Paths to exclude from the fallback route. May use valid wildcards. https://aka.ms/swa/config-schema */
      exclude?: unknown[]
      [k: string]: unknown
    }
    /** Custom error pages or redirects */
    responseOverrides?: {
      [k: string]: {
        /**
         * Redirect to a relative or absolute path, or an external URI.
         * Default status code is 302, override with 301.
         */
        redirect?: string
        /** Status code */
        statusCode?: number
        /** A path to rewrite the request route to */
        rewrite?: string
        [k: string]: unknown
      }
    }
    /** Custom mime types configuration */
    mimeTypes?: { [k: string]: string }
    /** Default headers to set on all responses */
    globalHeaders?: { [k: string]: unknown }
    auth?: Auth
    /** Networking configuration */
    networking?: {
      /**
       * Restrict access to one or more IPv4 ranges.
       * Supports CIDR notation (e.g., "192.168.100.14/24")
       */
      allowedIpRanges?: string[]
      [key: string]: unknown
    }
    /** Forwarding gateway configuration */
    forwardingGateway?: {
      /** The value of `X-Forwarded-Host` to allow to be used when generating redirect URLs */
      allowedForwardedHosts?: string[]
      /** HTTP header name/value pairs that are required for access */
      requiredHeaders?: { [k: string]: unknown }
      [key: string]: unknown
    }
    /** Platform configuration */
    platform?: {
      /** Language runtime for the managed functions API */
      apiRuntime?: 'node:12' | 'node:14' | 'node:16' | 'node:18' | 'node:20'
      [key: string]: unknown
    }
    /** Trailing slash configuration */
    trailingSlash?: 'always' | 'never' | 'auto'
  }

  interface Route {
    /**
     * Request route pattern to match. May contain valid wildcards.
     * @see https://aka.ms/swa/config-schema
     */
    route: string
    /** Request method(s) to match */
    methods?: (
      | 'GET'
      | 'HEAD'
      | 'POST'
      | 'PUT'
      | 'DELETE'
      | 'PATCH'
      | 'CONNECT'
      | 'OPTIONS'
      | 'TRACE'
    )[]
    /**
     * Roles that are allowed to access this route.
     * If not empty, only role(s) listed are authorized to access the route.
     * Roles are only used for authorization; they are not used to evaluate whether the route matches the request.
     */
    allowedRoles?: UserRole[]
    /** Override any matching global headers */
    headers?: { [k: string]: unknown }
    /**
     * Redirect to a relative or absolute path, or an external URI.
     * Default status code is 302, override with 301.
     */
    redirect?: string
    /** Status code override */
    statusCode?: number
    /** A path to rewrite the request route to */
    rewrite?: string
  }

  interface Auth {
    /**
     * Route to API function for assigning roles. For example, "/api/GetRoles".
     * @see https://aka.ms/swa-roles-function
     */
    rolesSource?: string
    identityProviders: {
      azureActiveDirectory?: {
        /** `false` if the azureActiveDirectory provider is not enabled, `true` otherwise */
        enabled?: boolean
        registration: {
          /** The endpoint for the OpenID configuration of the AAD tenant */
          openIdIssuer: string
          /** The name of the application setting containing the Application (client) ID for the Azure AD app registration */
          clientIdSettingName?: string
          /** The name of the application setting containing the client secret for the Azure AD app registration */
          clientSecretSettingName: string
        }
        login?: { loginParameters?: string[] }
        /** The name of the claim from which we should read user details */
        userDetailsClaim?: string
        [k: string]: unknown
      }
      apple?: {
        /** `false` if the apple provider is not enabled, `true` otherwise */
        enabled?: boolean
        registration: {
          /** The name of the application setting containing the Client ID */
          clientIdSettingName?: string
          /** The name of the application setting containing the Client Secret */
          clientSecretSettingName: string
        }
        login?: { scopes?: string[] }
        /** The name of the claim from which we should read user details */
        userDetailsClaim?: string
        [k: string]: unknown
      }
      facebook?: {
        /** `false` if the facebook provider is not enabled, `true` otherwise */
        enabled?: boolean
        registration: {
          /** The name of the application setting containing the App ID */
          appIdSettingName?: string
          /** The name of the application setting containing the App Secret */
          appSecretSettingName: string
        }
        login?: { scopes?: string[] }
        /** The name of the claim from which we should read user details */
        userDetailsClaim?: string
        [k: string]: unknown
      }
      github?: {
        /** `false` if the gitHub provider is not enabled, `true` otherwise */
        enabled?: boolean
        registration: {
          /** The name of the application setting containing the Client ID */
          clientIdSettingName?: string
          /** The name of the application setting containing the Client Secret */
          clientSecretSettingName: string
        }
        login?: { scopes?: string[] }
        /** The name of the claim from which we should read user details */
        userDetailsClaim?: string
        [k: string]: unknown
      }
      google?: {
        /** `false` if the google provider is not enabled, `true` otherwise */
        enabled?: boolean
        registration: {
          /** The name of the application setting containing the Client ID */
          clientIdSettingName?: string
          /** The name of the application setting containing the Client Secret */
          clientSecretSettingName: string
        }
        login?: { scopes?: string[] }
        /** The name of the claim from which we should read user details */
        userDetailsClaim?: string
        [k: string]: unknown
      }
      twitter?: {
        /** `false` if the twitter provider is not enabled, `true` otherwise */
        enabled?: boolean
        registration: {
          /** The name of the application setting containing the Consumer Key */
          consumerKeySettingName?: string
          /** The name of the application setting containing the Consumer Secret */
          consumerSecretSettingName: string
        }
        /** The name of the claim from which we should read user details */
        userDetailsClaim?: string
        [k: string]: unknown
      }
      customOpenIdConnectProviders?: {
        [k: string]: {
          /** `false` if the custom OpenID Connect provider is not enabled, `true` otherwise */
          enabled?: boolean
          registration: {
            /** The name of the application setting containing the Client ID */
            clientIdSettingName?: string
            clientCredential: {
              /** The name of the application setting containing the Client Secret */
              clientSecretSettingName: string
              [k: string]: unknown
            }
            openIdConnectConfiguration: {
              /** The path to the authorization endpoint */
              authorizationEndpoint?: string
              /** The path to the token endpoint */
              tokenEndpoint?: string
              /** The path to the issuer endpoint */
              issuer?: string
              /** The path to the jwks uri */
              certificationUri?: string
              /** The path to the well known configuration endpoint */
              wellKnownOpenIdConfiguration?: string
              [k: string]: unknown
            }
          }
          login: {
            nameClaimType?: string
            scopes?: string[]
            loginParameterNames?: string[]
            [k: string]: unknown
          }
          [k: string]: unknown
        }
      }
      [k: string]: unknown
    }
  }
}
