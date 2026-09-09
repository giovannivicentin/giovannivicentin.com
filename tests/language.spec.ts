import { test, expect } from '@playwright/test'

test('root renders the negotiated language directly without redirects', async ({
  request,
}) => {
  for (const [header, lang] of [
    ['es-MX, en;q=0.8', 'es-ES'],
    ['en-US, pt;q=0.5', 'en-US'],
    ['pt-PT, en;q=0.7', 'pt-BR'],
    ['de-DE', 'pt-BR'],
    ['es;q=0, en;q=0.8', 'en-US'],
  ]) {
    const response = await request.get('/', {
      headers: { 'accept-language': header },
      maxRedirects: 0,
    })
    expect(response.status()).toBe(200)
    expect(response.headers().location).toBeUndefined()
    expect(await response.text()).toContain(`lang="${lang}"`)
  }
})

test('saved preference wins and invalid cookies fall back safely', async ({
  request,
}) => {
  for (const [cookie, lang] of [
    ['en', 'en-US'],
    ['invalid', 'es-ES'],
  ]) {
    const response = await request.get('/', {
      headers: { cookie: `NEXT_LOCALE=${cookie}`, 'accept-language': 'es' },
    })
    expect(response.status()).toBe(200)
    expect(await response.text()).toContain(`lang="${lang}"`)
  }
})

test('canonical URL and sitemap only advertise the root', async ({
  page,
  request,
}) => {
  await page.goto('/')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://giovannivicentin.com',
  )
  await expect(page.locator('link[hreflang]')).toHaveCount(0)
  const sitemap = await request.get('/sitemap.xml')
  expect(await sitemap.text()).toContain(
    '<loc>https://giovannivicentin.com</loc>',
  )
  for (const locale of ['br', 'en', 'es']) {
    const response = await request.get(`/${locale}`, { maxRedirects: 0 })
    expect(response.status()).toBe(404)
    expect(response.headers().location).toBeUndefined()
  }
})
