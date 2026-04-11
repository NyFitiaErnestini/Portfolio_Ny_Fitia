import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import {
  Code, Gauge, Server, Brain,
  TrendingUp, ArrowRight, CheckCircle,
} from 'lucide-react'

/* ─── données ─────────────────────────────────────────────────── */
const services = [
  {
    id: 'webdev',
    icon: Code,
    i18nKey: 'services.webdev',
    taglineKey: 'services.nav.webdev.tagline',
    stats: [
      { value: '100%', statKey: 'services.stat.webdev.0' },
      { value: '3',    statKey: 'services.stat.webdev.1' },
    ],
  },
  {
    id: 'performance',
    icon: Gauge,
    i18nKey: 'services.performance',
    taglineKey: 'services.nav.performance.tagline',
    stats: [
      { value: '×3', statKey: 'services.stat.performance.0' },
    ],
  },
  {
    id: 'backend',
    icon: Server,
    i18nKey: 'services.backend',
    taglineKey: 'services.nav.backend.tagline',
    stats: [
      { value: '0',    statKey: 'services.stat.backend.0' },
      { value: '100%', statKey: 'services.stat.backend.1' },
    ],
  },
  {
    id: 'algo',
    icon: Brain,
    i18nKey: 'services.algo',
    taglineKey: 'services.nav.algo.tagline',
    stats: [
      { value: '−80%', statKey: 'services.stat.algo.0' },
      { value: '24/7', statKey: 'services.stat.algo.1' },
    ],
  },
]

const proofBadgeKeys = {
  webdev:      ['services.badge.webdev.0',      'services.badge.webdev.1'],
  performance: ['services.badge.performance.0', 'services.badge.performance.1'],
  backend:     ['services.badge.backend.0',     'services.badge.backend.1'],
  algo:        ['services.badge.algo.0',        'services.badge.algo.1'],
}

