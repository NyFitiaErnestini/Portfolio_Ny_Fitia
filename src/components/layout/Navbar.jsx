import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import LanguageToggle from '../ui/LanguageToggle'

const navLinks = [
  { to: '/', key: 'nav.home' },
  { to: '/services', key: 'nav.services' },
  { to: '/realisations', key: 'nav.realisations' },
  { to: '/profil', key: 'nav.profil' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const close = () => setIsOpen(false)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [isOpen])

  const linkClass = ({ isActive }) =>
    `font-medium transition-all no-underline relative ${
      isActive
        ? 'text-primary dark:text-primary-light after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-primary dark:after:bg-primary-light'
        : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light'
    }`

  return (
    <nav aria-label="Navigation principale" className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white no-underline">
          Ny Fitia E.
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end className={linkClass}>
              {t(link.key)}
            </NavLink>
          ))}
          <NavLink to="/contact" className={linkClass}>
            {t('nav.contact')}
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-3 rounded-lg transition-colors ${
              isOpen
                ? 'bg-primary text-white dark:bg-primary-light dark:text-gray-900'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — fixed pour rester visible au scroll */}
      {isOpen && (
        <div className="md:hidden fixed top-[65px] left-0 right-0 z-40 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              {t(link.key)}
            </NavLink>
          ))}
          <NavLink to="/contact" className={linkClass} onClick={() => setIsOpen(false)}>
            {t('nav.contact')}
          </NavLink>
        </div>
      )}
    </nav>
  )
}
