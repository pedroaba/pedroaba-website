import { ChangelogCard } from '@pedroaba/components/changelog-card'
import { getAllChangelogs } from '@pedroaba/utils/changelog-reader'

export default async function ChangelogPage() {
  const changelogs = getAllChangelogs()

  if (changelogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-muted-foreground mb-2">
          Nenhum changelog encontrado
        </h2>
        <p className="text-muted-foreground">
          Ainda não há changelogs disponíveis.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Changelogs</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore o histórico completo de atualizações do sistema! Fique por
          dentro de todas as mudanças, melhorias e novas funcionalidades que
          estamos trazendo para aprimorar sua experiência. Acompanhe a evolução
          da plataforma com a gente! 🌟
        </p>
      </div>
      {changelogs.map((changelog, index) => (
        <ChangelogCard
          key={changelog.slug}
          href={`/changelogs/${changelog.slug}` as any}
          version={changelog.version}
          title={changelog.title}
          date={changelog.date}
          description={changelog.description}
          tags={changelog.tags}
          badge={{
            text: index === 0 ? 'Mais Recente' : 'Versão',
            variant: index === 0 ? 'emerald' : 'blue',
          }}
        />
      ))}
    </div>
  )
}
