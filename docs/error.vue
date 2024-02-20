<script setup lang="ts">
import type { NuxtError } from '#app'
import type { ParsedContent, NavItem } from '@nuxt/content/dist/runtime/types'

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.',
})

defineProps<{ error: NuxtError }>()

useHead({ htmlAttrs: { lang: 'en' } })

const { data: navigation } = await useAsyncData<NavItem[]>(
  'navigation',
  () => fetchContentNavigation(),
  { default: () => [] }
)
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
  default: () => [],
  server: false,
})

provide('navigation', navigation)
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUDocsSearch :files="files" :navigation="navigation" />
    </ClientOnly>

    <UNotifications />
  </div>
</template>
