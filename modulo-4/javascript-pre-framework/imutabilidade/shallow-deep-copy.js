/* ======================== SHALOW COPY ====================================
   Cópia superficial:
   a forma como aprendemos a criar uma cópia utilizando apenas o spread, a cópia não é capaz de
   copiar os objetos/arrays que estão aninhados dentro do original, ou seja, se houver um array
   ou objeto dentro do original, a cópia feita pegará apenas a referencia desse array/objeto
   fazendo com que ao alterarmos esse array/objeto na cópia, tbm alteremos o original
*/

// Exemplos de cópia superficial

const htmlCurso = {
  curso: "HTML",
  alunos: [{
    nome: "Camila",
    email:"camilasenaraujo@gmail.com"
  },
  {
    nome: "Vitor",
    email:"vitorr@gmail.com"
  },
  {
    nome: "Sabrina",
    email:"bina@gmail.com"
  }]
}

const jsCurso = {...htmlCurso, curso:"Javascript"}

//isso modifica tbm o jsHTML pois estutantes é uma referencia e não copia
jsCurso.alunos.push({nome: "Nikki",
    email:"nicolinamaria@gmail.com"})

console.log(htmlCurso,jsCurso)


// ============================= DEEP COPY ======================================

const cssCurso = {...htmlCurso, curso: "CSS", alunos: [...htmlCurso.alunos, {nome: "Lilo",
    email:"lilonetemaria@gmail.com"}]}

console.log(htmlCurso,cssCurso)

//outra forma:

tsCurso = {...htmlCurso, curso:"Typescript", alunos: [...htmlCurso.alunos]}
tsCurso.alunos.push({nome: "Salem",
    email:"salem@gmail.com"})

console.log(htmlCurso,tsCurso)

// outra forma:

nodeCurso = {...htmlCurso, curso: "Node"}

nodeCurso.alunos = [...htmlCurso.alunos, {nome: "Jolye",
    email:"jolye@gmail.com"}]

console.log(htmlCurso, nodeCurso)