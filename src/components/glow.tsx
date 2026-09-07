'use client'
import { useEffect, useRef, type ReactNode } from 'react'

export function Glow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const media = matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    let frame = 0
    const move = (event: PointerEvent) => {
      if (!media.matches) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect()
        node.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
        node.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`)
      })
    }
    node.addEventListener('pointermove', move, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('pointermove', move)
    }
  }, [])
  return (
    <div className="glow" ref={ref}>
      {children}
    </div>
  )
}
