// @flow
import formatDate from '../utils/format-date'
import assertIsDateLesserThan from '../utils/assert-is-date-lesser-than'
import assertIsGreaterThanZero from '../utils/assert-is-greater-than-zero'

import {
  generateMainHeaderLine,
  generateLineRegisterTypeOne,
  generateTraillerLine
} from './cnab/400'

type SeedingInfo = {
  emitterCompanyCode: string,
  agencyNumber: string,
  accountNumber: number,
  accountDigity: number,
  emitterCompany: string,
  card: string,
  date: Date,
  seedingSequentialNumber: number,
  bills: Array<any>
}

export default function ({
  emitterCompanyCode,
  agencyNumber,
  accountNumber,
  accountDigity,
  emitterCompany,
  card,
  date,
  seedingSequentialNumber,
  bills
}: SeedingInfo): string {
  const endLine = '\n'
  const endFile = '\n'
  const defaultFormatDate = 'DDMMYY'

  const headerLine = generateMainHeaderLine({
    bankCode: 237,
    bank: 'BRADESCO',
    companyCode: emitterCompanyCode,
    company: emitterCompany,
    date: formatDate(date, defaultFormatDate),
    sequentialNumber: seedingSequentialNumber
  })

  const linesBills = bills.map((bill, index) => {
    assertIsDateLesserThan(
      'generateRemittanceFile',
      'expirationDay',
      'issueDay',
      bill.issueDay,
      bill.expirationDay
    )

    if (bill.lateFee) {
      assertIsGreaterThanZero(
        'generateRemittanceFile',
        'lateFeeValuePerDay',
        bill.lateFeeValuePerDay
      )
      assertIsGreaterThanZero(
        'generateRemittanceFile',
        'lateFeePercentual',
        bill.lateFeePercentual
      )
    }
    return generateLineRegisterTypeOne({
      ...bill,
      card,
      agencyNumber,
      accountNumber,
      accountDigity,
      bankCode: 237,
      expirationDay: formatDate(bill.expirationDay, defaultFormatDate),
      issueDay: formatDate(bill.issueDay, defaultFormatDate),
      sequentialNumber: index + 2
    })
  })
  const traillerLine = generateTraillerLine(linesBills.length + 2)

  return (
    headerLine +
    endLine +
    linesBills.join(endLine) +
    endLine +
    traillerLine +
    endFile
  )
}
