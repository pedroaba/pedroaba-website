'use client'

import { cn } from '@pedroaba/lib/utils'
import type { ComponentProps } from 'react'

type NavButtonProps = ComponentProps<'button'> & {
  href: string
}

export function NavButton({
  href,
  children,
  className,
  ...props
}: NavButtonProps) {
  const scrollToSection = (targetHref: string) => {
    const element = document.querySelector(targetHref)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={() => scrollToSection(href)}
      className={cn(
        'text-sm text-muted-foreground hover:text-foreground transition-colors text-left',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
