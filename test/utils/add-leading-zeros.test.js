import addLeadingZeros from '../../lib/utils/add-leading-zeros'

describe('addLeadingZeros main functionality', () => {
  it('should add leading zeros to a string or number', () => {
    expect(addLeadingZeros(0, 3)).toBe('000')
    expect(addLeadingZeros(78, 5)).toBe('00078')
    expect(addLeadingZeros('hey', 5)).toBe('00hey')
  })
})
