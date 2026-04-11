import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageSlider({ images = [], alt = '', interval = 3000, fit = 'cover' }) {
  const [current, setCurrent] = useState(0)
  const [failed, setFailed] = useState([])

  const valid = images.filter((_, i) => !failed.includes(i))

  useEffect(() => {
    setCurrent(0)
  }, [images])

  useEffect(() => {
    if (valid.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % valid.length)
    }, interval)
    return () => clearInterval(timer)
  }, [valid.length, interval])

  if (!valid.length) return null

  const prev = (e) => {
    e.stopPropagation()
    setCurrent((c) => (c - 1 + valid.length) % valid.length)
  }
  const next = (e) => {
    e.stopPropagation()
    setCurrent((c) => (c + 1) % valid.length)
  }

  return (
    <div className="relative h-44 bg-gray-100 dark:bg-gray-700/60 overflow-hidden group">
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${current * (100 / valid.length)}%)`, width: `${valid.length * 100}%` }}
      >
        {images.map((src, i) => failed.includes(i) ? null : (
          <div key={i} className="relative flex-shrink-0" style={{ width: `${100 / valid.length}%` }}>
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className={`w-full h-full ${fit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
              loading="lazy"
              decoding="async"
              onError={() => setFailed((f) => [...f, i])}
            />
          </div>
        ))}
      </div>

      {valid.length > 1 && (
        <>
          {/* Flèches — zone touch 44px */}
          <button
            onClick={prev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity hover:bg-black/60"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity hover:bg-black/60"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots — zone touch 44px */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {valid.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`w-6 h-6 flex items-center justify-center`}
                aria-label={`Image ${i + 1}`}
              >
                <span className={`block rounded-full transition-all ${
                  i === current ? 'w-2.5 h-2.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'
                }`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
