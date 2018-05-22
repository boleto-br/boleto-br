// @flow
type Bank = {
  generateRemittanceFile: Function,
  generateBarCode: Function,
  generateDigitableLine: Function,
  formatCardOurNumber: Function
}

export default function ({
  generateRemittanceFile,
  generateBarCode,
  generateDigitableLine,
  formatCardOurNumber
}: Bank) {
  return {
    generateBillData(billData: Array<any>): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const newBillData = billData.map((bill): any => {
            const barcode = generateBarCode(bill)
            return {
              ...bill,
              barcodeData: barcode,
              digitableLine: generateDigitableLine(barcode),
              formatedOurNumber: formatCardOurNumber(bill)
            }
          })
          resolve(newBillData)
        } catch (err) {
          reject(err)
        }
      })
    },
    generateRemittanceFile(remittanceData: Object) {
      return new Promise((resolve, reject) => {
        try {
          const remittanceFile = generateRemittanceFile(remittanceData)
          resolve(remittanceFile)
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
