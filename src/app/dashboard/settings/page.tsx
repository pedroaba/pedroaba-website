import { Button } from '@pedroaba/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@pedroaba/components/ui/dialog'
import { Separator } from '@pedroaba/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@pedroaba/components/ui/tabs'
import { auth } from '@pedroaba/lib/authjs'
import { dayjsApi } from '@pedroaba/lib/dayjs'
import { prisma } from '@pedroaba/lib/prisma'
import {
  Bell,
  CreditCard,
  FileText,
  Shield,
  User,
  Users,
  Webhook,
  XIcon,
} from 'lucide-react'

import { ChangePasswordForm } from './change-password-form'
import { TeamNameForm } from './team-name-form'

export default async function SettingsPage() {
  const session = await auth()
  const userEmail = session?.user?.email

  if (!userEmail) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    include: {
      organization: true,
    },
  })

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 @container h-fit">
      <div className="flex flex-row max-md:flex-col items-center max-md:items-start md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>

      <Tabs
        defaultValue="general"
        orientation="vertical"
        className="w-full flex-row"
      >
        <TabsList className="text-foreground flex-col gap-1 rounded-none bg-transparent px-1 py-0 w-64 h-fit overflow-y-auto">
          <TabsTrigger
            value="general"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <User
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            General
          </TabsTrigger>

          <TabsTrigger
            value="billing"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <CreditCard
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Billing
          </TabsTrigger>

          <TabsTrigger
            value="invoices"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <FileText
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Invoices
          </TabsTrigger>

          <TabsTrigger
            value="members"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <Users
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Members
          </TabsTrigger>

          <TabsTrigger
            value="security"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <Shield
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Security & Privacy
          </TabsTrigger>

          <TabsTrigger
            value="webhooks"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <Webhook
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Webhooks
          </TabsTrigger>

          <TabsTrigger
            value="notifications"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <Bell
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            My Notifications
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 rounded-md border text-start">
          <TabsContent value="general">
            <div className="space-y-0">
              {/* Team Name Section */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Team Name</h3>
                  <p className="text-sm text-muted-foreground">
                    This is your team&apos;s visible name within the
                    application. For example, the name of your company or
                    department.
                  </p>
                </div>
                <div className="max-w-md">
                  <TeamNameForm
                    defaultValue={user.organization?.name}
                    organizationId={user.organization?.id}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Please use 32 characters at maximum.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    type="submit"
                    form="settings-team-name-form"
                  >
                    Save
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Team Avatar Section */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Team Avatar</h3>
                  <p className="text-sm text-muted-foreground">
                    This is your team&apos;s avatar. Click on the avatar to
                    upload a custom one from your files.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-full bg-gradient-to-br from-red-500 to-green-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {user.name?.charAt(0) ||
                        user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Upload Avatar
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Billing Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your billing settings and payment methods.
                  </p>
                </div>
                <div className="text-center py-12">
                  <CreditCard className="size-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No billing information</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set up your billing information to get started.
                  </p>
                  <Button>Add Payment Method</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invoices">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Invoices</h3>
                  <p className="text-sm text-muted-foreground">
                    View and download your invoices.
                  </p>
                </div>
                <div className="text-center py-12">
                  <FileText className="size-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No invoices yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Your invoices will appear here once you start using paid
                    features.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Team Members</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your team members and their permissions.
                  </p>
                </div>
                <div className="text-center py-12">
                  <Users className="size-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No team members</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Invite team members to collaborate on your projects.
                  </p>
                  <Button>Invite Members</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Security & Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your account security and privacy settings.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Last updated:{' '}
                        {user.lastPasswordChange
                          ? dayjsApi(user.lastPasswordChange).fromNow()
                          : 'Never'}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          id="change-password-close-button"
                        >
                          Change Password
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        showCloseButton={false}
                        className="flex flex-col gap-0 p-0 overflow-y-visible sm:max-w-lg [&>button:last-child]:top-3.5 w-screen"
                      >
                        <DialogHeader className="contents space-y-0 text-left">
                          <DialogTitle className="border-b p-4 text-base flex items-start justify-between">
                            <div>
                              Change Password
                              <DialogDescription className="">
                                Change your password to secure your account.
                              </DialogDescription>
                            </div>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                icon={XIcon}
                                size="icon"
                              />
                            </DialogClose>
                          </DialogTitle>
                        </DialogHeader>

                        <ChangePasswordForm />
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div> */}

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">Active Sessions</h3>
                      <p className="text-sm text-muted-foreground">
                        Last access: {dayjsApi(user.lastAccess).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="webhooks">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Webhooks</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure webhooks to receive real-time updates.
                  </p>
                </div>
                <div className="text-center py-12">
                  <Webhook className="size-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No webhooks configured</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set up webhooks to receive notifications about events.
                  </p>
                  <Button>Create Webhook</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">
                    Notification Preferences
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Customize how you receive notifications.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your projects and clients
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
