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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@pedroaba/components/ui/tabs'
import { dayjsApi } from '@pedroaba/lib/dayjs'
import { EntityState } from '@prisma/client'
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

import { ChangePasswordForm } from '../change-password-form'
import { TeamNameForm } from '../team-name-form'
import { UserHoverCard } from './user-hover-card'

interface DesktopSettingsTabsProps {
  user: {
    id: string
    name: string | null
    email: string
    createdAt: Date
    lastPasswordChange: Date | null
    updatedAt: Date
    organization: {
      id: string
      name: string | null
      users: Array<{
        id: string
        name: string | null
        email: string
        state: EntityState
        lastAccess: Date
        createdAt: Date
      }>
    } | null
  }
}

export async function DesktopSettingsTabs({ user }: DesktopSettingsTabsProps) {
  return (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="hidden md:flex w-full flex-row"
    >
      <TabsList className="text-foreground flex-col gap-1 rounded-none bg-transparent px-1 py-0 w-64 h-fit overflow-y-auto">
        <TabsTrigger
          value="general"
          className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start data-[state=active]:bg-transparent data-[state=active]:shadow-none after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5"
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
          className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start data-[state=active]:bg-transparent data-[state=active]:shadow-none after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5"
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
          className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start data-[state=active]:bg-transparent data-[state=active]:shadow-none after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5"
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
          className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start data-[state=active]:bg-transparent data-[state=active]:shadow-none after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5"
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
          className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start data-[state=active]:bg-transparent data-[state=active]:shadow-none after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5"
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
          className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start data-[state=active]:bg-transparent data-[state=active]:shadow-none after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5"
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
          className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start data-[state=active]:bg-transparent data-[state=active]:shadow-none after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5"
        >
          <Bell
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          My Notifications
        </TabsTrigger>
      </TabsList>

      <div className="flex-1 rounded-md border text-start h-fit flex flex-col">
        <TabsContent value="general" className="h-fit flex flex-col">
          <div className="p-6 h-fit flex flex-col">
            <div className="space-y-8">
              {/* Team Name Section */}
              <div className="space-y-4">
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
                    defaultValue={user.organization?.name ?? ''}
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
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="h-fit flex flex-col">
          <div className="p-6 h-fit flex flex-col">
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

        <TabsContent value="invoices" className="h-fit flex flex-col">
          <div className="p-6 h-fit flex flex-col">
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

        <TabsContent value="members" className="h-fit flex flex-col">
          <div className="p-6 h-fit flex flex-col">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Team Members</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your team members and their permissions.
                </p>
              </div>
              {user.organization?.users.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="size-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No team members</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Invite team members to collaborate on your projects.
                  </p>
                </div>
              ) : (
                <div>
                  {user.organization?.users.map((teamUser) => (
                    <UserHoverCard
                      key={teamUser.id}
                      user={{
                        ...teamUser,
                        isActive: teamUser.state === EntityState.ACTIVE,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="h-fit flex flex-col">
          <div className="p-6 h-fit flex flex-col">
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
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      showCloseButton={false}
                      className="flex flex-col gap-0 p-0 overflow-y-visible sm:max-w-lg [&>button:last-child]:top-3.5 w-screen"
                    >
                      <DialogHeader className="contents space-y-0 text-left">
                        <DialogTitle className="border-b px-6 pr-4 py-4 text-base flex items-start justify-between">
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

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium">Last Updated</h3>
                    <p className="text-sm text-muted-foreground">
                      Last updated:{' '}
                      {user.updatedAt
                        ? dayjsApi(user.updatedAt).fromNow()
                        : 'Never'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="h-fit flex flex-col">
          <div className="p-6 h-fit flex flex-col">
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

        <TabsContent value="notifications" className="h-fit flex flex-col">
          <div className="p-6 h-fit flex flex-col">
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
  )
}
