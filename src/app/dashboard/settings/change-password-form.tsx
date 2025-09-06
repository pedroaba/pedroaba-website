'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordAction } from '@pedroaba/actions/change-password'
import { Button } from '@pedroaba/components/ui/button'
import { DialogClose, DialogFooter } from '@pedroaba/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@pedroaba/components/ui/form'
import { Input } from '@pedroaba/components/ui/input'
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react'
import { Save } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { useServerAction } from 'zsa-react'

const schema = z
  .object({
    password: z
      .string()
      .min(1, {
        message: 'Password is required',
      })
      .min(8, {
        message: 'Password must be at least 8 characters',
      })
      .max(20, {
        message: 'Password must be less than 20 characters',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least 1 number',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least 1 lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least 1 uppercase letter',
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least 1 special character',
      }),
    confirmPassword: z.string().min(1, {
      message: 'Confirm password is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

type Schema = z.infer<typeof schema>

export function ChangePasswordForm() {
  const action = useServerAction(changePasswordAction)
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible((prev) => !prev)

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[0-9]/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, text: 'At least 1 special character' },
    ]

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }))
  }

  const password = form.watch('password')
  const confirmPassword = form.watch('confirmPassword')
  const strength = checkStrength(password)

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length
  }, [strength])

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-border'
    if (score <= 1) return 'bg-red-500'
    if (score <= 2) return 'bg-orange-500'
    if (score === 3) return 'bg-amber-500'
    return 'bg-emerald-500'
  }

  const getStrengthText = (score: number) => {
    if (score === 0) return 'Enter a password'
    if (score <= 2) return 'Weak password'
    if (score === 3) return 'Medium password'
    return 'Strong password'
  }

  async function handleChangePassword(data: Schema) {
    const [result, resultError] = await action.execute({
      password: data.password,
    })

    toast.loading('Changing password...', {
      id: 'change-password',
    })

    if (resultError) {
      console.log(resultError)
      toast.error('Error while changing password', {
        id: 'change-password',
      })
      return
    }

    if (!result?.success) {
      toast.error(result?.message, {
        id: 'change-password',
      })
      return
    }

    toast.success(result.message, {
      id: 'change-password',
    })

    document.getElementById('change-password-close-button')?.click()
  }

  const FormComponent = (
    <Form {...form}>
      <form
        id="change-password-form"
        className="p-4 space-y-6"
        onSubmit={form.handleSubmit(handleChangePassword)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="pe-9"
                    placeholder="Enter your new password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    {...field}
                  />
                  <button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      isPasswordVisible ? 'Hide password' : 'Show password'
                    }
                  >
                    {isPasswordVisible ? (
                      <EyeOffIcon size={16} aria-hidden="true" />
                    ) : (
                      <EyeIcon size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password strength indicator */}
        {password && (
          <div className="space-y-3">
            <div
              className="bg-border h-1 w-full overflow-hidden rounded-full"
              role="progressbar"
              aria-valuenow={strengthScore}
              aria-valuemin={0}
              aria-valuemax={4}
              aria-label="Password strength"
            >
              <div
                className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                style={{ width: `${(strengthScore / 4) * 100}%` }}
              ></div>
            </div>

            <p className="text-foreground text-sm font-medium">
              {getStrengthText(strengthScore)}. Must contain:
            </p>

            <ul className="space-y-1.5" aria-label="Password requirements">
              {strength.map((req, index) => (
                <li key={index} className="flex items-center gap-2">
                  {req.met ? (
                    <CheckIcon
                      size={16}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <XIcon
                      size={16}
                      className="text-muted-foreground/80"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}
                  >
                    {req.text}
                    <span className="sr-only">
                      {req.met
                        ? ' - Requirement met'
                        : ' - Requirement not met'}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="pe-9"
                    placeholder="Enter your confirm new password"
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    {...field}
                  />
                  <button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={
                      isConfirmPasswordVisible
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeOffIcon size={16} aria-hidden="true" />
                    ) : (
                      <EyeIcon size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )

  return (
    <Fragment>
      {FormComponent}

      <DialogFooter className="border-t p-4">
        <DialogClose asChild>
          <Button variant="outline" disabled={action.isPending}>
            Cancel
          </Button>
        </DialogClose>

        <Button
          type="submit"
          form="change-password-form"
          icon={Save}
          isLoading={action.isPending}
          disabled={!password || !confirmPassword || strengthScore < 3}
        >
          Save
        </Button>
      </DialogFooter>
    </Fragment>
  )
}
