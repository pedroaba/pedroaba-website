'use client'

import { ArrowDown } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  function handleRedirectToAboutSection() {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const threshold = 100

      setIsVisible(scrollTop < threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div
      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
      onClick={handleRedirectToAboutSection}
    >
      <div className="size-10 border-2 border-muted-foreground/30 rounded-full flex justify-center items-center">
        <div className="rounded-full animate-pulse flex items-center justify-center group">
          <ArrowDown className="size-6 text-muted-foreground group-hover:text-muted-foreground transition-colors" />
        </div>
      </div>
    </div>
  )
}
