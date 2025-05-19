const obj = {
  descricao: "copo",
  preco: 16.75
}

const {descricao, preco} = obj
console.log("Descrição: ", descricao)
console.log("Preço: ", preco)

function novoProduto({preco, descricao}) { 
  console.log("XXXXXXXXXX NOVO PRODUTO XXXXXXXXXXX")
  console.log("Descricao: ", descricao)
  console.log("Preço: ", preco)
 }

 novoProduto({descricao: "Balão", preco: 5.45})