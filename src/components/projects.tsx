import { Badge } from '@pedroaba/components/ui/badge'
import { Button } from '@pedroaba/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pedroaba/components/ui/card'
import { ExternalLink, GitBranch } from 'lucide-react'

const featuredProjects = [
  {
    id: 1,
    name: 'Asagg',
    description:
      'Biblioteca para gerar automaticamente getters, setters e outros métodos de acesso para atributos privados, inspirada no Lombok (Java).',
    language: 'Python',
    topics: ['automação', 'geração-de-código', 'getters-setters'],
    url: 'https://github.com/pedroaba/Asagg',
    homepage: 'https://asagg.readthedocs.io/en/latest',
    updatedAt: '2023-11-09',
  },
  {
    id: 2,
    name: 'taurius-ytd',
    description:
      'Aplicação desktop multiplataforma construída com Tauri para baixar vídeos do YouTube em vários formatos.',
    language: 'TypeScript',
    topics: [
      'YouTube',
      'Downloader',
      'Desktop',
      'Electron',
      'React',
      'Processamento de Vídeo',
    ],
    url: 'https://github.com/pedroaba/taurius-ytd',
    homepage: null,
    updatedAt: '2024-01-12',
  },
  {
    id: 3,
    name: 'workshop-padrao-de-projeto',
    description:
      'Repositório de workshop educacional demonstrando vários padrões de design de software com exemplos práticos.',
    language: 'TypeScript',
    topics: [
      'Padrões de Design',
      'Workshop',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'Drizzle',
    ],
    url: 'https://github.com/pedroaba/workshop-padrao-de-projeto',
    homepage: null,
    updatedAt: '2023-11-05',
  },
  {
    id: 4,
    name: 'queue-optimization-calculator',
    description:
      'Ferramenta para calcular e otimizar métricas de desempenho de sistemas de filas com diferentes modelos.',
    language: 'TypeScript',
    topics: [
      'Teoria de Filas',
      'Otimização',
      'Matemática',
      'TypeScript',
      'Tailwind CSS',
      'React',
      'Electron',
    ],
    url: 'https://github.com/pedroaba/queue-optimization-calculator',
    homepage: 'https://queue-calculator-website.vercel.app/',
    updatedAt: '2024-01-08',
  },
  {
    id: 5,
    name: 'Youtube-Video-Downloader-v2',
    description:
      'Ferramenta CLI construída em Python para baixar vídeos ou playlists do YouTube com downloads simultâneos (multi-threaded), usando FFMPEG para processamento.',
    language: 'Python',
    topics: ['YouTube', 'Downloader', 'Vídeo', 'Thread', 'FFMPEG', 'CLI'],
    url: 'https://github.com/pedroaba/Youtube-Video-Downloader-v2',
    homepage: null,
    updatedAt: '2024-01-03',
  },
]

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
  }
  return colors[language] || '#6e7681'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (diffInDays === 0) {
    return 'Today'
  } else if (diffInDays === 1) {
    return 'Yesterday'
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Projetos em Destaque
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Uma seleção de projetos que construí, desde aplicações web até
              ferramentas de desenvolvimento.
            </p>

            {/* View All Projects Link */}
            <Button
              variant="outline"
              asChild
              icon={ExternalLink}
              iconPosition="right"
            >
              <a
                href="https://github.com/pedroaba"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Ver Todos no GitHub
              </a>
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/20 group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 h-8 w-8 p-0 opacity-70 hover:opacity-100"
                      asChild
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver ${project.name} no GitHub`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {project.language && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: getLanguageColor(
                                project.language,
                              ),
                            }}
                          />
                          <span>{project.language}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1">
                        <GitBranch className="h-3 w-3" />
                        <span>{formatDate(project.updatedAt)}</span>
                      </div>
                    </div>

                    {/* Topics */}
                    {project.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.topics.map((topic) => (
                          <Badge
                            key={topic}
                            variant="secondary"
                            className="text-xs px-2 py-0.5"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Homepage link */}
                    {project.homepage && (
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          className="w-full text-xs"
                          asChild
                          icon={ExternalLink}
                          iconPosition="right"
                        >
                          <a
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Demo ao Vivo
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Quer ver mais? Veja meu{' '}
              <a
                href="https://github.com/pedroaba"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                perfil no GitHub
              </a>{' '}
              para uma lista completa de projetos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
