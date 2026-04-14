import { useState, useRef, useEffect } from 'react'
import { MessagesSquare, X, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatBot() {
  const { t, i18n } = useTranslation()
  const [open, setOpen]         = useState(false)
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [history, setHistory]   = useState(() => [
    { role: 'assistant', content: t('chat.welcome') }
  ])
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  // Popup teaser — apparaît après 4s, reste jusqu'au clic
  useEffect(() => {
    const show = setTimeout(() => setShowTeaser(true), 4000)
    return () => clearTimeout(show)
  }, [])

  // Fermer le teaser dès qu'on ouvre le chat
  const handleToggle = () => {
    setShowTeaser(false)
    setOpen(o => !o)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')

    const userMsg = { role: 'user', content: msg }
    setHistory(h => [...h, userMsg])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: history.slice(-6), lang: i18n.language }),
      })
      const data = await res.json()
      setHistory(h => [...h, { role: 'assistant', content: data.reply || t('chat.error') }])
    } catch {
      setHistory(h => [...h, { role: 'assistant', content: t('chat.unavailable') }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Popup teaser */}
      <AnimatePresence>
        {showTeaser && !open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{
              opacity: 1,
              y: [0, -5, 0],
              scale: 1,
            }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{
              opacity: { duration: 0.3 },
              scale:   { duration: 0.3 },
              y: {
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.4,
              },
            }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 max-w-[220px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 px-4 py-3 cursor-pointer select-none"
            onClick={handleToggle}
          >
            {/* Flèche pointant vers le bouton en bas */}
            <div className="absolute bottom-[-7px] right-6 w-3 h-3 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 rotate-45" />
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug">
              {t('chat.teaser')}
            </p>
            <p className="text-xs text-primary dark:text-primary-light font-medium mt-1">
              Ny Fitia · Full-Stack Dev
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton flottant */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary dark:bg-primary-light text-white dark:text-gray-900 shadow-lg flex items-center justify-center"
        aria-label="Ouvrir le chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessagesSquare className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Fenêtre chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-3 left-3 sm:left-auto sm:right-6 sm:w-96 z-50 flex flex-col rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden origin-bottom-right"
            style={{ maxHeight: '70vh' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-primary dark:bg-primary-light">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessagesSquare className="w-4 h-4 text-white dark:text-gray-900" />
              </div>
              <div>
                <p className="text-sm font-bold text-white dark:text-gray-900">{t('chat.title')}</p>
                <p className="text-xs text-white/70 dark:text-gray-700">Ny Fitia · Full-Stack Dev</p>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/70 dark:text-gray-700">{t('chat.online')}</span>
                </div>
                <button
                  onClick={handleToggle}
                  className="text-white/70 dark:text-gray-700 hover:text-white dark:hover:text-gray-900 transition-colors"
                  aria-label="Fermer le chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ minHeight: 0 }}>
              {history.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-primary dark:bg-primary-light text-white dark:text-gray-900 rounded-br-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {history.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {t('chat.suggestions', { returnObjects: true }).map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-2.5 py-1 rounded-full border border-primary/20 dark:border-primary-light/20 text-primary dark:text-primary-light hover:bg-primary/8 dark:hover:bg-primary-light/8 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder={t('chat.placeholder')}
                className="flex-1 text-sm px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary-light/30 min-h-[44px]"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="w-11 h-11 rounded-xl bg-primary dark:bg-primary-light text-white dark:text-gray-900 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
