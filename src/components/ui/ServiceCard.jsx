import { useTranslation } from 'react-i18next'
import * as icons from 'lucide-react'
import { ArrowRight, CheckCircle } from 'lucide-react'

const illustrations = {
  webdev: (
    <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
      {/* Browser window */}
      <rect x="10" y="10" width="180" height="100" rx="8" fill="currentColor" className="text-primary/10 dark:text-primary-light/10" />
      <rect x="10" y="10" width="180" height="22" rx="8" fill="currentColor" className="text-primary/20 dark:text-primary-light/20" />
      <circle cx="26" cy="21" r="4" fill="currentColor" className="text-red-400" />
      <circle cx="40" cy="21" r="4" fill="currentColor" className="text-yellow-400" />
      <circle cx="54" cy="21" r="4" fill="currentColor" className="text-green-400" />
      {/* URL bar */}
      <rect x="70" y="15" width="100" height="12" rx="6" fill="currentColor" className="text-white/30 dark:text-white/20" />
      {/* Content blocks */}
      <rect x="22" y="42" width="70" height="8" rx="4" fill="currentColor" className="text-primary/40 dark:text-primary-light/40" />
      <rect x="22" y="56" width="50" height="6" rx="3" fill="currentColor" className="text-gray-300 dark:text-gray-600" />
      <rect x="22" y="68" width="60" height="6" rx="3" fill="currentColor" className="text-gray-300 dark:text-gray-600" />
      <rect x="22" y="82" width="50" height="14" rx="7" fill="currentColor" className="text-primary/60 dark:text-primary-light/60" />
      {/* Card on right */}
      <rect x="108" y="38" width="72" height="68" rx="6" fill="currentColor" className="text-white/60 dark:text-white/10" stroke="currentColor" strokeWidth="1" />
      <rect x="114" y="44" width="60" height="30" rx="4" fill="currentColor" className="text-primary/20 dark:text-primary-light/20" />
      <rect x="114" y="80" width="40" height="5" rx="2" fill="currentColor" className="text-gray-300 dark:text-gray-600" />
      <rect x="114" y="90" width="30" height="5" rx="2" fill="currentColor" className="text-gray-300 dark:text-gray-600" />
      {/* Sparkle */}
      <circle cx="165" cy="18" r="3" fill="currentColor" className="text-primary dark:text-primary-light opacity-80" />
      <circle cx="175" cy="45" r="2" fill="currentColor" className="text-primary dark:text-primary-light opacity-50" />
    </svg>
  ),
  performance: (
    <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
      {/* Gauge background */}
      <path d="M 40 100 A 60 60 0 0 1 160 100" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" className="text-gray-200 dark:text-gray-700" />
      {/* Gauge fill - high performance */}
      <path d="M 40 100 A 60 60 0 0 1 148 48" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" className="text-green-500" />
      {/* Needle */}
      <line x1="100" y1="100" x2="148" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-gray-800 dark:text-white" />
      <circle cx="100" cy="100" r="7" fill="currentColor" className="text-gray-800 dark:text-white" />
      {/* Score label */}
      <text x="100" y="78" textAnchor="middle" fontSize="22" fontWeight="bold" fill="currentColor" className="text-green-500">90+</text>
      {/* Labels */}
      <text x="34" y="112" textAnchor="middle" fontSize="9" fill="currentColor" className="text-gray-400">0</text>
      <text x="166" y="112" textAnchor="middle" fontSize="9" fill="currentColor" className="text-gray-400">100</text>
      {/* Bars under */}
      <rect x="18" y="30" width="10" height="25" rx="3" fill="currentColor" className="text-red-400/60" />
      <rect x="32" y="20" width="10" height="35" rx="3" fill="currentColor" className="text-orange-400/60" />
      <rect x="46" y="10" width="10" height="45" rx="3" fill="currentColor" className="text-green-400/80" />
      <text x="34" y="65" textAnchor="middle" fontSize="7" fill="currentColor" className="text-gray-400">Avant</text>
      <rect x="162" y="30" width="10" height="25" rx="3" fill="currentColor" className="text-red-400/60" />
      <rect x="148" y="20" width="10" height="35" rx="3" fill="currentColor" className="text-orange-400/60" />
      <rect x="175" y="10" width="10" height="45" rx="3" fill="currentColor" className="text-green-400/80" />
      <text x="165" y="65" textAnchor="middle" fontSize="7" fill="currentColor" className="text-gray-400">Après</text>
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
      {/* Server stack */}
      <rect x="30" y="20" width="140" height="22" rx="5" fill="currentColor" className="text-primary/20 dark:text-primary-light/20" stroke="currentColor" strokeWidth="1" />
      <circle cx="46" cy="31" r="4" fill="currentColor" className="text-green-400" />
      <rect x="56" y="27" width="80" height="5" rx="2" fill="currentColor" className="text-gray-300 dark:text-gray-600" />
      <rect x="142" y="27" width="20" height="5" rx="2" fill="currentColor" className="text-primary/40 dark:text-primary-light/40" />

      <rect x="30" y="48" width="140" height="22" rx="5" fill="currentColor" className="text-primary/15 dark:text-primary-light/15" stroke="currentColor" strokeWidth="1" />
      <circle cx="46" cy="59" r="4" fill="currentColor" className="text-green-400" />
      <rect x="56" y="55" width="60" height="5" rx="2" fill="currentColor" className="text-gray-300 dark:text-gray-600" />
      <rect x="142" y="55" width="20" height="5" rx="2" fill="currentColor" className="text-primary/40 dark:text-primary-light/40" />

      <rect x="30" y="76" width="140" height="22" rx="5" fill="currentColor" className="text-primary/10 dark:text-primary-light/10" stroke="currentColor" strokeWidth="1" />
      <circle cx="46" cy="87" r="4" fill="currentColor" className="text-green-400" />
      <rect x="56" y="83" width="70" height="5" rx="2" fill="currentColor" className="text-gray-300 dark:text-gray-600" />
      <rect x="142" y="83" width="20" height="5" rx="2" fill="currentColor" className="text-primary/40 dark:text-primary-light/40" />

      {/* Connection lines left */}
      <line x1="10" y1="31" x2="30" y2="31" stroke="currentColor" strokeWidth="2" strokeDasharray="3,2" className="text-primary/60" />
      <line x1="10" y1="59" x2="30" y2="59" stroke="currentColor" strokeWidth="2" strokeDasharray="3,2" className="text-primary/60" />
      <line x1="10" y1="87" x2="30" y2="87" stroke="currentColor" strokeWidth="2" strokeDasharray="3,2" className="text-primary/60" />
      <circle cx="10" cy="31" r="3" fill="currentColor" className="text-primary dark:text-primary-light" />
      <circle cx="10" cy="59" r="3" fill="currentColor" className="text-primary dark:text-primary-light" />
      <circle cx="10" cy="87" r="3" fill="currentColor" className="text-primary dark:text-primary-light" />

      {/* Shield right */}
      <path d="M 178 20 L 195 26 L 195 44 Q 195 52 178 58 Q 161 52 161 44 L 161 26 Z" fill="currentColor" className="text-primary/20 dark:text-primary-light/20" stroke="currentColor" strokeWidth="1" />
      <text x="178" y="42" textAnchor="middle" fontSize="16" fill="currentColor" className="text-primary dark:text-primary-light">✓</text>
    </svg>
  ),
  algo: (
    <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
      {/* Flow chart */}
      {/* Start node */}
      <rect x="75" y="8" width="50" height="20" rx="10" fill="currentColor" className="text-primary/30 dark:text-primary-light/30" />
      <text x="100" y="22" textAnchor="middle" fontSize="8" fill="currentColor" className="text-primary dark:text-primary-light font-medium">DONNÉES</text>

      {/* Arrow down */}
      <line x1="100" y1="28" x2="100" y2="40" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
      <polygon points="97,38 103,38 100,44" fill="currentColor" className="text-gray-400" />

      {/* Process box */}
      <rect x="65" y="44" width="70" height="22" rx="4" fill="currentColor" className="text-primary/20 dark:text-primary-light/20" stroke="currentColor" strokeWidth="1" />
      <text x="100" y="58" textAnchor="middle" fontSize="8" fill="currentColor" className="text-primary dark:text-primary-light">Traitement auto</text>

      {/* Fork */}
      <line x1="100" y1="66" x2="100" y2="76" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
      <line x1="55" y1="76" x2="145" y2="76" stroke="currentColor" strokeWidth="2" className="text-gray-400" />

      {/* Left branch */}
      <line x1="55" y1="76" x2="55" y2="86" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
      <rect x="20" y="86" width="70" height="20" rx="4" fill="currentColor" className="text-green-500/20" stroke="currentColor" strokeWidth="1" />
      <text x="55" y="99" textAnchor="middle" fontSize="7.5" fill="currentColor" className="text-green-600 dark:text-green-400">Rapport auto</text>

      {/* Right branch */}
      <line x1="145" y1="76" x2="145" y2="86" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
      <rect x="110" y="86" width="70" height="20" rx="4" fill="currentColor" className="text-blue-500/20" stroke="currentColor" strokeWidth="1" />
      <text x="145" y="99" textAnchor="middle" fontSize="7.5" fill="currentColor" className="text-blue-600 dark:text-blue-400">Notification</text>

      {/* Clock icon */}
      <circle cx="183" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/50 dark:text-primary-light/50" />
      <line x1="183" y1="15" x2="183" y2="9" stroke="currentColor" strokeWidth="2" className="text-primary dark:text-primary-light" />
      <line x1="183" y1="15" x2="188" y2="15" stroke="currentColor" strokeWidth="2" className="text-primary dark:text-primary-light" />

      {/* Saving badge */}
      <rect x="158" y="95" width="38" height="18" rx="4" fill="currentColor" className="text-green-500/20" />
      <text x="177" y="107" textAnchor="middle" fontSize="7" fill="currentColor" className="text-green-600 dark:text-green-400 font-bold">-80% temps</text>
    </svg>
  ),
}

