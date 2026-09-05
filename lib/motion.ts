import type { Variants } from 'framer-motion'

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
}

export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})
