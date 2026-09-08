'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Command as CommandIcon, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { rememberLanguage } from '@/lib/language'
import { links, locales, projects, sections } from '@/lib/portfolio'
import { useScrollController } from './motion/experience-provider'

export function CommandPalette() {
  const t = useTranslations('Portfolio')
  const p = useTranslations('ProjectSection')
  const router = useRouter()
  const scroll = useScrollController()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [modifier, setModifier] = useState('Ctrl')
  const previousFocus = useRef<HTMLElement | null>(null)
  const destination = useRef<string | null>(null)
  const dialog = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      return scroll.lock()
    }
  }, [open, scroll])

  useEffect(() => {
    setModifier(/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl')
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
        !dialog.current?.contains(target)
      )
        return
      event.preventDefault()
      setOpen((value) => {
        if (!value)
          previousFocus.current = document.activeElement as HTMLElement
        return !value
      })
      setStatus('')
    }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [])

  function navigate(id: string) {
    destination.current = id
    setOpen(false)
  }
  function external(href: string) {
    window.open(href, '_blank', 'noopener,noreferrer')
    setOpen(false)
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(links.email)
      setStatus(t('copied'))
    } catch {
      setStatus(t('copyError'))
    }
  }
  const normalize = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  return (
    <>
      <button
        className="command-trigger"
        aria-label={t('commands')}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          previousFocus.current = document.activeElement as HTMLElement
          setStatus('')
          setOpen(true)
        }}
      >
        <CommandIcon size={16} aria-hidden="true" />
        <span>{t('commands')}</span>
        <kbd>{modifier} K</kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          ref={dialog}
          data-lenis-prevent
          className="palette-content translate-y-0"
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            dialog.current
              ?.querySelector<HTMLInputElement>('[cmdk-input]')
              ?.focus()
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            if (destination.current) {
              scroll.navigate(destination.current)
              destination.current = null
            } else previousFocus.current?.focus()
          }}
        >
          <div className="palette-heading">
            <DialogTitle>{t('commands')}</DialogTitle>
            <button aria-label={t('close')} onClick={() => setOpen(false)}>
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <DialogDescription className="sr-only">
            {t('search')}
          </DialogDescription>
          <Command
            filter={(value, search, keywords) =>
              normalize([value, ...(keywords ?? [])].join(' ')).includes(
                normalize(search),
              )
                ? 1
                : 0
            }
          >
            <CommandInput placeholder={t('search')} aria-label={t('search')} />
            <CommandList>
              <CommandEmpty>{t('empty')}</CommandEmpty>
              <CommandGroup heading={t('navigation')}>
                <CommandItem
                  value={t('home')}
                  onSelect={() => navigate('presentation')}
                >
                  {t('home')}
                </CommandItem>
                {sections.map((section) => (
                  <CommandItem
                    key={section}
                    value={t(section)}
                    keywords={[section]}
                    onSelect={() => navigate(section)}
                  >
                    {t(section)}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading={t('career')}>
                <CommandItem onSelect={() => external(links.resume)}>
                  {t('resume')}
                </CommandItem>
                <CommandItem onSelect={() => external(links.linkedin)}>
                  {t('linkedin')}
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading={t('code')}>
                <CommandItem onSelect={() => external(links.github)}>
                  GitHub
                </CommandItem>
                {projects.map((project) => (
                  <CommandItem
                    key={project.id}
                    value={`${t('repository')} ${p(`${project.id}.title`)}`}
                    onSelect={() => external(project.repository)}
                  >
                    {p(`${project.id}.title`)}
                    <span className="text-muted-foreground ml-auto text-xs">
                      GitHub ↗
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading={t('contact')}>
                <CommandItem onSelect={copy}>{t('copy')}</CommandItem>
                <CommandItem
                  onSelect={() => {
                    window.location.href = `mailto:${links.email}`
                    setOpen(false)
                  }}
                >
                  {t('send')}
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading={t('language')}>
                {locales.map((locale) => (
                  <CommandItem
                    key={locale}
                    onSelect={() => {
                      scroll.cancel()
                      rememberLanguage(locale)
                      router.refresh()
                      setOpen(false)
                    }}
                  >
                    {{ br: 'Português', en: 'English', es: 'Español' }[locale]}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <p role="status" className="palette-status">
            {status}
            {status === t('copyError') && (
              <>
                <br />
                <span>{links.email}</span>
              </>
            )}
          </p>
          <div className="palette-footer">
            <span>↑ ↓ {t('commandHint')}</span>
            <span>↵ {t('selectHint')}</span>
            <span>esc {t('closeHint')}</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
