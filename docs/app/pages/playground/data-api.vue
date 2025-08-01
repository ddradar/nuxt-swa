<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

interface User {
  id: string | null
  name: string
}
const getUserGql = /* GraphQL */ `
  query ($id: String!) {
    user_by_pk(id: $id) {
      id
      name
    }
  }
`

definePageMeta({ layout: 'docs' })

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

// Fetch page contents and surroundings
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
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description'],
  })
})

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

const { clientPrincipal, isLoggedIn } = await useEasyAuth()
const { $graphql } = useDataApi()
const {
  data: state,
  refresh,
  status,
} = await useFetchGraphQL(
  `/users/${clientPrincipal.value?.userId}`,
  getUserGql,
  { id: clientPrincipal.value?.userId },
  {
    transform: (d: GraphQLResult<{ user_by_pk: User } | null>): User =>
      d?.data?.user_by_pk ?? { id: null, name: '' },
    default: (): User => ({ id: null, name: '' }),
  }
)

const submitting = ref(false)
const canExecute = computed(
  () => isLoggedIn.value && status.value === 'success' && !submitting.value
)
const onSubmit = async () => {
  if (!canExecute.value) {
    return
  }

  submitting.value = true

  const variables = {
    id: clientPrincipal.value!.userId,
    name: state.value.name,
  }
  if (state.value.id) {
    // Update
    await $graphql('/', {
      body: {
        query: /* GraphQL */ `
          mutation ($id: String!, $name: String!) {
            updateUser(id: $id, item: { name: $name }) {
              id
              name
            }
          }
        `,
        variables,
      },
    })
  } else {
    // Create
    await $graphql('/', {
      body: {
        query: /* GraphQL */ `
          mutation ($id: String!, $name: String!) {
            createUser(item: { id: $id, name: $name }) {
              id
              name
            }
          }
        `,
        variables,
      },
    })
  }

  await refresh()
  submitting.value = false
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
      <UAlert
        v-if="!isLoggedIn"
        icon="i-lucide-lock"
        color="warning"
        title="Login Required"
      />
      <ProseP v-else>Store your name via Data API.</ProseP>
      <UForm :state="state" @submit="onSubmit">
        <UFormField label="Name">
          <UInput v-model="state.name" :disabled="!isLoggedIn" />

          <UButton type="submit" :disabled="!canExecute">Submit</UButton>
        </UFormField>
      </UForm>

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>
  </UPage>
</template>
