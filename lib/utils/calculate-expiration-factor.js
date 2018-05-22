// @flow
import moment from 'moment'
import addLeadingZeros from './add-leading-zeros'

export default function (expirationDate: Date): string {
  const expirationTime = moment(expirationDate)
  const baseTime = moment([1997, 9, 7])

  if (expirationTime.isSameOrBefore(baseTime)) {
    return '0000'
  }

  const diff = expirationTime.diff(baseTime, 'days')
  return addLeadingZeros(String(diff), 4)
}
