// Jest setup file
// Mock fetch if not available
global.fetch = global.fetch || (() => {
  throw new Error('Fetch is not mocked in tests')
})
