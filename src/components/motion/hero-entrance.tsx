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
    const nodes =
      scope.current.querySelectorAll<HTMLElement>('[data-hero-reveal]')
    const controls = animate(
      nodes,
      { opacity: [0, 1], y: [14, 0] },
      {
        type: 'spring',
        ...motionTiming.revealSpring,
        delay: stagger(motionTiming.stagger),
      },
    )
    const finish = () => {
      controls.stop()
      nodes.forEach((node) => {
        node.style.opacity = '1'
        node.style.transform = 'none'
      })
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
