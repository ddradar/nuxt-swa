<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const { toc, seo } = useAppConfig()
const { data: page } = await useContentPage()
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

// Page headline and surround
const headline = computed(() => findPageHeadline(page.value!))
const { data: surround } = await useContentSurround()

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  title: page.value.title,
  ogTitle: `${page.value.title} - ${seo?.siteName}`,
  description: page.value.description,
  ogDescription: page.value.description,
})

const links = computed(() =>
  [
    toc?.bottom?.edit && {
      icon: 'i-heroicons-pencil-square',
      label: 'Edit this page',
      to: `${toc.bottom.edit}/${page?.value?._file}`,
      target: '_blank',
    },
    ...(toc?.bottom?.links || []),
  ].filter(Boolean)
)
const navigation = inject<Ref<NavItem[]>>('navigation')
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UNavigationTree :links="mapContentNavigation(navigation!)" />
        </UAside>
      </template>

      <UPageHeader
        :title="page?.title"
        :description="page?.description"
        :links="page!.links"
        :headline="headline"
      />

      <UPageBody prose>
        <slot></slot>

        <hr v-if="surround?.length" />

        <UContentSurround :surround="surround!" />
      </UPageBody>

      <template v-if="page?.toc !== false" #right>
        <UContentToc :title="toc?.title" :links="page!.body?.toc?.links">
          <template v-if="toc?.bottom" #bottom>
            <div
              class="hidden lg:block space-y-6"
              :class="{ '!mt-6': page.body?.toc?.links?.length }"
            >
              <UDivider v-if="page.body?.toc?.links?.length" type="dashed" />

              <UPageLinks :title="toc.bottom.title" :links="links" />
            </div>
          </template>
        </UContentToc>
      </template>
    </UPage>
  </UContainer>
</template>
