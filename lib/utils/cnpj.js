// Blacklist common values.
const BLACKLIST = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999'
]

const LOOSE_STRIP_REGEX = /[^\d]/g

export function verifierDigit(numbers: string): number {
  const reverse = numbers
    .split('')
    .map(number => {
      return parseInt(number, 10)
    })
    .reverse()

  let index = 2
  const sum = reverse.reduce((buffer, number) => {
    buffer += number * index
    index = index === 9 ? 2 : index + 1
    return buffer
  }, 0)

  const mod = sum % 11
  return mod < 2 ? 0 : 11 - mod
}

export function strip(number: string | number): string {
  return (number || '').toString().replace(LOOSE_STRIP_REGEX, '')
}

export function isValid(number: string | number): boolean {
  const stripped = strip(number)

  // CNPJ must be defined
  if (!stripped) {
    return false
  }

  // CNPJ must have 14 chars
  if (stripped.length !== 14) {
    return false
  }

  // CNPJ can't be blacklisted
  if (BLACKLIST.includes(stripped)) {
    return false
  }

  let numbers = stripped.substr(0, 12)
  numbers += verifierDigit(numbers)
  numbers += verifierDigit(numbers)

  return numbers.substr(-2) === stripped.substr(-2)
}
