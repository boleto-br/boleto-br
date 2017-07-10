const rightpad = require('right-pad')
const leftPad = require('left-pad')
const {fillLeftZeros} = require('../../utils')
const {moduleElevenBaseSeven} = require('../../integrity-verificator')

exports.generateMainHeaderLine = ({
  bankCode,
  bank,
  company,
  companyCode,
  date,
  sequentialNumber
}) => {
  const line =
    '01' +
    'REMESSA' +
    '01' +
    rightpad('COBRANCA', 15, ' ') +
    fillLeftZeros(companyCode, 20) +
    rightpad(company, 30, ' ') +
    bankCode +
    rightpad(bank, 15, ' ') +
    date +
    leftPad('', 8, ' ') +
    'MX' +
    fillLeftZeros(sequentialNumber, 7) +
    leftPad('', 277, ' ') +
    '000001'

  return line
}

exports.generateLineRegisterTypeOne = ({
  bankCode,
  card,
  agencyNumber,
  accountNumber,
  accountDigity,
  lateFee,
  lateFeePercentual,
  ourNumber,
  discountPerDay,
  occurencyCode,
  documentNumber,
  maturityDay,
  value,
  debtType,
  issueDay,
  lateFeeValue,
  discountDayLimit,
  discountValue,
  iofValue,
  decreaseValue,
  registerType,
  registerNumber,
  payerName,
  payerAddress,
  messageOne,
  payerPostalCode,
  messageTwo,
  sequentialNumber
}) => {
  const line =
    '1' +
    leftPad('', 19, ' ') +
    '0' +
    fillLeftZeros(card, 3) +
    fillLeftZeros(agencyNumber, 5) +
    fillLeftZeros(accountNumber, 7) +
    accountDigity +
    leftPad('', 25, ' ') +
    bankCode +
    (lateFee ? '2' : '0') +
    (lateFee ? fillLeftZeros(lateFeePercentual, 4) : '0000') +
    fillLeftZeros(ourNumber, 11) +
    moduleElevenBaseSeven(card + fillLeftZeros(ourNumber, 11)) +
    fillLeftZeros(discountPerDay, 10) +
    '2' +
    'N' +
    leftPad('', 14, ' ') + // fix this to be configurable
    occurencyCode +
    fillLeftZeros(documentNumber, 10) +
    maturityDay +
    fillLeftZeros(value, 13) +
    '000' +
    '00000' +
    debtType +
    'N' +
    issueDay +
    '00' +
    '00' +
    fillLeftZeros(lateFeeValue, 13) +
    fillLeftZeros(discountDayLimit, 6) +
    fillLeftZeros(discountValue, 13) +
    fillLeftZeros(iofValue, 13) +
    fillLeftZeros(decreaseValue, 13) +
    registerType +
    fillLeftZeros(registerNumber, 14) +
    rightpad(payerName, 40, ' ') +
    rightpad(payerAddress, 40, ' ') +
    rightpad(messageOne, 12, ' ') +
    payerPostalCode +
    rightpad(messageTwo, 60, ' ') +
    fillLeftZeros(sequentialNumber, 6)

  return line
}

exports.generateTraillerLine = sequentialNumber => {
  return '9' + leftPad('', 393, ' ') + fillLeftZeros(sequentialNumber, 6)
}
