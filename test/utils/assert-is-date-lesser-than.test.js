import assertIsDateLesserThan from '../../lib/utils/assert-is-date-lesser-than'

describe('assertIsDateLesserThan main functionality', () => {
  it('throws a type error if a first Date is gretter than second Date', () => {
    const expected = expect(() => {
      assertIsDateLesserThan(
        'funcName',
        'firstDate',
        'secondDate',
        new Date(2017, 6, 11),
        new Date(2017, 6, 10)
      )
    })

    expected.toThrow(TypeError)
    expected.toThrow(
      /On function `funcName` Date comparison generated an unexpected result:/m
    )
    expected.toThrow(/Expect: `firstDate` to be lesser than `secondDate`/m)
    expected.toThrow(/Actual: `firstDate` is greater than `secondDate`/m)
  })

  it('should do nothing if firstDate is lesser than second Date', () => {
    const expected = expect(() => {
      assertIsDateLesserThan(
        'funcName',
        'firstDate',
        'secondDate',
        new Date(2017, 6, 9),
        new Date(2017, 6, 10)
      )
    })
    expected.not.toThrow(TypeError)
  })
})
