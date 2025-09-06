import { EntityState } from '@prisma/client'

export const EntityStatusColors = {
  [EntityState.ACTIVE]:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [EntityState.DELETED]:
    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
} as const
