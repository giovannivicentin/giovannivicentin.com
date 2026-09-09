import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers)
  // Locale URLs have deterministic content, independent of cookies or crawlers.
  // Never trust an incoming copy of our internal routing header.
  headers.delete('x-portfolio-locale')
  const segment = request.nextUrl.pathname.split('/')[1]
  const locale =
    segment === 'pt'
      ? 'br'
      : segment === 'en' || segment === 'es'
        ? segment
        : null
  if (locale) headers.set('x-portfolio-locale', locale)

  if (['/pt', '/en', '/es'].includes(request.nextUrl.pathname)) {
    const destination = request.nextUrl.clone()
    destination.pathname = '/'
    return NextResponse.rewrite(destination, { request: { headers } })
  }
  // The original root remains the language-adaptive entry point (x-default).
  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
