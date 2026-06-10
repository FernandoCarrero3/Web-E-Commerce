import { z } from 'zod'

const checkoutSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  address: z.string().min(5, 'Enter a valid shipping address'),
  card: z
    .string()
    .regex(
      /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
      'Enter a valid 16-digit card number'
    ),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format must be MM/YY'),
  cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
})

const validData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  address: '123 Main Street',
  card: '4242 4242 4242 4242',
  expiry: '12/26',
  cvc: '123',
}

describe('Checkout form schema', () => {
  it('accepts valid checkout data', () => {
    expect(() => checkoutSchema.parse(validData)).not.toThrow()
  })

  it('rejects a name shorter than 2 characters', () => {
    const result = checkoutSchema.safeParse({ ...validData, name: 'J' })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Enter your full name')
  })

  it('rejects an invalid email', () => {
    const result = checkoutSchema.safeParse({
      ...validData,
      email: 'not-an-email',
    })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Enter a valid email address')
  })

  it('rejects an address shorter than 5 characters', () => {
    const result = checkoutSchema.safeParse({ ...validData, address: '123' })
    expect(result.success).toBe(false)
  })

  it('accepts card numbers with spaces, dashes, or plain digits', () => {
    expect(() =>
      checkoutSchema.parse({ ...validData, card: '4242424242424242' })
    ).not.toThrow()
    expect(() =>
      checkoutSchema.parse({ ...validData, card: '4242-4242-4242-4242' })
    ).not.toThrow()
    expect(() =>
      checkoutSchema.parse({ ...validData, card: '4242 4242 4242 4242' })
    ).not.toThrow()
  })

  it('rejects a card number with wrong digit count', () => {
    const result = checkoutSchema.safeParse({
      ...validData,
      card: '1234567890',
    })
    expect(result.success).toBe(false)
  })

  it('rejects an invalid expiry format', () => {
    const result = checkoutSchema.safeParse({ ...validData, expiry: '13/26' })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toBe('Format must be MM/YY')
  })

  it('accepts a 4-digit CVC', () => {
    expect(() =>
      checkoutSchema.parse({ ...validData, cvc: '1234' })
    ).not.toThrow()
  })

  it('rejects a CVC shorter than 3 digits', () => {
    const result = checkoutSchema.safeParse({ ...validData, cvc: '12' })
    expect(result.success).toBe(false)
  })
})
