export const site = {
  name: 'Cardvertex',
  location: 'Gainesville, FL',
  email: 'coleducote@cardvertex.com',
  disclaimer:
    'Not affiliated with or endorsed by Google. Google and Google Maps are trademarks of Google LLC.',
}

export const nav = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Websites', href: '#websites' },
  { label: 'Guarantee', href: '#guarantee' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Free audit', href: '#audit' },
]

export const hero = {
  headline: "Your shop doesn't have a review problem. It has an asking problem.",
  subhead:
    "The barbershop with 194 Google reviews isn't four times worse than the one with 489. It asks four times less. Cardvertex fixes the asking — at the counter, every day, without anyone having to find the words.",
  primaryCta: 'Get a free review audit',
  secondaryCta: 'See how it works',
}

export const howItWorks = {
  steps: [
    {
      title: 'Before we arrive',
      body: 'We program five branded tap-to-review plates to your Google review page and lock them so the link can never be changed. We record where you stand today.',
    },
    {
      title: 'Install day · 45 minutes',
      body: 'We place the plates where customers already pause — the counter first — and walk your staff through a fifteen-minute training on when to ask and how to take a polite no.',
    },
    {
      title: 'Every month after',
      body: 'We watch for new reviews daily, write a reply to every one within 24 hours, and send you a one-page report. You never log in and never write a reply.',
    },
  ],
  footnote: 'Total time from you: showing up, and about fifteen minutes.',
}

export type ValueLine = { label: string; value: string }

export const reviewPricing = {
  setup: {
    name: 'Review Engine Setup',
    cadence: 'one-time',
    price: '$397',
    value: 'Value $850',
    lines: [
      { label: 'Five branded tap-to-review plates', value: '$250' },
      { label: 'On-site install and programming', value: '$150' },
      { label: 'Staff walkthrough and ask training', value: '$150' },
      { label: 'Google-compliant review policy sheet', value: '$100' },
      { label: '90-day report on your review lift', value: '$200' },
    ] satisfies ValueLine[],
  },
  management: {
    name: 'Review Management',
    cadence: 'optional',
    price: '$147',
    priceSuffix: '/month',
    value: 'Value $375/mo',
    lines: [
      { label: 'Daily monitoring of new reviews', value: '$100' },
      { label: 'Written reply to every review within 24h', value: '$150' },
      { label: 'Monthly report with competitor comparison', value: '$75' },
      { label: 'Free replacement plates, no questions asked', value: '$50' },
    ] satisfies ValueLine[],
  },
  terms:
    "No contracts. No minimum term. Cancel the monthly with 30 days' notice — the plates are yours either way.",
  multiLocation: 'Multiple locations? One project, one report, from $1,500.',
}

export const guarantee = {
  headline:
    "If you're not happy in 90 days, the setup fee comes back in full. You keep the plates.",
  body:
    "We deliberately don't promise a review count. We won't quote you a number before we've measured your business — which is exactly why the guarantee is built this way.",
}

export type WebsiteTier = {
  name: string
  price: string
  tagline: string
  features: string[]
  bestFor: string
  highlighted?: boolean
  badge?: string
}

export const websitePricing = {
  intro:
    'Once the reviews are moving, the next thing people check is your website. We build those too.',
  tiers: [
    {
      name: 'More Affordable',
      price: '$500',
      tagline: 'A simple, clean site that gets you online and looking legitimate.',
      features: ['Then $50/month upkeep', 'Next business day response'],
      bestFor: 'a shop with no website, or a Facebook page standing in for one',
    },
    {
      name: 'Premium',
      price: '$3,500',
      tagline: 'Premium quality on a proven structure, built to convert.',
      features: [
        '2 months of upkeep included, then $100/month',
        'Same-day response on business days',
      ],
      bestFor: 'an established shop ready to look like the leader',
      highlighted: true,
      badge: 'Most popular',
    },
    {
      name: 'Ultra Premium',
      price: "Let's talk.",
      tagline: 'Fully custom design and functionality, built around your business.',
      features: [
        '3 months of upkeep included, then $250/month',
        'Same-day response, seven days a week',
        'AI support chatbot on your site, trained on your business',
      ],
      bestFor:
        'multi-location businesses or anyone who wants the site to do real work',
    },
  ] satisfies WebsiteTier[],
  custom: {
    name: 'Custom quote',
    body:
      'Custom builds are quoted after a short conversation about scope. We work at a range of budgets.',
    cta: 'Request a quote',
  },
  responseNote:
    'Response means we acknowledge your request and give you a timeline. Requests received after 5pm ET are answered the next morning.',
  footnote:
    'Website upkeep is billed separately from Review Management. Cancel either one independently.',
}

export const compliance = {
  headline:
    'The most valuable thing in this service is the list of things we refuse to do.',
  intro:
    "Google tightened its review rules in 2026, and enforcement now shows up as public warnings on your own profile. Most owners have never read the rules. We follow them to the letter — because the alternative puts everything you've built at risk.",
  never: [
    'Buy, sell, generate or fake a review',
    'Offer discounts, freebies or contest entries in exchange for one',
    'Screen customers so only happy ones get asked',
    'Tell a customer what to write',
    'Suggest a star count, on the plate or out loud',
    "Pressure anyone before they've left",
  ],
  instead: [
    'Every customer gets the same neutral link, the same way, every time',
    'Staff are trained on when to ask — and to accept the first no',
    'You get a written policy sheet so the whole team has the rules on paper',
    'Negative reviews get honest replies, written for the next reader',
    'The ask is always optional',
  ],
}

export const faq = [
  {
    q: "Can't I just buy NFC cards on Amazon for twenty dollars?",
    a: "Yes. What you can't buy is the install, the staff training, someone writing every reply, and a guarantee that puts our fee at risk instead of yours. The plates are the part you can hold.",
  },
  {
    q: 'Do I have to sign a contract?',
    a: "No. The setup is one-time. The monthly is optional and cancellable with 30 days' notice.",
  },
  {
    q: 'What happens to old reviews?',
    a: "They fade. Google and customers both weight recent reviews far more heavily than old ones — a two-year-old five-star review is worth very little today. That's why the goal is a steady stream, not a one-time push.",
  },
  {
    q: 'Can you filter out unhappy customers before they reach Google?',
    a: "No — that's called review gating, it's banned by Google and the FTC, and it can get your profile flagged. We can set up a page with an equal review button and an equal feedback button, which is allowed.",
  },
  {
    q: 'What do you need from me?',
    a: 'Fifteen minutes on install day, and Manager access on your Google Business Profile so we can post replies for you.',
  },
  {
    q: "Do you build websites for businesses that aren't review clients?",
    a: 'Yes, but most people start with reviews. Use the quote form and tell us what you need.',
  },
  {
    q: 'How many reviews will I get?',
    a: "We won't guess before we've measured your shop. The 90-day report answers that with your real numbers — and the guarantee covers you until then.",
  },
]

export const auditForm = {
  headline: 'Get a free review audit.',
  subhead:
    "One page: where you stand today, who's ahead of you in your category, and what it would take to close the gap. No obligation.",
  businessTypes: [
    'Barbershop',
    'Hair salon',
    'Nail salon',
    'Day spa',
    'Med spa',
    'Bakery',
    'Other',
  ],
  interests: ['Review Engine', 'Review Management'],
  tierLabel: 'Which tier are you looking at?',
  tiers: ['More Affordable', 'Premium', 'Ultra Premium', 'Not sure yet'],
  submit: 'Send my free audit',
  success: "Got it. You'll hear from us within one business day.",
}
