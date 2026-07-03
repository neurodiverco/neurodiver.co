import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Cloudflare D1 binding type
declare const WAITLIST_DB: D1Database

interface WaitlistRequest {
  email?: string
}

function isD1Available(): boolean {
  try {
    return typeof WAITLIST_DB !== 'undefined'
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isD1Available()) {
      return NextResponse.json(
        { error: 'Database not configured. Please set up Cloudflare D1.' },
        { status: 503 }
      )
    }

    const body: WaitlistRequest = await request.json()
    const { email } = body

    // Basic validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase()

    // Check for duplicates in D1
    const existingEntry = await WAITLIST_DB.prepare('SELECT id FROM waitlist WHERE email = ?')
      .bind(normalizedEmail)
      .first()

    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already on waitlist' },
        { status: 409 }
      )
    }

    // Add to D1 database
    await WAITLIST_DB.prepare('INSERT INTO waitlist (email, timestamp, ip, userAgent) VALUES (?, ?, ?, ?)')
      .bind(
        normalizedEmail,
        new Date().toISOString(),
        request.headers.get('x-forwarded-for') ?? request.headers.get('cf-connecting-ip') ?? null,
        request.headers.get('user-agent') ?? null
      )
      .run()

    return NextResponse.json(
      {
        success: true,
        message: 'Thanks for joining our waitlist!'
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process waitlist request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format')
  const secret = searchParams.get('secret')

  // Export requests require authentication
  if (format) {
    const isAuthorized = secret === process.env.ADMIN_SECRET
    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!isD1Available()) {
      return NextResponse.json(
        { error: 'Database not configured. Please set up Cloudflare D1.' },
        { status: 503 }
      )
    }
  }

  if (format === 'csv') {
    // Export as CSV
    const result = await WAITLIST_DB.prepare(
      'SELECT id, email, timestamp, ip, userAgent FROM waitlist ORDER BY timestamp DESC'
    ).all()

    const entries = result.results
    let csv = 'id,email,timestamp,ip,userAgent\n'

    for (const entry of entries) {
      csv += `${entry.id},"${entry.email}",${entry.timestamp},"${entry.ip || ''}","${entry.userAgent || ''}"\n`
    }

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=waitlist_export.csv'
      }
    })
  } else if (format === 'json') {
    // Export as JSON
    const result = await WAITLIST_DB.prepare(
      'SELECT id, email, timestamp, ip, userAgent FROM waitlist ORDER BY timestamp DESC'
    ).all()

    const entries = result.results

    return NextResponse.json(
      {
        count: entries.length,
        entries: entries
      },
      { status: 200 }
    )
  }

  // Public info endpoint
  const result = await WAITLIST_DB.prepare('SELECT COUNT(*) as count FROM waitlist').first()
  const count = result?.count ?? 0

  return NextResponse.json(
    {
      message: 'Waitlist API',
      entry_count: count
    },
    { status: 200 }
  )
}
