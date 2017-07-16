// @flow
import {moduleTen} from '../integrity-verificator/index'

export default function (barcode: string): string {
  const firstPart =
    barcode.substring(0, 4) +
    barcode.substring(19, 20) +
    '.' +
    barcode.substring(20, 24) +
    String(moduleTen(barcode.substring(0, 4) + barcode.substring(19, 24)))

  const secondPart =
    barcode.substring(24, 29) +
    '.' +
    barcode.substring(29, 34) +
    String(moduleTen(barcode.substring(24, 34)))

  const thirdPart =
    barcode.substring(34, 39) +
    '.' +
    barcode.substring(39, 44) +
    String(moduleTen(barcode.substring(34, 44)))

  const fourthPart = barcode.substring(4, 5)
  const sixthPart = barcode.substring(5, 19)

  return [firstPart, secondPart, thirdPart, fourthPart, sixthPart].join(' ')
}
