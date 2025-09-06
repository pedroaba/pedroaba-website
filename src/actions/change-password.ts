'use server'

import { prisma } from '@pedroaba/lib/prisma'
import { hashPassword } from '@pedroaba/utils/crypto'
import { returnsDefaultActionMessage } from '@pedroaba/utils/returns-default-action-message'
import { z } from 'zod'

import { authProcedure } from './procedures/auth'

export const changePasswordAction = authProcedure
  .createServerAction()
  .input(z.object({ password: z.string().min(8) }))
  .handler(async ({ input, ctx }) => {
    if (!ctx.user?.email) {
      return returnsDefaultActionMessage({
        message: 'User not found',
        success: false,
      })
    }

    const userOnDb = await prisma.user.findUnique({
      where: {
        email: ctx.user.email,
      },
    })

    if (!userOnDb) {
      return returnsDefaultActionMessage({
        message: 'User not found',
        success: false,
      })
    }

    const hashedPassword = await hashPassword(input.password)
    await prisma.user.update({
      where: {
        id: userOnDb.id,
      },
      data: {
        password: hashedPassword,
        lastPasswordChange: new Date(),
      },
    })

    return returnsDefaultActionMessage({
      message: 'Password changed successfully',
      success: true,
    })
  })
