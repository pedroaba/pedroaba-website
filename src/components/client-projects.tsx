import { Badge } from '@pedroaba/components/ui/badge'
import { Button } from '@pedroaba/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pedroaba/components/ui/card'
import { clientProjects } from '@pedroaba/config/projects'
import { Calendar, Code, ExternalLink, Globe } from 'lucide-react'

export function ClientProjectsSection() {
  return (
    <section id="client-projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Projetos para Clientes Reais
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Sistemas e aplicações desenvolvidos para empresas e organizações,
              focados em resolver problemas reais e entregar valor tangível.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Globe className="size-4" />
              Soluções em Produção
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-4">
            {clientProjects.map((project) => (
              <Card
                key={project.name}
                className="group gap-2 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30"
              >
                <CardHeader className="pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 h-10 w-10 p-0 opacity-70 hover:opacity-100 hover:bg-primary/10"
                      asChild
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visitar ${project.name}`}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2">
                  {/* Project Preview iframe */}
                  <div className="relative group/preview mb-4">
                    <div className="h-80 relative bg-muted rounded-lg overflow-hidden border border-border/50">
                      {project.image}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Technologies Stack */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Code className="size-4" />
                      <span>Stack Tecnológico</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs px-3 py-1 font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 w-full hover:bg-primary/10"
                    >
                      <Button className="flex-1" asChild>
                        <Globe className="size-4" />
                        Visitar Projeto
                        <ExternalLink className="size-4" />
                      </Button>
                    </a>

                    <a
                      href={`mailto:pedr.augustobarbosa.aparecido@gmail.com?subject=Projeto ${project.name}&body=Olá! Gostaria de saber mais sobre o projeto ${project.name} que você desenvolveu.`}
                      className="inline-flex items-center gap-2 w-full"
                    >
                      <Button variant="outline" className="flex-1" asChild>
                        <Calendar className="size-4" />
                        Solicitar Orçamento
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">
                Transforme sua ideia em realidade
              </h3>
              <p className="text-muted-foreground mb-6">
                Cada projeto é desenvolvido com foco em qualidade, performance e
                experiência do usuário. Vamos trabalhar juntos para criar
                soluções que impulsionem seu negócio.
              </p>
              <a
                href="mailto:pedr.augustobarbosa.aparecido@gmail.com?subject=Novo Projeto&body=Olá! Gostaria de discutir um novo projeto com você."
                className="inline-flex items-center gap-2"
              >
                <Button size="lg" className="group" asChild>
                  Iniciar Conversa
                  <ExternalLink className="size-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
