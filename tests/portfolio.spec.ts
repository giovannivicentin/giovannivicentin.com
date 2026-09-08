import { test, expect, type Page } from '@playwright/test'

async function setLanguage(page: Page, locale: string) {
  await page
    .context()
    .addCookies([
      { name: 'NEXT_LOCALE', value: locale, url: 'http://127.0.0.1:3100' },
    ])
}

test.beforeEach(async ({ page }) => {
  await setLanguage(page, 'en')
})
import AxeBuilder from '@axe-core/playwright'

test('keyboard commands, search, section focus and Escape restoration', async ({
  page,
}) => {
  await setLanguage(page, 'br')
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Comandos', exact: true })
  await trigger.focus()
  await page.keyboard.press('Control+k')
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  const search = dialog.getByRole('combobox')
  await expect(search).toBeFocused()
  await search.fill('experiencia')
  await search.press('Enter')
  await expect(page).toHaveURL(/#experience$/)
  await expect(
    page.getByRole('heading', { name: 'Engenharia em produção.' }),
  ).toBeFocused()
  await trigger.click()
  await dialog.getByRole('combobox').fill('xyzmissing')
  await expect(dialog.getByText('Nenhum comando encontrado.')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  await page.keyboard.press('Meta+k')
  await expect(dialog).toBeVisible()
})

test('locale switch and palette preserve section', async ({ page }) => {
  await setLanguage(page, 'br')
  await page.goto('/#projects')
  await page.getByRole('button', { name: 'Idioma', exact: true }).click()
  await page.getByRole('menuitemradio', { name: 'English' }).click()
  await expect(page).toHaveURL('/#projects')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Care in every interaction.',
  )
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US')
  await page.getByRole('button', { name: 'Commands', exact: true }).click()
  await page.getByRole('option', { name: 'Español', exact: true }).click()
  await expect(page).toHaveURL('/#projects')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Cuidado en cada interacción.',
  )
})

test('copy success and denied permission keep contact usable', async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: async () => {} },
    }),
  )
  await page.goto('/')
  await page.getByRole('button', { name: 'Copy email', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Email copied')
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error('Denied')
    }
  })
  await page.getByRole('button', { name: 'Copy email', exact: true }).waitFor()
  await page.getByRole('button', { name: 'Copy email', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText(
    'Could not copy. Select the email below.',
  )
  await expect(
    page.getByRole('link', {
      name: 'giovannifvicentin@gmail.com',
      exact: true,
    }),
  ).toBeVisible()
})

for (const locale of ['br', 'en', 'es']) {
  test(`accessible page and responsive layout: ${locale}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await setLanguage(page, locale)
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page.locator('.project-card h3')).toHaveText(
      {
        br: ['Analisador Big O', 'Ebook em Áudio', 'Mindful Minutes'],
        en: ['Big O Analyzer', 'Ebook to Audiobook', 'Mindful Minutes'],
        es: ['Analizador Big O', 'Ebook a Audiolibro', 'Mindful Minutes'],
      }[locale]!,
    )
    await expect(page.locator('.compact-project h4').first()).toHaveText(
      'Sorteia FC',
    )
    await expect(page.locator('.project-preview').nth(2)).toHaveAttribute(
      'href',
      'https://mindful-minutes-zeta.vercel.app',
    )

    await expect(page.locator('.hero-intro')).toContainText(
      'Giovanni Fernandes Vicentin',
    )
    await expect(page.locator('.about-identity figcaption')).toHaveText(
      'Giovanni Fernandes Vicentin',
    )
    await expect(page.locator('#about img')).toHaveAttribute(
      'alt',
      'Giovanni Fernandes Vicentin',
    )
    await expect(page.locator('.site-footer')).toContainText(
      'Giovanni Fernandes Vicentin',
    )
    await expect(page).toHaveTitle(/Giovanni Fernandes Vicentin/)
    await expect(page.locator('meta[name="author"]')).toHaveAttribute(
      'content',
      'Giovanni Fernandes Vicentin',
    )
    // Audit the readable resting state, not a frame halfway through the hero fade.
    await expect(page.locator('html')).toHaveClass(/lenis/)
    await expect(page.locator('.hero-baseline')).toHaveCSS('opacity', '1')
    for (const line of await page.locator('[data-hero-title]').all()) {
      await expect(line).toHaveCSS('filter', 'blur(0px)')
    }
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true)
      const brand = page.locator('.brand-name')
      await expect(brand).toBeVisible()
      await expect(brand).toHaveText('Giovanni Fernandes Vicentin')
      const brandBounds = await brand.boundingBox()
      const controlsBounds = await page
        .locator('.header-controls')
        .boundingBox()
      expect(brandBounds!.x + brandBounds!.width).toBeLessThanOrEqual(
        controlsBounds!.x,
      )
      expect(brandBounds!.y + brandBounds!.height).toBeLessThanOrEqual(64)
      if (width === 320 || width === 1440) {
        await page.screenshot({
          path: `test-results/${locale}-hero-${width}.png`,
        })
      }
    }
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(page.locator('html')).not.toHaveClass(/lenis/)
    for (const section of ['experience', 'projects', 'about', 'contact']) {
      const target = page.locator(`#${section}`)
      await target.scrollIntoViewIfNeeded()
      await expect(target.locator('.motion-reveal').first()).toHaveCSS(
        'opacity',
        '1',
      )
      for (const image of await target.locator('img').all()) {
        await image.scrollIntoViewIfNeeded()
        await image.evaluate((node: HTMLImageElement) => node.decode())
      }
      await page.evaluate(() => window.scrollTo(0, 0))
      await target.screenshot({
        style: '.site-header, .skip-link { visibility: hidden; }',
        path: `test-results/${locale}-${section}.png`,
      })
    }
    await page.locator('#about img').scrollIntoViewIfNeeded()
    await expect(page.locator('#about img')).toHaveJSProperty('complete', true)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({
      path: `test-results/${locale}-desktop.png`,
      fullPage: true,
    })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.screenshot({
      path: `test-results/${locale}-mobile.png`,
      fullPage: true,
    })
    expect(errors).toEqual([])
  })
}

test('palette accessible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('button', { name: 'Commands', exact: true }).click()
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(results.violations).toEqual([])
  const bounds = await page.getByRole('dialog').boundingBox()
  expect(bounds?.y).toBeGreaterThanOrEqual(64)
  expect((bounds?.y ?? 0) + (bounds?.height ?? 0)).toBeLessThanOrEqual(720)
  await page.screenshot({ path: 'test-results/palette.png' })
})

test('essential links and content work without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await setLanguage(page, 'en')
  await page.goto('http://127.0.0.1:3100/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Care in every interaction.',
  )
  await expect(page.locator('a[href="#experience"]').first()).toBeVisible()
  await expect(
    page.locator('a[href="mailto:giovannifvicentin@gmail.com"]').first(),
  ).toBeVisible()
  await context.close()
})

for (const [locale, title, back] of [
  ['br', 'Página não encontrada', 'Voltar ao portfólio'],
  ['en', 'Page not found', 'Back to the portfolio'],
  ['es', 'Página no encontrada', 'Volver al portafolio'],
]) {
  test(`localized not-found page: ${locale}`, async ({ page }) => {
    await setLanguage(page, locale)
    const response = await page.goto('/missing-page')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    await page.getByRole('link', { name: back }).click()
    await expect(page).toHaveURL('/')
  })
}
