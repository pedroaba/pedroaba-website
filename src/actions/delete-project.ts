'use server'

import { prisma } from '@pedroaba/lib/prisma'
import { returnsDefaultActionMessage } from '@pedroaba/utils/returns-default-action-message'
import { EntityState } from '@prisma/client'
import { z } from 'zod'

import { authProcedure } from './procedures/auth'

export const deleteProjectAction = authProcedure
  .createServerAction()
  .input(
    z.object({
      projectId: z.string(),
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
        state: EntityState.DELETED,
      },
    })

    return returnsDefaultActionMessage({
      message: 'Project deleted successfully',
      success: true,
    })
  })
