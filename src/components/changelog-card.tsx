import Link from 'next/link'
import type { ComponentProps } from 'react'

type ChangelogCardProps = ComponentProps<typeof Link> & {
  version: string
  title: string
  date: string
  description: string
  tags: string[]
  badge?: {
    text: string
    variant?: 'emerald' | 'blue' | 'purple' | 'orange' | 'red' | 'yellow'
  }
}

const badgeVariants = {
  emerald:
    'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800',
  blue: 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800',
  purple:
    'bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800',
  orange:
    'bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-800',
  red: 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800',
  yellow:
    'bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800',
}

const tagVariants = {
  blue: 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800',
  purple:
    'bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800',
  orange:
    'bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-800',
  green:
    'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800',
  red: 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800',
  yellow:
    'bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800',
}

export function ChangelogCard({
  href,
  version,
  date,
  description,
  tags,
  badge,
}: ChangelogCardProps) {
  const getTagVariant = (index: number) => {
    const variants = Object.keys(tagVariants) as Array<keyof typeof tagVariants>
    return variants[index % variants.length]
  }

  return (
    <Link
      href={href}
      className="group block p-6 bg-card rounded-xl shadow-sm border border-border hover:shadow-md hover:border-border/80 transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {badge && (
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeVariants[badge.variant || 'emerald']}`}
            >
              {badge.text}
            </span>
          )}
          <h2 className="text-xl font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
            {version}
          </h2>
        </div>
        <time className="text-sm text-muted-foreground">{date}</time>
      </div>

      <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => {
          const variant = getTagVariant(index)
          return (
            <span
              key={tag}
              className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${tagVariants[variant]}`}
            >
              {tag}
            </span>
          )
        })}
      </div>
    </Link>
  )
}
