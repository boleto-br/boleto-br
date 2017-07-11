// @flow
export default (num: number): number =>
  String(num)
    .split('')
    .reduce((previous, current) => previous + parseInt(current, 10), 0)
