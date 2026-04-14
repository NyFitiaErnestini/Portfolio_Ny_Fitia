import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  GraduationCap, Wrench, Sparkles, Eye, Download,
  MapPin, Code2, Server, Database, Terminal, Layers,
  Building2, Calendar, ExternalLink,
} from 'lucide-react'
import CvModal from '../components/ui/CvModal'

/* ─── Formations — clé i18n + méta ───────────────────────────── */
// side: 'right' = 42 Antananarivo + Orange Digital Center
// side: 'left'  = Université, E-media, Bac
const formations = [
  { key: 'algo',    school: '42 Antananarivo',      current: true,  side: 'right' },
  { key: 'master',  school: 'CNTEMAD',               current: true,  side: 'left'  },
  { key: 'core',    school: '42 Antananarivo',      current: false, side: 'right' },
  { key: 'licence', school: 'CNTEMAD',               current: false, side: 'left'  },
  { key: 'ux',      school: 'Orange Digital Center', current: false, side: 'right' },
  { key: 'web',     school: 'E-media',               current: false, side: 'left'  },
  { key: 'bac',     school: '',                      current: false, side: 'right' },
  { key: 'baclit',  school: '',                      current: false, side: 'left'  },
]

/* ─── Compétences par groupe — clé i18n + skills ─────────────── */
const skillGroups = [
  { icon: Code2,    labelKey: 'profil.skills.frontend', skills: ['JavaScript', 'TypeScript', 'React'] },
  { icon: Server,   labelKey: 'profil.skills.backend',  skills: ['Node.js', 'Fastify', 'PHP', 'Symfony', 'Python'] },
  { icon: Terminal, labelKey: 'profil.skills.system',   skills: ['C', 'C++', 'Linux', 'Git'] },
  { icon: Database, labelKey: 'profil.skills.data',     skills: ['PostgreSQL', 'SQLite', 'Docker', 'Odoo ERP'] },
  { icon: Layers,   labelKey: 'profil.skills.protocols',skills: ['REST API', 'WebSocket', 'Mercure'] },
  { icon: Sparkles, labelKey: 'profil.skills.soft',     softKey: 'profil.skills.soft.list', soft: true },
]

const socialLinks = [
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/ny-fitia-ernestini-7976a726a',
    label: 'LinkedIn',
    colorClass: 'text-primary dark:text-primary-light hover:border-primary/30 dark:hover:border-primary-light/30 hover:bg-primary/8 dark:hover:bg-primary-light/8',
  },
  {
    key: 'github',
    href: 'https://github.com/NyFitiaErnestini',
    label: 'GitHub',
    colorClass: 'text-primary dark:text-primary-light hover:border-primary/30 dark:hover:border-primary-light/30 hover:bg-primary/8 dark:hover:bg-primary-light/8',
  },
  {
    key: 'codingame',
    href: 'https://www.codingame.com/profile/556e9450180001bde68c6b6e1fc6dc228799885',
    label: 'CodingGame',
    colorClass: 'text-primary dark:text-primary-light hover:border-primary/30 dark:hover:border-primary-light/30 hover:bg-primary/8 dark:hover:bg-primary-light/8',
  },
  {
    key: 'malt',
    href: 'https://www.malt.fr/profile/nyfitiaernestini1',
    label: 'Malt',
    colorClass: 'text-primary dark:text-primary-light hover:border-primary/30 dark:hover:border-primary-light/30 hover:bg-primary/8 dark:hover:bg-primary-light/8',
  },
]

