import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code, Server, Brain, Database } from 'lucide-react'

const orbitIcons = [
  { Icon: Code, angle: 0 },
  { Icon: Server, angle: 90 },
  { Icon: Brain, angle: 180 },
  { Icon: Database, angle: 270 },
]

export default function AnimatedPhoto({ src, alt, ctaLabel, ctaTo }) {
  const [touched, setTouched] = useState(false)

  const handleTouch = () => setTouched(t => !t)
  const isActive = touched // sur mobile = tap, sur desktop = géré par group-hover CSS

  return (
    <div
      className="group relative flex items-center justify-center"
      onTouchStart={handleTouch}
    >
      {/* Morphing blob background */}
      <div className="absolute w-64 h-64 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem]">
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="[stop-color:var(--color-primary)]" stopOpacity="0.15" />
              <stop offset="100%" className="[stop-color:var(--color-primary-light)]" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <motion.path
            fill="url(#blobGrad)"
            animate={{
              d: [
                'M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.3,29,73.1,42.1C64.9,55.2,54.1,66.9,40.8,74.3C27.5,81.7,11.7,84.8,-2.8,89.5C-17.3,94.2,-30.5,100.5,-43.2,97.8C-55.9,95.1,-68,83.4,-76.4,69.6C-84.8,55.8,-89.4,39.9,-90.8,24.1C-92.2,8.3,-90.3,-7.4,-85.2,-21.7C-80.1,-36,-71.8,-48.9,-60.3,-57.6C-48.8,-66.3,-34.1,-70.8,-20.3,-74.1C-6.5,-77.4,6.4,-79.5,19.3,-79.2C32.2,-78.9,45.1,-76.2,44.7,-76.4Z',
                'M39.5,-67.5C52.9,-60.9,66.8,-53.7,75.2,-42.1C83.6,-30.5,86.6,-14.5,85.1,0.9C83.6,16.2,77.7,30.9,68.8,43.1C59.9,55.3,48,65,34.6,71.6C21.2,78.2,6.3,81.7,-7.8,80.3C-21.9,78.9,-35.2,72.6,-46.8,64C-58.4,55.4,-68.3,44.5,-74.8,31.5C-81.3,18.5,-84.4,3.4,-82.7,-10.8C-81,-25,-74.5,-38.3,-64.5,-47.8C-54.5,-57.3,-41,-63,-28.3,-70.1C-15.6,-77.2,-3.8,-85.7,5.5,-84.2C14.8,-82.7,26.1,-74.1,39.5,-67.5Z',
                'M47.2,-80.8C61.3,-72.8,73.2,-61.1,80.4,-47.1C87.6,-33.1,90.1,-16.6,89.1,-0.6C88.1,15.4,83.5,30.8,75.3,43.8C67.1,56.8,55.3,67.4,41.7,74.8C28.1,82.2,12.7,86.4,-1.5,88.9C-15.7,91.4,-28.7,92.2,-41.2,86.4C-53.7,80.6,-65.7,68.2,-73.5,53.9C-81.3,39.6,-84.9,23.4,-85.8,7.2C-86.7,-9,-84.9,-25.2,-78.1,-38.8C-71.3,-52.4,-59.5,-63.4,-45.8,-71.6C-32.1,-79.8,-16.1,-85.2,0.1,-85.4C16.3,-85.6,33.1,-88.8,47.2,-80.8Z',
                'M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.3,29,73.1,42.1C64.9,55.2,54.1,66.9,40.8,74.3C27.5,81.7,11.7,84.8,-2.8,89.5C-17.3,94.2,-30.5,100.5,-43.2,97.8C-55.9,95.1,-68,83.4,-76.4,69.6C-84.8,55.8,-89.4,39.9,-90.8,24.1C-92.2,8.3,-90.3,-7.4,-85.2,-21.7C-80.1,-36,-71.8,-48.9,-60.3,-57.6C-48.8,-66.3,-34.1,-70.8,-20.3,-74.1C-6.5,-77.4,6.4,-79.5,19.3,-79.2C32.2,-78.9,45.1,-76.2,44.7,-76.4Z',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Orbiting icons */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ width: '100%', height: '100%' }}
      >
        {orbitIcons.map(({ Icon, angle }, i) => {
          const rad = (angle * Math.PI) / 180
          return (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
              style={{
                top: `calc(50% + 50% * ${Math.sin(rad)} - 1.25rem)`,
                left: `calc(50% + 50% * ${Math.cos(rad)} - 1.25rem)`,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary dark:text-primary-light" />
            </motion.div>
          )
        })}
      </motion.div>

      {/* Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl z-10"
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover object-[center_50%] transition-transform duration-500 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        {ctaLabel && ctaTo && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ backgroundColor: isActive ? 'rgba(17,24,39,0.35)' : 'rgba(17,24,39,0)' }}
            transition={{ duration: 0.3 }}
          >
            {/* Desktop — hover CSS */}
            <Link
              to={ctaTo}
              className="hidden md:block pointer-events-none translate-y-3 rounded-full border border-white/70 bg-white/95 px-5 py-2.5 text-sm font-semibold text-gray-900 opacity-0 shadow-lg transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 no-underline"
            >
              {ctaLabel}
            </Link>
            {/* Mobile — tap state */}
            <motion.div
              className="md:hidden"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
              transition={{ duration: 0.25 }}
            >
              {isActive && (
                <Link
                  to={ctaTo}
                  className="rounded-full border border-white/70 bg-white/95 px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg no-underline"
                >
                  {ctaLabel}
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
