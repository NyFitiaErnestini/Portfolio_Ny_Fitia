import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '../data/projects'
import {
  Download, MapPin, Calendar, GitFork,
  GraduationCap, Briefcase, Code2, ArrowUpRight, Wrench, Sparkles,
} from 'lucide-react'

/* ─── Expériences (du CV) ─────────────────────────────────────── */
const experiences = [
  {
    role_fr: 'Développeur Full-Stack',
    role_en: 'Full-Stack Developer',
    company: 'E-media',
    type_fr: 'Temps partiel · Remote · France',
    type_en: 'Part-time · Remote · France',
    period_fr: 'Janvier 2026 — Présent',
    period_en: 'Jan 2026 — Present',
    desc_fr: 'Développement d\'applications web full-stack avec React et Node.js. Optimisation des performances backend avec Odoo.',
    desc_en: 'Full-stack web application development with React and Node.js. Backend performance optimization with Odoo.',
    tags: ['React', 'Node.js', 'Odoo'],
    current: true,
  },
  {
    role_fr: 'Développeur Backend',
    role_en: 'Backend Developer',
    company: 'eTech Consulting',
    type_fr: 'Stage',
    type_en: 'Internship',
    period_fr: 'Juin — Septembre 2025',
    period_en: 'Jun — Sep 2025',
    desc_fr: 'Développement d\'une plateforme digitale premium dédiée à la création de branding.',
    desc_en: 'Development of a premium digital platform dedicated to branding creation.',
    tags: ['PHP', 'Symfony', 'Backend'],
    current: false,
  },
]

/* ─── Formations (du CV, chronologie descendante) ─────────────── */
const formations = [
  {
    title_fr: 'Spécialisation Algorithmes, IA & Data',
    title_en: 'Algorithms, AI & Data Specialization',
    school: '42 Antananarivo',
    period_fr: 'Mars 2026 — Présent',
    period_en: 'Mar 2026 — Present',
    desc_fr: 'Structures de données, optimisation d\'algorithmes et analyse de données.',
    desc_en: 'Data structures, algorithm optimization and data analysis.',
    current: true,
    side: 'right',
  },
  {
    title_fr: 'Master I en Informatique',
    title_en: 'Master I — Computer Science',
    school: 'Université',
    period_fr: '2026',
    period_en: '2026',
    desc_fr: '',
    desc_en: '',
    current: false,
    side: 'left',
  },
  {
    title_fr: 'Tronc commun',
    title_en: 'Common Core',
    school: '42 Antananarivo',
    period_fr: 'Février 2024 — Mars 2026',
    period_en: 'Feb 2024 — Mar 2026',
    desc_fr: 'Programmation système et projets techniques en C/C++.',
    desc_en: 'System programming and technical projects in C/C++.',
    current: false,
    side: 'right',
  },
  {
    title_fr: 'Licence en Informatique',
    title_en: 'Bachelor — Computer Science',
    school: 'Université',
    period_fr: '2025',
    period_en: '2025',
    desc_fr: 'Spécialisé en Base de Données et Génie Logiciel.',
    desc_en: 'Specialized in Databases and Software Engineering.',
    current: false,
    side: 'left',
  },
  {
    title_fr: 'UX / UI Design',
    title_en: 'UX / UI Design',
    school: 'Orange Digital Center',
    period_fr: '2022',
    period_en: '2022',
    desc_fr: 'Conception d\'interfaces centrées utilisateur.',
    desc_en: 'User-centered interface design.',
    current: false,
    side: 'right',
  },
  {
    title_fr: 'Développement Web',
    title_en: 'Web Development',
    school: 'E-media',
    period_fr: '2022',
    period_en: '2022',
    desc_fr: 'Conception et développement de sites web.',
    desc_en: 'Web design and development.',
    current: false,
    side: 'left',
  },
  {
    title_fr: 'Baccalauréat Scientifique',
    title_en: 'Scientific Baccalaureate',
    school: '',
    period_fr: '2021',
    period_en: '2021',
    desc_fr: '',
    desc_en: '',
    current: false,
    side: 'right',
  },
]

