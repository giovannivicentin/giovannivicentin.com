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
    if (resetTimer.current) clearTimeout(resetTimer.current)
    try {
      await navigator.clipboard.writeText(email)
      setStatus('copied')
      resetTimer.current = setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
    }
  }

  const label =
    status === 'copied'
      ? copiedLabel
      : status === 'error'
        ? errorLabel
        : copyLabel

  return (
    <div className="copy-control">
      <Button type="button" onClick={copyEmail}>
        {status === 'copied' ? (
          <CheckIcon data-icon="inline-start" aria-hidden="true" />
        ) : (
          <CopyIcon data-icon="inline-start" aria-hidden="true" />
        )}
        <span>{status === 'error' ? copyLabel : label}</span>
      </Button>
      <span
        role="status"
        className={status === 'error' ? 'copy-error' : 'sr-only'}
      >
        {status === 'idle' ? '' : label}
      </span>
    </div>
  )
}
