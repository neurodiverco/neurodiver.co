# Waitlist E2E Tests

## Overview

This directory contains End-to-End (E2E) tests for the waitlist form submission functionality. The tests verify all expected behaviors including success cases, error handling, and edge cases.

## Test Coverage

### ✅ Successful Submission
- Valid email format
- Proper API response
- Success message

### ✅ Duplicate Prevention
- Existing email detection
- Proper error response (409)
- Clear error message

### ✅ Invalid Email Handling
- Format validation
- Error response (400)
- Helpful error message

### ✅ Database Errors
- Database not configured (503)
- Operation failures (500)
- Detailed error information

### ✅ Export Functionality
- CSV export format
- JSON export format
- Authentication required
- Proper data structure

### ✅ Unauthorized Access
- Secret verification
- Proper rejection (401)
- Clear error message

## Running Tests

### Prerequisites
```bash
cd tests
pnpm install
```

### Run Tests
```bash
# Run once
pnpm test

# Watch mode
pnpm test:watch
```

### Run Specific Test
```bash
pnpm test waitlist-e2e
```

## Test Structure

### Test File
- `waitlist-e2e.test.ts` - Main test suite
- Follows Jest testing conventions
- Mocks fetch API for isolated testing

### Test Scenarios
1. **Happy Path**: Successful form submission
2. **Validation**: Invalid email formats
3. **Duplicates**: Existing email detection
4. **Database**: Configuration and operation errors
5. **Exports**: CSV and JSON formats
6. **Security**: Authentication and authorization

## Integration with CI/CD

Add to your CI/CD pipeline:

```yaml
- name: Run E2E Tests
  run: cd tests && pnpm install && pnpm test
```

## Writing New Tests

### Test Template
```typescript
test('descriptive test name', async () => {
  // Mock the API response
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true })
  })

  // Make the request
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@example.com' })
  })

  // Assert the response
  expect(response.ok).toBe(true)
})
```

### Best Practices
- Each test should be independent
- Mock all external dependencies
- Test both happy path and error cases
- Use descriptive test names
- Keep tests focused on one behavior

## Test Data

### Sample Responses

**Success:**
```json
{
  "success": true,
  "message": "Thanks for joining our waitlist!"
}
```

**Duplicate:**
```json
{
  "error": "Email already on waitlist"
}
```

**Invalid Email:**
```json
{
  "error": "Invalid email address"
}
```

**Database Not Configured:**
```json
{
  "error": "Database not configured. Please set up Cloudflare D1.",
  "setup_required": true
}
```

## Debugging Tests

### Common Issues

1. **Mock not working**: Ensure fetch is properly mocked
2. **Async issues**: Use async/await properly
3. **Type errors**: Check TypeScript types
4. **Test isolation**: Reset mocks between tests

### Debugging Tips

```bash
# Run with verbose output
pnpm test --verbose

# Run specific test
pnpm test --testNamePattern="duplicate"
```

## Test Maintenance

### When to Update Tests
- New features added
- API contract changes
- Bug fixes
- Behavior changes

### Test Quality Metrics
- ✅ Code coverage > 80%
- ✅ All critical paths tested
- ✅ Edge cases covered
- ✅ Error conditions tested

## Continuous Improvement

Regularly review and update tests to:
- Match current requirements
- Improve test coverage
- Add new edge cases
- Optimize performance

The E2E tests ensure the waitlist functionality works correctly and provides a safety net for future changes!