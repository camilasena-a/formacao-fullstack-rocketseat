// spread permite que um objeto iteravel, como array ou string, seja expandido para ser usado

const numeros = [1,2,3]
console.log(numeros)
console.log(...numeros)

const usuarios = [
  {
   nome: "Camila",
   email: "camila@gmail.com",
   avatar: "c.png"
  },
    {
   nome: "Vitor",
   email: "vitor@gmail.com",
   avatar: "v.png"
  },
    {
   nome: "Thais",
   email: "thais@gmail.com",
   avatar: "t.png"
  }
]

console.log(usuarios)
console.log(...usuarios)