/* ─── illustrations SVG ───────────────────────────────────────── */
function Illustration({ id, t }) {
  if (id === 'webdev') return (
    // Éditeur de code + preview navigateur
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      {/* Fenêtre éditeur */}
      <rect x="12" y="12" width="168" height="176" rx="10" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
      <rect x="12" y="12" width="168" height="28" rx="10" fill="currentColor" opacity="0.12" />
      <circle cx="28" cy="26" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="42" cy="26" r="4" fill="currentColor" opacity="0.2" />
      <circle cx="56" cy="26" r="4" fill="currentColor" opacity="0.15" />
      <text x="28" y="56" fontSize="8" fill="currentColor" opacity="0.35" fontFamily="monospace">const App = () =&gt; {'{'}</text>
      <text x="28" y="70" fontSize="8" fill="currentColor" opacity="0.55" fontFamily="monospace">  return (</text>
      <text x="28" y="84" fontSize="8" fill="currentColor" opacity="0.7" fontFamily="monospace">    &lt;div&gt;</text>
      <text x="28" y="98" fontSize="8" fill="currentColor" opacity="0.5" fontFamily="monospace">      &lt;Hero /&gt;</text>
      <text x="28" y="112" fontSize="8" fill="currentColor" opacity="0.5" fontFamily="monospace">      &lt;Section /&gt;</text>
      <text x="28" y="126" fontSize="8" fill="currentColor" opacity="0.7" fontFamily="monospace">    &lt;/div&gt;</text>
      <text x="28" y="140" fontSize="8" fill="currentColor" opacity="0.55" fontFamily="monospace">  )</text>
      <text x="28" y="154" fontSize="8" fill="currentColor" opacity="0.35" fontFamily="monospace">{'}'}</text>
      {/* Curseur clignotant */}
      <rect x="46" y="148" width="1.5" height="9" rx="1" fill="currentColor" opacity="0.7" />
      {/* Fenêtre browser */}
      <rect x="192" y="12" width="116" height="176" rx="10" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
      <rect x="192" y="12" width="116" height="24" rx="10" fill="currentColor" opacity="0.1" />
      <rect x="202" y="19" width="60" height="10" rx="5" fill="currentColor" opacity="0.15" />
      <circle cx="296" cy="24" r="4" fill="currentColor" opacity="0.2" />
      {/* Contenu preview */}
      <rect x="202" y="46" width="96" height="10" rx="5" fill="currentColor" opacity="0.25" />
      <rect x="202" y="62" width="70" height="6" rx="3" fill="currentColor" opacity="0.12" />
      <rect x="202" y="72" width="84" height="6" rx="3" fill="currentColor" opacity="0.1" />
      <rect x="202" y="90" width="96" height="40" rx="6" fill="currentColor" opacity="0.08" />
      <rect x="202" y="140" width="44" height="14" rx="7" fill="currentColor" opacity="0.3" />
      {/* Flèche liaison */}
      <line x1="180" y1="100" x2="192" y2="100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.3" />
      <polygon points="190,97 194,100 190,103" fill="currentColor" opacity="0.3" />
    </svg>
  )

  if (id === 'performance') return (
    // Lighthouse score + graphe avant/après
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      {/* Score Lighthouse */}
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.08" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round"
        strokeDasharray="395" strokeDashoffset="40" strokeOpacity="0.65"
        transform="rotate(-90 100 100)" />
      <text x="100" y="93" textAnchor="middle" fontSize="32" fontWeight="800" fill="currentColor" opacity="0.85">90</text>
      <text x="100" y="110" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.4">Lighthouse</text>
      <text x="100" y="122" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.3">Performance</text>
      {/* Barres avant / après */}
      <rect x="210" y="60" width="20" height="110" rx="4" fill="currentColor" opacity="0.08" />
      <rect x="210" y="105" width="20" height="65" rx="4" fill="currentColor" opacity="0.25" />
      <text x="220" y="182" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.4">{t('services.illus.performance.before')}</text>
      <rect x="244" y="60" width="20" height="110" rx="4" fill="currentColor" opacity="0.08" />
      <rect x="244" y="62" width="20" height="108" rx="4" fill="currentColor" opacity="0.6" />
      <text x="254" y="182" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.5">{t('services.illus.performance.after')}</text>
      {/* Labels métriques */}
      <rect x="196" y="30" width="108" height="18" rx="4" fill="currentColor" opacity="0.06" />
      <text x="250" y="43" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.45">{t('services.illus.performance.label')}</text>
      <line x1="196" y1="60" x2="304" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3,2" opacity="0.15" />
    </svg>
  )

  if (id === 'backend') return (
    // Architecture API : client → API → DB
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      {/* Client */}
      <rect x="14" y="76" width="64" height="48" rx="8" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      <rect x="22" y="84" width="48" height="6" rx="3" fill="currentColor" opacity="0.2" />
      <rect x="22" y="94" width="36" height="6" rx="3" fill="currentColor" opacity="0.12" />
      <rect x="22" y="108" width="26" height="8" rx="4" fill="currentColor" opacity="0.25" />
      <text x="46" y="136" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.4">{t('services.illus.backend.client')}</text>
      {/* Flèche → API */}
      <line x1="78" y1="100" x2="118" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <polygon points="115,96 120,100 115,104" fill="currentColor" opacity="0.3" />
      <text x="98" y="93" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.35">{t('services.illus.backend.https')}</text>
      {/* API */}
      <rect x="118" y="62" width="84" height="76" rx="10" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" />
      <text x="160" y="84" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" opacity="0.6">REST API</text>
      <rect x="128" y="90" width="64" height="10" rx="3" fill="currentColor" opacity="0.15" />
      <text x="160" y="99" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.5">Auth · JWT</text>
      <rect x="128" y="104" width="64" height="10" rx="3" fill="currentColor" opacity="0.1" />
      <text x="160" y="113" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.4">Rate limit</text>
      <rect x="128" y="118" width="64" height="10" rx="3" fill="currentColor" opacity="0.08" />
      <text x="160" y="127" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.35">Logs</text>
      <text x="160" y="152" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.4">API</text>
      {/* Flèche → DB */}
      <line x1="202" y1="100" x2="238" y2="100" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <polygon points="235,96 240,100 235,104" fill="currentColor" opacity="0.3" />
      <text x="220" y="93" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.35">{t('services.illus.backend.sql')}</text>
      {/* DB */}
      <ellipse cx="266" cy="88" rx="28" ry="10" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      <rect x="238" y="88" width="56" height="28" fill="currentColor" opacity="0.08" />
      <ellipse cx="266" cy="116" rx="28" ry="10" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      <line x1="238" y1="96" x2="238" y2="116" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
      <line x1="294" y1="96" x2="294" y2="116" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
      <text x="266" y="152" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.4">{t('services.illus.backend.db')}</text>
      {/* Badge sécurisé */}
      <rect x="238" y="16" width="66" height="20" rx="6" fill="currentColor" opacity="0.12" />
      <text x="271" y="30" textAnchor="middle" fontSize="8" fontWeight="600" fill="currentColor" opacity="0.6">{t('services.illus.backend.secured')}</text>
    </svg>
  )

  if (id === 'algo') return (
    // Engrenages interconnectés + tâches automatisées
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      {/* Grand engrenage central */}
      <g transform="translate(140, 100)">
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
          <rect key={i}
            x="-6" y="-52"
            width="12" height="16" rx="3"
            fill="currentColor" opacity="0.2"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="42" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" />
        <circle cx="0" cy="0" r="16" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" />
        <circle cx="0" cy="0" r="6"  fill="currentColor" opacity="0.4" />
      </g>

      {/* Petit engrenage haut-droite */}
      <g transform="translate(242, 54)">
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <rect key={i}
            x="-4" y="-30"
            width="8" height="10" rx="2"
            fill="currentColor" opacity="0.18"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="22" fill="currentColor" opacity="0.07" stroke="currentColor" strokeWidth="1" strokeOpacity="0.18" />
        <circle cx="0" cy="0" r="8"  fill="currentColor" opacity="0.12" />
        <circle cx="0" cy="0" r="3"  fill="currentColor" opacity="0.35" />
      </g>

      {/* Petit engrenage bas-gauche */}
      <g transform="translate(62, 148)">
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <rect key={i}
            x="-4" y="-28"
            width="8" height="10" rx="2"
            fill="currentColor" opacity="0.18"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="20" fill="currentColor" opacity="0.07" stroke="currentColor" strokeWidth="1" strokeOpacity="0.18" />
        <circle cx="0" cy="0" r="7"  fill="currentColor" opacity="0.12" />
        <circle cx="0" cy="0" r="3"  fill="currentColor" opacity="0.35" />
      </g>

      {/* Badges tâches autour */}
      <rect x="8" y="12" width="80" height="18" rx="9" fill="currentColor" opacity="0.1" />
      <text x="48" y="25" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.55">{t('services.illus.algo.report')}</text>

      <rect x="220" y="130" width="86" height="18" rx="9" fill="currentColor" opacity="0.1" />
      <text x="263" y="143" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.55">{t('services.illus.algo.email')}</text>

      <rect x="8" y="168" width="88" height="18" rx="9" fill="currentColor" opacity="0.1" />
      <text x="52" y="181" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.55">{t('services.illus.algo.backup')}</text>

      <rect x="220" y="12" width="88" height="18" rx="9" fill="currentColor" opacity="0.12" />
      <text x="264" y="25" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor" opacity="0.7">{t('services.illus.algo.stat')}</text>
    </svg>
  )
  return null
}

