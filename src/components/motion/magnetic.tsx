'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { useSpring } from 'motion/react'
import * as m from 'motion/react-m'
import { motionQueries, motionTiming } from '@/lib/motion'
import { useMotionAllowed } from './experience-provider'

export function Magnetic({ children }: { children: ReactNode }) {
  const motionAllowed = useMotionAllowed()
  const active = useRef(false)
  const frame = useRef(0)
  const point = useRef({ x: 0, y: 0 })
  const x = useSpring(0, motionTiming.magneticSpring)
  const y = useSpring(0, motionTiming.magneticSpring)

  useEffect(() => {
    if (!motionAllowed) {
      active.current = false
      cancelAnimationFrame(frame.current)
      frame.current = 0
      x.jump(0)
      y.jump(0)
    }
    return () => cancelAnimationFrame(frame.current)
  }, [motionAllowed, x, y])

  function reset(immediate = false) {
    active.current = false
    cancelAnimationFrame(frame.current)
    frame.current = 0
    if (immediate) {
      x.jump(0)
      y.jump(0)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  return (
    <span
      className="magnetic-target"
      onPointerEnter={(event) => {
        active.current =
          motionAllowed &&
          event.pointerType === 'mouse' &&
          matchMedia(motionQueries.pointer).matches &&
          !event.currentTarget.querySelector(':disabled, :focus-visible')
      }}
      onPointerMove={(event) => {
        if (!active.current || !motionAllowed) {
          return
        }
        const target = event.currentTarget
        point.current = { x: event.clientX, y: event.clientY }
        if (frame.current) {
          return
        }
        frame.current = requestAnimationFrame(() => {
          frame.current = 0
          const rect = target.getBoundingClientRect()
          const clamp = (value: number) => Math.max(-6, Math.min(6, value))
          x.set(clamp((point.current.x - rect.left - rect.width / 2) * 0.12))
          y.set(clamp((point.current.y - rect.top - rect.height / 2) * 0.12))
        })
      }}
      onPointerLeave={() => reset()}
      onPointerCancel={() => reset(true)}
      onPointerDown={() => reset(true)}
      onFocusCapture={() => reset(true)}
    >
      <m.span
        className="magnetic-surface"
        style={{ x: motionAllowed ? x : 0, y: motionAllowed ? y : 0 }}
      >
        {children}
      </m.span>
    </span>
  )
}
