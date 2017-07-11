// @flow
import rightpad from 'right-pad'
import leftPad from 'left-pad'
import {fillLeftZeros} from '../../utils'
import {moduleElevenBaseSeven} from '../../integrity-verificator'

type MainHeaderLineInfo = {
  bankCode: string | number,
  bank: string | number,
  company: string | number,
  companyCode: string | number,
  date: string,
  sequentialNumber: string | number
}

export function generateMainHeaderLine({
  bankCode,
  bank,
  company,
  companyCode,
  date,
  sequentialNumber
}: MainHeaderLineInfo): string {
  const line =
    '01' +
    'REMESSA' +
    '01' +
    rightpad('COBRANCA', 15, ' ') +
    fillLeftZeros(companyCode, 20) +
    rightpad(String(company), 30, ' ') +
    bankCode +
    rightpad(String(bank), 15, ' ') +
    date +
    leftPad('', 8, ' ') +
    'MX' +
    fillLeftZeros(sequentialNumber, 7) +
    leftPad('', 277, ' ') +
    '000001'

  return line
}

type Bill = {
  bankCode: string | number,
  card: string | number,
  agencyNumber: string | number,
  accountNumber: string | number,
  accountDigity: string | number,
  lateFee: boolean,
  lateFeePercentual: number,
  ourNumber: string | number,
  discountPerDay: number,
  occurencyCode: string | number,
  documentNumber: string | number,
  maturityDay: string | number,
  value: number,
  debtType: string | number,
  issueDay: string | number,
  lateFeeValue: number,
  discountDayLimit: string | number,
  discountValue: number,
  iofValue: number,
  decreaseValue: number,
  registerType: string | number,
  registerNumber: string | number,
  payerName: string,
  payerAddress: string,
  messageOne: string,
  payerPostalCode: string | number,
  messageTwo: string,
  sequentialNumber: string | number
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
}: Bill): string {
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

export function generateTraillerLine(sequentialNumber: number): string {
  return '9' + leftPad('', 393, ' ') + fillLeftZeros(sequentialNumber, 6)
}
