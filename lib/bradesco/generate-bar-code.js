// @flow
import calculateExpirationFactor from '../utils/calculate-expiration-factor'
import addLeadingZeros from '../utils/add-leading-zeros'
import {moduleElevenBaseNine} from '../integrity-verificator'

type BarCodeArgs = {
  maturityDay: Date,
  value: number,
  agency: string,
  card: string,
  ourNumber: string,
  account: number
}

export default function ({
  maturityDay,
  value,
  agency,
  card,
  ourNumber,
  account
}: BarCodeArgs): string {
  const bankCode = '237'
  const coinCode = '9'
  const code =
    bankCode +
    coinCode +
    calculateExpirationFactor(maturityDay) +
    addLeadingZeros(value, 10) +
    addLeadingZeros(agency, 4) +
    addLeadingZeros(card, 2) +
    addLeadingZeros(ourNumber, 11) +
    addLeadingZeros(account, 7) +
    '0'

  return (
    code.substring(0, 4) +
    String(moduleElevenBaseNine(code)) +
    code.substring(4, code.length)
  )
}
