import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, Tag, ArrowRight } from 'lucide-react'
import { posts, categories } from '../data/posts'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const categoryColors = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
}

function PostCard({ post, index, lang }) {
  const { t } = useTranslation()
  const content = post[lang]
  const cat = categories[post.category]
  const catLabel = lang === 'fr' ? cat.fr : cat.en
  const readLabel = lang === 'fr' ? `${post.readTime} min de lecture` : `${post.readTime} min read`

  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-primary/30 dark:hover:border-primary-light/30 transition-all duration-300"
    >
      <Link to={`/blog/${post.slug}`} className="block p-6 no-underline">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[cat.color]}`}>
            {catLabel}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock className="w-3 h-3" />
            {readLabel}
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors leading-snug">
          {content.title}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
          {content.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-primary dark:text-primary-light group-hover:gap-2 transition-all">
            {lang === 'fr' ? 'Lire' : 'Read'}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export default function Blog() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))

  const metaTitle = lang === 'fr'
    ? 'Blog — Performance web, IA & Freelance | Ny Fitia'
    : 'Blog — Web Performance, AI & Freelance | Ny Fitia'
  const metaDesc = lang === 'fr'
    ? 'Articles pratiques sur la performance web, le SEO, l\'IA et le freelance. Retours d\'expérience concrets d\'un développeur full-stack.'
    : 'Practical articles on web performance, SEO, AI and freelancing. Real-world insights from a full-stack developer.'

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary-light/10 mb-4">
            <span className="text-xs font-semibold text-primary dark:text-primary-light uppercase tracking-wide">
              Blog
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {lang === 'fr' ? 'Articles & retours d\'expérience' : 'Articles & insights'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            {lang === 'fr'
              ? 'Performance web, SEO, IA, automatisation et freelance — des articles concrets, sans hype.'
              : 'Web performance, SEO, AI, automation and freelancing — concrete articles, no hype.'}
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2 mb-10"
        >
          {Object.entries(categories).map(([key, cat]) => (
            <span
              key={key}
              className={`text-xs font-medium px-3 py-1.5 rounded-full ${categoryColors[cat.color]}`}
            >
              {lang === 'fr' ? cat.fr : cat.en}
              <span className="ml-1.5 opacity-60">
                {posts.filter(p => p.category === key).length}
              </span>
            </span>
          ))}
        </motion.div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sorted.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i + 2} lang={lang} />
          ))}
        </div>
      </div>
    </>
  )
}
