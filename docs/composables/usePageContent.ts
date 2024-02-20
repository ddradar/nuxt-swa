import type { ParsedContent } from '@nuxt/content/types'
import { withoutTrailingSlash } from 'ufo'

export default async function usePageContent() {
  // Load page data from /content
  const route = useRoute()
  const { data: page } = await useAsyncData(route.path, () =>
    queryContent(route.path).findOne()
  )
  if (!page.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    })
  }

  // meta tag for SEO
  const { seo } = useAppConfig()
  useSeoMeta({
    titleTemplate: `%s - ${seo?.siteName}`,
    title: page.value.title,
    ogTitle: `${page.value.title} - ${seo?.siteName}`,
    description: page.value.description,
    ogDescription: page.value.description,
  })

  // Page headline and surround
  const headline = computed(() => findPageHeadline(page.value!))
  const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
    queryContent()
      .where({ navigation: { $ne: false } })
      .only(['title', 'description', '_path'])
      .findSurround(withoutTrailingSlash(route.path))
  )

  return { page: page as Ref<ParsedContent>, headline, surround }
}
