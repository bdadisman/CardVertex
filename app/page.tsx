import { AuditForm } from '@/components/sections/audit-form'
import { Compliance } from '@/components/sections/compliance'
import { Faq } from '@/components/sections/faq'
import { Guarantee } from '@/components/sections/guarantee'
import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/how-it-works'
import { ReviewPricing } from '@/components/sections/review-pricing'
import { WebsitePricing } from '@/components/sections/website-pricing'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <HowItWorks />
        <ReviewPricing />
        <Guarantee />
        <WebsitePricing />
        <Compliance />
        <Faq />
        <AuditForm />
      </main>
      <SiteFooter />
    </>
  )
}
