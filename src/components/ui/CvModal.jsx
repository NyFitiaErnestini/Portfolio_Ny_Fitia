import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CvModal({ open, onClose }) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-3xl h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 dark:border-gray-700 shrink-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t('profil.cv.label')}
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="/docs/CV_NyFitia.pdf"
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary dark:bg-primary-light text-white hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t('profil.cv.download')}
                  </a>
                  <button
                    onClick={onClose}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Fermer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Iframe PDF */}
              <div className="flex-1 min-h-0">
                <iframe
                  src="/docs/CV_NyFitia.pdf"
                  title="CV Ny Fitia"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
