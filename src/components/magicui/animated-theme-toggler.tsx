'use client'

import { cn } from '@pedroaba/lib/utils'
import { Check, Moon, SunDim } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRef } from 'react'
import { flushSync } from 'react-dom'

import { Button } from '../ui/button'
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '../ui/dropdown-menu'

type AnimatedThemeTogglerProps = {
  className?: string
  asDropdownMenuItem?: boolean
  text?: string
}

export const AnimatedThemeToggler = ({
  className,
  asDropdownMenuItem,
  text,
}: AnimatedThemeTogglerProps) => {
  const { theme, setTheme } = useTheme()

  const buttonRef = useRef<HTMLButtonElement | null>(null)
  async function changeTheme() {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const y = top + height / 2
    const x = left + width / 2

    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  }

  if (asDropdownMenuItem) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          {theme === 'dark' ? (
            <SunDim className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
          <span className="ml-2">Theme</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent sideOffset={10}>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
              {theme === 'dark' && <Check className="size-4 ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
              {theme === 'light' && <Check className="size-4 ml-auto" />}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    )
  }

  return (
    <Button
      variant="outline"
      size={text ? 'default' : 'icon'}
      ref={buttonRef}
      onClick={changeTheme}
      className={cn('cursor-pointer', text && '[&_svg]:m-0 w-full', className)}
    >
      {theme === 'dark' ? (
        <SunDim className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
      {text && <span className="">{text}</span>}
    </Button>
  )
}
