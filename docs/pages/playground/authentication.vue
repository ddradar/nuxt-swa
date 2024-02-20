<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const { headline, page, surround } = await usePageContent()

// Playground Block
const { isLoggedIn, clientPrincipal } = await useEasyAuth()
const json = computed(() => JSON.stringify(clientPrincipal.value, undefined, 2))
</script>

<template>
  <UPage>
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :links="page.links"
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
