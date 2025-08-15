import { AboutSection } from '@pedroaba/components/about'
import { ContactSection } from '@pedroaba/components/contact'
import { ExperienceSection } from '@pedroaba/components/experience'
import { FooterSection } from '@pedroaba/components/footer'
import { HeaderSection } from '@pedroaba/components/header'
import { HeroSection } from '@pedroaba/components/hero'
import { ProjectsSection } from '@pedroaba/components/projects'
import { SkillsSection } from '@pedroaba/components/skills'
import { Button } from '@pedroaba/components/ui/button'
import { GithubIcon, LinkedinIcon } from 'lucide-react'

export default function Home() {
  return (
    <>
      <HeaderSection />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Interested in working together? Let&apos;s connect!
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild icon={LinkedinIcon}>
                <a
                  href="https://www.linkedin.com/in/pedroaba/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" icon={GithubIcon}>
                <a
                  href="https://github.com/pedroaba"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <ContactSection />
      <FooterSection />
    </>
  )
}
