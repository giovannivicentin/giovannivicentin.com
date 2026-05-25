'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type Theme = 'dark' | 'light' | 'system'
type ResolvedTheme = 'dark' | 'light'

interface ThemeProviderProps {
  attribute?: 'class'
  children: ReactNode
  defaultTheme?: Theme
  disableTransitionOnChange?: boolean
  enableSystem?: boolean
}

interface ThemeContextValue {
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  theme: Theme
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const storageKey = 'theme'

function getSystemTheme(): ResolvedTheme {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  return 'light'
}

function resolveTheme(theme: Theme, enableSystem: boolean): ResolvedTheme {
  if (theme === 'system' && enableSystem) return getSystemTheme()

  return theme === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({
  attribute = 'class',
  children,
  defaultTheme = 'system',
  disableTransitionOnChange = false,
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')

  const applyTheme = useCallback(
    (nextTheme: Theme) => {
      const nextResolvedTheme = resolveTheme(nextTheme, enableSystem)
      const root = document.documentElement
      let transitionStyle: HTMLStyleElement | null = null

      if (disableTransitionOnChange) {
        transitionStyle = document.createElement('style')
        transitionStyle.appendChild(
          document.createTextNode(
            '*,*::before,*::after{transition:none!important}',
          ),
        )
        document.head.appendChild(transitionStyle)
      }

      if (attribute === 'class') {
        root.classList.toggle('dark', nextResolvedTheme === 'dark')
      }

      root.style.colorScheme = nextResolvedTheme
      setResolvedTheme(nextResolvedTheme)

      if (disableTransitionOnChange) {
        window.setTimeout(() => {
          transitionStyle?.remove()
        }, 0)
      }
    },
    [attribute, disableTransitionOnChange, enableSystem],
  )

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    window.localStorage.setItem(storageKey, nextTheme)
  }, [])

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey) as Theme | null
    const nextTheme = storedTheme ?? defaultTheme

    setThemeState(nextTheme)
    applyTheme(nextTheme)
  }, [applyTheme, defaultTheme])

  useEffect(() => {
    applyTheme(theme)
  }, [applyTheme, theme])

  useEffect(() => {
    if (!enableSystem) return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (theme === 'system') applyTheme('system')
    }

    media.addEventListener('change', onChange)

    return () => media.removeEventListener('change', onChange)
  }, [applyTheme, enableSystem, theme])

  const value = useMemo(
    () => ({
      resolvedTheme,
      setTheme,
      theme,
    }),
    [resolvedTheme, setTheme, theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