function SocialIcon({ platform }) {
  if (platform === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M4.98 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 8.75h3.96V21H3V8.75Zm6.46 0h3.8v1.67h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21H17.9v-5.82c0-1.39-.03-3.18-1.94-3.18-1.95 0-2.25 1.52-2.25 3.08V21H9.46V8.75Z" />
      </svg>
    )
  }

  if (platform === 'github') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.23 1.84 1.23 1.08 1.84 2.82 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.9 0-1.3.46-2.36 1.22-3.19-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.22a11.4 11.4 0 0 1 6 0c2.3-1.54 3.29-1.22 3.29-1.22.66 1.65.25 2.88.13 3.18.76.83 1.22 1.89 1.22 3.19 0 4.58-2.82 5.6-5.5 5.89.43.37.82 1.1.82 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
      </svg>
    )
  }

  if (platform === 'codingame') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M9.1 5.2 2.7 9.1v5.8l6.4 3.9 1.7-2.8-4-2.4V10.4l4-2.4-1.7-2.8Zm5.8 0-1.7 2.8 4 2.4v3.2l-4 2.4 1.7 2.8 6.4-3.9V9.1l-6.4-3.9ZM8.9 20.5h6.2v-3H8.9v3Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M4 19V5h3.2l4.8 6.6L16.8 5H20v14h-3v-8.8L12 17 7 10.2V19H4Z" />
    </svg>
  )
}

