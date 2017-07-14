// @flow
import {formatDate} from 'vanilla-commons'
import assertIsDateLesserThan from '../utils/assert-is-date-lesser-than'
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

  const headerLine = generateMainHeaderLine({
    bankCode: 237,
    bank: 'BRADESCO',
    companyCode: emitterCompanyCode,
    company: emitterCompany,
    date: formatDate('{DD}{MM}{YY}', date),
    sequentialNumber: seedingSequentialNumber
  })

  const linesBills = bills.map((bill, index) => {
    assertIsDateLesserThan(
      'generateRemittanceFile',
      'expirationDay',
      'issueDay',
      bill.expirationDay,
      bill.issueDay
    )

    return generateLineRegisterTypeOne({
      ...bill,
      card,
      agencyNumber,
      accountNumber,
      accountDigity,
      bankCode: 237,
      expirationDay: formatDate('{DD}{MM}{YY}', bill.expirationDay),
      issueDay: formatDate('{DD}{MM}{YY}', bill.issueDay),
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
