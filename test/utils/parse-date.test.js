import parseDate from '../../lib/utils/parse-date'

describe('parseDate main functionality', () => {
  it('should format Date for remittance file format', () => {
    expect(parseDate('100417')).toEqual(new Date(2017, 3, 10))
  })
})
