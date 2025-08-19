'use server'

import { prisma } from '@pedroaba/lib/prisma'
import { hashPassword } from '@pedroaba/utils/crypto'
import { returnsDefaultActionMessage } from '@pedroaba/utils/returns-default-action-message'
import { slugify } from '@pedroaba/utils/slugify'
import z from 'zod'
import { createServerAction } from 'zsa'

export const createUserAction = createServerAction()
  .input(
    z.object({
      name: z.string().min(1),
      email: z.email(),
      password: z.string().min(8),
      organization: z.string().min(1),
    }),
  )
  .handler(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    })

    if (user) {
      return returnsDefaultActionMessage({
        message: 'User already exists',
        success: false,
      })
    }

    const organizationSlug = slugify(input.organization)
    const hashedPassword = await hashPassword(input.password)

    await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
        organization: {
          connectOrCreate: {
            where: {
              slug: organizationSlug,
            },
            create: {
              name: input.organization,
              slug: organizationSlug,
            },
          },
        },
      },
    })

    return returnsDefaultActionMessage({
      message: 'User created successfully',
      success: true,
    })
  })
