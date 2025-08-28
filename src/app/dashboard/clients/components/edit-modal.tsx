import { useRouter } from '@bprogress/next'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateClientAction } from '@pedroaba/actions/update-client'
import { Button } from '@pedroaba/components/ui/button'
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
import { invalidateCacheOnPages } from '@pedroaba/utils/invalidate-cache-on-pages'
import type { Client } from '@prisma/client'
import { Save, XIcon } from 'lucide-react'
import { type RefObject, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { useServerAction } from 'zsa-react'

const schema = z.object({
  name: z
    .string({
      message: 'Name is required',
    })
    .min(1, {
      message: 'Name is required',
    }),
  email: z.string().email({ message: 'Invalid email' }).optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  taxId: z.string().optional(),
  taxName: z.string().optional(),
})

type Schema = z.infer<typeof schema>

type ClientEditModalProps = {
  ref?: RefObject<any>
}

export function ClientEditModal({ ref }: ClientEditModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()
  const action = useServerAction(updateClientAction)

  const [clientId, setClientId] = useState<string | null>(null)
  const [isOnlyRead, setIsOnlyRead] = useState(false)

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      address: '',
      notes: '',
      taxId: '',
      taxName: '',
    },
  })

  const router = useRouter()

  async function handleUpdateClient(data: Schema) {
    const [result, resultError] = await action.execute({
      clientId: clientId,
      ...data,
    })

    if (resultError) {
      toast.error('Error while updating client')
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
      email: '',
      phone: '',
      company: '',
      website: '',
      address: '',
      notes: '',
      taxId: '',
      taxName: '',
    })

    await invalidateCacheOnPages('/dashboard/clients', router.refresh)
  }

  useImperativeHandle(ref, () => ({
    open: (client: Client, isOnlyRead: boolean = false) => {
      setIsOnlyRead(isOnlyRead)
      setClientId(client.id)
      setIsOpen(true)
      form.reset({
        name: client.name,
        email: client.email ?? '',
        phone: client.phone ?? '',
        company: client.company ?? '',
        website: client.website ?? '',
        address: client.address ?? '',
        notes: client.notes ?? '',
        taxId: client.taxId ?? '',
        taxName: client.taxName ?? '',
      })

      form.setValue('name', client.name)
      form.setValue('email', client.email ?? '')
      form.setValue('phone', client.phone ?? '')
      form.setValue('company', client.company ?? '')
      form.setValue('website', client.website ?? '')
      form.setValue('address', client.address ?? '')
      form.setValue('notes', client.notes ?? '')
      form.setValue('taxId', client.taxId ?? '')
      form.setValue('taxName', client.taxName ?? '')
    },
    close: () => setIsOpen(false),
  }))

  const FormComp = (
    <Form {...form}>
      <form
        id="edit-client-form"
        onSubmit={form.handleSubmit(handleUpdateClient)}
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
                  placeholder="e.g. John Doe"
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isOnlyRead}
                  placeholder="e.g. john.doe@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isOnlyRead}
                  placeholder="e.g. +1234567890"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isOnlyRead}
                  placeholder="e.g. John Doe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isOnlyRead}
                    placeholder="e.g. https://www.example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isOnlyRead}
                    placeholder="e.g. 123 Main St, Anytown, USA"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isOnlyRead}
                    placeholder="e.g. 1234567890"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isOnlyRead}
                    placeholder="e.g. John Doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isOnlyRead}
                  placeholder="e.g. This is a note"
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
            <DrawerTitle className="text-left">New Client</DrawerTitle>
            <DrawerDescription className="text-left">
              Add a new client to organize and manage your projects more
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
                form="edit-client-form"
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
            Edit Client
            <DialogClose asChild>
              <Button variant="outline" icon={XIcon} size="icon" />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Edit a client to organize and manage your projects more efficiently.
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
              form="edit-client-form"
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
