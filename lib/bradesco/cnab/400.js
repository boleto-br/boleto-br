// @flow
import padEnd from 'pad-end'
import padStart from 'pad-start'
import {assertMaxLength, assertMinLength} from '../../utils/assert-length'
import addLeadingZeros from '../../utils/add-leading-zeros'
import {moduleElevenBaseSeven} from '../../integrity-verificator/index'

type MainHeaderLineInfo = {
  bankCode: number,
  bank: string,
  company: string,
  companyCode: string,
  date: string,
  sequentialNumber: number
}

export function generateMainHeaderLine({
  bankCode,
  bank,
  company,
  companyCode,
  date,
  sequentialNumber
}: MainHeaderLineInfo): string {
  const functionName = 'generateMainHeaderLine'

  assertMaxLength(functionName, 'companyCode', 20, companyCode)
  assertMaxLength(functionName, 'company', 30, company)
  assertMaxLength(functionName, 'bank', 15, bank)

  const line =
    '01' +
    'REMESSA' +
    '01' +
    padEnd('COBRANCA', 15, ' ') +
    addLeadingZeros(companyCode, 20) +
    padEnd(company, 30, ' ') +
    bankCode +
    padEnd(bank, 15, ' ') +
    date +
    padStart('', 8, ' ') +
    'MX' +
    addLeadingZeros(sequentialNumber, 7) +
    padStart('', 277, ' ') +
    '000001'

  return line
}

type Bill = {
  bankCode: number,
  card: string,
  agencyNumber: string,
  accountNumber: number,
  accountDigity: number,
  lateFee: boolean,
  lateFeePercentual: number,
  ourNumber: string,
  discountPerDay: number,
  occurencyCode: string,
  documentNumber: string,
  expirationDay: string,
  value: number,
  debtType: string,
  issueDay: string,
  lateFeeValuePerDay: number,
  discountDayLimit: number,
  discountValue: number,
  iofValue: number,
  decreaseValue: number,
  registerType: string,
  registerNumber: string,
  payerName: string,
  payerAddress: string,
  messageOne: string,
  payerPostalCode: string,
  messageTwo: string,
  sequentialNumber: number
}

export function generateLineRegisterTypeOne({
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
  expirationDay,
  value,
  debtType,
  issueDay,
  lateFeeValuePerDay,
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
}: Bill): string {
  const functionName = 'generateLineRegisterTypeOne'

  assertMaxLength(functionName, 'messageOne', 12, messageOne)
  assertMaxLength(functionName, 'messageTwo', 60, messageTwo)
  assertMaxLength(functionName, 'ourNumber', 14, ourNumber)
  assertMaxLength(functionName, 'occurencyCode', 2, occurencyCode)
  assertMaxLength(functionName, 'registerType', 2, registerType)
  assertMaxLength(functionName, 'payerName', 40, payerName)
  assertMaxLength(functionName, 'payerAddress', 40, payerAddress)
  assertMaxLength(functionName, 'registerNumber', 14, registerNumber)
  assertMaxLength(functionName, 'card', 2, card)
  assertMaxLength(functionName, 'debtType', 2, debtType)

  assertMinLength(functionName, 'registerType', 2, registerType)
  assertMinLength(functionName, 'occurencyCode', 2, occurencyCode)
  assertMinLength(functionName, 'card', 2, card)
  assertMinLength(functionName, 'debtType', 2, debtType)

  const line =
    '1' +
    padStart('', 19, ' ') +
    '0' +
    addLeadingZeros(card, 3) +
    addLeadingZeros(agencyNumber, 5) +
    addLeadingZeros(accountNumber, 7) +
    accountDigity +
    padStart('', 25, ' ') +
    bankCode +
    (lateFee ? '2' : '0') +
    (lateFee ? addLeadingZeros(lateFeePercentual, 4) : '0000') +
    addLeadingZeros(ourNumber, 11) +
    moduleElevenBaseSeven(card + addLeadingZeros(ourNumber, 11)) +
    addLeadingZeros(discountPerDay, 10) +
    '2' +
    'N' +
    padStart('', 14, ' ') + // Fix this to be configurable
    occurencyCode +
    addLeadingZeros(documentNumber, 10) +
    expirationDay +
    addLeadingZeros(value, 13) +
    '000' +
    '00000' +
    debtType +
    'N' +
    issueDay +
    '00' +
    '00' +
    addLeadingZeros(lateFeeValuePerDay, 13) +
    addLeadingZeros(discountDayLimit, 6) +
    addLeadingZeros(discountValue, 13) +
    addLeadingZeros(iofValue, 13) +
    addLeadingZeros(decreaseValue, 13) +
    registerType +
    addLeadingZeros(registerNumber, 14) +
    padEnd(payerName, 40, ' ') +
    padEnd(payerAddress, 40, ' ') +
    padEnd(messageOne, 12, ' ') +
    payerPostalCode +
    padEnd(messageTwo, 60, ' ') +
    addLeadingZeros(sequentialNumber, 6)

  return line
}

export function generateTraillerLine(sequentialNumber: number): string {
  return '9' + padStart('', 393, ' ') + addLeadingZeros(sequentialNumber, 6)
}
