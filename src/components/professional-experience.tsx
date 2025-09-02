import { AnimationDiv } from '@pedroaba/components/motion/div'
import { Badge } from '@pedroaba/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pedroaba/components/ui/card'
import { professionalExperience } from '@pedroaba/config/portfolio.config'
import { fadeInUp, staggerChildren } from '@pedroaba/lib/animations'
import { cn } from '@pedroaba/lib/utils'
import { Briefcase, ExternalLink, MapPin } from 'lucide-react'

import { Button } from './ui/button'

export function ProfessionalExperienceSection() {
  return (
    <section id="professional-experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimationDiv
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerChildren(0.1)}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <AnimationDiv className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Briefcase className="size-4" />
              Carreira Profissional
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experiência Profissional
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Minha jornada profissional em desenvolvimento de software,
              construindo soluções para empresas e organizações.
            </p>
          </AnimationDiv>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:transform md:-translate-x-px" />

            <div className="space-y-12">
              {professionalExperience.map((item, index) => (
                <AnimationDiv
                  key={item.title}
                  variants={fadeInUp}
                  className={cn(
                    'relative flex items-center',
                    index % 2 === 0 && 'md:flex-row',
                    index % 2 !== 0 && 'md:flex-row-reverse',
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full border-2 border-background md:transform md:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div
                    className={cn(
                      'w-full md:w-1/2 ml-12 md:ml-0',
                      index % 2 === 0 && 'md:pr-12',
                      index % 2 !== 0 && 'md:pl-12',
                    )}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300 group">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {item.title}
                          </CardTitle>
                          <Badge variant="secondary" className="w-fit mt-1">
                            {item.period}
                          </Badge>
                        </div>

                        <CardDescription className="flex items-center gap-2 text-base">
                          <MapPin className="h-4 w-4" />
                          {item.company}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>

                        {item.highlights && item.highlights.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2 text-foreground">
                              Principais Conquistas:
                            </h4>
                            <ul className="space-y-1">
                              {item.highlights.map((highlight, idx) => (
                                <li
                                  key={`${item.title}-highlight-${idx}`}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </AnimationDiv>
              ))}
            </div>
          </div>
        </AnimationDiv>

        {/* Call to Action */}
        <AnimationDiv variants={fadeInUp} className="text-center mt-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Quer trabalhar junto?</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Estou sempre interessado em discutir novas oportunidades e
              projetos emocionantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <a href="mailto:pedr.augustobarbosa.aparecido@gmail.com">
                  Entre em Contato
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                icon={ExternalLink}
                iconPosition="right"
              >
                <a
                  href="https://www.linkedin.com/in/pedroaba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Ver LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </AnimationDiv>
      </div>
    </section>
  )
}
