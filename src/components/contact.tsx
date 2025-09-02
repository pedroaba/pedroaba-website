import { AnimationDiv } from '@pedroaba/components/motion/div'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pedroaba/components/ui/card'
import { socialLinks } from '@pedroaba/config/social'
import { fadeInUp, staggerChildren } from '@pedroaba/lib/animations'
import { cn } from '@pedroaba/lib/utils'

import { ContactSectionForm } from './contact-section-form'

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vamos Construir Algo Incrível
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pronto para dar vida às suas ideias? Seja um novo projeto, uma
              oportunidade de colaboração ou apenas um bate-papo amigável sobre
              tecnologia, adoraria ouvir de você.
            </p>
          </AnimationDiv>

          <div className="grid lg:grid-cols-2 gap-4">
            {/* Contact Form */}
            <AnimationDiv variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Comece uma conversa</CardTitle>
                  <CardDescription>
                    Me conte sobre seu projeto, ideia ou apenas diga olá.
                    Responderei dentro de 24 horas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactSectionForm />
                </CardContent>
              </Card>
            </AnimationDiv>

            {/* Contact Information */}
            <div className="space-y-4">
              <AnimationDiv variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Conecte-se diretamente</CardTitle>
                    <CardDescription>
                      Prefere contatar por outros canais? Aqui estão meus canais
                      preferidos para contato.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {socialLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-lg border transition-colors hover:bg-muted',
                            link.color,
                          )}
                        >
                          <link.icon className="h-5 w-5" />
                          <div>
                            <p className="font-medium">{link.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {link.name === 'Email'
                                ? 'pedr.augustobarbosa.aparecido@gmail.com'
                                : link.name === 'GitHub'
                                  ? '@pedroaba'
                                  : link.name === 'LinkedIn'
                                    ? 'Pedro Augusto'
                                    : 'Pedro Augusto'}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimationDiv>

              <AnimationDiv variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>O que esperar</CardTitle>
                    <CardDescription>
                      Meus tempos de resposta e disponibilidade
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <span className="text-sm font-medium">Email</span>
                          <p className="text-xs text-muted-foreground">
                            Contato direto
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Dentro de 24 horas
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <span className="text-sm font-medium">LinkedIn</span>
                          <p className="text-xs text-muted-foreground">
                            Rede profissional
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Dentro de 12 horas
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <span className="text-sm font-medium">
                            Inquéritos de projeto
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Novas oportunidades
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Mesmo dia
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimationDiv>

              <AnimationDiv variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Por que trabalhar comigo?</CardTitle>
                    <CardDescription>
                      O que torna nossa colaboração bem-sucedida
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">
                            Comunicação clara
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Atualizações regulares e progresso transparente do
                            projeto
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">
                            Foco em qualidade
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Código limpo, mantido e com as melhores práticas
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Entrega pontual</p>
                          <p className="text-xs text-muted-foreground">
                            Atendendo aos prazos e mantendo a qualidade
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimationDiv>
            </div>
          </div>
        </AnimationDiv>
      </div>
    </section>
  )
}
