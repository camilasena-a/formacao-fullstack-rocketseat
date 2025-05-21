//importação separada
import {sumTwoNumbers, multiply as multiplyTwoNumbers} from "./calc.js"

// para importar tudo que o arquivo calc exporta, utilizamos:

// import * as MathCalc from "./calc.js"

//ao inves de chamar as funçoes diretamente, usamos como metodos de calc, exemplo: calc.sum(4,3)

console.log("4+6=",sumTwoNumbers(4,6))
console.log("5x5=", multiplyTwoNumbers(5,5))

// importando como padrão:

import ApresentaUsuario, {MathCalc} from "./classes.js"

const usuario = new ApresentaUsuario("Camila","Sena")

usuario.apresentar()