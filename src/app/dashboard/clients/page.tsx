import { SystemConfig } from '@pedroaba/config/system'
import { prisma } from '@pedroaba/lib/prisma'
import { type Client, ClientStatus, EntityState } from '@prisma/client'

import { ClientFilter } from './components/filter'
import { ClientTable } from './components/table'

type ClientsPageProps = {
  searchParams: Promise<{
    search?: string
    state?: EntityState
    status?: ClientStatus
    page?: string
    limit?: string
  }>
}

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const {
    search,
    state = EntityState.ACTIVE,
    status = ClientStatus.ACTIVE,
    page,
    limit = SystemConfig.DEFAULT_PAGE_LIMIT.toString(),
  } = await searchParams

  const pageNumber = page ? Number(page) : SystemConfig.DEFAULT_PAGE
  const pageLimit = limit ? Number(limit) : SystemConfig.DEFAULT_PAGE_LIMIT

  let clients: Client[] = []
  let totalPages = 0
  let totalClients = 0
  try {
    clients = await prisma.client.findMany({
      where: {
        name: search
          ? {
              contains: search,
              mode: 'insensitive',
            }
          : undefined,
        state,
        status,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (pageNumber - 1) * pageLimit,
      take: pageLimit,
    })

    totalClients = await prisma.client.count({
      where: {
        name: search
          ? {
              contains: search,
              mode: 'insensitive',
            }
          : undefined,
        state,
        status,
      },
    })

    totalPages = Math.ceil(totalClients / pageLimit)
  } catch {
    clients = []
    totalPages = 0
    totalClients = 0
  }

  return (
    <div className="flex flex-col gap-4 @container h-fit">
      <div className="flex flex-row max-md:flex-col items-center max-md:items-start md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-sm text-muted-foreground">
            Here you can manage your clients. You can create, edit, and delete
            clients.
          </p>
        </div>
      </div>

      <ClientFilter />
      <ClientTable
        clients={clients}
        totalPages={totalPages}
        totalClients={totalClients}
      />
    </div>
  )
}
