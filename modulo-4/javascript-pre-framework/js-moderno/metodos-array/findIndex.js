const values = [3,5,6,8,9,10]

const primeiroIndice = values.findIndex((valor)=> valor>7)
console.log(primeiroIndice)
console.log(values[primeiroIndice])

const naoExiste = values.findIndex((valor) => valor<3)
console.log(naoExiste)