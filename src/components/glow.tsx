'use client'
import { useEffect, useRef, type ReactNode } from 'react'
import { motionQueries } from '@/lib/motion'
import { useMotionAllowed } from './motion/experience-provider'

export function Glow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const light = useRef<HTMLSpanElement>(null)
  const motionAllowed = useMotionAllowed()
  useEffect(() => {
    const node = ref.current
    const surface = light.current
    if (!node || !surface || !motionAllowed) {
      return
    }
    const media = matchMedia(motionQueries.pointer)
    let frame = 0
    let active = false
    let point = { x: 0, y: 0 }
    const update = () => {
      if (frame || !active) {
        return
      }
      frame = requestAnimationFrame(() => {
        frame = 0
        const rect = node.getBoundingClientRect()
        surface.style.setProperty('--pointer-x', `${point.x - rect.left}px`)
        surface.style.setProperty('--pointer-y', `${point.y - rect.top}px`)
        node.dataset.pointerActive = 'true'
      })
    }
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== 'mouse') {
        return
      }
      point = { x: event.clientX, y: event.clientY }
      active = true
      update()
    }
    const leave = () => {
      active = false
      cancelAnimationFrame(frame)
      frame = 0
      delete node.dataset.pointerActive
    }
    node.addEventListener('pointermove', move, { passive: true })
    node.addEventListener('pointerleave', leave)
    node.addEventListener('pointercancel', leave)
    media.addEventListener('change', leave)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      leave()
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerleave', leave)
      node.removeEventListener('pointercancel', leave)
      media.removeEventListener('change', leave)
      window.removeEventListener('scroll', update)
    }
  }, [motionAllowed])
  return (
    <div className="glow" ref={ref}>
      {children}
      <span className="glow-clip" aria-hidden="true">
        <span ref={light} className="glow-light" />
      </span>
    </div>
  )
}
