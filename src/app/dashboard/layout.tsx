import type { ReactNode } from 'react'

import { AuthWrapper } from './components/auth-wrapper'

type DashboardLayoutProps = {
  children: ReactNode | ReactNode[]
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return <AuthWrapper>{children}</AuthWrapper>
}
