// seleciona elementos do formulario

const form = document.querySelector("form")
const expense = document.getElementById("expense")
const amount = document.getElementById("amount")
const category = document.getElementById("category")

// seleciona os elementos da lista

const expenseList = document.querySelector("ul")
const despesasQtde = document.querySelector("aside header p span")
const valorTotal = document.querySelector("aside header h2")

//capturando evento de input para formatar valor

amount.oninput = () => {
  let value = amount.value.replace(/\D+/g,"") //obtem valor atual do input e exclui caracteres não numericos
  value = Number(value)/100 // transforma valor em centavos
  amount.value = formatCurrencyBRL(value) //atualiza o valor para o valor formatado
  console.log(amount.value)
}


function formatCurrencyBRL(value) { //formata o valor para o padrão BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
  return value
}

//Captura o evento de submit de formulario para obter os valores
form.onsubmit = (event) => {
  //Previne o comportamento padrão de recarregar a página
  event.preventDefault()

  //Cria objeto com detalhes da despesa capturada
  const novaDespesa = {
    id: new Date().getTime(),
    despesa: expense.value,
    categoriaId: category.value,
    categoriaNome: category.options[category.selectedIndex].text,
    valor: amount.value,
    dataCriacao: new Date()
  }

  addExpense(novaDespesa)
}

function addExpense(novaDespesa) {
  try {
    // cria o elemento pra adicionar na lista
  const expenseItem = document.createElement("li")
  expenseItem.classList.add("expense")

    // cria o icone do elemento e adiciona no item
  const expenseIcon = document.createElement("img")
  expenseIcon.setAttribute("src", `./img/${novaDespesa.categoriaId}.svg`)

  // cria a div expense-info
  const expenseInfo = document.createElement("div")
  expenseInfo.classList.add("expense-info")
  const expenseName = document.createElement("strong")
  expenseName.textContent = novaDespesa.despesa
  const expenseCategory = document.createElement("span")
  expenseCategory.textContent = novaDespesa.categoriaNome

  // adiciona elementos da div na div
  expenseInfo.append(expenseName,expenseCategory)

    //cria valor

    const expenseAmount = document.createElement("spam")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${novaDespesa.valor.replace("R$","")}`

    // cria imagem de remove

    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src","./img/remove.svg")

  expenseItem.append(expenseIcon, expenseInfo, expenseAmount,removeIcon)
  expenseList.append(expenseItem)

  formClear()

  updateTotal()

  } catch (error) {
    alert("Não foi possível adicionar a despesa")
    console.log(error)
  }
}

function updateTotal() {
  try {
    const itens = expenseList.children
    despesasQtde.textContent = `${itens.length} ${itens.length>1 ? "despesas":"despesa"}`

    // incremento do valor total
    let total = 0

    for (let i=0; i<itens.length; i++) {
      const itemValor = itens[i].querySelector(".expense-amount")
      let value = itemValor.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      value = parseFloat(value)

      if(isNaN(value)){
        return alert(" Não foi possível calcular o total, o valor não parece ser um numero")
      }
        total +=Number(value)
    }
      total = formatCurrencyBRL(total).toUpperCase().replace("R$","")

      valorTotal.innerHTML = ""

      //criar span para adicionar o R$ formatado
      const simboloBRL = document.createElement("small")
      simboloBRL.textContent = "R$"
      valorTotal.append(simboloBRL, total)
  } catch (error) {
    console.log(error)
    alert("Não foi possivel atualizar a quantidade de despesas")
  }
}

//evento que remove o item da lista

expenseList.onclick = (event) => {
  if(event.target.classList.contains("remove-icon")){
    const item = event.target.closest(".expense")
    item.remove()
  }
  updateTotal()
}

function formClear() {
  expense.value = ""
  amount.value = ""
  category.value = ""
}
