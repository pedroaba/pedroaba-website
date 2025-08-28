'use client'

import { useRouter } from '@bprogress/next'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProjectAction } from '@pedroaba/actions/create-project'
import { listClientAction } from '@pedroaba/actions/list-client'
import { Button } from '@pedroaba/components/ui/button'
import { Combobox } from '@pedroaba/components/ui/combobox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@pedroaba/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@pedroaba/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@pedroaba/components/ui/form'
import { Input } from '@pedroaba/components/ui/input'
import { Textarea } from '@pedroaba/components/ui/textarea'
import { useIsMobile } from '@pedroaba/hooks/use-mobile'
import { formatComboboxValue } from '@pedroaba/utils/format-combobox-value'
import { invalidateCacheOnPages } from '@pedroaba/utils/invalidate-cache-on-pages'
import type { Client } from '@prisma/client'
import { CirclePlus, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { useServerAction } from 'zsa-react'

const schema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  description: z.string().optional(),
  clientId: z.string().min(1, {
    message: 'Client is required',
  }),
})

type Schema = z.infer<typeof schema>

export function ProjectCreationModal() {
  const action = useServerAction(createProjectAction)
  const listClients = useServerAction(listClientAction)

  const [isOpen, setIsOpen] = useState(false)
  const [clients, setClients] = useState<Client[]>([])

  const isMobile = useIsMobile()
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      clientId: '',
    },
  })

  const router = useRouter()

  async function handleCreateProject(data: Schema) {
    const [result, resultError] = await action.execute({
      ...data,
      clientId: formatComboboxValue(data.clientId),
    })

    if (resultError) {
      toast.error('Error while creating project')
      return
    }

    if (!result?.success) {
      toast.error(result?.message)
      return
    }

    setIsOpen(false)

    toast.success(result.message)
    form.reset({
      name: '',
      description: '',
      clientId: '',
    })

    await invalidateCacheOnPages('/dashboard/projects', router.refresh)
  }

  useEffect(() => {
    async function fetchClients() {
      const [result, resultError] = await listClients.execute()

      if (resultError) {
        toast.error('Error while listing clients')
      }

      if (result?.success) {
        setClients(result.others.clients)
      }
    }

    fetchClients()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const FormComp = (
    <Form {...form}>
      <form
        id="create-project-form"
        onSubmit={form.handleSubmit(handleCreateProject)}
        className="overflow-y-auto max-h-full px-6 py-4 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Project Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <FormControl>
                <Combobox
                  options={clients.map((client) => ({
                    id: client.id,
                    value: client.name.toLowerCase(),
                    label: client.name,
                  }))}
                  placeholder="Select a client"
                  label="Client"
                  isLoading={listClients.isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="e.g. This is a description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button className="w-full" icon={CirclePlus}>
            New Project
          </Button>
        </DrawerTrigger>

        <DrawerContent className="flex flex-col gap-0 p-0 overflow-y-visible [&>button:last-child]:top-3.5 w-screen">
          <DrawerHeader className="px-6">
            <DrawerTitle className="text-left">New Project</DrawerTitle>
            <DrawerDescription className="text-left">
              Add a new project to organize and manage your projects more
              efficiently.
            </DrawerDescription>
          </DrawerHeader>

          {FormComp}

          <DrawerFooter>
            <DrawerClose asChild>
              <Button disabled={form.formState.isSubmitting} variant="outline">
                Cancel
              </Button>
            </DrawerClose>

            <Button
              type="submit"
              form="create-client-form"
              isLoading={form.formState.isSubmitting}
            >
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button icon={CirclePlus} className="ml-auto">
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="flex flex-col gap-0 p-0 overflow-y-visible sm:max-w-lg [&>button:last-child]:top-3.5 w-screen"
      >
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base flex items-center justify-between">
            New Project
            <DialogClose asChild>
              <Button variant="outline" icon={XIcon} size="icon" />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Add a new project to organize and manage your projects more
          efficiently.
        </DialogDescription>

        {FormComp}

        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button disabled={form.formState.isSubmitting} variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            form="create-project-form"
            isLoading={form.formState.isSubmitting}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
