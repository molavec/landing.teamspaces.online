<script setup lang="ts">
const { locale, t } = useI18n()

const collectionName = computed(() => (locale.value === 'es' ? 'blog_es' : 'blog_en'))

const { data: posts } = await useAsyncData(
  () => `blog-list-${locale.value}`,
  () => queryCollection(collectionName.value).where('draft', '=', false).order('date', 'DESC').all(),
  { watch: [locale] }
)

const featuredPost = computed(() => posts.value?.[0])
const remainingPosts = computed(() => posts.value?.slice(1) || [])

function formatDate(dateStr?: string | Date) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString(locale.value === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

useSeoMeta({
  title: () => `${t('blog.title')} - Teamspaces`,
  description: () => t('blog.description'),
  ogTitle: () => `${t('blog.title')} - Teamspaces`,
  ogDescription: () => t('blog.description')
})
</script>

<template>
  <UContainer class="py-12 sm:py-16">
    <UPageHeader
      :headline="$t('blog.headline')"
      :title="$t('blog.title')"
      :description="$t('blog.description')"
      class="mb-12"
    />

    <UBlogPosts v-if="posts?.length">
      <UBlogPost
        v-if="featuredPost"
        :title="featuredPost.title"
        :description="featuredPost.description"
        :date="formatDate(featuredPost.date)"
        :image="featuredPost.image"
        :badge="featuredPost.badge ? { label: featuredPost.badge, color: 'primary', variant: 'subtle' } : undefined"
        :authors="featuredPost.authors"
        :to="featuredPost.path"
        orientation="horizontal"
        class="col-span-full"
      />

      <UBlogPost
        v-for="post in remainingPosts"
        :key="post.id || post.path"
        :title="post.title"
        :description="post.description"
        :date="formatDate(post.date)"
        :image="post.image"
        :badge="post.badge ? { label: post.badge, color: 'neutral', variant: 'subtle' } : undefined"
        :authors="post.authors"
        :to="post.path"
      />
    </UBlogPosts>

    <div
      v-else
      class="py-20 text-center text-muted"
    >
      <p>{{ $t('blog.empty') }}</p>
    </div>
  </UContainer>

  <TryItCTA />
</template>
