<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const toast = useToast()
const { data, error, execute } = await useFetch('/api/user', {
  immediate: false,
})
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

async function onClick() {
  await execute()
  if (error.value) {
    toast.add({
      icon: 'i-heroicons-exclamation-circle-solid',
      color: 'error',
      title: error.value.statusCode?.toString(),
      description: error.value.message,
    })
  } else {
    toast.add({ title: 'API Called', description: data.value! })
  }
}
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
      <UButton @click="onClick()">Call API</UButton>
      <ProseP>
        If you are logged in, "Hello, &lt;login provider name&gt;" will pop up,
        otherwise <ProseCode>401: Unauthorized</ProseCode> error will pop up.
      </ProseP>
    </UPageBody>
  </UPage>
</template>
