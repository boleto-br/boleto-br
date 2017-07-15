// @flow
export default function (func: string, property: string, value: number): void {
  if (value < 1) {
    throw new TypeError(`On function \`${func}\` \`${property}\` is invalid:
    \n Expect: to be gretter than zero.
    \n Actual: \`${value}\``)
  }
}
