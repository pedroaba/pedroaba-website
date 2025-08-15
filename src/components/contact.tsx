'use client'

import { AnimationDiv } from '@pedroaba/components/motion/div'
import { Button } from '@pedroaba/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pedroaba/components/ui/card'
import { Input } from '@pedroaba/components/ui/input'
import { Label } from '@pedroaba/components/ui/label'
import { Textarea } from '@pedroaba/components/ui/textarea'
import { socialLinks } from '@pedroaba/config/social'
import { fadeInUp, staggerChildren } from '@pedroaba/lib/animations'
import { cn } from '@pedroaba/lib/utils'
import { Send } from 'lucide-react'
import { useState } from 'react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')

    // Simulate form submission
    try {
      window.open(
        `mailto:pedr.augustobarbosa.aparecido@gmail.com?subject=${formData.subject}&body=${formData.message}`,
      )

      setTimeout(() => setFormStatus('idle'), 5000)
    } catch {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 5000)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="What should I call you?"
                          required
                          disabled={formStatus === 'submitting'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          disabled={formStatus === 'submitting'}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project collaboration, job opportunity, or just hello?"
                        required
                        disabled={formStatus === 'submitting'}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share your project details, timeline, budget, or just tell me what's on your mind..."
                        rows={5}
                        required
                        disabled={formStatus === 'submitting'}
                      />
                    </div>

                    <Button
                      type="submit"
                      className={cn(
                        'w-full cursor-pointer',
                        formStatus === 'submitting' && 'cursor-wait',
                      )}
                      isLoading={formStatus === 'submitting'}
                      icon={Send}
                      iconPosition="right"
                    >
                      Send Message
                    </Button>

                    {formStatus === 'success' && (
                      <p className="text-sm text-green-600 dark:text-green-400 text-center">
                        Thanks for your message! I&apos;ll get back to you soon.
                      </p>
                    )}

                    {formStatus === 'error' && (
                      <p className="text-sm text-red-600 dark:text-red-400 text-center">
                        Something went wrong. Please try again or contact me
                        directly.
                      </p>
                    )}
                  </form>
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
