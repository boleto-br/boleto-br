const {maturityFactor, joinStrings, fillLeftZeros} = require('../utils')
const {moduleElevenBaseNine} = require('../integrity-verificator')

exports.barCode = ({maturityDay, value, agency, card, ourNumber, account}) => {
  const bankCode = '237'
  const coinCode = '9'
  const code = joinStrings(
    bankCode,
    coinCode,
    maturityFactor(maturityDay),
    fillLeftZeros(value, 10),
    fillLeftZeros(agency, 4),
    card,
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
