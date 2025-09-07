import { notFound } from 'next/navigation'

type ChangelogPageProps = {
  params: Promise<{ slug: string }>
}

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function ChangelogPage({ params }: ChangelogPageProps) {
  let ChangelogComp: any

  const { slug } = await params
  try {
    ChangelogComp = await import(`@pedroaba/changelogs/${slug}.md`)
  } catch {
    notFound()
  }

  const splitSlug = slug.split('_')
  const version = splitSlug.at(-1) ?? 'unknown'
  const dateStr =
    splitSlug.at(Math.max(0, parseInt(String(splitSlug.length / 2)))) ??
    'unknown'

  const date = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3 mb-4">
          {version && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800">
              {version}
            </span>
          )}
          {date && (
            <time className="text-sm text-muted-foreground">{date}</time>
          )}
        </div>

        <Link
          href="/changelogs"
          className="flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-md px-3 py-2 hover:text-foreground hover:bg-mute/40 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Link>
      </div>

      <ChangelogComp.default />
    </div>
  )
}
