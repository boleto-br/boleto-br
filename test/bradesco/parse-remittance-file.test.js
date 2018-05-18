import fs from 'fs'
import path from 'path'
import parseRemittanceFile from '../../lib/bradesco/parse-remittance-file'

describe('parseRemittanceFile main functionality', () => {
  it('should parse a remittance file to a object', () => {
    const file = fs.readFileSync(
      path.join(__dirname, '/files/retorno.rem'),
      'utf8'
    )
    const parsed = parseRemittanceFile(file)
    const expected = {
      account: '00169102',
      agency: '01420',
      card: '09',
      company: 'ACME SA',
      date: new Date(2012, 3, 11),
      registerCode: '04146792000168',
      bills: [
        {
          agency: '00523',
          bank: '237',
          creditDate: null,
          maturity: new Date(2012, 3, 11),
          occurency: '02',
          occurencyDate: new Date(2012, 3, 11),
          occurencyReasons: ['00', '00', '00', '00', '00'],
          ourNumber: '00000000009',
          paidValue: 0,
          value: 500
        },
        {
          agency: '01420',
          bank: '237',
          creditDate: new Date(2012, 3, 13),
          maturity: new Date(2012, 3, 11),
          occurency: '06',
          occurencyDate: new Date(2012, 3, 11),
          occurencyReasons: ['00', '00', '00', '00', '00'],
          ourNumber: '00000000009',
          paidValue: 500,
          value: 500
        }
      ]
    }

    expect(parsed).toEqual(expected)
  })
})
