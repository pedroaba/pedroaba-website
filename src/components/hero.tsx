import { AnimationDiv } from '@pedroaba/components/motion/div'
import { ScrollToButton } from '@pedroaba/components/scroll-to-button'
import { Badge } from '@pedroaba/components/ui/badge'
import { Button } from '@pedroaba/components/ui/button'
import { profile } from '@pedroaba/config/portfolio.config'
import { fadeInUp, staggerChildren } from '@pedroaba/lib/animations'
import { cn } from '@pedroaba/lib/utils'
import {
  ArrowRight,
  Building,
  Download,
  GraduationCap,
  MapPin,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'

import { AnimatedGridPattern } from './magicui/animated-grid-pattern'
import { ScrollIndicator } from './scroll-indicator'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      {/* Animated Grid Pattern Background */}
      <AnimatedGridPattern
        width={60}
        height={60}
        numSquares={30}
        maxOpacity={0.1}
        duration={6}
        className="opacity-40"
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Additional subtle grid overlay for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-secondary/60 rounded-full animate-bounce delay-300" />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-700" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimationDiv
          initial="hidden"
          animate="show"
          variants={staggerChildren(0.15)}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge with sparkle effect */}
          <AnimationDiv variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="size-4 animate-pulse" />
              Available for new opportunities
            </div>
          </AnimationDiv>

          {/* Enhanced Main Headline with gradient text */}
          <AnimationDiv variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Crafting
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse">
                exceptional
              </span>
              <br />
              <span className="bg-gradient-to-r from-foreground via-foreground to-secondary bg-clip-text text-transparent">
                experiences
              </span>
            </h1>
          </AnimationDiv>

          {/* Enhanced Subtitle with better typography */}
          <AnimationDiv variants={fadeInUp}>
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Frontend Engineer passionate about building{' '}
              <span className="text-foreground font-semibold">performant</span>,{' '}
              <span className="text-foreground font-semibold">accessible</span>,
              and{' '}
              <span className="text-foreground font-semibold">delightful</span>{' '}
              web applications
            </p>
          </AnimationDiv>

          {/* Enhanced Current Status with better spacing */}
          <AnimationDiv variants={fadeInUp}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <MapPin className="size-3 mr-1" />
                {profile.location}
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <Building className="size-3 mr-1" />
                {profile.role}
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <GraduationCap className="size-3 mr-1" />
                Software Engineering Student
              </Badge>
            </div>
          </AnimationDiv>

          {/* Enhanced Tech Stack Preview */}
          <AnimationDiv variants={fadeInUp}>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Specialized in{' '}
              <span className="text-primary font-semibold">React</span>,{' '}
              <span className="text-primary font-semibold">Next.js</span>, and{' '}
              <span className="text-primary font-semibold">TypeScript</span>.
              Exploring{' '}
              <span className="text-secondary font-semibold">Rust</span> for
              high-performance applications. Building the future, one component
              at a time.
            </p>
          </AnimationDiv>

          {/* Enhanced CTA Buttons with better styling */}
          <AnimationDiv variants={fadeInUp}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <ScrollToButton
                targetId="projects"
                className={cn(
                  'text-lg px-8 py-4 bg-gradient-to-r from-primary to-primary/80',
                  'hover:from-primary/90 hover:to-primary/70',
                  'transform hover:scale-105 transition-all duration-300',
                  'shadow-lg hover:shadow-xl',
                )}
              >
                Explore My Work
                <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </ScrollToButton>

              <Button
                variant="outline"
                className={cn(
                  'text-lg px-8 py-4 border-2',
                  'hover:bg-primary hover:text-primary-foreground',
                  'transform hover:scale-105 transition-all duration-300',
                  'shadow-lg hover:shadow-xl',
                )}
                asChild
                icon={Download}
                iconPosition="right"
              >
                <Link href="/pedro-augusto-cv.pdf" target="_blank">
                  Download Resume
                </Link>
              </Button>
            </div>
          </AnimationDiv>

          {/* Enhanced Quick Stats with better visual hierarchy */}
          <AnimationDiv variants={fadeInUp}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                  4+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Years Experience
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                  28+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Technologies
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                  15+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Projects Built
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                  ∞
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Learning
                </div>
              </div>
            </div>
          </AnimationDiv>
        </AnimationDiv>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  )
}
