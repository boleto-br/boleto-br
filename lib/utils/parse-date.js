// @flow
import moment from 'moment'

export default function (date: string): Date {
  return new Date(moment(date, 'DDMMYY').valueOf())
}
