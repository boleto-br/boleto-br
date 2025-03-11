// @flow
import moment from 'moment'
import addLeadingZeros from './add-leading-zeros'

export default function (expirationDate: Date): string {
  const expirationTime = moment(expirationDate)
  const baseTime = moment([1997, 9, 7])

  if (expirationTime.isSameOrBefore(baseTime)) {
    return '0000'
  }

  // After 2025-02-22 new base time FEBRABAN resolution
  if (
    expirationTime.year() > 2025 ||
    (expirationTime.year() === 2025 && expirationTime.month() > 1) ||
    (expirationTime.year() === 2025 &&
      expirationTime.month() === 1 &&
      expirationTime.date() > 21)
  ) {
    const newBaseTime = moment([2025, 1, 22])
    const diff = expirationTime.diff(newBaseTime, 'days') + 1000

    return addLeadingZeros(String(diff), 4)
  }
  
  const diff = expirationTime.diff(baseTime, 'days')
  return addLeadingZeros(String(diff), 4)
}
