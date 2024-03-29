import type { $Fetch } from 'nitropack'
import type { FetchError } from 'ofetch'
import { joinURL } from 'ufo'
import { computed, type MaybeRef, toRef } from 'vue'

import {
  type AsyncData,
  useFetch,
  type UseFetchOptions,
  useRuntimeConfig,
} from '#app'

/**
 * Use Azure Static Web Apps Data API Feature (preview).
 * @returns `$fetch` object pre-configured for Data API
 */
export const useDataApi = (): {
  /** `$fetch` object pre-configured for GraphQL API */
  $graphql: $Fetch
  /** `$fetch` object pre-configured for REST API */
  $rest: $Fetch
} => {
  const { graphql, rest } = useRuntimeConfig().public.swa
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
export const useFetchRest = <
  SchemaT,
  DataT = SchemaT[],
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = null,
>(
  request: MaybeRef<string>,
  opts?: UseFetchOptions<RestResult<SchemaT>, DataT, PickKeys, DefaultT>
): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, FetchError | null> => {
  const endpoint = useRuntimeConfig().public.swa.rest
  const requestRef = toRef(request)
  const computedUrl = computed(() => joinURL(endpoint, requestRef.value))
  return useFetch(computedUrl, {
    transform: (d: RestResult<SchemaT>) => d.value as DataT,
    ...opts,
  })
}

/**
 * Use fetch from/to Azure Static Web Apps Data API (GraphQL).
 * @param key `useFetch` key
 * @param query GraphQL Query or Mutation
 * @param variables GraphQL variables
 * @param opts `useFetch` options (except `body`, `key`, and `method`)
 * @returns` useFetch` object
 * @see https://learn.microsoft.com/azure/data-api-builder/graphql
 */
export const useFetchGraphQL = <
  SchemaT,
  DataT = SchemaT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = null,
>(
  key: string,
  query: string,
  variables?: MaybeRef<Record<string, never>>,
  opts?: Omit<
    UseFetchOptions<GraphQLResult<SchemaT>, DataT, PickKeys, DefaultT>,
    'body' | 'key' | 'method'
  >
): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, FetchError | null> => {
  const endpoint = useRuntimeConfig().public.swa.graphql
  const variablesRef = toRef(variables)

  return useFetch<
    GraphQLResult<SchemaT>,
    FetchError,
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
    transform: (d: GraphQLResult<SchemaT>) => d.data as unknown as DataT,
    ...opts,
  })
}

/** Port from nuxt runtime */
type KeysOf<T> = Array<
  T extends T ? (keyof T extends string ? keyof T : never) : never
>
/** Port from nuxt runtime */
/* eslint-disable @typescript-eslint/no-explicit-any */
type PickFrom<T, K extends Array<string>> =
  T extends Array<any>
    ? T
    : T extends Record<string, any>
      ? keyof T extends K[number]
        ? T
        : K[number] extends never
          ? T
          : Pick<T, K[number]>
      : T
/* eslint-enable @typescript-eslint/no-explicit-any */
