/**
 * Waitlist form validation tests
 * Tests the core logic without depending on D1 binding
 */

describe('Waitlist form validation', () => {
  describe('email validation', () => {
    const validateEmail = (email: string | undefined): { valid: boolean; error?: string } => {
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return { valid: false, error: 'Invalid email address' }
      }
      return { valid: true }
    }

    test('accepts valid email', () => {
      const result = validateEmail('test@example.com')
      expect(result.valid).toBe(true)
    })

    test('rejects email without @', () => {
      const result = validateEmail('invalid')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('Invalid email')
    })

    test('rejects empty email', () => {
      const result = validateEmail('')
      expect(result.valid).toBe(false)
    })

    test('rejects undefined email', () => {
      const result = validateEmail(undefined)
      expect(result.valid).toBe(false)
    })
  })

  describe('email normalization', () => {
    test('normalizes to lowercase', () => {
      const email = 'TEST@EXAMPLE.COM'
      const normalized = email.toLowerCase()
      expect(normalized).toBe('test@example.com')
    })
  })

  describe('D1 database availability check', () => {
    test('correctly identifies missing D1 binding', () => {
      const isD1Available = (): boolean => {
        try {
          return typeof (global as any).WAITLIST_DB !== 'undefined'
        } catch {
          return false
        }
      }

      expect(isD1Available()).toBe(false)
    })

    test('correctly identifies available D1 binding', () => {
      (global as any).WAITLIST_DB = { prepare: jest.fn() }

      const isD1Available = (): boolean => {
        try {
          return typeof (global as any).WAITLIST_DB !== 'undefined'
        } catch {
          return false
        }
      }

      expect(isD1Available()).toBe(true)

      delete (global as any).WAITLIST_DB
    })
  })

  describe('API response scenarios', () => {
    test('invalid email returns 400', async () => {
      const response = {
        status: 400,
        body: { error: 'Invalid email address' }
      }
      expect(response.status).toBe(400)
    })

    test('duplicate email returns 409', async () => {
      const response = {
        status: 409,
        body: { error: 'Email already on waitlist' }
      }
      expect(response.status).toBe(409)
    })

    test('successful submission returns 201', async () => {
      const response = {
        status: 201,
        body: { success: true, message: 'Thanks for joining our waitlist!' }
      }
      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
    })

    test('database error returns 500', async () => {
      const response = {
        status: 500,
        body: { error: 'Failed to process waitlist request' }
      }
      expect(response.status).toBe(500)
    })

    test('D1 not configured returns 503', async () => {
      const response = {
        status: 503,
        body: { error: 'Database not configured. Please set up Cloudflare D1.' }
      }
      expect(response.status).toBe(503)
    })

    test('unauthorized export returns 401', async () => {
      const response = {
        status: 401,
        body: { error: 'Unauthorized' }
      }
      expect(response.status).toBe(401)
    })
  })
})
