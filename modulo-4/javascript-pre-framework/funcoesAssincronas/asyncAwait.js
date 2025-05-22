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

async function novaFuncao() {
  const response = await asyncExemplo()
  console.log(response)
}