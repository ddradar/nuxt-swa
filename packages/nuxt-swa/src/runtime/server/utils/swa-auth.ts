import { type H3Event, getHeader } from 'h3'

import { _clientPrincipalHeader } from '../../constants'
import { parseClientPrincipal } from '../../utils'
import type { ClientPrincipal } from '../../composables/useEasyAuth'

/**
 * Get user client principal data from request.
 * @param event H3Event
 * @returns Client Principal if parsed, otherwise null.
 */
export function getClientPrincipal(event: H3Event): ClientPrincipal | null {
  const header = getHeader(event, _clientPrincipalHeader)
  return parseClientPrincipal(header)
}

/**
 * Returns the user sending request has any of the specified roles or not.
 * @param event H3Event
 * @param roles User roles
 * @returns true if the user has any of the specified roles; false otherwise.
 */
export function hasRole(
  event: H3Event,
  ...roles: Exclude<UserRole, 'anonymous'>[]
): boolean {
  const auth = getClientPrincipal(event)
  return !!auth?.userRoles.some(s =>
    roles.includes(s as (typeof roles)[number])
  )
}
