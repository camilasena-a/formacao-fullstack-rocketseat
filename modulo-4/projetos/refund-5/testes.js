// configurando amount

const valorDespesa = document.getElementById("amount")

valorDespesa.addEventListener("input", () => {
  // somente digitos
  let valorDigito = valorDespesa.value.replace(/\D/g,"")
  valorFinal = Number(valorDigito) / 100
  valorDespesa.value = formatCurrencyBRL(valorFinal)
  
})

function formatCurrencyBRL(valor) { 
  valor = valor.toLocaleString("pr-BR", {
    style: "currency",
    currency: "BRL"
  })
  return valor
 }

 // configurando o submit

 const form = document.querySelector("form")
 const categoria = document.getElementById("category")
 const despesa = document.getElementById("expense")

 form.addEventListener("submit", (event) => {
  event.preventDefault()

  const novaDespesa = {
    id: new Date().getTime(),
    despesa: despesa.value,
    categoria_id: categoria.value,
    categoria_nome: categoria.options[category.selectedIndex].text,
    valor: valorDespesa.value,
    criadoEm: new Date().toLocaleDateString("pt-BR")
  }

  adicionaDespesa(novaDespesa)
 })

 function adicionaDespesa(novaDespesa) {
    try {
      throw new Error("Erro de teste")
    } catch (error) {
      alert("Não foi possível atualizar a lista de despesas")
      console.log(error)
    }

 }