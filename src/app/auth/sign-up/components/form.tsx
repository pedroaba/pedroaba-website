'use client'

import { useRouter } from '@bprogress/next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Tooltip } from '@pedroaba/components/tooltip'
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
import { cn } from '@pedroaba/lib/utils'
import { CircleAlertIcon, Loader } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpFormSchema = z
  .object({
    name: z
      .string({
        error: 'Name is required',
      })
      .min(1, { message: 'Name is required' }),
    email: z.email({
      message: 'Invalid email address',
    }),
    organization: z
      .string({
        error: 'Organization is required',
      })
      .min(1, { message: 'Organization is required' }),
    password: z
      .string({
        error: 'Password is required',
      })
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z
      .string({
        error: 'Confirm password is required',
      })
      .min(8, {
        message: 'Confirm password must be at least 8 characters long',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword', 'password'],
    message: 'Passwords do not match',
  })

type Schema = z.infer<typeof signUpFormSchema>

type SignUpFormProps = Omit<ComponentProps<'form'>, 'onSubmit'>

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const form = useForm<Schema>({
    resolver: zodResolver(signUpFormSchema),
  })

  const router = useRouter()

  async function handleSignUpWithEmailAndPassword(data: Schema) {
    console.log(data)

    router.push('/auth/sign-in')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignUpWithEmailAndPassword)}
        className={cn('flex flex-col gap-4', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
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
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="organization">
                Organization
                <Tooltip content="This is the organization you will be associated with. It will be used to identify you in the system.">
                  <CircleAlertIcon className="size-3.5" />
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Input
                  id="organization"
                  type="text"
                  placeholder="Your organization e.g. pedroaba tech"
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <PasswordField
                  id="confirmPassword"
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
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Loader className="size-4 animate-spin" />
          )}
          Sign up
        </Button>
      </form>
    </Form>
  )
}
