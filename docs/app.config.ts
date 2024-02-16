export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'slate',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
      },
    },
  },
  seo: {
    siteName: 'Nuxt SWA',
  },
  header: {
    logo: {
      alt: '',
      light: '',
      dark: '',
    },
    search: true,
    colorMode: true,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/ddradar/nuxt-swa',
        target: '_blank',
        'aria-label': 'GitHub Repository',
      },
    ],
  },
  footer: {
    credits: 'Copyright © 2024 DDRadar',
    colorMode: false,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/ddradar/nuxt-swa',
        target: '_blank',
        'aria-label': 'GitHub Repository',
      },
      {
        icon: 'i-simple-icons-npm',
        to: 'https://www.npmjs.com/package/nuxt-swa',
        target: '_blank',
        'aria-label': 'npm package',
      },
      {
        icon: 'i-simple-icons-x',
        to: 'https://x.com/nogic1008',
        target: '_blank',
        'aria-label': "Author's X account",
      },
      {
        icon: 'i-simple-icons-nuxtdotjs',
        to: 'https://nuxt.studio',
        target: '_blank',
        'aria-label': 'Nuxt Studio',
      },
    ],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/ddradar/nuxt-swa/edit/main/docs/content',
      links: [
        {
          icon: 'i-heroicons-star',
          label: 'Star on GitHub',
          to: 'https://github.com/ddradar/nuxt-swa',
          target: '_blank',
        },
      ],
    },
  },
})
