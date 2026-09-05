'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FadeUp, Stagger } from '@/components/motion/fade-up'
import { Marquee } from '@/components/motion/marquee'
import { MaskedText } from '@/components/motion/masked-text'
import { SpotlightCard } from '@/components/motion/spotlight-card'
import { Container, Eyebrow } from '@/components/section'
import { gsap, useGSAP } from '@/lib/gsap'
import { fadeUp } from '@/lib/motion'
import { auditForm, howItWorks } from '@/lib/site-content'

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const track = trackRef.current
      const bar = barRef.current
      if (!section || !track || !bar) return

      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.scrollWidth - track.clientWidth

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        tl.to(track, { x: () => -distance(), ease: 'none' }, 0).fromTo(
          bar,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none' },
          0,
        )
      })
      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <>
      <Marquee items={auditForm.businessTypes} label="Business types we work with" />
      <section
        id="how-it-works"
        ref={sectionRef}
        className="relative flex flex-col justify-center overflow-x-clip py-24 md:py-32 lg:min-h-svh lg:py-0"
      >
        <Container className="flex flex-col">
          <Eyebrow>How it works</Eyebrow>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <MaskedText
              text="Three steps. One of them is yours."
              className="max-w-xl font-display text-4xl font-bold tracking-tight text-balance md:text-5xl"
            />
            <FadeUp delay={0.2} className="text-sm text-muted-foreground lg:max-w-xs lg:text-right">
              <p>{howItWorks.footnote}</p>
            </FadeUp>
          </div>

          <Stagger
            stagger={0.12}
            className="mt-14 lg:mt-16"
          >
            <ol
              ref={trackRef}
              className="grid gap-5 will-change-transform lg:flex lg:flex-nowrap lg:gap-6"
            >
              {howItWorks.steps.map((step, i) => (
                <motion.li
                  key={step.title}
                  variants={fadeUp}
                  className="h-full lg:w-[min(36rem,44vw)] lg:shrink-0"
                >
                    <SpotlightCard innerClassName="p-7 md:p-9">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-accent">Step {i + 1}</span>
                        <span
                          aria-hidden="true"
                          className="font-display text-6xl leading-none font-bold text-foreground/10 md:text-7xl"
                        >
                          {i + 1}
                        </span>
                      </div>
                      <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
                        {step.body}
                      </p>
                    </SpotlightCard>
                </motion.li>
              ))}
            </ol>
          </Stagger>

          <div
            aria-hidden="true"
            className="mt-10 hidden h-px w-full bg-border lg:block"
          >
            <div ref={barRef} className="h-px w-full origin-left bg-accent will-change-transform" />
          </div>
        </Container>
      </section>
    </>
  )
}