/* ─── Compétences ─────────────────────────────────────────────── */
const hardSkills = [
  { label: 'JavaScript / React', level: 90 },
  { label: 'Node.js / Fastify',  level: 85 },
  { label: 'PHP / Symfony',      level: 80 },
  { label: 'Python',             level: 75 },
  { label: 'C / C++',            level: 80 },
  { label: 'PostgreSQL / SQLite',level: 78 },
  { label: 'Docker / DevOps',    level: 70 },
  { label: 'Odoo ERP',           level: 72 },
]

const softSkills = [
  { label_fr: 'Communication',         label_en: 'Communication' },
  { label_fr: 'Design Thinking',       label_en: 'Design Thinking' },
  { label_fr: 'Gestion de projet Agile', label_en: 'Agile Project Management' },
  { label_fr: 'Collaboration',         label_en: 'Collaboration' },
  { label_fr: 'Curiosité technique',   label_en: 'Technical Curiosity' },
  { label_fr: 'Adaptabilité',          label_en: 'Adaptability' },
]

/* ─── animation ───────────────────────────────────────────────── */
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
  let isDown = false, startX = 0, scrollLeft = 0

  const onMouseDown  = (e) => { isDown = true; startX = e.pageX - trackRef.current.offsetLeft; scrollLeft = trackRef.current.scrollLeft }
  const onMouseLeave = ()  => { isDown = false }
  const onMouseUp    = ()  => { isDown = false }
  const onMouseMove  = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = scrollLeft - (x - startX) * 1.2
  }

  return (
    <div
      ref={trackRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className="flex gap-5 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="shrink-0 w-72 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Image */}
          <div className="h-40 bg-gray-100 dark:bg-gray-700/60 overflow-hidden">
            <img
              src={project.image}
              alt={t(`${project.i18nKey}.title`)}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                {t(`${project.i18nKey}.title`)}
              </h3>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                  <GitFork className="w-4 h-4 text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors shrink-0" />
                </a>
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
        </div>
      ))}
      {/* Espace fin de défilement */}
      <div className="shrink-0 w-6" />
    </div>
  )
}

