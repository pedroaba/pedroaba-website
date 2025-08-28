import '@pedroaba/app/internal-global.css'

import { AppSidebar } from '@pedroaba/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@pedroaba/components/ui/sidebar'
import type { ReactNode } from 'react'

import { AuthWrapper } from './components/auth-wrapper'
import { Header } from './components/header'
import { MainContainer } from './components/main-container'

type DashboardLayoutProps = {
  children: ReactNode | ReactNode[]
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <AuthWrapper>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col flex-1 @container">
            <Header />
            <MainContainer>{children}</MainContainer>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthWrapper>
  )
}
