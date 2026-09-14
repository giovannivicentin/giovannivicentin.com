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

test('root canonical stays at x-default for every negotiated language', async ({
  page,
  request,
}) => {
  for (const locale of ['br', 'en', 'es']) {
    await page
      .context()
      .addCookies([
        { name: 'NEXT_LOCALE', value: locale, url: 'http://127.0.0.1:3100' },
      ])
    await page.goto('/?utm_source=canonical-test')
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute(
      'href',
      'https://www.giovannivicentin.com',
    )
    await expect(page.locator('link[hreflang]')).toHaveCount(4)
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute(
      'href',
      (await canonical.getAttribute('href'))!,
    )
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://www.giovannivicentin.com',
    )
    const schema = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent())!,
    )
    expect(
      schema['@graph'].find(
        (entry: { '@type': string }) => entry['@type'] === 'ProfilePage',
      ).url,
    ).toBe('https://www.giovannivicentin.com/')
  }
  const sitemap = await request.get('/sitemap.xml')
  expect(await sitemap.text()).toContain(
    '<loc>https://www.giovannivicentin.com/en</loc>',
  )
  for (const locale of ['pt', 'en', 'es']) {
    const response = await request.get(`/${locale}`, { maxRedirects: 0 })
    expect(response.status()).toBe(200)
    expect(response.headers().location).toBeUndefined()
  }
})
