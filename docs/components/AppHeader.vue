<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import type { DropdownItem } from '#ui/types'

const navigation = inject<NavItem[]>('navigation', [])
const { header } = useAppConfig()
const { isLoggedIn, login, logout } = await useEasyAuth()

const items: DropdownItem[][] = [
  [
    {
      label: 'Login via GitHub',
      icon: 'i-simple-icons-github',
      click: () => login('github'),
    },
    {
      label: 'Login via Azure AD',
      icon: 'i-simple-icons-microsoftazure',
      click: () => login('aad'),
    },
  ],
]
</script>

<template>
  <UHeader>
    <template #logo>
      Nuxt SWA <UBadge label="Docs" variant="subtle" class="mb-0.5" />
    </template>

    <template v-if="header?.search" #center>
      <UDocsSearchButton class="hidden lg:flex" />
    </template>

    <template #right>
      <UDocsSearchButton v-if="header?.search" class="lg:hidden" />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'gray', variant: 'ghost', ...link }"
        />
      </template>

      <UButton v-if="isLoggedIn" @click="logout()">Logout</UButton>
      <UDropdown v-else :items="items">
        <UButton>Login</UButton>
      </UDropdown>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
</template>
