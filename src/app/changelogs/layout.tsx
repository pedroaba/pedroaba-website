import { AnimatedThemeToggler } from '@pedroaba/components/magicui/animated-theme-toggler'
import { Button } from '@pedroaba/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@pedroaba/components/ui/sheet'
import {
  BookIcon,
  Code2,
  HomeIcon,
  LayoutDashboardIcon,
  MenuIcon,
} from 'lucide-react'
import Link from 'next/link'

type ChangelogLayoutProps = {
  children: React.ReactNode
}

export default async function ChangelogLayout({
  children,
}: ChangelogLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-primary">
              <Button variant="ghost" size="icon">
                <Code2 className="size-4" />
              </Button>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/changelogs"
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Changelogs
              </Link>
            </nav>

            {/* Right side - Mobile menu + Theme toggle */}
            <div className="flex items-center gap-2">
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <MenuIcon className="size-4" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] p-0">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="px-4 py-3 border-b">
                      <SheetTitle className="text-sm font-medium text-muted-foreground">
                        Menu
                      </SheetTitle>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-2 py-2">
                      <div className="space-y-1">
                        <Link
                          href="/"
                          className="flex items-center px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-colors"
                        >
                          <HomeIcon className="size-4" />
                          <span className="ml-2">Home</span>
                        </Link>
                        <Link
                          href="/dashboard"
                          className="flex items-center px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-colors"
                        >
                          <LayoutDashboardIcon className="size-4" />
                          <span className="ml-2">Dashboard</span>
                        </Link>
                        <Link
                          href="/changelogs"
                          className="flex items-center px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-sm transition-colors"
                        >
                          <BookIcon className="size-4" />
                          <span className="ml-2">Changelogs</span>
                        </Link>
                      </div>
                    </nav>

                    {/* Footer */}
                    <div className="px-4 py-3 border-t">
                      <AnimatedThemeToggler text="Toggle Theme" />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Theme Toggle */}
              <AnimatedThemeToggler className="hidden md:flex" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">{children}</div>
    </div>
  )
}
