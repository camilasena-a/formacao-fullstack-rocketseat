const usuarios = ["Camila", "Vitor", "Sabrina","Nikki","Lilo"]

const nomesCurtos = usuarios.filter((usuario) => usuario.length<6)
console.log(nomesCurtos)

const produtos = [
  {
    nome: "Mouse",
    preco: 49.90,
    promocao: true
  },
  {
    nome: "Teclado",
    preco: 78.90,
    promocao: false
  },
  {
    nome: "Monitor",
    preco: 499.90,
    promocao: true
  }
]

const produtosEmPromocao = produtos.filter((produto)=> produto.promocao===true)
console.log(produtosEmPromocao)