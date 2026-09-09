# giovannivicentin.com

Giovanni Vicentin’s multilingual software engineering portfolio. Professional contributions at Itaú and Carrefour/Sam’s Club lead the page, followed by public projects, background, and direct contact.

Built with Next.js App Router, React, TypeScript, Tailwind CSS 4, shadcn/Radix, cmdk, and next-intl. The interface uses a fixed monochrome dark theme, Geist fonts, a keyboard command palette, and reduced-motion-aware pointer lighting.

## Development

```sh
npm install
npm run dev
```

All languages use `/`, without redirects or locale prefixes. The server reads the validated `NEXT_LOCALE` cookie, then the browser’s Accept-Language preference, with Portuguese as fallback. Both language controls persist the choice for one year and refresh server content while preserving the URL and section. Canonical metadata and sitemap use the single root URL; languages do not have separate indexable URLs. Legacy language paths return 404.

## Checks

```sh
npm run lint:check
npm run format:check
npx tsc --noEmit
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests start the production build on port 3100. They cover keyboard commands, locale and hash preservation, clipboard success/failure, accessibility, responsive widths, and content without JavaScript. Screenshots are written to ignored `test-results/`.

## Content and styling

- `src/lib/portfolio.ts`: shared links, experience and project metadata.
- `messages/{br,en,es}.json`: localized copy. Keep facts aligned across languages; publish only verified results.
- `src/app/globals.css`: monochrome semantic tokens, typography, layout and motion. Tailwind 4 uses the CSS theme directly.
- `public/resume/giovanni-vicentin-resume.pdf`: existing résumé URL.

Cmd/Ctrl+K opens navigation and actions. Escape restores focus; selecting a section focuses its heading. Email can be copied or opened with the visitor’s mail application. The former `/api/send` endpoint and Resend integration have been removed; `RESEND_API_KEY` is no longer used.

## Deployment

Deploy with the Vercel Next.js preset, build command `npm run build`. Check all locale routes, résumé, sitemap, robots and Open Graph image in Preview before promoting to Production. Keep the previous deployment available for rollback. Analytics and Speed Insights remain enabled.

Performance targets are goals, not measured claims: mobile Lighthouse Performance ≥95, LCP ≤2.5s, CLS ≤0.1, and field INP ≤200ms when sufficient traffic is available.
