import generateDigitableLine from '../../lib/bradesco/generate-digitable-line'

describe('generateDigitableLine main functionality', () => {
  it('should generate a valid digitable line', () => {
    const bar = generateDigitableLine(
      '23793000000000000004025196753360333600006000'
    )
    const expected = '23794.02510 96753.360336 36000.060008 3 00000000000000'
    expect(bar).toEqual(expected)
  })
})
