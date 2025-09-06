import { auth, signOut } from '@pedroaba/lib/authjs'
import { prisma } from '@pedroaba/lib/prisma'
import { redirect } from 'next/navigation'
import { after } from 'next/server'
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
  const session = await auth()
  const userEmail = session?.user?.email
  if (!userEmail) {
    await signOut()

    return redirect('/auth/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  if (!user) {
    await signOut()

    return redirect('/auth/sign-in')
  }

  let organizationName = 'CLIENTE INDIVIDUAL'
  if (user.organizationId) {
    const organization = await prisma.organization.findUnique({
      where: {
        id: user.organizationId,
      },
    })

    organizationName = organization?.name || 'CLIENTE INDIVIDUAL'
  }

  after(async () => {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastAccess: new Date(),
      },
    })
  })

  return (
    <AuthWrapper>
      <div className="flex flex-col min-h-screen">
        <Header user={{ name: user.name || '', organizationName }} />
        <MainContainer>{children}</MainContainer>
      </div>
    </AuthWrapper>
  )
}
