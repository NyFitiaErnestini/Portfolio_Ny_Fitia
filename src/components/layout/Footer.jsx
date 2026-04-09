import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-8">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Ny Fitia Ernestini — {t('footer.role')}. {t('footer.rights')}</p>
      </div>
    </footer>
  )
}
