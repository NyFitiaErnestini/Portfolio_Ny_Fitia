import { useTranslation } from 'react-i18next'

export default function ProjectCard({ project }) {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <img
          src={project.image}
          alt={t(`${project.i18nKey}.title`)}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t(`${project.i18nKey}.title`)}
        </h3>
        <div className="space-y-3 text-left">
          <div>
            <p className="text-sm font-medium text-red-500 dark:text-red-400 mb-1">Probleme</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t(`${project.i18nKey}.problem`)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-primary dark:text-primary-light mb-1">Solution</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t(`${project.i18nKey}.solution`)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-green-500 dark:text-green-400 mb-1">Resultat</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t(`${project.i18nKey}.result`)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary dark:text-primary-light"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
