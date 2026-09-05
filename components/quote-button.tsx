'use client'

import { Magnetic } from '@/components/motion/magnetic'

export const PRESELECT_EVENT = 'cardvertex:preselect-interest'

export function QuoteButton({ children }: { children: React.ReactNode }) {
  return (
    <Magnetic strength={0.25}>
      <a
        href="#audit"
        className="btn-ghost"
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent(PRESELECT_EVENT, { detail: { interest: 'Custom quote' } }),
          )
        }}
      >
        {children}
      </a>
    </Magnetic>
  )
}
