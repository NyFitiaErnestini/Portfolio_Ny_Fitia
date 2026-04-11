import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer aria-label="Pied de page" className="bg-gray-900 dark:bg-gray-950 text-white px-6 pt-10 pb-6">
      <div className="max-w-6xl mx-auto">

        {/* Ligne principale */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">

          {/* Identité */}
          <div>
            <p className="text-base font-bold text-white mb-1">Ny Fitia Ernestini</p>
            <p className="text-xs text-gray-400">{t('footer.role')}</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <a
              href="mailto:ernestininyfitia@gmail.com"
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary-light transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </span>
              ernestininyfitia@gmail.com
            </a>
            <a
              href="tel:+261342339677"
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary-light transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </span>
              +261 34 23 396 77
            </a>
          </div>

          {/* Nav rapide */}
          <nav aria-label="Navigation secondaire">
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {[
                { to: '/',            label: t('nav.home') },
                { to: '/services',    label: t('nav.services') },
                { to: '/realisations',label: t('nav.realisations') },
                { to: '/contact',     label: t('nav.contact') },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-xs text-gray-400 hover:text-primary-light transition-colors py-1 block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Séparateur + copyright */}
        <div className="border-t border-white/8 pt-5 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Ny Fitia Ernestini · {t('footer.rights')}
        </div>

      </div>
    </footer>
  )
}
