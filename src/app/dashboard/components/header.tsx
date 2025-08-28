import { SidebarTrigger } from '@pedroaba/components/ui/sidebar'

import { AvatarDropdownMenu } from './avatar-dropdown-menu'

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 justify-between border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex items-center gap-2 px-4">
        <AvatarDropdownMenu />
      </div>
    </header>
  )
}
