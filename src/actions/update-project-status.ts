'use server'

import { prisma } from '@pedroaba/lib/prisma'
import { returnsDefaultActionMessage } from '@pedroaba/utils/returns-default-action-message'
import { ProjectStatus } from '@prisma/client'
import { z } from 'zod'

import { authProcedure } from './procedures/auth'

export const updateProjectStatusAction = authProcedure
  .createServerAction()
  .input(
    z.object({
      projectId: z.string(),
      status: z.enum(ProjectStatus, {
        message: 'Invalid status',
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
        status: input.status,
      },
    })

    return returnsDefaultActionMessage({
      message: 'Project status updated successfully',
      success: true,
    })
  })
