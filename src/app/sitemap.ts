import { MetadataRoute } from 'next'
import { site } from '@pedroaba/config/portfolio.config'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/projects', '/contact'].map(route => ({
    url: `${site.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
