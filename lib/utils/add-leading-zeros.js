// @flow
import padStart from 'pad-start'

export default (number: number | string, n: number): string =>
  padStart(String(number), n, '0')
