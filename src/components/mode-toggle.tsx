'use client'

import { Loader, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from './ui/button'

export function ModeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const displayIcon = () => {
    if (!mounted) {
      return <Loader className="h-5 w-5 animate-spin" />
    }

    if (theme === 'system') {
      return resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5 text-primary" />
      ) : (
        <Moon className="h-5 w-5 text-primary" />
      )
    }
    return theme === 'dark' ? (
      <Sun className="h-5 w-5 text-primary" />
    ) : (
      <Moon className="h-5 w-5 text-primary" />
    )
  }

  return (
    <Button
      variant="ghost"
      aria-label="Button to change theme"
      size="icon"
      className="hover:text-muted-foreground"
      onClick={handleToggle}
    >
      {displayIcon()}
    </Button>
  )
}
