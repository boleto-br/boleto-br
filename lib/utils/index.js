// @flow
import leftPad from 'left-pad'

export function maturityFactor(date: Date): string {
  const time = date.getTime()
  if (time === 0) {
    return '0000'
  }
  const diff = Math.floor(
    (time - new Date(1997, 9, 7).getTime()) / (24 * 3600 * 1000)
  )

  return leftPad(String(diff), 4, '0')
}

export const joinStrings = (...args: Array<string>) => args.join('')

export function fillLeftZeros(number: number | string, n: number): string {
  if (number === 0) {
    return Array(n).fill('0').join('')
  }
  return leftPad(String(number), n, '0')
}

export function sumDigits(num: number): number {
  return String(num)
    .split('')
    .reduce((previous, current) => previous + parseInt(current, 10), 0)
}
