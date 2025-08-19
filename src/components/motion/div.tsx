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
export function AnimationDiv({ ...props }: AnimationDivProps) {
  return <motion.div {...props} />
}
