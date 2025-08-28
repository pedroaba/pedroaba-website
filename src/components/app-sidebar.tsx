'use client'

import { NavUser } from '@pedroaba/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@pedroaba/components/ui/sidebar'
import { Code2, Home, PanelsTopLeft, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Code2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">pedroaba tech</span>
                  <span className="truncate text-xs">Software Development</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="dashboard">
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === '/dashboard' &&
                    pathname.startsWith('/dashboard')
                  }
                >
                  <Link href="/dashboard">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="-my-2" />

        <SidebarGroup>
          <SidebarGroupContent className="space-y-2">
            <SidebarMenu>
              <SidebarMenuItem key="projects">
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === '/dashboard/projects' &&
                    pathname.startsWith('/dashboard/projects')
                  }
                >
                  <Link href="/dashboard/projects">
                    <PanelsTopLeft />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem key="projects">
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === '/dashboard/clients' &&
                    pathname.startsWith('/dashboard/clients')
                  }
                >
                  <Link href="/dashboard/clients">
                    <Users />
                    <span>Clients</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
