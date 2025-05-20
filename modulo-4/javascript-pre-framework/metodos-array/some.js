// retorna valor boleeano, testa se pelo menos um dos os elementos do array passam na condição de retorno

const ages = [15,30,29,24]

const result = ages.some((age)=> age<=18)
console.log(result)