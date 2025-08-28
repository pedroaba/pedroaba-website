'use client'

import { useRouter } from '@bprogress/next'
import { deleteClientAction } from '@pedroaba/actions/delete-client'
import { updateClientStatusAction } from '@pedroaba/actions/update-client-status'
import { invalidatePageCache } from '@pedroaba/actions/utils/invalidate-page-cache'
import { Badge } from '@pedroaba/components/ui/badge'
import { Button } from '@pedroaba/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@pedroaba/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@pedroaba/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@pedroaba/components/ui/table'
import { cn } from '@pedroaba/lib/utils'
import { invalidateCacheOnPages } from '@pedroaba/utils/invalidate-cache-on-pages'
import { type Client, ClientStatus } from '@prisma/client'
import {
  Check,
  ChevronLeftIcon,
  ChevronRightIcon,
  Edit,
  Ellipsis,
  Inbox,
  NotebookPen,
  Trash,
  View,
} from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useRef } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

import { ClientEditModal } from './edit-modal'

// import { ClientEditModal } from './edit-modal'

type ClientTableProps = {
  clients: Client[]
  totalPages: number
  totalClients: number
}

export function ClientTable({
  clients,
  totalPages,
  totalClients,
}: ClientTableProps) {
  const deleteAction = useServerAction(deleteClientAction)
  const updateStatusAction = useServerAction(updateClientStatusAction)

  const router = useRouter()
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const editModalRef = useRef<any>(null)

  async function handlePageChange(page: number) {
    setPage(page)

    try {
      await invalidatePageCache('/dashboard/clients')
    } finally {
      router.refresh()
    }
  }

  async function handleDeleteClient(clientId: string) {
    const [result, resultError] = await deleteAction.execute({
      clientId,
    })

    if (resultError) {
      console.error(resultError)
      toast.error('Error while deleting client')
      return
    }

    if (!result?.success) {
      toast.error(result?.message)
      return
    }

    toast.success(result.message)
    await invalidateCacheOnPages('/dashboard/clients', router.refresh)
  }

  async function handleUpdateClientStatus(
    clientId: string,
    status: ClientStatus,
  ) {
    const [result, resultError] = await updateStatusAction.execute({
      clientId,
      status,
    })

    if (resultError) {
      console.error(resultError)
      toast.error('Error while updating client status')
      return
    }

    if (!result?.success) {
      toast.error(result?.message)
      return
    }

    toast.success(result.message)
    await invalidateCacheOnPages('/dashboard/clients', router.refresh)
  }

  return (
    <div className="bg-background @container/table rounded-md border">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="divide-x">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tax ID</TableHead>
              <TableHead>Tax Name</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  <div className="flex flex-col items-center gap-2 py-20">
                    <Inbox className="size-10 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      No clients found
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {clients.map((client: Client) => (
              <TableRow key={client.id} className="divide-x">
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email || '-'}</TableCell>
                <TableCell>{client.phone || '-'}</TableCell>
                <TableCell>{client.company || '-'}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      'capitalize',
                      client.status === 'ACTIVE' && 'bg-green-500',
                      client.status === 'INACTIVE' && 'bg-yellow-500',
                      client.status === 'POTENTIAL' && 'bg-blue-500',
                      client.status === 'ARCHIVED' && 'bg-gray-500',
                    )}
                  >
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>{client.taxId || '-'}</TableCell>
                <TableCell>{client.taxName || '-'}</TableCell>

                <TableCell>
                  <Badge
                    className={cn(
                      'capitalize',
                      client.state === 'ACTIVE' && 'bg-green-500',
                      client.state === 'DELETED' && 'bg-red-500',
                    )}
                  >
                    {client.state}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" icon={Ellipsis} size="icon">
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => editModalRef.current.open(client)}
                        >
                          <Edit className="size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            editModalRef.current.open(client, true)
                          }
                        >
                          <View className="size-4" />
                          View
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <NotebookPen className="size-4 text-muted-foreground" />
                            <span className="mx-2">Update Status</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent sideOffset={10}>
                              {Object.values(ClientStatus)
                                .filter((status) => status !== client.status)
                                .map((status) => (
                                  <DropdownMenuItem
                                    key={status}
                                    className="capitalize"
                                    onClick={() =>
                                      handleUpdateClientStatus(
                                        client.id,
                                        status,
                                      )
                                    }
                                  >
                                    {status}
                                    {client.status === status && (
                                      <Check className="size-4 ml-auto" />
                                    )}
                                  </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          <Trash className="size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8}>
                <div className="flex items-center gap-2 justify-start">
                  <span>
                    Page {page} of {totalPages} ({totalClients} clients)
                  </span>
                </div>
              </TableCell>
              <TableCell colSpan={1} className="flex justify-end">
                <div className="flex items-center gap-2 justify-end">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePageChange(page - 1)}
                          disabled={page === 1 || totalPages === 0}
                        >
                          <ChevronLeftIcon className="size-4" />
                        </Button>
                      </PaginationItem>

                      <PaginationItem>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePageChange(page + 1)}
                          disabled={page === totalPages || totalPages === 0}
                        >
                          <ChevronRightIcon className="size-4" />
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <ClientEditModal ref={editModalRef} />
    </div>
  )
}
