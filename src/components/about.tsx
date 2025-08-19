import TechFocusBadge from '@pedroaba/components/tech-focus-badge'
import { Badge } from '@pedroaba/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@pedroaba/components/ui/card'
import { Separator } from '@pedroaba/components/ui/separator'
import { profile } from '@pedroaba/config/portfolio.config'
import { Briefcase, GraduationCap, MapPin } from 'lucide-react'

import { NumberTicker } from './magicui/number-ticker'

const driverMeForward = [
  {
    title: 'Building for scale',
    description:
      'Creating maintainable, scalable applications that grow with your business',
  },
  {
    title: 'Innovation through learning',
    description: 'Exploring cutting-edge technologies and development patterns',
  },
  {
    title: 'Open source contribution',
    description:
      'Sharing knowledge and contributing to the developer community',
  },
  {
    title: 'User-first approach',
    description:
      'Bridging the gap between design and development for exceptional UX',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transforming ideas into exceptional digital experiences through
              clean code, innovative solutions, and user-centric design.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    My Story
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      I&apos;m a passionate Frontend Engineer with over 4 years
                      of experience crafting digital solutions that users love.
                      Currently working at SIBIS as a Mid-level Frontend
                      Developer while pursuing my Software Engineering degree at
                      INATEL.
                    </p>

                    <p className="text-muted-foreground leading-relaxed mt-4">
                      My journey in tech started with a curiosity for building
                      things that matter. Today, I specialize in React, Next.js,
                      and TypeScript, creating performant and accessible web
                      applications. I&apos;m constantly exploring new
                      technologies, currently diving deep into Rust for
                      high-performance desktop applications.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-4 text-lg">
                      What drives me forward
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      {driverMeForward.map((item) => (
                        <li className="flex items-start gap-3" key={item.title}>
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                          <span>
                            <strong className="text-foreground">
                              {item.title}:
                            </strong>{' '}
                            {item.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-4 text-lg">
                      My approach to development
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-foreground">
                          🎯 Problem Solving
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          Understanding requirements deeply before writing a
                          single line of code
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-foreground">
                          ⚡ Performance
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          Optimizing for speed, accessibility, and user
                          experience
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-foreground">
                          🔧 Clean Code
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          Writing maintainable, readable, and well-documented
                          code
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-foreground">
                          🚀 Continuous Growth
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          Staying updated with latest technologies and best
                          practices
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Current Status */}
              <Card className="gap-2">
                <CardHeader className="">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Briefcase className="size-4 text-primary" />
                    Current Role
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-lg">{profile.role}</p>
                      <p className="text-sm text-muted-foreground">
                        SIBIS • Full-time
                      </p>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      Mid-level Frontend Developer
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Building modern web applications with React, Next.js, and
                      TypeScript
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="gap-2">
                <CardHeader className="">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <GraduationCap className="size-4 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-lg">
                        Software Engineering
                      </p>
                      <p className="text-sm text-muted-foreground">
                        INATEL • 2021 - Present
                      </p>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      Currently Studying
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Focus on web technologies, system design, and software
                      architecture
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Tech Focus */}
              <Card className="gap-2">
                <CardHeader className="">
                  <CardTitle className="text-lg">Tech Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-sm text-foreground mb-2">
                        Primary Stack
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        <TechFocusBadge
                          name="React"
                          category="primary"
                          description="Popular JavaScript library for building user interfaces with component-based architecture and virtual DOM."
                          experience="4+ years"
                          docs="https://react.dev/"
                        />
                        <TechFocusBadge
                          name="Next.js"
                          category="primary"
                          description="React framework with server-side rendering, static generation, and full-stack capabilities for production apps."
                          experience="3+ years"
                          docs="https://nextjs.org/docs"
                        />
                        <TechFocusBadge
                          name="TypeScript"
                          category="primary"
                          description="JavaScript with static type definitions. Enhances code reliability and developer experience in large applications."
                          experience="3+ years"
                          docs="https://www.typescriptlang.org/docs/"
                        />
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm text-foreground mb-2">
                        Exploring
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        <TechFocusBadge
                          name="Rust"
                          category="exploring"
                          description="Systems programming language focused on safety, speed, and concurrency without garbage collection."
                          experience="6 months"
                          docs="https://doc.rust-lang.org/"
                        />
                        <TechFocusBadge
                          name="Tauri"
                          category="exploring"
                          description="Framework for building lightweight, secure desktop applications with web frontend and Rust backend."
                          experience="3 months"
                          docs="https://tauri.app/v1/guides/"
                        />
                        <TechFocusBadge
                          name="WinUI3"
                          category="exploring"
                          description="Modern native UI platform for Windows apps with Fluent Design System and XAML-based development."
                          experience="3 months"
                          docs="https://docs.microsoft.com/en-us/windows/apps/winui/"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="gap-2">
                <CardHeader className="">
                  <CardTitle className="text-lg">Quick Facts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        <NumberTicker value={4} delay={2} />+
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Years Experience
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        <NumberTicker value={28} delay={2} />+
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Technologies
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        <NumberTicker value={15} delay={2} />+
                      </p>
                      <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">∞</p>
                      <p className="text-xs text-muted-foreground">Learning</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
