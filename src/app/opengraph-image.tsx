import { profile, site } from '@pedroaba/config/portfolio.config'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = site.name
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: 24,
            padding: 80,
            margin: 40,
            border: '2px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            {profile.name}
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: '#a1a1aa',
              marginBottom: 40,
              textAlign: 'center',
            }}
          >
            Frontend Engineer @ SIBIS
          </div>

          {/* Tech Stack */}
          <div
            style={{
              fontSize: 24,
              color: '#667eea',
              textAlign: 'center',
              display: 'flex',
              gap: 20,
            }}
          >
            <span>React</span>
            <span>•</span>
            <span>Next.js</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Python</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            fontSize: 20,
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          pedroaba.com.br
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
