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
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? Whether it&apos;s a new
              project, collaboration opportunity, or just a friendly chat about
              tech, I&apos;d love to hear from you.
            </p>
          </AnimationDiv>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimationDiv variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Start a conversation</CardTitle>
                  <CardDescription>
                    Tell me about your project, idea, or just say hello.
                    I&apos;ll respond within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactSectionForm />
                </CardContent>
              </Card>
            </AnimationDiv>

            {/* Contact Information */}
            <div className="space-y-6">
              <AnimationDiv variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Connect directly</CardTitle>
                    <CardDescription>
                      Prefer to reach out through other channels? Here are my
                      preferred ways to connect.
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
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-colors hover:bg-muted ${link.color}`}
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
                    <CardTitle>What to expect</CardTitle>
                    <CardDescription>
                      My typical response times and availability
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <span className="text-sm font-medium">Email</span>
                          <p className="text-xs text-muted-foreground">
                            Direct contact
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Within 24 hours
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <span className="text-sm font-medium">LinkedIn</span>
                          <p className="text-xs text-muted-foreground">
                            Professional network
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Within 12 hours
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <span className="text-sm font-medium">
                            Project inquiries
                          </span>
                          <p className="text-xs text-muted-foreground">
                            New opportunities
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Same day
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimationDiv>

              <AnimationDiv variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Why work with me?</CardTitle>
                    <CardDescription>
                      What makes our collaboration successful
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">
                            Clear Communication
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Regular updates and transparent project progress
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Quality Focus</p>
                          <p className="text-xs text-muted-foreground">
                            Clean, maintainable code with best practices
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Timely Delivery</p>
                          <p className="text-xs text-muted-foreground">
                            Meeting deadlines while maintaining quality
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
