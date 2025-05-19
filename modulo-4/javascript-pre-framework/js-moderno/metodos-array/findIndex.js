const values = [3,5,6,8,9,10]

const primeiroMaior = values.findIndex((valor)=> valor>7)
console.log(primeiroMaior)

const naoExiste = values.findIndex((valor) => valor<3)
console.log(naoExiste)