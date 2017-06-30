const {sumDigits} = require('../utils')

exports.moduleElevenBaseNine = num => {
  const sum = num
    .split('')
    .reverse()
    .reduce(
      (previous, current, index) =>
        previous + parseInt(current) * (index % 8 + 2),
      0
    )

  const digit = 11 - sum % 11

  if (digit < 2 || digit > 9) {
    return 1
  }
  return digit
}

exports.moduleElevenBaseSeven = num => {
  const sum = num
    .split('')
    .reverse()
    .reduce(
      (previous, current, index) =>
        previous + parseInt(current) * (index % 6 + 2),
      0
    )

  const remaind = sum % 11
  if (remaind === 1) {
    return 'P'
  }
  return 11 - remaind
}

exports.moduleTen = num => {
  const sum = num.split('').reverse().reduce((previous, current, index) => {
    const factor = (index + 1) % 2 === 0 ? 1 : 2
    const num = factor * parseInt(current)
    const numFinal = num < 9 ? num : sumDigits(num)

    return previous + numFinal
  }, 0)

  const remain = sum % 10
  return remain === 0 ? 0 : 10 - remain
}
