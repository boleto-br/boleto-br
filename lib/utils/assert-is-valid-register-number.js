// @flow
import {isValid as isValidCPF} from './cpf'
import {isValid as isValidCNPJ} from './cnpj'

export default function (
  func: string,
  registerType: string,
  registerNumber: string
): void {
  switch (registerType) {
    case '01':
      if (!isValidCPF(registerNumber)) {
        throw new TypeError(
          `On function \`${func}\` registerNumber is invalid:
        \nExpect: \`registerType\` value is \`01\` so \`registerNumber\` should be a valid CPF
        \nActual: \`registerNumber\` is not a valid CPF`
        )
      }
      break
    case '02':
      if (!isValidCNPJ(registerNumber)) {
        throw new TypeError(`On function \`${func}\` registerNumber is invalid:
        \nExpect: \`registerType\` value is \`02\` so \`registerNumber\` should be a valid CNPJ
        \nActual: \`registerNumber\` is not a valid CNPJ`)
      }
      break
    default:
  }
}
