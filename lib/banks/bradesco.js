const leftPad = require('left-pad')
const {maturityFactor, joinStrings, fillLeftZeros} = require('../utils')

const verifyDigit = code => {
  return '1'
}

const barcode = ({maturityDay, value, agency, card, ourNumber, account}) => {
  const bankCode = '237'
  const coinCode = '9'

  const code = joinStrings(
    bankCode,
    coinCode,
    maturityFactor(maturityDay),
    fillLeftZeros(value, 10),
    fillLeftZeros(agency, 4),
    fillLeftZeros(card, 2),
    fillLeftZeros(ourNumber, 11),
    fillLeftZeros(account, 7),
    '0'
  )

  return joinStrings(
    code.substring(0, 4),
    verifyDigit(code),
    code.substring(4, code.length)
  )
}

const bar = barcode({maturityDay:new Date(), value:1600, agency:123, card:20, ourNumber: 1,account:1234})
console.log(bar)
