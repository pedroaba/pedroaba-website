import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@pedroaba/components/ui/accordion'
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

interface MobileSettingsAccordionProps {
  user: {
    id: string
    name: string | null
    email: string
    lastPasswordChange: Date | null
    lastAccess: Date
    createdAt: Date
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

export async function MobileSettingsAccordion({
  user,
}: MobileSettingsAccordionProps) {
  return (
    <div className="md:hidden">
      <Accordion type="single" collapsible className="w-full rounded-md border">
        <AccordionItem value="general">
          <AccordionTrigger className="flex items-center gap-3 px-4 py-3">
            <User className="size-4 opacity-60" />
            <span>General</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6">
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="billing">
          <AccordionTrigger className="flex items-center gap-3 px-4 py-3">
            <CreditCard className="size-4 opacity-60" />
            <span>Billing</span>
          </AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="invoices">
          <AccordionTrigger className="flex items-center gap-3 px-4 py-3">
            <FileText className="size-4 opacity-60" />
            <span>Invoices</span>
          </AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="members">
          <AccordionTrigger className="flex items-center gap-3 px-4 py-3">
            <Users className="size-4 opacity-60" />
            <span>Members</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6">
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security">
          <AccordionTrigger className="flex items-center gap-3 px-4 py-3">
            <Shield className="size-4 opacity-60" />
            <span>Security & Privacy</span>
          </AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="webhooks">
          <AccordionTrigger className="flex items-center gap-3 px-4 py-3">
            <Webhook className="size-4 opacity-60" />
            <span>Webhooks</span>
          </AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notifications">
          <AccordionTrigger className="flex items-center gap-3 px-4 py-3">
            <Bell className="size-4 opacity-60" />
            <span>My Notifications</span>
          </AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
