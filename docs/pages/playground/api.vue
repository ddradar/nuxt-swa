<script setup lang="ts">
definePageMeta({ layout: 'docs' })

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
  <div>
    <UButton @click="onClick()">Call API</UButton>
    <p>
      If you are logged in, "Hello, &lt;login provider name&gt;" will pop up,
      otherwise <code>401: Unauthorized</code> error will pop up.
    </p>
  </div>
</template>
