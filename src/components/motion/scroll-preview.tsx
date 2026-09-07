'use client'

import { useRef, type ReactNode } from 'react'
import { useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { useMotionAllowed } from './experience-provider'

export function ScrollPreview({ children }: { children: ReactNode }) {
  const target = useRef<HTMLDivElement>(null)
  const motionAllowed = useMotionAllowed()
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'start center'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1])

  return (
    <div ref={target} className="scroll-preview">
      <m.div
        className="scroll-preview-surface"
        style={{ scale: motionAllowed ? scale : 1 }}
      >
        {children}
      </m.div>
    </div>
  )
}
