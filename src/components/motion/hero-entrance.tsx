'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { stagger, useAnimate } from 'motion/react'
import { motionTiming } from '@/lib/motion'
import { useMotionAllowed } from './experience-provider'

export function HeroEntrance({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate<HTMLElement>()
  const played = useRef(false)
  const motionAllowed = useMotionAllowed()

  useEffect(() => {
    if (!motionAllowed || played.current) {
      return
    }
    played.current = true
    // Never hide text the visitor has already started reading or a restored page.
    if (performance.now() > 1500 || window.scrollY > 24 || location.hash) {
      return
    }
    const before = scope.current.querySelectorAll<HTMLElement>(
      '[data-hero-reveal="before"]',
    )
    const after = scope.current.querySelectorAll<HTMLElement>(
      '[data-hero-reveal="after"]',
    )
    const title =
      scope.current.querySelectorAll<HTMLElement>('[data-hero-title]')
    // Overlap the longer entrances while preserving the staggered reading order.
    const beforeControls = animate(
      before,
      { opacity: [0, 1], y: [6, 0] },
      {
        duration: motionTiming.heroBefore.duration,
        ease: motionTiming.revealEase,
      },
    )
    const titleControls = animate(
      title,
      {
        opacity: [0, 1],
        filter: ['blur(6px)', 'blur(0px)'],
        transform: ['translateY(8px)', 'translateY(0px)'],
      },
      {
        duration: motionTiming.heroTitle.duration,
        ease: motionTiming.revealEase,
        delay: stagger(motionTiming.heroTitle.stagger, {
          startDelay: motionTiming.heroTitle.delay,
        }),
      },
    )
    const afterControls = animate(
      after,
      { opacity: [0, 1], y: [8, 0] },
      {
        duration: motionTiming.heroAfter.duration,
        ease: motionTiming.revealEase,
        delay: stagger(motionTiming.heroAfter.stagger, {
          startDelay: motionTiming.heroAfter.delay,
        }),
      },
    )
    const finish = () => {
      // Complete through Motion so its next render also uses the final values.
      // stop() can commit an intermediate blur after a direct DOM style reset.
      beforeControls.complete()
      titleControls.complete()
      afterControls.complete()
    }
    const element = scope.current
    element.addEventListener('focusin', finish)
    return () => {
      element.removeEventListener('focusin', finish)
      finish()
    }
  }, [animate, motionAllowed, scope])

  return (
    <section ref={scope} id="presentation" className="hero section-pad">
      {children}
    </section>
  )
}
