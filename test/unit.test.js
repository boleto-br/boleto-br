const {sumDigits} = require('../lib/utils')

describe('sumDigits main functionality', () => {
  it('sumDigits should sum to digits', () => {
    const expected = 5
    const sum = sumDigits(14)
    expect(sum).toEqual(5)
  })
})
