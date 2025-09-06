'use server'

import { prisma } from '@pedroaba/lib/prisma'
import { returnsDefaultActionMessage } from '@pedroaba/utils/returns-default-action-message'
import { slugify } from '@pedroaba/utils/slugify'
import z from 'zod'

import { authProcedure } from './procedures/auth'

export const changeOrCreateOrganizationAction = authProcedure
  .createServerAction()
  .input(
    z.object({
      name: z.string().min(1),
      organizationId: z.string().optional(),
    }),
  )
  .handler(async ({ input }) => {
    const organizationSlug = slugify(input.name)

    if (input.organizationId) {
      const organization = await prisma.organization.findUnique({
        where: {
          id: input.organizationId,
        },
      })

      if (organization && organizationSlug === organization?.slug) {
        return returnsDefaultActionMessage({
          message: 'Organization name is already in use',
          success: false,
        })
      }

      try {
        await prisma.organization.update({
          where: {
            id: input.organizationId,
          },
          data: {
            name: input.name,
            slug: organizationSlug,
          },
        })
      } finally {
      }

      return returnsDefaultActionMessage({
        message: 'Organization updated successfully',
        success: true,
      })
    }

    const existingOrganizationWithSlug = await prisma.organization.findUnique({
      where: {
        slug: organizationSlug,
      },
    })

    if (existingOrganizationWithSlug) {
      return returnsDefaultActionMessage({
        message: 'Organization with this name already exists',
        success: false,
      })
    }

    await prisma.organization.create({
      data: {
        name: input.name,
        slug: organizationSlug,
      },
    })

    return returnsDefaultActionMessage({
      message: 'Organization created successfully',
      success: true,
    })
  })
