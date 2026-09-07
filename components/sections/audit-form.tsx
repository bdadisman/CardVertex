'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeUp } from '@/components/motion/fade-up'
import { Magnetic } from '@/components/motion/magnetic'
import { MaskedText } from '@/components/motion/masked-text'
import { PRESELECT_EVENT } from '@/components/quote-button'
import { Section } from '@/components/section'
import { EASE } from '@/lib/motion'
import { auditForm } from '@/lib/site-content'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type FieldErrors = Partial<Record<'businessName' | 'phone', string>>

const fieldClass =
  'h-12 w-full rounded-lg border border-input bg-background/60 px-4 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 hover:border-foreground/30 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none aria-invalid:border-destructive'

export function AuditForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [interests, setInterests] = useState<string[]>([])
  const [tier, setTier] = useState('')

  useEffect(() => {
    function onPreselect(e: Event) {
      const next = (e as CustomEvent<{ tier: string }>).detail?.tier
      if (next) setTier(next)
    }
    window.addEventListener(PRESELECT_EVENT, onPreselect)
    return () => window.removeEventListener(PRESELECT_EVENT, onPreselect)
  }, [])

  function toggleInterest(value: string) {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const businessName = String(data.get('businessName') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()

    const nextErrors: FieldErrors = {}
    if (!businessName) nextErrors.businessName = 'Please enter your business name.'
    if (!phone) nextErrors.phone = 'Please enter a phone number.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = form.querySelector<HTMLInputElement>(
        nextErrors.businessName ? '#businessName' : '#phone',
      )
      firstInvalid?.focus()
      return
    }

    const notes = String(data.get('notes') ?? '').trim()
    const notesWithInterests = [
      interests.length > 0 ? `Interested in: ${interests.join(', ')}` : '',
      tier ? `Website tier: ${tier}` : '',
      notes,
    ]
      .filter(Boolean)
      .join('\n\n')

    setStatus('submitting')
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          contactName: String(data.get('contactName') ?? '').trim(),
          phone,
          email: String(data.get('email') ?? '').trim(),
          businessType: String(data.get('businessType') ?? '').trim(),
          notes: notesWithInterests,
        }),
      })
      if (!res.ok) throw new Error(`Request failed with ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const submitting = status === 'submitting'

  return (
    <Section id="audit" eyebrow="Free audit">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <div className="flex flex-col gap-8">
          <MaskedText
            text={auditForm.headline}
            className="font-display text-5xl font-bold tracking-tight text-balance md:text-6xl"
          />
          <FadeUp
            delay={0.2}
            className="max-w-md text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            <p>{auditForm.subhead}</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <AnimatePresence mode="wait" initial={false}>
            {status === 'success' ? (
              <motion.div
                key="success"
                role="status"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex min-h-64 flex-col justify-center rounded-xl border border-accent/60 bg-card p-8"
              >
                <p className="font-display text-3xl font-semibold tracking-tight text-balance">
                  {auditForm.success}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: EASE }}
                onSubmit={handleSubmit}
                noValidate
                aria-busy={submitting}
                className="flex flex-col gap-6"
              >
                <fieldset disabled={submitting} className="flex flex-col gap-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="businessName" className="text-sm font-medium">
                        Business name
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        required
                        autoComplete="organization"
                        aria-invalid={errors.businessName ? true : undefined}
                        aria-describedby={
                          errors.businessName ? 'businessName-error' : undefined
                        }
                        onChange={() =>
                          errors.businessName &&
                          setErrors((prev) => ({ ...prev, businessName: undefined }))
                        }
                        className={fieldClass}
                      />
                      {errors.businessName ? (
                        <p id="businessName-error" className="text-sm text-destructive">
                          {errors.businessName}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        aria-invalid={errors.phone ? true : undefined}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        onChange={() =>
                          errors.phone &&
                          setErrors((prev) => ({ ...prev, phone: undefined }))
                        }
                        className={fieldClass}
                      />
                      {errors.phone ? (
                        <p id="phone-error" className="text-sm text-destructive">
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contactName" className="text-sm font-medium">
                        Your name
                      </label>
                      <input
                        id="contactName"
                        name="contactName"
                        autoComplete="name"
                        className={fieldClass}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="businessType" className="text-sm font-medium">
                        Business type
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        defaultValue=""
                        className={fieldClass}
                      >
                        <option value="">Select one</option>
                        {auditForm.businessTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="tier" className="text-sm font-medium">
                        {auditForm.tierLabel}
                      </label>
                      <select
                        id="tier"
                        name="tier"
                        value={tier}
                        onChange={(e) => setTier(e.target.value)}
                        className={fieldClass}
                      >
                        <option value="">Select one</option>
                        {auditForm.tiers.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-3 text-sm font-medium">I&apos;m interested in</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {auditForm.interests.map((interest) => {
                        const checked = interests.includes(interest)
                        return (
                          <label
                            key={interest}
                            className={cn(
                              'flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-[border-color,background-color,transform] duration-200 hover:scale-[1.01] has-focus-visible:ring-3 has-focus-visible:ring-ring/40',
                              checked
                                ? 'border-accent bg-accent/10 text-foreground'
                                : 'border-input bg-background/40 text-foreground/90 hover:border-foreground/30',
                            )}
                          >
                            <input
                              type="checkbox"
                              name="interests"
                              value={interest}
                              checked={checked}
                              onChange={() => toggleInterest(interest)}
                              className="size-4 shrink-0 accent-accent"
                            />
                            {interest}
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="notes" className="text-sm font-medium">
                      Anything else{' '}
                      <span className="font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      className={cn(fieldClass, 'h-auto py-3 leading-relaxed')}
                    />
                  </div>
                </fieldset>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary inline-flex items-center gap-2 disabled:cursor-wait disabled:opacity-80"
                    >
                      {submitting ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                          />
                          Sending…
                        </>
                      ) : (
                        auditForm.submit
                      )}
                    </button>
                  </Magnetic>
                  {status === 'error' ? (
                    <p role="alert" className="text-sm text-destructive">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  ) : null}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeUp>
      </div>
    </Section>
  )
}
