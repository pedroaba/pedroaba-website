'use client'

import { AppProgressProvider as ProgressProvider } from '@bprogress/next'
import { Toaster } from '@pedroaba/components/ui/sonner'
import { TooltipProvider } from '@pedroaba/components/ui/tooltip'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ProgressProvider
        height="4px"
        color="var(--primary)"
        options={{ showSpinner: false }}
        shallowRouting
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </ProgressProvider>
    </ThemeProvider>
  )
}
