// @flow
import addLeadingZeros from './add-leading-zeros'

export default function (expirationDate: Date): string {
  const expirationTime = expirationDate.getTime()
  const baseTime = new Date(1997, 9, 7).getTime()

  if (expirationTime <= baseTime) {
    return '0000'
  }
  const diff = Math.floor((expirationTime - baseTime) / (24 * 3600 * 1000))

  return addLeadingZeros(String(diff), 4)
}
