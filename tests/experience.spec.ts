import { test, expect } from '@playwright/test'

for (const width of [1440, 390]) {
  test(`closing experience details has no final layout jump at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/pt')
    for (const details of await page.locator('.experience-more').all()) {
      await details.locator('summary').click()
      await expect
        .poll(() =>
          details.evaluate(
            (node) =>
              node
                .getAnimations({ subtree: true })
                .filter((animation) => animation.playState === 'running')
                .length,
          ),
        )
        .toBe(0)

      const samples = await details.evaluate(async (node) => {
        const following = node.nextElementSibling!
        const values: { time: number; height: number; followingTop: number }[] =
          []
        const start = performance.now()
        node.querySelector('summary')!.click()
        await new Promise<void>((resolve) => {
          const sample = () => {
            const time = performance.now() - start
            values.push({
              time,
              height: node.getBoundingClientRect().height,
              followingTop:
                following.getBoundingClientRect().top + window.scrollY,
            })
            if (time < 800) requestAnimationFrame(sample)
            else resolve()
          }
          requestAnimationFrame(sample)
        })
        return values
      })
      // The easing is nearly settled after 350 ms. A disappearing outer margin
      // at 500 ms causes a visible jump instead of the remaining subpixel motion.
      const tail = samples.filter((sample) => sample.time >= 350)
      for (let index = 1; index < tail.length; index++) {
        expect(
          Math.abs(tail[index].height - tail[index - 1].height),
        ).toBeLessThan(2)
        expect(
          Math.abs(tail[index].followingTop - tail[index - 1].followingTop),
        ).toBeLessThan(2)
      }
      await expect(details).not.toHaveAttribute('open')
      await expect(details.locator('.experience-narrative')).toBeHidden()
    }
  })
}

test('experience details animate in sequence and remain usable after rapid toggles', async ({
  page,
}) => {
  await page.goto('/pt')
  const details = page.locator('.experience-itau .experience-more')
  const toggle = details.locator('summary')
  const paragraphs = details.locator('.experience-narrative > p')
  await toggle.click()
  await expect(details).toHaveAttribute('open', '')
  const timing = await paragraphs.evaluateAll((nodes) =>
    nodes.map((node) => {
      const style = getComputedStyle(node)
      return {
        name: style.animationName,
        duration: style.animationDuration,
        delay: style.animationDelay,
      }
    }),
  )
  expect(timing).toEqual([
    { name: 'experience-detail-enter', duration: '0.5s', delay: '0s' },
    { name: 'experience-detail-enter', duration: '0.5s', delay: '0.07s' },
    { name: 'experience-detail-enter', duration: '0.5s', delay: '0.14s' },
  ])
  for (const paragraph of await paragraphs.all())
    await expect(paragraph).toHaveCSS('opacity', '1')
  await toggle.press('Enter')
  await toggle.press('Enter')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const paragraph of await paragraphs.all()) {
    await expect(paragraph).toHaveCSS('opacity', '1')
    await expect(paragraph).toHaveCSS('animation-name', 'none')
  }
  await toggle.press('Enter')
  await expect(details).not.toHaveAttribute('open')
  await expect(details.locator('.experience-narrative')).toBeHidden()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await toggle.press('Enter')
  for (const paragraph of await paragraphs.all())
    await expect(paragraph).toHaveCSS('opacity', '1')
  await page
    .locator('.experience-itau')
    .screenshot({ path: 'test-results/experience-expanded.png' })
})

test.beforeEach(async ({ page }) => {
  await page
    .context()
    .addCookies([
      { name: 'NEXT_LOCALE', value: 'br', url: 'http://127.0.0.1:3100' },
    ])
})

test('presentation logos regain color on hover while experience stays grayscale', async ({
  page,
}) => {
  await page.goto('/')
  const strip = page.locator('.company-marquee')
  await strip.scrollIntoViewIfNeeded()
  await expect(strip).toHaveAttribute('data-motion', 'true')
  const originals = strip.locator(
    '.company-marquee-group:not([aria-hidden]) .company-logo',
  )
  for (const logo of await originals.all()) {
    await page.mouse.move(0, 0)
    await expect(logo.locator('img')).toHaveCSS(
      'filter',
      'grayscale(1) brightness(1.8)',
    )
    // A real pointer can enter a moving logo; skip Playwright's stability wait.
    await logo.hover({ force: true })
    await expect(logo.locator('img')).toHaveCSS('filter', 'none')
    await expect(logo).toHaveCSS(
      'color',
      (await logo.getAttribute('data-company')) === 'itau'
        ? 'rgb(255, 152, 87)'
        : 'rgb(140, 186, 255)',
    )
  }
  await expect(originals.first()).toHaveCSS('font-size', '20px')

  // Move to the repeated half of the real animation: inert copies used to ignore hover.
  await strip.locator('.company-marquee-track').evaluate((track) => {
    const animation = track.getAnimations()[0]
    animation.pause()
    animation.currentTime = 39999
  })
  for (const logo of await strip
    .locator('.company-marquee-group[aria-hidden] .company-logo')
    .all()) {
    await logo.hover()
    await expect(logo.locator('img')).toHaveCSS('filter', 'none')
    await expect(logo).toHaveCSS(
      'color',
      (await logo.getAttribute('data-company')) === 'itau'
        ? 'rgb(255, 152, 87)'
        : 'rgb(140, 186, 255)',
    )
  }

  for (const row of await page.locator('.experience-row').all()) {
    await row.hover({ position: { x: 8, y: 8 } })
    for (const logo of await row.locator('.company-mark img').all()) {
      await expect(logo).toHaveCSS(
        'filter',
        (await row.getAttribute('class'))?.includes('experience-carrefour')
          ? 'brightness(0) invert(0.87)'
          : 'grayscale(1) brightness(1.8)',
      )
    }
  }
  for (const toggle of await page.locator('.experience-row summary').all()) {
    await toggle.focus()
    const row = toggle.locator('xpath=ancestor::article')
    for (const logo of await row.locator('.company-mark img').all()) {
      await expect(logo).toHaveCSS(
        'filter',
        (await row.getAttribute('class'))?.includes('experience-carrefour')
          ? 'brightness(0) invert(0.87)'
          : 'grayscale(1) brightness(1.8)',
      )
    }
  }
  const carrefour = page.locator('.experience-carrefour')
  for (const mark of await carrefour.locator('.company-mark').all()) {
    await expect(mark).toHaveCSS('border-top-width', '0px')
    await expect(mark).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  }
  await carrefour.hover({ position: { x: 8, y: 8 } })
  await carrefour.screenshot({ path: 'test-results/experience-hover.png' })
  await page.setViewportSize({ width: 390, height: 844 })
  await carrefour.screenshot({ path: 'test-results/experience-mobile.png' })
})

test('experience highlights stay concise and full details work with the keyboard without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: 'reduce',
  })
  await context.addCookies([
    { name: 'NEXT_LOCALE', value: 'br', url: 'http://127.0.0.1:3100' },
  ])
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:3100/')
  for (const row of await page.locator('.experience-row').all()) {
    await expect(row.locator('.experience-highlight')).toHaveCount(3)
    await expect(row.locator('.experience-narrative')).toBeHidden()
    await expect(row.locator('ul')).toHaveCount(0)
    const toggle = row.locator('summary')
    await toggle.focus()
    await toggle.press('Enter')
    await expect(row.locator('.experience-narrative')).toBeVisible()
    await expect(toggle).toContainText('Recolher detalhes')
    await toggle.press('Enter')
    await expect(row.locator('.experience-narrative')).toBeHidden()
  }
  await context.close()
})
