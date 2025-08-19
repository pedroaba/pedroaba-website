'use client'

import { AnimatedThemeToggler } from '@pedroaba/components/magicui/animated-theme-toggler'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@pedroaba/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@pedroaba/components/ui/dropdown-menu'
import { formatUsername } from '@pedroaba/utils/format-username'
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

export function AvatarDropdownMenu() {
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-9">
          <AvatarImage src={session?.user?.image ?? ''} />
          <AvatarFallback>
            {formatUsername(session?.user?.name ?? 'Unknown User')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={session?.user?.image ?? ''} />
              <AvatarFallback className="rounded-lg">
                {formatUsername(session?.user?.name ?? 'Unknown User')}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {session?.user?.name ?? 'Unknown User'}
              </span>
              <span className="truncate text-xs">
                {session?.user?.email ?? 'Unknown User Email'}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <AnimatedThemeToggler asDropdownMenuItem />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ redirectTo: '/auth/sign-in' })}
          className="text-destructive"
        >
          <LogOut className="text-destructive" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
