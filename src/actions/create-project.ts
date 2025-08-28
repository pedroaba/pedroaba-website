'use server'

import { SystemConfig } from '@pedroaba/config/system'
import { prisma } from '@pedroaba/lib/prisma'
import { returnsDefaultActionMessage } from '@pedroaba/utils/returns-default-action-message'
import z from 'zod'

import { authProcedure } from './procedures/auth'

export const createProjectAction = authProcedure
  .createServerAction()
  .input(
    z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      clientId: z.string().min(1),
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

    await prisma.project.create({
      data: {
        name: input.name,
        description: input.description,
        clientId: input.clientId,
        hourlyRate: SystemConfig.DEFAULT_HOURLY_RATE,
      },
    })

    return returnsDefaultActionMessage({
      message: 'Project created successfully',
      success: true,
    })
  })
