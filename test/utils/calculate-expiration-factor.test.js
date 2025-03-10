import calculateExpirationFactor from '../../lib/utils/calculate-expiration-factor'

describe('calculateExpirationFactor main funcionality', () => {
  it('calculate the expiration factor', () => {
    expect(calculateExpirationFactor(new Date(2017, 6, 10))).toBe('7216')
    expect(calculateExpirationFactor(new Date(1998, 6, 10))).toBe('0276')
    expect(calculateExpirationFactor(new Date(2017, 11, 4))).toBe('7363')
  })

  it('calculateExpirationFactor after 2025-02-22', () => {
    expect(calculateExpirationFactor(new Date(2026, 1, 21))).toBe('1364')
    expect(calculateExpirationFactor(new Date(2025, 2, 21))).toBe('1027')
    expect(calculateExpirationFactor(new Date(2025, 1, 22))).toBe('1000')
    expect(calculateExpirationFactor(new Date(2049, 9, 13))).toBe('9999')
  })

  it('should handle expiration dates prior to 1997', () => {
    expect(calculateExpirationFactor(new Date(0))).toBe('0000')
    expect(calculateExpirationFactor(new Date(1997, 6, 10))).toBe('0000')
    expect(calculateExpirationFactor(new Date(1997, 9, 6))).toBe('0000')
    expect(calculateExpirationFactor(new Date(1997, 9, 7))).toBe('0000')
  })
})
