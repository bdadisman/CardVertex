'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/section'
import { site } from '@/lib/site-content'

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], [140, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-border">
      <Container className="flex flex-col gap-14 pt-16 pb-6 md:pt-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <p className="font-display text-lg font-semibold tracking-tight">
              {site.name} · {site.location}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline w-fit text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {site.email}
            </a>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-muted-foreground md:text-right">
            {site.disclaimer}
          </p>
        </div>

        <motion.p
          aria-hidden="true"
          style={reduceMotion ? undefined : { y, opacity }}
          className="-mb-[0.12em] font-display text-[22vw] leading-[0.82] font-bold tracking-tighter text-foreground/[0.07] select-none will-change-transform md:text-[15.5vw]"
        >
          {site.name}
        </motion.p>
      </Container>
    </footer>
  )
}
