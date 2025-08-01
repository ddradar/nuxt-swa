<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({ layout: 'docs', allowedRoles: 'authenticated' })

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

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description
useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

const headline = computed(() => findPageHeadline(navigation?.value, route.path))

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
      <UAlert icon="i-lucide-lock-open" title="Private Page!" />

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>
  </UPage>
</template>
