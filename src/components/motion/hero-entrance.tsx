'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { motionQueries } from '@/lib/motion'

export function HeroEntrance({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = scope.current!
    const preference = matchMedia(motionQueries.allowed)
    const finish = () => {
      element.setAttribute('data-hero-entered', '')
    }
    const onPreferenceChange = () => {
      if (!preference.matches) finish()
    }
    const onAnimationEnd = (event: AnimationEvent) => {
      // The final phase consumes the entrance; preference changes cannot replay it.
      if (
        event.target instanceof Element &&
        event.target.matches('.hero-proof')
      ) {
        finish()
      }
    }

    // CSS starts at first paint. Hydration only cancels it when appropriate.
    if (
      !preference.matches ||
      window.scrollY > 24 ||
      location.hash ||
      !element.querySelector('.hero-proof')?.getAnimations().length
    )
      finish()
    element.addEventListener('focusin', finish)
    element.addEventListener('animationend', onAnimationEnd)
    preference.addEventListener('change', onPreferenceChange)
    return () => {
      element.removeEventListener('focusin', finish)
      element.removeEventListener('animationend', onAnimationEnd)
      preference.removeEventListener('change', onPreferenceChange)
    }
  }, [])

  return (
    <section ref={scope} id="presentation" className="hero section-pad">
      {children}
    </section>
  )
}
