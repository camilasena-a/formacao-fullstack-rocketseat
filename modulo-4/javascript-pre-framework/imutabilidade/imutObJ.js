// quando criamos uma nova variavel x a partir de outra y da forma x = y, na verdade, a variavel x não é uma copia de y, ela aponta para o mesmo espaço de memoria que y, dessa forma, se alteramos o valor de x ou de y, alteramos o valor das duas variaveis, pois ambas apontam para o mesmo endereço de memoria

const address1 = {
  street: "Chastinet Guimaraes",
  number: 301
}

let address2 = address1
address2.number = 45

console.log(address1,address2) //vai dar errado

// Para reverter essa situação utilizamos o spread:

const address3 = {...address1}
address3.number = 57

console.log(address1,address3)

// uma forma mais simples de utilizar o spread

const address4 = {...address1, number: 59}
console.log(address1,address4)