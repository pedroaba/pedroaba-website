'use client'

import { AppProgressProvider as ProgressProvider } from '@bprogress/next'
import { Toaster } from '@pedroaba/components/ui/sonner'
import { TooltipProvider } from '@pedroaba/components/ui/tooltip'
import { TanstackQueryClient } from '@pedroaba/lib/tanstack-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <TanstackQueryClient>
          <ProgressProvider
            height="4px"
            color="var(--primary)"
            options={{ showSpinner: false }}
            shallowRouting
          >
            <TooltipProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
            </TooltipProvider>
            <Toaster />
          </ProgressProvider>
        </TanstackQueryClient>
      </SessionProvider>
    </ThemeProvider>
  )
}
