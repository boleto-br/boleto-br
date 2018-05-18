import assertIsGreaterThanZero from '../../lib/utils/assert-is-greater-than-zero'

describe('assertIsGreaterThanZero main functionality', () => {
  it('assertIsGreaterThanZero should throw a TypeError if value is lesser than zero', () => {
    const expected = expect(() => {
      assertIsGreaterThanZero('functionName', 'propName', 0)
    })

    expected.toThrow(TypeError)
    expected.toThrow(/On function `functionName` `propName` is invalid:/)
    expected.toThrow(/Expect: to be gretter than zero/m)
    expected.toThrow(/Actual: `0`/m)
  })

  it('assertIsGreaterThanZero should throw anything if value is gretter than zero', () => {
    expect(() => {
      assertIsGreaterThanZero('functionName', 'propName', 1)
    }).not.toThrow(TypeError)
  })
})
