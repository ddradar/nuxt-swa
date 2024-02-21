export default defineEventHandler(event => {
  const clientPrincipal = getClientPrincipal(event)
  if (!clientPrincipal) {
    sendError(event, createError({ statusCode: 401, message: 'Need Login' }))
    return
  }

  const platform =
    clientPrincipal.identityProvider === 'github'
      ? 'GitHub'
      : 'Microsoft Entra ID'
  return `Hello, ${platform} User!`
})
