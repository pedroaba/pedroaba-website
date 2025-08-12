import { AnimationDiv } from '@pedroaba/components/motion/div'
import SkillBadge from '@pedroaba/components/skill-badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@pedroaba/components/ui/card'
import { skillGroups } from '@pedroaba/config/skills'
import { fadeInUp, staggerChildren } from '@pedroaba/lib/animations'

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimationDiv
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerChildren(0.1)}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <AnimationDiv className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skills & Technologies
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of the technologies I work with daily,
              and those I&apos;m currently exploring.
            </p>
          </AnimationDiv>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skillGroups).map(([key, group]) => (
              <AnimationDiv key={key} variants={fadeInUp}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <SkillBadge
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          description={skill.description}
                          experience={skill.experience}
                          docs={skill.docs}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimationDiv>
            ))}
          </div>

          {/* Legend */}
          <AnimationDiv variants={fadeInUp} className="mt-12">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                <span className="text-muted-foreground">Expert</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/30" />
                <span className="text-muted-foreground">Intermediate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/30" />
                <span className="text-muted-foreground">Learning</span>
              </div>
            </div>
          </AnimationDiv>
        </AnimationDiv>
      </div>
    </section>
  )
}
