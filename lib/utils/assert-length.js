// @flow
export function assertMaxLength(
  func: string,
  prop: string,
  len: number,
  value: string
): void {
  if (value.length > len) {
    throw new TypeError(
      `On function \`${func}\`, property \`${prop}\` has an invalid length:
      \nExpected max length: ${len}
      \nActual length: ${value.length}`
    )
  }
}

export function assertMinLength(
  func: string,
  prop: string,
  len: number,
  value: string
): void {
  if (value.length < len) {
    throw new TypeError(
      `On function \`${func}\`, property \`${prop}\` has an invalid length:
      \nExpected min length: ${len}
      \nActual length: ${value.length}`
    )
  }
}
