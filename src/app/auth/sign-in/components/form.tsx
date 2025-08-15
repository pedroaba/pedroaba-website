'use client'

import { FieldContainer } from '@pedroaba/components/field-container'
import { Button } from '@pedroaba/components/ui/button'
import { Form } from '@pedroaba/components/ui/form'
import { Input } from '@pedroaba/components/ui/input'
import { Label } from '@pedroaba/components/ui/label'
import { cn } from '@pedroaba/lib/utils'
import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'

type LoginFormProps = Omit<ComponentProps<'form'>, 'onSubmit'>

export function LoginForm({ className, ...props }: LoginFormProps) {
  const form = useForm()

  async function handleSignInWithEmailAndPassword(data: any) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignInWithEmailAndPassword)}
        className={cn('flex flex-col gap-4', className)}
        {...props}
      >
        <FieldContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </FieldContainer>

        <FieldContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </FieldContainer>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  )
}
