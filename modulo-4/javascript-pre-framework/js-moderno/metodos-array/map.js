// o metodo map é utilizado para chamar uma funcao callback para cada elemento de um array e constroi um novo array com base nos retornos de cada chamada

const produtos = ["teclado", "mouse", "monitor"]

produtos.map( (produto) => {
  console.log(`Usando a função callback passando ${produto} como parametro`)
})

const formatados = produtos.map((produto) => {

  return {
    id: Math.random(),
    nome: produto
  }

})

console.log(formatados)