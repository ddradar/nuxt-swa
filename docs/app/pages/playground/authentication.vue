<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

// Fetch page contents and surroundings
const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('docs').path(route.path).first()
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description'],
  })
})

const { clientPrincipal } = await useEasyAuth()

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description
useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

const headline = computed(() => findPageHeadline(navigation?.value, route.path))
const json = computed(() => JSON.stringify(clientPrincipal.value, undefined, 2))
const jsonWithQuote = computed(
  () =>
    `\`\`\`json
  ${JSON.stringify(clientPrincipal.value, undefined, 2)}
\`\`\``
)

defineOgImageComponent('Docs', { headline: headline.value })
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :headline="headline"
    />

    <UPageBody>
      Your Client Principal is:
      <ProsePre language="json" :code="json">{{ json }}</ProsePre>

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>
  </UPage>
</template>
