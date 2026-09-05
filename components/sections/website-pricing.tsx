import { CountUp } from '@/components/motion/count-up'
import { FadeUp, Stagger, StaggerItem } from '@/components/motion/fade-up'
import { MaskedText } from '@/components/motion/masked-text'
import { SpotlightCard } from '@/components/motion/spotlight-card'
import { QuoteButton } from '@/components/quote-button'
import { Section } from '@/components/section'
import { websitePricing } from '@/lib/site-content'

export function WebsitePricing() {
  return (
    <Section id="websites" eyebrow="Pricing — Websites">
      <MaskedText
        as="p"
        text={websitePricing.intro}
        className="max-w-3xl font-display text-3xl leading-[1.1] font-semibold tracking-tight text-balance md:text-5xl"
      />

      <Stagger stagger={0.1} className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {websitePricing.tiers.map((tier) => (
          <StaggerItem key={tier.name} className="h-full">
            <SpotlightCard highlighted={tier.highlighted} innerClassName="p-7">
              {tier.badge ? (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                  {tier.badge}
                </span>
              ) : null}
              <h3 className="font-display text-lg font-semibold tracking-tight">{tier.name}</h3>
              <CountUp
                value={tier.price}
                className="mt-5 font-display text-4xl font-bold tracking-tight tabular-nums md:text-5xl"
              />
              <p className="mt-5 text-sm leading-relaxed text-pretty text-muted-foreground">
                {tier.tagline}
              </p>
              <ul className="mt-6 flex flex-col divide-y divide-border border-y border-border">
                {tier.features.map((f) => (
                  <li key={f} className="py-2.5 text-sm leading-snug text-foreground/90">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Best for:</span> {tier.bestFor}
              </p>
            </SpotlightCard>
          </StaggerItem>
        ))}

        <StaggerItem className="h-full">
          <div className="flex h-full flex-col justify-between gap-8 rounded-xl border border-dashed border-input p-7">
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {websitePricing.custom.name}
              </h3>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                {websitePricing.custom.body}
              </p>
            </div>
            <QuoteButton>{websitePricing.custom.cta}</QuoteButton>
          </div>
        </StaggerItem>
      </Stagger>

      <FadeUp className="mt-10">
        <p className="text-sm text-muted-foreground">{websitePricing.footnote}</p>
      </FadeUp>
    </Section>
  )
}
