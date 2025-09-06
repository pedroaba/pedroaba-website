import { auth } from '@pedroaba/lib/authjs'
import { prisma } from '@pedroaba/lib/prisma'

import { DesktopSettingsTabs } from './components/desktop-settings-tabs'
import { MobileSettingsAccordion } from './components/mobile-settings-accordion'

export default async function SettingsPage() {
  const session = await auth()
  const userEmail = session?.user?.email

  if (!userEmail) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      lastPasswordChange: true,
      lastAccess: true,
      updatedAt: true,
      organization: {
        select: {
          name: true,
          id: true,
          users: {
            omit: {
              password: true,
            },
          },
        },
      },
    },
  })

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col gap-6 @container h-fit">
      <div className="flex flex-row max-md:flex-col items-center max-md:items-start md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <MobileSettingsAccordion user={user} />
      <DesktopSettingsTabs user={user} />
    </div>
  )
}
