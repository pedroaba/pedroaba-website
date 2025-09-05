'use client'

import { ScrollArea } from '@pedroaba/components/ui/scroll-area'
import { cn } from '@pedroaba/lib/utils'

type MainContainerProps = {
  children: React.ReactNode
  className?: string
}

export function MainContainer({ children, className }: MainContainerProps) {
  return (
    <ScrollArea
      className={cn(
        'flex-1 w-full p-4 sm:p-6 @container',
        'max-h-[calc(100vh-120px)]', // Ajustado para o novo header
        className,
      )}
    >
      {children}
    </ScrollArea>
  )
}
