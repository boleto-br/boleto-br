// @flow
import {formatDate} from 'vanilla-commons'
import {
  generateMainHeaderLine,
  generateLineRegisterTypeOne,
  generateTraillerLine
} from './cnab-400'

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

export function parseSeendingToFile({
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
    return generateLineRegisterTypeOne({
      ...bill,
      card,
      agencyNumber,
      accountNumber,
      accountDigity,
      bankCode: 237,
      maturityDay: formatDate('{DD}{MM}{YY}', bill.maturityDay),
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
