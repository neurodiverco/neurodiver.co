import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory storage for development
// In production, this would connect to your actual database
const waitlistEntries: Array<{
  id: number
  email: string
  timestamp: string
  ip?: string | null
  userAgent?: string | null
}> = []

let nextId = 1

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
    const existingEntry = waitlistEntries.find(entry => entry.email === normalizedEmail)

    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already on waitlist' },
        { status: 409 }
      )
    }

    // Create entry
    const entry = {
      id: nextId++,
      email: normalizedEmail,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') ?? request.headers.get('cf-connecting-ip') ?? null,
      userAgent: request.headers.get('user-agent') ?? null
    }

    // Store entry
    waitlistEntries.push(entry)

    return NextResponse.json(
      {
        success: true,
        message: 'Thanks for joining our waitlist!',
        id: entry.id
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
    let csv = 'id,email,timestamp,ip,userAgent\n'

    for (const entry of waitlistEntries) {
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
    return NextResponse.json(
      {
        count: waitlistEntries.length,
        entries: waitlistEntries.map(entry => ({
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

  // Public info endpoint
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
      entry_count: waitlistEntries.length
    },
    { status: 200 }
  )
}
