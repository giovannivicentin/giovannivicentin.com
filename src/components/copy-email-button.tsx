'use client'

import { Button } from '@/components/ui/button'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface CopyEmailButtonProps {
  email: string
  copyLabel: string
  copiedLabel: string
  errorLabel: string
}

export function CopyEmailButton({
  email,
  copyLabel,
  copiedLabel,
  errorLabel,
}: CopyEmailButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current)
    },
    [],
  )

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setStatus('copied')
    } catch {
      setStatus('error')
    }

    if (resetTimer.current) clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setStatus('idle'), 2000)
  }

  const label =
    status === 'copied'
      ? copiedLabel
      : status === 'error'
        ? errorLabel
        : copyLabel

  return (
    <Button type="button" variant="outline" size="sm" onClick={copyEmail}>
      {status === 'copied' ? (
        <CheckIcon data-icon="inline-start" aria-hidden="true" />
      ) : (
        <CopyIcon data-icon="inline-start" aria-hidden="true" />
      )}
      <span aria-live="polite">{label}</span>
    </Button>
  )
}
