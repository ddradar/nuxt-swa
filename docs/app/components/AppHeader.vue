<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { header } = useAppConfig()
const { isLoggedIn, login, logout } = await useEasyAuth()

const items = [
  {
    label: 'Login via GitHub',
    icon: 'i-simple-icons-github',
    onSelect: () => login('github'),
  },
  {
    label: 'Login via Azure AD',
    icon: 'i-simple-icons-microsoftazure',
    onSelect: () => login('aad'),
  },
]
</script>

<template>
  <UHeader :ui="{ center: 'flex-1' }" :to="header?.to || '/'" title="Nuxt SWA">
    <UContentSearchButton
      v-if="header?.search"
      :collapsed="false"
      class="w-full"
    />

    <template
      v-if="header?.logo?.dark || header?.logo?.light || header?.title"
      #title
    >
      <UColorModeImage
        v-if="header?.logo?.dark || header?.logo?.light"
        :light="header?.logo?.light!"
        :dark="header?.logo?.dark!"
        :alt="header?.logo?.alt"
        class="h-6 w-auto shrink-0"
      />

      <span v-else-if="header?.title">
        {{ header.title }}
      </span>
    </template>

    <template #right>
      <UContentSearchButton v-if="header?.search" class="lg:hidden" />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>

      <UButton v-if="isLoggedIn" @click="logout()">Logout</UButton>
      <UDropdownMenu v-else :items="items">
        <UButton>Login</UButton>
      </UDropdownMenu>
    </template>

    <template #body>
      <UContentNavigation highlight :navigation="navigation" />
    </template>
  </UHeader>
</template>
