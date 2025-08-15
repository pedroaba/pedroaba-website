'use server'

import { db } from '@pedroaba/database/connection'
import { member } from '@pedroaba/database/schemas/member'
import { organization } from '@pedroaba/database/schemas/organization'
import { user } from '@pedroaba/database/schemas/user'
import { slugify } from '@pedroaba/utils/slugify'
import { hash } from 'argon2'
import z from 'zod'
import { createServerAction } from 'zsa'

export const signUpAction = createServerAction()
  .input(
    z.object({
      name: z.string().min(1),
      email: z.email(),
      password: z.string().min(8),

      organization: z.string().min(1),
    }),
  )
  .handler(async ({ input }) => {
    const orgResult = await db
      .insert(organization)
      .values({
        name: input.organization,
        slug: slugify(input.organization),
      })
      .returning()

    if (orgResult.length === 0) {
      return { message: 'Failed to create organization' }
    }

    const org = orgResult[0]

    const passwordHash = await hash(input.password)
    const userResult = await db
      .insert(user)
      .values({
        name: input.name,
        email: input.email,
        password: passwordHash,
      })
      .returning()

    if (userResult.length === 0) {
      return { message: 'Failed to create user' }
    }

    const u = userResult[0]

    const memberResult = await db
      .insert(member)
      .values({
        organizationId: org.id,
        userId: u.id,
        role: 'owner',
      })
      .returning()

    if (memberResult.length === 0) {
      return { error: 'Failed to create member' }
    }

    return {
      success: true,
    }
  })
