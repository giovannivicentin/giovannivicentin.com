'use client'

import { useAnimate } from 'motion/react'
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { motionTiming } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { useMotionAllowed } from './experience-provider'

export function Reveal({
  children,
  className,
  as: Component = 'div',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article'
  delay?: number
}) {
  const motionAllowed = useMotionAllowed()
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const revealed = useRef(false)

  useLayoutEffect(() => {
    const element = scope.current
    if (!motionAllowed || revealed.current) return

    // SSR stays visible. Never hide content already seen during hydration,
    // restored scroll or anchor navigation; only prepare content below the fold.
    if (
      element.getBoundingClientRect().top < window.innerHeight ||
      element.contains(document.activeElement) ||
      !('IntersectionObserver' in window)
    ) {
      revealed.current = true
      return
    }
    element.setAttribute('data-reveal-pending', '')
    let controls: ReturnType<typeof animate> | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        if (revealed.current || !entries.some((entry) => entry.isIntersecting))
          return
        // Consume before animating so observations and rerenders cannot replay it.
        revealed.current = true
        observer.disconnect()
        controls = animate(
          element,
          { opacity: [0, 1], y: [20, 0] },
          {
            duration: motionTiming.reveal,
            ease: motionTiming.revealEase,
            delay,
          },
        )
      },
      { threshold: 0 },
    )
    observer.observe(element)

    const finish = () => {
      revealed.current = true
      observer.disconnect()
      controls?.complete()
      element.removeAttribute('data-reveal-pending')
    }
    element.addEventListener('focusin', finish)
    return () => {
      observer.disconnect()
      element.removeEventListener('focusin', finish)
      controls?.complete()
      // Undo preparation during Strict Mode cleanup or reduced-motion changes.
      element.removeAttribute('data-reveal-pending')
    }
  }, [animate, delay, motionAllowed, scope])

  return (
    <Component ref={scope} className={cn('motion-reveal', className)}>
      {children}
    </Component>
  )
}
