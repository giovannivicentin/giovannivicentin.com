import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['en', 'br', 'es']

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const requestedLocale = locale ?? (await requestLocale)

  if (!requestedLocale || !locales.includes(requestedLocale)) notFound()

  return {
    locale: requestedLocale,
    messages: (await import(`../messages/${requestedLocale}.json`)).default,
  }
})
