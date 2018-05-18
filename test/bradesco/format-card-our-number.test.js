import formatCardOurNumber from '../../lib/bradesco/format-card-our-number'

describe('formatCardOurNumber main functionality', () => {
  it('formatCardOurNumber should format card and ourNumber together', () => {
    const formated = formatCardOurNumber({card: '09', ourNumber: '1'})
    const expected = '09/00000000001-4'
    expect(formated).toEqual(expected)
  })
})
