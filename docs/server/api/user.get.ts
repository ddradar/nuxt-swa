import { defineEventHandler, createError } from 'nuxt/server'

export default defineEventHandler(event => {
  const clientPrincipal = getClientPrincipal(event)
  if (!clientPrincipal)
    throw createError({ statusCode: 401, message: 'Need Login' })

  const platform =
    clientPrincipal.identityProvider === 'github'
      ? 'GitHub'
      : 'Microsoft Entra ID'
  return `Hello, ${platform} User!`
})
