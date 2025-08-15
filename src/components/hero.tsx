import { AnimationDiv } from '@pedroaba/components/motion/div'
import { ScrollToButton } from '@pedroaba/components/scroll-to-button'
import { Badge } from '@pedroaba/components/ui/badge'
import { Button } from '@pedroaba/components/ui/button'
import { profile } from '@pedroaba/config/portfolio.config'
import { fadeInUp, staggerChildren } from '@pedroaba/lib/animations'
import {
  ArrowRight,
  Building,
  Download,
  GraduationCap,
  MapPin,
} from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimationDiv
          initial="hidden"
          animate="show"
          variants={staggerChildren(0.1)}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main Headline */}
          <AnimationDiv variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Crafting <span className="text-primary">exceptional</span> digital
              experiences
            </h1>
          </AnimationDiv>

          {/* Subtitle */}
          <AnimationDiv variants={fadeInUp}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Frontend Engineer passionate about building performant,
              accessible, and delightful web applications
            </p>
          </AnimationDiv>

          {/* Current Status */}
          <AnimationDiv variants={fadeInUp}>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-6">
              <Badge variant="secondary" className="text-sm">
                <MapPin className="size-3 mr-0.5" />
                {profile.location}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Building className="size-3 mr-0.5" />
                {profile.role}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <GraduationCap className="size-3 mr-0.5" />
                Software Engineering Student
              </Badge>
            </div>
          </AnimationDiv>

          {/* Tech Stack Preview */}
          <AnimationDiv variants={fadeInUp}>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Specialized in <strong>React</strong>, <strong>Next.js</strong>,
              and <strong>TypeScript</strong>. Exploring <strong>Rust</strong>{' '}
              for high-performance applications. Building the future, one
              component at a time.
            </p>
          </AnimationDiv>

          {/* CTA Buttons */}
          <AnimationDiv variants={fadeInUp}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <ScrollToButton targetId="projects" className="text-base w-fit">
                Explore My Work
                <ArrowRight className="size-4 ml-2" />
              </ScrollToButton>

              <Button
                variant="outline"
                className="text-base px-8"
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

          {/* Quick Stats */}
          <AnimationDiv variants={fadeInUp}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">28+</div>
                <div className="text-sm text-muted-foreground">
                  Technologies
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Built
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">Learning</div>
              </div>
            </div>
          </AnimationDiv>
        </AnimationDiv>
      </div>
    </section>
  )
}
