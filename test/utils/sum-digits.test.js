import sumDigits from '../../lib/utils/sum-digits'

describe('sumDigits main functionality', () => {
  it('should sum the digits of a string', () => {
    expect(sumDigits(14)).toEqual(5)
  })
})
