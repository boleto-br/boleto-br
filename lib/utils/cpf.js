// Blacklist common values.
const BLACKLIST = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909'
]

const LOOSE_STRIP_REGEX = /[^\d]/g

export function verifierDigit(numbers: string): number {
  const digits = numbers.split('').map(number => {
    return parseInt(number, 10)
  })

  const modulus = digits.length + 1

  const mod =
    digits
      .map((number, index) => {
        return number * (modulus - index)
      })
      .reduce((buffer, number) => {
        return buffer + number
      }) % 11

  return mod < 2 ? 0 : 11 - mod
}

function strip(number: string | number): string {
  return (number || '').toString().replace(LOOSE_STRIP_REGEX, '')
}

export function isValid(number: string | number): boolean {
  const stripped = strip(number)

  // CPF must be defined
  if (!stripped) {
    return false
  }

  // CPF must have 11 chars
  if (stripped.length !== 11) {
    return false
  }

  // CPF can't be blacklisted
  if (BLACKLIST.includes(stripped)) {
    return false
  }

  let numbers = stripped.substr(0, 9)
  numbers += verifierDigit(numbers)
  numbers += verifierDigit(numbers)

  return numbers.substr(-2) === stripped.substr(-2)
}
