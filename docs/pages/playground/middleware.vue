<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

definePageMeta({ layout: 'docs', allowedRoles: 'authenticated' })

const { seo } = useAppConfig()
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

// Page headline and surround
const headline = computed(() => findPageHeadline(page.value!))
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryContent()
    .where({ navigation: { $ne: false } })
    .only(['title', 'description', '_path'])
    .findSurround(withoutTrailingSlash(route.path))
)

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  title: page.value.title,
  ogTitle: `${page.value.title} - ${seo?.siteName}`,
  description: page.value.description,
  ogDescription: page.value.description,
})
</script>

<template>
  <UPage>
    <UPageHeader
      :title="page!.title"
      :description="page!.description"
      :links="page!.links"
      :headline="headline"
    />
    <UPageBody prose>
      <Callout icon="i-heroicons-lock-open-20-solid" color="blue">
        Private Page!
      </Callout>

      <hr v-if="surround?.length" />
      <UDocsSurround :surround="surround!" />
    </UPageBody>
  </UPage>
</template>
