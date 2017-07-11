// @flow
import rightpad from 'right-pad'
import leftPad from 'left-pad'
import {fillLeftZeros,maxLength,minLength} from '../../utils'
import {moduleElevenBaseSeven} from '../../integrity-verificator'

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

  maxLength(functionName,'companyCode',20,companyCode)
  maxLength(functionName,'company',30,company)
  maxLength(functionName,'bank',15,bank)

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
  maturityDay: string,
  value: number,
  debtType: string,
  issueDay: string,
  lateFeeValue: number,
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
  const functionName = 'generateLineRegisterTypeOne'

  maxLength(functionName,'messageOne',12,messageOne)
  maxLength(functionName,'messageTwo',60,messageTwo)
  maxLength(functionName,'ourNumber',14,ourNumber)
  maxLength(functionName,'occurencyCode',2,occurencyCode)
  maxLength(functionName,'registerType',2,registerType)
  maxLength(functionName,'payerName',40,payerName)
  maxLength(functionName,'payerAddress',40,payerAddress)
  maxLength(functionName,'registerNumber',14,registerNumber)
  maxLength(functionName,'card',2,card)
  maxLength(functionName,'debtType',2,debtType)

  minLength(functionName,'registerType',2,registerType)
  minLength(functionName,'occurencyCode',2,occurencyCode)
  minLength(functionName,'card',2,card)
  minLength(functionName,'debtType',2,debtType)

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
