import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

type TanstackQueryClientProps = {
  children: ReactNode | ReactNode[]
}

export function TanstackQueryClient({ children }: TanstackQueryClientProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
