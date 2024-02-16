<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

definePageMeta({ layout: 'docs' })

const { seo } = useAppConfig()
const { data: page } = await useAsyncData('/playground/authentication', () =>
  queryContent('/playground/authentication').findOne()
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const { data: surround } = await useAsyncData(
  `/playground/authentication-surround`,
  () =>
    queryContent()
      .where({ _extension: 'md', navigation: { $ne: false } })
      .only(['title', 'description', '_path'])
      .findSurround(withoutTrailingSlash('/playground/authentication'))
)
useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  title: page.value.title,
  ogTitle: `${page.value.title} - ${seo?.siteName}`,
  description: page.value.description,
  ogDescription: page.value.description,
})
const headline = computed(() => findPageHeadline(page.value!))

// Playground Block
const { isLoggedIn, clientPrincipal } = await useEasyAuth()
const json = computed(() => JSON.stringify(clientPrincipal.value, undefined, 2))
</script>

<template>
  <UPage>
    <UPageHeader
      :title="page?.title"
      :description="page?.description"
      :links="page?.links"
      :headline="headline"
    />
    <UPageBody prose>
      <UAlert
        v-if="!isLoggedIn"
        icon="i-heroicons-lock-closed-solid"
        title="You are not logged in. After logging in, ClientPrincipal information will be displayed below."
      />
      <pre>{{ json }}</pre>

      <hr v-if="surround?.length" />
      <UDocsSurround :surround="surround!" />
    </UPageBody>
  </UPage>
</template>
