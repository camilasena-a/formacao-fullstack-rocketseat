const listaItens = document.querySelector("ul")
const contadorDespesas = document.querySelector("aside header p span")
const totalDespesas = document.querySelector("aside header h2")

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
    nome: despesa.value,
    categoria_id: categoria.value,
    categoria_nome: categoria.options[category.selectedIndex].text,
    valor: valorDespesa.value,
    criadoEm: new Date().toLocaleDateString("pt-BR")
  }

  adicionaDespesa(novaDespesa)
  atualizaContagem(listaItens)
  formClear()
 })

 function adicionaDespesa(novaDespesa) {
    try {
      //adiciona novo li
      const item = document.createElement("li")
      item.classList.add("expense")
      // adiciona o icone do li
      const icon = document.createElement("img")
      icon.setAttribute('src',`./img/${novaDespesa.categoria_id}.svg`)
      icon.setAttribute('alt',novaDespesa.categoria_nome)

      //adiciona div com o nome e tipo da despesa
      const infoDespesa = document.createElement("div")
      infoDespesa.classList.add("expense-info")
      const nome = document.createElement("strong")
      nome.textContent= novaDespesa.nome
      const categoria = document.createElement("span")
      categoria.textContent= novaDespesa.categoria_nome

      //adiciona valor
      const valor = document.createElement("span")
      valor.classList.add("expense-amount")
      valor.innerHTML = `<small>R$</small> ${novaDespesa.valor.toUpperCase().replace("R$","")}`

      // adiciona botao de remover

      const botaoRemove = document.createElement("img")
      botaoRemove.classList.add("remove-icon")
      botaoRemove.setAttribute("src","./img/remove.svg")
      botaoRemove.setAttribute("alt","Remover")

      infoDespesa.append(nome,categoria)
      item.append(icon,infoDespesa,valor,botaoRemove)
      listaItens.append(item)

    } catch (error) {
      alert("Não foi possível atualizar a lista de despesas")
      console.log(error)
    }

 }

 function atualizaContagem(lista){
  try {
    const quantidade = lista.children.length
    contadorDespesas.textContent = `${quantidade} ${quantidade>1 ? "despesas":"despesa"}`

    total = 0;

    for (let i = 0; i < quantidade; i++) {
      const valorItem = lista.children[i].querySelector(".expense-amount");
      valorParcela = valorItem.textContent.replace(/[^\d,]/g, "").replace(",",".")
      valorParcela = parseFloat(valorParcela)

      if(isNaN(valorParcela)) {
        return alert ("Não foi possivel calcular o total, o valor não parece ser um numero")
      }

      total += Number(valorParcela)
    }

    totalDespesas.innerHTML = `<small>R$</small>${total}`

  } catch (error) {
    alert("Não foi possível atualizar a contagem de despesas")
      console.log(error)
  }
 }

 // apaga item

 listaItens.addEventListener("click", (event) => {
    if(event.target.classList.contains("remove-icon")){
      //obter a li pai do icon
      const itemRemovido = event.target.closest(".expense")
      itemRemovido.remove()
      atualizaContagem(listaItens)
    }
 })

 function formClear() {
  valorDespesa.value = ""
  despesa.value = ""
  categoria.value = ""
 }