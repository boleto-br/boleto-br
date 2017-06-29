const { moduleElevenBaseNine } = require('../lib/integrity-verificator')

describe('moduleElevenBaseNine main functionality', () => {
  it('moduleElevenBaseNine should calculate verify number integrity, using module Eleven base Nine',() => {
    const actual = moduleElevenBaseNine('2379000000000000004025196753360333600006000')
    const expected = 3
    expect(actual).toEqual(expected)
  })
})
