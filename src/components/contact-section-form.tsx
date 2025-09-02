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
      message: 'Nome é obrigatório',
    })
    .min(1, { message: 'Nome é obrigatório' }),
  email: z.email({ message: 'Endereço de email inválido' }),
  subject: z
    .string({
      message: 'Assunto é obrigatório',
    })
    .min(1, { message: 'Assunto é obrigatório' }),
  message: z
    .string({
      message: 'Mensagem é obrigatória',
    })
    .min(1, { message: 'Mensagem é obrigatória' }),
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

    toast.success('Mensagem enviada com sucesso')
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
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Seu nome" />
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
                  <Input {...field} placeholder="Seu email" />
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
              <FormLabel>Assunto</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Colaboração de projeto, oportunidade de emprego ou apenas um olá?"
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
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-[100px]"
                  placeholder="Compartilhe os detalhes do seu projeto, cronograma, orçamento ou apenas me diga o que está na sua mente..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" icon={Send} iconPosition="right">
          Enviar mensagem
        </Button>
      </form>
    </Form>
  )
}
