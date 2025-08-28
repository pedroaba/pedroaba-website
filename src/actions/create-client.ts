'use server'

import { prisma } from '@pedroaba/lib/prisma'
import { returnsDefaultActionMessage } from '@pedroaba/utils/returns-default-action-message'
import z from 'zod'

import { authProcedure } from './procedures/auth'

export const createClientAction = authProcedure
  .createServerAction()
  .input(
    z.object({
      name: z
        .string({
          message: 'Name is required',
        })
        .min(1, {
          message: 'Name is required',
        }),
      email: z.string().email({ message: 'Invalid email' }).optional(),
      phone: z.string().optional(),
      company: z.string().optional(),
      website: z.string().optional(),
      address: z.string().optional(),
      notes: z.string().optional(),
      taxId: z.string().optional(),
      taxName: z.string().optional(),
    }),
  )
  .handler(async ({ input }) => {
    await prisma.client.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company,
        website: input.website,
        address: input.address,
        notes: input.notes,
        taxId: input.taxId,
        taxName: input.taxName,
      },
    })

    return returnsDefaultActionMessage({
      message: 'Client created successfully',
      success: true,
    })
  })
