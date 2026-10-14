import { getCookie, getHeader, type H3Event } from 'h3'

import { _clientPrincipalCookie, _clientPrincipalHeader } from '../../constants'
import type { ClientPrincipal, RequestEvent } from '../../types'
import { parseClientPrincipal } from '../../utils/auth'

/**
 * Get user client principal data from request.
 * @param event H3Event
 * @returns Client Principal if parsed, otherwise null.
 */
export const getClientPrincipal = (
  event: RequestEvent
): ClientPrincipal | null => {
  const header =
    getHeader(event as H3Event, _clientPrincipalHeader) ||
    getCookie(event as H3Event, _clientPrincipalCookie)
  return parseClientPrincipal(header)
}

/**
 * Returns the user sending request has any of the specified roles or not.
 * @param event H3Event
 * @param roles User roles
 * @returns true if the user has any of the specified roles; false otherwise.
 */
export const hasRole = (
  event: RequestEvent,
  ...roles: Exclude<UserRole, 'anonymous'>[]
): boolean => {
  const auth = getClientPrincipal(event)
  return !!auth?.userRoles.some(s =>
    roles.includes(s as (typeof roles)[number])
  )
}
