import { withoutTrailingSlash } from 'ufo'

interface SitemapEntry {
  enPath: string
  esPath: string
  lastmod?: string
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatDateIso(dateStr?: string | Date): string | undefined {
  if (!dateStr) return undefined
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toISOString().split('T')[0]
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = withoutTrailingSlash(config.public.siteUrl || 'https://teamspaces.online')

  const [enPosts, esPosts] = await Promise.all([
    queryCollection(event, 'blog_en').where('draft', '=', false).order('date', 'DESC').all(),
    queryCollection(event, 'blog_es').where('draft', '=', false).order('date', 'DESC').all(),
  ])

  const entries: SitemapEntry[] = [
    { enPath: '/', esPath: '/es' },
    { enPath: '/blog', esPath: '/es/blog' },
    { enPath: '/privacy-policy', esPath: '/es/privacy-policy' },
    { enPath: '/terms-of-service', esPath: '/es/terms-of-service' },
  ]

  const esMap = new Map(
    esPosts.map((post) => [post.path.replace(/^\/es/, ''), post])
  )

  for (const enPost of enPosts) {
    const cleanEnPath = withoutTrailingSlash(enPost.path)
    const matchingEs = esMap.get(cleanEnPath)
    const cleanEsPath = matchingEs ? withoutTrailingSlash(matchingEs.path) : `/es${cleanEnPath}`
    const lastmod = formatDateIso(enPost.date || matchingEs?.date)

    entries.push({
      enPath: cleanEnPath,
      esPath: cleanEsPath,
      lastmod,
    })
  }

  const urlBlocks: string[] = []

  for (const entry of entries) {
    const enLoc = entry.enPath === '/' ? `${siteUrl}/` : `${siteUrl}${entry.enPath}`
    const esLoc = `${siteUrl}${entry.esPath}`

    for (const loc of [enLoc, esLoc]) {
      const lines = [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        ...(entry.lastmod ? [`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`] : []),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(enLoc)}" />`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enLoc)}" />`,
        `    <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(enLoc)}" />`,
        `    <xhtml:link rel="alternate" hreflang="es" href="${escapeXml(esLoc)}" />`,
        `    <xhtml:link rel="alternate" hreflang="es-ES" href="${escapeXml(esLoc)}" />`,
        '  </url>',
      ]
      urlBlocks.push(lines.join('\n'))
    }
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urlBlocks,
    '</urlset>',
    '',
  ].join('\n')

  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return xml
})
