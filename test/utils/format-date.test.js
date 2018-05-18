import formatDate from '../../lib/utils/format-date'

describe('formatDate main functionality', () => {
  it('should format Date for remittance file format', () => {
    expect(formatDate(new Date(2017, 3, 10), 'DDMMYY')).toEqual('100417')
  })
})
