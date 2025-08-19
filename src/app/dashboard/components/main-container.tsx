'use client'

import { ScrollArea } from '@pedroaba/components/ui/scroll-area'
import { useSidebar } from '@pedroaba/components/ui/sidebar'
import { cn } from '@pedroaba/lib/utils'

type MainContainerProps = {
  children: React.ReactNode
  className?: string
}

export function MainContainer({ children, className }: MainContainerProps) {
  const { state } = useSidebar()

  return (
    <ScrollArea
      className={cn(
        'h-full w-full',
        state === 'collapsed' && 'max-h-[calc(100vh-49px)]',
        state === 'expanded' && 'max-h-[calc(100vh-65px)]',
        className,
      )}
    >
      {children}
    </ScrollArea>
  )
}
