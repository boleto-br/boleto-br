const leftPad = require('left-pad')

exports.maturityFactor = date => {
  if (date === 0) {
    return '0000'
  }

  return leftPad(
    Math.floor(
      (date.getTime() - new Date(1997, 9, 7).getTime()) / (24 * 3600 * 1000)
    ),
    4,
    '0'
  )
}
exports.joinStrings = (...args) => args.join('')

exports.fillLeftZeros = (number, n) => {
  if (number === 0) {
    return Array(n).fill('0').join('')
  }
  return leftPad(number, n, '0')
}

exports.sumDigits = num => {
  return num
    .toString()
    .split('')
    .reduce((previous, current) => previous + parseInt(current), 0)
}
