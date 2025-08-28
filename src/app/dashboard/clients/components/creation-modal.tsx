'use client'

import { useRouter } from '@bprogress/next'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClientAction } from '@pedroaba/actions/create-client'
import { Button } from '@pedroaba/components/ui/button'
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
import { invalidateCacheOnPages } from '@pedroaba/utils/invalidate-cache-on-pages'
import { CirclePlus, XIcon } from 'lucide-react'
import { useState } from 'react'
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

export function ClientCreationModal() {
  const action = useServerAction(createClientAction)

  const [isOpen, setIsOpen] = useState(false)

  const isMobile = useIsMobile()
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()

  async function handleCreateClient(data: Schema) {
    const [result, resultError] = await action.execute(data)

    if (resultError) {
      toast.error('Error while creating client')
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

  const FormComp = (
    <Form {...form}>
      <form
        id="create-client-form"
        onSubmit={form.handleSubmit(handleCreateClient)}
        className="overflow-y-auto max-h-full px-6 py-4 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. John Doe" />
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
                <Input {...field} placeholder="e.g. john.doe@example.com" />
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
                <Input {...field} placeholder="e.g. +1234567890" />
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
                <Input {...field} placeholder="e.g. John Doe" />
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
                  <Input {...field} placeholder="e.g. 1234567890" />
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
                  <Input {...field} placeholder="e.g. John Doe" />
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
                <Textarea {...field} placeholder="e.g. This is a note" />
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
            New Client
          </Button>
        </DrawerTrigger>

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
          New Client
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="flex flex-col gap-0 p-0 overflow-y-visible sm:max-w-lg [&>button:last-child]:top-3.5 w-screen"
      >
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base flex items-center justify-between">
            New Client
            <DialogClose asChild>
              <Button variant="outline" icon={XIcon} size="icon" />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Add a new client to organize and manage your projects more
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
            form="create-client-form"
            isLoading={form.formState.isSubmitting}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
