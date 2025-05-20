/* utilizado para extrair valores únicos dentro de um array, por exemplo: maior numero, menor numero, média dos valores do array, soma dos valores do array, etc

Parametros

- array original

- A. variavel auxiliar, return retorna novos valores de aux
- B. valor da iteracao (valor contido no index atual)
- C. index (index da iteracao atual - opcional)

- D. valor inicial da variavel auxiliar (segundo parametro do reduce, por ex 0, pode ser omitido e, nesse caso, atribui o mesmo valor do primeiro indice)

exemplo:

arrayOriginal.reduce( (A,B,C) => {bloco de código} , D )

*/

const values = [27,10,43,94,85]

// extraindo soma dos valores

const sum = values.reduce((aux, valor, index) => {
  return aux + valor
},0)

console.log(sum)

// extraindo maior valor

const maiorValor = values.reduce((aux,valorAtual) => {
  return aux > valorAtual ? aux : valorAtual
}, 0)

console.log(maiorValor)

// extraindo menor valor

const menorValor = values.reduce((aux,valorAtual) => {
  return aux < valorAtual ? aux : valorAtual
})

console.log(menorValor)

// extraindo media dos valores

const media = values.reduce((aux, valor, index) => {
  return aux + valor
},0) / values.length

console.log(media)