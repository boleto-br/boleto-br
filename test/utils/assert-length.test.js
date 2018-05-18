import {assertMaxLength, assertMinLength} from '../../lib/utils/assert-length'

describe('assertMaxLength main functionality', () => {
  it('throws a type error if a property exceeds the max length', () => {
    const expected = expect(() => {
      assertMaxLength('funcName', 'prop1', 4, 'heythere')
    })

    expected.toThrow(TypeError)
    expected.toThrow(
      /On function `funcName`, property `prop1` has an invalid length:/
    )
    expected.toThrow(/Expected max length: 4/m)
    expected.toThrow(/Actual length: 8/m)
  })

  it('should do nothing if a property has the right length', () => {
    const expected = expect(() => {
      assertMaxLength('funcName', 'prop1', 4, 'hey')
    })
    expected.not.toThrow(TypeError)
  })
})

describe('assertMinLength main functionality', () => {
  it('throws a type error if a property does not have the min length', () => {
    const expected = expect(() => {
      assertMinLength('funcName', 'prop1', 4, 'hey')
    })

    expected.toThrow(TypeError)
    expected.toThrow(
      /On function `funcName`, property `prop1` has an invalid length:/
    )
    expected.toThrow(/Expected min length: 4/m)
    expected.toThrow(/Actual length: 3/m)
  })

  it('should do nothing if a property has the right length', () => {
    const expected = expect(() => {
      assertMinLength('funcName', 'prop1', 2, 'hey')
    })
    expected.not.toThrow(TypeError)
  })
})
