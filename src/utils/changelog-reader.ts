import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

export type ChangelogMetadata = {
  slug: string
  version: string
  date: string
  title: string
  description: string
  tags: string[]
  filePath: string
}

export function getAllChangelogs(): ChangelogMetadata[] {
  try {
    const changelogsDir = join(process.cwd(), 'src/changelogs')
    const files = readdirSync(changelogsDir)

    const changelogs = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const filePath = join(changelogsDir, file)
        const fileContent = readFileSync(filePath, 'utf8')

        // Parse filename to extract version and date
        const filenameMatch = file.match(/CHANGELOG_(\d{8})_(.+)\.md/)
        const date = filenameMatch?.[1] || ''
        const version = filenameMatch?.[2] || ''

        // Extract title from content (first line after #)
        const titleMatch = fileContent.match(/^#\s+(.+)$/m)
        const title = titleMatch?.[1] || version

        // Extract description (first paragraph after title)
        const descriptionMatch = fileContent.match(
          /^#\s+.+\n\n(.+?)(?:\n\n|\n##)/,
        )
        const description = descriptionMatch?.[1]?.trim() || ''

        // Extract tags from content (look for common patterns)
        const tags: string[] = []
        const tagPatterns = [/##\s+(.+?)(?:\n|$)/g, /###\s+(.+?)(?:\n|$)/g]

        tagPatterns.forEach((pattern) => {
          let match
          while ((match = pattern.exec(fileContent)) !== null) {
            const tag = match[1].trim()
            if (tag && !tag.includes('##') && !tag.includes('###')) {
              tags.push(tag)
            }
          }
        })

        // Remove duplicates and limit to first 5 tags
        const uniqueTags = [...new Set(tags)].slice(0, 5)

        return {
          slug: file.replace('.md', ''),
          version,
          date: formatDate(date),
          title,
          description,
          tags: uniqueTags,
          filePath,
        }
      })
      .sort((a, b) => {
        // Sort by date descending (newest first)
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })

    return changelogs
  } catch (error) {
    console.error('Error reading changelogs:', error)
    return []
  }
}

export function getChangelogBySlug(slug: string): ChangelogMetadata | null {
  const changelogs = getAllChangelogs()
  return changelogs.find((changelog) => changelog.slug === slug) || null
}

function formatDate(dateString: string): string {
  if (!dateString || dateString.length !== 8) {
    return new Date().toLocaleDateString('en-US')
  }

  const year = dateString.substring(0, 4)
  const month = dateString.substring(4, 6)
  const day = dateString.substring(6, 8)

  const date = new Date(`${year}-${month}-${day}`)
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
