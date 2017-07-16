import billFactory from '../../lib/bill/bill-factory'
import bradesco from '../../lib/bradesco/'

describe('billFactory main functionality', () => {
  it('generateBillData Promise should produce a result a new Object with new values of barcodeData, digitableLine,formatedOurNumber', () => {
    expect.assertions(1)
    const bradescoBill = billFactory(bradesco)

    const boletos = [
      {
        visibleExpirationDate: new Date(17, 11, 25),
        expirationDay: new Date(17, 11, 25),
        issueDate: new Date(17, 10, 6),
        billingDate: new Date(17, 10, 6),
        agency: '4025',
        agencyDigit: '0',
        account: 600,
        accountDigit: '1',
        value: 15000,
        card: '09',
        ourNumber: '1',
        paymentPlaceArea:
          'Pagável Preferencialmente na rede Bradesco ou no Bradesco expresso',
        payeeDescription:
          'ACME SA. R. Adolfo Catani, 76, Jardim Macarengo, São Carlos - SP Cep: 13560-470',
        documentNumber: '000000001',
        documentType: '01',
        acceptance: '09035344952',
        cip: '000',
        coinType: '9',
        quantity: '0',
        discountValue: null,
        lateFeeValue: null,
        payerInfo: 'Nome do Pagador/CPF/CNPJ/Endereço ',
        guarantorInfo: 'Nome do Sacador/Avalista/CPF/CNPJ/Endereço'
      }
    ]
    const {generateBillData} = bradescoBill

    return generateBillData(boletos).then(data => {
      expect(data).toEqual([
        {
          visibleExpirationDate: new Date(17, 11, 25),
          expirationDay: new Date(17, 11, 25),
          issueDate: new Date(17, 10, 6),
          billingDate: new Date(17, 10, 6),
          agency: '4025',
          agencyDigit: '0',
          account: 600,
          accountDigit: '1',
          value: 15000,
          card: '09',
          ourNumber: '1',
          paymentPlaceArea:
            'Pagável Preferencialmente na rede Bradesco ou no Bradesco expresso',
          payeeDescription:
            'ACME SA. R. Adolfo Catani, 76, Jardim Macarengo, São Carlos - SP Cep: 13560-470',
          documentNumber: '000000001',
          documentType: '01',
          acceptance: '09035344952',
          cip: '000',
          coinType: '9',
          quantity: '0',
          discountValue: null,
          lateFeeValue: null,
          payerInfo: 'Nome do Pagador/CPF/CNPJ/Endereço ',
          guarantorInfo: 'Nome do Sacador/Avalista/CPF/CNPJ/Endereço',
          barcodeData: '23791000000000150004025090000000000100006000',
          digitableLine:
            '23794.02502 90000.000001 01000.060002 1 00000000015000',
          formatedOurNumber: '09/00000000001-4'
        }
      ])
    })
  })

  it('generateRemitance Promise should generate a remitance file', () => {
    expect.assertions(1)
    const bradescoBill = billFactory(bradesco)
    const {generateRemittanceFile} = bradescoBill

    return generateRemittanceFile({
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
          discountValue: 0, // ?
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
    }).then(data => {
      const expected =
        '01REMESSA01COBRANCA       00000000000000433923ACME. SA                      237BRADESCO       100717        MX0000001                                                                                                                                                                                                                                                                                     000001\n1                   00090750600542911                         2372000200000000001100000000002N              01000000000110071700000000100000000000012N100717000000000000000170000000000000000000000000000000000000000000000183901298000138JOHN BUYER                              CLOWN SC                                            88703500083901298000138 ACME SA                                     000002\n9                                                                                                                                                                                                                                                                                                                                                                                                         000003\n'
      expect(data).toEqual(expected)
    })
  })
})
