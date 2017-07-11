import {barCode, digitableLine} from '../../lib/banks/bradesco/boleto-utils'
import {
  generateMainHeaderLine,
  generateLineRegisterTypeOne,
  generateTraillerLine
} from '../../lib/banks/bradesco/cnab-400'
import {parseSeendingToFile} from '../../lib/banks/bradesco'

describe('boleto-utils main functionality', () => {
  it('should generate a valid barcode data', () => {
    const bar = barCode({
      maturityDay: new Date(0),
      agency: '4025',
      value: 0,
      card: '19',
      account: 600,
      ourNumber: '67533603336'
    })
    const expected = '23793000000000000004025196753360333600006000'
    expect(bar).toEqual(expected)
  })

  it('should generate a valid digitable line', () => {
    const bar = digitableLine('23793000000000000004025196753360333600006000')
    const expected = '23794.02510 96753.360336 36000.060008 3 00000000000000'
    expect(bar).toEqual(expected)
  })
})

describe('bradesco cnab 400 main functionality', () => {
  it('should generate a header line', () => {
    const line = generateMainHeaderLine({
      bankCode: 237,
      bank: 'BRADESCO',
      companyCode: '433923',
      company: 'ASSOC. CATARINENSE DE MEDICINA', // max lex 30
      date: '201216', //DDMMYY
      sequentialNumber: 26
    })

    const expected =
      '01REMESSA01COBRANCA       00000000000000433923ASSOC. CATARINENSE DE MEDICINA237BRADESCO       201216        MX0000026                                                                                                                                                                                                                                                                                     000001'

    expect(line).toEqual(expected)
  })

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

  it('should generate a trailler line', () => {
    const line = generateTraillerLine(3)
    const expected =
      '9                                                                                                                                                                                                                                                                                                                                                                                                         000005'
  })
})

describe('parseSeendingToFile main functionality', () => {
  it('should generate a valid seeding file', () => {
    const file = parseSeendingToFile({
      emitterCompanyCode: '433923',
      agencyNumber: '7506',
      agencyDigit: 1,
      accountNumber: 54291,
      accountDigity: 1,
      emitterCompany: 'ASSOC. CATARINENSE DE MEDICINA',
      card: '09',
      date: new Date(2017,6,10),
      seedingSequentialNumber: 1,
      bills: [
        {
          ourNumber: '1',
          documentNumber: '1',
          value: 10000,
          lateFee: true,
          lateFeePercentual: 2,
          lateFeeValue: 17,
          occurencyCode: '01',
          maturityDay: new Date(2017,6,10),
          debtType: '12',
          issueDay: new Date(2017,6,10),
          discountDayLimit: 0,
          discountValue: 0,
          iofValue: 0,
          decreaseValue: 0,
          discountPerDay: 0,
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
      '01REMESSA01COBRANCA       00000000000000433923ASSOC. CATARINENSE DE MEDICINA237BRADESCO       100717        MX0000001                                                                                                                                                                                                                                                                                     000001\n1                   00090750600542911                         2372000200000000001100000000002N              01000000000110071700000000100000000000012N100717000000000000000170000000000000000000000000000000000000000000000183901298000138JOHN BUYER                              CLOWN SC                                            88703500083901298000138 ACME SA                                     000002\n9                                                                                                                                                                                                                                                                                                                                                                                                         000003\n'
    expect(file).toEqual(expected)
  })
})
