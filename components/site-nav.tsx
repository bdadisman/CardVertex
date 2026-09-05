'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { nav, site } from '@/lib/site-content'

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const links = nav.slice(0, -1)
  const cta = nav[nav.length - 1]

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8"
      >
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="link-underline text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={cta.href}
              className="inline-flex h-9 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-foreground transition-transform duration-200 hover:scale-[1.05] active:scale-[0.98]"
            >
              {cta.label}
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full text-foreground transition-transform duration-200 hover:scale-105 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="border-t border-border bg-background md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: EASE, delay: 0.04 * i }}
                  className="border-b border-border last:border-b-0"
                >
                  <a
                    href={item.href}
                    className="block py-3.5 font-display text-lg text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
