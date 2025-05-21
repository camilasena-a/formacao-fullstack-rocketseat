const original = ["Camila", "Vitor", "Sabina", "Nikki"]

//nao funciona por conta da imutabilidade do array:

const copia1 = original
copia1.push("Lilonete")

console.log(original, copia1)

// utilizando o spread para contornar:

const copia2 = [...original]
copia2.push("Salem")
console.log(original,copia2)


// forma mais simples

const copia3 = [...original, "Salem"]
console.log(original, copia3)