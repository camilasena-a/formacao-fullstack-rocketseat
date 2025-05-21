// o Javascript em si não impoe restrições quanto a modificação dos objetos

let livro = {
  titulo: "Introducao a JS",
  categoria: "Tecnologia",
  autor: {
    nome: "Camila",
    email: "camila@gmail.com"
  }
}

console.log(livro)

livro.categoria = "Javascript"

console.log(livro)

// para impedir alterações no objeto, utilizamos o Object.freeze

Object.freeze(livro)

livro.categoria="computação"

console.log(livro)

// o freeze porem não faz alterações profundas e só congela o primeiro nivel, se quisermos alterar o objeto autor não conseguiremos

livro.autor.nome = "Vitor"

console.log(livro)