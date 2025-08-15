import { Badge } from '@pedroaba/components/ui/badge'
import { Button } from '@pedroaba/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@pedroaba/components/ui/hover-card'
import { levelColors, type SkillLevel } from '@pedroaba/config/skills'
import { cn } from '@pedroaba/lib/utils'
import { Clock, ExternalLink, TrendingUp } from 'lucide-react'

interface SkillBadgeProps {
  name: string
  level: SkillLevel
  description: string
  experience: string
  docs?: string
}

export default function SkillBadge({
  name,
  level,
  description,
  experience,
  docs,
}: SkillBadgeProps) {
  const getLevelIcon = (level: SkillLevel) => {
    switch (level) {
      case 'expert':
        return '🚀'
      case 'intermediate':
        return '⚡'
      case 'learning':
        return '📚'
      default:
        return '💡'
    }
  }

  const getLevelText = (level: SkillLevel) => {
    switch (level) {
      case 'expert':
        return 'Expert Level'
      case 'intermediate':
        return 'Intermediate Level'
      case 'learning':
        return 'Currently Learning'
      default:
        return 'Unknown Level'
    }
  }

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Badge
          variant="outline"
          className={cn(
            'transition-all duration-200 hover:scale-105 cursor-help',
            levelColors[level],
          )}
        >
          {name}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="top" align="start">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-semibold">{name}</h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <span className="text-sm">{getLevelIcon(level)}</span>
                <span>{getLevelText(level)}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Experience & Documentation */}
          <div className="space-y-3">
            <div className="flex items-center gap-4 pt-2 border-t">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Experience: {experience}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span className="capitalize">{level}</span>
              </div>
            </div>

            {/* Documentation Link */}
            {docs && (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                asChild
                icon={ExternalLink}
                iconPosition="right"
              >
                <a
                  href={docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  View Documentation
                </a>
              </Button>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
