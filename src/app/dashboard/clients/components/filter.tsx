'use client'

import { useRouter } from '@bprogress/next'
import { useDebouncedCallback } from '@mantine/hooks'
import { FieldContainer } from '@pedroaba/components/field-container'
import { Button } from '@pedroaba/components/ui/button'
import { Input } from '@pedroaba/components/ui/input'
import { Label } from '@pedroaba/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@pedroaba/components/ui/select'
import { invalidateCacheOnPages } from '@pedroaba/utils/invalidate-cache-on-pages'
import { ClientStatus, EntityState } from '@prisma/client'
import { BrushCleaning } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { useState } from 'react'

import { ClientCreationModal } from './creation-modal'

export function ClientFilter() {
  const [searchCache, setSearchCache] = useState('')
  const [, setSearch] = useQueryState('search', parseAsString.withDefault(''))
  const [state, setState] = useQueryState(
    'state',
    parseAsString.withDefault(EntityState.ACTIVE),
  )
  const [status, setStatus] = useQueryState(
    'status',
    parseAsString.withDefault(ClientStatus.ACTIVE),
  )

  const router = useRouter()

  const handleSearch = useDebouncedCallback(async (value: string) => {
    setSearch(value)

    await invalidateCacheOnPages('/dashboard/clients', router.refresh)
  }, 300)

  async function handleStateChange(value: string) {
    setState(value)
    await invalidateCacheOnPages('/dashboard/clients', router.refresh)
  }

  async function handleStatusChange(value: string) {
    setStatus(value)
    await invalidateCacheOnPages('/dashboard/clients', router.refresh)
  }

  async function handleClearFilters() {
    setSearch('')
    setState(EntityState.ACTIVE)
    setStatus(ClientStatus.ACTIVE)

    await invalidateCacheOnPages('/dashboard/clients', router.refresh)
  }

  return (
    <div className="@container/filter flex items-end gap-2 @justify-between flex-col md:flex-row">
      <div className="flex gap-2 items-end flex-col md:flex-row w-full">
        <FieldContainer className="w-full md:w-1/2">
          <Label>Name</Label>
          <Input
            placeholder="Search by name"
            className="w-full"
            value={searchCache}
            onChange={(e) => {
              setSearchCache(e.target.value)
              handleSearch(e.target.value)
            }}
          />
        </FieldContainer>
        <FieldContainer className="w-full md:w-1/2">
          <Label>Status</Label>
          <Select onValueChange={handleStatusChange} value={status}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ClientStatus.ACTIVE}>Active</SelectItem>
              <SelectItem value={ClientStatus.INACTIVE}>Inactive</SelectItem>
              <SelectItem value={ClientStatus.POTENTIAL}>Potential</SelectItem>
              <SelectItem value={ClientStatus.ARCHIVED}>Archived</SelectItem>
            </SelectContent>
          </Select>
        </FieldContainer>
        <FieldContainer className="w-full md:w-1/2">
          <Label>State</Label>
          <Select onValueChange={handleStateChange} value={state}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EntityState.ACTIVE}>Active</SelectItem>
              <SelectItem value={EntityState.DELETED}>Deleted</SelectItem>
            </SelectContent>
          </Select>
        </FieldContainer>

        {(searchCache ||
          state !== EntityState.ACTIVE ||
          status !== ClientStatus.ACTIVE) && (
          <Button
            icon={BrushCleaning}
            className="w-full md:w-auto"
            onClick={handleClearFilters}
          >
            Clear filters
          </Button>
        )}
      </div>

      <ClientCreationModal />
    </div>
  )
}
