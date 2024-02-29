import {
  abortNavigation,
  defineNuxtRouteMiddleware,
  useEasyAuth,
} from '#imports'

export default defineNuxtRouteMiddleware(async to => {
  if (!to.meta.allowedRoles) return

  const roles = [to.meta.allowedRoles].flat()
  const { isLoggedIn, hasRole } = await useEasyAuth()
  if (roles.some(hasRole)) return

  return abortNavigation({ statusCode: isLoggedIn.value ? 403 : 401 })
})
