import type { UseFetchOptions } from '#app'
import { joinURL } from 'ufo'
import type { FetchError } from 'ofetch'

/**
 * Data API (REST) response
 * @see https://learn.microsoft.com/azure/data-api-builder/rest#result-set-format
 */
export type RestResult<T extends {}> = { value: T[] }

/**
 * Use Data API (preview) REST Features.
 * @param request Request Endpoint (example: `/User/id/0000` )
 * @param opts useFetch options
 * @returns useFetch object
 * @see https://learn.microsoft.com/azure/data-api-builder/rest
 */
export function useDataApiRest<T extends {}>(
  request: string,
  opts?: Omit<UseFetchOptions<RestResult<T>, T[]>, 'transform'>
): ReturnType<typeof useFetch<T[] | null>> {
  const endpoint = useRuntimeConfig().public.swa.rest
  return useFetch(joinURL(endpoint, request), {
    ...opts,
    transform: (d: RestResult<T>) => d.value,
  })
}

/**
 * Data API (GraphQL) response
 * @see https://learn.microsoft.com/azure/data-api-builder/graphql#resultset-format
 */
export type GraphQLResult<T extends {}> = { data: T }

type KeysOf<T> = Array<
  T extends T ? (keyof T extends string ? keyof T : never) : never
>
/**
 * Use Data API (preview) GraphQL Features.
 * @param key useFetch key
 * @param query GraphQL Query or Mutation
 * @param variables GraphQL variables
 * @param opts useFetch options
 * @returns useFetch object
 * @see https://learn.microsoft.com/azure/data-api-builder/graphql
 */
export function useDataApiGraphQL<T extends {}>(
  key: string,
  query: string,
  variables?: {},
  opts?: Omit<
    UseFetchOptions<GraphQLResult<T>, T, KeysOf<T>, null>,
    'body' | 'key' | 'method' | 'transform'
  >
): ReturnType<
  typeof useFetch<
    T,
    FetchError<any>,
    string,
    'post',
    GraphQLResult<T>,
    T,
    KeysOf<T>,
    null
  >
> {
  const endpoint = useRuntimeConfig().public.swa.graphql
  return useFetch(endpoint, {
    ...opts,
    key,
    method: 'POST',
    body: { query, variables },
    transform: (d: GraphQLResult<T>) => d.data,
  })
}
