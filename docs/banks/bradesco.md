# Bradesco

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
- **emitterCompanyCode**: código da empresa junto ao banco.
- **agencyNumber**: número da agência do beneficiário.
- **agencyDigit**: dígito da agencia do beneficiário.
- **accountNumber**: número da conta do beneficiário.
- **accountDigity**: dígito da conta do beneficiário.
- **emitterCompany**: nome empresa do beneficiário  **máximo 30 caracteres sem acentos e UPPERCASE**.
- **carteira**: código da carteira dois digitos.
- **seedingSequentialNumber**: número sequencial da remessa.

agora no bills vai as informações dos boletos realmente,

- **ourNumber**: Nosso número - número idententificador do boleto.
 **INDISPENSÁVEL manter a referencia do título original**.
 Esse número vai ser usado para relacionar o título no sistema com
 o boleto no banco.
- **documentNumber**: número do título no sistema, esse número
 não pode ser divergente com o número que vai impresso no boleto, no campo
 número do documento.
- **value**: valor do boleto é **INDISPENSÁVEL** que seja um valor inteiro
 onde o valor dos centavos seja os dois primeiros dígitos da direta para esquerda,
 exemplo se o valor do título for R$35,45 o valor aqui deve ser `3545`, é assim
 por conta da implentação do banco, e problemas que o `number` do javascript possa
 causar.
- **lateFee**: define se vai ter cobrança por atraso no pagamento.
- **lateFeePercentual**: percetual por dia de atraso, deve ser um valor inteiro
  de até 5 digitos se o o percentual por 2% deve ficar assim `200`, se for 1,5%
  deve ficar assim: `150`.
- **lateFeeValuePerDay**: valor de cobrança mora dia, valor * (valor do percetual mensal / 30 dias),
  deve ser um valor inteiro, como nos outros casos.
- **occurencyCode**: sempre `01` pois é remessa.
- **expirationDay**: data de vencimento formato YYYY-MM-DD.
- **debtType**: geramente é preenchido com `01`, mas pode ser qualquer um desses valores:

| Código -| Descrição          |
|---------|--------------------|
| 01      | Duplicata          |
| 02      | Nota Promissória   |
| 03      | Nota de Seguro     |
| 04      | Cobrança Seriada   |
| 05      | Recibo             |
| 10      | Letras de Câmbio   |
| 11      | Nota de Débito     |
| 12      | Duplicata de Serv. |
| 30      | Boleto de Proposta |
| 99      | Outros             |

- **issueDay**: data da emissão do título.
- **discountDayLimit**: limite do desconto por dia.
- **decreaseValue**: deixar `0`, campos de desconto por dia.
- **discountPerDay**: desconto por dia deixa sempre `0`.
- **iofValue**: valor do IOF,usado apenas em imobiliarias.
- **registerType**: tipo do registro.

| registerType |  registerNumber shoud be  a |
|--------------| ----------------------------|
| 01           |  CPF                        |
| 02           |  CNPJ                       |
| 03           |  PIS/PASEP                  |
| 98           |  Não tem                    |
| 99           |  Outro                      |

- **registerNumber**: numero do registro com base do tipo, ou seja, número sem
 espaços e caracteres especiais do CNPJ ou CPF e etc.
- **payerName**: nome do pagador, maximo 40 caracteres, e UPPERCASE, sem acentos.
- **payerAddress**: endereço simples do pagador, maximo 40 caracteres UPPERCASE,
sem acentos.
- **messageOne**: string de um caracteres vazios.,
- **payerPostalCode**: cep do pagador apenas dígitos.
- **messageTwo**: preencher com o beneficiário nesse caso `083901298000138 ACME SA`


Isto produzira um arquivo de remessa como esse:

```
01REMESSA01COBRANCA       00000000000000433923ACME. SA                      237BRADESCO       100717        MX0000001                                                                                                                                                                                                                                                                                     000001
1                   00090750600542911                         2372000200000000001100000000002N              01000000000110071700000000100000000000012N100717000000000000000170000000000000000000000000000000000000000000000183901298000138JOHN BUYER                              CLOWN SC                                            88703500083901298000138 ACME SA                                     000002
9                                                                                                                                                                                                                                                                                                                                                                                                         000003
```


