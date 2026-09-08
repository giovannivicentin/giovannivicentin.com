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
    .locator('.motion-reveal, [data-hero-reveal], [data-hero-title], h1')
    .evaluateAll(
      (nodes) =>
        nodes.filter((node) => getComputedStyle(node).opacity !== '1').length,
    )
  expect(hidden).toBe(0)
  for (const line of await page.locator('[data-hero-title]').all()) {
    await expect(line).toHaveCSS('filter', /^(none|blur\(0px\))$/)
    await expect(line).toHaveCSS(
      'transform',
      /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/,
    )
  }
  await page.locator('.hero-actions a[href="#experience"]').click()
  await expect(page).toHaveURL(/#experience$/)
  await context.close()
})

test('capture hero and reactive project cards', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/en')
  await expect(page.locator('html')).toHaveClass(/lenis/)
  await expect(page.locator('.hero-baseline')).toHaveCSS('opacity', '1')
  await expect(page.locator('[data-hero-title]').last()).toHaveCSS(
    'filter',
    'blur(0px)',
  )
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

test('title uses a brief fade, blur and rise, settles, and does not replay', async ({
  page,
}) => {
  await page.goto('/en', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => {
    const line = document.querySelector('[data-hero-title]')!
    return parseFloat(getComputedStyle(line).filter.replace('blur(', '')) > 0
  })
  const lines = page.locator('[data-hero-title]')
  await expect(lines).toHaveCount(2)
  const animations = await lines.evaluateAll((nodes) =>
    nodes.map((node) =>
      node.getAnimations().map((animation) => ({
        timing: animation.effect!.getTiming(),
        frames: (animation.effect as KeyframeEffect).getKeyframes(),
      })),
    ),
  )
  for (const [index, lineAnimations] of animations.entries()) {
    expect(lineAnimations).toHaveLength(3)
    for (const animation of lineAnimations) {
      expect(animation.timing).toMatchObject({
        duration: 560,
        delay: 80 + index * 55,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      })
    }
    const keyframes = lineAnimations.flatMap((animation) => animation.frames)
    expect(keyframes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ opacity: '0' }),
        expect.objectContaining({ opacity: '1' }),
        expect.objectContaining({ filter: 'blur(6px)' }),
        expect.objectContaining({ filter: 'blur(0px)' }),
        expect.objectContaining({ transform: 'translateY(8px)' }),
        expect.objectContaining({ transform: 'translateY(0px)' }),
      ]),
    )
  }
  for (const line of await lines.all()) {
    await expect(line).toHaveCSS('opacity', '1')
    await expect(line).toHaveCSS('filter', 'blur(0px)')
    await expect
      .poll(() =>
        line.evaluate(
          (node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m42,
        ),
      )
      .toBe(0)
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('html')).not.toHaveClass(/lenis/)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  for (const line of await lines.all()) {
    await expect(line).toHaveCSS('filter', /^(none|blur\(0px\))$/)
    await expect(line).toHaveCSS(
      'transform',
      /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/,
    )
  }
})

test('changing to reduced motion during title entry finishes it immediately', async ({
  page,
}) => {
  await page.goto('/en', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => {
    const line = document.querySelector('[data-hero-title]')!
    return parseFloat(getComputedStyle(line).filter.replace('blur(', '')) > 0.05
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('html')).not.toHaveClass(/lenis/)
  for (const line of await page.locator('[data-hero-title]').all()) {
    await expect(line).toHaveCSS('opacity', '1')
    await expect(line).toHaveCSS('filter', /^(none|blur\(0px\))$/)
    await expect(line).toHaveCSS(
      'transform',
      /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/,
    )
  }
  for (const node of await page.locator('[data-hero-reveal]').all()) {
    await expect(node).toHaveCSS('opacity', '1')
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  for (const line of await page.locator('[data-hero-title]').all()) {
    await expect(line).toHaveCSS('filter', /^(none|blur\(0px\))$/)
  }
})

for (const scenario of ['reduced', 'anchor', 'slow', 'restored']) {
  test(`title stays sharp on ${scenario} entry`, async ({ page }) => {
    if (scenario === 'reduced')
      await page.emulateMedia({ reducedMotion: 'reduce' })
    if (scenario === 'slow') {
      await page.route('**/*.js', async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 1800))
        await route.continue()
      })
    }
    await page.goto(scenario === 'anchor' ? '/en#experience' : '/en')
    if (scenario === 'restored') {
      await page.locator('.hero-actions a[href="#experience"]').click()
      // Remove the hash so only restored scroll prevents the entrance on reload.
      await page.evaluate(() => history.replaceState(history.state, '', '/en'))
      await page.reload()
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeGreaterThan(24)
    }
    if (scenario !== 'reduced')
      await expect(page.locator('html')).toHaveClass(/lenis/)
    for (const line of await page.locator('[data-hero-title]').all()) {
      await expect(line).toHaveCSS('filter', /^(none|blur\(0px\))$/)
      await expect(line).toHaveCSS(
        'transform',
        /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/,
      )
    }
  })
}

test('hero overlaps entrances and reveals actions within the first second', async ({
  page,
}) => {
  await page.goto('/en', { waitUntil: 'domcontentloaded' })
  const overlap = await page.waitForFunction(() => {
    const intro = document.querySelector('.hero-intro')!
    const opacity = Number(getComputedStyle(intro).opacity)
    if (opacity <= 0 || opacity >= 0.95) return false
    return {
      before: Number(
        getComputedStyle(document.querySelector('[data-hero-reveal="before"]')!)
          .opacity,
      ),
      title: [...document.querySelectorAll('[data-hero-title]')].map(
        (node) => ({
          opacity: Number(getComputedStyle(node).opacity),
          blur: parseFloat(getComputedStyle(node).filter.replace('blur(', '')),
        }),
      ),
      supportTiming: [
        ...document.querySelectorAll('[data-hero-reveal="after"]'),
      ].flatMap((node) =>
        node.getAnimations().map((animation) => {
          const timing = animation.effect!.getTiming()
          return {
            delay: Number(timing.delay),
            end: Number(timing.delay) + Number(timing.duration),
          }
        }),
      ),
    }
  })
  const state = await overlap.jsonValue()
  if (!state)
    throw new Error('The title and supporting content did not overlap')
  expect(state.before).toBeGreaterThan(0.9)
  for (const line of state.title) {
    expect(line.opacity).toBeGreaterThan(0)
    expect(line.opacity).toBeLessThan(1)
    expect(line.blur).toBeGreaterThan(0)
  }
  expect(state.supportTiming).toHaveLength(3)
  for (const timing of state.supportTiming) {
    expect(timing.delay).toBeLessThanOrEqual(320)
    expect(timing.end).toBeLessThanOrEqual(700)
  }
  await expect(page.locator('.hero-actions')).toHaveCSS('opacity', '1')
  await expect(page.locator('.hero-baseline')).toHaveCSS('opacity', '1')
})

test('keyboard focus completes every pending hero phase', async ({ page }) => {
  await page.goto('/en', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(
    () =>
      document.querySelector('[data-hero-title]')!.getAnimations().length > 0,
  )
  const action = page.locator('.hero-actions a').first()
  await action.focus()
  await expect(action).toBeFocused()
  for (const node of await page
    .locator('[data-hero-title], [data-hero-reveal]')
    .all()) {
    await expect(node).toHaveCSS('opacity', '1')
  }
})
