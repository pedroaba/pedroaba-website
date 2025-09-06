'use client'

import { useRouter } from '@bprogress/next'
import { deleteProjectAction } from '@pedroaba/actions/delete-project'
import { updateProjectStatusAction } from '@pedroaba/actions/update-project-status'
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
import { EntityStatusColors } from '@pedroaba/constants/entity-status'
import { cn } from '@pedroaba/lib/utils'
import { formatCentsToReal } from '@pedroaba/utils/format-cents-to-real'
import { invalidateCacheOnPages } from '@pedroaba/utils/invalidate-cache-on-pages'
import { type Project, ProjectStatus } from '@prisma/client'
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

import { ProjectEditModal } from './edit-modal'

type ProjectWithCalculatedValues = Omit<
  Project,
  'budget' | 'hourlyRate' | 'totalHours' | 'totalValue'
> & {
  budget: number
  hourlyRate: number
  totalHours: number
  totalValue: number
}

type ProjectTableProps = {
  projects: ProjectWithCalculatedValues[]
  totalPages: number
  totalProjects: number
}

export function ProjectTable({
  projects,
  totalPages,
  totalProjects,
}: ProjectTableProps) {
  const deleteAction = useServerAction(deleteProjectAction)
  const updateStatusAction = useServerAction(updateProjectStatusAction)

  const router = useRouter()
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const editModalRef = useRef<any>(null)

  async function handlePageChange(page: number) {
    setPage(page)

    try {
      await invalidatePageCache('/dashboard/projects')
    } finally {
      router.refresh()
    }
  }

  async function handleDeleteProject(projectId: string) {
    const [result, resultError] = await deleteAction.execute({
      projectId,
    })

    if (resultError) {
      console.error(resultError)
      toast.error('Error while deleting project')
      return
    }

    if (!result?.success) {
      toast.error(result?.message)
      return
    }

    toast.success(result.message)
    await invalidateCacheOnPages('/dashboard/projects', router.refresh)
  }

  async function handleUpdateProjectStatus(
    projectId: string,
    status: ProjectStatus,
  ) {
    const [result, resultError] = await updateStatusAction.execute({
      projectId,
      status,
    })

    if (resultError) {
      console.error(resultError)
      toast.error('Error while updating project status')
      return
    }

    if (!result?.success) {
      toast.error(result?.message)
      return
    }

    toast.success(result.message)
    await invalidateCacheOnPages('/dashboard/projects', router.refresh)
  }

  return (
    <div className="bg-background @container/table rounded-md border">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="divide-x">
              <TableHead>Name</TableHead>
              <TableHead className="max-w-40 truncate">Description</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Hourly Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Hours</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  <div className="flex flex-col items-center gap-2 py-20">
                    <Inbox className="size-10 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      No projects found
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {projects.map((project: ProjectWithCalculatedValues) => (
              <TableRow key={project.id} className="divide-x">
                <TableCell>{project.name}</TableCell>
                <TableCell className="max-w-40 truncate">
                  {project.description || '-'}
                </TableCell>
                <TableCell>
                  {project.budget ? formatCentsToReal(project.budget) : '-'}
                </TableCell>
                <TableCell>
                  {project.hourlyRate
                    ? formatCentsToReal(project.hourlyRate)
                    : '-'}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      'capitalize',
                      project.status === ProjectStatus.BACKLOG &&
                        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                      project.status === ProjectStatus.PLANNING &&
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                      project.status === ProjectStatus.TODO &&
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                      project.status === ProjectStatus.IN_PROGRESS &&
                        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
                      project.status === ProjectStatus.REVIEW &&
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
                      project.status === ProjectStatus.COMPLETED &&
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                      project.status === ProjectStatus.ON_HOLD &&
                        'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
                      project.status === ProjectStatus.CANCELLED &&
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                    )}
                  >
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.totalHours || '-'}</TableCell>
                <TableCell>
                  {project.totalValue
                    ? formatCentsToReal(project.totalValue)
                    : '-'}
                </TableCell>

                <TableCell>
                  <Badge
                    className={cn(
                      'capitalize',
                      EntityStatusColors[project.state],
                    )}
                  >
                    {project.state}
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
                          onClick={() => editModalRef.current.open(project)}
                        >
                          <Edit className="size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            editModalRef.current.open(project, true)
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
                              {Object.values(ProjectStatus)
                                .filter((status) => status !== project.status)
                                .map((status) => (
                                  <DropdownMenuItem
                                    key={status}
                                    className="capitalize"
                                    onClick={() =>
                                      handleUpdateProjectStatus(
                                        project.id,
                                        status,
                                      )
                                    }
                                  >
                                    {status}
                                    {project.status === status && (
                                      <Check className="size-4 ml-auto" />
                                    )}
                                  </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => handleDeleteProject(project.id)}
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
                    Page {page} of {totalPages} ({totalProjects} projects)
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

      <ProjectEditModal ref={editModalRef} />
    </div>
  )
}
