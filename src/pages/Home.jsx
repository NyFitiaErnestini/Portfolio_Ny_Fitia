import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Code, Gauge, FlaskConical, Rocket, Search, LayoutTemplate, HeartHandshake, Server, Brain, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import AnimatedPhoto from '../components/ui/AnimatedPhoto'
import { useCountUp } from '../hooks/useCountUp'
import CursorParticles from '../components/ui/CursorParticles'

const pipelineSteps = [
  { Icon: Search,        key: 'analyse'  },
  { Icon: LayoutTemplate, key: 'cadrage'  },
  { Icon: Code,          key: 'code'     },
  { Icon: FlaskConical,  key: 'test'     },
  { Icon: Rocket,        key: 'deploy'   },
  { Icon: HeartHandshake, key: 'suivi'   },
]

function PipelineStep({ step, index, activeStep, setActiveStep }) {
  const isActive = activeStep === index
  const [hovered, setHovered] = useState(false)
  const { t } = useTranslation()

  const [entered, setEntered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      onAnimationComplete={() => setEntered(true)}
      transition={{
        delay: index * 0.18,
        duration: 0.5,
      }}
      className="relative flex flex-col items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="flex flex-col items-center gap-3 w-full"
        animate={entered ? { y: [0, -14, 0] } : {}}
        transition={{
          delay: index * 0.4,
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 5 * 0.4 + 1.2,
          ease: 'easeInOut',
        }}
      >
      <button
        onClick={() => setActiveStep(isActive ? null : index)}
        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 cursor-pointer
          ${isActive
            ? 'bg-primary border-primary shadow-xl shadow-primary/20 scale-105'
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:scale-105'
          }`}
      >
        <step.Icon className={`w-8 h-8 md:w-10 md:h-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-primary dark:text-primary-light'}`} />
      </button>

      <div className="flex flex-col items-center gap-0.5">
        <span className={`text-sm md:text-base font-bold whitespace-nowrap transition-colors ${isActive ? 'text-primary dark:text-primary-light' : 'text-gray-800 dark:text-gray-200'}`}>
          {t(`pipeline.${step.key}.label`)}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{t('pipeline.step')} {index + 1}</span>
      </div>
      </motion.div>

      {/* Hover popup — vrai contenu */}
      {hovered && !isActive && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-5 text-left z-40 pointer-events-none"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <step.Icon className="w-5 h-5 text-primary dark:text-primary-light" />
            </div>
            <p className="font-bold text-gray-900 dark:text-white text-base">{t(`pipeline.${step.key}.title`)}</p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{t(`pipeline.${step.key}.description`)}</p>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/8 dark:bg-primary/15 border border-primary/20 dark:border-primary-light/20">
            <span className="text-primary dark:text-primary-light font-bold text-sm mt-0.5">✓</span>
            <p className="text-sm font-medium text-primary dark:text-primary-light">{t(`pipeline.${step.key}.benefit`)}</p>
          </div>
          {/* Flèche pointant vers le bas */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-gray-800" />
        </motion.div>
      )}
    </motion.div>
  )
}

