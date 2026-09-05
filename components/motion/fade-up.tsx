'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeUp, staggerContainer, VIEWPORT } from '@/lib/motion'

type FadeUpProps = HTMLMotionProps<'div'> & {
  delay?: number
  animateOnMount?: boolean
}

export function FadeUp({ delay = 0, animateOnMount = false, ...props }: FadeUpProps) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      {...(animateOnMount ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT })}
      {...props}
    />
  )
}

type StaggerProps = HTMLMotionProps<'div'> & {
  stagger?: number
  delay?: number
}

export function Stagger({ stagger = 0.1, delay = 0, ...props }: StaggerProps) {
  return (
    <motion.div
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...props}
    />
  )
}

export function StaggerItem(props: HTMLMotionProps<'div'>) {
  return <motion.div variants={fadeUp} {...props} />
}
