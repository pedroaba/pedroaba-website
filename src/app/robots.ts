import { site } from '@pedroaba/config/portfolio.config'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/'],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
