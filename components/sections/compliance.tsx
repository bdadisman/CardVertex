'use client'

import { motion } from 'framer-motion'
import { FadeUp, Stagger, StaggerItem } from '@/components/motion/fade-up'
import { MaskedText } from '@/components/motion/masked-text'
import { Section } from '@/components/section'
import { fadeUp } from '@/lib/motion'
import { compliance } from '@/lib/site-content'
import { cn } from '@/lib/utils'

function RuleList({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: 'never' | 'instead'
}) {
  const isNever = tone === 'never'
  return (
    <Stagger stagger={0.07}>
      <StaggerItem>
        <h3
          className={cn(
            'border-b pb-3 text-sm font-semibold tracking-[0.2em] uppercase',
            isNever ? 'border-foreground text-foreground' : 'border-accent text-accent',
          )}
        >
          {title}
        </h3>
      </StaggerItem>
      <ul className="mt-2 flex flex-col divide-y divide-border">
        {items.map((item) => (
          <motion.li
            key={item}
            variants={fadeUp}
            className="flex gap-4 py-4 text-base leading-relaxed text-foreground/90 md:text-lg"
          >
            <span
              aria-hidden="true"
              className={cn('mt-3.5 h-px w-5 shrink-0', isNever ? 'bg-destructive' : 'bg-accent')}
            />
            {item}
          </motion.li>
        ))}
      </ul>
    </Stagger>
  )
}

export function Compliance() {
  return (
    <Section id="compliance" eyebrow="What we will never do">
      <MaskedText
        text={compliance.headline}
        className="max-w-4xl font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-5xl lg:text-6xl"
      />
      <FadeUp
        delay={0.2}
        className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground"
      >
        <p>{compliance.intro}</p>
      </FadeUp>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-14">
        <RuleList title="Never" items={compliance.never} tone="never" />
        <RuleList title="Instead" items={compliance.instead} tone="instead" />
      </div>
    </Section>
  )
}
