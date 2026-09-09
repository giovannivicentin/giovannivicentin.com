import { test, expect } from '@playwright/test'

const origin = 'https://www.giovannivicentin.com'
const variants = [
  {
    path: '/pt',
    lang: 'pt-BR',
    title: 'Engenheiro',
    heading: 'Cuidado em cada interação.',
  },
  {
    path: '/en',
    lang: 'en-US',
    title: 'Software Engineer',
    heading: 'Care in every interaction.',
  },
  {
    path: '/es',
    lang: 'es-ES',
    title: 'Ingeniero',
    heading: 'Cuidado en cada interacción.',
  },
]

for (const variant of variants) {
  test(`indexable localized HTML and structured data: ${variant.path}`, async ({
    browser,
  }) => {
    // A crawler needs neither JavaScript nor a language cookie to see this page.
    const context = await browser.newContext({
      javaScriptEnabled: false,
      locale: 'de-DE',
    })
    await context.addCookies([
      {
        name: 'NEXT_LOCALE',
        value: variant.path === '/en' ? 'es' : 'en',
        url: 'http://127.0.0.1:3100',
      },
    ])
    const page = await context.newPage()
    const response = await page.goto(`http://127.0.0.1:3100${variant.path}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', variant.lang)
    await expect(page).toHaveTitle(new RegExp(variant.title))
    await expect(page.locator('h1')).toContainText(variant.heading)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${origin}${variant.path}`,
    )
    for (const [language, path] of [
      ['pt-BR', '/pt'],
      ['en', '/en'],
      ['es', '/es'],
      // Next normalizes the origin URL by omitting its trailing slash.
      ['x-default', ''],
    ]) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${language}"]`),
      ).toHaveAttribute('href', `${origin}${path}`)
    }
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      `${origin}${variant.path}`,
    )
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /index, follow/,
    )
    const schema = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent())!,
    )
    const person = schema['@graph'].find(
      (entry: { '@type': string }) => entry['@type'] === 'Person',
    )
    expect(person.name).toBe('Giovanni Fernandes Vicentin')
    expect(person.sameAs).toContain('https://github.com/giovannivicentin')
    const profile = schema['@graph'].find(
      (entry: { '@type': string }) => entry['@type'] === 'ProfilePage',
    )
    expect(profile.mainEntity['@id']).toBe(person['@id'])
    expect(profile.inLanguage).toBe(variant.lang)
    const projects = schema['@graph'].find(
      (entry: { '@type': string }) => entry['@type'] === 'ItemList',
    )
    expect(projects.itemListElement).toHaveLength(6)
    const languages = page.locator('.footer-languages a')
    await expect(languages).toHaveCount(3)
    await languages.filter({ hasText: 'Español' }).click()
    await expect(page).toHaveURL('/es')
    await expect(page.locator('html')).toHaveAttribute('lang', 'es-ES')
    await context.close()
  })
}

test('sitemap exposes every language and missing URLs remain 404', async ({
  request,
}) => {
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  const xml = await sitemap.text()
  for (const variant of variants)
    expect(xml).toContain(`<loc>${origin}${variant.path}</loc>`)
  expect(xml.match(/hreflang="x-default"/g)).toHaveLength(3)
  const robots = await request.get('/robots.txt')
  expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`)
  const missing = await request.get('/en/missing-page')
  expect(missing.status()).toBe(404)
  expect(await missing.text()).toContain('noindex')
})
