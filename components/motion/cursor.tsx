'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const INTERACTIVE = 'a, button, summary, label, [role="button"]'
const SIZE = 12

export function Cursor() {
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const scale = useMotionValue(1)
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.25 })
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.25 })
  const sScale = useSpring(scale, { stiffness: 320, damping: 24 })
  const cx = useTransform(sx, (v) => v - SIZE / 2)
  const cy = useTransform(sy, (v) => v - SIZE / 2)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduceMotion) return

    const root = document.documentElement
    root.classList.add('has-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as Element | null
      scale.set(target?.closest(INTERACTIVE) ? 2.8 : 1)
    }
    const onLeave = () => setVisible(false)
    const onDown = () => scale.set(0.7)
    const onUp = () => scale.set(1)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    root.addEventListener('mouseleave', onLeave)

    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      root.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y, scale])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-foreground mix-blend-difference"
      style={{ width: SIZE, height: SIZE, x: cx, y: cy, scale: sScale, opacity: visible ? 1 : 0 }}
    />
  )
}
