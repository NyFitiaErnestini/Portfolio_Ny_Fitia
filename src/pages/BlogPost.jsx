import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Clock, Tag, ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import { posts, categories } from '../data/posts'

const categoryColors = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
}

function renderMarkdown(text) {
  const lines = text.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <pre key={i} className="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 overflow-x-auto mb-4 text-sm">
          <code className={`language-${lang} text-green-300 font-mono`}>
            {codeLines.join('\n')}
          </code>
        </pre>
      )
      i++
      continue
    }

    // Table
    if (line.startsWith('|')) {
      const tableLines = []
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      const headers = tableLines[0].split('|').filter(Boolean).map(h => h.trim())
      const rows = tableLines.slice(2).map(r => r.split('|').filter(Boolean).map(c => c.trim()))
      elements.push(
        <div key={i} className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {headers.map((h, hi) => (
                  <th key={hi} className="text-left px-3 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="even:bg-gray-50/50 dark:even:bg-gray-800/30">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // Heading H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          {line.slice(3)}
        </h2>
      )
      i++
      continue
    }

    // Heading H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-base font-bold text-gray-900 dark:text-white mt-6 mb-2">
          {line.slice(4)}
        </h3>
      )
      i++
      continue
    }

    // Bullet list
    if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={i} className="list-disc pl-5 mb-4 space-y-1">
          {items.map((item, ii) => (
            <li key={ii} className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph
    elements.push(
      <p key={i} className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return elements
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-800 dark:text-gray-200">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-light px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>
    }
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-primary dark:text-primary-light underline">{linkMatch[1]}</a>
    }
    return part
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  const post = posts.find(p => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  const content = post[lang]
  const cat = categories[post.category]
  const catLabel = lang === 'fr' ? cat.fr : cat.en
  const readLabel = lang === 'fr' ? `${post.readTime} min de lecture` : `${post.readTime} min read`

  const currentIndex = posts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null

  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <>
      <Helmet>
        <title>{content.title} | Ny Fitia</title>
        <meta name="description" content={content.excerpt} />
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'fr' ? 'Retour au blog' : 'Back to blog'}
          </Link>
        </motion.div>

        {/* Article header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[cat.color]}`}>
              {catLabel}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <Clock className="w-3 h-3" />
              {readLabel}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {content.title}
          </h1>

          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed border-l-4 border-primary dark:border-primary-light pl-4">
            {content.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Article content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="prose prose-sm max-w-none"
        >
          {renderMarkdown(content.content)}
        </motion.div>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-light/10 flex items-center justify-center shrink-0 font-bold text-primary dark:text-primary-light">
            N
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Ny Fitia Ernestini</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {lang === 'fr' ? 'Développeur Full-Stack' : 'Full-Stack Developer'}
            </p>
          </div>
          <Link
            to="/contact"
            className="ml-auto text-xs font-medium text-primary dark:text-primary-light hover:underline no-underline flex items-center gap-1"
          >
            {lang === 'fr' ? 'Me contacter' : 'Contact me'}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        {/* Prev / Next */}
        {(prevPost || nextPost) && (
          <div className="mt-10 grid grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary-light/30 transition-all no-underline"
              >
                <span className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                  <ArrowLeft className="w-3 h-3" /> {lang === 'fr' ? 'Précédent' : 'Previous'}
                </span>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                  {prevPost[lang].title}
                </p>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary-light/30 transition-all no-underline text-right"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-gray-400 mb-1">
                  {lang === 'fr' ? 'Suivant' : 'Next'} <ArrowRight className="w-3 h-3" />
                </span>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                  {nextPost[lang].title}
                </p>
              </Link>
            ) : <div />}
          </div>
        )}
      </div>
    </>
  )
}
