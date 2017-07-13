import generateRemittanceFile from '../../lib/bradesco/generate-remittance-file'

describe('bradescoRemittance main functionality', () => {
  it('should generate a valid remittance file', () => {
    const file = generateRemittanceFile({
      emitterCompanyCode: '433923',
      agencyNumber: '7506',
      agencyDigit: 1,
      accountNumber: 54291,
      accountDigity: 1,
      emitterCompany: 'ACME. SA',
      card: '09',
      date: new Date(2017, 6, 10),
      seedingSequentialNumber: 1,
      bills: [
        {
          ourNumber: '1',
          documentNumber: '1',
          value: 10000,
          lateFee: true,
          lateFeePercentual: 2, //
          lateFeeValuePerDay: 17,
          occurencyCode: '01',
          expirationDay: new Date(2017, 6, 10),
          debtType: '12',
          issueDay: new Date(2017, 6, 10),
          discountDayLimit: 0,
          discountValue: 0, //?
          iofValue: 0,
          decreaseValue: 0,
          discountPerDay: 0, // ?
          registerType: '01',
          registerNumber: '83901298000138',
          payerName: 'JOHN BUYER',
          payerAddress: 'CLOWN SC',
          messageOne: '',
          payerPostalCode: '88703500',
          messageTwo: '083901298000138 ACME SA'
        }
      ]
    })
    const expected =
      '01REMESSA01COBRANCA       00000000000000433923ACME. SA                      237BRADESCO       100717        MX0000001                                                                                                                                                                                                                                                                                     000001\n1                   00090750600542911                         2372000200000000001100000000002N              01000000000110071700000000100000000000012N100717000000000000000170000000000000000000000000000000000000000000000183901298000138JOHN BUYER                              CLOWN SC                                            88703500083901298000138 ACME SA                                     000002\n9                                                                                                                                                                                                                                                                                                                                                                                                         000003\n'
    expect(file).toEqual(expected)
  })
})
