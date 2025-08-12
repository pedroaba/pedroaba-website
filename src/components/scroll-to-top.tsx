'use client'

import { cn } from '@pedroaba/lib/utils'
import type { ComponentProps } from 'react'

type ScrollToTopProps = ComponentProps<'button'>

export function ScrollToTop({
  children,
  className,
  ...props
}: ScrollToTopProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'cursor-pointer text-2xl font-bold text-primary hover:text-primary/80 transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
