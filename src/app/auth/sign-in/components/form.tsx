'use client'

import { useRouter } from '@bprogress/next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@pedroaba/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@pedroaba/components/ui/form'
import { Input } from '@pedroaba/components/ui/input'
import { PasswordField } from '@pedroaba/components/ui/password-field'
import { InvalidCredentialsError } from '@pedroaba/errors/invalid-credentials-error'
import { cn } from '@pedroaba/lib/utils'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const schema = z.object({
  email: z.email({
    message: 'Invalid email format',
  }),
  password: z
    .string({
      message: 'Please enter your password',
    })
    .min(1, {
      message: 'Password is required',
    }),
})

type Schema = z.infer<typeof schema>

type LoginFormProps = Omit<ComponentProps<'form'>, 'onSubmit'>

export function LoginForm({ className, ...props }: LoginFormProps) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const searchParams = useSearchParams()
  const router = useRouter()

  async function handleSignInWithEmailAndPassword() {
    try {
      const { email, password } = form.getValues()
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (!response?.ok || response?.error) {
        throw new InvalidCredentialsError()
      }

      toast.success('Access authorized! Redirecting...')
      const callbackUrl = searchParams.get('callbackUrl')

      router.replace(callbackUrl || '/dashboard')
    } catch {
      toast.error('Access denied', {
        description:
          'Incorrect credentials. Please check your information and try again.',
      })
    } finally {
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignInWithEmailAndPassword)}
        className={cn('flex flex-col gap-4', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <PasswordField
                  id="password"
                  placeholder="********"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          isLoading={form.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          Login
        </Button>
      </form>
    </Form>
  )
}
