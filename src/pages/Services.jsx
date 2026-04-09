import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import {
  Code, Gauge, Server, Brain,
  TrendingUp, ArrowRight, ExternalLink, CheckCircle,
} from 'lucide-react'

/* ─── données ─────────────────────────────────────────────────── */
const services = [
  {
    id: 'webdev',
    icon: Code,
    i18nKey: 'services.webdev',
    tagline_fr: 'Livraison fiable et respect des délais',
    tagline_en: 'Reliable delivery, on time',
    stats: [
      { value: '100%', label_fr: 'Livré dans les délais',       label_en: 'On-time delivery' },
      { value: '3',    label_fr: 'Projets full-stack déployés', label_en: 'Full-stack projects shipped' },
    ],
  },
  {
    id: 'performance',
    icon: Gauge,
    i18nKey: 'services.performance',
    tagline_fr: 'Site rapide et optimisé',
    tagline_en: 'Fast and optimized website',
    stats: [
      { value: '×3', label_fr: 'Vitesse de chargement', label_en: 'Load speed gain' },
    ],
  },
  {
    id: 'backend',
    icon: Server,
    i18nKey: 'services.backend',
    tagline_fr: 'Systèmes stables et fiables',
    tagline_en: 'Stable and reliable systems',
    stats: [
      { value: '0',    label_fr: 'Downtime en production', label_en: 'Downtime in production' },
      { value: '100%', label_fr: 'APIs documentées',       label_en: 'APIs documented' },
    ],
  },
  {
    id: 'algo',
    icon: Brain,
    i18nKey: 'services.algo',
    tagline_fr: 'Automatisation des tâches pour gagner du temps',
    tagline_en: 'Task automation to save time',
    stats: [
      { value: '−80%', label_fr: 'Tâches manuelles', label_en: 'Manual tasks' },
      { value: '24/7', label_fr: 'Process automatisés', label_en: 'Automated processes' },
    ],
  },
]

