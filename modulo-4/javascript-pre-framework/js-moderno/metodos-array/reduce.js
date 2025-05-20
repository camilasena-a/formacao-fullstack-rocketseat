/* utilizado para reduzir um array a um unico valor

Parametros

- array original
- acumulador
- valor da iteracao
- valor inicial
- index (index da iteracao atual - opcional)

*/

const values = [1,2,3,4,5]

const sum = values.reduce((acumulador, valorIteracao, index) => {
  console.log("ACUMULADOR", acumulador)
  console.log("VALOR ITERACAO", valorIteracao)
  console.log("INDEX", index)
  
  console.log("SOMA", acumulador+valorIteracao)
  console.log("########################################")

})
