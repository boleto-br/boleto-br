const { moduleElevenBaseNine } = require('../lib/integrity-verificator')

describe('moduleElevenBaseNine main functionality', () => {
  it('moduleElevenBaseNine should calculate verify number integrity, using module Eleven base Nine',() => {
    const actual = moduleElevenBaseNine('1234567')
    const expected = 9
    expect(actual).toEqual(expected)
  })
})
