'use client'

import * as m from 'motion/react-m'
import { useState, type ReactNode } from 'react'
import { motionTiming } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { useMotionAllowed } from './experience-provider'

export function Reveal({
  children,
  className,
  as = 'div',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article'
  delay?: number
}) {
  const motionAllowed = useMotionAllowed()
  const [focused, setFocused] = useState(false)
  const Component = as === 'article' ? m.article : m.div

  return (
    <Component
      className={cn('motion-reveal', className)}
      initial={false}
      whileInView={
        motionAllowed && !focused
          ? { opacity: [0, 1], y: [20, 0] }
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: motionTiming.reveal,
        ease: motionTiming.revealEase,
        delay: motionAllowed && !focused ? delay : 0,
      }}
      onFocusCapture={() => setFocused(true)}
    >
      {children}
    </Component>
  )
}
