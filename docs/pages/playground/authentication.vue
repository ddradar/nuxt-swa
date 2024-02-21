<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

definePageMeta({ layout: 'docs' })

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

// Playground Block
const { clientPrincipal } = await useEasyAuth()
const json = computed(() => JSON.stringify(clientPrincipal.value, undefined, 2))
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
      <div>
        Your Client Principal is:
        <pre>{{ json }}</pre>
      </div>

      <hr v-if="surround?.length" />
      <UDocsSurround :surround="surround!" />
    </UPageBody>
  </UPage>
</template>
