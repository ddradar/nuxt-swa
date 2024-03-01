import { getHeader, type H3Event } from 'h3'
import { joinURL } from 'ufo'

import {
  _apiRoleHeader,
  _clientPrincipalHeader,
  _originalUrlHeader,
} from '../../constants'

type RestResult<T> = { value: T[] }
/**
 * Call Data API (REST) from server.
 * @param event H3Event
 * @param path REST API path (ex. /Users/)
 * @param opts $fetch options
 * @param role Custom role that required to call your API
 */
export const $rest = <T>(
  event: H3Event,
  path: string,
  opts?: Parameters<typeof $fetch>[1],
  role?: Exclude<string, 'anonymous' | 'authenticated'>
) => {
  const endpoint = useRuntimeConfig(event).public.swa.rest
  return $fetch<RestResult<T>>(joinURL(endpoint, path), {
    ...opts,
    headers: {
      ...opts?.headers,
      [_originalUrlHeader]: getHeader(event, _originalUrlHeader)!,
      [_clientPrincipalHeader]: getHeader(event, _clientPrincipalHeader)!,
      [_apiRoleHeader]: role!,
    },
  })
}

type GraphQLResult<T> = { data: T }
/**
 * Call Data API (GraphQL) from server.
 * @param event H3Event
 * @param query GraphQL query
 * @param variables GraphQL variables
 * @param opts $fetch options
 * @param role Custom role that required to call your API
 */
export const $graphQL = <T>(
  event: H3Event,
  query: string,
  variables?: {},
  opts?: Parameters<typeof $fetch>[1],
  role?: Exclude<string, 'anonymous' | 'authenticated'>
) => {
  const endpoint = useRuntimeConfig(event).public.swa.graphql
  return $fetch<GraphQLResult<T>>(endpoint, {
    ...opts,
    method: 'POST',
    body: { query, variables },
    headers: {
      ...opts?.headers,
      [_originalUrlHeader]: getHeader(event, _originalUrlHeader)!,
      [_clientPrincipalHeader]: getHeader(event, _clientPrincipalHeader)!,
      [_apiRoleHeader]: role!,
    },
  })
}
