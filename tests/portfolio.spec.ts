import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('keyboard commands, search, section focus and Escape restoration', async ({
  page,
}) => {
  await page.goto('/br')
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
  await page.goto('/br#projects')
  await page
    .getByRole('combobox', { name: 'Idioma', exact: true })
    .selectOption('en')
  await expect(page).toHaveURL('/en#projects')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Production software.',
  )
  await page.getByRole('button', { name: 'Commands', exact: true }).click()
  await page.getByRole('option', { name: 'Español', exact: true }).click()
  await expect(page).toHaveURL('/es#projects')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Software en producción.',
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
  await page.goto('/en')
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
    await page.goto(`/${locale}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
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
  await page.goto('/en')
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
  await page.goto('http://127.0.0.1:3100/en')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Production software.',
  )
  await expect(page.locator('a[href="#experience"]').first()).toBeVisible()
  await expect(
    page.locator('a[href="mailto:giovannifvicentin@gmail.com"]').first(),
  ).toBeVisible()
  await context.close()
})