/* ─── illustrations SVG ───────────────────────────────────────── */
function Illustration({ id }) {
  if (id === 'webdev') return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect x="20" y="20" width="280" height="160" rx="12" fill="currentColor" opacity="0.05" />
      <rect x="20" y="20" width="280" height="36" rx="12" fill="currentColor" opacity="0.1" />
      <circle cx="44" cy="38" r="5" fill="currentColor" opacity="0.25" />
      <circle cx="60" cy="38" r="5" fill="currentColor" opacity="0.18" />
      <circle cx="76" cy="38" r="5" fill="currentColor" opacity="0.12" />
      <rect x="100" y="30" width="150" height="14" rx="7" fill="currentColor" opacity="0.1" />
      <rect x="36" y="70" width="78" height="94" rx="8" fill="currentColor" opacity="0.08" />
      <rect x="36" y="70" width="78" height="20" rx="6" fill="currentColor" opacity="0.15" />
      <rect x="44" y="100" width="55" height="6" rx="3" fill="currentColor" opacity="0.18" />
      <rect x="44" y="112" width="40" height="6" rx="3" fill="currentColor" opacity="0.12" />
      <rect x="44" y="124" width="50" height="6" rx="3" fill="currentColor" opacity="0.12" />
      <rect x="44" y="138" width="48" height="14" rx="7" fill="currentColor" opacity="0.25" />
      <rect x="130" y="70" width="76" height="42" rx="8" fill="currentColor" opacity="0.08" />
      <rect x="136" y="78" width="58" height="6" rx="3" fill="currentColor" opacity="0.18" />
      <rect x="136" y="90" width="42" height="6" rx="3" fill="currentColor" opacity="0.12" />
      <rect x="130" y="120" width="76" height="42" rx="8" fill="currentColor" opacity="0.06" />
      <rect x="136" y="128" width="48" height="6" rx="3" fill="currentColor" opacity="0.14" />
      <rect x="136" y="140" width="36" height="6" rx="3" fill="currentColor" opacity="0.1" />
      <rect x="222" y="70" width="60" height="94" rx="8" fill="currentColor" opacity="0.05" />
      <rect x="228" y="78" width="42" height="30" rx="4" fill="currentColor" opacity="0.1" />
      <rect x="228" y="116" width="34" height="6" rx="3" fill="currentColor" opacity="0.12" />
      <rect x="228" y="128" width="26" height="6" rx="3" fill="currentColor" opacity="0.08" />
      <polygon points="258,150 266,166 269,158 276,162 268,146" fill="currentColor" opacity="0.35" />
    </svg>
  )
  if (id === 'performance') return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <path d="M 60 158 A 100 100 0 0 1 260 158" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" opacity="0.08" />
      <path d="M 60 158 A 100 100 0 0 1 160 58"  fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" opacity="0.15" />
      <path d="M 160 58 A 100 100 0 0 1 248 108" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" opacity="0.4" />
      <path d="M 248 108 A 100 100 0 0 1 260 158" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" opacity="0.75" />
      <line x1="160" y1="158" x2="244" y2="102" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="160" cy="158" r="11" fill="currentColor" opacity="0.8" />
      <circle cx="160" cy="158" r="5"  fill="white" opacity="0.9" />
      <text x="160" y="140" textAnchor="middle" fontSize="30" fontWeight="800" fill="currentColor" opacity="0.8">90</text>
      <text x="160" y="178" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.4">/ 100</text>
      <rect x="28"  y="108" width="12" height="50" rx="4" fill="currentColor" opacity="0.12" />
      <rect x="28"  y="68"  width="12" height="90" rx="4" fill="currentColor" opacity="0.28" />
      <text x="34"  y="174" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.35">Avant</text>
      <rect x="280" y="78"  width="12" height="80" rx="4" fill="currentColor" opacity="0.1" />
      <rect x="280" y="32"  width="12" height="126" rx="4" fill="currentColor" opacity="0.7" />
      <text x="286" y="174" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.45">Après</text>
    </svg>
  )
  if (id === 'backend') return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0,${i * 52})`}>
          <rect x="80" y="16" width="184" height="36" rx="8" fill="currentColor" opacity={0.06 + i * 0.02} />
          <rect x="80" y="16" width="184" height="36" rx="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.18" />
          <circle cx="104" cy="34" r="6" fill="currentColor" opacity="0.6" />
          <circle cx="104" cy="34" r="3" fill="currentColor" opacity="0.9" />
          <rect x="118" y="27" width="90" height="7" rx="3" fill="currentColor" opacity={0.18 - i * 0.02} />
          <rect x="118" y="39" width="60" height="5" rx="2" fill="currentColor" opacity="0.1" />
          <rect x="232" y="26" width="22" height="14" rx="4" fill="currentColor" opacity="0.12" />
        </g>
      ))}
      {[34, 86, 138].map((y, i) => (
        <g key={i}>
          <line x1="18" y1={y} x2="80" y2={y} stroke="currentColor" strokeWidth="2" strokeDasharray="4,3" opacity="0.25" />
          <circle cx="18" cy={y} r="5" fill="currentColor" opacity="0.35" />
        </g>
      ))}
      <path d="M 288 18 L 310 26 L 310 50 Q 310 62 288 70 Q 266 62 266 50 L 266 26 Z"
        fill="currentColor" opacity="0.07" stroke="currentColor" strokeWidth="1.5" opacity2="0.2" />
      <text x="288" y="50" textAnchor="middle" fontSize="18" fill="currentColor" opacity="0.6">✓</text>
      <text x="288" y="84" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.35">Sécurisé</text>
    </svg>
  )
  if (id === 'algo') return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect x="120" y="12" width="80" height="26" rx="13" fill="currentColor" opacity="0.15" />
      <text x="160" y="30" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6" fontWeight="600">DONNÉES</text>
      <line x1="160" y1="38" x2="160" y2="56" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <polygon points="155,53 165,53 160,60" fill="currentColor" opacity="0.25" />
      <rect x="94" y="60" width="132" height="34" rx="6" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      <text x="160" y="82" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">Traitement auto</text>
      <line x1="160" y1="94" x2="160" y2="112" stroke="currentColor" strokeWidth="2" opacity="0.22" />
      <line x1="72"  y1="112" x2="248" y2="112" stroke="currentColor" strokeWidth="2" opacity="0.22" />
      <line x1="72"  y1="112" x2="72"  y2="128" stroke="currentColor" strokeWidth="2" opacity="0.22" />
      <line x1="160" y1="112" x2="160" y2="128" stroke="currentColor" strokeWidth="2" opacity="0.22" />
      <line x1="248" y1="112" x2="248" y2="128" stroke="currentColor" strokeWidth="2" opacity="0.22" />
      <rect x="26"  y="128" width="92" height="26" rx="6" fill="currentColor" opacity="0.1" />
      <text x="72"  y="145" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.65">Rapport auto</text>
      <rect x="114" y="128" width="92" height="26" rx="6" fill="currentColor" opacity="0.1" />
      <text x="160" y="145" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.65">Notification</text>
      <rect x="202" y="128" width="92" height="26" rx="6" fill="currentColor" opacity="0.1" />
      <text x="248" y="145" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.65">Dashboard</text>
      <rect x="210" y="8"  width="88" height="28" rx="8" fill="currentColor" opacity="0.12" />
      <text x="254" y="27" textAnchor="middle" fontSize="13" fill="currentColor" opacity="0.85" fontWeight="800">− 80%</text>
      <text x="254" y="48" textAnchor="middle" fontSize="8"  fill="currentColor" opacity="0.4">temps manuel</text>
      <circle cx="30" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <line x1="30" y1="28" x2="30" y2="17" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <line x1="30" y1="28" x2="39" y2="28" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    </svg>
  )
  return null
}

/* ─── sous-menu sticky ────────────────────────────────────────── */
// Navbar height ≈ 65px → sticky top-[65px]
function ServiceNav({ activeId }) {
  const { t, i18n } = useTranslation()
  const isFr = i18n.language?.startsWith('fr')

  const scrollTo = (id) => {
    const el = document.getElementById(`service-${id}`)
    if (!el) return
    const navH = 65   // navbar
    const subH = 80   // sous-menu lui-même
    const y = el.getBoundingClientRect().top + window.scrollY - navH - subH
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div className="sticky top-[65px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {services.map((s) => {
            const Icon = s.icon
            const isActive = activeId === s.id
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 w-full
                  ${isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary-light/10'
                  }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors
                  ${isActive
                    ? 'bg-white/20'
                    : 'bg-white dark:bg-gray-700 group-hover:bg-primary/10 dark:group-hover:bg-primary-light/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-primary dark:text-primary-light'}`} />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold leading-tight ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                    {t(`${s.i18nKey}.title`)}
                  </p>
                  <p className={`text-xs mt-0.5 leading-tight ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                    {isFr ? s.tagline_fr : s.tagline_en}
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

/* ─── fonds alternants (comme la Home) ───────────────────────── */
const sectionBg = [
  'bg-white dark:bg-gray-900',
  'bg-gray-50 dark:bg-gray-800/40',
  'bg-white dark:bg-gray-900',
  'bg-gray-50 dark:bg-gray-800/40',
]

/* ─── section individuelle ────────────────────────────────────── */
function ServiceSection({ service, index, onVisible }) {
  const { t, i18n } = useTranslation()
  const isFr = i18n.language?.startsWith('fr')
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

          {/* Numéro + icône */}
          <motion.div custom={0} variants={fadeUp} className="flex items-center gap-3 mb-5">
            <span className="text-5xl font-black text-gray-100 dark:text-gray-700/60 leading-none select-none">
              0{index + 1}
            </span>
            <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary-light/10 flex items-center justify-center">
              <Icon className="w-4.5 h-4.5 text-primary dark:text-primary-light" />
            </div>
          </motion.div>

          {/* Titre du service */}
          <motion.h2 custom={1} variants={fadeUp} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-2">
            {t(`${service.i18nKey}.title`)}
          </motion.h2>

          {/* Accroche — ton positif, pas accusateur */}
          <motion.p custom={2} variants={fadeUp} className="text-sm font-medium text-primary dark:text-primary-light mb-6">
            {t(`${service.i18nKey}.hook`)}
          </motion.p>

          {/* Solution */}
          <motion.p custom={3} variants={fadeUp} className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg whitespace-pre-line">
            {t(`${service.i18nKey}.solution`)}
          </motion.p>

          {/* Tags */}
          <motion.div custom={4} variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
            {t(`${service.i18nKey}.tags`).split(',').map(tag => (
              <span key={tag} className="px-2.5 py-1 text-xs font-semibold rounded-md bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary-light border border-primary/15 dark:border-primary-light/20">
                {tag.trim()}
              </span>
            ))}
          </motion.div>

          {/* Impact */}
          <motion.div custom={5} variants={fadeUp} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 mb-8 shadow-sm">
            <TrendingUp className="w-5 h-5 mt-0.5 shrink-0 text-primary dark:text-primary-light" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-primary dark:text-primary-light">
                {isFr ? 'Résultat client' : 'Business outcome'}
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {t(`${service.i18nKey}.impact`)}
              </p>
            </div>
          </motion.div>

          {/* Stats + CTA côte à côte */}
          <motion.div custom={6} variants={fadeUp} className="flex flex-wrap items-center gap-8">
            {service.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-extrabold text-primary dark:text-primary-light">{stat.value}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {isFr ? stat.label_fr : stat.label_en}
                </span>
              </div>
            ))}
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white bg-primary dark:bg-primary-light hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-md ml-auto"
            >
              {isFr ? 'Découvrir mes réalisations' : 'See my work'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* ── Illustration ── */}
        <motion.div custom={2} variants={fadeUp} className="flex-1 min-w-0 w-full max-w-md">
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 shadow-lg p-6 aspect-[16/10] text-primary dark:text-primary-light">
            <Illustration id={service.id} />
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light border border-primary/20 dark:border-primary-light/20 shadow-sm">
              <CheckCircle className="w-3.5 h-3.5" />
              {service.stats[0].value} {isFr ? service.stats[0].label_fr : service.stats[0].label_en}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

/* ─── page ────────────────────────────────────────────────────── */
export default function Services() {
  const { t, i18n } = useTranslation()
  const isFr = i18n.language?.startsWith('fr')
  const [activeId, setActiveId] = useState(services[0].id)

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
          {isFr ? 'Comment je peux vous aider' : 'How I can help you'}
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

      {/* Sous-menu sticky */}
      <ServiceNav activeId={activeId} />

      {/* 4 sections */}
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
            {isFr ? 'Prêt à démarrer ?' : 'Ready to start?'}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {isFr ? 'Un projet en tête ?' : 'Have a project in mind?'}
          </h2>
          <p className="text-sm text-white/70 mb-8 max-w-md mx-auto">
            {isFr
              ? 'Discutons de vos besoins et voyons ensemble comment je peux vous aider.'
              : "Let's talk about your needs and see how I can help."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/#contact"
              onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-white text-primary hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-md"
            >
              {isFr ? 'Me contacter' : 'Contact me'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white border border-white/30 hover:bg-white/10 transition-all duration-200"
            >
              {isFr ? 'Voir mes réalisations' : 'See my work'}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
