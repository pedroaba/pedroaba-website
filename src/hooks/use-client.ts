import { listClientAction } from '@pedroaba/actions/list-client'
import { QueryBuilder } from '@pedroaba/utils/query-builder'
import { returnsDefaultQueryList } from '@pedroaba/utils/returns-default-query-list'
import { useQuery } from '@tanstack/react-query'
import { useServerAction } from 'zsa-react'

type UseClientParams = {
  name?: string
}

export function useClient(params: UseClientParams) {
  const action = useServerAction(listClientAction)
  return useQuery({
    queryKey: QueryBuilder.client().list(params.name ?? ''),
    queryFn: async () => {
      const [result, resultError] = await action.execute({
        name: params.name ?? '',
      })

      if (resultError) {
        return returnsDefaultQueryList({
          data: [],
          success: false,
        })
      }

      return returnsDefaultQueryList({
        data: result?.others?.clients,
        success: result?.success,
      })
    },
  })
}
