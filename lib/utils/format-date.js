// @flow
import moment from 'moment'

export default function (date: Date, format: string): string {
  return moment(date).format(format)
}
