import { writeFileSync } from 'fs'
import { join } from 'path'
import { posts } from '../src/data/posts.js'

const SITE_URL = 'https://nyfitia.com'
const TODAY = new Date().toISOString().slice(0, 10)

const staticRoutes = [
  { path: '/', lastmod: TODAY, priority: '1.0' },
  { path: '/services', lastmod: TODAY, priority: '0.9' },
  { path: '/realisations', lastmod: TODAY, priority: '0.9' },
  { path: '/profil', lastmod: TODAY, priority: '0.8' },
  { path: '/contact', lastmod: TODAY, priority: '0.8' },
  { path: '/blog', lastmod: getLatestPostDate(posts), priority: '0.8' },
]

const blogRoutes = posts.map((post) => ({
  path: `/blog/${post.slug}`,
  lastmod: post.date,
  priority: '0.7',
}))

const routes = [...staticRoutes, ...blogRoutes]

function getLatestPostDate(items) {
  return items
    .map((post) => post.date)
    .sort((a, b) => new Date(b) - new Date(a))[0] || TODAY
}

function absoluteUrl(routePath) {
  return `${SITE_URL}${routePath === '/' ? '' : routePath}`
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => `  <url>
    <loc>${escapeXml(absoluteUrl(route.path))}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.priority}</priority>
  </url>`)
  .join('\n')}
</urlset>
`

writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), sitemap)
console.log(`Generated sitemap.xml with ${routes.length} URLs`)
