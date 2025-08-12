import { MetadataRoute } from 'next'
import { site } from '@pedroaba/config/portfolio.config'

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
