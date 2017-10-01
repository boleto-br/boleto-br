# boleto-br

<a href="https://www.npmjs.com/package/boleto-br"><img src="https://img.shields.io/npm/v/boleto-br.svg" alt="npm"></a>
<a href="https://travis-ci.org/boleto-br/boleto-br"><img src="https://img.shields.io/travis/boleto-br/boleto-br.svg" alt="Travis"></a> <a href="https://coveralls.io/github/boleto-br/boleto-br?branch=master"><img src="https://img.shields.io/coveralls/boleto-br/boleto-br.svg" alt="Coveralls"></a>

> Um conjunto de funções úteis para geração de boleto de cobrança de banco brasileiros.

## Motivação

facilitar a geração de boletos de cobrança de bancos brasileiros, ele não gera um html
ou mesmo um pdf do boleto, para isso recomendo o uso do [boleto-pdf](https://www.npmjs.com/package/boleto-pdf).

Suporte:

| Barco        |  Suporte             |
|--------------|----------------------|
| Bradesco     |  :white_check_mark:  |
| Caixa        |  Em breve            |
| Santander    |  Help Wanted         |
| Itaú         |  Help Wanted         |
| Outros       |  Help Wanted         |

## Instalação

Este projeto usa [node](http://nodejs.org) e [npm](https://npmjs.com).
Verifique em seu sistema se já estão instalados, corretamente.

```sh
$ npm install boleto-br --save

```

## Uso

### Geração de boleto

```js
const {bill,bradesco} = require('boleto-br')
const bradescoBill = bill(bradesco)
const {generateBillData} = bradescoBill

const boletos =  [
  {
    ...
    expirationDay: Date,
    value: number,
    agency: string,
    card: string,
    ourNumber: string,
    account: number
  }
]
generateBillData(boletos).then( data => {
  // do something with data
}).catch(err => {
  console.log(err)
})

```
Veja [aqui](docs/banks/bradesco.md) uma descrição mais detalhada de como
gerar um pdf.

### Geração de arquivo de remessa

```js

const {bill,bradesco} = require('boleto-br')
const bradescoBill = bill(bradesco)
const {generateRemittanceFile} = bradescoBill

const boletos = {
  emitterCompanyCode: '433923',
  agencyNumber: '7506',
  agencyDigit: 1,
  accountNumber: 54291,
  accountDigity: 1,
  emitterCompany: 'ACME. SA',
  card: '09',
  date: new Date(2017, 6, 10),
  seedingSequentialNumber: 1,
  bills: [
    {
      ourNumber: '1',
      documentNumber: '1',
      value: 10000,
      lateFee: true,
      lateFeePercentual: 2,
      lateFeeValuePerDay: 17,
      occurencyCode: '01',
      expirationDay: new Date(2017, 6, 10),
      debtType: '12',
      issueDay: new Date(2017, 6, 10),
      discountDayLimit: 0,
      discountValue: 0,
      iofValue: 0,
      decreaseValue: 0,
      discountPerDay: 0,
      registerType: '01',
      registerNumber: '83901298000138',
      payerName: 'JOHN BUYER',
      payerAddress: 'CLOWN SC',
      messageOne: '',
      payerPostalCode: '88703500',
      messageTwo: '083901298000138 ACME SA'
    }
  ]
}

generateRemittanceFile(boletos).then(data =>{
  fs.writeFile("./REMESSATEST.REM", data , function(err) {
    if(err) {
      return console.log(err)
    }
    console.log("The file was saved!")
  })
}).catch(err =>{
  console.log(err)
})

```
Veja [aqui](docs/banks/bradesco.md) a descrição detalhada dos campos, para
geração de remessa Bradesco.

Isto produzira um arquivo de remessa como esse:

```
01REMESSA01COBRANCA       00000000000000433923ACME. SA                      237BRADESCO       100717        MX0000001                                                                                                                                                                                                                                                                                     000001
1                   00090750600542911                         2372000200000000001100000000002N              01000000000110071700000000100000000000012N100717000000000000000170000000000000000000000000000000000000000000000183901298000138JOHN BUYER                              CLOWN SC                                            88703500083901298000138 ACME SA                                     000002
9                                                                                                                                                                                                                                                                                                                                                                                                         000003
```

## Contribuindo

Veja o [contributing file](CONTRIBUTING.md).

## Licença

[MIT License](LICENSE.md) © [Rafael Castro](https://twitter.com/rafaelc457ro)
