import {sumDigits} from '../lib/utils'

describe('sumDigits main functionality', () => {
  it('should sum to digits', () => {
    expect(sumDigits(14)).toEqual(5)
  })
})
