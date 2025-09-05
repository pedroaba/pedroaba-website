import { SystemConfig } from '@pedroaba/config/system'
import { prisma } from '@pedroaba/lib/prisma'
import { DecimalParser } from '@pedroaba/parsers/decimal'
import { EntityState, type Project, type ProjectStatus } from '@prisma/client'

import { ProjectFilter } from './components/filter'
import { ProjectTable } from './components/table'

type ClientsPageProps = {
  searchParams: Promise<{
    search?: string
    state?: EntityState
    status?: string
    page?: string
    limit?: string
  }>
}

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const {
    search,
    state = EntityState.ACTIVE,
    status = SystemConfig.ALL_STATUS_STRING_VALUE,
    page,
    limit = SystemConfig.DEFAULT_PAGE_LIMIT.toString(),
  } = await searchParams

  const pageNumber = page ? Number(page) : SystemConfig.DEFAULT_PAGE
  const pageLimit = limit ? Number(limit) : SystemConfig.DEFAULT_PAGE_LIMIT

  let projects: Project[] = []
  let totalPages = 0
  let totalProjects = 0
  try {
    projects = await prisma.project.findMany({
      where: {
        name: search
          ? {
              contains: search,
              mode: 'insensitive',
            }
          : undefined,
        state,
        status:
          status === SystemConfig.ALL_STATUS_STRING_VALUE
            ? undefined
            : (status as ProjectStatus),
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (pageNumber - 1) * pageLimit,
      take: pageLimit,
    })

    totalProjects = await prisma.project.count({
      where: {
        name: search
          ? {
              contains: search,
              mode: 'insensitive',
            }
          : undefined,
        state,
        status:
          status === SystemConfig.ALL_STATUS_STRING_VALUE
            ? undefined
            : (status as ProjectStatus),
      },
    })

    totalPages = Math.ceil(totalProjects / pageLimit)
  } catch {
    projects = []
    totalPages = 0
    totalProjects = 0
  }

  return (
    <div className="flex flex-col gap-4 @container h-fit">
      <div className="flex flex-row max-md:flex-col items-center max-md:items-start md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Here you can manage your projects. You can create, edit, and delete
            projects.
          </p>
        </div>
      </div>

      <ProjectFilter />
      <ProjectTable
        projects={projects.map((project) => ({
          ...project,
          budget: project.budget ? DecimalParser.toNumber(project.budget) : 0,
          hourlyRate: project.hourlyRate
            ? DecimalParser.toNumber(project.hourlyRate)
            : 0,
          totalHours: project.totalHours
            ? DecimalParser.toNumber(project.totalHours)
            : 0,
          totalValue: project.totalValue
            ? DecimalParser.toNumber(project.totalValue)
            : 0,
        }))}
        totalPages={totalPages}
        totalProjects={totalProjects}
      />
    </div>
  )
}
