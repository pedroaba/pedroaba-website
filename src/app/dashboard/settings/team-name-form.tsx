'use client'

import { changeOrCreateOrganizationAction } from '@pedroaba/actions/change-or-create-organization'
import { Input } from '@pedroaba/components/ui/input'
import { type FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

type TeamNameFormProps = {
  defaultValue?: string
  organizationId?: string
}

export function TeamNameForm({
  defaultValue = '',
  organizationId,
}: TeamNameFormProps) {
  const [teamName, setTeamName] = useState(defaultValue)
  const { execute, isPending } = useServerAction(
    changeOrCreateOrganizationAction,
  )

  async function handleUpdateTeamName(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmedTeamName = teamName.trim()
    if (trimmedTeamName.length === 0) {
      toast.error('Team name is required')
      return
    }

    toast.loading('Updating team name...', {
      id: 'update-team-name',
    })
    const [result, resultError] = await execute({
      name: trimmedTeamName,
      organizationId,
    })

    if (resultError) {
      toast.error('Error while updating team name', {
        id: 'update-team-name',
      })
      return
    }

    if (!result?.success) {
      toast.error(result?.message, {
        id: 'update-team-name',
      })
      return
    }

    toast.success(result.message, {
      id: 'update-team-name',
    })
  }

  return (
    <form id="settings-team-name-form" onSubmit={handleUpdateTeamName}>
      <Input
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="bg-muted/50"
        maxLength={32}
        disabled={isPending}
        placeholder="Type your team name"
      />
    </form>
  )
}
