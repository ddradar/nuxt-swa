import { getCookie } from 'nuxt/server'

import { _clientPrincipalCookie, _clientPrincipalHeader } from '../../constants'
import type {
  ClientPrincipal,
  RequestEvent,
  NuxtRequestEvent,
} from '../../types'
import { parseClientPrincipal } from '../../utils/auth'

/**
 * Get user client principal data from request.
 * @param event RequestEvent
 * @returns Client Principal if parsed, otherwise null.
 */
export const getClientPrincipal = (
  event: Pick<RequestEvent, 'req'>
): ClientPrincipal | null => {
  const header =
    (event as NuxtRequestEvent).req.headers.get(_clientPrincipalHeader) ||
    getCookie(event as NuxtRequestEvent, _clientPrincipalCookie)
  return parseClientPrincipal(header)
}

/**
 * Returns the user sending request has any of the specified roles or not.
 * @param event RequestEvent
 * @param roles User roles
 * @returns true if the user has any of the specified roles; false otherwise.
 */
export const hasRole = (
  event: Pick<RequestEvent, 'req'>,
  ...roles: Exclude<UserRole, 'anonymous'>[]
): boolean => {
  const auth = getClientPrincipal(event)
  return !!auth?.userRoles.some(s =>
    roles.includes(s as (typeof roles)[number])
  )
}
