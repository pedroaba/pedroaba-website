'use client'

import { type HTMLMotionProps, motion } from 'framer-motion'
import * as React from 'react'

export type AnimationDivProps = HTMLMotionProps<'div'>

/**
 * AnimationDiv
 * - Thin wrapper around motion.div (Framer Motion v12)
 * - React 19 compatible
 * - Forwards ref and accepts all motion.div props
 * - Respects prefers-reduced-motion or disableAnimation
 */
export const AnimationDiv = React.forwardRef<HTMLDivElement, AnimationDivProps>(
  ({ ...props }, ref) => {
    return <motion.div ref={ref} {...props} />
  },
)
AnimationDiv.displayName = 'AnimationDiv'
