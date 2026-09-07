'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import type Lenis from 'lenis'
import { motionQueries } from '@/lib/motion'

function subscribeMotion(callback: () => void) {
  const query = matchMedia(motionQueries.allowed)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

function getMotionSnapshot() {
  return matchMedia(motionQueries.allowed).matches
}

const getServerSnapshot = () => false
const MotionAllowedContext = createContext(false)

type NavigateOptions = { immediate?: boolean; history?: boolean }
type ScrollController = {
  navigate: (id: string, options?: NavigateOptions) => void
  cancel: () => void
  lock: () => () => void
}

const ScrollContext = createContext<ScrollController | null>(null)

export function useMotionAllowed() {
  return useContext(MotionAllowedContext)
}

export function useScrollController() {
  const controller = useContext(ScrollContext)
  if (!controller) {
    throw new Error('Scroll controls require ExperienceProvider')
  }
  return controller
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const motionAllowed = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getServerSnapshot,
  )
  const lenis = useRef<Lenis | null>(null)
  const locks = useRef(0)

  const cancel = useCallback(() => {
    const instance = lenis.current
    if (instance?.isScrolling === 'smooth' && !instance.isStopped) {
      instance.stop()
      instance.start()
    }
  }, [])

  const navigate = useCallback((id: string, options: NavigateOptions = {}) => {
    const target = document.getElementById(id)
    if (!target) {
      return
    }
    if (options.history !== false && window.location.hash !== `#${id}`) {
      // Preserve Next's history metadata and the browser's back/forward behavior.
      window.history.pushState(window.history.state, '', `#${id}`)
    }
    const heading = target.querySelector<HTMLElement>('h1, h2, h3') ?? target
    if (!heading.hasAttribute('tabindex')) {
      heading.setAttribute('tabindex', '-1')
    }
    heading.focus({ preventScroll: true })

    if (lenis.current && !lenis.current.isStopped) {
      // Lenis reads scroll-margin-top itself; do not apply the header offset twice.
      lenis.current.scrollTo(target, { immediate: options.immediate })
    } else {
      target.scrollIntoView({ behavior: 'instant' })
    }
  }, [])

  const lock = useCallback(() => {
    locks.current += 1
    lenis.current?.stop()
    let released = false
    return () => {
      if (released) {
        return
      }
      released = true
      locks.current -= 1
      if (locks.current === 0) {
        lenis.current?.start()
      }
    }
  }, [])

  useEffect(() => {
    if (!motionAllowed) {
      return
    }
    const pointer = matchMedia(motionQueries.pointer)
    let disposed = false
    let generation = 0

    async function sync() {
      const current = ++generation
      lenis.current?.destroy()
      lenis.current = null
      if (!pointer.matches) {
        return
      }
      try {
        const { default: Lenis } = await import('lenis')
        if (disposed || current !== generation) {
          return
        }
        lenis.current = new Lenis({
          autoRaf: true,
          lerp: 0.12,
          smoothWheel: true,
          syncTouch: false,
          // The shared handler below also handles focus, skip links and history.
          anchors: false,
        })
        if (locks.current > 0) {
          lenis.current.stop()
        }
      } catch {
        // Native scrolling remains fully usable if the optional chunk fails.
      }
    }

    void sync()
    pointer.addEventListener('change', sync)
    return () => {
      disposed = true
      pointer.removeEventListener('change', sync)
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [motionAllowed])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return
      }
      const anchor = event.target.closest<HTMLAnchorElement>('a[href]')
      if (
        !anchor ||
        anchor.hasAttribute('download') ||
        (anchor.target && anchor.target !== '_self')
      ) {
        return
      }
      const url = new URL(anchor.href, window.location.href)
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        url.hash.length < 2
      ) {
        return
      }
      let id: string
      try {
        id = decodeURIComponent(url.hash.slice(1))
      } catch {
        return
      }
      if (!document.getElementById(id)) {
        return
      }
      event.preventDefault()
      navigate(id, { immediate: anchor.classList.contains('skip-link') })
    }

    function onKeyDown(event: KeyboardEvent) {
      if (
        [
          'ArrowDown',
          'ArrowUp',
          'PageDown',
          'PageUp',
          'Home',
          'End',
          ' ',
          'Tab',
        ].includes(event.key)
      ) {
        cancel()
      }
    }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('popstate', cancel)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('popstate', cancel)
    }
  }, [cancel, navigate])

  const controller = useMemo(
    () => ({ navigate, cancel, lock }),
    [navigate, cancel, lock],
  )

  return (
    <MotionAllowedContext value={motionAllowed}>
      <ScrollContext value={controller}>
        <MotionConfig reducedMotion="user">
          <LazyMotion features={domAnimation} strict>
            {children}
          </LazyMotion>
        </MotionConfig>
      </ScrollContext>
    </MotionAllowedContext>
  )
}
