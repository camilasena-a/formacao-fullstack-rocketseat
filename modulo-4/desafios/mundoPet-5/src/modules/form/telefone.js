const telefone = document.querySelector("#phone")

const formatarTelefone = (numeros) => {
  const tamanho = numeros.length
  
  if (tamanho === 0) return ""
  if (tamanho <= 2) return `(${numeros}`
  if (tamanho <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, -4)}-${numeros.slice(-4)}`
}

telefone.oninput = (event) => {
  const numeros = event.target.value.replace(/\D/g, "").slice(0, 11)
  event.target.value = formatarTelefone(numeros)
}