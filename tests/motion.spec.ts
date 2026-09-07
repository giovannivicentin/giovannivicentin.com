import { test, expect, devices } from '@playwright/test'

test('smooth anchors preserve focus, header clearance and history', async ({
  page,
}) => {
  await page.goto('/en')
  await expect(page.locator('html')).toHaveClass(/lenis/)
  await page.locator('.hero-actions a[href="#experience"]').click()
  await expect(page).toHaveURL(/#experience$/)
  await expect(page.locator('#experience-title')).toBeFocused()
  await expect
    .poll(() =>
      page
        .locator('#experience')
        .evaluate((node) => Math.abs(node.getBoundingClientRect().top - 80)),
    )
    .toBeLessThan(3)

  await page.locator('.desktop-nav a[href="#projects"]').click()
  await expect(page.locator('#projects-title')).toBeFocused()
  await expect
    .poll(() =>
      page
        .locator('#projects')
        .evaluate((node) => Math.abs(node.getBoundingClientRect().top - 80)),
    )
    .toBeLessThan(3)
  await page.goBack()
  await expect(page).toHaveURL(/#experience$/)
  await expect
    .poll(() =>
      page
        .locator('#experience')
        .evaluate((node) => Math.abs(node.getBoundingClientRect().top - 80)),
    )
    .toBeLessThan(3)
})

test('palette locks background while its list scrolls and restores scrolling', async ({
  page,
}) => {
  await page.goto('/en')
  await expect(page.locator('html')).toHaveClass(/lenis/)
  await page.getByRole('button', { name: 'Commands', exact: true }).click()
  await expect(page.locator('html')).toHaveClass(/lenis-stopped/)
  const before = await page.evaluate(() => window.scrollY)
  await page.mouse.move(20, 200)
  await page.mouse.wheel(0, 600)
  const list = page.locator('.palette-content [cmdk-list]')
  await list.hover()
  await page.mouse.wheel(0, 300)
  await expect
    .poll(() => list.evaluate((node) => node.scrollTop))
    .toBeGreaterThan(0)
  expect(await page.evaluate(() => window.scrollY)).toBe(before)

  // Changing the motion preference must not release Radix's modal scroll lock.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('html')).not.toHaveClass(/lenis/)
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await page.mouse.move(20, 200)
  await page.mouse.wheel(0, 500)
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(before)
})

test('motion preference changes reset magnetism and spotlight without reloading', async ({
  page,
}) => {
  await page.goto('/en')
  await expect(page.locator('html')).toHaveClass(/lenis/)
  const magnetic = page.locator('.hero-actions .magnetic-target').first()
  await expect(magnetic).toBeVisible()
  const bounds = await magnetic.boundingBox()
  expect(bounds).not.toBeNull()
  await page.mouse.move(
    bounds!.x + bounds!.width - 12,
    bounds!.y + bounds!.height / 2,
  )
  await expect
    .poll(() =>
      magnetic
        .locator('.magnetic-surface')
        .evaluate((node) =>
          Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).m41),
        ),
    )
    .toBeGreaterThan(0.5)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('html')).not.toHaveClass(/lenis/)
  await expect(magnetic.locator('.magnetic-surface')).toHaveCSS(
    'transform',
    'none',
  )
  await page.locator('.desktop-nav a[href="#projects"]').click()
  const card = page.locator('.glow').first()
  await card.hover()
  await expect(card.locator('.glow-light')).toHaveCSS('display', 'none')
  await expect(page.locator('h1')).toHaveCSS('opacity', '1')

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('html')).toHaveClass(/lenis/)
  await card.hover({ position: { x: 80, y: 80 } })
  await expect(card).toHaveAttribute('data-pointer-active', 'true')
  await expect(card.locator('.glow-light')).toHaveCSS('opacity', '1')
  await card.locator('.project-preview').focus()
  await expect(card.locator('.glow-light')).toHaveCSS('opacity', '0')
})

test('touch keeps native scrolling and usable anchor navigation', async ({
  browser,
}) => {
  const context = await browser.newContext({ ...devices['Pixel 7'] })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:3100/en')
  await page.getByRole('button', { name: 'Commands', exact: true }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('html')).not.toHaveClass(/lenis/)
  await page.locator('.hero-actions a[href="#experience"]').tap()
  await expect(page).toHaveURL(/#experience$/)
  await expect(page.locator('#experience-title')).toBeFocused()
  expect(await page.locator('.glow[data-pointer-active]').count()).toBe(0)
  await context.close()
})

test('all revealed content is visible without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:3100/en')
  const hidden = await page
    .locator('.motion-reveal, [data-hero-reveal], h1')
    .evaluateAll(
      (nodes) =>
        nodes.filter((node) => getComputedStyle(node).opacity !== '1').length,
    )
  expect(hidden).toBe(0)
  await page.locator('.hero-actions a[href="#experience"]').click()
  await expect(page).toHaveURL(/#experience$/)
  await context.close()
})

test('capture hero and reactive project cards', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/en')
  await expect(page.locator('html')).toHaveClass(/lenis/)
  await expect(page.locator('.hero-baseline')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: 'test-results/motion-hero.png' })
  await page.locator('.desktop-nav a[href="#projects"]').click()
  await expect
    .poll(() =>
      page
        .locator('#projects')
        .evaluate((node) => Math.abs(node.getBoundingClientRect().top - 80)),
    )
    .toBeLessThan(3)
  const card = page.locator('.glow').first()
  await card.hover({ position: { x: 180, y: 120 } })
  await expect(card.locator('.glow-light')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: 'test-results/motion-projects.png' })
})
