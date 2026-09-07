'use client'

import { Magnetic } from '@/components/motion/magnetic'

export const PRESELECT_EVENT = 'cardvertex:preselect-tier'

export function QuoteButton({ children }: { children: React.ReactNode }) {
  return (
    <Magnetic strength={0.25}>
      <a
        href="#audit"
        className="btn-ghost"
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent(PRESELECT_EVENT, { detail: { tier: 'Not sure yet' } }),
          )
        }}
      >
        {children}
      </a>
    </Magnetic>
  )
}
