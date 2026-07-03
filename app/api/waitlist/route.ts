import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Cloudflare D1 binding (required for production)
declare const WAITLIST_DB: D1Database

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

    // Check if D1 is available
    if (typeof WAITLIST_DB === 'undefined') {
      return NextResponse.json(
        {
          error: 'Database not configured. Please set up Cloudflare D1.',
          setup_required: true
        },
        { status: 503 }
      )
    }

    // Check for duplicates in D1
    let existingEntry
    try {
      existingEntry = await WAITLIST_DB.prepare('SELECT id FROM waitlist WHERE email = ?')
        .bind(normalizedEmail)
        .first()
    } catch (error) {
      console.error('D1 duplicate check failed:', error)
      return NextResponse.json(
        {
          error: 'Database query failed',
          details: 'Failed to check for duplicate email',
          database_error: true
        },
        { status: 500 }
      )
    }

    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already on waitlist' },
        { status: 409 }
      )
    }

    // Add to D1 database
    try {
      await WAITLIST_DB.prepare('INSERT INTO waitlist (email, timestamp, ip, userAgent) VALUES (?, ?, ?, ?)')
        .bind(
          normalizedEmail,
          new Date().toISOString(),
          request.headers.get('x-forwarded-for') ?? request.headers.get('cf-connecting-ip') ?? null,
          request.headers.get('user-agent') ?? null
        )
        .run()

      // Get the inserted ID
      const result = await WAITLIST_DB.prepare('SELECT last_insert_rowid() as id').first()
      const entryId = result.id

      return NextResponse.json(
        {
          success: true,
          message: 'Thanks for joining our waitlist!',
          id: entryId,
          database: 'D1'
        },
        { status: 201 }
      )
    } catch (error) {
      console.error('D1 insert failed:', error)
      return NextResponse.json(
        {
          error: 'Failed to save to database',
          details: 'Database insertion failed',
          database_error: true
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process waitlist request',
        details: error instanceof Error ? error.message : 'Unknown error',
        database_error: true
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format')
  const secret = searchParams.get('secret')

  // Check if D1 is available
  if (typeof WAITLIST_DB === 'undefined') {
    return NextResponse.json(
      {
        error: 'Database not configured',
        setup_required: true
      },
      { status: 503 }
    )
  }

  // Verify admin secret
  const isAuthorized = secret === process.env.ADMIN_SECRET
  if (!isAuthorized) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  if (format === 'csv') {
    // Export as CSV
    try {
      const result = await WAITLIST_DB.prepare(
        'SELECT id, email, timestamp, ip, userAgent FROM waitlist ORDER BY timestamp DESC'
      ).all()

      const entries = result.results || []
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
    } catch (error) {
      console.error('D1 export failed:', error)
      return NextResponse.json(
        {
          error: 'Failed to export data',
          details: 'Database query failed',
          database_error: true
        },
        { status: 500 }
      )
    }
  } else if (format === 'json') {
    // Export as JSON
    try {
      const result = await WAITLIST_DB.prepare(
        'SELECT id, email, timestamp, ip, userAgent FROM waitlist ORDER BY timestamp DESC'
      ).all()

      const entries = result.results || []

      return NextResponse.json(
        {
          count: entries.length,
          entries: (entries as Array<{
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
          })),
          database: 'D1'
        },
        { status: 200 }
      )
    } catch (error) {
      console.error('D1 export failed:', error)
      return NextResponse.json(
        {
          error: 'Failed to export data',
          details: 'Database query failed',
          database_error: true
        },
        { status: 500 }
      )
    }
  }

  // Public info endpoint
  try {
    const result = await WAITLIST_DB.prepare('SELECT COUNT(*) as count FROM waitlist').first()
    const count = result.count || 0

    return NextResponse.json(
      {
        message: 'Waitlist API - D1 Database Active',
        public_endpoints: {
          POST: '/api/waitlist - Add to waitlist'
        },
        admin_endpoints: {
          GET_CSV: '/api/waitlist?format=csv&secret=ADMIN_SECRET',
          GET_JSON: '/api/waitlist?format=json&secret=ADMIN_SECRET'
        },
        entry_count: count,
        database: 'D1 (Cloudflare)',
        status: 'active'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('D1 info query failed:', error)
    return NextResponse.json(
      {
        error: 'Failed to get database info',
        details: 'Database query failed',
        database_error: true
      },
      { status: 500 }
    )
  }
}
