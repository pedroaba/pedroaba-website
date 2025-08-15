import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipTrigger,
} from '@pedroaba/components/ui/tooltip'
import { cn } from '@pedroaba/lib/utils'
import { AlertCircleIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react'

export enum TooltipType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive> & {
  children: React.ReactNode
  content: React.ReactNode | string
  type?: TooltipType
}

const mapTooltipIcon = {
  [TooltipType.INFO]: <InfoIcon className="size-5 text-white" />,
  [TooltipType.WARNING]: <AlertTriangleIcon className="size-5 text-white" />,
  [TooltipType.ERROR]: <AlertCircleIcon className="size-5 text-white" />,
}

export function Tooltip({
  children,
  content,
  type: tooltipType = TooltipType.INFO,
  ...props
}: TooltipProps) {
  const Icon = mapTooltipIcon[tooltipType] ?? <InfoIcon className="size-4" />

  return (
    <TooltipPrimitive {...props}>
      <TooltipTrigger
        asChild
        className={cn(
          tooltipType === TooltipType.INFO && 'cursor-help',
          tooltipType === TooltipType.WARNING && 'cursor-default',
          tooltipType === TooltipType.ERROR && 'cursor-default',
        )}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent className="flex items-stretch p-0 text-primary-foreground">
        <div className="bg-primary w-10 px-2 rounded-l-md self-stretch flex items-center justify-center">
          {Icon}
        </div>

        <div className="bg-accent p-2 text-sm text-balance rounded-r-md text-foreground max-w-xs">
          {content}
        </div>
      </TooltipContent>
    </TooltipPrimitive>
  )
}
