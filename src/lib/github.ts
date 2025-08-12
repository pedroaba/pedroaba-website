export const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GH_USER ?? 'pedroaba'
export const GH_TOKEN = process.env.GITHUB_TOKEN

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  stars: number
  language: string | null
  updatedAt: string
  homepage: string | null
  url: string
  topics: string[]
}

export async function fetchTopRepos(limit = 6): Promise<GitHubRepo[]> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'pedroaba-portfolio',
    }
    if (GH_TOKEN) {
      headers.Authorization = `Bearer ${GH_TOKEN}`
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 21600 }, // 6h
      },
    )

    if (!res.ok) {
      console.error('Failed to fetch GitHub repos:', res.statusText)
      return []
    }

    const repos = (await res.json()) as any[]

    const ranked = repos
      .filter((r) => !r.fork && !r.archived)
      .sort(
        (a, b) =>
          b.stargazers_count +
          getRecentActivityScore(b) -
          (a.stargazers_count + getRecentActivityScore(a)),
      )
      .slice(0, limit)

    return ranked.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      stars: r.stargazers_count,
      language: r.language,
      updatedAt: r.updated_at,
      homepage: r.homepage,
      url: r.html_url,
      topics: r.topics ?? [],
    }))
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

function getRecentActivityScore(repo: any): number {
  const daysSinceUpdate =
    (Date.now() - new Date(repo.updated_at).getTime()) / 86_400_000
  return Math.max(0, 50 - daysSinceUpdate) // 0..50 bonus for recent activity
}

export async function fetchRepoDetails(owner: string, repo: string) {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'pedroaba-portfolio',
    }
    if (GH_TOKEN) {
      headers.Authorization = `Bearer ${GH_TOKEN}`
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 21600 },
    })

    if (!res.ok) return null

    const repoData = await res.json()

    return {
      id: repoData.id,
      name: repoData.name,
      description: repoData.description,
      stars: repoData.stargazers_count,
      language: repoData.language,
      updatedAt: repoData.updated_at,
      homepage: repoData.homepage,
      url: repoData.html_url,
      topics: repoData.topics ?? [],
    }
  } catch (error) {
    console.error(`Error fetching repo ${owner}/${repo}:`, error)
    return null
  }
}
