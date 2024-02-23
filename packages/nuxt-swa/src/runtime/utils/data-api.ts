import { joinURL } from 'ufo'

import type { GraphQLResult, RestResult } from '../composables/useDataApi'

/**
 * Call Data API (REST).
 * @param type API type "REST"
 * @param request Request Endpoint
 * @param opts `$fetch` options
 */
export function $dataApi<T extends {}>(
  type: 'rest',
  request: string,
  opts?: Parameters<typeof $fetch<RestResult<T>>>[1]
): Promise<RestResult<T>>

/**
 * Call Data API (GraphQL).
 * @param type API type "GraphQL"
 * @param query GraphQL query
 * @param opts `$fetch` options
 * @param variables GraphQL variables
 */
export function $dataApi<T extends {}>(
  type: 'graphql',
  query: string,
  opts?: Parameters<typeof $fetch<GraphQLResult<T>>>[1],
  variables?: {}
): Promise<GraphQLResult<T>>

/**
 * Call Data API.
 * @param type API type (REST or GraphQL)
 * @param requestOrQuery Request Endpoint (REST) or GraphQL query
 * @param opts `$fetch` options
 * @param variables GraphQL variables
 */
export function $dataApi<T extends {}>(
  type: 'rest' | 'graphql',
  requestOrQuery: string,
  opts?: Parameters<typeof $fetch<RestResult<T> | GraphQLResult<T>>>[1],
  variables?: {}
) {
  if (type === 'rest') {
    const endpoint = useRuntimeConfig().public.swa.rest
    return $fetch<RestResult<T>>(joinURL(endpoint, requestOrQuery), opts)
  }
  const endpoint = useRuntimeConfig().public.swa.graphql
  return $fetch<GraphQLResult<T>>(endpoint, {
    ...opts,
    method: 'POST',
    body: { query: requestOrQuery, variables },
  })
}
