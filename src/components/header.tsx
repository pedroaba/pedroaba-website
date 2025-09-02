import Link from 'next/link'

import { AnimatedThemeToggler } from './magicui/animated-theme-toggler'

export function HeaderSection() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            PA
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#about"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sobre
            </Link>
            <Link
              href="#skills"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Habilidades
            </Link>
            <Link
              href="#client-projects"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Projetos Clientes
            </Link>
            <Link
              href="#projects"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Projetos Pessoais
            </Link>
            <Link
              href="#professional-experience"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Experiência
            </Link>
            <Link
              href="#contact"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contato
            </Link>
          </nav>

          {/* Theme Toggle */}
          <AnimatedThemeToggler />
        </div>
      </div>
    </header>
  )
}
