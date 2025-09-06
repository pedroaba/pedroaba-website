'use client'

import { cn } from '@pedroaba/lib/utils'
import { Check, Copy } from 'lucide-react'
import { type ComponentProps, useRef, useState } from 'react'

import { Button } from './ui/button'

type CopyButtonProps = Omit<
  ComponentProps<typeof Button>,
  | 'icon'
  | 'iconPosition'
  | 'children'
  | 'onClick'
  | 'variant'
  | 'size'
  | 'isLoading'
> & {
  textToCopy?: string
}

export function CopyButton({
  className,
  textToCopy,
  ...props
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  function copyToClipboard() {
    try {
      let _textToCopy = textToCopy
      if (!_textToCopy) {
        _textToCopy = buttonRef.current?.parentNode?.textContent || ''
      }

      navigator.clipboard.writeText(_textToCopy)
      setIsCopied(true)
    } finally {
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn('relative ml-2 rounded-md', className)}
      aria-label={isCopied ? 'Copied' : 'Copy to clipboard'}
      onClick={copyToClipboard}
      ref={buttonRef}
      {...props}
    >
      <span className="sr-only">{isCopied ? 'Copied' : 'Copy'}</span>
      <Copy
        className={`h-4 w-4 transition-all duration-300 ${
          isCopied ? 'scale-0' : 'scale-100'
        }`}
      />
      <Check
        className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
          isCopied ? 'scale-100' : 'scale-0'
        }`}
      />
    </Button>
  )
}
