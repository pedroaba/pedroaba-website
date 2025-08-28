import { AboutSection } from '@pedroaba/components/about'
import { ContactSection } from '@pedroaba/components/contact'
import { ExperienceSection } from '@pedroaba/components/experience'
import { FooterSection } from '@pedroaba/components/footer'
import { HeaderSection } from '@pedroaba/components/header'
import { HeroSection } from '@pedroaba/components/hero'
import { ProjectsSection } from '@pedroaba/components/projects'
import { SkillsSection } from '@pedroaba/components/skills'

export default function Home() {
  return (
    <>
      <HeaderSection />
      <main className="space-y-0">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  )
}
