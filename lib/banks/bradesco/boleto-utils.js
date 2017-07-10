const {maturityFactor, joinStrings, fillLeftZeros} = require('../../utils')
const {moduleElevenBaseNine, moduleTen} = require('../../integrity-verificator')

exports.barCode = ({maturityDay, value, agency, card, ourNumber, account}) => {
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
    moduleElevenBaseNine(code),
    code.substring(4, code.length)
  )
}

exports.digitableLine = barcode => {
  const firstPart = joinStrings(
    barcode.substring(0, 4),
    barcode.substring(19, 20),
    '.',
    barcode.substring(20, 24),
    moduleTen(barcode.substring(0, 4) + barcode.substring(19, 24))
  )

  const secondPart = joinStrings(
    barcode.substring(24, 29),
    '.',
    barcode.substring(29, 34),
    moduleTen(barcode.substring(24, 34))
  )

  const thirdPart = joinStrings(
    barcode.substring(34, 39),
    '.',
    barcode.substring(39, 44),
    moduleTen(barcode.substring(34, 44))
  )

  const fourthPart = barcode.substring(4, 5)
  const sixthPart = barcode.substring(5, 19)

  return [firstPart, secondPart, thirdPart, fourthPart, sixthPart].join(' ')
}
