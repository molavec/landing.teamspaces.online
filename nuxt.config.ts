// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-studio',
  ],

  runtimeConfig: {
    public: {
      siteUrl: 'https://teamspaces.online',
      siteName: 'Teamspaces',
    },
  },

  i18n: {
    baseUrl: 'https://teamspaces.online',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default'
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', sizes: 'any', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  // useScript production only enabled
  $production: {
    scripts: {
      registry: {
        googleTagManager: {
          id: 'GTM-NL656GHX',
        },
      },
    },
  },

  routeRules: {
    '/sitemap.xml': { prerender: true },
    '/blog/**': { prerender: true },
    '/es/blog/**': { prerender: true }
  },

  nitro: {
    preset: "cloudflare_pages",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    },
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/blog', '/es/blog']
    }
  },

  studio: {
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'molavec',
      repo: 'landing.teamspaces.online',
      branch: 'dev'
    }
  },


  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
})