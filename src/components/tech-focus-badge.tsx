import { Badge } from '@pedroaba/components/ui/badge'
import { Button } from '@pedroaba/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@pedroaba/components/ui/hover-card'
import { cn } from '@pedroaba/lib/utils'
import { Clock, ExternalLink, Star } from 'lucide-react'

interface TechFocusBadgeProps {
  name: string
  category: 'primary' | 'exploring'
  description: string
  experience: string
  docs?: string
}

export default function TechFocusBadge({
  name,
  category,
  description,
  experience,
  docs,
}: TechFocusBadgeProps) {
  const getCategoryIcon = (category: 'primary' | 'exploring') => {
    switch (category) {
      case 'primary':
        return '🚀'
      case 'exploring':
        return '🔬'
      default:
        return '💡'
    }
  }

  const getCategoryText = (category: 'primary' | 'exploring') => {
    switch (category) {
      case 'primary':
        return 'Primary Stack'
      case 'exploring':
        return 'Currently Exploring'
      default:
        return 'Unknown Category'
    }
  }

  const categoryColors = {
    primary:
      'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
    exploring:
      'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
  }

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Badge
          variant="outline"
          className={cn(
            'transition-all duration-200 hover:scale-105 cursor-help text-xs',
            categoryColors[category],
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
                <span className="text-sm">{getCategoryIcon(category)}</span>
                <span>{getCategoryText(category)}</span>
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
                <Star className="h-3 w-3" />
                <span className="capitalize">{category}</span>
              </div>
            </div>

            {/* Documentation Link */}
            {docs && (
              <Button
                variant="outline"
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
