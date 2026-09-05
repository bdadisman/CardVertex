'use client'

import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/motion'

type CountUpProps = {
  value: string
  className?: string
}

const NUMBER_PATTERN = /^([^\d]*)([\d,]+)(.*)$/

export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduceMotion = useReducedMotion()
  const parts = value.match(NUMBER_PATTERN)

  useEffect(() => {
    const el = ref.current
    if (!el || !parts || reduceMotion) return
    const [, prefix, digits, suffix] = parts
    const target = Number(digits.replace(/,/g, ''))
    const format = (n: number) => `${prefix}${Math.round(n).toLocaleString('en-US')}${suffix}`

    if (!inView) {
      el.textContent = format(0)
      return
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = format(v)
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, parts])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
