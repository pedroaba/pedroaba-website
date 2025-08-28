'use server'

import { prisma } from '@pedroaba/lib/prisma'
import { returnsDefaultActionMessage } from '@pedroaba/utils/returns-default-action-message'
import { EntityState } from '@prisma/client'

import { authProcedure } from './procedures/auth'

export const listClientAction = authProcedure
  .createServerAction()
  .handler(async () => {
    const clients = await prisma.client.findMany({
      where: {
        state: EntityState.ACTIVE,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return returnsDefaultActionMessage({
      message: 'Clients listed successfully',
      success: true,
      clients,
    })
  })
