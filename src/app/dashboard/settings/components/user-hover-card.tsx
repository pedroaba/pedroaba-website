import { CopyButton } from '@pedroaba/components/copy-button'
import { Badge } from '@pedroaba/components/ui/badge'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@pedroaba/components/ui/hover-card'
import { dayjsApi } from '@pedroaba/lib/dayjs'
import { CheckCircle, Mail, User } from 'lucide-react'

interface UserHoverCardProps {
  user: {
    id: string
    name: string | null
    email: string
    createdAt: Date
    lastAccess: Date
    isActive: boolean
  }
}

export function UserHoverCard({ user }: UserHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-start justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 hover:scale-[1.01] transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">{user.name}</h4>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Badge
              variant={user.isActive ? 'success' : 'secondary'}
              className="py-1"
            >
              {user.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 p-0 overflow-hidden">
        <div className="relative">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 pb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center ring-4 ring-background shadow-lg">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {user.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">Team Member</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 justify-between bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3 w-full @container">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-sm font-medium truncate max-w-full">
                      {user.email}
                    </p>
                  </div>
                </div>
                <CopyButton textToCopy={user.email} />
              </div>

              {/* Activity */}
              <div className="space-y-3">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Joined the team</p>
                      <p className="text-xs text-muted-foreground">
                        {dayjsApi(user.createdAt).format('MMMM DD, YYYY')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Last active</p>
                      <p className="text-xs text-muted-foreground">
                        {dayjsApi(user.lastAccess).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">
                    Active Member
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={user.isActive ? 'success' : 'secondary'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
