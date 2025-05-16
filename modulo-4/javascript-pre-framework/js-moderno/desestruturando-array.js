const user = ["CamilaAraujo","camilasenaraujo@gmail.com","859886"]

//desestruturando cada indice em uma variavel

const [username, email,id] = user

console.log(username)
console.log(email)
console.log(id)

const almoco = ["arroz","salada","peixe","sorvete"]

// como desestruturar somente o primeiro

const [guarnicao] = almoco
console.log(guarnicao)

// como desestruturar somente o terceiro

const [ , , proteina] = almoco
console.log(proteina)

// como desestruturar o segundo e o ultimo

const [, acompanhamento, , sobremesa] = almoco

console.log(acompanhamento)
console.log(sobremesa)