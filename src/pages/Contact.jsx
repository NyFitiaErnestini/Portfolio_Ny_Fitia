import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

export default function Contact() {
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    const { name, email, message } = data
    const subject = `Contact from ${name}`
    const body = `Nom: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`
    window.location.href = `mailto:contact@nyfitia.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="px-6 py-20 max-w-2xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t('contact.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t('contact.subtitle')}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('contact.name')}
          </label>
          <input
            {...register('name', { required: true })}
            placeholder={t('contact.name.placeholder')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('contact.email')}
          </label>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            placeholder={t('contact.email.placeholder')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('contact.message')}
          </label>
          <textarea
            {...register('message', { required: true })}
            rows={6}
            placeholder={t('contact.message.placeholder')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          {t('contact.send')}
        </button>
      </form>
    </section>
  )
}