const proofBadges = {
  webdev: [
    { label: 'Livré en temps réel', label_en: 'Delivered on time' },
    { label: 'Responsive garanti', label_en: 'Guaranteed responsive' },
  ],
  performance: [
    { label: '+90 score Lighthouse', label_en: '+90 Lighthouse score' },
    { label: 'Prouvé sur Sakalava Lodge', label_en: 'Proven on Sakalava Lodge' },
  ],
  backend: [
    { label: 'API sécurisée & documentée', label_en: 'Secure & documented API' },
    { label: '0 downtime en production', label_en: '0 downtime in production' },
  ],
  algo: [
    { label: '-80% de tâches manuelles', label_en: '-80% manual tasks' },
    { label: 'Logique métier sur mesure', label_en: 'Custom business logic' },
  ],
}

export default function ServiceCard({ service, index = 0 }) {
  const { t, i18n } = useTranslation()
  const Icon = icons[service.icon]
  const isFr = i18n.language?.startsWith('fr')
  const badges = proofBadges[service.id] || []

  return (
    <div
      className="group relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Top illustration strip */}
      <div className="h-32 bg-gradient-to-br from-primary/5 to-primary/15 dark:from-primary-light/5 dark:to-primary-light/10 p-4 flex items-center justify-center">
        <div className="w-full max-w-[200px] h-full text-gray-800 dark:text-gray-200">
          {illustrations[service.id]}
        </div>
      </div>

      {/* Icon pill */}
      <div className="absolute top-24 left-6 w-12 h-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center">
        {Icon && <Icon className="w-5 h-5 text-primary dark:text-primary-light" />}
      </div>

      {/* Content */}
      <div className="pt-8 px-6 pb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 leading-tight">
          {t(`${service.i18nKey}.title`)}
        </h3>

        {/* Client problem — the hook */}
        <p className="text-sm text-red-500 dark:text-red-400 font-medium mb-3 flex items-start gap-1.5">
          <span className="mt-0.5 shrink-0">→</span>
          <span>{t(`${service.i18nKey}.problem`)}</span>
        </p>

        {/* Solution */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          {t(`${service.i18nKey}.solution`)}
        </p>

        {/* Impact */}
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 px-4 py-3 mb-4">
          <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide mb-1">
            {isFr ? 'Impact concret' : 'Concrete impact'}
          </p>
          <p className="text-sm text-green-800 dark:text-green-300 font-medium">
            {t(`${service.i18nKey}.impact`)}
          </p>
        </div>

        {/* Proof badges */}
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/8 dark:bg-primary-light/10 text-primary dark:text-primary-light border border-primary/20 dark:border-primary-light/20"
            >
              <CheckCircle className="w-3 h-3 shrink-0" />
              {isFr ? badge.label : badge.label_en}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
