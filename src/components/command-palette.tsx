'use client'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { Command as CommandIcon } from 'lucide-react'

const CommandPaletteDialog = dynamic(() => import('./command-palette-dialog'), {
  ssr: false,
})

// The platform is stable for the lifetime of the page.
const subscribePlatform = () => () => {}
const getPlatformModifier = () =>
  /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl'
const getServerModifier = () => null

export function CommandPalette() {
  const t = useTranslations('Portfolio')
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const previousFocus = useRef<HTMLElement | null>(null)
  const modifier = useSyncExternalStore(
    subscribePlatform,
    getPlatformModifier,
    getServerModifier,
  )

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (
        !(event.metaKey || event.ctrlKey) ||
        event.key.toLowerCase() !== 'k' ||
        event.repeat ||
        event.isComposing
      )
        return
      const target = event.target as HTMLElement
      if (
        target.closest('input, textarea, select, [contenteditable="true"]') &&
        !target.closest('.palette-content')
      )
        return
      event.preventDefault()
      setOpen((value) => {
        if (!value)
          previousFocus.current = document.activeElement as HTMLElement
        return !value
      })
      setLoaded(true)
    }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [])

  return (
    <>
      <button
        className="command-trigger"
        data-ready={modifier !== null}
        aria-label={t('commands')}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          previousFocus.current = document.activeElement as HTMLElement
          setLoaded(true)
          setOpen(true)
        }}
      >
        <CommandIcon size={16} aria-hidden="true" />
        <span>{t('commands')}</span>
        <span className="command-shortcut">
          <kbd>{modifier} K</kbd>
        </span>
      </button>
      {loaded && (
        <CommandPaletteDialog
          open={open}
          setOpen={setOpen}
          previousFocus={previousFocus}
        />
      )}
    </>
  )
}
