import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'br', 'es'],
  defaultLocale: 'en',
})

export const config = {
  matcher: ['/', '/(en|br|es)/:path*'],
}