function Pipeline() {
  const [activeStep, setActiveStep] = useState(null)
  const active = activeStep !== null ? pipelineSteps[activeStep] : null
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target)) {
        setActiveStep(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto">
      {/* Ligne 1 : étapes 1-2-3 */}
      {[0, 1].map((rowIndex) => (
        <div key={rowIndex}>
          <div className="flex items-start justify-center gap-0">
            {pipelineSteps.slice(rowIndex * 3, rowIndex * 3 + 3).map((step, i) => {
              const globalIndex = rowIndex * 3 + i
              return (
                <div key={step.key} className="flex items-center">
                  <PipelineStep step={step} index={globalIndex} activeStep={activeStep} setActiveStep={setActiveStep} />
                  {i < 2 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: globalIndex * 0.1 + 0.2, duration: 0.4 }}
                      className="origin-left mx-6 md:mx-12 mb-8"
                    >
                      <div className="flex items-center gap-0.5">
                        <div className="w-10 md:w-20 h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-500 dark:to-gray-700 rounded-full" />
                        <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 -ml-1" />
                      </div>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
          {/* Flèche de retour entre ligne 1 et ligne 2 */}
          {rowIndex === 0 && (
            <div className="flex justify-end pr-8 md:pr-16 my-1">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex flex-col items-center text-gray-300 dark:text-gray-600"
              >
                <div className="w-0.5 h-6 bg-gradient-to-b from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 rounded-full" />
                <ArrowRight className="w-4 h-4 rotate-90 text-gray-400 dark:text-gray-500 -mt-1" />
              </motion.div>
            </div>
          )}
        </div>
      ))}

      {/* Detail card au clic */}
      {active && (
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-left shadow-lg"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <active.Icon className="w-5 h-5 text-primary dark:text-primary-light" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg md:text-xl">
                  {t(`pipeline.${active.key}.title`)}
                </h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {t(`pipeline.${active.key}.description`)}
              </p>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/8 dark:bg-primary/15 border border-primary/20 dark:border-primary-light/20">
                <span className="text-primary dark:text-primary-light font-bold text-base mt-0.5">✓</span>
                <p className="text-sm font-medium text-primary dark:text-primary-light">
                  {t(`pipeline.${active.key}.benefit`)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveStep(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
        Cliquez sur une étape pour en savoir plus
      </p>
    </div>
  )
}

function AnimatedStat({ target, suffix = '', prefix = '', label, delay = 0 }) {
  const { count, ref } = useCountUp(target, 2000)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <p className="text-3xl md:text-4xl font-bold text-primary dark:text-primary-light">
        {prefix}{count}{suffix}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 py-16 md:py-0 overflow-hidden">
        <CursorParticles />
        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — Text */}
          <div className="order-2 md:order-1">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-6"
            >
              {t('hero.badge')}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
            >
              {t('hero.title.line1')}<br />
              <span className="text-primary dark:text-primary-light">{t('hero.title.line2')}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base text-gray-600 dark:text-gray-400 max-w-md mb-8 leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                {t('hero.cta.contact')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-7 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:border-primary hover:text-primary dark:hover:border-primary-light dark:hover:text-primary-light transition-all"
              >
                {t('hero.cta.services')}
              </Link>
            </motion.div>
          </div>

          {/* Right — Photo */}
          <div className="order-1 md:order-2 flex justify-center relative">
            <AnimatedPhoto src="/image_42.png" alt="Ny Fitia" />
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -right-2 md:right-4 top-4 md:top-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg px-4 py-2.5 border border-gray-100 dark:border-gray-700 z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('hero.available')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-y border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50"
      >
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 gap-8">
          <AnimatedStat target={3} suffix="+" label={t('stats.years')} delay={0} />
          <AnimatedStat target={10} suffix="+" label={t('stats.projects')} delay={0.1} />
          <AnimatedStat target={100} suffix="%" label={t('stats.satisfaction')} delay={0.2} />
        </div>
      </motion.section>

      {/* Section — Ce que je fais */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t('home.services.title')}
            </h2>
            <div className="inline-flex items-center gap-3 mt-4 px-5 py-3 rounded-2xl border border-primary/20 dark:border-primary-light/20 bg-primary/5 dark:bg-primary/10">
              <span className="px-3 py-1 rounded-lg bg-primary text-white font-bold text-sm md:text-base shadow-sm">
                Solutions Techniques
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base">{t('home.services.adapted')}</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { Icon: Code, key: 'webdev' },
              { Icon: Server, key: 'backend' },
              { Icon: Gauge, key: 'performance' },
              { Icon: Brain, key: 'algo' },
            ].map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to="/services"
                  className="group flex flex-col gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary dark:hover:border-primary-light hover:shadow-lg transition-all no-underline h-full"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.Icon className="w-6 h-6 text-primary dark:text-primary-light" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                        {t(`services.${item.key}.title`)}
                      </h3>
                      <p className="text-sm font-medium text-primary dark:text-primary-light mb-1">
                        {t(`services.${item.key}.problem`)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {t(`services.${item.key}.description`)}
                      </p>
                    </div>
                  </div>
                  {/* Tags / mots-clés */}
                  <div className="flex flex-wrap gap-2">
                    {t(`services.${item.key}.tags`).split(',').map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-semibold rounded-md bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary-light border border-primary/15 dark:border-primary-light/20"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-10"
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-primary dark:text-primary-light font-medium hover:underline"
            >
              {t('home.services.seeAll')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section — Ma méthode */}
      <section className="px-6 pt-20 pb-16 border-y border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {t('home.method.title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{t('home.method.subtitle')}</p>
          </motion.div>
          <Pipeline />
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 pt-10 pb-20"
      >
        <div className="max-w-5xl mx-auto rounded-3xl px-8 py-16 overflow-hidden relative">

          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-gray-900 dark:text-white">
            {t('home.cta.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12 max-w-xl mx-auto">
            {t('home.cta.description')}
          </p>

          {/* Storyline 3 étapes */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-12">

            {/* Étape 1 — Pense */}
            {[
              {
                label: t('home.cta.step1'),
                svg: (
                  <svg viewBox="0 0 120 130" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ombre */}
                    <ellipse cx="60" cy="118" rx="22" ry="6" fill="#1e3a5f" fillOpacity="0.12"/>
                    {/* Jambes */}
                    <rect x="50" y="90" width="8" height="22" rx="4" fill="#3b82c4"/>
                    <rect x="62" y="90" width="8" height="22" rx="4" fill="#3b82c4"/>
                    {/* Torse */}
                    <rect x="43" y="60" width="34" height="34" rx="10" fill="#1e3a5f"/>
                    {/* Bras gauche — main sur menton */}
                    <rect x="28" y="68" width="16" height="7" rx="3.5" fill="#3b82c4"/>
                    <rect x="28" y="72" width="7" height="14" rx="3.5" fill="#3b82c4"/>
                    {/* Bras droit */}
                    <rect x="77" y="68" width="14" height="7" rx="3.5" fill="#3b82c4"/>
                    {/* Tête */}
                    <circle cx="60" cy="42" r="18" fill="#e8f0fe"/>
                    {/* Yeux pensifs */}
                    <circle cx="53" cy="40" r="2.5" fill="#1e3a5f"/>
                    <circle cx="67" cy="40" r="2.5" fill="#1e3a5f"/>
                    <path d="M53 47 Q60 44 67 47" stroke="#1e3a5f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    {/* Bulle de pensée */}
                    <circle cx="85" cy="16" r="13" fill="white" stroke="#1e3a5f" strokeWidth="1.5"/>
                    <circle cx="75" cy="27" r="4" fill="white" stroke="#1e3a5f" strokeWidth="1.2"/>
                    <circle cx="70" cy="33" r="2.5" fill="white" stroke="#1e3a5f" strokeWidth="1"/>
                    <text x="79" y="21" fontSize="13" fill="#1e3a5f" fontWeight="bold">?</text>
                  </svg>
                ),
              },
              {
                label: t('home.cta.step2'),
                svg: (
                  <svg viewBox="0 0 120 130" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ombre */}
                    <ellipse cx="60" cy="118" rx="22" ry="6" fill="#1e3a5f" fillOpacity="0.12"/>
                    {/* Jambes */}
                    <rect x="50" y="90" width="8" height="22" rx="4" fill="#3b82c4"/>
                    <rect x="62" y="90" width="8" height="22" rx="4" fill="#3b82c4"/>
                    {/* Torse */}
                    <rect x="43" y="60" width="34" height="34" rx="10" fill="#1e3a5f"/>
                    {/* Bras gauche — tenant téléphone */}
                    <rect x="30" y="62" width="14" height="7" rx="3.5" fill="#3b82c4"/>
                    {/* Téléphone */}
                    <rect x="22" y="52" width="11" height="18" rx="4" fill="#1e3a5f" stroke="#3b82c4" strokeWidth="1.5"/>
                    <rect x="25" y="55" width="5" height="9" rx="1.5" fill="#e8f0fe" fillOpacity="0.6"/>
                    {/* Bras droit */}
                    <rect x="77" y="68" width="14" height="7" rx="3.5" fill="#3b82c4"/>
                    {/* Tête */}
                    <circle cx="60" cy="42" r="18" fill="#e8f0fe"/>
                    {/* Visage — sourire */}
                    <circle cx="53" cy="40" r="2.5" fill="#1e3a5f"/>
                    <circle cx="67" cy="40" r="2.5" fill="#1e3a5f"/>
                    <path d="M53 47 Q60 51 67 47" stroke="#1e3a5f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    {/* Ondes */}
                    <path d="M14 62 Q8 57 14 52" stroke="#3b82c4" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <path d="M10 66 Q1 57 10 48" stroke="#3b82c4" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
                  </svg>
                ),
              },
              {
                label: t('home.cta.step3'),
                svg: (
                  <svg viewBox="0 0 120 130" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ombre */}
                    <ellipse cx="60" cy="118" rx="22" ry="6" fill="#1e3a5f" fillOpacity="0.12"/>
                    {/* Jambes */}
                    <rect x="50" y="90" width="8" height="22" rx="4" fill="#3b82c4"/>
                    <rect x="62" y="90" width="8" height="22" rx="4" fill="#3b82c4"/>
                    {/* Torse */}
                    <rect x="43" y="60" width="34" height="34" rx="10" fill="#1e3a5f"/>
                    {/* Bras gauche levé */}
                    <rect x="29" y="52" width="15" height="7" rx="3.5" fill="#3b82c4" transform="rotate(-40 29 52)"/>
                    {/* Bras droit levé */}
                    <rect x="76" y="52" width="15" height="7" rx="3.5" fill="#3b82c4" transform="rotate(40 91 52)"/>
                    {/* Tête */}
                    <circle cx="60" cy="42" r="18" fill="#e8f0fe"/>
                    {/* Grand sourire */}
                    <circle cx="53" cy="39" r="2.5" fill="#1e3a5f"/>
                    <circle cx="67" cy="39" r="2.5" fill="#1e3a5f"/>
                    <path d="M51 46 Q60 55 69 46" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    {/* Étoiles */}
                    <text x="82" y="26" fontSize="11" fill="#f59e0b">★</text>
                    <text x="93" y="16" fontSize="9" fill="#f59e0b" fillOpacity="0.8">★</text>
                    <text x="73" y="14" fontSize="8" fill="#f59e0b" fillOpacity="0.7">★</text>
                  </svg>
                ),
              },
            ].map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="rounded-2xl p-4">
                    {step.svg}
                  </div>
                  <span className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-1">{step.label}</span>
                </motion.div>

                {i < 2 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.3, duration: 0.4 }}
                    className="hidden md:flex items-center mx-8 origin-left"
                  >
                    <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-500 -ml-1" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-lg"
            >
              {t('home.cta.button')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <HomeContact />
    </div>
  )
}

function HomeContact() {
  const { t } = useTranslation()
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm()

  const onSubmit = (data) => {
    const { name, email, message } = data
    const subject = `Contact from ${name}`
    const body = `Nom: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`
    window.location.href = `mailto:contact@nyfitia.com?subject=${subject}&body=${body}`
    reset()
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="contact"
      className="border-t border-gray-200 dark:border-gray-700"
    >
      {/* Titre centré */}
      <div className="px-6 pt-20 pb-6 text-center bg-white dark:bg-gray-800/50">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-4">
          <Mail className="w-3.5 h-3.5" />
          {t('contact.title')}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {t('home.contact.title')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          {t('home.contact.description')}
        </p>
      </div>

      {/* Deux colonnes sur fond différent */}
      <div className="bg-white dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-0 items-start">

        {/* Gauche — infos contact */}
        <div className="md:pr-12 md:border-r border-gray-200 dark:border-gray-700 pb-10 md:pb-0">

          <div className="flex flex-col gap-4">
            {/* Email */}
            <a href="mailto:ernestininyfitia@gmail.com" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-4.5 h-4.5 text-primary dark:text-primary-light" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{t('contact.email')}</p>
                <p className="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">ernestininyfitia@gmail.com</p>
              </div>
            </a>

            {/* WhatsApp + Appel */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-4.5 h-4.5 text-primary dark:text-primary-light" />
              </div>
              <div>
                <div className="flex gap-3 text-xs text-gray-400 dark:text-gray-500 mb-1">
                  <a href="https://wa.me/261342339677" target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-primary-light transition-colors">WhatsApp</a>
                  <span>/</span>
                  <a href="tel:+261342339677" className="hover:text-primary dark:hover:text-primary-light transition-colors">{t('contact.call')}</a>
                </div>
                <p className="text-base font-semibold text-gray-800 dark:text-gray-200">+261 34 23 396 77</p>
              </div>
            </div>

            {/* Localisation */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4.5 h-4.5 text-primary dark:text-primary-light" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{t('contact.location')}</p>
                <p className="text-base font-medium text-gray-800 dark:text-gray-200">Madagascar</p>
              </div>
            </div>

            {/* Liens pro */}
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.linkedin.com/in/ny-fitia-ernestini-7976a726a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary-light dark:hover:text-primary-light transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a
                href="https://www.malt.fr/profile/nyfitiaernestini1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary-light dark:hover:text-primary-light transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Malt
              </a>
            </div>
          </div>
        </div>

        {/* Droite — formulaire */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 md:pl-12">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                {...register('name', { required: true })}
                placeholder={t('contact.name.placeholder')}
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition-colors focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.name ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'}`}
              />
            </div>
            <div>
              <input
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                type="email"
                placeholder={t('contact.email.placeholder')}
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition-colors focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.email ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'}`}
              />
            </div>
          </div>
          <textarea
            {...register('message', { required: true })}
            rows={7}
            placeholder={t('contact.message.placeholder')}
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition-colors focus:ring-2 focus:ring-primary focus:border-transparent resize-none
              ${errors.message ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'}`}
          />
          <button
            type="submit"
            className="self-start inline-flex items-center gap-2 px-7 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            {t('contact.send')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        </div>
      </div>
    </motion.section>
  )
}
