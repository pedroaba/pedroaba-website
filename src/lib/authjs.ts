import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@pedroaba/lib/prisma'
import { comparePassword } from '@pedroaba/utils/crypto'
import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

class InvalidLoginError extends CredentialsSignin {
  code = 'invalid_credentials'
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token }) => {
      return token
    },
    session: async ({ session }) => {
      return session
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials

          if (!email || !password) {
            throw new InvalidLoginError()
          }

          const user = await prisma.user.findUnique({
            where: {
              email: email as string,
            },
          })

          if (!user || !user?.password) {
            throw new InvalidLoginError()
          }

          const isPasswordValid = await comparePassword(
            password as string,
            user.password,
          )

          if (!isPasswordValid) {
            throw new InvalidLoginError()
          }

          return user
        } catch (error) {
          console.log(error)
          throw new InvalidLoginError()
        }
      },
    }),
  ],
})
