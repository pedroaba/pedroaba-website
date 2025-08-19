import { InvalidCredentialsError } from '@pedroaba/errors/invalid-credentials-error'
import { auth } from '@pedroaba/lib/authjs'
import { createServerActionProcedure } from 'zsa'

export const authProcedure = createServerActionProcedure().handler(async () => {
  const session = await auth()

  if (!session) {
    throw new InvalidCredentialsError()
  }

  return {
    user: session.user,
  }
})
