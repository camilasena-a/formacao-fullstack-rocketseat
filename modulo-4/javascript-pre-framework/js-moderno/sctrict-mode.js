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

student.point = 10