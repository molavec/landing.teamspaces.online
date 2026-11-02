<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()

const collectionName = computed(() => (locale.value === 'es' ? 'blog_es' : 'blog_en'))
const cleanPath = computed(() => withoutTrailingSlash(route.path))

const { data: post } = await useAsyncData(
  () => `blog-post-${cleanPath.value}`,
  () => queryCollection(collectionName.value).path(cleanPath.value).first()
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: locale.value === 'es' ? 'Artículo no encontrado' : 'Article not found',
    fatal: true
  })
}

const { data: surround } = await useAsyncData(
  () => `blog-surround-${cleanPath.value}`,
  () => queryCollectionItemSurroundings(collectionName.value, cleanPath.value, { fields: ['description'] })
)

function formatDate(dateStr?: string | Date) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString(locale.value === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const config = useRuntimeConfig()

useSeoMeta({
  title: () => `${post.value?.title || 'Article'} - Teamspaces`,
  description: () => post.value?.description,
  ogType: 'article',
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  ogImage: () => post.value?.image ? new URL(post.value.image, config.public.siteUrl).toString() : undefined
})
</script>

<template>
  <div v-if="post" class="py-10 sm:py-14">
    <UContainer>
      <UButton
        :to="localePath('/blog')"
        icon="i-lucide-arrow-left"
        variant="ghost"
        color="neutral"
        :label="$t('blog.backToBlog')"
        class="mb-8 -ml-2.5"
      />

      <UPageHeader
        :title="post.title"
        :description="post.description"
      >
        <template #headline>
          <div class="flex items-center gap-3 text-sm text-muted mb-3">
            <UBadge
              v-if="post.badge"
              :label="post.badge"
              variant="subtle"
              color="primary"
            />
            <span v-if="post.date">{{ formatDate(post.date) }}</span>
          </div>
        </template>

        <template v-if="post.authors?.length" #default>
          <div class="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-default">
            <UUser
              v-for="author in post.authors"
              :key="author.name"
              :name="author.name"
              :description="author.description"
              :avatar="author.avatar"
              size="md"
            />
          </div>
        </template>
      </UPageHeader>

      <div
        v-if="post.image"
        class="my-8 rounded-2xl overflow-hidden border border-default shadow-sm max-h-[460px]"
      >
        <img
          :src="post.image"
          :alt="post.title"
          class="w-full h-full object-cover"
        />
      </div>

      <UPage>
        <UPageBody class="prose dark:prose-invert max-w-none">
          <ContentRenderer :value="post" />

          <USeparator class="my-10" />

          <UContentSurround
            v-if="surround?.length"
            :surround="surround"
          />
        </UPageBody>

        <template v-if="post.body?.toc?.links?.length" #right>
          <UContentToc
            :title="$t('blog.tableOfContents')"
            :links="post.body.toc.links"
            highlight
          />
        </template>
      </UPage>
    </UContainer>

    <TryItCTA />
  </div>
</template>
