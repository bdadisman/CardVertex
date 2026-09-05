import { CountUp } from '@/components/motion/count-up'
import { FadeUp, Stagger, StaggerItem } from '@/components/motion/fade-up'
import { MaskedText } from '@/components/motion/masked-text'
import { SpotlightCard } from '@/components/motion/spotlight-card'
import { Section } from '@/components/section'
import { reviewPricing, type ValueLine } from '@/lib/site-content'

function ValueTable({ lines, total }: { lines: ValueLine[]; total: string }) {
  return (
    <dl className="mt-8 flex flex-col divide-y divide-border border-y border-border">
      {lines.map((line) => (
        <div key={line.label} className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-sm leading-snug text-foreground/90">{line.label}</dt>
          <dd className="text-sm tabular-nums text-muted-foreground">{line.value}</dd>
        </div>
      ))}
      <div className="flex items-baseline justify-between gap-4 py-3">
        <dt className="text-sm font-medium">Total</dt>
        <dd className="text-sm tabular-nums text-muted-foreground line-through decoration-muted-foreground/60">
          {total}
        </dd>
      </div>
    </dl>
  )
}

export function ReviewPricing() {
  const { setup, management } = reviewPricing

  return (
    <Section id="pricing" eyebrow="Pricing — Reviews">
      <MaskedText
        text="One setup fee. One optional monthly. Nothing else."
        className="max-w-2xl font-display text-4xl font-bold tracking-tight text-balance md:text-5xl"
      />

      <Stagger stagger={0.14} className="mt-14 grid gap-6 md:grid-cols-2">
        <StaggerItem className="h-full">
          <SpotlightCard innerClassName="p-7 md:p-9">
            <header className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                {setup.name}
              </h3>
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {setup.cadence}
              </span>
            </header>
            <div className="mt-8 flex items-baseline gap-3">
              <CountUp
                value={setup.price}
                className="font-display text-6xl font-bold tracking-tight tabular-nums md:text-7xl"
              />
              <span className="text-sm text-muted-foreground line-through">{setup.value}</span>
            </div>
            <ValueTable lines={setup.lines} total={setup.value} />
          </SpotlightCard>
        </StaggerItem>

        <StaggerItem className="h-full">
          <SpotlightCard innerClassName="p-7 md:p-9">
            <header className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                {management.name}
              </h3>
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {management.cadence}
              </span>
            </header>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-6xl font-bold tracking-tight tabular-nums md:text-7xl">
                <CountUp value={management.price} />
                <span className="text-2xl font-medium text-muted-foreground">
                  {management.priceSuffix}
                </span>
              </span>
              <span className="text-sm text-muted-foreground line-through">{management.value}</span>
            </div>
            <ValueTable lines={management.lines} total={management.value} />
          </SpotlightCard>
        </StaggerItem>
      </Stagger>

      <FadeUp className="mt-10 flex flex-col gap-2">
        <p className="text-base text-foreground/90">{reviewPricing.terms}</p>
        <p className="text-sm text-muted-foreground">{reviewPricing.multiLocation}</p>
      </FadeUp>
    </Section>
  )
}
