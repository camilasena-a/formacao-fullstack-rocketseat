// setInterval(f,x) executa uma função f a cada x milisegundos

let value = 10

setInterval(()=>{
  console.log(value)
  value--
}, 3000)

//exemplo de como interromper para a função não ser executada infinitamente:

const interval = setInterval(()=>{
  console.log(value)
  value--
  if(value=== 0){
    console.log("FELIZ ANO NOVO")
    clearInterval(interval) //interrompe o intervalo de execuções
  }
},2000)