/* ─── sous-menu sticky ────────────────────────────────────────── */
function ServiceNav({ activeId }) {
  const { t } = useTranslation()

  const scrollTo = (id) => {
    const el = document.getElementById(`service-${id}`)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 65 - 58
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div className="fixed top-[65px] left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-3 py-2 md:px-4 md:py-3">
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {services.map((s) => {
            const Icon = s.icon
            const isActive = activeId === s.id
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`group flex items-center gap-2 px-2 py-2 md:px-3 md:py-3 rounded-xl text-left transition-all duration-200 w-full min-h-[44px]
                  ${isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary-light/10'
                  }`}
              >
                <div className={`w-7 h-7 md:w-9 md:h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors
                  ${isActive
                    ? 'bg-white/20'
                    : 'bg-white dark:bg-gray-700 group-hover:bg-primary/10 dark:group-hover:bg-primary-light/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? 'text-white' : 'text-primary dark:text-primary-light'}`} />
                </div>
                <div className="min-w-0">
                  <p className={`text-xs md:text-sm font-semibold leading-tight truncate ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                    {t(`${s.i18nKey}.title`)}
                  </p>
                  <p className={`hidden md:block text-xs mt-0.5 leading-tight ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                    {t(s.taglineKey)}
                  </p>
                </div>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

/* ─── fonds alternants ────────────────────────────────────────── */
const sectionBg = [
  'bg-white dark:bg-gray-900',
  'bg-gray-50 dark:bg-gray-800/40',
  'bg-white dark:bg-gray-900',
  'bg-gray-50 dark:bg-gray-800/40',
]

/* ─── section individuelle ────────────────────────────────────── */
function ServiceSection({ service, index, onVisible }) {
  const { t } = useTranslation()
  const isEven = index % 2 === 0
  const Icon = service.icon
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(service.id) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [service.id, onVisible])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  const badgeKeys = proofBadgeKeys[service.id] || []

  return (
    <section
      id={`service-${service.id}`}
      ref={ref}
      className={`border-b border-gray-100 dark:border-gray-800 ${sectionBg[index]}`}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className={`max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
      >
        {/* ── Texte ── */}
        <div className="flex-1 min-w-0">
          <motion.div custom={0} variants={fadeUp} className="flex items-center gap-3 mb-5">
            <span className="text-5xl font-black text-gray-100 dark:text-gray-700/60 leading-none select-none">
              0{index + 1}
            </span>
            <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary-light/10 flex items-center justify-center">
              <Icon className="w-4.5 h-4.5 text-primary dark:text-primary-light" />
            </div>
          </motion.div>

          <motion.h2 custom={1} variants={fadeUp} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-2">
            {t(`${service.i18nKey}.title`)}
          </motion.h2>

          <motion.p custom={2} variants={fadeUp} className="text-sm font-medium text-primary dark:text-primary-light mb-6">
            {t(`${service.i18nKey}.hook`)}
          </motion.p>

          <motion.p custom={3} variants={fadeUp} className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg whitespace-pre-line">
            {t(`${service.i18nKey}.solution`)}
          </motion.p>

          <motion.div custom={4} variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
            {t(`${service.i18nKey}.tags`).split(',').map(tag => (
              <span key={tag} className="px-2.5 py-1 text-xs font-semibold rounded-md bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary-light border border-primary/15 dark:border-primary-light/20">
                {tag.trim()}
              </span>
            ))}
          </motion.div>

          <motion.div custom={5} variants={fadeUp} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 mb-8 shadow-sm">
            <TrendingUp className="w-5 h-5 mt-0.5 shrink-0 text-primary dark:text-primary-light" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-primary dark:text-primary-light">
                {t('services.outcome')}
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {t(`${service.i18nKey}.impact`)}
              </p>
            </div>
          </motion.div>

          <motion.div custom={6} variants={fadeUp} className="flex flex-wrap items-center gap-8">
            {service.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-extrabold text-primary dark:text-primary-light">{stat.value}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {t(stat.statKey)}
                </span>
              </div>
            ))}
            <Link
              to="/realisations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white bg-primary dark:bg-primary-light hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-md ml-auto"
            >
              {t('services.cta.work')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* ── Illustration ── */}
        <motion.div custom={2} variants={fadeUp} className="flex-1 min-w-0 w-full max-w-md">
          <div className="relative rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 shadow-[0_4px_32px_rgba(0,0,0,0.06)] p-6 aspect-[16/10] text-primary dark:text-primary-light">
            <Illustration id={service.id} t={t} />
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light border border-primary/20 dark:border-primary-light/20 shadow-sm">
              <CheckCircle className="w-3.5 h-3.5" />
              {service.stats[0].value} {t(service.stats[0].statKey)}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

/* ─── page ────────────────────────────────────────────────────── */
export default function Services() {
  const { t } = useTranslation()
  const location = useLocation()
  const [activeId, setActiveId] = useState(services[0].id)

  useEffect(() => {
    if (!location.hash.startsWith('#service-')) return

    const el = document.querySelector(location.hash)
    if (!el) return

    const frame = requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 65 - 58
      window.scrollTo({ top: y, behavior: 'smooth' })
    })

    return () => cancelAnimationFrame(frame)
  }, [location.hash])

  return (
    <div>
      {/* Hero */}
      <div className="px-6 pt-10 pb-8 text-center max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold text-primary dark:text-primary-light uppercase tracking-widest mb-3"
        >
          {t('services.badge')}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-3"
        >
          {t('services.hero.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {t('services.subtitle')}
        </motion.p>
      </div>

      <ServiceNav activeId={activeId} />
      {/* Spacer pour compenser le sous-menu fixed */}
      <div className="h-[50px] md:h-[58px]" />

      {services.map((service, index) => (
        <ServiceSection
          key={service.id}
          service={service}
          index={index}
          onVisible={setActiveId}
        />
      ))}

      {/* CTA final */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-primary dark:bg-gray-800 px-6 py-16"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
            {t('services.cta.ready')}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t('services.cta.project')}
          </h2>
          <p className="text-sm text-white/70 mb-8 max-w-md mx-auto">
            {t('services.cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/#contact"
              onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-white text-primary hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-md"
            >
              {t('services.cta.contact')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/realisations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white border border-white/30 hover:bg-white/10 transition-all duration-200"
            >
              {t('services.cta.realisations')}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
