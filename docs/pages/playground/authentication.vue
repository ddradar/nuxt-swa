<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const { clientPrincipal } = await useEasyAuth()
const json = computed(() => JSON.stringify(clientPrincipal.value, undefined, 2))
</script>

<template>
  <div>
    Your Client Principal is:
    <pre>{{ json }}</pre>
  </div>
</template>
