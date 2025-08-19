'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const schema = z.object({
  name: z
    .string({
      message: 'Name is required',
    })
    .min(1, { message: 'Name is required' }),
  email: z.email({ message: 'Invalid email address' }),
  subject: z
    .string({
      message: 'Subject is required',
    })
    .min(1, { message: 'Subject is required' }),
  message: z
    .string({
      message: 'Message is required',
    })
    .min(1, { message: 'Message is required' }),
})

type Schema = z.infer<typeof schema>

export function ContactSectionForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  function handleSendMessage(data: Schema) {
    const messageTemplate = `
    Name: ${data.name}\n
    Email: ${data.email}\n
    Subject: ${data.subject}\n
    Message: ${data.message}
    `.trim()

    const encodedMessage = encodeURIComponent(messageTemplate)
    const encodedSubject = encodeURIComponent(data.subject)

    window.open(
      `mailto:pedr.augustobarbosa.aparecido@gmail.com?subject=${encodedSubject}&body=${encodedMessage}`,
    )

    toast.success('Message sent successfully')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSendMessage)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your name" />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Project collaboration, job opportunity, or just hello?"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-[100px]"
                  placeholder="Share your project details, timeline, budget, or just tell me what's on your mind..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" icon={Send} iconPosition="right">
          Send Message
        </Button>
      </form>
    </Form>
  )
}
