// @flow
export default function (
  func: string,
  firstDateDescription: string,
  secondDateDescription: string,
  firstDate: Date,
  secondDate: Date
): void {
  if (firstDate.getTime() > secondDate.getTime()) {
    throw new TypeError(`On function \`${func}\` Date comparison generated an unexpected result:
    \nExpect: \`${firstDateDescription}\` to be lesser than \`${secondDateDescription}\`
    \nActual: \`${firstDateDescription}\` is greater than \`${secondDateDescription}\``)
  }
}
