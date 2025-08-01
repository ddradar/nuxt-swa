export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate',
    },
  },
  uiPro: {
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted',
      },
    },
  },
  seo: {
    siteName: 'Nuxt SWA',
  },
  header: {
    title: '',
    to: '/',
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
    credits: `Copyright © 2024-2025 DDRadar`,
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
    ],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/ddradar/nuxt-swa/edit/main/docs/content',
      links: [
        {
          icon: 'i-lucide-star',
          label: 'Star on GitHub',
          to: 'https://github.com/ddradar/nuxt-swa',
          target: '_blank',
        },
      ],
    },
  },
})
