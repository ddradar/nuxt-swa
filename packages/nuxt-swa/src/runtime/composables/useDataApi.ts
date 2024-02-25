import type { UseFetchOptions } from '#app'
import type { $Fetch } from 'nitropack'
import type { FetchError } from 'ofetch'
import { joinURL } from 'ufo'
import type { MaybeRef } from 'vue'

/**
 * Use Azure Static Web Apps Data API Feature (preview).
 * @returns `$fetch` object pre-configured for Data API
 */
export function useDataApi(): {
  /** `$fetch` object pre-configured for GraphQL API */
  $graphql: $Fetch
  /** `$fetch` object pre-configured for REST API */
  $rest: $Fetch
} {
  const { graphql, rest } = useRuntimeConfig().public.swa
  console.info(useRequestHeaders())
  return {
    $graphql: $fetch.create({ baseURL: graphql, method: 'POST' }),
    $rest: $fetch.create({ baseURL: rest }),
  }
}

/**
 * Use fetch from/to Azure Static Web Apps Data API (REST).
 * @param request Request Endpoint (example: `/User/id/0000` )
 * @param opts `useFetch` options
 * @returns useFetch object
 * @see https://learn.microsoft.com/azure/data-api-builder/rest
 */
export function useFetchRest<T extends {}>(
  request: MaybeRef<string>,
  opts?: Omit<UseFetchOptions<RestResult<T>, T[]>, 'transform'>
): ReturnType<typeof useFetch<T[] | null>> {
  const endpoint = useRuntimeConfig().public.swa.rest
  const requestRef = toRef(request)
  const computedUrl = computed(() => joinURL(endpoint, requestRef.value))
  return useFetch(computedUrl, {
    ...opts,
    transform: (d: RestResult<T>) => d.value,
  })
}

type KeysOf<T> = Array<
  T extends T ? (keyof T extends string ? keyof T : never) : never
>
/**
 * Use fetch from/to Azure Static Web Apps Data API (GraphQL).
 * @param key `useFetch` key
 * @param query GraphQL Query or Mutation
 * @param variables GraphQL variables
 * @param opts `useFetch` options (except `body`, `key`, and `method`)
 * @returns` useFetch` object
 * @see https://learn.microsoft.com/azure/data-api-builder/graphql
 */
export function useFetchGraphQL<
  SchemaT extends {},
  DataT = SchemaT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = DataT,
>(
  key: string,
  query: string,
  variables?: MaybeRef<{}>,
  opts?: Omit<
    UseFetchOptions<GraphQLResult<SchemaT>, DataT, PickKeys, DefaultT>,
    'body' | 'key' | 'method'
  >
): ReturnType<
  typeof useFetch<
    GraphQLResult<SchemaT>,
    FetchError<any>,
    string,
    'post',
    GraphQLResult<SchemaT>,
    DataT,
    PickKeys,
    DefaultT
  >
> {
  const endpoint = useRuntimeConfig().public.swa.graphql
  const variablesRef = toRef(variables)

  return useFetch<
    GraphQLResult<SchemaT>,
    FetchError<any>,
    string,
    'POST',
    GraphQLResult<SchemaT>,
    DataT,
    PickKeys,
    DefaultT
  >(endpoint, {
    key,
    method: 'POST',
    body: { query, variables: variablesRef.value },
    transform: (d: GraphQLResult<SchemaT>) => d.data as any,
    ...opts,
  })
}
