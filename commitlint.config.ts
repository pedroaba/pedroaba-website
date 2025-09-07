import { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    settings: {
      enableMultipleScopes: true,
    },
  },
  rules: {
    'subject-case': [2, 'always', 'lower-case'],
  },
} satisfies UserConfig

export default config
