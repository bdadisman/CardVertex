'use client'

import { Fragment } from 'react'
import { motion, type Variants } from 'framer-motion'
import { VIEWPORT } from '@/lib/motion'

const container: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
}

const word: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { type: 'spring', stiffness: 110, damping: 20, mass: 0.9 },
  },
}

type MaskedTextProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
  animateOnMount?: boolean
}

export function MaskedText({
  text,
  as: Tag = 'h2',
  className,
  delay = 0,
  animateOnMount = false,
}: MaskedTextProps) {
  const words = text.split(' ')

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        variants={container}
        custom={delay}
        initial="hidden"
        {...(animateOnMount
          ? { animate: 'visible' }
          : { whileInView: 'visible', viewport: VIEWPORT })}
      >
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span className="inline-block will-change-transform" variants={word}>
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  )
}

export function maskedTextDuration(text: string) {
  return text.split(' ').length * 0.06 + 0.45
}
