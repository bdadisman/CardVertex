import { Stagger, StaggerItem } from '@/components/motion/fade-up'
import { MaskedText } from '@/components/motion/masked-text'
import { Section } from '@/components/section'
import { faq } from '@/lib/site-content'

export function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <MaskedText
          text="Questions owners actually ask."
          className="font-display text-4xl font-bold tracking-tight text-balance md:text-5xl"
        />
        <Stagger stagger={0.06} className="flex flex-col border-t border-border">
          {faq.map((item) => (
            <StaggerItem key={item.q}>
              <details name="faq" className="group border-b border-border open:pb-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium transition-colors duration-200 marker:hidden hover:text-accent focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:text-lg [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-transform duration-200 group-open:rotate-45 group-hover:scale-110"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 text-base leading-relaxed text-pretty text-muted-foreground">
                  {item.a}
                </p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
