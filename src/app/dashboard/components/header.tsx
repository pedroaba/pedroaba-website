'use client'

import { Badge } from '@pedroaba/components/ui/badge'
import { ScrollArea, ScrollBar } from '@pedroaba/components/ui/scroll-area'
import { Code2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AvatarDropdownMenu } from './avatar-dropdown-menu'

type HeaderProps = {
  user: {
    name: string
    organizationName?: string
  }
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname()

  return (
    <header className="border-b bg-background">
      {/* Top Bar */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard"
              className="flex items-center justify-center"
            >
              <Code2 className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
            </Link>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
              {user.name || 'User'}
            </span>
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground hidden sm:inline-flex uppercase"
            >
              {user.organizationName || 'CLIENTE INDIVIDUAL'}
            </Badge>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/changelogs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Changelog
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Help
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
          </div>
          <AvatarDropdownMenu />
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="border-b-0">
        <ScrollArea>
          <div className="w-full">
            <div className="text-foreground h-auto gap-1 sm:gap-2 rounded-none border-b bg-transparent px-3 sm:px-6 py-1 flex overflow-x-auto">
              <Link
                href="/dashboard"
                className={`hover:bg-accent hover:text-foreground relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  pathname === '/dashboard'
                    ? 'after:bg-primary text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Overview
              </Link>
              <Link
                href="/dashboard/clients"
                className={`hover:bg-accent hover:text-foreground relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  pathname === '/dashboard/clients'
                    ? 'after:bg-primary text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Clients
              </Link>
              <Link
                href="/dashboard/projects"
                className={`hover:bg-accent hover:text-foreground relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  pathname === '/dashboard/projects'
                    ? 'after:bg-primary text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Projects
              </Link>
              <Link
                href="/dashboard/settings"
                className={`hover:bg-accent hover:text-foreground relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  pathname === '/dashboard/settings'
                    ? 'after:bg-primary text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Settings
              </Link>
            </div>
            <ScrollBar orientation="horizontal" />
          </div>
        </ScrollArea>
      </div>
    </header>
  )
}
