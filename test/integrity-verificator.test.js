const {
  moduleElevenBaseNine,
  moduleElevenBaseSeven,
  moduleTen
} = require('../lib/integrity-verificator')

describe('moduleElevenBaseNine main functionality', () => {
  it('moduleElevenBaseNine should calculate checker number, using module 11 base 9', () => {
    const actual = moduleElevenBaseNine('2379000000000000004025196753360333600006000')
    const expected = 3
    expect(actual).toEqual(expected)
  })
})

describe('moduleElevenBaseNine main functionality', () => {
  it('moduleElevenBaseSeven should calculate checker number, using module 11 base 7', () => {
    const actual = moduleElevenBaseSeven('1967533603336')
    const expected = 3
    expect(actual).toEqual(expected)
  })
})

describe('moduleTen main functionality', () => {
  it('moduleTen should calculate checker number, using module 10', () => {
    const actual = moduleTen('237940251')
    const expected = 0
    expect(actual).toEqual(expected)
  })
})
