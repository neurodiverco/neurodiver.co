import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Database storage - uses D1 in production, in-memory in development
const waitlistEntries: Array<{
  id: number
  email: string
  timestamp: string
  ip?: string | null
  userAgent?: string | null
}> = []

let nextId = 1

// Cloudflare D1 binding (available in production)
declare const WAITLIST_DB: D1Database

// Check if we're in production with D1 available
const isProduction = process.env.NODE_ENV === 'production' && typeof WAITLIST_DB !== 'undefined'

async function getWaitlistEntries(): Promise<Array<{
  id: number
  email: string
  timestamp: string
  ip?: string | null
  userAgent?: string | null
}>> {
  if (isProduction) {
    try {
      const result = await WAITLIST_DB.prepare('SELECT id, email, timestamp, ip, userAgent FROM waitlist ORDER BY timestamp DESC').all()
      return result.results || []
    } catch (error) {
      console.error('D1 query failed, falling back to memory:', error)
      return waitlistEntries
    }
  }
  return waitlistEntries
}

async function addWaitlistEntry(email: string, timestamp: string, ip: string | null, userAgent: string | null): Promise<number> {
  const entry = {
    id: nextId++,
    email,
    timestamp,
    ip,
    userAgent
  }

  if (isProduction) {
    try {
      // Check for duplicates in D1
      const existing = await WAITLIST_DB.prepare('SELECT id FROM waitlist WHERE email = ?')
        .bind(email)
        .first()

      if (existing) {
        throw new Error('Email already on waitlist')
      }

      // Insert into D1
      await WAITLIST_DB.prepare('INSERT INTO waitlist (email, timestamp, ip, userAgent) VALUES (?, ?, ?, ?)')
        .bind(email, timestamp, ip, userAgent)
        .run()

      // Get the actual ID from D1
      const result = await WAITLIST_DB.prepare('SELECT last_insert_rowid() as id').first()
      return result.id
    } catch (error) {
      console.error('D1 insert failed, falling back to memory:', error)
      waitlistEntries.push(entry)
      return entry.id
    }
  }

  waitlistEntries.push(entry)
  return entry.id
}

async function checkDuplicateEmail(email: string): Promise<boolean> {
  if (isProduction) {
    try {
      const result = await WAITLIST_DB.prepare('SELECT id FROM waitlist WHERE email = ?')
        .bind(email)
        .first()
      return !!result
    } catch (error) {
      console.error('D1 duplicate check failed, falling back to memory:', error)
      return waitlistEntries.some(entry => entry.email === email)
    }
  }
  return waitlistEntries.some(entry => entry.email === email)
}

interface WaitlistRequest {
  email?: string
}

export async function POST(request: NextRequest) {
  try {
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

    // Check for duplicates
    const isDuplicate = await checkDuplicateEmail(normalizedEmail)

    if (isDuplicate) {
      return NextResponse.json(
        { error: 'Email already on waitlist' },
        { status: 409 }
      )
    }

    // Create and store entry
    const entryId = await addWaitlistEntry(
      normalizedEmail,
      new Date().toISOString(),
      request.headers.get('x-forwarded-for') ?? request.headers.get('cf-connecting-ip') ?? null,
      request.headers.get('user-agent') ?? null
    )

    return NextResponse.json(
      {
        success: true,
        message: 'Thanks for joining our waitlist!',
        id: entryId,
        database: isProduction ? 'D1' : 'memory'
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process waitlist request',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format')
  const secret = searchParams.get('secret')

  // In production, you would check the secret against your admin secret
  const isAuthorized = !secret || secret === (process.env.ADMIN_SECRET ?? 'your-secret')

  if (format === 'csv' && isAuthorized) {
    // Export as CSV
    const entries = await getWaitlistEntries()
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
  } else if (format === 'json' && isAuthorized) {
    // Export as JSON
    const entries = await getWaitlistEntries()
    return NextResponse.json(
      {
        count: entries.length,
        entries: entries.map(entry => ({
          id: entry.id,
          email: entry.email,
          timestamp: entry.timestamp,
          ip: entry.ip,
          userAgent: entry.userAgent,
          formattedDate: new Date(entry.timestamp).toISOString()
        })),
        database: isProduction ? 'D1' : 'memory'
      },
      { status: 200 }
    )
  }

  // Public info endpoint
  const entries = await getWaitlistEntries()
  return NextResponse.json(
    {
      message: 'Waitlist API',
      public_endpoints: {
        POST: '/api/waitlist - Add to waitlist'
      },
      admin_endpoints: {
        GET_CSV: '/api/waitlist?format=csv&secret=ADMIN_SECRET',
        GET_JSON: '/api/waitlist?format=json&secret=ADMIN_SECRET'
      },
      entry_count: entries.length,
      database: isProduction ? 'D1 (Cloudflare)' : 'memory (development)',
      environment: process.env.NODE_ENV
    },
    { status: 200 }
  )
}
