import { AboutSection } from '@pedroaba/components/about'
import { AcademicExperienceSection } from '@pedroaba/components/academic-experience'
import { ClientProjectsSection } from '@pedroaba/components/client-projects'
import { ContactSection } from '@pedroaba/components/contact'
import { FooterSection } from '@pedroaba/components/footer'
import { HeaderSection } from '@pedroaba/components/header'
import { HeroSection } from '@pedroaba/components/hero'
import { ProfessionalExperienceSection } from '@pedroaba/components/professional-experience'
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
        <ClientProjectsSection />
        <ProjectsSection />
        <ProfessionalExperienceSection />
        <AcademicExperienceSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  )
}
