import { NextResponse } from 'next/server'

type AuditPayload = {
  businessName?: unknown
  contactName?: unknown
  phone?: unknown
  email?: unknown
  businessType?: unknown
  notes?: unknown
}

const MAX_FIELD = 500
const MAX_NOTES = 4000

function asText(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL
  const secret = process.env.FORM_SECRET
  if (!scriptUrl || !secret) {
    console.error('[audit] GOOGLE_SCRIPT_URL or FORM_SECRET is not configured')
    return NextResponse.json(
      { ok: false, error: 'Form is not configured' },
      { status: 500 },
    )
  }

  let body: AuditPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const payload = {
    secret,
    businessName: asText(body.businessName, MAX_FIELD),
    contactName: asText(body.contactName, MAX_FIELD),
    phone: asText(body.phone, MAX_FIELD),
    email: asText(body.email, MAX_FIELD),
    businessType: asText(body.businessType, MAX_FIELD),
    notes: asText(body.notes, MAX_NOTES),
  }

  if (!payload.businessName || !payload.phone) {
    return NextResponse.json(
      { ok: false, error: 'Business name and phone are required' },
      { status: 400 },
    )
  }

  try {
    const upstream = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
    })

    if (!upstream.ok) {
      console.error('[audit] Upstream responded with', upstream.status)
      return NextResponse.json(
        { ok: false, error: 'Upstream request failed' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[audit] Upstream request error', error)
    return NextResponse.json(
      { ok: false, error: 'Upstream request failed' },
      { status: 502 },
    )
  }
}
