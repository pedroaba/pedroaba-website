import { NavButton } from '@pedroaba/components/nav-button'
import { ScrollToTop } from '@pedroaba/components/scroll-to-top'
import { Button } from '@pedroaba/components/ui/button'
import { Separator } from '@pedroaba/components/ui/separator'
import { profile, site } from '@pedroaba/config/portfolio.config'
import { Github, Heart, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export function FooterSection() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <ScrollToTop className="">PA</ScrollToTop>
              <p className="text-sm text-muted-foreground max-w-xs">
                {profile.name} - Frontend Engineer crafting delightful web
                experiences with modern technologies.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <nav className="flex flex-col space-y-2">
                {[
                  { name: 'About', href: '#about' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Experience', href: '#experience' },
                  { name: 'Contact', href: '#contact' },
                ].map((link) => (
                  <NavButton key={link.name} href={link.href} className="">
                    {link.name}
                  </NavButton>
                ))}
              </nav>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h4 className="font-semibold">Connect</h4>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:text-blue-600 dark:hover:text-blue-400"
                  asChild
                >
                  <Link
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:text-gray-900 dark:hover:text-gray-100"
                  asChild
                >
                  <Link
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:text-green-600 dark:hover:text-green-400"
                  asChild
                >
                  <Link href={`mailto:${profile.email}`} aria-label="Email">
                    <Mail className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Available for freelance projects and full-time opportunities.
              </p>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-1 text-sm text-muted-foreground">
              <span>
                © {currentYear} {profile.name}. Made with
              </span>
              <Heart className="size-3 text-red-500 fill-current" />
              <span>using Next.js, shadcn/ui, and Framer Motion.</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a
                href={site.url}
                className="hover:text-foreground transition-colors"
              >
                pedroaba.dev
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
