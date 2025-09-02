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
    title: 'Construindo para escala',
    description:
      'Criando aplicações sustentáveis e escaláveis que crescem com seu negócio',
  },
  {
    title: 'Inovação através do aprendizado',
    description: 'Explorando tecnologias de ponta e padrões de desenvolvimento',
  },
  {
    title: 'Contribuição open source',
    description:
      'Compartilhando conhecimento e contribuindo para a comunidade de desenvolvedores',
  },
  {
    title: 'Abordagem centrada no usuário',
    description:
      'Conectando design e desenvolvimento para uma experiência excepcional',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Mim</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transformando ideias em experiências digitais excepcionais através
              de código limpo, soluções inovadoras e design centrado no usuário.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    Minha História
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      Sou um Engenheiro Frontend apaixonado com mais de 4 anos
                      de experiência criando soluções digitais que os usuários
                      adoram. Atualmente trabalho na SIBIS como Desenvolvedor
                      Frontend Pleno enquanto curso Engenharia de Software no
                      INATEL.
                    </p>

                    <p className="text-muted-foreground leading-relaxed mt-4">
                      Minha jornada na tecnologia começou com a curiosidade de
                      construir coisas que importam. Hoje, me especializo em
                      React, Next.js e TypeScript, criando aplicações web
                      performáticas e acessíveis. Estou constantemente
                      explorando novas tecnologias, atualmente mergulhando
                      profundamente em Rust para aplicações desktop de alta
                      performance.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-4 text-lg">
                      O que me move para frente
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
                      Minha abordagem ao desenvolvimento
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-foreground">
                          🎯 Resolução de Problemas
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          Compreendendo profundamente os requisitos antes de
                          escrever uma única linha de código
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-foreground">
                          ⚡ Performance
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          Otimizando velocidade, acessibilidade e experiência do
                          usuário
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-foreground">
                          🔧 Clean Code
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          Escrevendo código sustentável, legível e bem
                          documentado
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-foreground">
                          🚀 Crescimento Contínuo
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          Mantendo-me atualizado com as mais recentes
                          tecnologias e melhores práticas
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
                    Cargo Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-lg">{profile.role}</p>
                      <p className="text-sm text-muted-foreground">
                        SIBIS • Tempo integral
                      </p>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      Desenvolvedor Frontend Pleno
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Criando aplicativos web modernos com React, Next.js, e
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
                    Educação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-lg">
                        Engenharia de Software
                      </p>
                      <p className="text-sm text-muted-foreground">
                        INATEL • 2021 - Presente
                      </p>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      Estudando
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Focado em tecnologias web, design de sistemas e
                      arquitetura de software
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Tech Focus */}
              <Card className="gap-2">
                <CardHeader className="">
                  <CardTitle className="text-lg">Foco Tecnológico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-sm text-foreground mb-2">
                        Stack Principal
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        <TechFocusBadge
                          name="React"
                          category="primary"
                          description="Biblioteca JavaScript popular para construir interfaces de usuário com arquitetura baseada em componentes e DOM virtual."
                          experience="4+ anos"
                          docs="https://react.dev/"
                        />
                        <TechFocusBadge
                          name="Next.js"
                          category="primary"
                          description="Framework React com renderização no servidor, geração estática e capacidades full-stack para aplicações de produção."
                          experience="3+ anos"
                          docs="https://nextjs.org/docs"
                        />
                        <TechFocusBadge
                          name="TypeScript"
                          category="primary"
                          description="JavaScript com definições de tipos estáticos. Melhora a confiabilidade do código e experiência do desenvolvedor em aplicações grandes."
                          experience="3+ anos"
                          docs="https://www.typescriptlang.org/docs/"
                        />
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm text-foreground mb-2">
                        Explorando
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        <TechFocusBadge
                          name="Rust"
                          category="exploring"
                          description="Linguagem de programação de sistemas focada em segurança, velocidade e concorrência sem coleta de lixo."
                          experience="6 meses"
                          docs="https://doc.rust-lang.org/"
                        />
                        <TechFocusBadge
                          name="Tauri"
                          category="exploring"
                          description="Framework para construir aplicações desktop leves e seguras com frontend web e backend Rust."
                          experience="3 meses"
                          docs="https://tauri.app/v1/guides/"
                        />
                        <TechFocusBadge
                          name="WinUI3"
                          category="exploring"
                          description="Plataforma de UI nativa moderna para aplicações Windows com Fluent Design System e desenvolvimento baseado em XAML."
                          experience="3 meses"
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
                  <CardTitle className="text-lg">Fatos Rápidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        <NumberTicker value={4} delay={2} />+
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Anos de Experiência
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        <NumberTicker value={28} delay={2} />+
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tecnologias
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        <NumberTicker value={15} delay={2} />+
                      </p>
                      <p className="text-xs text-muted-foreground">Projetos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">∞</p>
                      <p className="text-xs text-muted-foreground">
                        Aprendizagem
                      </p>
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
