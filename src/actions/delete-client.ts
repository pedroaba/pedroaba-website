'use server'

import { prisma } from '@pedroaba/lib/prisma'
import { returnsDefaultActionMessage } from '@pedroaba/utils/returns-default-action-message'
import { EntityState } from '@prisma/client'
import { z } from 'zod'

import { authProcedure } from './procedures/auth'

export const deleteClientAction = authProcedure
  .createServerAction()
  .input(
    z.object({
      clientId: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const client = await prisma.client.findUnique({
      where: {
        id: input.clientId,
      },
    })

    if (!client) {
      return returnsDefaultActionMessage({
        message: 'Client not found',
        success: false,
      })
    }

    await prisma.client.update({
      where: {
        id: input.clientId,
      },
      data: {
        state: EntityState.DELETED,
      },
    })

    return returnsDefaultActionMessage({
      message: 'Client deleted successfully',
      success: true,
    })
  })
