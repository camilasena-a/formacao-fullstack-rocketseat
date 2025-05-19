// Rest params ou args (...) permite representar um numero indefinido de argumentos como um array

function novaFuncao(...args) {
  console.log(args.length)
  console.log(...args)
  console.log(args)
}

novaFuncao("alo",1,5,"testando","rests")

// pode substituir args por rest, é a mesma coisa

function novaFuncao(...rest) {
  console.log(rest.length)
  console.log(...rest)
  console.log(rest)
}

novaFuncao("alo",1,5,"testando","rests")