import { FadeUp } from '@/components/motion/fade-up'
import { MaskedText } from '@/components/motion/masked-text'
import { Container, Eyebrow } from '@/components/section'
import { guarantee } from '@/lib/site-content'

export function Guarantee() {
  return (
    <section id="guarantee" className="relative overflow-hidden border-t border-border bg-card">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]"
      />
      <Container className="flex flex-col gap-10 py-24 md:py-36">
        <Eyebrow className="mb-0">The guarantee</Eyebrow>
        <MaskedText
          text={guarantee.headline}
          className="max-w-5xl font-display text-4xl leading-[1.02] font-bold tracking-[-0.025em] text-balance md:text-6xl lg:text-7xl"
        />
        <FadeUp
          delay={0.25}
          className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl"
        >
          <p>{guarantee.body}</p>
        </FadeUp>
      </Container>
    </section>
  )
}
