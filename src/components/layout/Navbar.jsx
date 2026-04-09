import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import LanguageToggle from '../ui/LanguageToggle'

const navLinks = [
  { to: '/', key: 'nav.home' },
  { to: '/services', key: 'nav.services' },
  { to: '/portfolio', key: 'nav.portfolio' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `font-medium transition-colors no-underline ${
      isActive
        ? 'text-primary dark:text-primary-light'
        : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light'
    }`

  const handleContact = (e) => {
    e.preventDefault()
    setIsOpen(false)
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#contact')
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const contactClass = `font-medium transition-colors no-underline cursor-pointer text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light`

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
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
          <a href="#contact" onClick={handleContact} className={contactClass}>
            {t('nav.contact')}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 flex flex-col gap-4">
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
          <a href="#contact" onClick={handleContact} className={contactClass}>
            {t('nav.contact')}
          </a>
        </div>
      )}
    </nav>
  )
}
