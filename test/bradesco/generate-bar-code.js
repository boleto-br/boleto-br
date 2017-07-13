import generateBarCode from '../../lib/bradesco/generate-bar-code'

describe('generateBarCode main functionality', () => {
  it('should generate a valid barcode data', () => {
    const bar = generateBarCode({
      expirationDay: new Date(0),
      agency: '4025',
      account: 600,
      value: 0,
      card: '19',
      ourNumber: '67533603336'
    })
    const expected = '23793000000000000004025196753360333600006000'
    expect(bar).toEqual(expected)
  })
})
