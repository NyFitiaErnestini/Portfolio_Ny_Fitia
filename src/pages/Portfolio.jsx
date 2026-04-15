import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { projects } from '../data/projects'
import ImageSlider from '../components/ui/ImageSlider'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Briefcase, Code2, ArrowUp, ArrowRight, Mail, Phone, ExternalLink, User } from 'lucide-react'

/* ─── Expériences ─────────────────────────────────────────────── */
const experiences = [
  {
    key: 'emedia',
    company: 'Remote',
    tags: ['React', 'Node.js', 'Odoo'],
    current: true,
  },
  {
    key: 'etech',
    company: 'eTech Consulting',
    tags: ['PHP', 'Symfony', 'Backend'],
    current: false,
  },
]

/* ─── Animation ───────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' },
  }),
}

/* ─── SectionHeader ───────────────────────────────────────────── */
function SectionHeader({ icon: Icon, title, sub }) {
  return (
    <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
      <div className="flex items-center gap-3 mb-1">
        <Icon className="w-5 h-5 text-primary dark:text-primary-light" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      {sub && <p className="text-sm text-gray-500 dark:text-gray-400 ml-8">{sub}</p>}
    </motion.div>
  )
}

/* ─── Carrousel projets ───────────────────────────────────────── */
function ProjectCarousel() {
  const { t } = useTranslation()
  const trackRef = useRef(null)
  const isHovered = useRef(false)
  let isDown = false, startX = 0, scrollLeft = 0

  const onMouseDown  = (e) => { isDown = true; startX = e.pageX - trackRef.current.offsetLeft; scrollLeft = trackRef.current.scrollLeft }
  const onMouseLeave = ()  => { isDown = false; isHovered.current = false }
  const onMouseUp    = ()  => { isDown = false }
  const onMouseEnter = ()  => { isHovered.current = true }
  const onMouseMove  = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = scrollLeft - (x - startX) * 1.2
  }

  useEffect(() => {
    const cardWidth = 288 + 20 // w-72 + gap-5
    const timer = setInterval(() => {
      if (!trackRef.current || isHovered.current) return
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        trackRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        trackRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
      }
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      ref={trackRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      className="flex gap-5 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="shrink-0 w-72 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
        >
          <ImageSlider images={project.images} alt={t(`${project.i18nKey}.title`)} fit={project.imageFit} />

          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                {t(`${project.i18nKey}.title`)}
              </h3>
              {project.github ? (
                <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} title="Code source">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400 hover:fill-primary dark:hover:fill-primary-light transition-colors shrink-0" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              ) : (
                <span title="Projet privé" className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 text-xs font-medium shrink-0">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
                    <path d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-6 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3.1-9H8.9V6a3.1 3.1 0 0 1 6.2 0v2z"/>
                  </svg>
                  Privé
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-primary dark:text-primary-light mb-2">
              {t(`${project.i18nKey}.result`)}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-3">
              {t(`${project.i18nKey}.solution`)}
            </p>

            <div className="flex flex-wrap gap-1">
              {project.tech.map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary-light border border-primary/15 dark:border-primary-light/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
      <div className="shrink-0 w-6" />
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function Portfolio() {
  const { t } = useTranslation()
  const projectsRef = useRef(null)

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>

      {/* ── Hero ── */}
      <div className="px-6 pt-10 pb-10 text-center max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="text-xs font-semibold text-primary dark:text-primary-light uppercase tracking-widest mb-3"
        >
          {t('realisations.badge')}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-3"
        >
          {t('realisations.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {t('realisations.sub')}
        </motion.p>
      </div>

      {/* ── Projets ── */}
      <motion.section
        ref={projectsRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="projets"
        className="bg-gray-50 dark:bg-gray-800/40 border-y border-gray-100 dark:border-gray-800 py-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="px-6">
            <SectionHeader
              icon={Code2}
              title={t('realisations.projects.title')}
              sub={t('realisations.projects.sub')}
            />
          </div>
          <motion.div
            className="px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <ProjectCarousel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="px-6 mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg hover:shadow-primary/25"
            >
              <Mail className="w-4 h-4" />
              {t('nav.contact')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/profil"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-primary hover:text-primary dark:hover:border-primary-light dark:hover:text-primary-light transition-colors"
            >
              <User className="w-4 h-4" />
              {t('nav.profil')}
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Expériences ── */}
      <section className="bg-white dark:bg-gray-900 px-6 py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            icon={Briefcase}
            title={t('realisations.exp.title')}
            sub={t('realisations.exp.sub')}
          />

          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.key}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`relative p-5 rounded-2xl border bg-white dark:bg-gray-800 hover:shadow-md transition-shadow
                  ${exp.current ? 'border-primary dark:border-primary-light' : 'border-gray-200 dark:border-gray-700'}`}
              >
                {exp.current && (
                  <span className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-semibold text-primary dark:text-primary-light bg-primary/10 dark:bg-primary-light/10 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light animate-pulse" />
                    {t('realisations.exp.current')}
                  </span>
                )}

                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1 pr-24">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {t(`exp.${exp.key}.role`)}
                  </h3>
                  <span className="text-sm font-semibold text-primary dark:text-primary-light">
                    · {exp.company}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {t(`exp.${exp.key}.period`)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {t(`exp.${exp.key}.type`)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  {t(`exp.${exp.key}.desc`)}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary-light border border-primary/15 dark:border-primary-light/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            custom={experiences.length}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <button
              type="button"
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white dark:border-primary-light/20 dark:bg-primary-light/10 dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-gray-900"
            >
              <ArrowUp className="h-4 w-4" />
              {t('realisations.exp.seeMoreProjects')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="bg-white dark:bg-gray-900 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <div className="flex items-center gap-3 mb-1">
              <Mail className="w-5 h-5 text-primary dark:text-primary-light" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('home.contact.title')}</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-8">{t('home.contact.description')}</p>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <a href="mailto:ernestininyfitia@gmail.com" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-4 h-4 text-primary dark:text-primary-light" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{t('contact.email')}</p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  ernestininyfitia@gmail.com
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-primary dark:text-primary-light" />
              </div>
              <div>
                <div className="flex gap-3 text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                  <a href="https://wa.me/261342339677" target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-primary-light transition-colors">WhatsApp</a>
                  <span>/</span>
                  <a href="tel:+261342339677" className="hover:text-primary dark:hover:text-primary-light transition-colors">{t('contact.call')}</a>
                </div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">+261 34 23 396 77</p>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <a
                href="https://www.linkedin.com/in/ny-fitia-ernestini-7976a726a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary-light dark:hover:text-primary-light transition-colors min-h-[44px]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a
                href="https://www.malt.fr/profile/nyfitiaernestini1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary-light dark:hover:text-primary-light transition-colors min-h-[44px]"
              >
                <ExternalLink className="w-4 h-4" />
                Malt
              </a>
            </div>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-6"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl hover:shadow-primary/25"
              >
                {t('home.cta.button')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