/* ─── Timeline Formations ─────────────────────────────────────── */
function FormationTimeline({ isFr }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

      {formations.map((f, i) => {
        const isLeft = f.side === 'left'
        return (
          <motion.div
            key={i}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`relative flex items-start mb-7 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Card */}
            <div className={`w-[calc(50%-28px)] ${isLeft ? 'text-right' : 'text-left'}`}>
              <div className={`p-4 rounded-xl border bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow
                ${f.current ? 'border-primary dark:border-primary-light' : 'border-gray-200 dark:border-gray-700'}`}
              >
                {f.school && (
                  <p className={`text-xs font-semibold mb-0.5 ${f.current ? 'text-primary dark:text-primary-light' : 'text-gray-400 dark:text-gray-500'}`}>
                    {f.school}
                  </p>
                )}
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                  {isFr ? f.title_fr : f.title_en}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {isFr ? f.period_fr : f.period_en}
                </p>
                {(isFr ? f.desc_fr : f.desc_en) && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-1">
                    {isFr ? f.desc_fr : f.desc_en}
                  </p>
                )}
              </div>
            </div>

            {/* Noeud */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10 top-4">
              <div className={`w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-900
                ${f.current ? 'bg-primary dark:bg-primary-light scale-125' : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            </div>

            {/* Connecteur horizontal */}
            <div className={`absolute top-[22px] w-5 h-0.5
              ${isLeft ? 'right-[calc(50%+7px)]' : 'left-[calc(50%+7px)]'}
              ${f.current ? 'bg-primary dark:bg-primary-light' : 'bg-gray-200 dark:bg-gray-700'}`}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function Portfolio() {
  const { t, i18n } = useTranslation()
  const isFr = i18n.language?.startsWith('fr')

  return (
    <div>

      {/* ── Hero ── */}
      <div className="px-6 pt-10 pb-10 text-center max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="text-xs font-semibold text-primary dark:text-primary-light uppercase tracking-widest mb-3"
        >
          {isFr ? 'Mon parcours' : 'My background'}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-3"
        >
          {isFr ? 'Projets, formations & expériences' : 'Projects, education & experience'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
          className="text-sm text-gray-500 dark:text-gray-400 mb-6"
        >
          {isFr ? 'Un aperçu de ce que j\'ai construit, appris et réalisé.' : 'An overview of what I built, learned and achieved.'}
        </motion.p>

        {/* Bouton CV — Télécharger mis en avant */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
        >
          <a
            href="/docs/CV_NyFitia.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white bg-primary dark:bg-primary-light hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-md"
          >
            <Download className="w-4 h-4" />
            {isFr ? 'Télécharger le CV' : 'Download Resume'}
          </a>
        </motion.div>
      </div>

      {/* ── Projets — défilement horizontal ── */}
      <section className="bg-gray-50 dark:bg-gray-800/40 border-y border-gray-100 dark:border-gray-800 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="px-6">
            <SectionHeader
              icon={Code2}
              title={isFr ? 'Réalisations' : 'Projects'}
              sub={isFr ? 'Glissez pour parcourir tous les projets.' : 'Drag to browse all projects.'}
            />
          </div>
          <div className="px-6">
            <ProjectCarousel />
          </div>
        </div>
      </section>

      {/* ── Expériences ── */}
      <section className="bg-white dark:bg-gray-900 px-6 py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            icon={Briefcase}
            title={isFr ? 'Expériences' : 'Experience'}
            sub={isFr ? 'Missions professionnelles.' : 'Professional roles.'}
          />

          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
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
                    {isFr ? 'En cours' : 'Current'}
                  </span>
                )}

                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1 pr-24">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {isFr ? exp.role_fr : exp.role_en}
                  </h3>
                  <span className="text-sm font-semibold text-primary dark:text-primary-light">
                    · {exp.company}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {isFr ? exp.period_fr : exp.period_en}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {isFr ? exp.type_fr : exp.type_en}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  {isFr ? exp.desc_fr : exp.desc_en}
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
        </div>
      </section>

      {/* ── Formations ── */}
      <section className="bg-gray-50 dark:bg-gray-800/40 px-6 py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            icon={GraduationCap}
            title={isFr ? 'Formations' : 'Education'}
            sub={isFr ? 'Parcours académique et formations spécialisées.' : 'Academic background and specialized training.'}
          />
          <FormationTimeline isFr={isFr} />
        </div>
      </section>

      {/* ── Compétences ── */}
      <section className="bg-white dark:bg-gray-900 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            icon={Wrench}
            title={isFr ? 'Compétences' : 'Skills'}
            sub={isFr
              ? 'Je ne me limite pas à ce que je maîtrise déjà — chaque projet est une opportunité d\'apprendre.'
              : 'I\'m not limited to what I already know — every project is an opportunity to learn.'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Hard skills */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Wrench className="w-4 h-4 text-primary dark:text-primary-light" />
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  {isFr ? 'Compétences techniques' : 'Technical skills'}
                </p>
              </div>
              <div className="space-y-4">
                {hardSkills.map((skill, i) => (
                  <motion.div
                    key={skill.label}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{skill.label}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary dark:bg-primary-light rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.07, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 italic mt-4">
                {isFr
                  ? '* Ces niveaux sont indicatifs. Je m\'adapte et j\'apprends rapidement selon les besoins du projet.'
                  : '* These levels are indicative. I adapt and learn quickly based on project needs.'}
              </p>
            </div>

            {/* Soft skills */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-primary dark:text-primary-light" />
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  {isFr ? 'Compétences personnelles' : 'Soft skills'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {softSkills.map((s, i) => (
                  <motion.span
                    key={s.label_fr}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-primary/8 dark:bg-primary-light/10 text-primary dark:text-primary-light border border-primary/15 dark:border-primary-light/20"
                  >
                    {isFr ? s.label_fr : s.label_en}
                  </motion.span>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {isFr
                    ? 'Je ne me base pas uniquement sur ce que je maîtrise déjà. Je suis capable d\'apprendre rapidement et de m\'adapter aux technologies et aux besoins spécifiques de chaque projet.'
                    : 'I don\'t rely only on what I already know. I\'m able to learn quickly and adapt to the technologies and specific needs of each project.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
