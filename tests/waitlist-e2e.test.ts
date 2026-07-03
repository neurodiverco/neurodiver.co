/**
 * Integration tests for waitlist API
 * Tests the route handler behavior with mocked D1
 */

describe('Waitlist API Route', () => {
  let mockD1: any

  beforeEach(() => {
    // Setup mock D1 database binding
    mockD1 = {
      prepare: jest.fn().mockReturnThis(),
      bind: jest.fn().mockReturnThis(),
      first: jest.fn(),
      all: jest.fn(),
      run: jest.fn(),
    }

    // Set global WAITLIST_DB before test runs
    Object.defineProperty(global, 'WAITLIST_DB', {
      value: mockD1,
      writable: true,
      configurable: true,
    })

    process.env.ADMIN_SECRET = 'test-secret'
  })

  afterEach(() => {
    jest.clearAllMocks()
    delete (global as any).WAITLIST_DB
  })

  describe('POST /api/waitlist', () => {
    test('validates email format', async () => {
      // Import AFTER mock is set up
      const { POST } = await import('@/app/api/waitlist/route')
      const { NextRequest } = await import('next/server')

      const request = new NextRequest('http://localhost:3000/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email: 'invalid' }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid email')
    })

    test('rejects missing email', async () => {
      const { POST } = await import('@/app/api/waitlist/route')
      const { NextRequest } = await import('next/server')

      const request = new NextRequest('http://localhost:3000/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({}),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid email')
    })

    test('successfully adds email', async () => {
      const { POST } = await import('@/app/api/waitlist/route')
      const { NextRequest } = await import('next/server')

      mockD1.prepare.mockReturnValue({
        bind: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue(null),
        run: jest.fn().mockResolvedValue({ success: true }),
      })

      const request = new NextRequest('http://localhost:3000/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.message).toContain('Thanks for joining')
    })

    test('prevents duplicate emails', async () => {
      const { POST } = await import('@/app/api/waitlist/route')
      const { NextRequest } = await import('next/server')

      const stmt = {
        bind: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue({ id: 1 }),
        run: jest.fn(),
      }
      mockD1.prepare.mockReturnValue(stmt)

      const request = new NextRequest('http://localhost:3000/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email: 'existing@example.com' }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.error).toContain('already on waitlist')
      expect(stmt.run).not.toHaveBeenCalled()
    })

    test('handles database errors', async () => {
      const { POST } = await import('@/app/api/waitlist/route')
      const { NextRequest } = await import('next/server')

      const stmt = {
        bind: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue(null),
        run: jest.fn().mockRejectedValue(new Error('DB error')),
      }
      mockD1.prepare.mockReturnValue(stmt)

      const request = new NextRequest('http://localhost:3000/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toContain('Failed to process')
    })
  })

  describe('GET /api/waitlist', () => {
    test('returns public entry count', async () => {
      const { GET } = await import('@/app/api/waitlist/route')
      const { NextRequest } = await import('next/server')

      const stmt = {
        first: jest.fn().mockResolvedValue({ count: 42 }),
      }
      mockD1.prepare.mockReturnValue(stmt)

      const request = new NextRequest('http://localhost:3000/api/waitlist')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.entry_count).toBe(42)
    })

    test('rejects unauthorized export', async () => {
      const { GET } = await import('@/app/api/waitlist/route')
      const { NextRequest } = await import('next/server')

      const request = new NextRequest(
        'http://localhost:3000/api/waitlist?format=json&secret=wrong'
      )

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    test('exports JSON with correct secret', async () => {
      const { GET } = await import('@/app/api/waitlist/route')
      const { NextRequest } = await import('next/server')

      const stmt = {
        all: jest.fn().mockResolvedValue({
          results: [
            {
              id: 1,
              email: 'user@example.com',
              timestamp: '2023-01-01T00:00:00Z',
              ip: '192.168.1.1',
              userAgent: 'Chrome',
            },
          ],
        }),
      }
      mockD1.prepare.mockReturnValue(stmt)

      const request = new NextRequest(
        'http://localhost:3000/api/waitlist?format=json&secret=test-secret'
      )

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.count).toBe(1)
      expect(data.entries[0].email).toBe('user@example.com')
    })

    test('exports CSV with correct secret', async () => {
      const { GET } = await import('@/app/api/waitlist/route')
      const { NextRequest } = await import('next/server')

      const stmt = {
        all: jest.fn().mockResolvedValue({
          results: [
            {
              id: 1,
              email: 'user@example.com',
              timestamp: '2023-01-01T00:00:00Z',
              ip: '192.168.1.1',
              userAgent: 'Chrome',
            },
          ],
        }),
      }
      mockD1.prepare.mockReturnValue(stmt)

      const request = new NextRequest(
        'http://localhost:3000/api/waitlist?format=csv&secret=test-secret'
      )

      const response = await GET(request)
      const csv = await response.text()

      expect(response.status).toBe(200)
      expect(response.headers.get('Content-Type')).toBe('text/csv')
      expect(csv).toContain('id,email,timestamp,ip,userAgent')
      expect(csv).toContain('user@example.com')
    })
  })
})
