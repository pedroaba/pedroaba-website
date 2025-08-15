import { cn } from '@pedroaba/lib/utils'
import type { ComponentProps } from 'react'

type FieldContainerProps = ComponentProps<'div'>

export function FieldContainer({ className, ...props }: FieldContainerProps) {
  return <div className={cn('flex flex-col gap-1.5', className)} {...props} />
}
