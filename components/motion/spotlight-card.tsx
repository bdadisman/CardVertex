'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

type SpotlightCardProps = {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  highlighted?: boolean
  tilt?: number
}

export function SpotlightCard({
  children,
  className,
  innerClassName,
  highlighted = false,
  tilt = 7,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const tiltEnabled = useRef(false)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 160, damping: 20, mass: 0.6 })
  const sry = useSpring(ry, { stiffness: 160, damping: 20, mass: 0.6 })

  useEffect(() => {
    tiltEnabled.current =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const localX = e.clientX - rect.left
    const localY = e.clientY - rect.top
    el.style.setProperty('--x', `${localX}px`)
    el.style.setProperty('--y', `${localY}px`)
    if (!tiltEnabled.current) return
    ry.set((localX / rect.width - 0.5) * tilt)
    rx.set((0.5 - localY / rect.height) * tilt)
  }

  function onPointerLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn('group relative h-full rounded-xl will-change-transform', className)}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* Border glow: sits 1px outside the card and shows through the transparent border on hover. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--x, 50%) var(--y, 50%), var(--accent), transparent 65%)',
        }}
      />
      <div
        className={cn(
          'relative flex h-full flex-col rounded-xl border bg-card bg-clip-padding transition-colors duration-200 group-hover:border-transparent',
          highlighted ? 'border-accent/60' : 'border-border',
          innerClassName,
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(560px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklab, var(--accent) 13%, transparent), transparent 70%)',
          }}
        />
        <div className="relative flex h-full flex-col">{children}</div>
      </div>
    </motion.div>
  )
}
