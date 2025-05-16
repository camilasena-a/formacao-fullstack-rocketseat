"use strict"

function showMessage() {
  nome = "Camila"
  console.log(`Olá, ${nome}`)
}

showMessage()

class Student {
  get point() {
    return 7
  }
}

let student = new Student()
//tenta mudar uma propriedade get (somente leitura)
student.point = 10
console.log(student.point)


//tenta passar valores duplicados
function sum(a,a,c) {
  return a + a + c
}
const result = sum(1,5,7)
console.log(result)