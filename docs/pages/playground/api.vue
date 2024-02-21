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
const toast = useToast()
const { data, error, execute } = await useFetch('/api/user', {
  immediate: false,
})
async function onClick() {
  await execute()
  if (error.value) {
    toast.add({
      icon: 'i-heroicons-exclamation-circle-solid',
      color: 'red',
      title: error.value.statusCode?.toString(),
      description: error.value.message,
    })
  } else {
    toast.add({ title: 'API Called', description: data.value! })
  }
}
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
      <UButton @click="onClick()">Call API</UButton>
      <p>
        If you are logged in, "Hello, &lt;login provider name&gt;" will pop up,
        otherwise <code>401: Unauthorized</code> error will pop up.
      </p>

      <hr v-if="surround?.length" />
      <UDocsSurround :surround="surround!" />
    </UPageBody>
  </UPage>
</template>
