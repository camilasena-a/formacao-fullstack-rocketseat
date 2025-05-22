// criando uma função asincrona que retorna uma Promise

function asyncExemplo() {
  return new Promise((resolve,reject) => {
    //simulando uma operação asincrona:
    setTimeout(() => {
      const isSuccess = false

      if(isSuccess){
        resolve("Aqui a mensagem dentro de resolve")
      } else {
        reject("Ops, aqui a mensagem dentro de reject!")
      }
    },3000)
  })
}

//visualizando retorno

console.log(asyncExemplo()) //nao vamos conseguir pois esta pendente

asyncExemplo().then(
  (mensagem) => {console.log(`CONCLUIDO COM SUCESSO: ${mensagem}`)}
).catch(
  (erro) => {console.log(`DEU RUIM: ${erro}`)}
)

