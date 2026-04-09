import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors p-1"
      aria-label="Toggle theme"
    >
      <Sun className="absolute left-1.5 w-4 h-4 text-amber-500" />
      <Moon className="absolute right-1.5 w-4 h-4 text-blue-300" />
      <span
        className={`w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-md transition-transform duration-300 ${
          isDark ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
