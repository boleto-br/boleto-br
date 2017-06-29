const {
  barCode
} = require('../../lib/banks/bradesco')

describe('bradesco bank main functionality', () => {
  it('should generate a valid barcode data', () => {
    const bar = barCode({
      maturityDay: new Date(new Date().getTime() + 5 * 24 * 3600 * 1000),
      agency: 1234,
      value: 1500,
      card: 9,
      account: 1234,
      ourNumber: 1,
    })
    const expected = '2379172100000001500123490000000000100012340'
    expect(bar).toEqual(expected)
  })
})
