import { NextResponse } from 'next/server'

type LeadPayload = {
  businessName?: string
  name?: string
  email?: string
  businessType?: string
  interests?: string[]
  notes?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: LeadPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const businessName = body.businessName?.trim()
  const name = body.name?.trim()
  const email = body.email?.trim()
  const businessType = body.businessType?.trim()

  if (!businessName || !name || !email || !businessType) {
    return NextResponse.json(
      { ok: false, error: 'Missing required fields' },
      { status: 400 },
    )
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
  }

  // Stub: wire this up to email, a CRM, or a database when ready.
  return NextResponse.json({ ok: true })
}
