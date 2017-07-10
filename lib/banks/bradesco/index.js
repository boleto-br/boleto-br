const {formatDate} = require('vanilla-commons')
const {
  generateMainHeaderLine,
  generateLineRegisterTypeOne,
  generateTraillerLine
} = require('./cnab-400')

exports.parseSeendingToFile = ({
  emitterCompanyCode,
  agencyNumber,
  agencyDigit,
  accountNumber,
  accountDigity,
  emitterCompany,
  card,
  date,
  seedingSequentialNumber,
  bills
}) => {
  const endLine = '\n'
  const endFile = '\n'
  const headerLine = generateMainHeaderLine({
    bankCode: '237',
    bank: 'BRADESCO',
    companyCode: emitterCompanyCode,
    company: emitterCompany, // max lex 30
    date: formatDate('{DD}{MM}{YY}',date), // parse date to DDMMYY {DD}{MM}{YY}
    sequentialNumber: seedingSequentialNumber
  })

  const linesBills = bills.map((bill,index) => {
    return generateLineRegisterTypeOne({
      bankCode: '237',
      card: card,
      agencyNumber: agencyNumber,
      accountNumber: accountNumber,
      accountDigity: accountDigity,
      lateFee: bill.lateFee,
      lateFeePercentual: bill.lateFeePercentual,
      ourNumber: bill.ourNumber,
      discountPerDay: bill.discountPerDay,
      occurencyCode: bill.occurencyCode,
      maturityDay: formatDate('{DD}{MM}{YY}',bill.maturityDay),
      documentNumber: bill.documentNumber,
      value: bill.value,
      debtType: bill.debtType,
      issueDay: formatDate('{DD}{MM}{YY}',bill.issueDay), // parse to ddmmyy
      lateFeeValue: bill.lateFeeValue, // float to integer
      discountDayLimit: bill.discountDayLimit,
      discountValue: bill.discountValue,
      iofValue: bill.iofValue,
      decreaseValue: bill.decreaseValue,
      registerType: bill.registerType,
      registerNumber: bill.registerNumber,
      payerName: bill.payerName,
      payerAddress: bill.payerAddress,
      messageOne: bill.messageOne || ' ',
      payerPostalCode: bill.payerPostalCode,
      messageTwo: bill.messageTwo,
      sequentialNumber: index + 2
    })
  })
  const traillerLine = generateTraillerLine(linesBills.length + 2)

   return headerLine +
          endLine +
          linesBills.join(endLine) +
          endLine +
          traillerLine
          endFile
}
