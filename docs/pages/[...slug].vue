<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const { headline, page, surround } = await usePageContent()
const { toc } = useAppConfig()

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
</script>

<template>
  <UPage>
    <UPageHeader
      :title="page?.title"
      :description="page?.description"
      :links="page!.links"
      :headline="headline"
    />

    <UPageBody prose>
      <ContentRenderer v-if="page?.body" :value="page" />

      <hr v-if="surround?.length" />

      <UDocsSurround :surround="surround!" />
    </UPageBody>

    <template v-if="page?.toc !== false" #right>
      <UDocsToc :title="toc?.title" :links="page!.body?.toc?.links">
        <template v-if="toc?.bottom" #bottom>
          <div
            class="hidden lg:block space-y-6"
            :class="{ '!mt-6': page.body?.toc?.links?.length }"
          >
            <UDivider v-if="page.body?.toc?.links?.length" type="dashed" />

            <UPageLinks :title="toc.bottom.title" :links="links" />
          </div>
        </template>
      </UDocsToc>
    </template>
  </UPage>
</template>
