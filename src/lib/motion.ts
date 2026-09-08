// Shared timing in seconds. CSS tokens live in globals.css.
export const motionTiming = {
  heroBefore: { duration: 0.22 },
  heroTitle: {
    duration: 0.56,
    delay: 0.08,
    stagger: 0.055,
  },
  heroAfter: { duration: 0.32, delay: 0.2, stagger: 0.06 },
  reveal: 0.65,
  stagger: 0.07,
  revealEase: [0.16, 1, 0.3, 1] as [number, number, number, number],
  revealSpring: { stiffness: 140, damping: 24, mass: 1 },
  magneticSpring: { stiffness: 280, damping: 26, mass: 0.6 },
}

export const motionQueries = {
  allowed: '(prefers-reduced-motion: no-preference)',
  pointer: '(hover: hover) and (pointer: fine)',
}
