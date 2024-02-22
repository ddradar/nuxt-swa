<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const { data: page } = await useContentPage()
</script>

<template>
  <ContentRenderer v-if="page?.body" :value="page" />
</template>
