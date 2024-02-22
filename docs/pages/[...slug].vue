<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
)
</script>

<template>
  <ContentRenderer v-if="page?.body" :value="page" />
</template>
