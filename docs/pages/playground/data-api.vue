<script setup lang="ts">
definePageMeta({ layout: 'docs' })
interface User {
  id: string
  name: string
}
interface UserByPk {
  user_by_pk: User
}

const { clientPrincipal, isLoggedIn } = await useEasyAuth()

const { data: state } = await useFetchGraphQL(
  `/users/${clientPrincipal.value?.userId}`,
  /* GraphQL */ `
    query ($id: String!) {
      user_by_pk(id: $id) {
        id
        name
      }
    }
  `,
  { id: clientPrincipal.value?.userId },
  {
    transform: (d: GraphQLResult<UserByPk | null>) =>
      d?.data?.user_by_pk ?? { id: clientPrincipal.value?.userId, name: '' },
    default: () => ({ id: clientPrincipal.value?.userId, name: '' }),
  }
)

const { execute: onSubmit } = useFetchGraphQL(
  `post/users/${clientPrincipal.value?.userId}`,
  /* GraphQL */ `
    mutation ($id: String!, $name: String!) {
      updateUser(id: $id, item: { name: $name }) {
        id
        name
      }
    }
  `,
  state,
  { server: false, immediate: false }
)
</script>

<template>
  <UForm :state="state" @submit="onSubmit">
    <Callout
      v-if="!isLoggedIn"
      icon="i-heroicons-lock-closed-20-solid"
      color="amber"
    >
      This sample needs to login.
    </Callout>
    <UFormGroup label="Name">
      <UInput :disabled="!isLoggedIn" @v-model="state.name"></UInput>

      <UButton type="submit" :disabled="!isLoggedIn">Submit</UButton>
    </UFormGroup>
  </UForm>
</template>
