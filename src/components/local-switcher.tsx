'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Check, Globe } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export function LocalSwitcher() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const localActive = useLocale()

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(`/${nextLocale}`)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isPending} variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <label className="sr-only">Select a language</label>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onSelectChange('en')}
          className="flex items-center gap-2"
        >
          <span className="text-sm font-medium">English</span>
          {localActive === 'en' && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onSelectChange('es')}
          className="flex items-center gap-2"
        >
          <span className="text-sm font-medium">Español</span>
          {localActive === 'es' && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onSelectChange('br')}
          className="flex items-center gap-2"
        >
          <span className="text-sm font-medium">Português</span>
          {localActive === 'br' && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