/* ─── Animation ───────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: 'easeOut' },
  }),
}

/* ─── Timeline formations — split gauche / droite ─────────────── */
function FormationTimeline() {
  const { t } = useTranslation()

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Ligne centrale — cachée sur mobile */}
      <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
      {/* Ligne gauche — mobile uniquement */}
      <div className="sm:hidden absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

      {formations.map((f, i) => {
        const isRight = f.side === 'right'
        const desc = t(`profil.edu.${f.key}.desc`, { defaultValue: '' })
        return (
          <motion.div
            key={f.key}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`relative mb-2 flex items-start flex-row pl-10 sm:pl-0 ${isRight ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}
          >
            {/* Card — mobile: pleine largeur, desktop: moitié */}
            <div className={`w-full sm:w-[calc(50%-28px)] text-left ${isRight ? 'sm:text-right' : 'sm:text-left'}`}>
              <div className={`p-3 rounded-xl border bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow
                ${f.current ? 'border-primary/40 dark:border-primary-light/40' : 'border-gray-200 dark:border-gray-700'}`}
              >
                {/* École — chip avec icône */}
                {f.school && (
                  <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2
                    ${f.current
                      ? 'bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
                  >
                    <Building2 className="w-2.5 h-2.5 shrink-0" />
                    {f.school}
                  </div>
                )}

                {/* Titre diplôme */}
                <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug mb-1">
                  {t(`profil.edu.${f.key}.title`)}
                </p>

                {/* Période */}
                <div className={`flex items-center gap-1 text-xs font-medium text-gray-400 dark:text-gray-500 mb-1 justify-start ${isRight ? 'sm:justify-end' : 'sm:justify-start'}`}>
                  <Calendar className="w-2.5 h-2.5 shrink-0" />
                  {t(`profil.edu.${f.key}.period`)}
                </div>

                {/* Description */}
                {desc && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
                    {desc}
                  </p>
                )}

                {/* Badge "En cours" */}
                {f.current && (
                  <div className={`flex mt-2 justify-start ${isRight ? 'sm:justify-end' : 'sm:justify-start'}`}>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary dark:text-primary-light bg-primary/10 dark:bg-primary-light/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light animate-pulse" />
                      {t('profil.edu.current')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Nœud — mobile: à gauche, desktop: centré */}
            <div className="absolute sm:left-1/2 left-0 sm:-translate-x-1/2 z-10 top-4">
              <div className={`w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-900
                ${f.current
                  ? 'bg-primary dark:bg-primary-light scale-125 shadow-[0_0_0_3px_rgba(59,130,196,0.2)]'
                  : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            </div>

            {/* Connecteur horizontal — desktop uniquement */}
            <div className={`hidden sm:block absolute top-[22px] w-8 h-0.5
              ${isRight ? 'right-[calc(50%+7px)]' : 'left-[calc(50%+7px)]'}
              ${f.current ? 'bg-primary dark:bg-primary-light' : 'bg-gray-200 dark:bg-gray-700'}`}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─── Page Profil ─────────────────────────────────────────────── */
export default function Profil() {
  const { t } = useTranslation()
  const [cvOpen, setCvOpen] = useState(false)

  return (
    <div>
      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />

      {/* ══ Qui suis-je — hero split ══════════════════════════════ */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        {/* Fond décoratif */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 dark:bg-primary-light/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-primary/4 dark:bg-primary-light/4 blur-2xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="shrink-0"
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary-light/15 dark:to-primary-light/5 blur-sm" />
                <div className="relative w-44 h-44 lg:w-52 lg:h-52 rounded-2xl overflow-hidden ring-2 ring-primary/20 dark:ring-primary-light/20 shadow-xl">
                  <img
                    src="/image_fitia.png"
                    alt="Ny Fitia Ernestini"
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-full px-3 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                    {t('profil.available')}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Texte */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary dark:text-primary-light uppercase tracking-widest mb-4"
              >
                <MapPin className="w-3.5 h-3.5" />
                Madagascar
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.07 }}
                className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-2"
              >
                Ny Fitia Ernestini
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.13 }}
                className="text-base font-medium text-primary dark:text-primary-light mb-6"
              >
                {t('profil.role')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl"
              >
                <p>{t('profil.bio1')}</p>
                <p>{t('profil.bio2')}</p>
                <p>{t('profil.bio3')}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Compétences — grille de cartes ═══════════════════════ */}
      <section className="bg-gray-50 dark:bg-gray-800/40 px-6 py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <div className="flex items-center gap-3 mb-1">
              <Wrench className="w-5 h-5 text-primary dark:text-primary-light" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('profil.skills.title')}
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-8">
              {t('profil.skills.sub')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillGroups.map((group, i) => {
              const Icon = group.icon
              const skills = group.soft
                ? t(group.softKey).split(',')
                : group.skills
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2 rounded-lg bg-primary/8 dark:bg-primary-light/10">
                      <Icon className="w-4 h-4 text-primary dark:text-primary-light" />
                    </div>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                      {t(group.labelKey)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 text-xs font-medium rounded-full border
                          ${group.soft
                            ? 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                            : 'bg-primary/6 dark:bg-primary-light/10 text-primary dark:text-primary-light border-primary/12 dark:border-primary-light/20'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ Formations — timeline split ═══════════════════════════ */}
      <section className="bg-white dark:bg-gray-900 px-6 py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <div className="flex items-center gap-3 mb-1">
              <GraduationCap className="w-5 h-5 text-primary dark:text-primary-light" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('profil.edu.title')}
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-8">
              {t('profil.edu.sub')}
            </p>
          </motion.div>
          <FormationTimeline />
        </div>
      </section>

      {/* ══ Réseaux — liens externes ═════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-gray-800/40 px-6 py-12 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <ExternalLink className="w-5 h-5 text-primary dark:text-primary-light" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('profil.social.title')}
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-8">
              {t('profil.social.sub')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {socialLinks.map((item, i) => {
              return (
                <motion.a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={item.label}
                  title={item.label}
                  className={`group inline-flex h-16 w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 no-underline ${item.colorClass}`}
                >
                  <SocialIcon platform={item.key} />
                  <span className="text-sm font-semibold">
                    {item.label}
                  </span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ CV — bandeau CTA ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary dark:bg-primary-dark px-6 py-14">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.p
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-3"
          >
            {t('profil.cv.label')}
          </motion.p>
          <motion.h3
            custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-xl font-bold text-white mb-2"
          >
            {t('profil.cv.title')}
          </motion.h3>
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-sm text-white/70 mb-8"
          >
            {t('profil.cv.sub')}
          </motion.p>
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => setCvOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-primary dark:text-primary-dark bg-white hover:bg-gray-50 shadow-md"
            >
              <Eye className="w-4 h-4" />
              {t('profil.cv.view')}
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              href="/docs/CV_NyFitia.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white border border-white/30 hover:bg-white/10"
            >
              <Download className="w-4 h-4" />
              {t('profil.cv.download')}
            </motion.a>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
