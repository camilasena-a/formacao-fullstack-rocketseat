// configurando amount

const amount = document.getElementById("amount")

amount.addEventListener("input", () => {
  // somente digitos
  let valorDigito = amount.value.replace(/\D/g,"")
  valorFinal = Number(valorDigito) / 100
  amount.value = formatCurrencyBRL(valorFinal)
  
})

function formatCurrencyBRL(valor) { 
  valor = valor.toLocaleString("pr-BR", {
    style: "currency",
    currency: "BRL"
  })
  return valor
 }