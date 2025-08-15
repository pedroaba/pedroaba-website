import { env } from '@pedroaba/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: './drizzle',
  schema: './src/database/schemas/**/*.ts',
})
