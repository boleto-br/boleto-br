// @flow
import {CPF, CNPJ} from 'cpf_cnpj'

export default function (
  func: string,
  registerType: string,
  registerNumber: string
): void {
  switch (registerType) {
    case '01':
      if (!CPF.isValid(registerNumber)) {
        throw new TypeError(
          `On function \`${func}\` registerNumber is invalid:
        \nExpect: \`registerType\` value is \`01\` so \`registerNumber\` should be a valid CPF
        \nActual: \`registerNumber\` is not a valid CPF`
        )
      }
      break
    case '02':
      if (!CNPJ.isValid(registerNumber)) {
        throw new TypeError(
          `On function \`${func}\` registerNumber is invalid:
        \nExpect: \`registerType\` value is \`02\` so \`registerNumber\` should be a valid CNPJ
        \nActual: \`registerNumber\` is not a valid CNPJ`
        )
      }
      break
    default:
  }
}
