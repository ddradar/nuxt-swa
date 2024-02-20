<script setup lang="ts">
definePageMeta({ layout: 'docs', allowedRoles: 'authenticated' })

const { headline, page, surround } = await usePageContent()
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
      <Callout icon="i-heroicons-lock-open-20-solid" color="blue">
        Private Page!
      </Callout>

      <hr v-if="surround?.length" />
      <UDocsSurround :surround="surround!" />
    </UPageBody>
  </UPage>
</template>
