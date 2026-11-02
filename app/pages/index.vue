<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            name: 'Teamspaces',
            alternateName: ['Teamspaces Online', 'teamspaces.online'],
            url: `${siteUrl}/`,
          },
          {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'Teamspaces',
            url: `${siteUrl}/`,
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/favicon-192x192.png`,
              width: 192,
              height: 192,
            },
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <Hero />
  <Tools />
  <Spaces />
  <Quicklinks />
  <Tasks />
  <HowTo />
  <Mcp />
  <Extensions />
  <Pricing />
  <Features />
  <DesignedBy /> 
  <TryItCTA />
</template>
