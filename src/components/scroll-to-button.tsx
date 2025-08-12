'use client'

import { Button } from '@pedroaba/components/ui/button'
import { cn } from '@pedroaba/lib/utils'

interface ScrollToButtonProps {
  targetId: string
  children: React.ReactNode
  className?: string
}

export function ScrollToButton({
  targetId,
  children,
  className,
}: ScrollToButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Button onClick={handleClick} className={cn('', className)}>
      {children}
    </Button>
  )
}
