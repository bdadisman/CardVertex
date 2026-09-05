'use client'

import { motion } from 'framer-motion'
import { FadeUp } from '@/components/motion/fade-up'
import { Magnetic } from '@/components/motion/magnetic'
import { MaskedText, maskedTextDuration } from '@/components/motion/masked-text'
import { hero } from '@/lib/site-content'

function Orbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-24 left-[5%] size-72 rounded-full bg-accent/30 blur-3xl will-change-transform md:size-[34rem] md:blur-[110px]"
        animate={{ x: [0, 90, -50, 0], y: [0, -70, 50, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[30%] -right-[10%] size-64 rounded-full bg-glow/40 blur-3xl will-change-transform md:size-[30rem] md:blur-[110px]"
        animate={{ x: [0, -80, 40, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 left-[35%] hidden size-[26rem] rounded-full bg-accent/15 blur-[120px] will-change-transform md:block"
        animate={{ x: [0, 60, -60, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export function Hero() {
  const afterHeadline = maskedTextDuration(hero.headline)

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-16">
      <Orbs />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-24 md:px-8 md:py-32">
        <MaskedText
          as="h1"
          text={hero.headline}
          animateOnMount
          delay={0.3}
          className="max-w-5xl font-display text-[2.75rem] leading-[0.98] font-bold tracking-[-0.03em] text-balance text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        />
        <FadeUp
          animateOnMount
          delay={afterHeadline}
          className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl"
        >
          <p>{hero.subhead}</p>
        </FadeUp>
        <FadeUp
          animateOnMount
          delay={afterHeadline + 0.15}
          className="flex flex-col items-start gap-6 sm:flex-row sm:items-center"
        >
          <Magnetic>
            <a href="#audit" className="btn-primary">
              {hero.primaryCta}
            </a>
          </Magnetic>
          <a
            href="#how-it-works"
            className="link-underline text-base font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground"
          >
            {hero.secondaryCta}
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
