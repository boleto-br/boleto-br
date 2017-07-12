import {
  generateMainHeaderLine,
  generateLineRegisterTypeOne,
  generateTraillerLine
} from '../../../lib/bradesco/cnab/400'

describe('generateMainHeaderLine main functionality', () => {
  it('should generate a header line', () => {
    const line = generateMainHeaderLine({
      bankCode: 237,
      bank: 'BRADESCO',
      companyCode: '433923',
      company: 'ASSOC. CATARINENSE DE MEDICINA',
      date: '201216',
      sequentialNumber: 26
    })

    const expected =
      '01REMESSA01COBRANCA       00000000000000433923ASSOC. CATARINENSE DE MEDICINA237BRADESCO       201216        MX0000026                                                                                                                                                                                                                                                                                     000001'

    expect(line).toEqual(expected)
  })
})

describe('generateLineRegisterTypeOne main functionality', () => {
  it('should generate a valid register line type 1', () => {
    const line = generateLineRegisterTypeOne({
      bankCode: 237,
      card: '09',
      agencyNumber: '7506',
      agencyDigit: 0,
      accountNumber: 54291,
      accountDigity: 1,
      lateFee: true,
      lateFeePercentual: 200,
      ourNumber: '2000102625',
      discountPerDay: 0,
      occurencyCode: '01',
      maturityDay: '100117',
      documentNumber: '2000102625',
      value: 50896,
      debtType: '12',
      issueDay: '161216',
      lateFeeValue: 17, // R$ 0,17
      discountDayLimit: 0,
      discountValue: 0,
      iofValue: 0,
      decreaseValue: 0,
      registerType: '01',
      registerNumber: '1841146919',
      payerName: 'MAURO TIBOLA',
      payerAddress: 'XANXERE                               SC',
      messageOne: ' ',
      payerPostalCode: '89820000',
      messageTwo: '083901298000138  ASSOCIACAO CATARINENSE DE MEDICINA - ACM',
      sequentialNumber: 2
    })

    const expected =
      '1                   00090750600542911                         2372020002000102625200000000002N              01200010262510011700000000508960000000012N161216000000000000000170000000000000000000000000000000000000000000000100001841146919MAURO TIBOLA                            XANXERE                               SC            89820000083901298000138  ASSOCIACAO CATARINENSE DE MEDICINA - ACM   000002'

    expect(line).toEqual(expected)
  })
})

describe('generateTraillerLine main functionality', () => {
  it('should generate a trailler line', () => {
    const line = generateTraillerLine(3)
    const expected =
      '9                                                                                                                                                                                                                                                                                                                                                                                                         000003'

    expect(line).toBe(expected)
  })
})
