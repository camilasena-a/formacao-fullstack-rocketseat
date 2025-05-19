const values = [5,12,8,130,44]

const found = values.find((value) => value>10)
console.log(found)

const fruits = [
  {nome: "maca", quantidade: 15},
  {nome: "abacaxi", quantidade: 27},
  {nome: "banana", quantidade: 36},
]

const primeiraEncontrada = fruits.find((fruit) => fruit.quantidade>20)
console.log(primeiraEncontrada)