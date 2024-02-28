import type { NavItem, ParsedContent } from '@nuxt/content/dist/runtime/types'
import { withoutTrailingSlash } from 'ufo'

export function useContentNavigation() {
  return useAsyncData<NavItem[]>('navigation', () => fetchContentNavigation(), {
    default: () => [],
  })
}

export function useContentPage() {
  const route = useRoute()
  return useAsyncData(route.path, () => queryContent(route.path).findOne())
}

export function useContentSurround() {
  const route = useRoute()
  return useAsyncData(`${route.path}-surround`, () =>
    queryContent()
      .where({ _partial: false, navigation: { $ne: false } })
      .only(['title', 'description', '_path'])
      .findSurround(withoutTrailingSlash(route.path))
  )
}
export function useLazyContentSearch() {
  return useLazyFetch<ParsedContent[]>('/api/search.json', {
    default: () => [],
    server: false,
  })
}
