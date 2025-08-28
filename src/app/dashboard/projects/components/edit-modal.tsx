import { useRouter } from '@bprogress/next'
import { zodResolver } from '@hookform/resolvers/zod'
import { listClientAction } from '@pedroaba/actions/list-client'
import { updateProjectAction } from '@pedroaba/actions/update-project'
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
} from '@pedroaba/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
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
import type { Client, Project } from '@prisma/client'
import { Save, XIcon } from 'lucide-react'
import { type RefObject, useEffect, useImperativeHandle, useState } from 'react'
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

type ProjectEditModalProps = {
  ref?: RefObject<any>
}

export function ProjectEditModal({ ref }: ProjectEditModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()
  const action = useServerAction(updateProjectAction)

  const [projectId, setProjectId] = useState<string | null>(null)
  const [isOnlyRead, setIsOnlyRead] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const listClients = useServerAction(listClientAction)

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      clientId: '',
    },
  })

  const router = useRouter()

  async function handleUpdateProject(data: Schema) {
    const [result, resultError] = await action.execute({
      ...data,
      projectId,
      clientId: formatComboboxValue(data.clientId),
    })

    if (resultError) {
      toast.error('Error while updating project')
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

  useImperativeHandle(ref, () => ({
    open: (project: Project, isOnlyRead: boolean = false) => {
      setIsOnlyRead(isOnlyRead)
      setProjectId(project.id)
      setIsOpen(true)
      form.reset({
        name: project.name,
        description: project.description ?? '',
        clientId: project.clientId ?? '',
      })

      form.setValue('name', project.name)
      form.setValue('description', project.description ?? '')
      form.setValue('clientId', project.clientId ?? '')
    },
    close: () => setIsOpen(false),
  }))

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
        id="edit-project-form"
        onSubmit={form.handleSubmit(handleUpdateProject)}
        className="overflow-y-auto max-h-full px-6 py-4 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isOnlyRead}
                  placeholder="e.g. Project Name"
                />
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
                  disabled
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
                <Textarea
                  {...field}
                  disabled={isOnlyRead}
                  placeholder="e.g. This is a description"
                />
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
        <DrawerContent className="flex flex-col gap-0 p-0 overflow-y-visible [&>button:last-child]:top-3.5 w-screen">
          <DrawerHeader className="px-6">
            <DrawerTitle className="text-left">Edit Project</DrawerTitle>
            <DrawerDescription className="text-left">
              Edit a project to organize and manage your projects more
              efficiently.
            </DrawerDescription>
          </DrawerHeader>

          {FormComp}

          <DrawerFooter>
            <DrawerClose asChild>
              <Button disabled={form.formState.isSubmitting} variant="outline">
                {isOnlyRead ? 'Close' : 'Cancel'}
              </Button>
            </DrawerClose>

            {!isOnlyRead && (
              <Button
                type="submit"
                form="edit-project-form"
                isLoading={form.formState.isSubmitting}
                icon={Save}
              >
                Save
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col gap-0 p-0 overflow-y-visible sm:max-w-lg [&>button:last-child]:top-3.5 w-screen"
      >
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base flex items-center justify-between">
            Edit Project
            <DialogClose asChild>
              <Button variant="outline" icon={XIcon} size="icon" />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Edit a project to organize and manage your projects more efficiently.
        </DialogDescription>

        {FormComp}

        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button disabled={form.formState.isSubmitting} variant="outline">
              {isOnlyRead ? 'Close' : 'Cancel'}
            </Button>
          </DialogClose>

          {!isOnlyRead && (
            <Button
              type="submit"
              form="edit-project-form"
              isLoading={form.formState.isSubmitting}
              icon={Save}
            >
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
