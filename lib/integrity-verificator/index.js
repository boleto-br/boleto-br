/*
Para o cálculo do Dígito verificador do Código de Barras, proceder da seguinte forma:
- cálculo através do módulo 11, com base de cálculo igual a 9.
Exemplo:
NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN {43 Posições com todos os dados:
Para calcular o dígito considerar 43 Posições,
Sendo: da Posição 1 a 4 e da Posição 6 a 44.
4329876543298765432987654329876543298765432
- - - - < - - - - < - - - - < - - - < - - -
{ Índice de Multiplicação
{ Sentido do Cálculo
  O primeiro dígito da direita para a esquerda será multiplicado por 2, o segundo por 3, e assim
  sucessivamente.
  Os resultados das multiplicações devem ser acumulados.
  No final, o valor acumulado deverá ser dividido por 11.
  O resto da divisão deverá ser subtraído de 11.
- se o resultado da subtração for igual a 0 (Zero), 1 (um) ou maior que 9 (nove) deverão assumir o
dígito igual a 1 (um).
- caso contrário, o resultado da subtração será o próprio dígito.
  Este resultado é o digito verificador do código de barras, e deverá ser lançada para a quinta posição.
  O dígito 0 (Zero) na quinta posição indicará que o código de barras não possui dígito verificador.

 */
exports.mod11 = function (num, base, r) {
  if (!base) base = 9
  if (!r) r = 0

  var soma = 0
  var fator = 2

  for (var i = num.length - 1; i >= 0; i--) {
    var parcial = parseInt(num[i]) * fator
    soma += parcial

    if (fator == base) {
      fator = 1
    }

    fator++
  }

  if (r == 0) {
    soma *= 10
    var digito = soma % 11
    return digito == 10 ? 0 : digito
  } else if (r == 1) {
    return soma % 11
  }
}
