import type { UseFetchOptions } from '#app'
import { joinURL } from 'ufo'
/**
 * Data API (REST) response
 * @see https://learn.microsoft.com/azure/data-api-builder/rest#result-set-format
 */
type RestResult<T extends {}> = { value: T[] }

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
type GraphQLResult<T extends {}> = { data: T }

export function useDataApiGraphQL<T extends {}>(
  key: string,
  query: string,
  variables?: {},
  opts?: Omit<
    UseFetchOptions<GraphQLResult<T>, T>,
    'body' | 'key' | 'pick' | 'transform'
  >
) {
  const endpoint = useRuntimeConfig().public.swa.graphql
  return useFetch(endpoint, {
    ...opts,
    key,
    method: 'POST',
    body: { query, variables },
    transform: (d: GraphQLResult<T> | null) => d?.data ?? null,
  })
}
