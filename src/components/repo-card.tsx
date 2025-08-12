import { AnimationDiv } from '@pedroaba/components/motion/div'
import { Badge } from '@pedroaba/components/ui/badge'
import { Button } from '@pedroaba/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pedroaba/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@pedroaba/components/ui/tooltip'
import { fadeInUp } from '@pedroaba/lib/animations'
import { formatDate, formatNumber } from '@pedroaba/lib/formatters'
import type { GitHubRepo } from '@pedroaba/lib/github'
import { ExternalLink, GitBranch, Star } from 'lucide-react'
import Link from 'next/link'

interface RepoCardProps {
  repo: GitHubRepo
  priority?: boolean
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <AnimationDiv variants={fadeInUp} className="h-full">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/20 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                {repo.name}
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2">
                {repo.description || 'No description available'}
              </CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 h-8 w-8 p-0 opacity-70 hover:opacity-100"
                    asChild
                  >
                    <Link
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${repo.name} on GitHub`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on GitHub</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {repo.language && (
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  />
                  <span>{repo.language}</span>
                </div>
              )}

              {repo.stars > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  <span>{formatNumber(repo.stars)}</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <GitBranch className="h-3 w-3" />
                <span>{formatDate(repo.updatedAt)}</span>
              </div>
            </div>

            {/* Topics */}
            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {repo.topics.slice(0, 3).map((topic) => (
                  <Badge
                    key={topic}
                    variant="secondary"
                    className="text-xs px-2 py-0.5"
                  >
                    {topic}
                  </Badge>
                ))}
                {repo.topics.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    +{repo.topics.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Homepage link */}
            {repo.homepage && (
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  asChild
                >
                  <Link
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Live Demo
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </AnimationDiv>
  )
}

// Language colors (simplified subset)
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    'C#': '#239120',
    Go: '#00ADD8',
    Rust: '#dea584',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Vue: '#2c3e50',
    React: '#61dafb',
    Svelte: '#ff3e00',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
  }
  return colors[language] || '#6e7681'
}
