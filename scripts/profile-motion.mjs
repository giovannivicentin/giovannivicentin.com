import { chromium, devices } from '@playwright/test'

const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHANNEL
    ? { channel: process.env.PLAYWRIGHT_CHANNEL }
    : {}),
})
const baseURL = process.env.PROFILE_URL ?? 'http://127.0.0.1:3100'

try {
  for (const [device, options] of [
    ['desktop', { viewport: { width: 1440, height: 900 } }],
    ['mobile', devices['Pixel 7']],
  ]) {
    for (let run = 1; run <= 3; run++) {
      const context = await browser.newContext(options)
      const page = await context.newPage()
      const cdp = await context.newCDPSession(page)
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
      await page.addInitScript(() => {
        window.motionProfile = { lcp: 0, cls: 0, longTasks: [] }
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.motionProfile.lcp = entry.startTime
          }
        }).observe({ type: 'largest-contentful-paint', buffered: true })
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              window.motionProfile.cls += entry.value
            }
          }
        }).observe({ type: 'layout-shift', buffered: true })
        new PerformanceObserver((list) => {
          window.motionProfile.longTasks.push(
            ...list.getEntries().map((entry) => entry.duration),
          )
        }).observe({ type: 'longtask', buffered: true })
      })
      await page.goto(`${baseURL}/`, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      const load = await page.evaluate(() => ({
        ...window.motionProfile,
        jsBytes: performance
          .getEntriesByType('resource')
          .filter((entry) => entry.initiatorType === 'script')
          .reduce((sum, entry) => sum + entry.encodedBodySize, 0),
        jsDecodedBytes: performance
          .getEntriesByType('resource')
          .filter((entry) => entry.initiatorType === 'script')
          .reduce((sum, entry) => sum + entry.decodedBodySize, 0),
      }))
      const frames = page.evaluate(
        () =>
          new Promise((resolve) => {
            const samples = []
            let last = performance.now()
            const end = last + 2000
            function tick(now) {
              samples.push(now - last)
              last = now
              if (now < end) {
                requestAnimationFrame(tick)
              } else {
                resolve({
                  frames: samples.length,
                  over34ms: samples.filter((value) => value > 34).length,
                  longestFrame: Math.round(Math.max(...samples)),
                })
              }
            }
            requestAnimationFrame(tick)
          }),
      )
      await page.mouse.wheel(0, 1200)
      const scrolling = await frames
      process.stdout.write(
        `${JSON.stringify({ device, run, ...load, scrolling })}\n`,
      )
      await context.close()
    }
  }
} finally {
  await browser.close()
}
