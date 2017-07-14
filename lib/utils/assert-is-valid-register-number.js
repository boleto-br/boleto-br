import {CPF, CNPJ} from 'cpf_cnpj'
/*

RegisterType  |  registerNumber shoud be  a
----------------- | ---------------------------------------
01                 |  [CPF](https://pt.wikipedia.org/wiki/Cadastro_de_pessoas_f%C3%ADsicas) *
02                 |  [CNPJ](https://pt.wikipedia.org/wiki/Cadastro_Nacional_da_Pessoa_Jur%C3%ADdica) *
03                 |  [PIS/PASEP](https://pt.wikipedia.org/wiki/PIS/PASEP)
98                 |  Does not have
99                 |  Other

 */
export default function (
  func: string,
  registerType: string,
  registerNumber: string
): null {
  switch (registerType) {
    case '01':
      if (!CPF.isValid(registerNumber)) {
        throw new TypeError(`On function \`${func}\` registerNumber is invalid:
        \nExpect: \`registerType\` value is \`01\` so \`registerNumber\` should be a valid CPF
        \nActual: \`registerNumber\` is not a valid CPF`)
      }
      break
    case '02':
      if (!CNPJ.isValid(registerNumber)) {
        throw new TypeError(`On function \`${func}\` registerNumber is invalid:
        \nExpect: \`registerType\` value is \`02\` so \`registerNumber\` should be a valid CNPJ
        \nActual: \`registerNumber\` is not a valid CNPJ`)
      }
      break
    default:
  }
}
