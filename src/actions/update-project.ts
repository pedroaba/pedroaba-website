'use server'

import { prisma } from '@pedroaba/lib/prisma'
import { returnsDefaultActionMessage } from '@pedroaba/utils/returns-default-action-message'
import { z } from 'zod'

import { authProcedure } from './procedures/auth'

export const updateProjectAction = authProcedure
  .createServerAction()
  .input(
    z.object({
      projectId: z.string(),
      name: z
        .string({
          message: 'Name is required',
        })
        .min(1, {
          message: 'Name is required',
        }),
      description: z.string().optional(),
      clientId: z.string().min(1, {
        message: 'Client is required',
      }),
    }),
  )
  .handler(async ({ input }) => {
    const project = await prisma.project.findUnique({
      where: {
        id: input.projectId,
      },
    })

    if (!project) {
      return returnsDefaultActionMessage({
        message: 'Project not found',
        success: false,
      })
    }

    await prisma.project.update({
      where: {
        id: input.projectId,
      },
      data: {
        name: input.name,
        description: input.description,
      },
    })

    return returnsDefaultActionMessage({
      message: 'Project updated successfully',
      success: true,
    })
  })
