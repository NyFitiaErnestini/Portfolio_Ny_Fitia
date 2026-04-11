import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { ArrowRight, ExternalLink, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader } from 'lucide-react'

const EMAILJS_SERVICE_ID  = 'service_wyn0puf'
const EMAILJS_TEMPLATE_ID = 'template_4ex43nu'
const EMAILJS_PUBLIC_KEY  = 'Uqvj98W5kFEfdBSA8'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: data.name, email: data.email, message: data.message },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="border-t border-gray-200 dark:border-gray-700">

      {/* Hero */}
      <div className="px-6 pt-20 pb-6 text-center bg-white dark:bg-gray-800/50">
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-4"
        >
          <Mail className="w-3.5 h-3.5" />
          {t('contact.title')}
        </motion.div>
        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3"
        >
          {t('home.contact.title')}
        </motion.h1>
        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto"
        >
          {t('home.contact.description')}
        </motion.p>
      </div>

      {/* Contenu */}
      <div className="bg-white dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-0 items-start">

          {/* Infos contact */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="md:pr-12 md:border-r border-gray-200 dark:border-gray-700 pb-10 md:pb-0 flex flex-col gap-4"
          >
            {[
              {
                href: 'mailto:ernestininyfitia@gmail.com',
                icon: <Mail className="w-4.5 h-4.5 text-primary dark:text-primary-light" />,
                label: t('contact.email'),
                value: 'ernestininyfitia@gmail.com',
                isLink: true,
              },
              {
                icon: <Phone className="w-4.5 h-4.5 text-primary dark:text-primary-light" />,
                label: null,
                value: '+261 34 23 396 77',
                isPhone: true,
              },
              {
                icon: <MapPin className="w-4.5 h-4.5 text-primary dark:text-primary-light" />,
                label: t('contact.location'),
                value: 'Madagascar',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  {item.icon}
                </div>
                <div>
                  {item.isLink ? (
                    <>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{item.label}</p>
                      <a href={item.href} className="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                        {item.value}
                      </a>
                    </>
                  ) : item.isPhone ? (
                    <>
                      <div className="flex gap-3 text-xs text-gray-400 dark:text-gray-500 mb-1">
                        <a href="https://wa.me/261342339677" target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-primary-light transition-colors">WhatsApp</a>
                        <span>/</span>
                        <a href="tel:+261342339677" className="hover:text-primary dark:hover:text-primary-light transition-colors">{t('contact.call')}</a>
                      </div>
                      <p className="text-base font-semibold text-gray-800 dark:text-gray-200">{item.value}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{item.label}</p>
                      <p className="text-base font-medium text-gray-800 dark:text-gray-200">{item.value}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Liens sociaux */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}
              className="flex gap-3 mt-2"
            >
              <a
                href="https://www.linkedin.com/in/ny-fitia-ernestini-7976a726a"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary-light dark:hover:text-primary-light transition-colors min-h-[44px]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a
                href="https://www.malt.fr/profile/nyfitiaernestini1"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary-light dark:hover:text-primary-light transition-colors min-h-[44px]"
              >
                <ExternalLink className="w-4 h-4" />
                Malt
              </a>
            </motion.div>
          </motion.div>

          {/* Formulaire */}
          <motion.form
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 md:pl-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
                <input
                  {...register('name', { required: true })}
                  placeholder={t('contact.name.placeholder')}
                  className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition-colors focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.name ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
                <input
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  placeholder={t('contact.email.placeholder')}
                  className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition-colors focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.email ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
              </motion.div>
            </div>
            <motion.textarea
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}
              {...register('message', { required: true })}
              rows={7}
              placeholder={t('contact.message.placeholder')}
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition-colors focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                errors.message ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'
              }`}
            />

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
              >
                <CheckCircle className="w-4 h-4" />
                {t('contact.status.success')}
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-red-500"
              >
                <AlertCircle className="w-4 h-4" />
                {t('contact.status.error')}
              </motion.div>
            )}

            <motion.button
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={5}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'sending'}
              className="w-full sm:w-auto sm:self-start inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
            >
              {status === 'sending' ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  {t('contact.status.sending')}
                </>
              ) : (
                <>
                  {t('contact.send')}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>

        </div>
      </div>
    </section>
  )
}
