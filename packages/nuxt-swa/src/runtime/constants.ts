// Azure Static Web Apps
export const _authBasePath = '/.auth'
export const _dataApiBasePath = '/data-api'
export const _clientPrincipalCookie = 'StaticWebAppsAuthCookie'
export const _clientPrincipalHeader = 'x-ms-client-principal'
export const _preConfiguredProviders = ['aad' as const, 'github' as const]
export const _knownIdentityProviders = [
  'apple',
  'facebook',
  'google',
  'twitter',
] as const

// My App
export const _authDataKey = 'swa-principal'
