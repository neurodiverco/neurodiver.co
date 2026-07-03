import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Cloudflare D1 binding type
interface D1PreparedStatement {
  bind: (...args: unknown[]) => D1BoundStatement
}

interface D1BoundStatement {
  run: () => Promise<{ success: boolean }>
  all: () => Promise<{ results: Record<string, unknown>[] }>
  first: () => Promise<Record<string, unknown> | null>
}

interface D1Database {
  prepare: (sql: string) => D1PreparedStatement
}

declare const WAITLIST_DB: D1Database

interface WaitlistEntry {
  id: number
  email: string
  timestamp: string
  ip?: string | null
  userAgent?: string | null
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
    const stmt = WAITLIST_DB.prepare(
      'SELECT id FROM waitlist WHERE email = ?'
    )
    const existingEntry = await stmt.bind(normalizedEmail).first()

    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already on waitlist' },
        { status: 409 }
      )
    }

    // Create waitlist entry
    const entry: Omit<WaitlistEntry, 'id'> = {
      email: normalizedEmail,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') ?? request.headers.get('cf-connecting-ip') ?? null,
      userAgent: request.headers.get('user-agent') ?? null
    }

    // Store in D1 database
    const insertStmt = WAITLIST_DB.prepare(
      'INSERT INTO waitlist (email, timestamp, ip, userAgent) VALUES (?, ?, ?, ?)'
    )
    await insertStmt.bind(
      entry.email,
      entry.timestamp,
      entry.ip,
      entry.userAgent
    ).run()

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
      { error: 'Failed to process waitlist request' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format')
  const secret = searchParams.get('secret')

  // Export endpoints require authentication, but info endpoint is public
  const isAdminRequest = format === 'csv' || format === 'json'

  if (isAdminRequest && secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  if (format === 'csv') {
    // Export all waitlist entries as CSV
    const stmt = WAITLIST_DB.prepare(
      'SELECT id, email, timestamp, ip, userAgent FROM waitlist ORDER BY timestamp DESC'
    )
    const boundStmt = stmt.bind()
    const { results } = await boundStmt.all()

    let csv = 'id,email,timestamp,ip,userAgent\n'

    for (const entry of results as Array<{
      id: number
      email: string
      timestamp: string
      ip: string | null
      userAgent: string | null
    }>) {
      csv += `${entry.id},"${entry.email}",${entry.timestamp},"${entry.ip || ''}","${entry.userAgent || ''}"\n`
    }

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=waitlist_export.csv'
      }
    })
  } else if (format === 'json') {
    // Export all waitlist entries as JSON
    const stmt = WAITLIST_DB.prepare(
      'SELECT id, email, timestamp, ip, userAgent FROM waitlist ORDER BY timestamp DESC'
    )
    const boundStmt = stmt.bind()
    const { results } = await boundStmt.all()

    return NextResponse.json(
      {
        count: results.length,
        entries: (results as Array<{
          id: number
          email: string
          timestamp: string
          ip: string | null
          userAgent: string | null
        }>).map(entry => ({
          id: entry.id,
          email: entry.email,
          timestamp: entry.timestamp,
          ip: entry.ip,
          userAgent: entry.userAgent,
          formattedDate: new Date(entry.timestamp).toISOString()
        }))
      },
      { status: 200 }
    )
  }

  // Public info response
  return NextResponse.json(
    {
      message: 'Waitlist API - POST endpoint is public, GET endpoints require authentication',
      public_endpoints: {
        POST: '/api/waitlist - Add to waitlist (no auth required)'
      },
      admin_endpoints: {
        GET_CSV: '/api/waitlist?format=csv&secret=ADMIN_SECRET - Export as CSV',
        GET_JSON: '/api/waitlist?format=json&secret=ADMIN_SECRET - Export as JSON'
      }
    },
    { status: 200 }
  )
}
